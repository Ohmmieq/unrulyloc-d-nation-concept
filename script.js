const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const serviceData={
  starter:{
    kicker:"STARTER LOCS",title:"The Starter Journey.",index:"01",
    copy:"See the foundation, early stages and how the locs develop with proper care.",
    journeyTitle:"A clean foundation changes everything.",
    journeyCopy:"Starter locs are not just the first appointment. They are the beginning of a process — sectioning, formation, maintenance and patience.",
    cta:"Book Starter Locs",
    photos:[
      ["assets/starter-locs.webp","Starter loc foundation"],
      ["assets/short-locs.webp","Early starter loc stage"],
      ["assets/blonde-style.webp","A styled loc outcome"]
    ]
  },
  repair:{
    kicker:"LOC REPAIRS",title:"Repair Work.",index:"02",
    copy:"See damaged, thinning or weak locs and the repair-focused work used to bring structure back.",
    journeyTitle:"Repair should preserve what can still be saved.",
    journeyCopy:"The repair process starts with the weak point, then reinforces or reconnects only where needed. The goal is strength without unnecessary overworking.",
    cta:"Ask About Repairs",
    photos:[
      ["assets/loc-repair.webp","Loc repair detail"],
      ["assets/starter-locs.webp","Loc structure detail"],
      ["assets/fresh-retwist.webp","Clean repaired finish"]
    ]
  },
  retwist:{
    kicker:"FRESH RETWIST",title:"Fresh Retwists.",index:"03",
    copy:"Clean parts, crisp root work and finished looks attached specifically to retwist appointments.",
    journeyTitle:"Maintenance keeps the crown sharp.",
    journeyCopy:"A retwist is about control, tension and clean sectioning. The finished look should be neat without compromising healthy growth.",
    cta:"Book a Retwist",
    photos:[
      ["assets/fresh-retwist.webp","Fresh retwist"],
      ["assets/loc-repair.webp","Detailed root work"],
      ["assets/styles.webp","Retwist styled finish"]
    ]
  },
  styles:{
    kicker:"STYLES",title:"Styled Locs.",index:"04",
    copy:"The styling gallery — different people, different lengths and different ways to wear locs.",
    journeyTitle:"The style should still look like you.",
    journeyCopy:"Styles are matched to the client's loc length, density and personality — from simple everyday looks to statement finishes.",
    cta:"Ask About a Style",
    photos:[
      ["assets/styles.webp","Statement loc style"],
      ["assets/blonde-style.webp","Blonde loc style"],
      ["assets/short-locs.webp","Short loc styling"],
      ["assets/fresh-retwist.webp","Styled retwist"]
    ]
  }
};

let currentService="starter";
let currentTab="photos";
const mediaGrid=document.querySelector("#media-grid");
const imageModal=document.querySelector(".image-modal");

function renderService(){
  const d=serviceData[currentService];
  document.querySelector(".work-kicker").textContent=d.kicker;
  document.querySelector(".work-title").textContent=d.title;
  document.querySelector(".work-copy").textContent=d.copy;
  document.querySelector(".journey-index").textContent=d.index;
  document.querySelector(".journey-title").textContent=d.journeyTitle;
  document.querySelector(".journey-copy").textContent=d.journeyCopy;
  document.querySelector(".journey-book").innerHTML=d.cta+' <span>→</span>';
  document.querySelectorAll(".service-card").forEach(c=>c.classList.toggle("active",c.dataset.service===currentService));

  if(currentTab==="videos"){
    mediaGrid.innerHTML='<div class="empty-video"><div><strong>Video uploads will live here.</strong><span>The owner portal can attach videos directly to '+d.kicker.toLowerCase()+'.</span></div></div>';
    return;
  }
  mediaGrid.innerHTML=d.photos.map(([src,label])=>`
    <button class="media-card" data-src="${src}" data-title="${label}">
      <img src="${src}" alt="${label}">
      <span class="media-label">${label}</span>
    </button>`).join("");
  document.querySelectorAll(".media-card").forEach(card=>card.addEventListener("click",()=>openImage(card.dataset.src,card.dataset.title)));
}

document.querySelectorAll(".service-card").forEach(card=>{
  card.querySelectorAll(".service-select").forEach(btn=>btn.addEventListener("click",()=>{
    currentService=card.dataset.service;
    currentTab="photos";
    document.querySelectorAll(".work-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab==="photos"));
    renderService();
    document.querySelector("#service-work").scrollIntoView({behavior:"smooth",block:"start"});
  }));
});

document.querySelectorAll(".work-tab").forEach(tab=>tab.addEventListener("click",()=>{
  currentTab=tab.dataset.tab;
  document.querySelectorAll(".work-tab").forEach(t=>t.classList.toggle("active",t===tab));
  renderService();
}));

function openImage(src,title){
  imageModal.querySelector("img").src=src;
  imageModal.querySelector("img").alt=title;
  imageModal.querySelector("p").textContent=title;
  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeImage(){imageModal.classList.remove("open");imageModal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
document.querySelector(".modal-close")?.addEventListener("click",closeImage);
imageModal?.addEventListener("click",e=>{if(e.target===imageModal)closeImage()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeImage()});

const toast=document.querySelector(".toast");
let toastTimer;
document.querySelector(".publish-demo")?.addEventListener("click",()=>{
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),3000);
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
const secObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${e.target.id}`))}),{rootMargin:"-42% 0px -48% 0px"});
sections.forEach(s=>secObs.observe(s));

renderService();
