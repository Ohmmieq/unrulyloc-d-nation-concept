const drawer=document.getElementById('serviceDrawer');
const gallery=drawer.querySelector('.drawer-gallery');
const data={
starter:{kicker:'STARTER LOCS',title:'Starter Locs',copy:'A clean beginning, careful sectioning and a healthy foundation for the loc journey.',images:['assets/starter-locs.webp','assets/short-locs.webp','assets/blonde-style.webp','assets/hero-curly-locs-hq.webp']},
repair:{kicker:'LOC REPAIRS',title:'Loc Repairs',copy:'Repair-focused work for weak points, thinning sections and locs that need structure restored.',images:['assets/loc-repair-hq.webp','assets/loc-repair.webp','assets/starter-locs.webp','assets/fresh-retwist.webp']},
retwist:{kicker:'FRESH RETWIST',title:'Fresh Retwist',copy:'Clean parts, controlled tension and polished maintenance work for healthy, sharp locs.',images:['assets/fresh-retwist.webp','assets/loc-repair-hq.webp','assets/styles.webp','assets/hero-curly-locs-hq.webp']},
styles:{kicker:'STYLES',title:'Styles',copy:'Expressive loc styling with different finishes, lengths and personalities.',images:['assets/blonde-style.webp','assets/styles.webp','assets/hero-curly-locs-hq.webp','assets/short-locs.webp']}
};
function openService(key){
 const d=data[key];
 drawer.querySelector('.drawer-kicker').textContent=d.kicker;
 drawer.querySelector('.drawer-title').textContent=d.title;
 drawer.querySelector('.drawer-copy').textContent=d.copy;
 gallery.innerHTML=d.images.map((src,i)=>'<img src="'+src+'" alt="'+d.title+' example '+(i+1)+'">').join('');
 drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closeDrawer(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('.service').forEach(btn=>btn.addEventListener('click',()=>openService(btn.dataset.service)));
drawer.querySelector('.drawer-close').addEventListener('click',closeDrawer);
drawer.querySelector('.drawer-back').addEventListener('click',closeDrawer);
drawer.addEventListener('click',e=>{if(e.target===drawer)closeDrawer()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});