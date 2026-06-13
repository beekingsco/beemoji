function keeperSVG(av,size){
 av=av||{style:"boy",skin:"#F5C9A0",hair:"#4A2E14"};
 const pony=av.style==="girl"?`<path d="M71 38 q13 7 9 26 q-2 9 -9 11 q4 -15 -3 -28 z" fill="${av.hair}" stroke="#2A1A06" stroke-width="3"/>`:"";
 const bangs=av.style==="girl"
  ?`<path d="M33 38 q17 -13 34 0 q-5 -9 -17 -9 q-12 0 -17 9 z" fill="${av.hair}"/>`
  :`<path d="M35 36 q15 -9 30 0 q-4 -7 -15 -7 q-11 0 -15 7 z" fill="${av.hair}"/>`;
 return `<svg width="${size}" height="${size*1.1}" viewBox="0 0 100 110">
  <ellipse cx="50" cy="105" rx="25" ry="4.5" fill="rgba(0,0,0,.14)"/>
  <rect x="30" y="58" width="40" height="38" rx="14" fill="#F7F4EC" stroke="#2A1A06" stroke-width="4"/>
  <rect x="21" y="62" width="12" height="22" rx="6" fill="#F7F4EC" stroke="#2A1A06" stroke-width="4"/>
  <rect x="67" y="62" width="12" height="22" rx="6" fill="#F7F4EC" stroke="#2A1A06" stroke-width="4"/>
  <rect x="44" y="70" width="12" height="9" rx="3" fill="none" stroke="#2A1A06" stroke-width="2.5" opacity=".4"/>
  <rect x="33" y="93" width="13" height="12" rx="5" fill="#D9CDB8" stroke="#2A1A06" stroke-width="4"/>
  <rect x="54" y="93" width="13" height="12" rx="5" fill="#D9CDB8" stroke="#2A1A06" stroke-width="4"/>
  <rect x="27" y="27" width="46" height="37" rx="15" fill="#FFFDF6" stroke="#2A1A06" stroke-width="4"/>
  <path d="M31 31 l38 29 M69 31 l-38 29 M50 28 v34" stroke="rgba(42,26,6,.16)" stroke-width="2"/>
  <circle cx="50" cy="46" r="14.5" fill="${av.skin}"/>
  ${bangs}${pony}
  <circle cx="44.5" cy="46" r="2.5" fill="#2A1A06"/><circle cx="55.5" cy="46" r="2.5" fill="#2A1A06"/>
  <path d="M45.5 52.5 q4.5 3.6 9 0" stroke="#2A1A06" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M24 27 q26 -14 52 0 l3 6 q-29 -11 -58 0 z" fill="#F0E6C9" stroke="#2A1A06" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="50" cy="17" rx="21" ry="10.5" fill="#F0E6C9" stroke="#2A1A06" stroke-width="4"/>
 </svg>`;
}
function terrainSVG(seed){
 const t=terrainOf(S.level);let deco="";
 const px=k=>((seed*31+k*23)%88)+6, py=(k,a,b)=>a+((seed*17+k*41)%(b-a));
 if(t.deco==="flowers")for(let k=0;k<5;k++){const x=8+k*20+((seed+k)%7);deco+=`<circle cx="${x}" cy="29" r="2.6" fill="#fff"/><circle cx="${x}" cy="29" r="1.2" fill="#FFD23E"/>`;}
 if(t.deco==="cacti")for(let k=0;k<3;k++)deco+=`<rect x="${16+k*32}" y="21" width="3.4" height="11" rx="1.7" fill="#4A8A4A"/>`;
 if(t.deco==="stars")for(let k=0;k<7;k++)deco+=`<circle cx="${px(k)}" cy="${py(k,3,17)}" r="1.1" fill="#fff"/>`;
 if(t.deco==="snow")for(let k=0;k<7;k++)deco+=`<circle cx="${px(k)}" cy="${py(k,3,19)}" r="1.3" fill="#fff"/>`;
 if(t.deco==="craters")for(let k=0;k<4;k++)deco+=`<ellipse cx="${12+k*24}" cy="${py(k,28,33)}" rx="5" ry="1.8" fill="rgba(0,0,0,.18)"/>`;
 if(t.deco==="clouds")deco+=`<ellipse cx="22" cy="13" rx="11" ry="4" fill="#fff" opacity=".85"/><ellipse cx="72" cy="9" rx="13" ry="4.5" fill="#fff" opacity=".85"/>`;
 if(t.deco==="city")for(let k=0;k<5;k++){const hh=8+((seed+k*3)%9);deco+=`<rect x="${6+k*19}" y="${30-hh}" width="9" height="${hh}" fill="rgba(40,40,70,.35)"/>`;}
 if(t.deco==="ballpark"){deco+=`<path d="M50 27 L68 20 L50 13 L32 20 Z" fill="#C98E5A" stroke="#fff" stroke-width="1"/><path d="M50 27 L84 14 M50 27 L16 14" stroke="#fff" stroke-width="1.2"/><rect x="7" y="3" width="2.4" height="13" fill="#9AA0A8"/><circle cx="8.2" cy="3" r="2.6" fill="#FFF3B0"/><rect x="90" y="3" width="2.4" height="13" fill="#9AA0A8"/><circle cx="91.2" cy="3" r="2.6" fill="#FFF3B0"/>`;}
 return `<svg class="terr" viewBox="0 0 100 36" preserveAspectRatio="none">
  <path d="M0 22 Q25 10 50 18 T100 15 V36 H0 Z" fill="${t.hill}" opacity=".85"/>
  ${deco}
  <path d="M0 28 Q30 21 55 27 T100 25 V36 H0 Z" fill="${t.g}"/>
  <path d="M0 33 Q40 28 100 31 V36 H0 Z" fill="${t.g2}"/>
 </svg>`;
}
function goalsFor(lv){return{earn:Math.round(800*Math.pow(1.8,lv-1)),jars:Math.round(250*Math.pow(1.75,lv-1)),wins:Math.min(8,1+Math.ceil(lv/2))};}
function applyEra(){
 const e=eraOf(S.level),t=terrainOf(S.level);
 document.body.style.background=
  "radial-gradient(circle at 50% -6%, rgba(255,250,215,.95), transparent 44%),"+
  "radial-gradient(130% 30% at 50% 104%, "+t.g2+" 60%, transparent 61%),"+
  "radial-gradient(170% 26% at 14% 106%, "+t.hill+" 62%, transparent 63%),"+
  "linear-gradient(180deg,"+e.c1+" 0%,#FFFFFF 52%,"+e.c2+" 100%)";
}
function maxPop(h){return 250+(h.supers||0)*40;}
/* ---------- BEE CREW SYSTEM (crafting logic) ---------- */
const ROLES=["w_forager","w_nurse","w_guard","w_scout","w_drone"];
function distinctRoles(h){return ROLES.filter(r=>h.workers.includes(r)).length;}
const CREWS=[
 {id:"royal",n:"Royal Court",desc:"A Queen + all 5 bee roles working together",bonus:{prod:1.2},test:h=>!!h.queen&&distinctRoles(h)===5},
 {id:"fortress",n:"Fortress Crew",desc:"3+ Guard Bees — nothing gets past them",bonus:{guard:2},test:h=>h.workers.filter(w=>w==="w_guard").length>=3},
 {id:"nursery",n:"Nursery Crew",desc:"3+ Nurse Bees — population booms",bonus:{pop:2},test:h=>h.workers.filter(w=>w==="w_nurse").length>=3},
 {id:"pathfinder",n:"Pathfinder Crew",desc:"2 Scouts + 2 Foragers — they find the good stuff",bonus:{prod:1.15},test:h=>h.workers.filter(w=>w==="w_scout").length>=2&&h.workers.filter(w=>w==="w_forager").length>=2},
 {id:"lounge",n:"Drone Lounge",desc:"3+ Drones... slower honey, but wild jackpots",bonus:{prod:0.75,jackpot:0.06},test:h=>h.workers.filter(w=>w==="w_drone").length>=3},
];
function crewOf(h){return CREWS.find(c=>c.test(h))||null;}
function crewBonus(h,k,d){const c=crewOf(h);if(!c||c.bonus[k]===undefined)return d;return c.bonus[k];}
function jackpotOf(h){return hiveFx(h,"jackpot",0)+crewBonus(h,"jackpot",0);}
function popMult(h){return hiveFx(h,"pop",1)*crewBonus(h,"pop",1);}
function crewDiscover(h){
 const c=crewOf(h);
 if(c&&!S.crews.includes(c.id)){S.crews.push(c.id);burst("a_beefly");fanfare();confetti(20);
  toast("NEW CREW COMBO: "+c.n+"!");S.sab+=8;checkAch();}
}
function mgWin(){S.mgWins++;S.lvWins=(S.lvWins||0)+1;}

