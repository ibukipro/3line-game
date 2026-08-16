
// 設定を取得
const rewardGroup = REWARD_CONFIG[winCount];
  const diffData = rewardGroup[difficulty] || rewardGroup.easy;
  if (!rewardGroup) return; // 🌟安全ガードを追加

  const iconHtml = `<div class="${rewardGroup.baseClass} ${diffData.colorClass}"></div>`;
  const diffData = rewardGroup[difficulty] || rewardGroup.easy;
  if (!diffData) return; // 🌟安全ガードを追加

  // 💡【お掃除ポイント1】難易度の日本語表記を、HTMLの外で一瞬で安全に変換！
  const diffMap = {
    easy: 'よわい', 'イージー': 'よわい',
    medium: 'ふつう', 'ミディアム': 'ふつう',
    hard: 'つよい', 'ハード': 'つよい'
  };
  const displayDiff = diffMap[diffData.label || difficulty] || (diffData.label || difficulty);

  // 💡【お掃除ポイント2】エラー防止ガード付きの色判定とクラス名をすっきり一本化！
  const color = diffData.colorClass || '';
  const rankClass = color.includes('bronze') ? 'rank-bronze' 
                  : color.includes('silver') ? 'rank-silver' 
                  : 'rank-gold';

  // 既存のモーダルがあれば一旦閉じる
closeRewardModal();

// ① 最前面でクラッカー🎉を発射＆連続発射ループを開始
@@ -915,8 +931,6 @@ function checkAndShowReward(winCount, difficulty = 'easy') {
'#ffa62d', '#ff36ff', '#00ffcc', '#ff3366', '#33ccff', '#99ff33'
];

    const getRandomColor = () => [defaultPalette[Math.floor(Math.random() * defaultPalette.length)]];

