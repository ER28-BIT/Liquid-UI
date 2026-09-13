import test from 'node:test';
import assert from 'node:assert/strict';
import {toVector, projectVector, validateMarkers} from '../components/globe-math.js';
import {landPoints} from '../components/globe-data.js';
test('projection puts a selected coordinate at the front center & hides its antipode',()=>{
 for(const [lon,lat] of [[0,0],[-61.5,15.5],[36.8,-1.3],[180,80]]){
  const [x,y,z]=projectVector(toVector([lon,lat]),lon,lat);assert.ok(Math.abs(x)<1e-10);assert.ok(Math.abs(y)<1e-10);assert.ok(Math.abs(z-1)<1e-10);
  const behind=projectVector(toVector([lon+180,-lat]),lon,lat);assert.ok(behind[2]<0);
 }
});
test('consumer marker contract rejects duplicate IDs, malformed coordinates & missing labels',()=>{
 const marker={id:'a',label:'A',coordinates:[12,34]};assert.equal(validateMarkers([marker])[0].id,'a');
 for(const data of [[marker,marker],[{...marker,coordinates:[181,0]}],[{...marker,coordinates:[0,NaN]}],[{...marker,label:''}]])assert.throws(()=>validateMarkers(data));
 const copy=validateMarkers([marker]);copy[0].coordinates[0]=0;assert.equal(marker.coordinates[0],12);
});
test('bundled geography is bounded, nonempty & contains no product records',()=>{
 assert.ok(landPoints.length>10000&&landPoints.length<40000);
 assert.ok(landPoints.every(p=>p.length===2&&p.every(Number.isFinite)&&Math.abs(p[0])<=180&&Math.abs(p[1])<=90));
});

test('relationships reject orphaned endpoints and preserve consumer ownership',async()=>{
 const {validateConnections}=await import('../components/globe-math.js');
 const markers=[{id:'a'},{id:'b'}],edge={id:'ab',source:'a',target:'b',label:'Peer learning'};
 const copy=validateConnections([edge],markers);copy[0].label='Changed';assert.equal(edge.label,'Peer learning');
 for(const input of [[edge,edge],[{...edge,target:'missing'}],[{...edge,target:'a'}],[{...edge,label:' '}]])assert.throws(()=>validateConnections(input,markers));
});
test('D3 paths clip the hidden hemisphere and align with Canvas marker projection',async()=>{
 const {geoOrthographic,geoPath}=await import('../components/d3-runtime.js');
 for(const [lon,lat] of [[-25,14],[90,-30],[180,80]]){
  const projection=geoOrthographic().rotate([-lon,-lat]).translate([0,0]).scale(1);
  for(const coords of [[0,0],[-61.5,15.5],[36.8,-1.3]]){
   const expected=projectVector(toVector(coords),lon,lat),actual=projection(coords);
   assert.ok(Math.abs(expected[0]-actual[0])<1e-9);assert.ok(Math.abs(expected[1]-actual[1])<1e-9);
  }
 }
 const path=geoPath(geoOrthographic().rotate([0,0]));
 assert.equal(path({type:'LineString',coordinates:[[170,0],[-170,0]]}),null);
 assert.ok(path({type:'LineString',coordinates:[[-60,15],[30,0]]}));
});