/* ---------- achievements ---------- */
const ACHS=[
 {id:"first_hive",n:"Home Sweet Hive",d:"Place your very first hive",ic:"a_hive",c:50,s:5,t:()=>S.hives.length>=1},
 {id:"first_harvest",n:"First Drop",d:"Harvest your first honey",ic:"a_jar",c:50,s:5,t:()=>S.harvested>=1},
 {id:"honey_500",n:"Sticky Fingers",d:"Harvest 500 jars lifetime",ic:"a_jar",c:150,s:10,t:()=>S.harvested>=500},
 {id:"honey_5k",n:"Liquid Gold",d:"Harvest 5,000 jars lifetime",ic:"a_jar",c:500,s:25,t:()=>S.harvested>=5000},
 {id:"honey_50k",n:"Honey Tycoon",d:"Harvest 50,000 jars lifetime",ic:"a_g_gold",c:2000,s:60,t:()=>S.harvested>=50000},
 {id:"coins_1k",n:"First Thousand",d:"Earn 1,000 lifetime Bee Bucks",ic:"a_coin",c:100,s:10,t:()=>S.totalEarned>=1000},
 {id:"coins_25k",n:"Comb Over Cash",d:"Earn 25,000 lifetime Bee Bucks",ic:"a_coin",c:1000,s:30,t:()=>S.totalEarned>=25000},
 {id:"first_combo",n:"Royal Match",d:"Place a Queen on a hive to discover her special combo",ic:"bee:yellow:star_eyes:crown",c:100,s:10,t:()=>S.discovered.length>=1},
 {id:"combo_4",n:"Combo Collector",d:"Discover 4 hive transformations",ic:"a_q_disco",c:300,s:20,t:()=>S.discovered.length>=4},
 {id:"combo_8",n:"Hive Whisperer",d:"Discover 8 hive transformations",ic:"a_q_star",c:800,s:40,t:()=>S.discovered.length>=8},
 {id:"combo_all",n:"Master of Queens",d:"Discover EVERY combo!",ic:"a_s_kingbee",c:3000,s:100,t:()=>S.discovered.length>=QUEENS.length},
 {id:"pack_1",n:"Pack Rat",d:"Open your first Shop pack",ic:"a_pack",c:50,s:5,t:()=>S.packs>=1},
 {id:"pack_10",n:"Card Shark",d:"Open 10 packs",ic:"a_pack",c:400,s:25,t:()=>S.packs>=10},
 {id:"hives_3",n:"Growing Yard",d:"Run 3 hives at once",ic:"a_hive",c:200,s:15,t:()=>S.hives.length>=3},
 {id:"hives_5",n:"Apiary Empire",d:"Run 5 hives at once",ic:"a_hive",c:600,s:35,t:()=>S.hives.length>=5},
 {id:"mg_1",n:"Pest Control",d:"Win your first mini-game",ic:"a_mite",c:75,s:8,t:()=>S.mgWins>=1},
 {id:"mg_10",n:"Arcade Keeper",d:"Win 10 mini-games",ic:"a_hornet",c:400,s:25,t:()=>S.mgWins>=10},
 {id:"mg_25",n:"Game Bee",d:"Win 25 mini-games",ic:"a_w_guard",c:1000,s:50,t:()=>S.mgWins>=25},
 {id:"streak_3",n:"Faithful Keeper",d:"3-day play streak",ic:"a_sab",c:150,s:15,t:()=>S.streak>=3},
 {id:"streak_7",n:"Steward of the Week",d:"7-day play streak",ic:"a_sab",c:500,s:40,t:()=>S.streak>=7},
 {id:"trade_1",n:"Fair Deal",d:"Complete a trade with another keeper",ic:"n_hub",c:150,s:10,t:()=>S.trades>=1},
 {id:"first_craft",n:"Tinkerer",d:"Craft your first card at the Combine Bench",ic:"bee:blue:star_eyes",c:150,s:10,t:()=>(S.crafted||[]).length>=1},
 {id:"venue_2",n:"Booth Boss",d:"Open a Farmers Market booth",ic:"a_jar",c:300,s:20,t:()=>(S.venue||0)>=2},
 {id:"venue_4",n:"Shopkeeper",d:"Open your own retail shop",ic:"bee:yellow:big_smile:crown",c:1000,s:50,t:()=>(S.venue||0)>=4},
 {id:"venue_5",n:"Shelf Royalty",d:"Land the grocery store buyers",ic:"a_g_gold",c:2500,s:100,t:()=>(S.venue||0)>=5},
 {id:"all_craft",n:"Master Craftsbee",d:"Discover all 3 crafted cards",ic:"a_g_gold",c:600,s:40,t:()=>(S.crafted||[]).length>=3},
 {id:"duel_1",n:"Duel Winner",d:"Win a Hive Duel",ic:"a_w_guard",c:200,s:15,t:()=>S.duelWins>=1},
 {id:"jelly_1",n:"Royal Retirement",d:"Earn your first Royal Jelly",ic:"a_jelly",c:0,s:50,t:()=>S.jelly>=1},
 {id:"secret_1",n:"Foil Hunter",d:"Unlock a secret physical-pack card",ic:"a_s_robee",c:300,s:20,t:()=>SECRETS.some(x=>S.col[x.id]>0)},
 {id:"texas_1",n:"Texas Pride",d:"Collect a Texas varietal flora card",ic:"a_f_bluebonnet",c:200,s:15,t:()=>S.col.f_mesquite>0||S.col.f_bluebonnet>0},
 {id:"full_house",n:"Full Hive",d:"A hive with Queen, 3 bees & flora — and a full toolbelt",ic:"a_q_angel",c:750,s:40,t:()=>(S.toolbelt||[]).length>=3&&S.hives.some(h=>h.queen&&h.workers.length>=3&&h.flora)},
 {id:"bear_1",n:"Bear Whisperer",d:"Scare off a hungry bear",ic:"a_bear",c:400,s:25,t:()=>S.bears>=1},
 {id:"mites_100",n:"Mite Smasher",d:"Smash 100 mites lifetime",ic:"a_mite",c:500,s:30,t:()=>S.mitesSmashed>=100},
 {id:"forage_1",n:"Forage Boss",d:"Win a Forage Run match",ic:"a_f_orange",c:200,s:15,t:()=>S.forageWins>=1},
 {id:"moth_1",n:"Moth Buster",d:"Trap wax moths before they eat a card",ic:"a_moth",c:200,s:15,t:()=>S.mothWins>=1},
 {id:"lvl_5",n:"Rising Keeper",d:"Reach Level 5 — Mesquite Flats",ic:"a_f_mesquite",c:600,s:30,t:()=>S.level>=5},
 {id:"lvl_10",n:"Desert Boss",d:"Reach Level 10",ic:"hb_buzz",c:1500,s:60,t:()=>S.level>=10},
 {id:"lvl_14",n:"MOONBASE BEES!",d:"Reach Level 14 — bees on the Moon!",ic:"hb_moon",c:5000,s:150,t:()=>S.level>=14},
 {id:"swarm_1",n:"Swarm Catcher",d:"Capture a swarm",ic:"a_q_love",c:250,s:15,t:()=>S.swarmsCaught>=1},
 {id:"loss_1",n:"Hard Lesson",d:"Lose a colony — and keep on keeping",ic:"a_hive",c:100,s:20,t:()=>S.hivesLost>=1},
 {id:"crew_1",n:"Crew Chemistry",d:"Discover your first Crew Combo",ic:"a_w_guard",c:250,s:15,t:()=>S.crews.length>=1},
 {id:"crew_all",n:"Master Recruiter",d:"Discover every Crew Combo",ic:"a_s_kingbee",c:1500,s:60,t:()=>S.crews.length>=CREWS.length},
 {id:"insp_5",n:"Certified Inspector",d:"Pass 5 hive inspections",ic:"a_g_suit",c:400,s:25,t:()=>S.inspections>=5},
 {id:"insp_25",n:"State Apiary Inspector",d:"Pass 25 hive inspections",ic:"a_g_suit",c:1200,s:60,t:()=>S.inspections>=25},
];
let achQueue=[],achShowing=false;
function checkAch(){
 if(!S||S.tut<3)return;
 ACHS.forEach(a=>{
  if(!S.ach.includes(a.id)&&a.t()){S.ach.push(a.id);achQueue.push(a);}
 });
 if(!achShowing)showNextAch();
}
function showNextAch(){
 const a=achQueue.shift();
 if(!a){achShowing=false;return;}
 achShowing=true;
 const el=document.getElementById("achv");
 document.getElementById("achIcon").innerHTML=iconHTML(a.ic,100);
 document.getElementById("achName").textContent=a.n;
 document.getElementById("achDesc").textContent=a.d;
 document.getElementById("achRew").innerHTML=
  (a.c?`<div class="chip">${I("a_coin",18)} +${a.c}</div>`:"")+
  (a.s?`<div class="chip">${I("a_sab",18)} +${a.s}</div>`:"");
 el.classList.add("on");
 fanfare();confetti(36);
 document.getElementById("achCollect").onclick=()=>{
  S.coins+=a.c;S.sab+=a.s;blip(900,.1);
  el.classList.remove("on");
  render();queueSave();
  setTimeout(showNextAch,250);
 };
}

