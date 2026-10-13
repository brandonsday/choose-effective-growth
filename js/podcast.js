/* Choose Effective Podcast guest page — questions preserved from podcast.dc.html. */
const QUESTIONS = [
 ['01','Tell me about your business + and the numbers (if you are comfortable sharing)',['Keep this short and sweet, the elevator pitch','Optional: Share numbers if you are comfortable. Revenue, net profit, %, or range.']],
 ['02','When did you first make the leap into entrepreneurship and leave your W2? Speak to someone who might be in that spot right now, thinking about doing the same thing.',[]],
 ['03',"Every business hits a wall at a certain size, and it's never the wall you expected. What was your first one, and what did you change to get past it? We all have challenges, normalize the struggle.",[]],
 ['04',"Someone out there is at half your revenue doing what you were doing five years ago. What would you tell them, knowing you'd have ignored it yourself?",[]],
 ['05','What is the biggest win you have had recently?',[]],
 ['06','What is the biggest challenge you are dealing with right now?',[]],
 ['07','What tool/app/website could you not live without?',[]],
 ['08','Knowing what you know now, what would you tell yourself to choose more of, and what would you tell yourself to cut? How are you Choosing Effective now 🙂',[]],
 ['09','Share how people can find out more about you? Website, social, etc.',[]]
];
document.addEventListener('DOMContentLoaded',()=>{
 const list=document.getElementById('question-list');if(list){const template=({n,text,notes})=>{const outer=document.createElement('div');outer.style.cssText='display:grid;grid-template-columns:56px minmax(0,1fr);gap:16px;padding:24px 0;border-bottom:1px solid var(--hair);';const num=document.createElement('div');num.className='mono';num.style.cssText='font-size:15px;font-weight:700;color:var(--orange-deep);padding-top:3px;';num.textContent=n;const content=document.createElement('div');const question=document.createElement('div');question.style.cssText='font-size:19px;line-height:1.5;color:var(--ink);font-weight:600;text-wrap:pretty;';question.textContent=text;content.append(question);for(const note of notes){const el=document.createElement('div');el.style.cssText='font-size:15px;line-height:1.5;color:var(--muted);margin-top:8px;';el.textContent=note;content.append(el);}outer.append(num,content);return outer;};list.replaceChildren(...QUESTIONS.map(([n,text,notes])=>template({n,text,notes})));}
 document.querySelectorAll('video').forEach(v=>{v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.setAttribute('muted','');v.setAttribute('playsinline','');v.setAttribute('loop','');const go=()=>{const p=v.play();if(p)p.catch(()=>{});};if(v.readyState>=2)go();else v.addEventListener('canplay',go,{once:true});});
});
