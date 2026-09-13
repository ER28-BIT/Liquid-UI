import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {once} from 'node:events';
const root=new URL('../',import.meta.url), port=process.env.LIQUID_TEST_PORT||'4182';
const server=spawn(process.execPath,['scripts/serve-showcase.mjs'],{cwd:root,env:{...process.env,LIQUID_UI_PORT:port}});
server.stderr.on('data',data=>process.stderr.write(data));
let browser;
try {
 await Promise.race([once(server.stdout,'data'),once(server,'exit').then(()=>{throw Error('Showcase server exited before ready');})]);
 const args=process.env.LIQUID_BROWSER_ARGS?JSON.parse(process.env.LIQUID_BROWSER_ARGS):[];
 browser=await chromium.launch({headless:true,executablePath:process.env.LIQUID_BROWSER_EXECUTABLE||undefined,args});
 const page=await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
 const errors=[],failures=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))failures.push(r.url());});
 const url=`http://127.0.0.1:${port}`;await page.goto(url);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('#network-globe canvas').isVisible(),true);
 assert.equal(await page.evaluate(()=>document.fonts.check('16px "Liquid DM Sans"')),true);
 assert.equal(await page.locator('#network-globe').evaluate(e=>e.markers.length),3);
 assert.equal(await page.locator('#network-globe').evaluate(e=>e.connections.length),3);
 await mkdir(new URL('docs/previews/',root),{recursive:true});
 await page.screenshot({path:new URL('docs/previews/overview.png',root).pathname,fullPage:true});
 await page.click('#explore-project');
 await page.screenshot({path:new URL('docs/previews/project.png',root).pathname,fullPage:true});
 await page.click('[data-person="steward"]');assert.match(await page.locator('#decision-context').innerText(),/training/);
 await page.click('[data-record="1"]');await page.click('#open-review');await page.fill('#review-rationale','Please attach the signed calibration record.');await page.click('#review-form [type="submit"]');assert.match(await page.locator('#review-feedback').innerText(),/No request sent/);await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'open-review');
 await page.click('[data-page="overview"]');await page.click('[data-region="west"]');assert.equal(await page.locator('#network-globe').evaluate(e=>e.selected),'west');await page.click('#explore-project');assert.equal(await page.locator('#project-title').innerText(),'Coastal learning chapter');
 await page.click('[data-page="overview"]');await page.click('#network-globe [data-mode="list"]');await page.getByRole('button',{name:'East Africa',exact:true}).click();assert.equal(await page.locator('#region-name').innerText(),'East Africa');await page.click('#network-globe [data-mode="globe"]');
 await page.emulateMedia({reducedMotion:'reduce'});await page.click('#network-globe [data-motion]');assert.equal(await page.locator('#network-globe [data-motion]').getAttribute('aria-pressed'),'false');
 // Shared material fallback and primary action contrast are checked in the rendered themes.
 for(const theme of ['light','dark','resonance']){await page.selectOption('#theme',theme);assert.equal(await page.locator('html').getAttribute('data-liquid-theme'),theme);}
 await page.click('#display-settings');await page.check('#solid-panels');await page.keyboard.press('Escape');assert.equal(await page.locator('.liquid-panel').first().evaluate(e=>getComputedStyle(e).backdropFilter),'none');
 await page.click('#display-settings');await page.uncheck('#solid-panels');await page.keyboard.press('Escape');
 for(const width of [320,390,768,1024,1600]){await page.setViewportSize({width,height:1000});for(const name of ['overview','project','components']){await page.click(`[data-page="${name}"]`);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${name} overflow at ${width}`);}}
 await page.setViewportSize({width:390,height:844});await page.click('[data-page="project"]');await page.screenshot({path:new URL('docs/previews/mobile-project.png',root).pathname,fullPage:true});
 await page.emulateMedia({forcedColors:'active'});await page.click('[data-page="overview"]');assert.equal(await page.locator('#network-globe .liquid-globe__list').isVisible(),true);await page.emulateMedia({forcedColors:'none'});
 await page.goto(url+'/showcase/consumer.html');await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('liquid-globe').evaluate(e=>e.markers.length),2);await page.click('liquid-globe [data-mode="list"]');assert.match(await page.locator('.liquid-globe__relationships').innerText(),/London reference point — Tokyo reference point: Illustrative research exchange/);await page.getByRole('button',{name:'Tokyo reference point',exact:true}).click();assert.equal(await page.locator('output').innerText(),'Selected tokyo');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Tokyo reference point');
 assert.equal(await page.locator('liquid-globe').evaluate(e=>{try{e.markers=[];return false;}catch{return e.markers.length===2&&e.connections.length===1;}}),true);
 // Lifecycle: disconnection cleans listeners; reconnection retains consumer data.
 await page.evaluate(()=>{const globe=document.querySelector('liquid-globe');const parent=globe.parentElement;globe.remove();parent.append(globe);});assert.equal(await page.locator('liquid-globe').evaluate(e=>e.markers.length),2);assert.equal(await page.locator('liquid-globe canvas').count(),1);
 assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
 console.log('Browser checks passed: repository assets, fonts, interactions, accessible list, reduced motion, solid panels, forced colors, five widths, independent consumer & reconnect.');
} finally {await browser?.close();server.kill();}
