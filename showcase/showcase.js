import '../components/globe.js';
// Fictional fixtures belong to this showcase, not to the exported components.
const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
const regions={
  caribbean:{label:'Caribbean',coordinates:[-61.5,15.5],sector:'Community energy',description:'People working together for resilient, locally governed energy systems.',project:'Riverbend community energy'},
  west:{label:'West Africa',coordinates:[-0.2,5.6],sector:'Learning & participation',description:'Mentors, learners & community stewards connecting practical learning with opportunity.',project:'Coastal learning chapter'},
  east:{label:'East Africa',coordinates:[36.8,-1.3],sector:'Skills & opportunity',description:'Local participants building practical skills & documenting accountable learning outcomes.',project:'Community skills initiative'}
};
const markers=Object.entries(regions).map(([id,r])=>({id,label:r.label,coordinates:r.coordinates}));
const globe=$('#network-globe'),mini=$('#region-globe');globe.markers=markers;mini.markers=markers;
globe.connections=[
 {id:'peer-learning',source:'caribbean',target:'west',label:'Illustrative exchange of community energy knowledge'},
 {id:'mentorship',source:'west',target:'east',label:'Illustrative peer mentorship & technical learning'},
 {id:'shared-practice',source:'caribbean',target:'east',label:'Illustrative sharing of project evidence & practice'}
];
let region='caribbean' ,record=1;
function selectRegion(id){region=id;const r=regions[id];$('#region-name').textContent=r.label;$('#region-sector').textContent=r.sector;$('#region-description').textContent=r.description;all('[data-region]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.region===id)));globe.selected=id;mini.selected=id;}
// Start with both Atlantic coasts visible, while the miniature focuses the selected region.
mini.selected=region;globe.selected=region;globe.focus([-25,14]);
globe.addEventListener('liquid-select',e=>selectRegion(e.detail.id));all('[data-region]').forEach(b=>b.onclick=()=>selectRegion(b.dataset.region));
const energy=[
 {title:'Operating log',state:'Received',by:'AL',detail:'Operating records received. Independent assessment remains a separate step.'},
 {title:'Meter calibration record',state:'Review pending',by:'AL',detail:'Missing item: calibration signature. A signed record is needed to assess measurement reliability.'},
 {title:'Community priorities',state:'Received',by:'JT',detail:'Local training & maintenance priorities have been recorded for review.'}
];
const learning=[
 {title:'Learning session record',state:'Received',by:'AL',detail:'Participation notes & learning materials have been submitted.'},
 {title:'Practical assessment',state:'Review pending',by:'AL',detail:'Missing item: assessor rationale. A reviewer needs supporting evidence before confirming the assessment.'},
 {title:'Learner priorities',state:'Received',by:'JT',detail:'Participants identified mentoring & practical learning as priorities.'}
];
const roles=()=>region==='caribbean'?['Project operator','Independent reviewer','Community steward']:['Chapter facilitator','Independent assessor','Community steward'];
const records=()=>region==='caribbean'?energy:learning;
function selectRecord(i){record=i;all('[data-record]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.record)===i)));const r=records()[i];const state=document.createElement('p');state.className='liquid-state';state.dataset.status=r.state==='Review pending'?'pending':'received';state.textContent=r.state==='Review pending'?'Independent review pending':'Evidence received';const detail=document.createElement('p');detail.textContent=r.detail;$('#decision-context').replaceChildren(state,detail);}
function renderProject(){
 $('#project-title').textContent=regions[region].project;
 all('.person-role').forEach((e,i)=>e.textContent=roles()[i]);
 all('[data-person]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.person==='operator')));
 $('#person-context').textContent=`${roles()[0]} · supplies supporting records & responds to evidence requests.`;
 $('#contribution-list').replaceChildren(...records().map((r,i)=>{const b=document.createElement('button');b.className='liquid-record';b.dataset.record=i;b.type='button';b.setAttribute('aria-pressed',String(i===record));const title=document.createElement('span');title.className='liquid-record__title';title.innerHTML='<svg class="liquid-icon" aria-hidden="true"><use href="#icon-file"/></svg>';title.append(document.createTextNode(r.title));const status=document.createElement('span');status.className='liquid-state';status.dataset.status=r.state==='Review pending'?'pending':'received';status.textContent=r.state;const by=document.createElement('span');by.className='liquid-caption';by.textContent=r.by;b.append(title,status,by);b.onclick=()=>selectRecord(i);return b;}));selectRecord(1);
}
function page(name){all('main > section').forEach(s=>s.hidden=s.id!==name);all('[data-page]').forEach(b=>{if(b.dataset.page===name)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});if(name==='project')renderProject();if(name==='overview')globe.draw();}
all('[data-page]').forEach(b=>b.onclick=()=>page(b.dataset.page));$('#explore-project').onclick=()=>page('project');
all('[data-person]').forEach((b,i)=>b.onclick=()=>{all('[data-person]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const descriptions=['supplies supporting records & responds to evidence requests.','assesses evidence & records the rationale for a decision.','documents local priorities & intended benefits.'];$('#person-context').textContent=`${roles()[i]} · ${descriptions[i]}`;selectRecord(i===0?0:i===1?1:2);});
const benefits={operations:'Operations · intended support for project delivery. Allocation requires an agreed policy.',community:'Community benefit · intended support for local training & participation. Recipients & amounts require an agreed policy.',reserve:'Maintenance reserve · intended support for upkeep & continuity. A reserve is not an immediately releasable payment.'};
all('[data-benefit]').forEach(b=>b.onclick=()=>{all('[data-benefit]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('#benefit-context').textContent=benefits[b.dataset.benefit];});
$('#theme').onchange=e=>{document.documentElement.dataset.liquidTheme=e.target.value;};
for(const id of ['display-settings','catalog-settings'])$('#'+id).onclick=()=>$('#settings-dialog').showModal();
$('#solid-panels').onchange=e=>document.documentElement.dataset.liquidTransparency=e.target.checked?'reduced':'default';
$('#open-review').onclick=()=>{$('#review-summary').textContent=records()[record].detail;$('#review-feedback').textContent='';$('#review-rationale').value='';$('#review-dialog').showModal();};$('#close-review').onclick=()=>$('#review-dialog').close();
$('#review-form').onsubmit=e=>{e.preventDefault();$('#review-feedback').textContent='Evidence request previewed. No request sent, approval granted or funds released.';};
const states=['verified','pending','not-ready','warning','rejected','simulated','restricted'];$('#state-catalog').replaceChildren(...states.map(status=>{const s=document.createElement('span');s.className='liquid-badge';s.dataset.status=status;s.textContent=status.replace('-',' ');return s;}));
$('#preview-feedback').onclick=()=>$('#feedback').textContent='Confirmation preview: your contribution was acknowledged. No project data was changed.';
// Hash links permit repeatable repository screenshots of either screen.
if(location.hash==='#project')page('project');else if(location.hash==='#components')page('components');
