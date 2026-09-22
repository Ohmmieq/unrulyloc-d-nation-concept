const serviceData={
  starter:{
    title:"Starter Locs",
    copy:"Begin your loc journey with a clean foundation and expert technique. The gallery stays strictly on true starter locs: comb coils, early formation and clean sectioning.",
    list:["Comb coil starter locs","Clean parting & sectioning","Early-stage loc formation","Aftercare guidance"],
    images:["https://i.pinimg.com/originals/6d/6c/4b/6d6c4b98947d2e2bd43ccf8228158f4c.jpg","https://i.pinimg.com/originals/92/f2/12/92f212730946d750d04e6d07a6424f06.jpg"]
  },
  repair:{
    title:"Loc Repairs",
    copy:"Focused repair for thinning, weak or damaged locs. This gallery shows repair and maintenance work only — including before-and-after examples.",
    list:["Damage assessment","Weak-root reinforcement","Repair / reattachment","Maintenance planning"],
    images:["assets/loc-repair-hq.webp","assets/loc-repair.webp"]
  },
  retwist:{
    title:"Fresh Retwist",
    copy:"Fresh retwists with clean parts, controlled tension and polished roots. No braids, no unrelated protective styles.",
    list:["Fresh retwist","Clean root work","Defined parts","Healthy maintenance"],
    images:["assets/fresh-retwist.webp","assets/styles.webp"]
  },
  styles:{
    title:"Styles",
    copy:"Real loc styling only — curly locs, loc updos and finished dreadlock styles that still clearly read as locs.",
    list:["Curly loc styles","Loc updos","Natural loc texture","Statement finishes"],
    images:["https://i.pinimg.com/736x/a3/04/bb/a304bb8345afa9cc3aee601b567ba4a7.jpg","https://i.pinimg.com/originals/3c/61/a3/3c61a3492cd7758da29e0d646dae938f.jpg","https://i.pinimg.com/736x/7e/33/45/7e33450dc24501d5357f665549736c26.jpg"]
  }
};

let currentService="starter";
let currentIndex=0;
const title=document.getElementById("featureTitle");
const copy=document.getElementById("featureCopy");
const list=document.getElementById("featureList");
const main=document.getElementById("featureMain");
const thumbGrid=document.getElementById("thumbGrid");
const count=document.getElementById("galleryCount");
const viewAll=document.getElementById("viewAll");

function renderService(key,scroll=false){
  currentService=key; currentIndex=0;
  const d=serviceData[key];
  title.textContent=d.title;
  copy.textContent=d.copy;
  list.innerHTML=d.list.map(x=>'<li>'+x+'</li>').join('');
  viewAll.textContent='View All '+d.title;
  document.querySelectorAll('.service-card,.tab').forEach(el=>el.classList.toggle('active',el.dataset.service===key));
  thumbGrid.innerHTML=d.images.map((src,i)=>'<button class="thumb '+(i===0?'active':'')+'" data-i="'+i+'"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="'+src+'" alt="'+d.title+' example"></button>').join('');
  main.referrerPolicy='no-referrer';
  main.src=d.images[0];
  main.alt=d.title;
  count.textContent='01 / '+String(d.images.length).padStart(2,'0');
  thumbGrid.querySelectorAll('.thumb').forEach(btn=>btn.addEventListener('click',()=>setImage(Number(btn.dataset.i))));
  if(scroll) document.getElementById('featured').scrollIntoView({behavior:'smooth',block:'start'});
}
function setImage(i){
  const imgs=serviceData[currentService].images;
  currentIndex=(i+imgs.length)%imgs.length;
  main.src=imgs[currentIndex];
  thumbGrid.querySelectorAll('.thumb').forEach((b,j)=>b.classList.toggle('active',j===currentIndex));
  count.textContent=String(currentIndex+1).padStart(2,'0')+' / '+String(imgs.length).padStart(2,'0');
}
document.querySelectorAll('.service-card,.tab').forEach(el=>el.addEventListener('click',()=>renderService(el.dataset.service,true)));
document.getElementById('prevImg').addEventListener('click',()=>setImage(currentIndex-1));
document.getElementById('nextImg').addEventListener('click',()=>setImage(currentIndex+1));
viewAll.addEventListener('click',()=>document.getElementById('featured').scrollIntoView({behavior:'smooth'}));
renderService('starter');