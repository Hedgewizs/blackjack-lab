/* Blackjack Lab side bets — rules, payouts, settlement.
   Payouts per Tim's spec. Edges are published 6-deck values. */
const SIDEBETS = {
  perfectPairs: {
    name:{en:"Perfect Pairs", zh:"完美對子"},
    pays:{en:"Mixed 6:1 · Colored 12:1 · Perfect 25:1", zh:"雜色 6:1 · 同色 12:1 · 完美 25:1"},
    edge:0.061,
    desc:{en:"Your first two cards are a pair. Mixed pair 6:1, same-color pair 12:1, same-suit pair 25:1.",
          zh:"前兩張成對。雜色對 6:1、同色對 12:1、同花色對 25:1。"},
    verdict:{en:"The cheapest of the bad bets at ~6% — which still means it costs 15× the main game. Fun tax, nothing more.",
             zh:"爛注裡最便宜的，約 6%——但還是主遊戲的 15 倍。娛樂稅，僅此而已。"},
  },
  twentyOnePlus3: {
    name:{en:"21+3", zh:"21+3"},
    pays:{en:"Flush 9:1 · Straight 10:1 · Trips 30:1 · Straight flush 40:1 · Suited trips 100:1", zh:"同花 9:1 · 順子 10:1 · 三條 30:1 · 同花順 40:1 · 同花三條 100:1"},
    edge:0.033,
    desc:{en:"Your two cards + the dealer's up card make a 3-card poker hand.",
          zh:"你的兩張加莊家明牌組成三張撲克牌型。"},
    verdict:{en:"~3% edge — the least-bad side bet here. Still 8× the main game. Counters can actually beat it at extreme counts, which is its only interesting property.",
             zh:"優勢約 3%——這裡最不爛的邊注，仍是主遊戲的 8 倍。極端數下算牌客真能打贏，這是它唯一有趣的性質。"},
  },
  royalMatch: {
    name:{en:"Royal Match", zh:"皇家同花"},
    pays:{en:"Suited K–Q 25:1 · Any suited 2.5:1", zh:"同花 K–Q 25:1 · 任意同花 2.5:1"},
    edge:0.037,
    desc:{en:"Your first two cards suited pays 2.5:1; suited King–Queen pays 25:1.",
          zh:"前兩張同花賠 2.5:1；同花 K–Q 賠 25:1。"},
    verdict:{en:"~3.7%. You're paid 2.5:1 on something that happens ~24% of the time — the math never had a chance.",
             zh:"約 3.7%。~24% 發生的事只賠 2.5:1——數學從一開始就沒機會。"},
  },
  luckyLadies: {
    name:{en:"Lucky Ladies", zh:"幸運女士"},
    pays:{en:"Any 20 4:1 · Suited 20 10:1 · Q♥Q♥ 200:1 (1000:1 w/ dealer BJ)", zh:"任意 20 點 4:1 · 同花 20 點 10:1 · Q♥Q♥ 200:1（莊家 BJ 時 1000:1）"},
    edge:0.24,
    desc:{en:"Your first two cards total 20. Bonuses for suited 20s and the queen-of-hearts pair.",
          zh:"前兩張合計 20 點。同花 20 和紅心 Q 對有紅利。"},
    verdict:{en:"~24% — one of the worst bets in the entire casino. The 1000:1 is bait; you're funding it at 24 cents on the dollar.",
             zh:"約 24%——全賭場最爛的注之一。1000:1 是誘餌；你每賭一塊錢送 24 分。"},
  },
  buster: {
    name:{en:"Buster Blackjack", zh:"爆牌獎金"},
    pays:{en:"Dealer busts: 3 cards 2:1 · 4 cards 5:1 · 5 cards 10:1 · 6 cards 30:1 · 7 cards 50:1 · 8+ cards 250:1", zh:"莊家爆牌：3 張 2:1 · 4 張 5:1 · 5 張 10:1 · 6 張 30:1 · 7 張 50:1 · 8 張以上 250:1"},
    edge:0.065,
    desc:{en:"Wins when the dealer busts — more cards in the bust, bigger the payout.",
          zh:"莊家爆牌就贏——爆牌用的牌越多賠越高。"},
    verdict:{en:"~6.5%. Feels winnable because dealers bust ~28% of the time — but almost all of those are 3-card busts paying 2:1.",
             zh:"約 6.5%。感覺會贏因為莊家 ~28% 會爆——但幾乎都是 3 張爆只賠 2:1。"},
  },
  insurance: {
    name:{en:"Insurance", zh:"保險"},
    pays:{en:"2:1 (max half your bet)", zh:"2:1（最高下注金一半）"},
    edge:0.075,
    desc:{en:"Offered when the dealer shows an ace. You're betting the dealer has blackjack.",
          zh:"莊家明牌 A 時提供。你在賭莊家有 blackjack。"},
    verdict:{en:"~7.5% for non-counters — a sucker bet. It's only correct at true count +3 or higher, when tens are rich enough that 2:1 is fair. If you're not counting, never take it.",
             zh:"不算牌的人約 7.5%——冤大頭注。只有真數 +3 以上、10 點夠多、2:1 變公平時才正確。不算牌就永遠別買。"},
  },
};
/* ---------- evaluation functions ---------- */
function isRed2(s){ return s==='♥'||s==='♦'; }
function sbPerfectPairs(cards){
  if(cards.length<2||cards[0].rank!==cards[1].rank) return 0;
  if(cards[0].suit===cards[1].suit) return 25;
  if(isRed2(cards[0].suit)===isRed2(cards[1].suit)) return 12;
  return 6;
}
function sb21Plus3(playerCards, dealerUp){
  const cs=[playerCards[0],playerCards[1],dealerUp];
  const vals=cs.map(c=>c.rank==='A'?1:Math.min(cardValue(c.rank),10)).sort((a,b)=>a-b);
  const suited=cs.every(c=>c.suit===cs[0].suit);
  const trips=vals[0]===vals[1]&&vals[1]===vals[2];
  const straight=(vals[2]-vals[0]===2&&vals[1]-vals[0]===1)||(vals[0]===1&&vals[1]===12&&vals[2]===13);
  const flush=!trips&&suited&&!straight;
  if(trips&&suited) return 100;
  if(straight&&suited) return 40;
  if(trips) return 30;
  if(straight) return 10;
  if(flush) return 9;
  return 0;
}
function sbRoyalMatch(cards){
  if(cards.length<2) return 0;
  const [a,b]=cards;
  if(a.suit!==b.suit) return 0;
  const rks=[a.rank,b.rank].sort().join('');
  if(rks==='KQ') return 25;
  return 2.5;
}
function sbLuckyLadies(cards, dealerBJ){
  if(cards.length<2) return 0;
  const v=handValue(cards);
  if(v.total!==20||v.blackjack) return 0;
  const qh=cards.filter(c=>c.rank==='Q'&&c.suit==='♥').length===2;
  if(qh) return dealerBJ?1000:200;
  if(cards[0].suit===cards[1].suit) return 10;
  return 4;
}
function sbBuster(dealerHand){
  const v=handValue(dealerHand);
  if(!v.bust) return 0;
  const n=dealerHand.length;
  if(n>=8) return 250;
  if(n===7) return 50;
  if(n===6) return 30;
  if(n===5) return 10;
  if(n===4) return 5;
  return 2;
}
/* Resolve the on-deal side bets. Returns [{id, mult, win}] */
function resolveDealSideBets(eng){
  const out=[];
  const sb=eng.sideBets||{};
  const h=eng.playerHands[0];
  if(!h||h.cards.length<2) return out;
  const dUp=eng.dealerHand[0];
  const checks={
    perfectPairs:()=>sbPerfectPairs(h.cards),
    twentyOnePlus3:()=>dUp?sb21Plus3(h.cards,dUp):0,
    royalMatch:()=>sbRoyalMatch(h.cards),
    luckyLadies:()=>sbLuckyLadies(h.cards, eng.dealerHand.length>1&&handValue(eng.dealerHand).blackjack),
  };
  for(const id of Object.keys(checks)){
    const amt=sb[id]||0;
    if(amt<=0) continue;
    const mult=checks[id]();
    const win=mult>0?amt*mult:0;
    if(win>0) eng.bankroll+=amt+win;
    out.push({id, mult, win, amt});
  }
  return out;
}
