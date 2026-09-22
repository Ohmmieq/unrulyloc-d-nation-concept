const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
const toast=document.querySelector(".toast");
let toastTimer;

menuButton?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});

document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded","false");
  });
});

const serviceData={
  restoration:{
    number:"01",
    kicker:"HAIR RESTORATION",
    title:"Bring the crown back.",
    text:"A restoration-first service for locs that need structure, reinforcement and a healthier plan forward.",
    tags:["Assessment","Repair","Reinforcement","Aftercare"]
  },
  repairs:{
    number:"02",
    kicker:"LOC REPAIRS",
    title:"Repair what can be saved.",
    text:"Targeted support for thinning roots, damaged sections, breakage and detached locs — without turning the whole appointment into a rebuild.",
    tags:["Root repair","Reattachment","Crochet work","Strength"]
  },
  care:{
    number:"03",
    kicker:"LOC CARE",
    title:"Fresh roots. Healthy routine.",
    text:"Regular maintenance, retwists, cleansing and practical aftercare that helps clients keep their locs looking clean between appointments.",
    tags:["Retwist","Cleansing","Maintenance","Aftercare"]
  },
  instant:{
    number:"04",
    kicker:"INSTANT LOCS",
    title:"Start locked. Start strong.",
    text:"A professionally created loc foundation for clients who want to begin their journey with an established look from day one.",
    tags:["Consultation","Foundation","Sectioning","Finish"]
  }
};

const cards=[...document.querySelectorAll(".service-card")];
cards.forEach(card=>{
  card.addEventListener("click",()=>{
    cards.forEach(c=>c.classList.remove("active"));
    card.classList.add("active");
    const item=serviceData[card.dataset.service];
    document.querySelector(".spotlight-number").textContent=item.number;
    document.querySelector(".spotlight-kicker").textContent=item.kicker;
    document.querySelector(".spotlight-title").textContent=item.title;
    document.querySelector(".spotlight-text").textContent=item.text;
    document.querySelector(".spotlight-tags").innerHTML=item.tags.map(tag=>`<span>${tag}</span>`).join("");
  });
});

const lightbox=document.querySelector(".lightbox");
const lightboxImage=lightbox?.querySelector("img");
const lightboxTitle=lightbox?.querySelector("p");

document.querySelectorAll(".lightbox-trigger").forEach(button=>{
  button.addEventListener("click",()=>{
    lightboxImage.src=button.dataset.image;
    lightboxImage.alt=button.dataset.title;
    lightboxTitle.textContent=button.dataset.title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  });
});

function closeLightbox(){
  lightbox?.classList.remove("open");
  lightbox?.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelector(".lightbox-close")?.addEventListener("click",closeLightbox);
lightbox?.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();});

document.querySelector(".hub-demo")?.addEventListener("click",()=>{
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),5000);
  document.querySelector(".creator-flow")?.scrollIntoView({behavior:"smooth",block:"center"});
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.classList.add("visible");
  });
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const navAnchors=[...document.querySelectorAll('.nav-links a[href^="#"]')];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    navAnchors.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${entry.target.id}`));
  });
},{rootMargin:"-40% 0px -50% 0px"});
sections.forEach(section=>sectionObserver.observe(section));
