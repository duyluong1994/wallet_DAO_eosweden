import { PUBLIC_ALIEN_WALLET_API } from '$env/static/public';
import axios from 'axios';
import { writable } from 'svelte/store';

function createAwSummaryStore() {

    const { subscribe, set } = writable<any | null>(null);

    return {
        subscribe,
        set,
        fetch: async () => {
            const response = await axios.get(`${PUBLIC_ALIEN_WALLET_API}/summary`);
            set(response.data);
        }
    };
}

export const awSummaryStore = createAwSummaryStore();
