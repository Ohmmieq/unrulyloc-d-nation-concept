const serviceData={
  starter:{
    title:"Starter Locs",
    copy:"Begin your loc journey with a clean foundation and expert technique. Whether you want a natural look or a styled finish, we create locs that suit your lifestyle.",
    list:["Clean parting & sectioning","Professional installation","Guidance on aftercare","A style that fits you"],
    images:[
      "https://images.pexels.com/photos/20396517/pexels-photo-20396517.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/14009976/pexels-photo-14009976.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/22605218/pexels-photo-22605218.png?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/10883303/pexels-photo-10883303.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  },
  repair:{
    title:"Loc Repairs",
    copy:"Focused repair for thinning, weak or damaged locs. The goal is to restore structure while keeping the finished result natural and wearable.",
    list:["Damage assessment","Weak-point reinforcement","Loc reattachment where suitable","Maintenance guidance"],
    images:[
      "https://images.pexels.com/photos/15248411/pexels-photo-15248411.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/13911805/pexels-photo-13911805.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6665403/pexels-photo-6665403.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/14547369/pexels-photo-14547369.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  },
  retwist:{
    title:"Fresh Retwist",
    copy:"Clean roots, controlled tension and a polished finish. Retwists are handled with healthy maintenance in mind, not just appearance.",
    list:["Clean root work","Defined parting","Balanced tension","Optional finished style"],
    images:[
      "https://images.pexels.com/photos/13911805/pexels-photo-13911805.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6606916/pexels-photo-6606916.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/14009976/pexels-photo-14009976.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/17542285/pexels-photo-17542285.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  },
  styles:{
    title:"Styles",
    copy:"From understated everyday styling to bold statement finishes, each look is shaped around the client's loc length, density and personality.",
    list:["Consultation","Protective styling","Statement finishes","Personalised look"],
    images:[
      "https://images.pexels.com/photos/17542285/pexels-photo-17542285.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/14547369/pexels-photo-14547369.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/22605218/pexels-photo-22605218.png?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/10883303/pexels-photo-10883303.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
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
  title.textContent=d.title; copy.textContent=d.copy;
  list.innerHTML=d.list.map(x=>'<li>'+x+'</li>').join('');
  viewAll.textContent='View All '+d.title;
  document.querySelectorAll('.service-card,.tab').forEach(el=>el.classList.toggle('active',el.dataset.service===key));
  thumbGrid.innerHTML=d.images.map((src,i)=>'<button class="thumb '+(i===0?'active':'')+'" data-i="'+i+'"><img loading="lazy" decoding="async" src="'+src.replace('w=1200','w=500')+'" alt="'+d.title+' example"></button>').join('');
  main.src=d.images[0]; main.alt=d.title;
  count.textContent='01 / '+String(d.images.length).padStart(2,'0');
  thumbGrid.querySelectorAll('.thumb').forEach(btn=>btn.addEventListener('click',()=>setImage(Number(btn.dataset.i))));
  if(scroll) document.getElementById('featured').scrollIntoView({behavior:'smooth',block:'start'});
}
function setImage(i){
  const imgs=serviceData[currentService].images; currentIndex=(i+imgs.length)%imgs.length;
  main.src=imgs[currentIndex];
  thumbGrid.querySelectorAll('.thumb').forEach((b,j)=>b.classList.toggle('active',j===currentIndex));
  count.textContent=String(currentIndex+1).padStart(2,'0')+' / '+String(imgs.length).padStart(2,'0');
}
document.querySelectorAll('.service-card,.tab').forEach(el=>el.addEventListener('click',()=>renderService(el.dataset.service,true)));
document.getElementById('prevImg').addEventListener('click',()=>setImage(currentIndex-1));
document.getElementById('nextImg').addEventListener('click',()=>setImage(currentIndex+1));
viewAll.addEventListener('click',()=>document.getElementById('featured').scrollIntoView({behavior:'smooth'}));
renderService('starter');