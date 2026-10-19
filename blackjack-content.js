/* Blackjack Lab guide content — {en,zh} fields. Verified basic strategy (multi-deck, S17, DAS) and published rule-effect values. */
const GUIDES = [
{
id:"basics", icon:"🃏",
title:{en:"How to play: the 2-minute version", zh:"玩法：2 分鐘版本"},
intro:{en:"You play against the dealer, not the other players. Closest to 21 without going over wins. That's the whole game — the rest is knowing when to take another card.",
zh:"你是跟莊家對打，不是跟其他玩家。最接近 21 又不爆的贏。這就是整個遊戲——其餘是知道何時該再要牌。"},
sections:[
{h:{en:"The flow of a hand", zh:"一局的流程"},
body:{en:`<p>1. <b>Place your bet</b> — chips in the betting circle before the deal.<br>2. <b>Cards dealt</b> — you get two face up, dealer gets one up and one down (the hole card).<br>3. <b>Blackjack check</b> — if you have an ace + 10-value on the first two cards, that's <b>blackjack</b>: it pays <b>3:2</b> immediately (a $10 bet wins $15) unless the dealer also has it.<br>4. <b>Your turn</b> — <b>hit</b> (take a card), <b>stand</b> (keep your total), <b>double down</b> (double the bet, take exactly one card), <b>split</b> (two cards of equal value become two hands, matching bet on each), or <b>surrender</b> (give up half your bet, where offered).<br>5. <b>Dealer's turn</b> — the dealer <b>must hit until 17</b> (and stands on all 17s in most games). No choices, no strategy — a robot with a tie.<br>6. <b>Settle</b> — closer to 21 than the dealer wins even money; tie is a push (bet returned); over 21 is a bust and loses immediately.</p><p>Card values: number cards are face value, face cards are 10, aces are 1 or 11 (whichever helps you). A "soft" hand has an ace counted as 11 — it can't bust on one card.</p>`,
zh:`<p>1. <b>下注</b>——發牌前把籌碼放進投注圈。<br>2. <b>發牌</b>——你拿兩張明牌，莊家一明一暗（暗牌）。<br>3. <b>黑傑克檢查</b>——前兩張是 A + 10 點牌就是 <b>blackjack</b>：立刻賠 <b>3:2</b>（$10 贏 $15），除非莊家也有。<br>4. <b>你的回合</b>——<b>要牌</b>（再拿一張）、<b>停牌</b>（保留點數）、<b>雙倍</b>（賭注加倍、只拿一張）、<b>分牌</b>（兩張同點數拆成兩手、各加同等注）、<b>投降</b>（認輸一半、有提供的話）。<br>5. <b>莊家回合</b>——莊家<b>不到 17 必要牌</b>（多數遊戲軟 17 也停）。沒選擇、沒策略——打領帶的機器人。<br>6. <b>結算</b>——比莊家接近 21 贏等額；平手退注；超過 21 爆牌立刻輸。</p><p>牌面點數：數字牌按面值，花牌 10 點，A 可算 1 或 11（取對你有利的）。A 算 11 的牌叫「軟牌」——再要一張不會爆。</p>`}},
{h:{en:"The one rule that matters most", zh:"最重要的一條規則"},
body:{en:`<p>Before you sit down, look at the felt. It says what blackjack pays. <b>3:2</b> is the real game. <b>6:5</b> is a different, much more expensive game wearing the same clothes — it costs you an extra <b>1.39%</b> on every dollar you bet, which is more than triple the entire house edge of a good game.</p><p>This one line of felt text matters more than every strategy decision you'll ever make at the table. Walk past 6:5. Always.</p>`,
zh:`<p>坐下之前先看桌布，上面寫著 blackjack 賠多少。<b>3:2</b> 才是真正的遊戲。<b>6:5</b> 是穿著同樣衣服、貴得多的另一種遊戲——每賭一塊錢多花 <b>1.39%</b>，超過好遊戲全部莊家優勢的三倍。</p><p>桌布上這一行字，比你在桌上做的每個策略決定都重要。看到 6:5 就走開，永遠。</p>`}},
],
mathBox:{en:`With perfect basic strategy on a good 6-deck game (dealer stands on soft 17, double after split, late surrender, 3:2 blackjack), the house edge is about <b>0.4%</b>. That's the cheapest table game in the casino — and the only one where skilled play can flip it negative.`,
zh:`在好的六副牌遊戲（莊家軟 17 停牌、可分牌後雙倍、可晚投降、blackjack 3:2）用完美基本策略，莊家優勢約 <b>0.4%</b>。這是賭場裡最便宜的桌上遊戲——也是唯一技術好能翻轉成正期望值的遊戲。`},
verdict:{en:"Learn the rules in two minutes, then learn basic strategy — it's the difference between a 0.4% game and a 2% game, and it's free to learn.",
zh:"兩分鐘學會規則，然後學基本策略——那是 0.4% 和 2% 遊戲的差別，而且學費是零。"}
},
{
id:"basic", icon:"📋",
title:{en:"Basic strategy: the chart", zh:"基本策略：策略表"},
intro:{en:"Basic strategy is the mathematically correct play for every hand, worked out by computer simulation. It doesn't win — it minimizes what you lose to about 0.4%. Memorize it before you ever think about counting.",
zh:"基本策略是電腦模擬算出的每種牌型的數學正確打法。它不會讓你贏——但把虧損壓到約 0.4%。想學算牌之前，先把它背熟。"},
sections:[
{h:{en:"Hard hands (no ace, or ace counted as 1)", zh:"硬牌（無 A，或 A 算 1）"},
body:{en:`<p>Your total → play vs dealer upcard 2–A. <b>H</b>=hit, <b>S</b>=stand, <b>D</b>=double (hit if you can't).</p><div class="stratgrid"><div class="h">You</div><div class="h">2</div><div class="h">3</div><div class="h">4</div><div class="h">5</div><div class="h">6</div><div class="h">7</div><div class="h">8</div><div class="h">9</div><div class="h">10</div><div class="h">A</div><div class="c">8−</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">9</div><div class="c H">H</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">10</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c H">H</div><div class="c">11</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c">12</div><div class="c H">H</div><div class="c H">H</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">13–16</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">17+</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div></div><p class="muted">Multi-deck, dealer stands on soft 17, double after split allowed.</p>`,
zh:`<p>你的點數 → 對莊家明牌 2–A 的打法。<b>H</b>=要牌、<b>S</b>=停牌、<b>D</b>=雙倍（不能雙就改要牌）。</p><div class="stratgrid"><div class="h">你</div><div class="h">2</div><div class="h">3</div><div class="h">4</div><div class="h">5</div><div class="h">6</div><div class="h">7</div><div class="h">8</div><div class="h">9</div><div class="h">10</div><div class="h">A</div><div class="c">8−</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">9</div><div class="c H">H</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">10</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c H">H</div><div class="c">11</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c">12</div><div class="c H">H</div><div class="c H">H</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">13–16</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">17+</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div></div><p class="muted">多副牌、莊家軟 17 停牌、允許分牌後雙倍。</p>`}},
{h:{en:"Soft hands (ace counted as 11)", zh:"軟牌（A 算 11）"},
body:{en:`<div class="stratgrid"><div class="h">You</div><div class="h">2</div><div class="h">3</div><div class="h">4</div><div class="h">5</div><div class="h">6</div><div class="h">7</div><div class="h">8</div><div class="h">9</div><div class="h">10</div><div class="h">A</div><div class="c">A,2–A,5</div><div class="c H">H</div><div class="c H">H</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">A,6</div><div class="c H">H</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">A,7</div><div class="c S">S</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c S">S</div><div class="c S">S</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">A,8+</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div></div><p>The soft-hand rule of thumb: <b>never stand a soft 17 or less</b> — you can't bust, so always hit or double. A,7 vs 9/10/A feels wrong to hit, but standing loses more.</p>`,
zh:`<div class="stratgrid"><div class="h">你</div><div class="h">2</div><div class="h">3</div><div class="h">4</div><div class="h">5</div><div class="h">6</div><div class="h">7</div><div class="h">8</div><div class="h">9</div><div class="h">10</div><div class="h">A</div><div class="c">A,2–A,5</div><div class="c H">H</div><div class="c H">H</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">A,6</div><div class="c H">H</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">A,7</div><div class="c S">S</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c D">D</div><div class="c S">S</div><div class="c S">S</div><div class="c H">H</div><div class="c H">H</div><div class="c H">H</div><div class="c">A,8+</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div><div class="c S">S</div></div><p>軟牌經驗法則：<b>軟 17 以下永遠不停</b>——爆不了，所以只管要牌或雙倍。A,7 對 9/10/A 要牌感覺很怪，但停牌輸更多。</p>`}},
{h:{en:"Pairs: split or not", zh:"對子：分不分"},
body:{en:`<p><b>Always split:</b> A,A and 8,8. <b>Never split:</b> 10,10 and 5,5 (play 5,5 as hard 10 — double vs 2–9).<br><b>Split the rest</b> by the chart: 9,9 vs 2–6, 8, 9 (stand vs 7, 10, A); 7,7 vs 2–7; 6,6 vs 2–6; 4,4 vs 5,6 (only if double-after-split allowed); 3,3 and 2,2 vs 2–7.</p><p>Why always split 8s? 16 is the worst hand in blackjack — two hands starting at 8 each lose less than one hand of 16. It's damage control, not a winning play.</p>`,
zh:`<p><b>永遠分：</b>A,A 和 8,8。<b>永遠不分：</b>10,10 和 5,5（5,5 當硬 10 打——對 2–9 雙倍）。<br><b>其餘看表：</b>9,9 對 2–6、8、9 分（對 7、10、A 停）；7,7 對 2–7 分；6,6 對 2–6 分；4,4 對 5、6 分（僅允許分牌後雙倍時）；3,3 和 2,2 對 2–7 分。</p><p>為什麼 8 一定要分？16 是二十一點最爛的牌——兩個 8 開頭的手，虧得比一個 16 少。這是止血，不是賺錢招。</p>`}},
],
mathBox:{en:`Basic strategy cuts the house edge to ~<b>0.4%</b> on a good game. Playing by "gut feel" costs roughly <b>2%</b>. The chart is worth about 1.6% of every dollar you bet — the highest-paying thing you'll ever memorize for free.`,
zh:`基本策略把好遊戲的莊家優勢壓到約 <b>0.4%</b>。憑「感覺」打大約是 <b>2%</b>。這張表值你每賭一塊錢的 1.6%——是你這輩子背過最賺錢的免費東西。`},
verdict:{en:"Drill the chart in the simulator until it's reflex. Counting is useless without it — every index play assumes you already play every hand correctly.",
zh:"在模擬器裡練到變成反射動作。沒有它，算牌毫無意義——所有偏離打法都假設你每手本來就打得正確。"}
},
{
id:"rules", icon:"📏",
title:{en:"House rules: what each one costs you", zh:"賭場規則：每條讓你多付多少"},
intro:{en:"Not all blackjack tables are the same game. These are the rule variations you'll actually see, with what each one does to the house edge.",
zh:"不是所有二十一點桌都是同一個遊戲。以下是你實際會看到的規則差異，以及每條對莊家優勢的影響。"},
sections:[
{h:{en:"The price list", zh:"價目表"},
body:{en:`<table class="data"><tr><th>Rule</th><th>Good</th><th>Bad</th><th>Cost of the bad version</th></tr>
<tr><td>Blackjack pays</td><td><b>3:2</b></td><td>6:5</td><td class="num neg">+1.39%</td></tr>
<tr><td>Dealer on soft 17</td><td><b>Stands</b></td><td>Hits</td><td class="num neg">+0.22%</td></tr>
<tr><td>Double after split</td><td><b>Allowed</b></td><td>Not allowed</td><td class="num neg">+0.14%</td></tr>
<tr><td>Surrender</td><td><b>Late surrender</b></td><td>None</td><td class="num neg">+0.08%</td></tr>
<tr><td>Decks</td><td><b>1–2</b></td><td>8</td><td class="num neg">+0.03–0.06%</td></tr>
<tr><td>Double on</td><td><b>Any two cards</b></td><td>10–11 only</td><td class="num neg">+0.18%</td></tr>
<tr><td>Resplit aces</td><td><b>Allowed</b></td><td>Not allowed</td><td class="num neg">+0.08%</td></tr></table>
<p>Base game (6 decks, S17, DAS, late surrender, 3:2): about <b>0.4%</b>. Swap in 6:5 and H17 and you're at <b>2%</b> — five times the price, same felt color.</p>`,
zh:`<table class="data"><tr><th>規則</th><th>好</th><th>壞</th><th>壞版本多付</th></tr>
<tr><td>Blackjack 賠付</td><td><b>3:2</b></td><td>6:5</td><td class="num neg">+1.39%</td></tr>
<tr><td>莊家軟 17</td><td><b>停牌</b></td><td>要牌</td><td class="num neg">+0.22%</td></tr>
<tr><td>分牌後雙倍</td><td><b>允許</b></td><td>不允許</td><td class="num neg">+0.14%</td></tr>
<tr><td>投降</td><td><b>晚投降</b></td><td>無</td><td class="num neg">+0.08%</td></tr>
<tr><td>牌副數</td><td><b>1–2 副</b></td><td>8 副</td><td class="num neg">+0.03–0.06%</td></tr>
<tr><td>雙倍範圍</td><td><b>任意兩張</b></td><td>僅 10–11</td><td class="num neg">+0.18%</td></tr>
<tr><td>重分 A</td><td><b>允許</b></td><td>不允許</td><td class="num neg">+0.08%</td></tr></table>
<p>基準遊戲（6 副、S17、DAS、晚投降、3:2）：約 <b>0.4%</b>。換成 6:5 加 H17，直接到 <b>2%</b>——五倍價格，桌布同一個顏色。</p>`}},
{h:{en:"Reading the felt in 10 seconds", zh:"10 秒讀懂桌布"},
body:{en:`<p>Walk up to any table and check, in order: (1) <b>blackjack pays?</b> — 3:2 or walk away; (2) <b>dealer stands on soft 17?</b> — it's printed on the felt; (3) <b>how many decks?</b> — fewer is slightly better, but rules matter more than decks; (4) <b>surrender offered?</b> — nice to have, worth 0.08%.</p><p>On a cruise ship, you'll mostly find 6-deck, H17, 3:2 games around 0.6%. Playable. The 6:5 tables near the entrance are not.</p>`,
zh:`<p>走到任何桌前，依序檢查：(1) <b>blackjack 賠多少？</b>——3:2 留下，否則走人；(2) <b>莊家軟 17 停不停？</b>——印在桌布上；(3) <b>幾副牌？</b>——越少略好，但規則比副數重要；(4) <b>有投降嗎？</b>——有不錯，值 0.08%。</p><p>郵輪上多半是 6 副、H17、3:2，約 0.6%，可玩。入口附近的 6:5 桌不行。</p>`}},
],
mathBox:{en:`Rule shopping is the easiest edge you'll ever gain. Finding a 3:2 S17 table instead of a 6:5 H17 table is worth <b>1.6%</b> — more than perfect basic strategy earns you.`,
zh:`挑規則是你賺過最輕鬆的優勢。找到 3:2 S17 而不是 6:5 H17 的桌，值 <b>1.6%</b>——比完美基本策略賺的還多。`},
verdict:{en:"Memorize the price list, not just the strategy chart. The table you choose matters more than how you play.",
zh:"把價目表背熟，不只背策略表。你選哪張桌，比你怎麼打更重要。"}
},
{
id:"variants", icon:"🎲",
title:{en:"Six variants & how strategy changes", zh:"六種玩法與策略差異"},
intro:{en:"The simulator plays six blackjack variants. Same family, different rules — and the strategy adjustments that actually matter for each.",
zh:"模擬器有六種二十一點玩法。同一個家族，不同規則——以及每種真正重要的策略調整。"},
sections:[
{h:{en:"Classic & 6:5", zh:"經典版與 6:5"},
body:{en:`<p><b>Classic</b> (6 decks, S17, 3:2, DAS, late surrender): the baseline, ~<b>0.4%</b>. Everything in the basic strategy chapter applies exactly.</p><p><b>6:5</b>: identical rules except blackjack pays 6:5 — edge jumps to ~<b>1.8%</b>. Strategy barely changes (the chart is nearly the same), which is exactly why it's a trap: it <i>feels</i> like the same game. The simulator shows the edge difference on every hand so you feel the price.</p>`,
zh:`<p><b>經典版</b>（6 副、S17、3:2、DAS、晚投降）：基準，約 <b>0.4%</b>。基本策略章節完全適用。</p><p><b>6:5</b>：規則完全一樣，只差 blackjack 賠 6:5——優勢跳到約 <b>1.8%</b>。策略幾乎不變，這正是陷阱所在：<i>感覺</i>像同一個遊戲。模擬器每手都顯示優勢差異，讓你感受到價格。</p>`}},
{h:{en:"European (no hole card)", zh:"歐式（無暗牌）"},
body:{en:`<p>No hole card: the dealer doesn't peek. If the dealer ends up with blackjack, you lose <b>everything</b> — including doubled and split bets. Edge ~<b>0.5%</b> with correct adjustments.</p><p>Strategy change: be <b>less aggressive with doubles and splits vs dealer 10/A</b> — never double 11 vs 10, never split 8s vs 10/A in the no-peek game, because the extra money is dead when the dealer has blackjack.</p>`,
zh:`<p>無暗牌：莊家不先看牌。如果莊家最終是 blackjack，你<b>全部都輸</b>——包括雙倍和分牌的注。正確調整下優勢約 <b>0.5%</b>。</p><p>策略變化：對莊家 10/A 時<b>雙倍和分牌要保守</b>——無先看的遊戲裡，11 對 10 不雙倍、8 對 10/A 不分牌，因為莊家有 blackjack 時多投的錢直接蒸發。</p>`}},
{h:{en:"Spanish 21 (no 10s)", zh:"Spanish 21（無 10 點牌）"},
body:{en:`<p>Played with a 48-card Spanish deck — all four 10s removed (J/Q/K stay). Player 21 <b>always wins</b>, even against dealer 21. Late surrender, double-after-split, and you can <b>re-double</b> (double your double). Bonus payouts: 5-card 21 pays 3:2, 6-card 21 pays 2:1, 7+ card 21 pays 3:1, 6-7-8 or 7-7-7 bonuses. Dealer hits soft 17. Edge ~<b>0.4%</b> with correct strategy.</p><p>Strategy change: it's a <b>different chart</b> — much more doubling and hitting (e.g., double hard 9–11 aggressively, hit more stiffs) because 21 can't lose and bonuses reward multi-card hands. Don't use standard basic strategy here.</p>`,
zh:`<p>用 48 張西班牙牌——四張 10 全部拿掉（J/Q/K 留著）。玩家 21 點<b>必贏</b>，莊家 21 也一樣。晚投降、可分牌後雙倍、還能<b>再雙倍</b>。紅利賠付：5 張 21 賠 3:2、6 張 2:1、7 張以上 3:1，6-7-8 或 7-7-7 有紅利。莊家軟 17 要牌。正確策略下優勢約 <b>0.4%</b>。</p><p>策略變化：這是<b>另一張表</b>——雙倍和要牌積極得多（例如硬 9–11 大膽雙倍、硬牌多要），因為 21 不會輸、紅利獎勵多張牌。別拿標準基本策略來打。</p>`}},
{h:{en:"Blackjack Switch", zh:"Blackjack Switch"},
body:{en:`<p>You play <b>two hands</b> and may <b>switch the second cards</b> between them after the deal. To pay for that power: dealer <b>pushes on 22</b> (doesn't bust), and blackjack pays <b>1:1</b>. Edge ~<b>0.58%</b> with correct switch strategy.</p><p>Strategy change: switch decisions follow their own chart (e.g., switch to make 21s, avoid busts) — then each hand plays close to standard basic strategy, except you <b>never take insurance</b> and stand more against a dealer 22 threat.</p>`,
zh:`<p>你打<b>兩手</b>，發牌後可以<b>交換兩手的第二張牌</b>。代價是：莊家 <b>22 算平手</b>（不算爆），blackjack 只賠 <b>1:1</b>。正確換牌策略下優勢約 <b>0.58%</b>。</p><p>策略變化：換牌有自己的表（例如換出 21、避開爆牌）——之後每手接近標準基本策略，但<b>永遠不買保險</b>，面對莊家 22 威脅時更傾向停牌。</p>`}},
{h:{en:"Free Bet Blackjack", zh:"Free Bet Blackjack"},
body:{en:`<p>The casino gives you <b>free doubles</b> on 9/10/11 and <b>free splits</b> on all pairs except 10-values (special lammer chips, not your money). To pay for it: dealer <b>pushes on 22</b>, blackjack pays 3:2. Edge ~<b>1.0%</b>.</p><p>Strategy change: <b>always take the free double/split</b> — it's literally free money, so the strategy is MORE aggressive than standard (double soft hands you'd never double, split pairs you'd never split). The push-on-22 is where the casino gets it all back.</p>`,
zh:`<p>賭場送你<b>免費雙倍</b>（9/10/11）和<b>免費分牌</b>（10 點牌除外，用特別籌碼、不是你的錢）。代價：莊家 <b>22 算平手</b>，blackjack 賠 3:2。優勢約 <b>1.0%</b>。</p><p>策略變化：<b>免費的雙倍/分牌永遠要</b>——真的是免費的錢，所以策略比標準版<b>更激進</b>（平常不雙的軟牌也雙、平常不分的對子也分）。賭場靠 22 平手全拿回去。</p>`}},
],
mathBox:{en:`Variant edges at a glance: Classic <b>0.4%</b> · 6:5 <b>1.8%</b> · European <b>0.5%</b> · Spanish 21 <b>0.4%</b> · Switch <b>0.58%</b> · Free Bet <b>1.0%</b>. The simulator displays each variant's edge and the rules driving it.`,
zh:`各玩法優勢一覽：經典 <b>0.4%</b> · 6:5 <b>1.8%</b> · 歐式 <b>0.5%</b> · Spanish 21 <b>0.4%</b> · Switch <b>0.58%</b> · Free Bet <b>1.0%</b>。模擬器會顯示每種玩法的優勢與背後的規則。`},
verdict:{en:"Every variant is priced honestly in the simulator. The lesson is always the same: read the rules, know the price, then decide if the game is worth playing.",
zh:"模擬器裡每種玩法都誠實標價。教訓永遠一樣：讀懂規則、知道價格，再決定這遊戲值不值得玩。"}
},
{
id:"sidebets", icon:"🎰",
title:{en:"Side bets: the honest price list", zh:"邊注：誠實價目表"},
intro:{en:"Every side bet is entertainment with a price tag. Here are the six you'll actually see, what they pay, what they cost, and my verdict on each.",
zh:"每個邊注都是明碼標價的娛樂。以下是你實際會看到的六種：賠付、代價，以及我對每個的評價。"},
sections:[
{h:{en:"The six side bets", zh:"六種邊注"},
body:{en:`<table class="data"><tr><th>Side bet</th><th>How it wins</th><th>Top payout</th><th>House edge</th></tr>
<tr><td><b>Perfect Pairs</b></td><td>Your first two cards are a pair</td><td class="num">25:1 (same suit)</td><td class="num neg">~6.1%</td></tr>
<tr><td><b>21+3</b></td><td>Your 2 cards + dealer up = poker hand</td><td class="num">100:1 (suited trips)</td><td class="num neg">~3.3%</td></tr>
<tr><td><b>Royal Match</b></td><td>First two cards suited (K–Q suited best)</td><td class="num">25:1</td><td class="num neg">~3.7%</td></tr>
<tr><td><b>Lucky Ladies</b></td><td>First two cards total 20</td><td class="num">1000:1 (Q♥Q♥ + dealer BJ)</td><td class="num neg">~24%</td></tr>
<tr><td><b>Buster Blackjack</b></td><td>Dealer busts (more cards = more pay)</td><td class="num">250:1 (8+ cards)</td><td class="num neg">~6.5%</td></tr>
<tr><td><b>Insurance</b></td><td>Dealer has BJ when showing an ace</td><td class="num">2:1</td><td class="num neg">~7.5%</td></tr></table>
<p>Compare: the main game costs ~0.4%. The <i>cheapest</i> side bet here costs 8× that. The most expensive costs 60×.</p>`,
zh:`<table class="data"><tr><th>邊注</th><th>怎麼贏</th><th>最高賠付</th><th>莊家優勢</th></tr>
<tr><td><b>完美對子</b></td><td>前兩張成對</td><td class="num">25:1（同花色）</td><td class="num neg">~6.1%</td></tr>
<tr><td><b>21+3</b></td><td>你的 2 張 + 莊家明牌成撲克牌型</td><td class="num">100:1（同花三條）</td><td class="num neg">~3.3%</td></tr>
<tr><td><b>皇家同花</b></td><td>前兩張同花（K–Q 同花最佳）</td><td class="num">25:1</td><td class="num neg">~3.7%</td></tr>
<tr><td><b>幸運女士</b></td><td>前兩張合計 20 點</td><td class="num">1000:1（Q♥Q♥ + 莊家 BJ）</td><td class="num neg">~24%</td></tr>
<tr><td><b>爆牌獎金</b></td><td>莊家爆牌（牌越多賠越高）</td><td class="num">250:1（8 張以上）</td><td class="num neg">~6.5%</td></tr>
<tr><td><b>保險</b></td><td>莊家明牌 A 且有 BJ</td><td class="num">2:1</td><td class="num neg">~7.5%</td></tr></table>
<p>對比：主遊戲約 0.4%。這裡<i>最便宜</i>的邊注是 8 倍，最貴的是 60 倍。</p>`}},
{h:{en:"Insurance: the special case", zh:"保險：特別案例"},
body:{en:`<p>Insurance deserves its own paragraph because it's the only side bet a skilled player ever takes. When the dealer shows an ace, you're offered 2:1 that they have blackjack. The true odds are worse than 2:1 — about 7.5% house edge for a basic-strategy player.</p><p><b>Exception:</b> card counters take insurance at <b>true count +3 or higher</b>. At that count the shoe is so ten-rich that 2:1 becomes fair (or better). This is the most famous "index play" in blackjack — and the clearest signal to the casino that you're counting. Many pros skip it for camouflage even when it's correct.</p><p>If you're not counting: <b>never take insurance</b>. Not on your blackjack, not on a "hunch." The math is settled.</p>`,
zh:`<p>保險值得單獨一段，因為它是唯一技術玩家會碰的邊注。莊家明牌 A 時，開 2:1 賭他有 blackjack。真實賠率比 2:1 差——基本策略玩家約 7.5% 劣勢。</p><p><b>例外：</b>算牌客在<b>真數 +3 以上</b>買保險。那時鞋裡 10 點多到 2:1 變公平（甚至有利）。這是二十一點最著名的「偏離打法」——也是向賭場 broadcast 你在算牌的最清楚信號。很多職業玩家為了偽裝，正確也不買。</p><p>不算牌：<b>永遠別買保險</b>。你的 blackjack 不買、「感覺」不買。數學已經定案。</p>`}},
{h:{en:"Bet Behind", zh:"Bet Behind（跟注）"},
body:{en:`<p>Bet Behind lets you bet on another player's hand — common online and in crowded casinos. You win/lose with their decisions. It's practical when tables are full, but you're outsourcing every decision to a stranger: their errors become your losses at full price.</p><p>My take: fine for entertainment, terrible as a strategy. If the player doesn't know basic strategy, you're paying their tuition.</p>`,
zh:`<p>Bet Behind 讓你賭別人的手——線上和人多的賭場常見。他的決定就是你的輸贏。桌滿時實用，但你把每個決定外包給陌生人：他的錯誤用原價算在你頭上。</p><p>我的看法：娛樂可以，當策略很糟。如果那玩家不懂基本策略，你是在付他的學費。</p>`}},
],
mathBox:{en:`Side bet edges vs the main game (~0.4%): 21+3 <b>8×</b> · Royal Match <b>9×</b> · Perfect Pairs <b>15×</b> · Buster <b>16×</b> · Insurance <b>19×</b> · Lucky Ladies <b>60×</b>. The simulator lets you play them all — watch what they do to your bankroll.`,
zh:`邊注優勢 vs 主遊戲（~0.4%）：21+3 <b>8 倍</b> · 皇家同花 <b>9 倍</b> · 完美對子 <b>15 倍</b> · 爆牌獎金 <b>16 倍</b> · 保險 <b>19 倍</b> · 幸運女士 <b>60 倍</b>。模擬器全都能玩——看看它們對你賭本做了什麼。`},
verdict:{en:"Play side bets for fun if you enjoy them, with money you'd spend on entertainment. Never play them as strategy — there is no strategy that beats a 24% edge.",
zh:"喜歡就當娛樂玩，用你願意花在娛樂上的錢。永遠別當策略玩——沒有策略打得贏 24% 的優勢。"}
},
];
const GLOSSARY = [
{en:"Basic strategy", zh:"基本策略", def:{en:"The mathematically optimal play for every hand, derived by computer simulation. Cuts the edge to ~0.4% but can't overcome it.", zh:"電腦模擬得出的每種牌型數學最優打法。把優勢壓到約 0.4%，但無法翻轉它。"}},
{en:"House edge", zh:"莊家優勢", def:{en:"The casino's average profit per dollar bet, from the rules and payouts. ~0.4% on a good blackjack game.", zh:"賭場每賭一塊錢的平均利潤，來自規則與賠付。好的二十一點約 0.4%。"}},
{en:"Soft hand", zh:"軟牌", def:{en:"A hand with an ace counted as 11. It can't bust on the next card.", zh:"A 算 11 的牌。再要一張不會爆。"}},
{en:"Hard hand", zh:"硬牌", def:{en:"A hand with no ace, or an ace that must count as 1. It can bust.", zh:"無 A、或 A 只能算 1 的牌。會爆。"}},
{en:"Double down", zh:"雙倍", def:{en:"Double your bet and take exactly one more card.", zh:"賭注加倍，只再拿一張牌。"}},
{en:"Split", zh:"分牌", def:{en:"Two equal cards become two hands, each with a matching bet.", zh:"兩張同點數拆成兩手，各加同等注。"}},
{en:"Surrender", zh:"投降", def:{en:"Give up the hand for half your bet back. Late surrender = after the dealer checks for blackjack.", zh:"認輸拿回一半注金。晚投降 = 莊家檢查 blackjack 之後。"}},
{en:"DAS", zh:"分牌後雙倍", def:{en:"Double After Split — allowed to double down on hands created by a split. Worth 0.14%.", zh:"分牌後可雙倍。值 0.14%。"}},
{en:"Penetration", zh:"切牌深度", def:{en:"How far into the shoe the dealer goes before shuffling. Deep penetration (75%+) is what counters need.", zh:"洗牌前發到鞋裡多深。算牌需要深切牌（75% 以上）。"}},
{en:"True count", zh:"真數", def:{en:"Running count divided by decks remaining. The number that actually drives bet sizing.", zh:"流水數除以剩餘副數。真正決定注碼的數字。"}},
{en:"Wonging", zh:"Wonging（跳桌）", def:{en:"Back-counting a table and only sitting down (or only betting big) when the count is good.", zh:"在旁邊算牌、數好才坐下（或才下大注）。"}},
{en:"Backoff / barring", zh:"請出 / 拉黑", def:{en:"The casino telling a suspected counter to stop playing blackjack (or leave). Legal for the casino to do.", zh:"賭場請疑似算牌客別玩二十一點（或離開）。賭場這樣做合法。"}},
];
