import {build} from 'esbuild';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const result=await build({stdin:{contents:"export {geoOrthographic,geoPath} from 'd3-geo';",resolveDir:root.pathname},bundle:true,format:'esm',minify:true,write:false,banner:{js:'// D3 geographic runtime. Rebuild: npm run build:d3. Licenses: assets/licenses/.'}});
const target=new URL('components/d3-runtime.js',root),output=result.outputFiles[0].text;
if(process.argv.includes('--check')){
 if(await readFile(target,'utf8')!==output)throw Error('D3 runtime is stale. Run npm run build:d3.');
}else{
 await writeFile(target,output);
 await mkdir(new URL('assets/licenses/',root),{recursive:true});
 for(const name of ['d3-geo','d3-array','internmap'])await writeFile(new URL(`assets/licenses/${name}.txt`,root),await readFile(new URL(`node_modules/${name}/LICENSE`,root)));
}
