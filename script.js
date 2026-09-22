const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const serviceData={
  starter:{
    kicker:"STARTER LOCS",
    title:"Starter Locs",
    copy:"A focused gallery for the beginning of the loc journey — foundations, early stages and progress.",
    storyTitle:"Start clean. Grow with intention.",
    storyCopy:"This section becomes the visual record of starter-loc clients over time. New starter work uploaded in the Studio Portal lands here automatically.",
    cta:"Book Starter Locs",
    media:[
      ["assets/short-locs.webp","Starter loc progress"],
      ["assets/starter-locs.webp","Healthy loc foundation"]
    ]
  },
  repair:{
    kicker:"LOC REPAIRS",
    title:"Loc Repairs",
    copy:"Repair work belongs here — weak points, thinning locs, reconstruction and the finished result.",
    storyTitle:"Restore what can be saved.",
    storyCopy:"The repair gallery is separate from every other service, so clients looking for restoration can see only relevant repair work.",
    cta:"Ask About Repairs",
    media:[
      ["assets/loc-repair.webp","Repair detail"],
      ["assets/starter-locs.webp","Restored structure"]
    ]
  },
  retwist:{
    kicker:"FRESH RETWIST",
    title:"Fresh Retwists",
    copy:"Clean parts, crisp roots and finished maintenance work — all in one retwist-only gallery.",
    storyTitle:"Maintenance should still look premium.",
    storyCopy:"Every fresh retwist photo or video uploaded under Fresh Retwist appears here, keeping this service page current without duplicating the homepage.",
    cta:"Book a Retwist",
    media:[
      ["assets/fresh-retwist.webp","Fresh retwist finish"],
      ["assets/loc-repair.webp","Clean root work"]
    ]
  },
  styles:{
    kicker:"STYLES",
    title:"Styles",
    copy:"A dedicated style gallery — different lengths, finishes and personalities, without mixing in repair or starter-loc work.",
    storyTitle:"Different locs. Different energy.",
    storyCopy:"This is where the expressive work lives. New style uploads can be added directly from the owner portal and tagged to Styles.",
    cta:"Ask About a Style",
    media:[
      ["assets/blonde-style.webp","Blonde loc style"],
      ["assets/short-locs.webp","Short loc styling"],
      ["assets/hero-curly-locs-hq.webp","Curly loc styling"]
    ]
  }
};

const extension=document.querySelector("#service-extension");
const gallery=document.querySelector("#extension-gallery");
const imageModal=document.querySelector(".image-modal");
let currentService=null;

function openImage(src,title){
  imageModal.querySelector("img").src=src;
  imageModal.querySelector("img").alt=title;
  imageModal.querySelector("p").textContent=title;
  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeImage(){
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelector(".modal-close")?.addEventListener("click",closeImage);
imageModal?.addEventListener("click",e=>{if(e.target===imageModal)closeImage()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeImage()});

function renderExtension(key){
  const d=serviceData[key];
  currentService=key;
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
  currentService=null;
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
