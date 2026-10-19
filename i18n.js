/* Blackjack Lab i18n — full-site EN / 繁中 (Taiwan) toggle.
   Chrome strings (nav, buttons, labels) live here.
   Content strings live in blackjack-content.js / counting-course content with {en,zh} fields. */
const I18N = {
en:{
  nav_home:"Home", nav_guide:"Guide", nav_sim:"Simulator",
  nav_count:"Counting Course", nav_calc:"Calculators", nav_gear:"Gear", nav_about:"About",
  hero_tag:"The honest blackjack lab. Beatable math, real training. No real money.",
  hero_sub:"Learn basic strategy, play a true-to-rules simulator, and train card counting the right way — free, no signup.",
  cta_sim:"Open the simulator", cta_guide:"Read the guide",
  feat_sim_t:"Blackjack simulator", feat_sim_d:"Full rules engine — hit, stand, double, split, dealer plays by house rules. Practice basic strategy with your bankroll on the line (fake money, real math).",
  feat_count_t:"Card counting course", feat_count_d:"Hi-Lo, KO, Omega II and more — plus bet sizing done right, risk of ruin, and a trainer with timed drills. The honest version, including why casinos will bar you.",
  feat_guide_t:"Complete guide", feat_guide_d:"How to play, basic strategy charts, house-rule variations, and exactly what each rule costs you.",
  feat_calc_t:"Edge calculators", feat_calc_d:"Pick the table rules — decks, soft 17, 6:5 vs 3:2, surrender — and see the exact house edge.",
  feat_gear_t:"Gear", feat_gear_d:"The counting books worth reading and practice gear I actually recommend — plus Blackjack Lab merch.",
  roll:"Deal", clear_bets:"Clear bets",
  bankroll:"Bankroll", win_goal:"Win goal", stop_loss:"Stop loss",
  ad_label:"ADVERTISEMENT",
  house_ad_label:"Our sites",
  house_ad_text:"🎲 Labs hub — craps, baccarat & roulette",
  disclosure:"Blackjack Lab is a free educational simulator. No real money is wagered here. Card counting is not illegal, but casinos are private property and can bar players they believe are counting — the course explains this honestly.",
  footer_by:"Built for players who want the truth about the math.",
  footer_labs:"More from the Labs: ",
  start:"Start", stop:"Stop", reset:"Reset",
},
zh:{
  nav_home:"首頁", nav_guide:"指南", nav_sim:"模擬器",
  nav_count:"算牌課程", nav_calc:"計算機", nav_gear:"裝備", nav_about:"關於",
  hero_tag:"誠實的二十一點實驗室。可戰勝的數學，真實訓練。不賭真錢。",
  hero_sub:"學基本策略、玩符合規則的模擬器、用正確的方法練算牌——免費，免註冊。",
  cta_sim:"開啟模擬器", cta_guide:"閱讀指南",
  feat_sim_t:"二十一點模擬器", feat_sim_d:"完整規則引擎——要牌、停牌、雙倍、分牌，莊家照賭場規則走。用基本策略練習，賭本上線（假錢、真數學）。",
  feat_count_t:"算牌課程", feat_count_d:"Hi-Lo、KO、Omega II 等系統——外加正確的注碼、破產風險與計時訓練。誠實版本，包括賭場為什麼會請你出去。",
  feat_guide_t:"完整指南", feat_guide_d:"玩法、基本策略表、賭場規則差異，以及每條規則讓你多付多少。",
  feat_calc_t:"優勢計算機", feat_calc_d:"選桌台規則——幾副牌、軟17、6:5 vs 3:2、投降——看精確的莊家優勢。",
  feat_gear_t:"裝備", feat_gear_d:"值得讀的算牌書與我真心推薦的練習裝備——外加 Blackjack Lab 周邊。",
  roll:"發牌", clear_bets:"清除注碼",
  bankroll:"賭本", win_goal:"停利目標", stop_loss:"停損",
  ad_label:"廣告",
  house_ad_label:"我們的網站",
  house_ad_text:"🎲 Labs 總覽——花旗骰、百家樂與輪盤",
  disclosure:"Blackjack Lab 是免費教育模擬器，不涉及真錢投注。算牌不違法，但賭場是私人場所，可以拒絕他們認為在算牌的玩家——課程會誠實說明這點。",
  footer_by:"為想看清數學真相的玩家而建。",
  footer_labs:"Labs 系列：",
  start:"開始", stop:"停止", reset:"重設",
}};
let LANG = localStorage.getItem('blackjacklab_lang') || 'en';
function t(key){ return (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key; }
function setLang(l){
  LANG = (l==='zh') ? 'zh' : 'en';
  localStorage.setItem('blackjacklab_lang', LANG);
  document.documentElement.lang = LANG==='zh' ? 'zh-Hant' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{ el.placeholder = t(el.dataset.i18nPh); });
  const b = document.getElementById('langbtn'); if(b) b.textContent = LANG==='zh' ? 'EN' : '中';
  if (typeof onLangChange === 'function') onLangChange();
  if (typeof renderDynamic === 'function') renderDynamic();
}
function adSlot(){
  return `<div class="house-ad"><span class="house-ad-label" data-i18n="house_ad_label">${t('house_ad_label')}</span><a class="house-ad-link" href="https://hedgewizs.github.io/thecasinocruiser/labs.html" target="_blank" rel="noopener" data-i18n="house_ad_text">${t('house_ad_text')}</a></div>
  <!-- AdSense: paste responsive ad unit code inside .house-ad above; keep the label -->`;
}
function disclosure(){
  return `<div class="disclosure">⚠️ ${t('disclosure')}</div>`;
}
function navHTML(active){
  const L = [
    ['index.html','nav_home'],['guide.html','nav_guide'],['simulator.html','nav_sim'],
    ['counting-course.html','nav_count'],
    ['calculators.html','nav_calc'],['gear.html','nav_gear'],['about.html','nav_about']
  ];
  return `<header class="site"><nav class="nav">
    <a class="brand" href="index.html">🂡 Blackjack Lab <small>beatable math, honestly</small></a>
    ${L.map(([h,k])=>`<a class="nl${active===h?' active':''}" href="${h}" data-i18n="${k}">${t(k)}</a>`).join('')}
    <button class="langbtn" id="langbtn" onclick="setLang(LANG==='zh'?'en':'zh')">${LANG==='zh'?'EN':'中'}</button>
  </nav></header>`;
}
function footerHTML(){
  return `<footer class="site"><div class="wrap">
    <p>${t('footer_labs')}<a href="https://hedgewizs.github.io/thecasinocruiser/labs.html">🎲 Labs hub</a> · <a href="https://hedgewizs.github.io/craps-lab/">Craps Lab</a> · <a href="https://hedgewizs.github.io/baccarat-lab/">Baccarat Lab</a> · <a href="https://hedgewizs.github.io/roulette-lab/">Roulette Lab</a></p>
    <p data-i18n="footer_by">${t('footer_by')}</p>
    <p class="muted" style="font-size:.78rem">Blackjack Lab · ${t('disclosure')}</p>
  </div></footer>
  <script>setLang(LANG);<\/script>`;
}
