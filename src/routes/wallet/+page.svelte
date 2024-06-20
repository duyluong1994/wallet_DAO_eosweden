<script lang="ts">
	import DaoCandidateModal from '$lib/components/Modal/DaoCandidateModal.svelte';
	import StakeModal from '$lib/components/Modal/StakeModal.svelte';
	import StakeTimeModal from '$lib/components/Modal/StakeTimeModal.svelte';
	import TokensAction from '$lib/components/SidePanel/Actions/TokensAction.svelte';
	import MiniMenu from '$lib/components/SidePanel/MiniMenu/MiniMenu.svelte';
	import DaoCandidate from '$lib/components/Wallet/DaoCandidate.svelte';
	import Tokens from '$lib/components/Wallet/Tokens.svelte';
	import { session } from '$lib/stores';
	import { Asset } from '@wharfkit/antelope';
	import { afterUpdate, onMount } from 'svelte';
	import CoinsSolid from 'svelte-awesome-icons/CoinsSolid.svelte';
	import PeopleGroupSolid from 'svelte-awesome-icons/PeopleGroupSolid.svelte';

	let tlm_balance: any = Asset.from('0.0000 TLM');
	let memberInfo: any = [];
	let stakeModal: any;
	let stakeTimeModal: any;
	let daoCandidateModal: any;
	let selectedBalance: any;
	let tokensRef: any;
	let daoCandidateRef: any;
	const menuItems: any = [
		{ id: 'tokens', icon: CoinsSolid, label: 'Tokens', logMessage: 'Tokens' },
		{
			id: 'dao-candidate',
			icon: PeopleGroupSolid,
			label: 'Dao Candidate',
			logMessage: 'Dao Candidate'
		}
	];
	let selectedMenuId = 'tokens';

	onMount(async () => {});

	afterUpdate(async () => {});

	async function refreshTokens() {
		if ($session) {
			tokensRef.refresh();
		}
	}
	async function refreshDaoCandidate() {
		if ($session) {
			daoCandidateRef.refresh();
		}
	}
</script>

<div class="main-content py-6">
	<div class="container relative overflow-x-hidden">
		{#if selectedMenuId === 'tokens'}
			<Tokens
				on:selectedBalance={(data) => {
					selectedBalance = data.detail;
				}}
				on:memberInfo={(data) => {
					memberInfo = data.detail;
				}}
				on:tlmBalance={(data) => {
					tlm_balance = data.detail;
				}}
				bind:this={tokensRef}
			/>
		{:else if selectedMenuId === 'dao-candidate'}
			<DaoCandidate
				on:editImgProfile={(data) => {
					daoCandidateModal.setModalOpen(true, data.detail);
				}}
				bind:this={daoCandidateRef}
			/>
		{/if}
		<MiniMenu
			class="block w-full md:hidden"
			{menuItems}
			on:selectedItem={(data) => {
				selectedMenuId = data.detail.id;
				console.log('selected: ', selectedMenuId);
			}}
		/>
	</div>
</div>
<div class="left-side w-full md:flex">
	<MiniMenu
		class="hidden w-full md:block"
		{menuItems}
		on:selectedItem={(data) => {
			selectedMenuId = data.detail.id;
			console.log('selected: ', selectedMenuId);
		}}
	/>
</div>
<div class="right-side md:flex">
	{#if $session && selectedMenuId === 'tokens'}
		<TokensAction
			selectedItem={selectedBalance}
			{memberInfo}
			on:stake={(data) => stakeModal.setModalOpen(true, data.detail)}
			on:stakeTime={(data) => stakeTimeModal.setModalOpen(true, data.detail)}
			on:refresh={refreshTokens}
		/>
	{/if}
	<!-- on:stakeTime={(data) => stakeModal.setModalOpen(true, data)} -->
</div>
{#if selectedMenuId === 'tokens'}
	<StakeModal bind:this={stakeModal} on:refresh={refreshTokens} {tlm_balance} />
	<StakeTimeModal bind:this={stakeTimeModal} on:refresh={refreshTokens} />
{/if}
{#if selectedMenuId === 'dao-candidate'}
	<DaoCandidateModal bind:this={daoCandidateModal} on:refresh={refreshDaoCandidate} />
{/if}

<style>
</style>
