const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
const toast=document.querySelector(".toast");
let toastTimer;

menuButton?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});

document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",()=> {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded","false");
  });
});

function showConceptToast(e){
  e?.preventDefault();
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);
}

document.querySelectorAll(".demo-action,.demo-book,.demo-social").forEach(el=>{
  el.addEventListener("click",showConceptToast);
});
