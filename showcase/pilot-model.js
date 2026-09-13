// In-memory product fixture, intentionally outside the reusable package.
export const participants = {operator:'AL · Project operator',reviewer:'MK · Independent reviewer',steward:'JT · Community steward'};
export function initialPilot(){return {joined:false,evidence:'',revision:0,review:null,decision:null,allocation:null,history:[]};}
export function advance(state,action){
 const next=structuredClone(state),{type,actor,text=''}=action;
 if(!Object.hasOwn(participants,actor))throw Error('Choose a sample participant.');
 const require=(condition,message)=>{if(!condition)throw Error(message);};
 const rationale=()=>{require(typeof text==='string'&&text.trim().length>=10,'Add at least 10 characters of supporting detail.');return text.trim();};
 let detail='';
 if(type==='join') {require(actor==='operator','The operator starts this sample project.');require(!state.joined,'Participation is already recorded.');next.joined=true;detail='Participation recorded';}
 else {
  require(state.joined,'Record participation first.');
  if(type==='evidence') {require(actor==='operator','The operator supplies evidence.');next.evidence=rationale();next.revision++;next.review=null;next.decision=null;next.allocation=null;detail=`Evidence revision ${next.revision} submitted; later checks reset`;}
  else if(type==='review'||type==='request-changes') {require(actor==='reviewer','An independent reviewer must assess the evidence.');require(state.revision>0,'Submit evidence first.');detail=rationale();next.review={accepted:type==='review',revision:state.revision,actor,rationale:detail};next.decision=null;next.allocation=null;}
  else if(type==='decide') {require(actor==='steward','The community steward records the sample decision.');require(state.review?.accepted&&state.review.revision===state.revision,'An accepted review of the current revision is required.');detail=rationale();next.decision={actor,revision:state.revision,rationale:detail};next.allocation=null;}
  else if(type==='allocate') {require(actor==='steward','The community steward previews the benefit policy.');require(state.decision?.revision===state.revision&&state.review?.accepted,'Record a decision on the current evidence first.');require(!state.allocation,'This policy preview is already recorded.');next.allocation=[{label:'Operations',percent:60},{label:'Community benefit',percent:25},{label:'Maintenance reserve',percent:15}];detail='Illustrative 60/25/15 benefit policy previewed; no funds moved';}
  else throw Error('Unknown pilot action.');
 }
 next.history.push({step:type,actor,revision:next.revision,detail});return next;
}
