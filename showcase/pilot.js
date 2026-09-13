import {initialPilot,advance,participants} from './pilot-model.js';
const $=s=>document.querySelector(s);let state=initialPilot();
function run(type,text=''){try{state=advance(state,{type,actor:$('#actor').value,text});render();$('#pilot-feedback').textContent=state.history.at(-1).detail;}catch(error){$('#pilot-feedback').textContent=error.message;}}
function render(){
 const actor=$('#actor').value,reviewed=state.review?.accepted&&state.review.revision===state.revision,decided=!!state.decision;
 $('#join').disabled=actor!=='operator'||state.joined;
 for(const e of $('#evidence-form').elements)e.disabled=actor!=='operator'||!state.joined;
 for(const e of $('#review-form').elements)e.disabled=actor!=='reviewer'||!state.revision;
 for(const e of $('#decision-form').elements)e.disabled=actor!=='steward'||!reviewed;
 $('#allocate').disabled=actor!=='steward'||!decided||!!state.allocation;
 $('#participation-state').textContent=state.joined?'Participation recorded. Continue as AL to submit evidence.':'Waiting for AL to record participation.';
 $('#evidence-state').textContent=state.revision?`Revision ${state.revision} · supplied by AL. Switch to MK for independent review.`:'Record participation, then submit evidence as AL.';
 $('#submitted-evidence').textContent=state.evidence;
 $('#review-state').textContent=state.review?`${state.review.accepted?'Accepted for this simulation':'Revision requested'} · revision ${state.review.revision}: ${state.review.rationale}`:'Submit evidence, then switch to MK to review it.';
 $('#decision-state').textContent=decided?`JT · revision ${state.decision.revision}: ${state.decision.rationale}`:'Accept the current evidence as MK, then switch to JT to record a decision.';
 $('#allocation-state').textContent=state.allocation?'Policy preview recorded. No payment authorized or funds moved.':'A current community decision is required before previewing the policy.';
 $('#allocation').replaceChildren(...(state.allocation||[]).map(item=>{const li=document.createElement('li');li.textContent=`${item.label}: ${item.percent}%`;return li;}));
 $('#history').replaceChildren(...state.history.map(item=>{const li=document.createElement('li');li.textContent=`${participants[item.actor]} · revision ${item.revision} · ${item.step}: ${item.detail}`;return li;}));
 const done=[state.joined,!!state.revision,!!reviewed,decided,!!state.allocation],current=done.findIndex(x=>!x);
 document.querySelectorAll('.liquid-process li').forEach((li,i)=>{li.dataset.complete=String(done[i]);if(i===current)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');li.textContent=['Participation','Evidence','Review','Decision','Benefits'][i]+(done[i]?' · complete':'');});
}
$('#actor').onchange=()=>{render();$('#pilot-feedback').textContent=`Exploring as ${participants[$('#actor').value]}. Available actions are enabled below.`;};
$('#join').onclick=()=>run('join');$('#allocate').onclick=()=>run('allocate');
$('#evidence-form').onsubmit=e=>{e.preventDefault();run('evidence',$('#evidence').value);};
$('#review-form').onsubmit=e=>{e.preventDefault();run(e.submitter?.value||'review',$('#review-text').value);};
$('#decision-form').onsubmit=e=>{e.preventDefault();run('decide',$('#decision-text').value);};
$('#reset').onclick=()=>{state=initialPilot();document.querySelectorAll('form').forEach(f=>f.reset());$('#actor').value='operator';render();$('#pilot-feedback').textContent='Pilot reset. Start by recording participation as the operator.';};render();
