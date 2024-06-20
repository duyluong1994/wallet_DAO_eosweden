<script lang="ts">
	import { AW_PLANETS } from '$lib/constants';
	import { get_candidate_by_candname } from '$lib/services/awdaoService';
	import { session } from '$lib/stores';
	import { Asset } from '@wharfkit/antelope';
	import axios from 'axios';
	import { Spinner } from 'flowbite-svelte';
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import EditFilled from 'svelte-ant-design-icons/EditFilled.svelte';

	const dispatch = createEventDispatcher();
	let loading = true;
	let candidateData: any = [];
	let profileData: any = [];
	let profiles: any = [];
	onMount(async () => {});

	afterUpdate(async () => {});

	export async function refresh() {
		if ($session) {
			Promise.all([fetchCandidate()]).then(async () => {
				loading = false;
			});
		}
	}

	$: $session &&
		Promise.all([fetchCandidate()]).then(async () => {
			loading = false;
		});

	async function fetchCandidate() {
		loading = true;
		let res: any = await Promise.all(
			AW_PLANETS.map(async (planet) => {
				const res = await get_candidate_by_candname(planet, String($session?.actor));
				return res;
			})
		);
		if (!res) return;
		// filter out null values
		res = res.filter((r: any) => r);
		console.log('res', res);
		candidateData = res;

		const resP = await fetchCandidatesProfile();
		console.log('resP', resP);

		profileData = resP;
		profiles = AW_PLANETS.map((planet) => {
			let pData = profileData.find((p: any) => p.planet === planet.scope);
			let cData = candidateData.find((c: any) => c.planet.scope === planet.scope);
			return {
				planet,
				cand_acc: pData?.cand_acc || 'No Profile',
				cand_name: pData?.cand_name || 'No Given Name',
				cand_img: pData?.cand_img || 'default-avatar.png',
				cand_desc: pData?.cand_desc || 'No Description Given',
				requestedpay: cData?.requestedpay || Asset.from('0.0000 TLM'),
				is_registered: pData ? true : false
			};
		});
		console.log('profiles', profiles);
	}

	async function fetchCandidatesProfile() {
		console.log('fetching candidates profile');
		const res: any = await axios.get(
			`https://api.alienw.com/custodians?account=${String($session?.actor)}`
		);
		// const res: any = await axios.get(`https://api.alienw.com/custodians?account=anyo.cabal`);
		if (!res) return [];
		console.log(res.data);

		return res.data;
	}

	function getProfileImg(planet: string) {
		const profile = profileData.find((p: any) => p.planet === planet);
		console.log('profile', profile);
		if (profile) {
			return profile.cand_img;
		}
		return 'default-avatar.png';
	}
	function getProfileName(planet: string) {
		const profile = profileData.find((p: any) => p.planet === planet);
		console.log('profile', profile);
		if (profile) {
			return profile.cand_name;
		}
		return 'No Given Name';
	}

	function getProfileDesc(planet: string) {
		const profile = profileData.find((p: any) => p.planet === planet);
		console.log('profile', profile);
		if (profile) {
			if (typeof profile.cand_desc == 'object') {
				return profile.cand_desc?.description || 'No Description Given';
			} else {
				return profile.cand_desc;
			}
		}
		return 'No Description Given';
	}
</script>

<h1 class="mb-6 text-center text-2xl font-bold">Dao Candidate Profile</h1>
<div class="mt-10 overflow-x-auto">
	{#if loading}
		<div class="flex items-center justify-center">
			<Spinner color="purple" />
		</div>
	{:else}
		{#each profiles as profile}
			<div class="flex w-full flex-col p-2">
				<div
					class="flex flex-col items-start justify-between rounded-lg p-2 pr-10 backdrop-brightness-125 md:flex-wrap"
				>
					<button
						class="absolute right-2 top-2 flex cursor-pointer flex-row justify-center rounded-md bg-green-500 p-1 text-white hover:bg-green-600"
						on:click={() => {
							dispatch('editImgProfile', profile);
							console.log('editImgProfile', profile);
						}}
					>
						<EditFilled class="h-6 w-6 rounded-full  md:h-6 md:w-6" />
						<div class="ml-2">{profile.is_registered ? 'Update' : 'Sign Up'}</div>
					</button>

					<div class="flex flex-row items-start text-nowrap">
						<div class="relative">
							<img
								class="h-16 min-h-16 w-16 min-w-16 rounded-full md:h-24 md:min-h-24 md:w-24 md:min-w-24"
								src={profile.cand_img}
								alt="error"
							/>
						</div>
						<div class="ml-5">
							<div class="font-bold text-white">
								{profile.cand_acc} -
								<span class="italic">{profile.cand_name}</span>
							</div>
							<div class="mt-2 text-sm md:text-base">
								<span class="text-white">Planet: </span>
								<span class="text-default"> {profile.planet.name}</span>
							</div>
							<div class="text-sm md:text-base">
								<span class="text-white">Requested Pay: </span>
								<span class="text-default">{String(profile.requestedpay)}</span>
							</div>
						</div>
					</div>
					<div class="mt-3 flex flex-col items-start md:mx-5">
						<div class=" text-sm text-white md:text-base">Description:</div>
						<div class="text-default text-sm md:text-base">
							{#each profile.cand_desc.split('\n') as line}
								{line}
								<br />
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
</style>
