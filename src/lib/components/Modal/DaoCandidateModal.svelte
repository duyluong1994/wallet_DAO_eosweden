<script lang="ts">
	import { page } from '$app/stores';
	import { AW_DAO, TOAST_TYPES } from '$lib/constants';
	import { session, toastStore } from '$lib/stores';
	import { pushActions } from '$lib/utils/wharfkit/session';
	import { Spinner } from 'flowbite-svelte';
	import CloseOutline from 'flowbite-svelte-icons/CloseOutline.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	let isOpen = false;
	let isSubmitting = false;
	let profile: any = null;
	let name = 'No Given Name';
	let description = 'No Description Given';
	let image = `${$page.url.origin}/default-avatar.png`;
	let requestedpay: any = 0;

	export function setModalOpen(bool: boolean, data: any) {
		profile = data;
		if (profile.is_registered) {
			name = profile.cand_acc;
			description = profile.cand_desc;
			image = profile.cand_img;
			requestedpay = parseFloat(profile.requestedpay.value);
		}
		isOpen = bool;
	}

	function refresh() {
		dispatch('refresh');
	}

	onMount(async () => {});

	async function submit() {
		isSubmitting = true;
		if (!$session) {
			toastStore.add('Please login first', TOAST_TYPES.WARNING);
			return;
		}

		if (!name) {
			toastStore.add('Name is required', TOAST_TYPES.WARNING);
			isSubmitting = false;
			return;
		}

		if (!image) {
			toastStore.add('Image URL is required', TOAST_TYPES.WARNING);
			isSubmitting = false;
			return;
		}

		if (!description) {
			toastStore.add('Description is required', TOAST_TYPES.WARNING);
			isSubmitting = false;
			return;
		}

		// if (!requestedpay) {
		// 	toastStore.add('Requested Pay is required', TOAST_TYPES.WARNING);
		// 	isSubmitting = false;
		// 	return;
		// }

		let actions: any = [
			{
				account: AW_DAO.CONTRACT_NAME,
				name: AW_DAO.ACTIONS.ST_PROFILE,
				authorization: [
					{
						actor: String($session.actor),
						permission: String($session?.permission)
					}
				],
				data: {
					cand: String($session.actor),
					dac_id: profile.planet.scope,
					profile: JSON.stringify({
						givenName: name,
						image,
						description
					})
				}
			}
		];

		if (!profile.is_registered) {
			actions.push({
				account: AW_DAO.CONTRACT_NAME,
				name: AW_DAO.ACTIONS.NOMINATE_CANDIDATE,
				authorization: [
					{
						actor: String($session.actor),
						permission: String($session?.permission)
					}
				],
				data: {
					cand: String($session.actor),
					dac_id: profile.planet.scope,
					requestedpay: `${requestedpay.toFixed(4)} TLM`
				}
			});
		}
		const res = await pushActions($session, actions);
		isSubmitting = false;
		if (res) {
			refresh();
		}
		close();
	}

	async function close() {
		name = 'No Given Name';
		description = 'No Description Given';
		image = `${$page.url.origin}/default-avatar.png`;
		isOpen = false;
	}
	function autoResize(event: any) {
		event.target.style.height = 'auto'; // Reset height to recalculate
		event.target.style.height = event.target.scrollHeight + 'px'; // Set new height
	}

	function resetHeight(event: any) {
		event.target.style.height = 'auto'; // Reset height to recalculate
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if isOpen}
	<div class="modal" on:click={close}>
		<div class="modal-content bg-background-default-lighter" on:click|stopPropagation>
			<div class="mb-5 flex flex-row">
				<h2 class=" text-white underline decoration-white underline-offset-4">
					{profile.planet.name} - Candidate Profile
				</h2>
				<div class="flex-grow"></div>
				<div on:click={close} class="hover:cursor-pointer">
					<CloseOutline class="  text-red-500 " size="lg" strokeWidth="3" />
				</div>
			</div>
			<label for="name" class="text-base font-semibold"> Name: </label>
			<div class="flex flex-row">
				<input id="name" class="text-black" type="text" bind:value={name} placeholder="Name" />
				<span
					class="my-2 ml-1 flex items-center justify-center rounded-lg bg-gray-600 px-2 text-white"
				>
					String
				</span>
			</div>

			<!-- <label for="name" class="text-base font-semibold"> Requested Pay: </label>
			<div class="flex flex-row">
				<input
					class="text-black"
					type="number"
					bind:value={requestedpay}
					placeholder="Requested Pay"
					on:change={() => (isEditRequestedPay = true)}
				/>
				<span
					class="my-2 ml-1 flex items-center justify-center rounded-lg bg-gray-600 px-3 text-white"
				>
					TLM
				</span>
			</div> -->

			<label for="image" class="text-base font-semibold"> Image URL: </label>
			<div class="flex flex-row">
				<input
					id="image"
					class="text-black"
					type="text"
					bind:value={image}
					placeholder="Image URL"
				/>
				<span
					class="my-2 ml-1 flex items-center justify-center rounded-lg bg-gray-600 px-2 text-white"
				>
					String
				</span>
			</div>
			<label for="image" class="text-base font-semibold"> Description: </label>
			<div class="flex flex-row">
				<textarea
					class="text-black"
					bind:value={description}
					placeholder="Description"
					on:input={autoResize}
					on:focusin={() => autoResize(event)}
					on:focusout={() => resetHeight(event)}
				></textarea>
				<span
					class="my-2 ml-1 flex items-center justify-center rounded-lg bg-gray-600 px-2 text-white"
				>
					String
				</span>
			</div>

			<div class="mt-2">
				{#if isSubmitting}
					<!-- Spining wheel when uploading -->
					<div class="flex flex-col items-center">
						<Spinner color="green" />
					</div>
				{:else}
					<button class="bg-green-500 text-white hover:bg-green-700" on:click={submit}
						>Submit</button
					>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
		display: flex;
		align-items: baseline;
		justify-content: center;
	}

	.modal-content {
		margin: auto;
		padding: 15px;
		border: 1px solid #888;
		width: 80%;
		max-width: 500px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
	}

	input,
	textarea {
		width: 100%;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
		font-size: 16px;
	}

	button {
		width: 100%;
		padding: 14px 20px;
		margin: 8px 0;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
	}
</style>
