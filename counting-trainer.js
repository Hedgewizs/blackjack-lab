/* Blackjack Lab counting trainer — Hi-Lo / KO / Omega II drills.
   Full-deck running count drill + true count drill, timed, scored. */
const COUNT_SYSTEMS = {
  hilo: {
    name:{en:"Hi-Lo", zh:"Hi-Lo"},
    values:{'2':1,'3':1,'4':1,'5':1,'6':1,'7':0,'8':0,'9':0,'10':-1,'J':-1,'Q':-1,'K':-1,'A':-1},
    irc:0, balanced:true,
    desc:{en:"2–6 = +1 · 7–9 = 0 · 10–A = −1. Start at 0.", zh:"2–6 = +1 · 7–9 = 0 · 10–A = −1。從 0 開始。"}
  },
  ko: {
    name:{en:"KO", zh:"KO"},
    values:{'2':1,'3':1,'4':1,'5':1,'6':1,'7':1,'8':0,'9':0,'10':-1,'J':-1,'Q':-1,'K':-1,'A':-1},
    irc:-4, balanced:false,
    desc:{en:"2–7 = +1 · 8–9 = 0 · 10–A = −1. Single deck starts at −4, ends at 0.", zh:"2–7 = +1 · 8–9 = 0 · 10–A = −1。單副從 −4 開始，數完歸 0。"}
  },
  omega2: {
    name:{en:"Omega II", zh:"Omega II"},
    values:{'2':1,'3':1,'4':2,'5':2,'6':2,'7':1,'8':0,'9':-1,'10':-2,'J':-2,'Q':-2,'K':-2,'A':0},
    irc:0, balanced:true,
    desc:{en:"4–6 = +2 · 2,3,7 = +1 · 8,A = 0 · 9 = −1 · 10–K = −2. Start at 0.", zh:"4–6 = +2 · 2、3、7 = +1 · 8、A = 0 · 9 = −1 · 10–K = −2。從 0 開始。"}
  },
};
const RANKS=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const SUITS2=['♠','♥','♦','♣'];
const SPEEDS=[{id:'slow',ms:1500,en:"Slow (1.5s)",zh:"慢速 (1.5秒)"},{id:'med',ms:900,en:"Casino (0.9s)",zh:"賭場速度 (0.9秒)"},{id:'fast',ms:500,en:"Fast (0.5s)",zh:"快速 (0.5秒)"}];
let TR={sys:'hilo',speed:'med',deck:[],idx:0,timer:null,running:0,phase:'idle',drills:0,correct:0,streak:0,best:0,tcDrills:0,tcCorrect:0};

