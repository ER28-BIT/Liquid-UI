import {readFile,writeFile} from 'node:fs/promises';
import {geoContains} from 'd3-geo';
const root=new URL('../',import.meta.url);
const geo=JSON.parse(await readFile(new URL('scripts/data/land-110m.geojson',root),'utf8'));
const points=[],count=95000,phi=Math.PI*(3-Math.sqrt(5));
const noise=i=>{const n=Math.sin(i*127.1+311.7)*43758.5453;return n-Math.floor(n);};
for(let i=0;i<count;i++){
 const lat=Math.asin(1-2*(i+.5)/count)*180/Math.PI+(noise(i)-.5)*.65;
 const lon=((i*phi*180/Math.PI)%360)-180+(noise(i+count)-.5)*.65;
 if(Math.abs(lon)<=180&&Math.abs(lat)<=90&&geoContains(geo,[lon,lat]))points.push([+lon.toFixed(3),+lat.toFixed(3)]);
}
await writeFile(new URL('components/globe-data.js',root),`// Natural Earth 1:110m land via world-atlas 2.0.2 (public domain).\n// Deterministic jittered sphere samples; geography only, not project or usage data.\nexport const landPoints = ${JSON.stringify(points)};\n`);
console.log(`Generated ${points.length} land points.`);
