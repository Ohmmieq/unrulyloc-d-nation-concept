const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const serviceData={
  starter:{
    kicker:"STARTER LOCS",
    title:"Starter Locs",
    copy:"Only starter-loc work belongs here — the beginning stage, early formation and progress as the locs mature.",
    storyTitle:"A clean start gives the locs room to become.",
    storyCopy:"This gallery grows as new starter-loc clients are added. The owner can upload each photo or video and tag it directly to Starter Locs.",
    cta:"Book Starter Locs",
    media:[
      ["assets/short-locs.webp","Starter loc stage"]
    ]
  },
  repair:{
    kicker:"LOC REPAIRS",
    title:"Loc Repairs",
    copy:"A focused repair portfolio — damaged areas, weak points and restored structure without mixing in unrelated styles.",
    storyTitle:"Repair work should show the actual change.",
    storyCopy:"Every repair upload can live here so a client looking for restoration sees repair examples immediately.",
    cta:"Ask About Repairs",
    media:[
      ["assets/loc-repair-hq.webp","Loc repair detail"]
    ]
  },
  retwist:{
    kicker:"FRESH RETWIST",
    title:"Fresh Retwists",
    copy:"Clean parts, crisp roots and polished maintenance work. This section stays strictly about retwists.",
    storyTitle:"Clean maintenance. Clear result.",
    storyCopy:"Fresh retwist photos and videos uploaded from the owner portal appear here and nowhere else unless the owner chooses another category.",
    cta:"Book a Retwist",
    media:[
      ["assets/fresh-retwist.webp","Fresh retwist"]
    ]
  },
  styles:{
    kicker:"STYLES",
    title:"Styles",
    copy:"The expressive side of the portfolio — different finishes, different lengths and different personalities.",
    storyTitle:"This is where the style work gets to breathe.",
    storyCopy:"Styles are kept separate from repair and starter work, so the section feels like a real visual portfolio instead of a repeated homepage gallery.",
    cta:"Ask About a Style",
    media:[
      ["assets/blonde-style.webp","Blonde loc style"],
      ["assets/hero-curly-locs-hq.webp","Curly loc style"],
      ["assets/styles.webp","Statement loc style"]
    ]
  }
};

const extension=document.querySelector("#service-extension");
const gallery=document.querySelector("#extension-gallery");
const imageModal=document.querySelector(".image-modal");

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

function renderExtension(key){
  const d=serviceData[key];
  extension.hidden=false;
  document.querySelector(".extension-kicker").textContent=d.kicker;
  document.querySelector(".extension-title").textContent=d.title;
  document.querySelector(".extension-copy").textContent=d.copy;
  document.querySelector(".extension-story-title").textContent=d.storyTitle;
  document.querySelector(".extension-story-copy").textContent=d.storyCopy;
  document.querySelector(".extension-book").innerHTML=d.cta+' <span>→</span>';
  gallery.innerHTML=d.media.map(([src,label])=>`
    <button class="extension-media" data-src="${src}" data-title="${label}">
      <img src="${src}" alt="${label}">
      <span>${label}</span>
    </button>`).join("");
  gallery.querySelectorAll(".extension-media").forEach(item=>item.addEventListener("click",()=>openImage(item.dataset.src,item.dataset.title)));
  document.querySelectorAll(".service-card").forEach(card=>card.classList.toggle("active",card.dataset.service===key));
  requestAnimationFrame(()=>extension.scrollIntoView({behavior:"smooth",block:"nearest"}));
}
document.querySelectorAll(".service-card").forEach(card=>{
  card.querySelectorAll(".service-select").forEach(btn=>btn.addEventListener("click",()=>renderExtension(card.dataset.service)));
});
document.querySelector(".extension-close")?.addEventListener("click",()=>{
  extension.hidden=true;
  document.querySelectorAll(".service-card").forEach(card=>card.classList.remove("active"));
});

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
