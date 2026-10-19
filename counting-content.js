/* Blackjack Lab counting course content — {en,zh} fields. Verified count system values and published efficiency metrics. */
const COURSE = [
{
id:"why", icon:"🧮",
title:{en:"🧮 Why counting works", zh:"🧮 為什麼算牌有效"},
intro:{en:"Blackjack is the only casino game where past cards change future odds. Counting is just tracking that change — no photographic memory, no Rain Man stuff. Just arithmetic a 10-year-old could do, done fast.",
zh:"二十一點是賭場唯一「過去的牌會改變未來機率」的遊戲。算牌只是在追蹤這個變化——不需要照相記憶，不是什麼雨人神技，就是小學生都會的加減法，只是要做得快。"},
sections:[
{h:{en:"The core idea in 30 seconds", zh:"30 秒講懂核心"},
body:{en:`<p>A fresh shoe slightly favors the <b>dealer</b> (~0.4% house edge with perfect basic strategy). But as cards come out, the composition changes. When lots of <b>small cards</b> (2–6) have been dealt, the remaining shoe is <b>rich in tens and aces</b> — and a ten-rich shoe favors the <b>player</b>:</p><ul><li>More blackjacks (paid 3:2 — the dealer's blackjack only wins your bet)</li><li>Your doubles and splits land on better cards</li><li>The dealer busts more often (they must hit stiff hands; you don't have to)</li></ul><p>Counting tracks the ratio of high to low cards remaining. When it's good, you <b>bet more</b>. When it's bad, you bet the minimum or leave. That's the entire secret. There is no secret.</p>`,
zh:`<p>新鞋對<b>莊家</b>略有利（完美基本策略下莊家優勢約 0.4%）。但牌一張張發出來，組成會變。當很多<b>小牌</b>（2–6）已經出去，剩下的鞋就<b>充滿 10 點和 A</b>——而 10 點多的鞋對<b>玩家</b>有利：</p><ul><li>更多 blackjack（賠 3:2——莊家的 blackjack 只贏你的注金）</li><li>你的雙倍和分牌拿到更好的牌</li><li>莊家更容易爆（他們硬牌必要牌，你不用）</li></ul><p>算牌就是追蹤剩餘高低牌的比例。好的時候<b>下大注</b>，壞的時候下最小注或走人。整個秘密就是這樣。沒有別的秘密。</p>`}},
{h:{en:"What counting is NOT", zh:"算牌不是什麼"},
body:{en:`<p><b>Not memorizing every card.</b> You track one number — the running count — plus roughly how many decks are left. That's it.<br><b>Not illegal.</b> Courts have ruled repeatedly: using your brain to track cards is not cheating. But casinos are private businesses — they can bar you, and they do.<br><b>Not a big edge.</b> A good counter plays with roughly a <b>0.5–1.5% edge</b>. That's real, and it's tiny. It means grinding for hours with big bet spreads and a serious bankroll.<br><b>Not easy money.</b> It takes 100+ hours of practice to count accurately at casino speed, plus the temperament to lose for weeks and keep playing correctly.</p>`,
zh:`<p><b>不是背下每張牌。</b>你只追蹤一個數字——流水數——外加大約剩幾副牌。就這樣。<br><b>不違法。</b>法院多次判決：用腦子記牌不算作弊。但賭場是私人企業——他們可以請你走，而且真的會。<br><b>優勢不大。</b>好的算牌客優勢約 <b>0.5–1.5%</b>。真實，但很小。意思是好幾小時磨牌、大注碼跳動、像樣的賭本。<br><b>不是輕鬆錢。</b>要在賭場速度下算準，需要 100 小時以上的練習，外加連輸幾週還能照打不誤的心態。</p>`}},
],
mathBox:{en:`Each <b>true count</b> point is worth roughly <b>+0.5%</b> of player edge. At true 0 you're at about −0.5% (basic strategy). At true +2 you're at about +0.5%. At true +5, about +2%. The counter's whole job: bet small when the number is low, bet big when it's high.`,
zh:`每個<b>真數</b>約值 <b>+0.5%</b> 玩家優勢。真數 0 時約 −0.5%（基本策略）。真數 +2 約 +0.5%。真數 +5 約 +2%。算牌客的全部工作：數字低時下小注，數字高時下大注。`},
verdict:{en:"Counting doesn't predict the next card. It tells you when the remaining shoe is rich enough to bet big. That distinction is the whole game.",
zh:"算牌預測不了下一張牌。它告訴你剩下的鞋夠不夠肥、值不值得下大注。這個區別就是整個遊戲。"}
},
{
id:"systems", icon:"📊",
title:{en:"📊 Counting systems", zh:"📊 算牌系統"},
intro:{en:"Every system assigns point values to cards. You keep a running count as cards appear. Three systems in full detail below, the rest compared honestly.",
zh:"每個系統給牌賦分值，牌出現時累計流水數。下面三個系統完整詳解，其餘誠實比較。"},
sections:[
{h:{en:"Hi-Lo — the standard (learn this first)", zh:"Hi-Lo——標準系統（先學這個）"},
body:{en:`<table class="data"><tr><th>Cards</th><th>Value</th><th>Why</th></tr>
<tr><td><b>2, 3, 4, 5, 6</b></td><td class="num"><b>+1</b></td><td>Small cards dealt = good for player</td></tr>
<tr><td><b>7, 8, 9</b></td><td class="num"><b>0</b></td><td>Neutral</td></tr>
<tr><td><b>10, J, Q, K, A</b></td><td class="num"><b>−1</b></td><td>Big cards dealt = bad for player</td></tr></table>
<p><b>Balanced:</b> a full shoe counts to exactly 0. Start every shoe at <b>0</b>.<br><b>True count:</b> running count ÷ decks remaining (estimate to the nearest half deck). TC +2 with 3 decks left and RC +6: 6 ÷ 3 = <b>+2</b>.<br><b>Bet ramp:</b> TC ≤ +1 → 1 unit; +2 → 2 units; +3 → 4 units; +4+ → 8 units.<br><b>Difficulty:</b> easy — one level, whole numbers. <b>Why it's the standard:</b> 97% betting correlation, simple enough to do perfectly at casino speed, and every book and trainer teaches it.</p>`,
zh:`<table class="data"><tr><th>牌</th><th>分值</th><th>原因</th></tr>
<tr><td><b>2、3、4、5、6</b></td><td class="num"><b>+1</b></td><td>小牌出去＝對玩家好</td></tr>
<tr><td><b>7、8、9</b></td><td class="num"><b>0</b></td><td>中性</td></tr>
<tr><td><b>10、J、Q、K、A</b></td><td class="num"><b>−1</b></td><td>大牌出去＝對玩家壞</td></tr></table>
<p><b>平衡系統：</b>整副鞋數完恰好歸 0。每鞋從 <b>0</b> 開始。<br><b>真數：</b>流水數 ÷ 剩餘副數（估到半副）。剩 3 副、流水 +6：6 ÷ 3 = <b>+2</b>。<br><b>注碼：</b>真數 ≤ +1 → 1 單位；+2 → 2 單位；+3 → 4 單位；+4 以上 → 8 單位。<br><b>難度：</b>簡單——單層級、整數。<b>為什麼是標準：</b>投注相關性 97%，簡單到能在賭場速度下算準，所有書和訓練器都教它。</p>`}},
{h:{en:"KO (Knock-Out) — the no-division system", zh:"KO——不用除法的系統"},
body:{en:`<table class="data"><tr><th>Cards</th><th>Value</th></tr>
<tr><td><b>2, 3, 4, 5, 6, 7</b></td><td class="num"><b>+1</b></td></tr>
<tr><td><b>8, 9</b></td><td class="num"><b>0</b></td></tr>
<tr><td><b>10, J, Q, K, A</b></td><td class="num"><b>−1</b></td></tr></table>
<p><b>Unbalanced:</b> a full shoe counts to +4 per deck, so there's <b>no true count conversion</b> — the running count IS the signal. Start (6 decks) at <b>−24</b> (that's −4 × decks).<br><b>Key count:</b> start ramping bets at running count <b>−4</b>. <b>Pivot point:</b> +4 — at the pivot your edge matches Hi-Lo's TC +4.<br><b>Bet ramp (6 decks):</b> RC ≤ −4 → 1 unit; −2 → 2 units; 0 → 4 units; +2 and up → 8 units.<br><b>Difficulty:</b> easiest — one level, no division under pressure. <b>Trade-off:</b> slightly less precise than Hi-Lo at deep counts, and you must memorize the key count for your deck number.</p>`,
zh:`<table class="data"><tr><th>牌</th><th>分值</th></tr>
<tr><td><b>2、3、4、5、6、7</b></td><td class="num"><b>+1</b></td></tr>
<tr><td><b>8、9</b></td><td class="num"><b>0</b></td></tr>
<tr><td><b>10、J、Q、K、A</b></td><td class="num"><b>−1</b></td></tr></table>
<p><b>非平衡：</b>整副牌數完是每副 +4，所以<b>不用換算真數</b>——流水數本身就是信號。6 副牌從 <b>−24</b> 開始（−4 × 副數）。<br><b>關鍵數：</b>流水數 <b>−4</b> 開始加注。<b>轉折點：</b>+4——到轉折點時優勢等同 Hi-Lo 真數 +4。<br><b>注碼（6 副）：</b>流水 ≤ −4 → 1 單位；−2 → 2 單位；0 → 4 單位；+2 以上 → 8 單位。<br><b>難度：</b>最簡單——單層級、不用心算除法。<b>代價：</b>深數時比 Hi-Lo 略不精確，且要背下你玩的副數對應的關鍵數。</p>`}},
{h:{en:"Omega II — the multi-level upgrade", zh:"Omega II——多層級進階"},
body:{en:`<table class="data"><tr><th>Cards</th><th>Value</th></tr>
<tr><td><b>4, 5, 6</b></td><td class="num"><b>+2</b></td></tr>
<tr><td><b>2, 3, 7</b></td><td class="num"><b>+1</b></td></tr>
<tr><td><b>8, A</b></td><td class="num"><b>0</b></td></tr>
<tr><td><b>9</b></td><td class="num"><b>−1</b></td></tr>
<tr><td><b>10, J, Q, K</b></td><td class="num"><b>−2</b></td></tr></table>
<p><b>Balanced, two levels.</b> Start at 0, convert to true count like Hi-Lo.<br><b>Why the extra level:</b> not all cards matter equally. 5s hurt you far more than 2s when they're gone; tens help the dealer bust more than aces do. Omega II weights that — higher <b>playing efficiency (67%)</b> than Hi-Lo (51%), meaning better insurance and strategy-departure decisions.<br><b>Difficulty:</b> hard — two levels including ±2s, at casino speed, while acting casual. Most people should master Hi-Lo first; the extra ~10% playing efficiency only pays if your count is still perfect.<br><b>Ace side count (optional):</b> advanced Omega II players side-count aces for even better betting. That's graduate school — skip it until Hi-Lo is automatic.</p>`,
zh:`<table class="data"><tr><th>牌</th><th>分值</th></tr>
<tr><td><b>4、5、6</b></td><td class="num"><b>+2</b></td></tr>
<tr><td><b>2、3、7</b></td><td class="num"><b>+1</b></td></tr>
<tr><td><b>8、A</b></td><td class="num"><b>0</b></td></tr>
<tr><td><b>9</b></td><td class="num"><b>−1</b></td></tr>
<tr><td><b>10、J、Q、K</b></td><td class="num"><b>−2</b></td></tr></table>
<p><b>平衡、雙層級。</b>從 0 開始，像 Hi-Lo 一樣換算真數。<br><b>為什麼多一層：</b>不是每張牌都一樣重要。5 不見了比 2 不見了傷得多；10 讓莊家爆牌的貢獻比 A 大。Omega II 反映這點——<b>打法效率 67%</b>（Hi-Lo 51%），保險和偏離決策更準。<br><b>難度：</b>難——雙層級還有 ±2，要在賭場速度下算、還要裝沒事。多數人先把 Hi-Lo 練熟；多那 ~10% 打法效率的前提是你的數還算得準。<br><b>A 旁計（選修）：</b>高手會旁計 A 來提升投注準度。那是研究所——Hi-Lo 變成反射動作之前別碰。</p>`}},
{h:{en:"The rest, compared honestly", zh:"其他系統，誠實比較"},
body:{en:`<table class="data"><tr><th>System</th><th>Level</th><th>Betting corr.</th><th>Playing eff.</th><th>Insurance</th><th>Verdict</th></tr>
<tr><td><b>Hi-Lo</b></td><td class="num">1</td><td class="num">97%</td><td class="num">51%</td><td class="num">76%</td><td>Learn this. The standard for a reason.</td></tr>
<tr><td><b>KO</b></td><td class="num">1</td><td class="num">98%</td><td class="num">55%</td><td class="num">78%</td><td>Easiest. Great if division under pressure scares you.</td></tr>
<tr><td><b>Omega II</b></td><td class="num">2</td><td class="num">92%</td><td class="num">67%</td><td class="num">85%</td><td>Best all-round upgrade once Hi-Lo is automatic.</td></tr>
<tr><td><b>Hi-Opt I</b></td><td class="num">1</td><td class="num">88%</td><td class="num">61%</td><td class="num">85%</td><td>Needs ace side count to shine. Fiddly.</td></tr>
<tr><td><b>Hi-Opt II</b></td><td class="num">2</td><td class="num">91%</td><td class="num">67%</td><td class="num">91%</td><td>Excellent but complex; ace side count expected.</td></tr>
<tr><td><b>Wong Halves</b></td><td class="num">3</td><td class="num">99%</td><td class="num">56%</td><td class="num">90%</td><td>Best betting accuracy; halves at casino speed is brutal.</td></tr>
<tr><td><b>Zen Count</b></td><td class="num">2</td><td class="num">96%</td><td class="num">62%</td><td class="num">85%</td><td>Solid two-level; counts aces as −1 (unlike Omega II).</td></tr></table>
<p>My honest take: <b>system choice barely matters compared to execution</b>. A perfect Hi-Lo counter beats a sloppy Omega II counter every time. Pick one, drill it to reflex, then worry about upgrading. Most working counters I know of use Hi-Lo or KO.</p>`,
zh:`<table class="data"><tr><th>系統</th><th>層級</th><th>投注相關</th><th>打法效率</th><th>保險</th><th>評價</th></tr>
<tr><td><b>Hi-Lo</b></td><td class="num">1</td><td class="num">97%</td><td class="num">51%</td><td class="num">76%</td><td>學這個。成為標準是有原因的。</td></tr>
<tr><td><b>KO</b></td><td class="num">1</td><td class="num">98%</td><td class="num">55%</td><td class="num">78%</td><td>最簡單。怕心算除法就選它。</td></tr>
<tr><td><b>Omega II</b></td><td class="num">2</td><td class="num">92%</td><td class="num">67%</td><td class="num">85%</td><td>Hi-Lo 熟練後最好的升級。</td></tr>
<tr><td><b>Hi-Opt I</b></td><td class="num">1</td><td class="num">88%</td><td class="num">61%</td><td class="num">85%</td><td>要 A 旁計才發光，瑣碎。</td></tr>
<tr><td><b>Hi-Opt II</b></td><td class="num">2</td><td class="num">91%</td><td class="num">67%</td><td class="num">91%</td><td>優秀但複雜，預設要 A 旁計。</td></tr>
<tr><td><b>Wong Halves</b></td><td class="num">3</td><td class="num">99%</td><td class="num">56%</td><td class="num">90%</td><td>投注最準；賭場速度下算 halves 很虐。</td></tr>
<tr><td><b>Zen Count</b></td><td class="num">2</td><td class="num">96%</td><td class="num">62%</td><td class="num">85%</td><td>紮實的雙層級；A 算 −1（Omega II 算 0）。</td></tr></table>
<p>我的誠實看法：<b>選哪個系統遠不如執行力重要</b>。完美的 Hi-Lo 算牌客每次都贏潦草的 Omega II 算牌客。選一個，練到反射動作，再考慮升級。我認識的實戰算牌客多半用 Hi-Lo 或 KO。</p>`}},
],
mathBox:{en:`Betting correlation measures how well the count predicts <b>when to bet big</b> (all good systems: 90%+). Playing efficiency measures <b>strategy departures</b> like insurance (Hi-Lo 51%, Omega II 67%). For most counters, betting correlation is what pays — and every system here has it.`,
zh:`投注相關性衡量系統預測<b>何時下大注</b>的能力（好的系統都在 90% 以上）。打法效率衡量<b>偏離打法</b>（如保險）的準度（Hi-Lo 51%、Omega II 67%）。對多數算牌客，賺錢靠的是投注相關性——這裡每個系統都有。`},
verdict:{en:"Start with Hi-Lo. If the true-count division bothers you, use KO. Move to Omega II only when counting is boring. The trainer below drills all three.",
zh:"從 Hi-Lo 開始。真數除法讓你煩就用 KO。數到無聊了再上 Omega II。下面的訓練器三個都能練。"}
},
{
id:"betsize", icon:"💰",
title:{en:"💰 Bet sizing: the right way", zh:"💰 注碼：正確的方法"},
intro:{en:"Knowing the count is half the job. Sizing bets off it — without going broke or getting spotted — is the other half. Here's the right way, and the ways most people get it wrong.",
zh:"會算數只是半份工作。依此下注——不破產、不被盯上——是另半份。這裡是正確方法，以及多數人搞錯的地方。"},
sections:[
{h:{en:"The true count bet ramp (the right way)", zh:"真數注碼階梯（正確方法）"},
body:{en:`<p>Each true count point ≈ <b>+0.5% edge</b>. So you scale bets <b>in proportion to your edge</b>. The standard ramp, in units:</p><table class="data"><tr><th>True count</th><th>Your edge (approx)</th><th>Bet</th><th>Why</th></tr>
<tr><td>≤ +1</td><td class="num">≤ 0%</td><td class="num"><b>1 unit</b> (table min)</td><td>You're still the underdog — bet the minimum</td></tr>
<tr><td>+2</td><td class="num">~+0.5%</td><td class="num"><b>2 units</b></td><td>First count with a real edge — first raise</td></tr>
<tr><td>+3</td><td class="num">~+1.0%</td><td class="num"><b>4 units</b></td><td>Edge doubled, bet doubled</td></tr>
<tr><td>+4</td><td class="num">~+1.5%</td><td class="num"><b>8 units</b></td><td>Strong edge — press it</td></tr>
<tr><td>+5 and up</td><td class="num">~+2%+</td><td class="num"><b>8–12 units</b> (cap it)</td><td>Rare; cap for camouflage and sanity</td></tr></table>
<p><b>Why each step:</b> your bet should grow with your edge, not your excitement. At TC +2 your edge just turned positive — that's the <i>first</i> dollar the casino is offering you, so it's the first dollar you raise. Doubling each step keeps your <b>risk proportional</b>: you're never risking big money on a small edge.</p><p>For KO (no true count): 6-deck ramp is RC ≤ −4 → 1u; −2 → 2u; 0 → 4u; +2+ → 8u. Same logic, running-count scale.</p>`,
zh:`<p>每個真數約 <b>+0.5% 優勢</b>。所以注碼<b>跟優勢成比例</b>放大。標準階梯（單位）：</p><table class="data"><tr><th>真數</th><th>你的優勢（約）</th><th>注碼</th><th>為什麼</th></tr>
<tr><td>≤ +1</td><td class="num">≤ 0%</td><td class="num"><b>1 單位</b>（桌台下限）</td><td>你還是劣勢——下最小</td></tr>
<tr><td>+2</td><td class="num">~+0.5%</td><td class="num"><b>2 單位</b></td><td>第一個有真優勢的數——第一次加注</td></tr>
<tr><td>+3</td><td class="num">~+1.0%</td><td class="num"><b>4 單位</b></td><td>優勢翻倍，注碼翻倍</td></tr>
<tr><td>+4</td><td class="num">~+1.5%</td><td class="num"><b>8 單位</b></td><td>優勢強——壓上去</td></tr>
<tr><td>+5 以上</td><td class="num">~+2%+</td><td class="num"><b>8–12 單位</b>（封頂）</td><td>少見；為偽裝和理智封頂</td></tr></table>
<p><b>每階的原因：</b>注碼跟著優勢長，不跟著情緒長。真數 +2 是你的優勢剛轉正——那是賭場送你的<i>第一塊</i>錢，所以也是你第一次加注。逐階翻倍讓<b>風險成比例</b>：永遠不在小優勢上冒大錢。</p><p>KO（無真數）：6 副階梯是流水 ≤ −4 → 1 單位；−2 → 2 單位；0 → 4 單位；+2 以上 → 8 單位。邏輯相同，只是用流水數刻度。</p>`}},
{h:{en:"Kelly criterion for blackjack", zh:"二十一點的凱利公式"},
body:{en:`<p>The Kelly criterion answers "how much of my bankroll should I bet?" with: <b>bet = edge ÷ variance × bankroll</b>. Blackjack's variance is about <b>1.3</b>.</p><p>Example: $10,000 bankroll, true count +3 (edge ~1.5%):<br>Kelly bet = 0.015 ÷ 1.3 × $10,000 ≈ <b>$115</b>. That's about 1.15% of your bankroll on one hand.</p><p><b>But nobody sane bets full Kelly.</b> Full Kelly maximizes long-run growth but comes with brutal swings — about a <b>13% risk of ruin</b> and drawdowns that will test your will to live. Working counters use <b>half Kelly or quarter Kelly</b>:</p><table class="data"><tr><th>Approach</th><th>Bet at TC+3 ($10k roll)</th><th>Risk of ruin</th><th>Growth</th></tr>
<tr><td><b>Full Kelly</b></td><td class="num">~$115</td><td class="num neg">~13%</td><td>Maximum (on paper)</td></tr>
<tr><td><b>Half Kelly</b></td><td class="num">~$58</td><td class="num">~2–3%</td><td>75% of max — the sane choice</td></tr>
<tr><td><b>Quarter Kelly</b></td><td class="num">~$29</td><td class="num pos">~0.5%</td><td>Slower, nearly un-bustable</td></tr></table>
<p>Practical translation: your <b>max bet should be roughly 1% of your bankroll</b> (half-Kelly-ish). $10k bankroll → top bet ~$100. That means your unit is ~$12–25 and your spread is 1–8. If your bankroll can't support the spread the count demands, <b>you're underfunded — play lower stakes, not a braver ramp</b>.</p>`,
zh:`<p>凱利公式回答「該下多少比例的賭本」：<b>注碼 = 優勢 ÷ 變異數 × 賭本</b>。二十一點的變異數約 <b>1.3</b>。</p><p>例子：$10,000 賭本，真數 +3（優勢約 1.5%）：<br>凱利注 = 0.015 ÷ 1.3 × $10,000 ≈ <b>$115</b>。一手約下 1.15% 的賭本。</p><p><b>但正常人都不下全凱利。</b>全凱利最大化長期增長，但波動殘暴——<b>破產風險約 13%</b>，回撤會考驗你的求生意志。實戰算牌客用<b>半凱利或四分之一凱利</b>：</p><table class="data"><tr><th>方法</th><th>真數+3 的注 ($10k)</th><th>破產風險</th><th>增長</th></tr>
<tr><td><b>全凱利</b></td><td class="num">~$115</td><td class="num neg">~13%</td><td>理論最大</td></tr>
<tr><td><b>半凱利</b></td><td class="num">~$58</td><td class="num">~2–3%</td><td>最大的 75%——理智之選</td></tr>
<tr><td><b>四分之一凱利</b></td><td class="num">~$29</td><td class="num pos">~0.5%</td><td>慢，幾乎不會爆</td></tr></table>
<p>實務翻譯：你的<b>最大注約為賭本的 1%</b>（半凱利左右）。$10k 賭本 → 頂注 ~$100。也就是單位 ~$12–25、跳動 1–8。如果賭本撐不起數要求的跳動，<b>你是資金不足——降級玩，別加膽加注</b>。</p>`}},
{h:{en:"Risk of ruin: aggressive vs conservative", zh:"破產風險：激進 vs 保守"},
body:{en:`<p>Risk of ruin (RoR) is the chance you lose your entire bankroll before the edge can work. It's driven by <b>bet size relative to bankroll</b>, not by how well you count.</p><table class="data"><tr><th>Bankroll (units)</th><th>Spread</th><th>Approx. RoR</th><th>Verdict</th></tr>
<tr><td>50 units</td><td class="num">1–8</td><td class="num neg">~25%+</td><td>Gambling, not investing</td></tr>
<tr><td>100 units</td><td class="num">1–8</td><td class="num neg">~5–10%</td><td>Minimum viable for part-time</td></tr>
<tr><td>200 units</td><td class="num">1–8</td><td class="num">~1–2%</td><td>Comfortable</td></tr>
<tr><td>200 units</td><td class="num">1–4 (capped)</td><td class="num pos">&lt;1%</td><td>Safer, slower — good while learning</td></tr></table>
<p>A "unit" here = your 1-unit bet. With a $25 unit and 1–8 spread, you want <b>$5,000 minimum</b> (200 units) to play properly. With $2,500 (100 units) you're viable but expect scary weeks. Below that, you're not counting — you're hoping.</p><p><b>Aggressive ramps</b> (1–12, 1–16) earn more per hour but multiply both RoR <i>and</i> casino attention. <b>Conservative ramps</b> (1–4) sacrifice hourly for longevity. Beginners should start 1–4 until the count is automatic and the bankroll is real.</p>`,
zh:`<p>破產風險（RoR）是優勢還沒發揮、賭本就歸零的機率。它由<b>注碼相對賭本的大小</b>決定，跟你算得多準無關。</p><table class="data"><tr><th>賭本（單位）</th><th>跳動</th><th>約略 RoR</th><th>評價</th></tr>
<tr><td>50 單位</td><td class="num">1–8</td><td class="num neg">~25%+</td><td>這叫賭博，不叫投資</td></tr>
<tr><td>100 單位</td><td class="num">1–8</td><td class="num neg">~5–10%</td><td>兼職的最低門檻</td></tr>
<tr><td>200 單位</td><td class="num">1–8</td><td class="num">~1–2%</td><td>舒服</td></tr>
<tr><td>200 單位</td><td class="num">1–4（封頂）</td><td class="num pos">&lt;1%</td><td>更安全、更慢——學習期適合</td></tr></table>
<p>這裡的「單位」= 你的 1 單位注。單位 $25、跳動 1–8，你需要<b>最少 $5,000</b>（200 單位）才算 properly 上桌。$2,500（100 單位）可行，但要有經歷恐怖週的心理準備。再少，你不是在算牌——是在許願。</p><p><b>激進跳動</b>（1–12、1–16）每小時賺更多，但破產風險<i>和</i>賭場注意力都翻倍。<b>保守跳動</b>（1–4）用時薪換壽命。新手先從 1–4 開始，等數變成反射、賭本到位再說。</p>`}},
{h:{en:"Common mistakes (the way most people do it)", zh:"常見錯誤（多數人的做法）"},
body:{en:`<p><b>1. Betting too much too early.</b> The classic: learn to count, sit down with $1,000, spread 1–10 at $25 units. That's a 40-unit bankroll — RoR is a coin flip. The count was right; the bankroll was a donation.</p><p><b>2. Not ramping down.</b> The count drops to −2 and the player keeps $100 out "because it might come back." Every hand at a negative count is taxed at ~1%. Ramp down immediately — the math doesn't care about your feelings.</p><p><b>3. Ignoring bankroll limits.</b> "I'll just reload if I lose it." Then it's not a bankroll, it's an expense account. A bankroll is money you can lose <i>entirely</i> without changing your life. If losing it hurts, the stakes are too high.</p><p><b>4. Playing with scared money.</b> The flip side: a proper bankroll that you're emotionally attached to. You'll under-bet the good counts (killing your edge) and play scared (making errors). If you can't fire the max bet at TC+5 without flinching, drop down in stakes.</p><p><b>5. Jumping 1-to-8 in one hand.</b> Technically correct, practically a confession. See camouflage in the Session tab.</p>`,
zh:`<p><b>1. 太早下太大。</b>經典：學會算數，帶 $1,000 上桌，$25 單位跳 1–10。那是 40 單位賭本——破產風險跟丟硬幣差不多。數是對的；賭本是捐的。</p><p><b>2. 不降注。</b>數掉到 −2，玩家還留著 $100「因為可能會回來」。負數的每一手都被課 ~1% 的稅。立刻降注——數學不在乎你的感覺。</p><p><b>3. 無視賭本上限。</b>「輸光再補就好。」那不叫賭本，叫費用帳戶。賭本是<b>輸光</b>也不影響生活的錢。輸了會痛，就是賭太大。</p><p><b>4. 拿怕輸的錢玩。</b>反面：賭本夠，但感情上放不下。你會在好數時下不夠（殺死優勢）、打得畏縮（失誤連連）。真數 +5 不敢面不改色推出最大注，就降級。</p><p><b>5. 一手從 1 跳到 8。</b>技術正確，實務上等於自首。見「實戰」分頁的偽裝。</p>`}},
{h:{en:"Session practicalities", zh:"實戰細節"},
body:{en:`<p><b>Win goals / loss limits:</b> counters don't use win goals the way gamblers do — your edge is per-hand, and quitting when ahead just cuts winning hours. But <b>session loss limits are real</b>: a stop-loss of ~20% of your trip bankroll prevents tilt from destroying weeks of good play. Walk away when you're tired, tilted, or the count has been dead for two shoes — not when you're "up enough."</p><p><b>When to walk away:</b> (1) the count is deeply negative and the table won't let you sit out hands; (2) you feel heat (pit boss watching, dealer suddenly shuffling early); (3) you're making counting errors — fatigue kills edges faster than bad rules; (4) you've hit your loss limit.</p><p><b>Wonging (back-counting):</b> the alternative to grinding through bad counts. Stand behind the table, count the shoe, and <b>only sit down when the count goes positive</b> (or only raise when it does — "wonging in/out"). It's the highest-EV-per-hour way to play and the lowest-exposure way to bet big. Downsides: many casinos bar mid-shoe entry ("no mid-shoe entry" signs exist precisely because of this), and standing around counting looks exactly like what it is.</p>`,
zh:`<p><b>停利 / 停損：</b>算牌客的停利跟賭客不一樣——你的優勢是按手算的，贏了就走只是在砍贏錢的時間。但 <b>session 停損是真的</b>：旅程賭本 20% 的停損線，防止 tilt 毀掉幾週的好牌。該走的時候是：累了、tilt 了、連兩鞋都是死數——不是「贏夠了」的時候。</p><p><b>何時走人：</b>(1) 數深負、桌子不讓你跳過幾手；(2) 感覺到熱度（pit boss 在看、荷官突然提早洗牌）；(3) 你開始算錯——疲勞殺優勢比爛規則快；(4) 觸及停損線。</p><p><b>Wonging（跳桌）：</b>不磨爛數的替代方案。站在桌邊算，<b>數轉正才坐下</b>（或只在正數時加注——「wong in/out」）。這是每小時期望值最高、曝險最低的大注玩法。缺點：很多賭場禁中途上桌（「no mid-shoe entry」牌子就是為這個立的），而且站著算牌看起來就是那麼回事。</p>`}},
],
mathBox:{en:`The whole betting chapter in one formula: <b>bet ≈ (edge ÷ 1.3) × bankroll × 0.5</b> (half-Kelly). At TC+3 with $10k: (0.015 ÷ 1.3) × 10000 × 0.5 ≈ <b>$58</b>. The ramp table above is just this formula rounded to playable units.`,
zh:`整章注碼濃縮成一條公式：<b>注碼 ≈（優勢 ÷ 1.3）× 賭本 × 0.5</b>（半凱利）。$10k 賭本、真數+3：(0.015 ÷ 1.3) × 10000 × 0.5 ≈ <b>$58</b>。上面的階梯表就是這公式取整成可下注碼的結果。`},
verdict:{en:"Bet the ramp, respect the bankroll, ramp down without mercy. Most failed counters didn't fail at counting — they failed at sizing.",
zh:"照階梯下注、尊重賭本、降注不留情。多數失敗的算牌客不是數錯了——是注下錯了。"}
},
{
id:"session", icon:"🎰",
title:{en:"🎰 Session play: camouflage & reality", zh:"🎰 實戰：偽裝與現實"},
intro:{en:"You can count perfectly and still get shown the door in an hour. This is the part most courses skip: how to survive in a real casino.",
zh:"你數得再準，一小時也可能被請出去。這是多數課程跳過的部分：如何在真實賭場活下去。"},
sections:[
{h:{en:"Camouflage basics", zh:"偽裝基礎"},
body:{en:`<p>The casino spots counters by <b>bet spread correlated with the count</b>. Your camouflage job: break the obvious pattern without destroying your edge.</p><ul><li><b>Don't jump 1-to-8 in one hand.</b> Ramp in steps (1→2→4→8) over several hands when you can. It costs a little EV and buys a lot of longevity.</li><li><b>Play a hand or two at neutral counts.</b> Wonging out completely is optimal but obvious. Sometimes it's cheaper to flat-bet through a bad shoe looking bored.</li><li><b>Act like a gambler.</b> Tip the dealer, complain about your luck, order a drink, celebrate wins loudly. Counters are quiet and intense; gamblers are noisy and emotional. Be the gambler.</li><li><b>Session length:</b> 45–90 minutes per table, then move. The longer you play one shoe pattern, the clearer the correlation.</li><li><b>Don't play rated</b> (player's card) if you're spreading big — comps are nice, but the card is a tracking device with your name on it.</li></ul>`,
zh:`<p>賭場抓算牌客看的是<b>注碼跳動跟數的相關性</b>。你的偽裝工作：在不毀掉優勢的前提下打碎明顯模式。</p><ul><li><b>別一手從 1 跳到 8。</b>能分幾手就分幾手階梯上去（1→2→4→8）。少賺一點期望值，換很多壽命。</li><li><b>中性數時打個一兩手。</b>完全 wong out 最優但最明顯。有時無聊地平注磨過爛鞋更便宜。</li><li><b>演得像賭客。</b>給荷官小費、抱怨運氣、點杯喝的、贏了大聲歡呼。算牌客安靜緊繃；賭客吵鬧情緒化。當賭客。</li><li><b>每桌時長：</b>45–90 分鐘就換桌。同一個鞋模玩越久，相關性越清楚。</li><li><b>大跳動時別刷會員卡</b>——comps 很好，但卡是寫著你名字的追蹤器。</li></ul>`}},
{h:{en:"Table conditions that matter", zh:"重要的桌台條件"},
body:{en:`<table class="data"><tr><th>Condition</th><th>Want</th><th>Why</th></tr>
<tr><td><b>Penetration</b></td><td>75%+ of shoe dealt</td><td>Deep counts are where the money is; shallow cuts kill them</td></tr>
<tr><td><b>Rules</b></td><td>3:2, S17, DAS, surrender</td><td>Every 0.1% matters when your edge is ~1%</td></tr>
<tr><td><b>Decks</b></td><td>Fewer (but rules first)</td><td>Single/double deck counts swing faster — but watch for CSMs</td></tr>
<tr><td><b>Mid-shoe entry</b></td><td>Allowed</td><td>Needed for wonging</td></tr>
<tr><td><b>CSM</b></td><td>Avoid</td><td>Continuous shufflers = no count, ever. Unbeatable.</td></tr>
<tr><td><b>Table speed</b></td><td>Fast, full table</td><td>More hands/hour at good counts; slower when you're learning</td></tr></table>`,
zh:`<table class="data"><tr><th>條件</th><th>想要</th><th>為什麼</th></tr>
<tr><td><b>切牌深度</b></td><td>發到 75% 以上</td><td>深數才是錢；淺切直接殺死</td></tr>
<tr><td><b>規則</b></td><td>3:2、S17、DAS、投降</td><td>優勢只有 ~1% 時，每 0.1% 都重要</td></tr>
<tr><td><b>副數</b></td><td>越少越好（但規則優先）</td><td>單雙副數波動快——但小心 CSM</td></tr>
<tr><td><b>中途上桌</b></td><td>允許</td><td>Wonging 需要</td></tr>
<tr><td><b>CSM</b></td><td>避開</td><td>連續洗牌機＝永遠沒數，不可戰勝</td></tr>
<tr><td><b>桌速</b></td><td>快、滿桌</td><td>好數時每小時更多手；學習期慢一點好</td></tr></table>`}},
{h:{en:"Casino countermeasures (know your enemy)", zh:"賭場反制（知己知彼）"},
body:{en:`<p>Casinos know all of this. Their toolkit:</p><ul><li><b>Shallow penetration</b> — cutting the shoe at 50% quietly kills counting without banning anyone.</li><li><b>No mid-shoe entry</b> — kills wonging.</li><li><b>CSMs</b> — continuous shuffling machines make counting literally impossible.</li><li><b>Flat-betting</b> — "sir, we'd like you to keep your bets the same." Your spread is dead; leave.</li><li><b>The backoff</b> — "You're too good for us, we'd appreciate it if you didn't play blackjack here anymore." Polite, firm, final. <b>Leave politely.</b> Arguing gets you trespassed (then it's a legal problem, not a math problem).</li><li><b>Shared databases</b> — barred in one property, flagged in sister properties.</li></ul><p>None of this is personal. You're not being punished for cheating — you're being uninvited from a private business for winning too skillfully. Take the backoff gracefully. There are other casinos.</p>`,
zh:`<p>賭場全都知道。他們的工具箱：</p><ul><li><b>淺切牌</b>——50% 就切，安靜地殺死算牌，不用趕任何人。</li><li><b>禁中途上桌</b>——殺死 wonging。</li><li><b>CSM</b>——連續洗牌機讓算牌物理上不可能。</li><li><b>限平注</b>——「先生，請您保持注碼一致。」跳動死了，走人。</li><li><b>Backoff</b>——「您太厲害了，請別在這裡玩二十一點。」客氣、堅定、沒有商量。<b>客氣地走。</b>爭吵會變成 trespass（那就從數學問題變成法律問題）。</li><li><b>共享資料庫</b>——一家被拉黑，姐妹店同步標記。</li></ul><p>都不是針對你個人。你不是因為作弊被罰——是因為贏得太有技術，被私人企業婉拒。優雅地接受，還有別家賭場。</p>`}},
],
mathBox:{en:`A counter's hourly EV ≈ <b>hands/hour × average bet × edge</b>. 80 hands/hr × $60 avg × 1% ≈ <b>$48/hr</b> — before expenses, comps, and the occasional backoff. It's a grind, not a jackpot. Anyone selling it as easy money is selling something.`,
zh:`算牌客時薪期望值 ≈ <b>每小時手數 × 平均注 × 優勢</b>。80 手/小時 × $60 均注 × 1% ≈ <b>$48/小時</b>——還沒扣開銷、comps 和偶爾的 backoff。這是磨工，不是中頭獎。把它包裝成輕鬆錢的，都是在賣東西。`},
verdict:{en:"Play good games, spread without apology but with camouflage, and leave before you're asked. Longevity is the whole business.",
zh:"玩好遊戲、跳動理直氣壯但有偽裝、在被請之前先走。壽命就是整門生意。"}
},
{
id:"trainer", icon:"🎯",
title:{en:"🎯 Counting Trainer", zh:"🎯 算牌訓練器"},
intro:{en:"Drill the count at casino speed. Pick a system, pick a speed, and keep the running count through a full deck. Then prove it.",
zh:"用賭場速度練算數。選系統、選速度，算完一整副牌，然後證明你算對了。"},
sections:[],
mathBox:{en:"", zh:""},
verdict:{en:"", zh:""},
},
];
