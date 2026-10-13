/* Choose Effective Growth — homepage behavior; extracted from original home.dc.html. */
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzK8hblkFdgPFKXYMEbsYq3d1Yg8Vy_0osyeDSvYyUJ1xPJdci-oa0l-IZKiOxnkH1g/exec';
const SALES_CALENDAR = 'https://calendar.app.google/EJKkFSMyX1VXw6S17';
const EPISODE_COUNT = 3;
const FALLBACK_EPISODES = [
 {url:'https://podcasters.spotify.com/pod/show/chooseeffective/episodes/004-Impress-Your-New-Boss-e2s2iu4',meta:'8 MIN',title:'Impress Your New Boss',blurb:'The first moves that earn trust and set the tone in a new role.'},
 {url:'https://podcasters.spotify.com/pod/show/chooseeffective/episodes/003-Growth-vs-Fixed-Mindset-e2s2il6',meta:'10 MIN',title:'Growth vs Fixed Mindset',blurb:"Why how you frame ability decides how far you'll go."},
 {url:'https://podcasters.spotify.com/pod/show/chooseeffective/episodes/002-Using-Email-e2s2ik9',meta:'15 MIN',title:'Using Email',blurb:'Turning the inbox from a time sink into a tool you control.'},
 {url:'https://podcasters.spotify.com/pod/show/chooseeffective/episodes/001-Inbox-Zero-e2s2iiv',meta:'12 MIN',title:'Inbox Zero',blurb:'A repeatable system for clearing email and keeping it clear.'}
];
const $ = s => document.querySelector(s);
const setVisible = (name, visible) => { const el=$(`[data-condition="${name}"]`); if(el) el.hidden=!visible; };
let menuOpen=false;
function closeMenu(){menuOpen=false;setVisible('menuOpen',false);$('[data-action="toggleMenu"]').textContent='☰';}
function toggleMenu(){menuOpen=!menuOpen;setVisible('menuOpen',menuOpen);$('[data-action="toggleMenu"]').textContent=menuOpen?'×':'☰';}
function openForm(){setVisible('open',true);setVisible('sent',false);setVisible('notSent',true);clearError();document.body.style.overflow='hidden';}
function closeForm(){setVisible('open',false);document.body.style.overflow='';}
function clearError(){const e=$('[data-condition="hasError"]');if(e){e.hidden=true;e.textContent='';}}
function showError(message){const e=$('[data-condition="hasError"]');if(e){e.textContent=message;e.hidden=false;}}
function mondayHeaders(){const mon=new Date();mon.setDate(mon.getDate()-((mon.getDay()+6)%7));for(let i=0;i<5;i++){const d=new Date(mon);d.setDate(d.getDate()-(4-i)*7);const el=$(`[data-week="${i+1}"]`);if(el)el.textContent=`${d.getMonth()+1}/${d.getDate()}`;}}
function makeEpisode(ep){
 const a=document.createElement('a');a.href=ep.url;a.target='_blank';a.rel='noopener';a.style.cssText='text-decoration:none;background:var(--darker);border:1px solid var(--line);border-radius:12px;padding:26px;display:block;transition:border-color .18s ease,transform .18s ease;';
 const line=document.createElement('div');line.style.cssText='display:flex;gap:16px;align-items:flex-start;';
 const left=document.createElement('div');left.style.cssText='display:flex;flex-direction:column;align-items:center;gap:8px;flex-shrink:0;';
 const play=document.createElement('div');play.style.cssText='width:46px;height:46px;border-radius:50%;background:var(--orange);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;';play.textContent='▶';
 const meta=document.createElement('div');meta.className='mono';meta.style.cssText='font-size:12px;color:#8a93a3;';meta.textContent=ep.meta;
 left.append(play,meta);
 const right=document.createElement('div');const title=document.createElement('div');title.className='disp';title.style.cssText='font-weight:700;font-size:20px;color:#fff;line-height:1.25;';title.textContent=ep.title;
 const blurb=document.createElement('p');blurb.style.cssText='font-size:14px;line-height:1.5;color:#98a2b3;margin-top:12px;';blurb.textContent=ep.blurb;right.append(title,blurb);line.append(left,right);a.append(line);
 a.addEventListener('mouseenter',()=>{a.style.borderColor='var(--orange)';a.style.transform='translateY(-3px)';});a.addEventListener('mouseleave',()=>{a.style.borderColor='var(--line)';a.style.transform='';});return a;
}
function renderEpisodes(eps){const el=$('#episode-list');if(el)el.replaceChildren(...eps.slice(0,EPISODE_COUNT).map(makeEpisode));}
function decode(s){const node=document.createElement('textarea');node.innerHTML=String(s||'');return node.value.replace(/\s+/g,' ').trim();}
function duration(dur){const s=String(dur||'').trim();if(!s)return '';let sec=0;if(s.includes(':'))s.split(':').map(Number).forEach(n=>sec=sec*60+(n||0));else sec=Number(s)||0;return sec?Math.max(1,Math.round(sec/60))+' MIN':'';}
function clip(s){return s.length<=120?s:s.slice(0,120).replace(/\s+\S*$/,'')+'…';}
async function loadEpisodes(){renderEpisodes(FALLBACK_EPISODES);try{const r=await fetch(SHEET_ENDPOINT+'?action=episodes');const data=await r.json();if(data&&data.ok&&Array.isArray(data.episodes)&&data.episodes.length){renderEpisodes(data.episodes.map(e=>({url:e.url,title:decode(e.title),meta:duration(e.duration),blurb:clip(decode(e.description))})));}}catch(e){/* Existing fallback remains visible. */}}
let sending=false;
async function submit(){if(sending)return;const field=n=>$(`[name="${n}"]`)?.value||'';const form={name:field('name'),email:field('email'),company:field('company'),revenue:field('revenue'),timeline:field('timeline'),bottleneck:field('bottleneck')};if(!form.name.trim()||!form.email.trim()){showError('Please add your name and email.');return;}
 sending=true;clearError();const btn=$('[data-action="submit"]');btn.textContent='Sending…';btn.disabled=true;
 try{await fetch(SHEET_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...form,submittedAt:new Date().toISOString()})});setVisible('notSent',false);setVisible('sent',true);window.open(SALES_CALENDAR,'_blank','noopener');}
 catch(e){showError('Something went wrong. Please try again or email us.');}
 finally{sending=false;btn.textContent='Book a call';btn.disabled=false;}
}
document.addEventListener('DOMContentLoaded',()=>{
 closeMenu();closeForm();setVisible('sent',false);setVisible('notSent',true);clearError();mondayHeaders();loadEpisodes();
 document.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',e=>{const action=el.dataset.action;if(['openForm','closeForm','submit','toggleMenu','closeMenu'].includes(action)){if(action==='openForm'||action==='submit')e.preventDefault();({openForm,closeForm,submit,toggleMenu,closeMenu})[action]();}}));
});