/* ---------- storage ---------- */
const mem={};
const Store={
 async get(k,sh=false){
  try{const r=await window.storage.get(k,sh);return r?r.value:null;}
  catch(e){try{const v=localStorage.getItem("bm-"+(sh?"s-":"p-")+k);if(v!==null)return v;}catch(e2){}
   return (k in mem)?mem[k]:null;}},
 async set(k,v,sh=false){
  try{await window.storage.set(k,v,sh);}
  catch(e){try{localStorage.setItem("bm-"+(sh?"s-":"p-")+k,v);}catch(e2){}}
  mem[k]=v;},
};

/* ---------- state ---------- */
let S=null,firstRun=false;
const now=()=>Date.now(); const rid=()=>"p"+Math.random().toString(36).slice(2,9);
function freshState(){return{pid:rid(),apiary:"My Apiary",tut:0,coins:0,jelly:0,sab:0,totalEarned:0,honey:{},
 col:{},hives:[],discovered:[],facts:1,streak:0,lastDay:"",lastSeen:now(),usedCodes:[],market:null,marketDay:"",
 harvested:0,packs:0,mgWins:0,trades:0,duelWins:0,ach:[],daily:{d:"",hd:false,wd:false,rb:false,fr:false},
 bears:0,mitesSmashed:0,forageWins:0,mothWins:0,bearOn:false,
 level:1,lvEarn:0,lvJars:0,lvWins:0,gearLv:{},hivesLost:0,swarmsCaught:0,wildSwarm:false,muted:false,crews:[],inspections:0,avatar:{style:"boy",skin:"#F5C9A0",hair:"#4A2E14"},keeperAt:0,ballpark:false};}
