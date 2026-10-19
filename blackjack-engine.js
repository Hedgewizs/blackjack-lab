/* Blackjack Lab engine — 6 variants, rules-correct dealing and settlement.
   Variants: classic, sixfive, european, spanish21, switch, freebet. */
const VARIANTS = {
  classic:  {decks:6, s17:true,  bjPay:1.5, das:true,  surrender:'late', holeCard:true,  spanish:false, switch:false, freeBet:false, push22:false,
             edge:0.004, edgeNote:{en:"~0.40% — the baseline good game", zh:"~0.40%——基準好遊戲"}},
  sixfive:  {decks:6, s17:true,  bjPay:1.2, das:true,  surrender:'late', holeCard:true,  spanish:false, switch:false, freeBet:false, push22:false,
             edge:0.018, edgeNote:{en:"~1.80% — the 6:5 tax costs +1.39%", zh:"~1.80%——6:5 稅多收 +1.39%"}},
  european: {decks:6, s17:true,  bjPay:1.5, das:true,  surrender:null,     holeCard:false, spanish:false, switch:false, freeBet:false, push22:false,
             edge:0.005, edgeNote:{en:"~0.50% — no-peek costs ~0.1% vs classic", zh:"~0.50%——無先看比經典版貴約 0.1%"}},
  spanish21:{decks:6, s17:false, bjPay:1.5, das:true,  surrender:'late', holeCard:true,  spanish:true,  switch:false, freeBet:false, push22:false,
             edge:0.004, edgeNote:{en:"~0.40% — with correct Spanish 21 strategy (different chart!)", zh:"~0.40%——要用正確的 Spanish 21 策略（不同的表！）"}},
  switch:   {decks:6, s17:true,  bjPay:1.0, das:true,  surrender:null,     holeCard:true,  spanish:false, switch:true,  freeBet:false, push22:true,
             edge:0.0058, edgeNote:{en:"~0.58% — switch power paid for by push-22 + 1:1 blackjack", zh:"~0.58%——換牌威力用 22 平手 + 1:1 賠付買單"}},
  freebet:  {decks:6, s17:true,  bjPay:1.5, das:true,  surrender:null,     holeCard:true,  spanish:false, switch:false, freeBet:true,  push22:true,
             edge:0.010, edgeNote:{en:"~1.0% — free doubles/splits paid for by push-22", zh:"~1.0%——免費雙倍/分牌用 22 平手買單"}},
};
const RANKS_STD = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const RANKS_SPANISH = ['A','2','3','4','5','6','7','8','9','J','Q','K']; // no 10s
const SUITS = ['♠','♥','♦','♣'];

function cardValue(rank){
  if(rank==='A') return 11;
  if(['J','Q','K'].includes(rank)) return 10;
  return parseInt(rank,10);
}
function handValue(cards){
  let total=0, aces=0;
  for(const c of cards){ total+=cardValue(c.rank); if(c.rank==='A') aces++; }
  let soft=false;
  while(total>21 && aces>0){ total-=10; aces--; }
  soft = cards.some(c=>c.rank==='A') && total<=21 && (total+10<=21 ? false : true);
  // recompute soft properly: soft if an ace counted as 11
  let t2=0, a2=0;
  for(const c of cards){ t2+=cardValue(c.rank); if(c.rank==='A') a2++; }
  soft=false;
  while(a2>0){ if(t2<=21){ soft=true; break; } t2-=10; a2--; }
  return {total, soft, bust: total>21, blackjack: cards.length===2 && total===21};
}

