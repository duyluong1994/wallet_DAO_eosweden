import { AW_PLANETS, AW_WORKER_PROPOSALS } from '$lib/constants';
import { cursorAll, getMultiDataCursor, getSingleData } from '$lib/utils/wharfkit/contractKit';

import _ from "lodash";

export async function get_worker_proposals(cursor: any, activePlanet: string) {
    const data: any = await cursorAll(cursor);
    const deserializedData: any = [];

    for (const item of data) {
        const queryParams = {
            index_position: 3,
            key_type: 'i64',
            from: String(item.proposal_id),
            to: String(item.proposal_id)
        };
        let voteData: any = await get_worker_proposal_votes(activePlanet, queryParams);

        voteData = voteData.map((item: any) => {
            return {
                vote_id: parseInt(item.vote_id),
                voter: String(item.voter),
                proposal_id: String(item.proposal_id),
                category_id: parseInt(item.category_id),
                vote: String(item.vote),
                delegatee: String(item.delegatee),
                comment_hash: String(item.comment_hash),
            };
        });
        deserializedData.push({
            proposal_id: String(item.proposal_id),
            proposer: String(item.proposer),
            arbiter: String(item.arbiter),
            content_hash: String(item.content_hash),
            proposal_pay: { contract: String(item.proposal_pay.contract), quantity: String(item.proposal_pay.quantity) },
            arbiter_pay: { contract: String(item.arbiter_pay.contract), quantity: String(item.arbiter_pay.quantity) },
            title: String(item.title),
            summary: String(item.summary),
            state: String(item.state),
            expiry: `${String(item.expiry)}Z`,
            job_duration: parseInt(item.job_duration),
            category: parseInt(item.category),
            arbiter_agreed: item.arbiter_agreed,
            votes: voteData
        });
    }
    return deserializedData;
}

export async function get_worker_proposals_cursor(activePlanet: string) {
    const planetScope = _.find(AW_PLANETS, (planet: any) => { return planet.name === activePlanet })?.scope || "";
    const cursor: any = await getMultiDataCursor(AW_WORKER_PROPOSALS.CONTRACT_NAME, planetScope, AW_WORKER_PROPOSALS.TABLES.PROPOSALS);
    return cursor;
}
export async function get_worker_proposal_by_id(activePlanet: string, proposal_id: string) {
    const planetScope = _.find(AW_PLANETS, (planet: any) => { return planet.name === activePlanet })?.scope || "";
    const data: any = await getSingleData(AW_WORKER_PROPOSALS.CONTRACT_NAME, planetScope, AW_WORKER_PROPOSALS.TABLES.PROPOSALS, proposal_id);
    if (!data) return {};
    const deserializedData = {
        proposal_id: String(data.proposal_id),
        proposer: String(data.proposer),
        arbiter: String(data.arbiter),
        content_hash: String(data.content_hash),
        proposal_pay: { contract: String(data.proposal_pay.contract), quantity: String(data.proposal_pay.quantity) },
        arbiter_pay: { contract: String(data.arbiter_pay.contract), quantity: String(data.arbiter_pay.quantity) },
        title: String(data.title),
        summary: String(data.summary),
        state: String(data.state),
        expiry: `${String(data.expiry)}Z`,
        job_duration: parseInt(data.job_duration),
        category: parseInt(data.category),
        arbiter_agreed: data.arbiter_agreed,
    };
    return deserializedData;
}

export async function get_worker_proposal_votes(activePlanet: string, params: any) {
    const planetScope = _.find(AW_PLANETS, (planet: any) => { return planet.name === activePlanet })?.scope || "";
    const cursor: any = await getMultiDataCursor(AW_WORKER_PROPOSALS.CONTRACT_NAME,
        planetScope,
        AW_WORKER_PROPOSALS.TABLES.PROPOSAL_VOTES,
        params);
    const data: any = await cursorAll(cursor);

    const deserializedData = data.map((item: any) => {
        return {
            vote_id: parseInt(item.vote_id),
            voter: String(item.voter),
            proposal_id: String(item.proposal_id),
            category_id: parseInt(item.category_id),
            vote: String(item.vote),
            delegatee: String(item.delegatee),
            comment_hash: String(item.comment_hash),
        };
    });
    return deserializedData;
}

export async function get_workerprop_cfg(activePlanet: string) {
    const planetScope = _.find(AW_PLANETS, (planet: any) => { return planet.name === activePlanet })?.scope || "";
    const data: any = await getSingleData(AW_WORKER_PROPOSALS.CONTRACT_NAME, planetScope, AW_WORKER_PROPOSALS.TABLES.CONFIGS);
    if (!data) return {};
    const deserializedData = Object.assign.apply(null, data.data.map((item: any) => {
        return {
            [item.key]: parseInt(item.value[1])
        };
    }));
    return deserializedData;
}