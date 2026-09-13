import test from 'node:test';
import assert from 'node:assert/strict';
import {initialPilot,advance} from '../showcase/pilot-model.js';
const act=(s,type,actor='operator',text='Documented sample rationale')=>advance(s,{type,actor,text});
function reviewed(){let s=act(initialPilot(),'join');s=act(s,'evidence');return act(s,'review','reviewer');}
test('pilot requires participation, evidence and independent review before decision',()=>{
 assert.throws(()=>act(initialPilot(),'evidence'),/participation/);
 let s=act(initialPilot(),'join');assert.throws(()=>act(s,'review','reviewer'),/evidence/);
 assert.throws(()=>act(s,'evidence','operator','  '),/10 characters/);
 s=act(s,'evidence');assert.throws(()=>act(s,'review'),/independent reviewer/);
 assert.throws(()=>act(s,'decide','steward'),/accepted review/);
 s=act(s,'request-changes','reviewer');assert.throws(()=>act(s,'decide','steward'),/accepted review/);
});
test('pilot records a complete ordered journey without mutating earlier evidence',()=>{
 let s=reviewed();const before=s;
 assert.throws(()=>act(s,'allocate','steward'),/decision/);
 s=act(s,'decide','steward');s=act(s,'allocate','steward');
 assert.equal(s.allocation.reduce((sum,x)=>sum+x.percent,0),100);
 assert.deepEqual(s.history.map(x=>x.step),['join','evidence','review','decide','allocate']);
 assert.equal(before.decision,null);assert.equal(before.allocation,null);assert.equal(before.history.length,3);assert.throws(()=>act(s,'allocate','steward'),/already/);
});
test('an evidence revision invalidates review, decision and benefit preview, retaining history',()=>{
 let s=act(act(reviewed(),'decide','steward'),'allocate','steward');
 s=act(s,'evidence','operator','Updated signature and operating log');
 assert.equal(s.revision,2);assert.equal(s.review,null);assert.equal(s.decision,null);assert.equal(s.allocation,null);assert.equal(s.history.length,6);
 assert.throws(()=>act(s,'decide','steward'),/accepted review/);
 assert.throws(()=>act(s,'allocate','steward'),/decision/);
});