function tSpeed(s){ const o=SPEEDS.find(x=>x.id===s); return (LANG==='zh'?o.zh:o.en); }
function buildTrainer(){
  const el=document.getElementById('trainerUI');
  if(!el) return;
  const L = LANG==='zh';
  el.innerHTML=`
  <div class="card"><h3 style="color:var(--gold);margin-top:0">${L?'1. 選系統':'1. Pick your system'}</h3>
    <div class="tabs">${Object.keys(COUNT_SYSTEMS).map(k=>`<button class="tab${TR.sys===k?' active':''}" onclick="TR.sys='${k}';buildTrainer()">${COUNT_SYSTEMS[k].name[L?'zh':'en']}</button>`).join('')}</div>
    <p class="muted">${COUNT_SYSTEMS[TR.sys].desc[L?'zh':'en']}</p>
    <h3 style="color:var(--gold)">${L?'2. 選速度':'2. Pick your speed'}</h3>
    <div class="tabs">${SPEEDS.map(s=>`<button class="tab${TR.speed===s.id?' active':''}" onclick="TR.speed='${s.id}';buildTrainer()">${tSpeed(s.id)}</button>`).join('')}</div>
    <h3 style="color:var(--gold)">${L?'3. 練習':'3. Drill'}</h3>
    <div class="center">
      <button class="btn" id="tstart" onclick="startDeckDrill()">${L?'開始整副牌訓練':'Start full-deck drill'}</button>
      ${COUNT_SYSTEMS[TR.sys].balanced?`<button class="btn ghost" onclick="startTCDrill()">${L?'真數快問':'True count quiz'}</button>`:''}
    </div>
    <div id="tstage" class="mt"></div>
    <div id="tscore" class="mt"></div>
  </div>
  <div class="card"><h3 style="color:var(--gold);margin-top:0">${L?'成績':'Score'}</h3><div id="tstats"></div></div>`;
  renderTStats();
}
function renderTStats(){
  const el=document.getElementById('tstats'); if(!el) return;
  const L=LANG==='zh';
  const acc=TR.drills?Math.round(TR.correct/TR.drills*100):0;
  const tcAcc=TR.tcDrills?Math.round(TR.tcCorrect/TR.tcDrills*100):0;
  el.innerHTML=`<div class="stat-grid">
    <div class="stat"><div class="v">${TR.drills}</div><div class="l">${L?'整副訓練':'Deck drills'}</div></div>
    <div class="stat"><div class="v">${acc}%</div><div class="l">${L?'算準率':'Accuracy'}</div></div>
    <div class="stat"><div class="v">${TR.streak}</div><div class="l">${L?'連對':'Streak'}</div></div>
    <div class="stat"><div class="v">${TR.best}</div><div class="l">${L?'最佳連對':'Best streak'}</div></div>
    ${TR.tcDrills?`<div class="stat"><div class="v">${tcAcc}%</div><div class="l">${L?'真數準率':'TC accuracy'}</div></div>`:''}
  </div>`;
}
function newDeck(){
  const d=[];
  for(const s of SUITS2) for(const r of RANKS) d.push({rank:r,suit:s});
  for(let i=d.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [d[i],d[j]]=[d[j],d[i]]; }
  return d;
}
function cardFace(c){
  const red=c.suit==='♥'||c.suit==='♦';
  return `<div class="pcard${red?' red':''}" style="width:84px;height:120px;margin:0 auto"><div class="rk" style="font-size:2rem">${c.rank}</div><div class="st" style="font-size:2.2rem">${c.suit}</div></div>`;
}
function startDeckDrill(){
  const sys=COUNT_SYSTEMS[TR.sys], L=LANG==='zh';
  TR.deck=newDeck(); TR.idx=0; TR.running=sys.irc; TR.phase='dealing';
  const ms=SPEEDS.find(s=>s.id===TR.speed).ms;
  const st=document.getElementById('tstage');
  document.getElementById('tstart').disabled=true;
  TR.timer=setInterval(()=>{
    if(TR.idx>=TR.deck.length){ clearInterval(TR.timer); askRunningCount(); return; }
    const c=TR.deck[TR.idx];
    TR.running+=sys.values[c.rank];
    st.innerHTML=`<div class="trainercard">${cardFace(c)}</div>
      <p class="center muted">${L?'第':'Card'} ${TR.idx+1} / 52 ${L?'張——心裡累計，不要寫下來':'— keep the count in your head'}</p>
      <div class="center"><button class="btn small danger" onclick="abortDrill()">${L?'放棄':'Give up'}</button></div>`;
    TR.idx++;
  }, ms);
}
function abortDrill(){
  clearInterval(TR.timer); TR.phase='idle';
  document.getElementById('tstart').disabled=false;
  document.getElementById('tstage').innerHTML=`<p class="muted center">${LANG==='zh'?'已放棄。再來一次？':'Aborted. Go again?'}</p>`;
}
function askRunningCount(){
  TR.phase='answer';
  const L=LANG==='zh';
  document.getElementById('tstage').innerHTML=`
    <p class="big center">${L?'整副牌發完了。流水數是多少？':'Deck complete. What is the running count?'}</p>
    <div class="rowflex" style="justify-content:center">
      <input type="number" id="tans" style="width:120px;font-size:1.4rem;text-align:center" placeholder="RC">
      <button class="btn" onclick="checkRunningCount()">${L?'送出':'Submit'}</button>
    </div>`;
  document.getElementById('tans').focus();
}
function checkRunningCount(){
  const L=LANG==='zh';
  const ans=+document.getElementById('tans').value;
  const right=TR.running;
  TR.drills++;
  const ok = ans===right;
  if(ok){ TR.correct++; TR.streak++; TR.best=Math.max(TR.best,TR.streak); }
  else TR.streak=0;
  document.getElementById('tstage').innerHTML=`
    <div class="center" style="font-size:3rem">${ok?'✅':'❌'}</div>
    <p class="big center">${ok?(L?'正確！':'Correct!'):(L?`正確答案是 <b class="neg">${right}</b>，你答 ${ans}`:`Answer was <b class="neg">${right}</b>, you said ${ans}`)}</p>
    <p class="muted center">${L?'提示：整副牌數完，平衡系統應該回到起始值。':'Tip: a full deck of a balanced system returns to its starting value.'}</p>
    <div class="center"><button class="btn" onclick="buildTrainer()">${L?'再練一次':'Drill again'}</button></div>`;
  TR.phase='idle';
  renderTStats();
}
function startTCDrill(){
  const L=LANG==='zh';
  // random RC and decks remaining
  const decksLeft=[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5][(Math.random()*10)|0];
  const rc=(Math.random()*21|0)-10;
  TR.tcRC=rc; TR.tcDecks=decksLeft; TR.tcVal=rc/decksLeft;
  TR.phase='tc';
  document.getElementById('tstage').innerHTML=`
    <p class="big center">${L?'流水數':'Running count'} <b style="color:var(--gold);font-size:2rem">${rc>0?'+':''}${rc}</b> · ${L?'剩餘':'Decks left'} <b style="font-size:2rem">${decksLeft}</b></p>
    <p class="center muted">${L?'真數是多少？（整數即可）':'What is the true count? (whole number)'}</p>
    <div class="rowflex" style="justify-content:center">
      <input type="number" id="tctans" style="width:120px;font-size:1.4rem;text-align:center" placeholder="TC">
      <button class="btn" onclick="checkTC()">${L?'送出':'Submit'}</button>
    </div>`;
  document.getElementById('tctans').focus();
}
function checkTC(){
  const L=LANG==='zh';
  const ans=+document.getElementById('tctans').value;
  const tc=TR.tcVal;
  TR.tcDrills++;
  const ok = Math.abs(ans-Math.floor(tc))<0.01 || Math.abs(ans-Math.round(tc))<0.01;
  if(ok) TR.tcCorrect++;
  document.getElementById('tstage').innerHTML=`
    <div class="center" style="font-size:3rem">${ok?'✅':'❌'}</div>
    <p class="big center">${L?'真數':'True count'} = ${TR.tcRC} ÷ ${TR.tcDecks} = <b>${tc.toFixed(2)}</b> → <b class="neg">${Math.floor(tc)}</b></p>
    <p class="muted center">${L?'實戰中取整（朝零方向）即可，分注階梯看整數。':'In practice, truncate toward zero — the ramp uses whole numbers.'}</p>
    <div class="center"><button class="btn" onclick="buildTrainer()">${L?'繼續':'Continue'}</button></div>`;
  TR.phase='idle';
  renderTStats();
}
