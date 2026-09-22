const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");

menuToggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});

document.querySelectorAll(".main-nav a").forEach(link=>{
  link.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded","false");
  });
});

const serviceData={
  restoration:{
    number:"01",
    kicker:"HAIR RESTORATION",
    title:"Bring the crown back.",
    copy:"A restoration-first service built around preserving what can be saved, strengthening weak areas and creating a maintenance plan that protects the result.",
    tags:["Assessment","Repair","Reinforcement","Aftercare"]
  },
  retwist:{
    number:"02",
    kicker:"RETWIST & LOC CARE",
    title:"Fresh roots. Better energy.",
    copy:"Clean sectioning, comfortable tension and maintenance that leaves the crown polished without sacrificing healthy growth.",
    tags:["Retwist","Cleansing","Sectioning","Maintenance"]
  },
  repair:{
    number:"03",
    kicker:"LOC REPAIRS",
    title:"Repair before it snaps.",
    copy:"Targeted support for thinning roots, loose sections, breakage and detached locs — focused on the actual weak point, not a one-size-fits-all fix.",
    tags:["Weak roots","Crochet","Reattachment","Strength"]
  },
  instant:{
    number:"04",
    kicker:"INSTANT LOCS",
    title:"Start locked. Start strong.",
    copy:"A deliberate loc foundation for clients who want an established look from day one with clean parting, structure and a strong starting point.",
    tags:["Consultation","Sectioning","Foundation","Finish"]
  }
};

const detail=document.querySelector("#service-detail");
const marker=document.querySelector(".service-detail-marker");
const detailKicker=document.querySelector(".detail-kicker");
const detailTitle=document.querySelector(".detail-title");
const detailDescription=document.querySelector(".detail-description");
const detailTags=document.querySelector(".detail-tags");

document.querySelectorAll("[data-open-service]").forEach(button=>{
  button.addEventListener("click",()=>{
    const item=serviceData[button.dataset.openService];
    marker.textContent=item.number;
    detailKicker.textContent=item.kicker;
    detailTitle.textContent=item.title;
    detailDescription.textContent=item.copy;
    detailTags.innerHTML=item.tags.map(tag=>`<span>${tag}</span>`).join("");
    detail.scrollIntoView({behavior:"smooth",block:"center"});
  });
});

const serviceModal=document.querySelector(".service-modal");
const modalKicker=document.querySelector(".modal-kicker");
const modalTitle=document.querySelector(".modal-title");
const modalCopy=document.querySelector(".modal-copy");
const modalTags=document.querySelector(".modal-tags");

document.querySelectorAll(".service-panel").forEach(panel=>{
  panel.addEventListener("dblclick",()=>{
    const item=serviceData[panel.dataset.service];
    modalKicker.textContent=item.kicker;
    modalTitle.textContent=item.title;
    modalCopy.textContent=item.copy;
    modalTags.innerHTML=item.tags.map(tag=>`<span>${tag}</span>`).join("");
    serviceModal.classList.add("open");
    serviceModal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  });
});

function closeServiceModal(){
  serviceModal?.classList.remove("open");
  serviceModal?.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelector(".service-modal-close")?.addEventListener("click",closeServiceModal);
serviceModal?.addEventListener("click",e=>{if(e.target===serviceModal)closeServiceModal();});

const lightbox=document.querySelector(".lightbox");
const lightboxImg=lightbox?.querySelector("img");
const lightboxTitle=lightbox?.querySelector("p");

document.querySelectorAll("[data-lightbox]").forEach(card=>{
  card.addEventListener("click",()=>{
    lightboxImg.src=card.dataset.lightbox;
    lightboxImg.alt=card.dataset.title;
    lightboxTitle.textContent=card.dataset.title;
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

const portalModal=document.querySelector(".portal-modal");
function openPortal(){
  portalModal?.classList.add("open");
  portalModal?.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closePortal(){
  portalModal?.classList.remove("open");
  portalModal?.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelector(".portal-demo")?.addEventListener("click",openPortal);
document.querySelector(".studio-login-trigger")?.addEventListener("click",openPortal);
document.querySelector(".portal-modal-close")?.addEventListener("click",closePortal);
portalModal?.addEventListener("click",e=>{if(e.target===portalModal)closePortal();});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    closeLightbox();
    closeServiceModal();
    closePortal();
  }
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.classList.add("visible");
  });
},{threshold:.13});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll('.main-nav a[href^="#"]')];

const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    navLinks.forEach(link=>{
      link.classList.toggle("active",link.getAttribute("href")===`#${entry.target.id}`);
    });
  });
},{rootMargin:"-42% 0px -48% 0px"});

sections.forEach(section=>sectionObserver.observe(section));