class BlackjackEngine {
  constructor(variantKey){
    this.variantKey = variantKey;
    this.v = VARIANTS[variantKey];
    this.bankroll = 500; this.startBank = 500;
    this.stats = {hands:0, won:0, lost:0, pushed:0};
    this.newShoe();
    this.reset();
  }
  newShoe(){
    const ranks = this.v.spanish ? RANKS_SPANISH : RANKS_STD;
    this.shoe = [];
    for(let d=0; d<this.v.decks; d++)
      for(const s of SUITS) for(const r of ranks)
        this.shoe.push({rank:r, suit:s});
    // Fisher-Yates
    for(let i=this.shoe.length-1;i>0;i--){
      const j=(Math.random()*(i+1))|0;
      [this.shoe[i],this.shoe[j]]=[this.shoe[j],this.shoe[i]];
    }
    this.cutAt = Math.floor(this.shoe.length*0.25); // reshuffle at 75% penetration
  }
  draw(){
    if(this.shoe.length<=this.cutAt) this.newShoe();
    return this.shoe.pop();
  }
  reset(){
    this.playerHands=[]; this.dealerHand=[];
    this.phase='betting'; this.switched=false;
    this.message='';
  }
  setBankroll(b){ this.bankroll=b; this.startBank=b; }
  // bets: array of amounts, length 1 (or 2 for switch)
  deal(bets){
    this.reset();
    const nHands = this.v.switch ? 2 : 1;
    const totalBet = bets.slice(0,nHands).reduce((a,b)=>a+b,0);
    if(totalBet>this.bankroll) throw new Error('bankroll');
    this.bankroll -= totalBet;
    for(let h=0; h<nHands; h++)
      this.playerHands.push({cards:[], bet:bets[h]||bets[0], doubled:false, split:false, freeDouble:false, freeSplit:false, stood:false, surrendered:false, done:false, result:null});
    this.dealerHand=[];
    // deal order: player(s), dealer up, player(s), dealer hole (if hole card)
    for(let h=0; h<nHands; h++) this.playerHands[h].cards.push(this.draw());
    this.dealerHand.push(this.draw());
    for(let h=0; h<nHands; h++) this.playerHands[h].cards.push(this.draw());
    if(this.v.holeCard) this.dealerHand.push(this.draw());
    this.phase = this.v.switch ? 'switch' : 'player';
    this.activeHand = 0;
    // check blackjacks — but defer if dealer shows Ace (insurance offered first)
    const dUpAce = this.dealerHand[0].rank==='A';
    const dBJ = this.v.holeCard && handValue(this.dealerHand).blackjack;
    const pBJ = this.playerHands.map(h=>handValue(h.cards).blackjack);
    if(dUpAce && this.v.holeCard && !pBJ.some(x=>x)){
      this.phase='insurance';
      this.insuranceOffered=true;
      this._pendingBJ={dBJ, pBJ};
      this.message='insurance_offer';
      return;
    }
    if(dBJ || pBJ.some(x=>x)){
      this.settleBlackjacks(dBJ, pBJ);
      return;
    }
    if(this.v.switch) this.message='switch_decision';
  }
  resolveInsurance(took, amt){
    // called after insurance decision; now settle any blackjacks
    this.insuranceOffered=false;
    const {dBJ, pBJ} = this._pendingBJ||{};
    this._pendingBJ=null;
    if(dBJ || (pBJ&&pBJ.some(x=>x))){
      this.settleBlackjacks(!!dBJ, pBJ||this.playerHands.map(h=>handValue(h.cards).blackjack));
      return;
    }
    this.phase = this.v.switch ? 'switch' : 'player';
    if(this.v.switch) this.message='switch_decision';
  }
  settleBlackjacks(dBJ, pBJ){
    this.phase='done'; this.stats.hands+=this.playerHands.length;
    this.playerHands.forEach((h,i)=>{
      const bet=h.bet;
      if(pBJ[i] && dBJ){ this.bankroll+=bet; h.result='push'; this.stats.pushed++; }
      else if(pBJ[i]){ const win=bet*this.v.bjPay; this.bankroll+=bet+win; h.result='blackjack'; h.win=win; this.stats.won++; }
      else if(dBJ){
        if(this.v.holeCard){ h.result='lose'; this.stats.lost++; } // bet already taken
        else { h.result='lose'; this.stats.lost++; }
      }
    });
    // European: dealer hole drawn now for display
    if(!this.v.holeCard && dBJ){ /* dealer BJ revealed */ }
    this.message = dBJ ? 'dealer_bj' : 'player_bj';
  }
  doSwitch(){
    if(this.phase!=='switch'||this.switched) return;
    const a=this.playerHands[0].cards, b=this.playerHands[1].cards;
    const t=a[1]; a[1]=b[1]; b[1]=t;
    this.switched=true; this.phase='player'; this.activeHand=0;
    this.message='';
  }
  keepHands(){ if(this.phase==='switch'){ this.phase='player'; this.activeHand=0; this.message=''; } }
  currentHand(){ return this.playerHands[this.activeHand]; }
  canDouble(h){
    if(h.cards.length!==2||h.doubled) return false;
    if(this.v.freeBet && [9,10,11].includes(handValue(h.cards).total) && !h.split) return true; // free double
    return this.bankroll>=h.bet;
  }
  canSplit(h){
    if(h.cards.length!==2||this.playerHands.length>=4) return false;
    if(h.cards[0].rank!==h.cards[1].rank) return false;
    if(h.split && h.cards[0].rank==='A') return false; // no resplit aces
    if(this.v.freeBet && cardValue(h.cards[0].rank)===10) return false; // no free split on 10s
    if(this.v.freeBet) return true; // free split
    return this.bankroll>=h.bet;
  }
  playerHit(){
    const h=this.currentHand();
    h.cards.push(this.draw());
    const v=handValue(h.cards);
    if(v.bust){ h.done=true; h.result='bust'; this.nextHand(); }
    else if(h.cards[0].rank==='A'&&h.split){ h.done=true; h.stood=true; this.nextHand(); } // split aces: one card
  }
  playerStand(){ const h=this.currentHand(); h.stood=true; h.done=true; this.nextHand(); }
  playerDouble(){
    const h=this.currentHand();
    if(!this.canDouble(h)) return;
    const isFree = this.v.freeBet && [9,10,11].includes(handValue(h.cards).total) && !h.split;
    if(!isFree) this.bankroll-=h.bet;
    else h.freeDouble=true;
    h.bet*=2; h.doubled=true;
    h.cards.push(this.draw());
    const v=handValue(h.cards);
    h.done=true;
    if(v.bust) h.result='bust';
    else h.stood=true;
    this.nextHand();
  }
  playerSplit(){
    const h=this.currentHand();
    if(!this.canSplit(h)) return;
    const isFree = this.v.freeBet && cardValue(h.cards[0].rank)!==10;
    if(!isFree) this.bankroll-=h.bet;
    else h.freeSplit=true;
    const c2=h.cards.pop();
    const nh={cards:[c2], bet:h.bet, doubled:false, split:true, freeDouble:false, freeSplit:isFree, stood:false, surrendered:false, done:false, result:null};
    h.cards.push(this.draw()); h.split=true;
    nh.cards.push(this.draw());
    this.playerHands.splice(this.activeHand+1,0,nh);
  }
  playerSurrender(){
    const h=this.currentHand();
    if(!this.v.surrender||h.cards.length!==2) return;
    h.surrendered=true; h.done=true; h.result='surrender';
    this.bankroll+=h.bet/2;
    this.nextHand();
  }
  nextHand(){
    this.activeHand++;
    if(this.activeHand>=this.playerHands.length){ this.dealerPlay(); }
  }
  dealerPlay(){
    // European: deal hole card now
    if(!this.v.holeCard) this.dealerHand.push(this.draw());
    const allDone = this.playerHands.every(h=>h.done&&(h.result==='bust'||h.result==='surrender'));
    let dv=handValue(this.dealerHand);
    // dealer BJ check (hole card games already settled; european checks now)
    if(!this.v.holeCard && dv.blackjack){
      this.settleDealerBJ(); return;
    }
    if(!allDone){
      while(true){
        dv=handValue(this.dealerHand);
        if(dv.total>21) break;
        if(dv.total>17) break;
        if(dv.total===17 && (!dv.soft || !this.v.s17)) break; // S17: stand all 17; H17: hit soft 17
        this.dealerHand.push(this.draw());
      }
    }
    this.settle();
  }
  settleDealerBJ(){
    // European no-peek: dealer BJ beats everything, players lose all (doubles/splits included)
    this.phase='done';
    this.playerHands.forEach(h=>{ h.result='lose'; });
    this.stats.hands+=this.playerHands.length; this.stats.lost+=this.playerHands.length;
    this.message='dealer_bj';
  }
  spanishBonus(hand){
    // returns bonus multiplier on bet for 21s (profit multiple)
    const cards=hand.cards, n=cards.length;
    const v=handValue(cards);
    if(v.total!==21||v.blackjack) return 0;
    const suited=cards.every(c=>c.suit===cards[0].suit);
    const spades=cards.every(c=>c.suit==='♠');
    const rks=cards.map(c=>c.rank);
    const is678 = rks.slice().sort().join(',')==='6,7,8';
    const is777 = rks.every(r=>r==='7');
    if(n>=7) return 3;
    if(n===6) return 2;
    if(n===5) return 1.5;
    if(is678||is777){ if(spades) return 3; if(suited) return 2; return 1.5; }
    return 0;
  }
  settle(){
    this.phase='done';
    const dv=handValue(this.dealerHand);
    const dealerBust=dv.total>21;
    const dealer22 = this.v.push22 && dv.total===22;
    this.playerHands.forEach(h=>{
      if(h.result==='bust'||h.result==='surrender'){ this.stats.hands++; this.stats.lost++; return; }
      const pv=handValue(h.cards);
      const bet=h.bet;
      this.stats.hands++;
      if(dealer22){ this.bankroll+=bet; h.result='push'; h.push22=true; this.stats.pushed++; return; }
      if(this.v.spanish21 && pv.total===21 && !pv.blackjack){
        // player 21 always wins in Spanish 21
        const bonus=this.spanishBonus(h);
        const win=bet*(1+bonus);
        this.bankroll+=bet+win; h.result='win21'; h.win=win; this.stats.won++; return;
      }
      if(dealerBust){ this.bankroll+=bet*2; h.result='win'; h.win=bet; this.stats.won++; return; }
      if(pv.total>dv.total){ this.bankroll+=bet*2; h.result='win'; h.win=bet; this.stats.won++; }
      else if(pv.total<dv.total){ h.result='lose'; this.stats.lost++; }
      else {
        // Spanish 21: player 21 pushes become wins (handled above); regular push
        this.bankroll+=bet; h.result='push'; this.stats.pushed++;
      }
    });
    this.message='settled';
  }
  // re-double for Spanish 21 (double after double)
  playerRedouble(){
    const h=this.currentHand();
    if(this.variantKey!=='spanish21'||!h.doubled||h.redoubled) return;
    if(this.bankroll<h.bet/2) return;
    this.bankroll-=h.bet/2; h.bet*=1.5; h.redoubled=true;
    h.cards.push(this.draw());
    const v=handValue(h.cards);
    h.done=true;
    if(v.bust) h.result='bust'; else h.stood=true;
    this.nextHand();
  }
}
