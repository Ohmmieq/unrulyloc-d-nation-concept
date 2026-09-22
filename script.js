const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const serviceData={
 starter:{kicker:"STARTER LOCS",title:"Start clean. Start right.",copy:"A strong loc journey begins with the foundation: thoughtful sectioning, clean parts and a starter method selected around the hair and the look you want.",tags:["Consultation","Sectioning","Foundation","Aftercare"]},
 repair:{kicker:"LOC REPAIRS",title:"Restore. Strengthen. Rebuild.",copy:"Targeted repair for thinning, weak or damaged locs, including reinforcement and reattachment where appropriate.",tags:["Assessment","Repair","Reinforcement","Maintenance"]},
 retwist:{kicker:"FRESH RETWIST",title:"Clean roots. Sharp finish.",copy:"Root maintenance with clean sectioning, controlled tension and a polished finish that keeps the locs healthy and wearable.",tags:["Retwist","Clean parts","Maintenance","Finish"]},
 styles:{kicker:"LOC STYLES",title:"Make the crown yours.",copy:"From clean everyday styling to statement looks, style is built around the client's loc length, density and personality.",tags:["Consultation","Styling","Protective looks","Finish"]}
};
const serviceModal=document.querySelector(".service-modal");
document.querySelectorAll(".service-card").forEach(card=>{
  card.querySelectorAll(".service-trigger").forEach(trigger=>trigger.addEventListener("click",()=>{
    const d=serviceData[card.dataset.service];
    serviceModal.querySelector(".modal-kicker").textContent=d.kicker;
    serviceModal.querySelector(".modal-title").textContent=d.title;
    serviceModal.querySelector(".modal-copy").textContent=d.copy;
    serviceModal.querySelector(".modal-tags").innerHTML=d.tags.map(t=>`<span>${t}</span>`).join("");
    serviceModal.classList.add("open");serviceModal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  }));
});
function closeModal(modal){modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true");document.body.style.overflow="";}
serviceModal?.querySelector(".modal-close").addEventListener("click",()=>closeModal(serviceModal));
serviceModal?.addEventListener("click",e=>{if(e.target===serviceModal)closeModal(serviceModal)});

const imageModal=document.querySelector(".image-modal");
document.querySelectorAll(".gallery-item").forEach(item=>item.addEventListener("click",()=>{
  imageModal.querySelector("img").src=item.dataset.full;
  imageModal.querySelector("img").alt=item.dataset.title;
  imageModal.querySelector("p").textContent=item.dataset.title;
  imageModal.classList.add("open");imageModal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}));
imageModal?.querySelector(".image-close").addEventListener("click",()=>closeModal(imageModal));
imageModal?.addEventListener("click",e=>{if(e.target===imageModal)closeModal(imageModal)});

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  const f=btn.dataset.filter;
  document.querySelectorAll(".gallery-item").forEach(item=>item.classList.toggle("hidden",f!=="all"&&!item.dataset.category.includes(f)));
}));

const portalModal=document.querySelector(".portal-modal");
document.querySelector(".owner-login")?.addEventListener("click",()=>{portalModal.classList.add("open");portalModal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";});
portalModal?.querySelector(".portal-close").addEventListener("click",()=>closeModal(portalModal));
portalModal?.addEventListener("click",e=>{if(e.target===portalModal)closeModal(portalModal)});

document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal(serviceModal);closeModal(imageModal);closeModal(portalModal)}});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
const secObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${e.target.id}`))}),{rootMargin:"-42% 0px -48% 0px"});
sections.forEach(s=>secObs.observe(s));
