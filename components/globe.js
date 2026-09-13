import {geoOrthographic, geoPath} from './d3-runtime.js';
import {landPoints} from './globe-data.js';
import {toVector, projectVector, validateMarkers, validateConnections} from './globe-math.js';
const vectors = landPoints.map(toVector);
/** Optional, framework-neutral visualization. Marker selection never authorizes a product action. */
export class LiquidGlobe extends HTMLElement {
  #connections = []; #markers = []; #selected = ''; #longitude = -25; #latitude = 14; #motion = false;
  #frame = 0; #lastTime = 0; #controller; #resize; #appearance; #reduced; #canvas; #list; #context; #drag;
  set markers(value) { const next = validateMarkers(value); validateConnections(this.#connections, next); this.#markers = next; if (!this.#markers.some(m => m.id === this.#selected)) this.#selected = ''; this.#renderList(); this.draw(); }
  set connections(value) { this.#connections = validateConnections(value, this.#markers); this.#renderList(); this.draw(); }
  get connections() { return this.#connections.map(c => ({...c})); }
  get markers() { return this.#markers.map(m => ({...m, coordinates:[...m.coordinates]})); }
  set selected(value) {
    const marker = this.#markers.find(m => m.id === value);
    if (!marker) return;
    this.#selected = marker.id; [this.#longitude, this.#latitude] = marker.coordinates;
    this.#renderList(); this.draw();
  }
  get selected() { return this.#selected; }
  focus(coordinates) {
    const [marker] = validateMarkers([{id:'focus',label:'View center',coordinates}]);
    [this.#longitude,this.#latitude] = marker.coordinates;
    this.draw();
  }
  connectedCallback() {
    if (this.#controller) return;
    this.classList.add('liquid-globe');
    this.innerHTML = `<div class="liquid-globe__stage"><canvas aria-hidden="true"></canvas></div><div class="liquid-globe__list" hidden></div><div class="liquid-globe__controls"><button type="button" data-mode="globe" aria-pressed="true">Globe</button><button type="button" data-mode="list" aria-pressed="false">List</button><button type="button" data-turn="-30" aria-label="Rotate globe west">←</button><button type="button" data-turn="30" aria-label="Rotate globe east">→</button><button type="button" data-motion aria-pressed="false">Motion off</button></div><span class="liquid-sr-only" role="status"></span>`;
    this.#canvas = this.querySelector('canvas'); this.#context = this.#canvas.getContext('2d'); this.#list = this.querySelector('.liquid-globe__list');
    this.#controller = new AbortController(); const opts = {signal:this.#controller.signal};
    this.#reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.#reduced.addEventListener('change', () => { if (this.#reduced.matches) this.#setMotion(false); }, opts);
    this.querySelector('[data-motion]').addEventListener('click', () => this.#setMotion(!this.#motion), opts);
    this.querySelectorAll('[data-turn]').forEach(button => button.addEventListener('click', () => { this.#setMotion(false); this.#longitude += Number(button.dataset.turn); this.draw(); }, opts));
    this.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => this.#setMode(button.dataset.mode), opts));
    this.#canvas.addEventListener('pointerdown', event => { this.#setMotion(false); this.#drag = {x:event.clientX,y:event.clientY,lon:this.#longitude,lat:this.#latitude,moved:false}; this.#canvas.setPointerCapture(event.pointerId); }, opts);
    this.#canvas.addEventListener('pointermove', event => {
      if (!this.#drag) return;
      const dx = event.clientX-this.#drag.x, dy=event.clientY-this.#drag.y;
      this.#drag.moved ||= Math.abs(dx)+Math.abs(dy)>5;
      this.#longitude = this.#drag.lon-dx*.3; this.#latitude = Math.max(-70,Math.min(70,this.#drag.lat+dy*.25)); this.draw();
    }, opts);
    this.#canvas.addEventListener('pointerup', event => {
      if (this.#drag && !this.#drag.moved) {
        const rect = this.#canvas.getBoundingClientRect(), radius=rect.width*.445;
        const hits=this.#markers.map(m=>({m,p:projectVector(toVector(m.coordinates),this.#longitude,this.#latitude)})).filter(({p})=>p[2]>0).map(({m,p})=>({m,d:Math.hypot(rect.width/2+p[0]*radius-(event.clientX-rect.left),rect.width/2+p[1]*radius-(event.clientY-rect.top))})).sort((a,b)=>a.d-b.d);
        if (hits[0]?.d<22) this.#choose(hits[0].m.id);
      }
      this.#drag=null;
    }, opts);
    this.#canvas.addEventListener('pointercancel',()=>{this.#drag=null;},opts);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)this.#stop();else if(this.#motion)this.#animate();},opts);
    this.#resize=new ResizeObserver(()=>{this.draw();if(this.#motion&&!this.#frame&&this.clientWidth)this.#animate();});this.#resize.observe(this);
    this.#appearance=new MutationObserver(()=>this.draw());
    for(let node=this;node;node=node.parentElement)this.#appearance.observe(node,{attributes:true,attributeFilter:['data-liquid-theme','data-liquid-transparency','class','style']});
    this.#renderList(); this.draw();
    if (!this.#context) this.#setMode('list');
  }
  disconnectedCallback() { this.#motion=false; this.#stop(); this.#controller?.abort(); this.#controller=null; this.#resize?.disconnect(); this.#appearance?.disconnect(); }
  #choose(id) {
    this.selected=id;
    this.querySelector('[role="status"]').textContent=`Selected ${this.#markers.find(m=>m.id===id).label}`;
    this.dispatchEvent(new CustomEvent('liquid-select',{bubbles:true,composed:true,detail:{id}}));
  }
  #renderList() {
    if (!this.#list) return;
    const focused = this.#list.contains(document.activeElement) ? document.activeElement.dataset.marker : null;
    this.#list.replaceChildren(...this.#markers.map(marker=>{const b=document.createElement('button');b.type='button';b.dataset.marker=marker.id;b.className='liquid-choice';b.textContent=marker.label;b.setAttribute('aria-pressed',String(marker.id===this.#selected));b.addEventListener('click',()=>this.#choose(marker.id));return b;}));
    if(this.#connections.length){
      const heading=document.createElement('h3');heading.textContent='Relationships';
      const list=document.createElement('ul');list.className='liquid-globe__relationships';
      for(const connection of this.#connections){
        const item=document.createElement('li');
        const source=this.#markers.find(m=>m.id===connection.source),target=this.#markers.find(m=>m.id===connection.target);
        item.textContent=`${source.label} — ${target.label}: ${connection.label}`;list.append(item);
      }
      this.#list.append(heading,list);
    }
    if(focused) [...this.#list.children].find(b=>b.dataset.marker===focused)?.focus();
  }
  #setMode(mode) {
    const list=mode==='list';this.querySelector('.liquid-globe__stage').hidden=list;this.#list.hidden=!list;
    this.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    this.querySelectorAll('[data-turn], [data-motion]').forEach(b=>b.disabled=list);
    if(list)this.#setMotion(false);else this.draw();
  }
  #setMotion(on) {
    this.#motion=on&&!this.#reduced.matches; const b=this.querySelector('[data-motion]'); b.setAttribute('aria-pressed',String(this.#motion)); b.textContent=this.#motion?'Motion on':'Motion off';
    if(on&&this.#reduced.matches)this.querySelector('[role="status"]').textContent='Motion remains off to respect your device preference.';
    this.#stop();if(this.#motion)this.#animate();
  }
  #stop() { cancelAnimationFrame(this.#frame);this.#frame=0;this.#lastTime=0; }
  #animate = (time=0) => {
    if (!this.isConnected||!this.#motion||document.hidden)return;
    if(!this.clientWidth){this.#stop();return;}
    if(time-this.#lastTime>32){this.#longitude+=Math.min((time-this.#lastTime)||0,50)*.003;this.#lastTime=time;this.draw();}
    this.#frame=requestAnimationFrame(this.#animate);
  };
  draw() {
    const c=this.#context, canvas=this.#canvas;if(!c||!canvas||canvas.hidden)return;
    const w=canvas.clientWidth;if(!w)return;
    const ratio=Math.min(devicePixelRatio||1,2),size=Math.round(w*ratio);if(canvas.width!==size){canvas.width=size;canvas.height=size;}
    c.setTransform(ratio,0,0,ratio,0,0);c.clearRect(0,0,w,w);const r=w*.445,mid=w/2;
    const styles=getComputedStyle(this),token=name=>styles.getPropertyValue(`--liquid-globe-${name}`).trim();
    const halo=c.createRadialGradient(mid,mid,r*.92,mid,mid,r*1.13);halo.addColorStop(0,token('halo'));halo.addColorStop(1,'transparent');c.fillStyle=halo;c.fillRect(0,0,w,w);
    const ocean=c.createRadialGradient(mid-r*.45,mid-r*.55,r*.05,mid,mid,r);ocean.addColorStop(0,token('ocean'));ocean.addColorStop(1,token('shade'));c.beginPath();c.arc(mid,mid,r,0,Math.PI*2);c.fillStyle=ocean;c.fill();
    c.strokeStyle=token('rim');c.globalAlpha=.65;c.lineWidth=.7;c.stroke();c.globalAlpha=1;
    // Geographic samples are generated from public-domain Natural Earth land, not invented outlines.
    const a=-this.#longitude*Math.PI/180,b=this.#latitude*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
    c.fillStyle=token('land');
    const stride=Math.max(1,Math.floor(320/w));
    for(let i=0;i<vectors.length;i+=stride){
      const [x,y,z]=vectors[i],rx=x*ca+z*sa,rz=z*ca-x*sa,ry=-(y*cb-rz*sb),depth=y*sb+rz*cb;
      if(depth<=0)continue;
      const seed=Math.sin(i*127.1+311.7)*43758.5453,variation=seed-Math.floor(seed);
      const light=Math.max(.2,Math.min(1,.55-rx*.28-ry*.3));
      c.globalAlpha=(.2+depth*.75)*(.25+variation*.75)*light;
      c.beginPath();c.arc(mid+rx*r,mid+ry*r,Math.max(.22,w/1100)*(.6+variation*1.3),0,Math.PI*2);c.fill();
      if(variation>.987){c.globalAlpha=.14*depth;c.beginPath();c.arc(mid+rx*r,mid+ry*r,Math.max(.6,w/320),0,Math.PI*2);c.fill();}
    }
    c.globalAlpha=1;
    // D3 clips great-circle routes at the horizon; never draw hidden-side links across the sphere.
    const projection=geoOrthographic().rotate([-this.#longitude,-this.#latitude]).translate([mid,mid]).scale(r).precision(.25);
    const path=geoPath(projection,c);
    for(const connection of this.#connections){
      const source=this.#markers.find(m=>m.id===connection.source),target=this.#markers.find(m=>m.id===connection.target);
      const active=connection.source===this.#selected||connection.target===this.#selected;
      c.strokeStyle=active?token('point'):token('land');c.lineWidth=active?1.2:.75;
      c.globalAlpha=active?.72:.32;c.shadowColor=c.strokeStyle;c.shadowBlur=active?7:0;
      c.beginPath();path({type:'LineString',coordinates:[source.coordinates,target.coordinates]});c.stroke();
    }
    c.shadowBlur=0;c.globalAlpha=1;
    for(const marker of this.#markers){const [x,y,z]=projectVector(toVector(marker.coordinates),this.#longitude,this.#latitude);if(z<=0)continue;
      const selected=marker.id===this.#selected;const px=mid+x*r,py=mid+y*r;
      c.fillStyle=selected?token('point'):styles.getPropertyValue('--liquid-color-brand-gold').trim();c.shadowColor=c.fillStyle;c.shadowBlur=selected?19:8;
      c.beginPath();c.arc(px,py,selected?5.5:3.5,0,Math.PI*2);c.fill();c.shadowBlur=0;
      if(selected){c.globalAlpha=.5;c.strokeStyle=c.fillStyle;c.beginPath();c.arc(px,py,10,0,Math.PI*2);c.stroke();c.globalAlpha=1;}
    }
  }
}
if (!customElements.get('liquid-globe')) customElements.define('liquid-globe', LiquidGlobe);
