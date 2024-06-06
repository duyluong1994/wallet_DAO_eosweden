import{A as u,g as s}from"./bundle-mjs.fLspV5ki.js";import{_ as p,g as m,d as v,f,a as _}from"./session.CCA_5FAn.js";import{B as y}from"./bluebird.CmLefvyQ.js";async function T(o,n=void 0,a=1e3){var t;const i=((t=p.find(u,d=>d.name===o))==null?void 0:t.scope)||"",c={index_position:"1",key_type:"i64",reverse:!0,rowsPerAPIRequest:a};return n&&(c.to=n),await m(s.CONTRACT_NAME,i,s.TABLES.REFERENDUMS,c)}async function k(o){var e;const n=await v(o),a=((e=p.find(u,t=>t.scope===o.params.scope))==null?void 0:e.name)||"",i=n.length>0?parseInt(n[n.length-1].referendum_id)-1:void 0;return{rows:await y.map(n,async t=>{const d=t.account_votes.map(r=>({name:String(r.key),value:parseInt(r.value)})),g=t.token_votes.map(r=>({name:String(r.key),value:parseInt(r.value)})),l=[];for(const r of t.acts){const S=await f(r.account,r.name,r.data);l.push({contract_name:String(r.account),action_name:String(r.name),action_data:JSON.parse(JSON.stringify(S))})}return{referendum_id:parseInt(t.referendum_id),proposer:String(t.proposer),type:String(t.type),voting_type:String(t.voting_type),status:String(t.status),title:t.title,content_ref:String(t.content_ref),token_votes:g,account_votes:d,expires:`${String(t.expires)}Z`,acts:l}},{concurrency:3}),next_key:i,planetName:a}}async function D(o){var c;const n=((c=p.find(u,e=>e.name===o))==null?void 0:c.scope)||"",a=await _(s.CONTRACT_NAME,n,s.TABLES.CONFIG);return a?{fee:a.fee.reduce((e,t)=>(e[String(t.key)]={quantity:t.value.quantity,contract:String(t.value.contract)},e),{}),pass:a.pass.map(e=>({name:String(e.key),value:parseInt(e.value)})),quorum_token:a.quorum_token.map(e=>({name:String(e.key),value:parseInt(e.value)})),quorum_account:a.quorum_account.map(e=>({name:String(e.key),value:parseInt(e.value)})),allow_per_account_voting:a.allow_per_account_voting.map(e=>({name:String(e.key),value:e.value})),allow_vote_type:a.allow_vote_type.map(e=>({name:String(e.key),value:e.value})),next_referendum_id:parseInt(a.next_referendum_id)}:{}}async function C(o){const n=await _(s.CONTRACT_NAME,s.CONTRACT_NAME,s.TABLES.DEPOSITS,o);return n?{account:String(n.account),deposit:{quantity:n.deposit.quantity,contract:String(n.deposit.contract)}}:{}}async function I(o,n){var e;const a=((e=p.find(u,t=>t.name===o))==null?void 0:e.scope)||"",i=await _(s.CONTRACT_NAME,a,s.TABLES.VOTES,n);return i?{voter:String(i.voter),votes:i.votes.map(t=>({referendum_id:parseInt(t.key),vote:String(t.value)}))}:{}}export{C as a,T as b,k as c,I as d,D as g};