function newHive(){return{id:rid(),queen:null,flora:null,gear:[],workers:[],pop:10,stored:0,cap:200,mood:100,lastTend:0,mites:0,hornet:false,moths:false,mothsT:0,harvCd:0,gearCd:{},nursed:0,slots:5,supers:0,inspDue:false,nextInsp:now()+240000,beetles:false,chalk:false,critT:0};}
const TUT_DONE=9;

/* ---------- math ---------- */
function hiveDef(h){return h.queen?QUEENS.find(q=>q.id===h.queen):null;}
function hiveFx(h,k,d){const q=hiveDef(h);return (q&&q.fx[k])||d;}
function workerPow(h){return h.workers.reduce((a,w)=>a+(byId(w)?.pow||1),0);}
function lvBoost(g){return 1+0.15*((S.gearLv[g]||1)-1);}
function gearMult(h,k){return (S.toolbelt||[]).reduce((a,g)=>{const f=(byId(g)?.fx?.[k])||1;return a*(1+(f-1)*lvBoost(g));},1);}
function hasSmoker(){return (S.toolbelt||[]).includes("g_smoker")||(S.toolbelt||[]).includes("g_gold");}
function keeperPose(){return hasSmoker()?(Math.random()<.25?"wave":"idle"):(Math.random()<.3?"happy":"thumbs");}