// 1. 最初の下からのドカン！🎉（左＆右）
confetti({ particleCount: initialCount, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, zIndex: 99999 });
confetti({ particleCount: initialCount, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, zIndex: 99999 });
@@ -931,6 +945,9 @@ function checkAndShowReward(winCount, difficulty = 'easy') {
if (window.confettiLoop) clearInterval(window.confettiLoop);

window.confettiLoop = setInterval(() => {
      // 🌟【お掃除ポイント3】色のランダム計算をループの中に正しく配置！これで毎回違うカラフルな色が綺麗に舞い続けます
      const randomColor = [defaultPalette[Math.floor(Math.random() * defaultPalette.length)]];

// 3方向からそれぞれ2発ずつ（計6発）別々の色で飛ばす
launchPoints.forEach(pt => {
for (let i = 0; i < 2; i++) {
@@ -939,7 +956,7 @@ function checkAndShowReward(winCount, difficulty = 'easy') {
particleCount: 1,
gravity: 0.82,
ticks: 150,
            colors: getRandomColor(),
            colors: randomColor,
zIndex: 99999,
scalar: 1.15
});
@@ -948,66 +965,56 @@ function checkAndShowReward(winCount, difficulty = 'easy') {
}, intervalSpeed);
}

  // 💡 エラー防止ガード付きの色判定
  const color = (diffData && diffData.colorClass) ? diffData.colorClass : '';
  const rankClass = color.includes('bronze') ? 'rank-bronze' 
                  : color.includes('silver') ? 'rank-silver' 
                  : 'rank-gold';

 


 // ② ポップアップ（HTML）を組み立てて表示
const modalHtml = `
  <div id="rewardModalOverlay" class="reward-modal-overlay">
    <div class="reward-modal-box">
      <div style="color: #facc15; font-size: 12px; font-weight: bold;">
        ★ ACHIEVEMENTS UNLOCKED ★
      </div>

      <!-- 🏅 アイコン ＋ 級バッジ -->
      <div class="reward-medal-container">

        <!-- ✨ メダル・王冠・トロフィー共通（CSS背景画像＋キラキラ表示） -->
        <span class="${rewardGroup.baseClass} ${diffData.colorClass} sparkle-popup">
          <i class="sparkle-star star-1">✦</i>
          <i class="sparkle-star star-2">✦</i>
          <i class="sparkle-star star-3">✦</i>
          <i class="sparkle-star star-4">✦</i>
        </span>

        ${diffData.grade ? `<span class="badge-grade ${rankClass}">${diffData.grade}</span>` : ''}
      </div>


       <!-- 💡 マスター称号バッジ（アイコンのすぐ下） -->
  // ② ポップアップ（HTML）を組み立てて表示
  const modalHtml = `
    <div id="rewardModalOverlay" class="reward-modal-overlay">
      <div class="reward-modal-box">
        <div style="color: #facc15; font-size: 12px; font-weight: bold;">
          ★ ACHIEVEMENTS UNLOCKED ★
        </div>

        <!-- 🏅 アイコン ＋ 級バッジ -->
        <div class="reward-medal-container">

          <!-- ✨ メダル・王冠・トロフィー共通（CSS背景画像＋キラキラ表示） -->
          <span class="${rewardGroup.baseClass || ''} ${color} sparkle-popup">
            <i class="sparkle-star star-1">✦</i>
            <i class="sparkle-star star-2">✦</i>
            <i class="sparkle-star star-3">✦</i>
            <i class="sparkle-star star-4">✦</i>
          </span>

          ${diffData.grade ? `<span class="badge-grade ${rankClass}">${diffData.grade}</span>` : ''}
        </div>

        <!-- 💡 マスター称号バッジ（アイコンのすぐ下） -->
       ${diffData.title ? `<div class="badge-title-container"><span class="badge-title ${rankClass}">👑 ${diffData.title}</span></div>` : ''}



        <!-- 🌟 上で変換した displayDiff を使って、HTMLのコードが最高に読みやすくなりました！ -->
        <p style="margin: 1px 0 -15px 0; font-size: 12px; font-weight: bold; color: #cbd5e1;">
          【 難易度：${displayDiff} 】
        </p>

       <h2 style="margin: 25px 0 15px 0; font-size: 22px;">${winCount}勝達成！</h2>
    
        
       <!-- 1. メダル・トロフィー・王冠名 -->
        <p style="font-size: 12px; color: #ccc; margin: 0;">${diffData.name}を獲得しました！</p>
        <p style="font-size: 12px; color: #ccc; margin: 0;">${diffData.name || ''}を獲得しました！</p>
       
      <!-- 2. 級の授与（grade が存在する場合のみ表示） -->
        <!-- 2. 級の授与（grade が存在する場合のみ表示） -->
       ${diffData.grade ? `<p style="font-size: 13px; color: #bae6fd; margin: 10px 0 0 0; font-weight: 500; line-height: 1.5; white-space: normal;">「${diffData.grade}」を取得しました！</p>` : ''}
       
       <!-- 3. マスター称号の獲得（title が存在する場合のみ表示） -->
       ${diffData.title ? `<p style="font-size: 12px; color: #ffd700; margin: 8px 0 0 0; font-weight: bold; line-height: 1.5; white-space: normal;">称号「${diffData.title}」が<br />授与されました！</p>` : ''}

       <!-- 💡 ボタン（上下マージンを上20px・下10pxに拡張） -->
        <button class="reward-close-btn" onclick="closeRewardModal()" style="margin: 40px 0 20px 0;">受け取る！</button>
        <button class="reward-close-btn" onclick="closeRewardModal()" style="margin: 30px 0 20px 0;">受け取る！</button>
     </div>
   </div>
 `;

document.body.insertAdjacentHTML('beforeend', modalHtml);
}



// 🎁 「受け取る！」ボタンを押した時
function closeRewardModal() {
// ① これから出る紙吹雪のタイマーをストップ！
@@ -1016,21 +1023,18 @@ function closeRewardModal() {
window.confettiLoop = null;
}

  // ② 【追加】今画面で舞っている紙吹雪を一瞬でピタッと完全消去！✨
  // ② 今画面で舞っている紙吹雪を一瞬でピタッと完全消去！✨
if (typeof confetti === 'function' && typeof confetti.reset === 'function') {
confetti.reset();
}

 

// ④ モーダルを閉じる
const modal = document.getElementById('rewardModalOverlay');
if (modal) modal.remove();
}




// ---------------------------------------------------
// 🏆 メニュー画面用：獲得実績コレクション（完成・絶対安全版）
// ---------------------------------------------------
