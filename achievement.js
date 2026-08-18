/* ==========================================================================
   🏆 連勝＆実績システム（CSS + HTML + JS 一体型パック）
========================================================================== */

// ---------------------------------------------------
// 1. 🎨 CSSを自動的に本体（<head>）へ読み込ませる
// ---------------------------------------------------
const achievementStyle = document.createElement('style');
achievementStyle.textContent = `
  
/* 画面全体を覆う背景 */
  .reward-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

 /* ポップアップの箱（コンパクト化版） */
.reward-modal-box {
  background: #111827;
  border: 2px solid #facc15;
  border-radius: 16px;
  padding: 20px; /* 24px ➔ 16px にして内側の余白をスッキリ */
  text-align: center;
  width: 90%;   /* 85% ➔ 78% にして画面左右に適度なゆとりを確保 */
  max-width: 320px; /* 320px ➔ 270px に縮小 */
  /* ⭕ 【軽量化】重い box-shadow を廃止し、GPU負荷の極めて低い平坦な drop-shadow に変更。色味と雰囲気は維持！ */
  filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.4));
  animation: rewardPopUp 0.4s ease-out;
  color: white;
  font-family: sans-serif;
}

  /* メダル枠 */
.reward-medal-container {
  position: relative;
  display: inline-block;
  margin: 15px 0;
  padding: 10px;
}

/* 🏅 SVGメダルの共通設定 */
.reward-medal-icon {
  display: inline-block;
  width: 95px;
  height: 95px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
}

/* ===================================================
   🥉 銅メダル (星の位置を大幅ダウン・目視中央調整版)
   =================================================== */
.medal-bronze {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FFCCBC"/><stop offset="18%" stop-color="%23FFE0B2"/><stop offset="45%" stop-color="%23D87A51"/><stop offset="70%" stop-color="%238D3C1B"/><stop offset="85%" stop-color="%23E0A98B"/><stop offset="95%" stop-color="%235D220A"/><stop offset="100%" stop-color="%232A0B00"/></linearGradient><linearGradient id="body" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23FFCCBC"/><stop offset="20%" stop-color="%23FFE0B2"/><stop offset="45%" stop-color="%23D87A51"/><stop offset="70%" stop-color="%238D3C1B"/><stop offset="85%" stop-color="%23E0A98B"/><stop offset="100%" stop-color="%235D220A"/></linearGradient><linearGradient id="star" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23FFF3E0"/><stop offset="30%" stop-color="%23FFCCBC"/><stop offset="75%" stop-color="%23D87A51"/><stop offset="100%" stop-color="%234A1D0D"/></linearGradient><linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0.35"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></linearGradient><filter id="emboss" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="%231F0800" flood-opacity="0.85"/></filter></defs><circle cx="50" cy="50" r="47" fill="url(%23ring)" stroke="%23FFE0B2" stroke-width="0.8"/><circle cx="50" cy="50" r="37" fill="url(%23body)" stroke="%234A1D0D" stroke-width="1.2"/><path d="M 20 20 L 80 20 L 70 80 L 30 80 Z" fill="url(%23shine)" opacity="0.6"/><path d="M 50 37.5 L 53.6 45.6 L 62.1 46.4 L 55.7 52.2 L 57.6 60.5 L 50 55.8 L 42.4 60.5 L 44.3 52.2 L 37.9 46.4 L 46.4 45.6 Z" fill="none" stroke="%23FFE0B2" stroke-width="0.6" opacity="0.8"/><path d="M 50 38 L 53.2 45.8 L 61.5 46.6 L 55.3 52.2 L 57.1 60 L 50 55.5 L 42.9 60 L 44.7 52.2 L 38.5 46.6 L 46.8 45.8 Z" fill="url(%23star)" filter="url(%23emboss)"/></svg>');
}

/* ===================================================
   🥈 銀メダル (星の位置を大幅ダウン・目視中央調整版)
   =================================================== */
.medal-silver {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ECEFF1"/><stop offset="18%" stop-color="%23FFFFFF"/><stop offset="45%" stop-color="%2390A4AE"/><stop offset="70%" stop-color="%23455A64"/><stop offset="85%" stop-color="%23CFD8DC"/><stop offset="95%" stop-color="%2337474F"/><stop offset="100%" stop-color="%23102027"/></linearGradient><linearGradient id="body" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ECEFF1"/><stop offset="20%" stop-color="%23FFFFFF"/><stop offset="45%" stop-color="%2390A4AE"/><stop offset="70%" stop-color="%23455A64"/><stop offset="85%" stop-color="%23CFD8DC"/><stop offset="100%" stop-color="%2337474F"/></linearGradient><linearGradient id="star" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23FFFFFF"/><stop offset="30%" stop-color="%23ECEFF1"/><stop offset="75%" stop-color="%2390A4AE"/><stop offset="100%" stop-color="%23263238"/></linearGradient><linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0.45"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></linearGradient><filter id="emboss" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="%23102027" flood-opacity="0.85"/></filter></defs><circle cx="50" cy="50" r="47" fill="url(%23ring)" stroke="%23FFFFFF" stroke-width="0.8"/><circle cx="50" cy="50" r="37" fill="url(%23body)" stroke="%23263238" stroke-width="1.2"/><path d="M 20 20 L 80 20 L 70 80 L 30 80 Z" fill="url(%23shine)" opacity="0.6"/><path d="M 50 37.5 L 53.6 45.6 L 62.1 46.4 L 55.7 52.2 L 57.6 60.5 L 50 55.8 L 42.4 60.5 L 44.3 52.2 L 37.9 46.4 L 46.4 45.6 Z" fill="none" stroke="%23FFFFFF" stroke-width="0.6" opacity="0.8"/><path d="M 50 38 L 53.2 45.8 L 61.5 46.6 L 55.3 52.2 L 57.1 60 L 50 55.5 L 42.9 60 L 44.7 52.2 L 38.5 46.6 L 46.8 45.8 Z" fill="url(%23star)" filter="url(%23emboss)"/></svg>');
}

/* ===================================================
   🥇 金メダル (星の位置を大幅ダウン・目視中央調整版)
   =================================================== */
.medal-gold {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FFE082"/><stop offset="18%" stop-color="%23FFF59D"/><stop offset="45%" stop-color="%23FFB300"/><stop offset="70%" stop-color="%23FF6F00"/><stop offset="85%" stop-color="%23FFE082"/><stop offset="95%" stop-color="%23FF8F00"/><stop offset="100%" stop-color="%234E2600"/></linearGradient><linearGradient id="body" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23FFE082"/><stop offset="20%" stop-color="%23FFF59D"/><stop offset="45%" stop-color="%23FFB300"/><stop offset="70%" stop-color="%23FF6F00"/><stop offset="85%" stop-color="%23FFE082"/><stop offset="100%" stop-color="%23FF8F00"/></linearGradient><linearGradient id="star" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23FFFFFF"/><stop offset="30%" stop-color="%23FFE082"/><stop offset="75%" stop-color="%23FFB300"/><stop offset="100%" stop-color="%23D84315"/></linearGradient><linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0.45"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></linearGradient><filter id="emboss" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="%233E1C00" flood-opacity="0.85"/></filter></defs><circle cx="50" cy="50" r="47" fill="url(%23ring)" stroke="%23FFF8E1" stroke-width="0.8"/><circle cx="50" cy="50" r="37" fill="url(%23body)" stroke="%233E1C00" stroke-width="1.2"/><path d="M 20 20 L 80 20 L 70 80 L 30 80 Z" fill="url(%23shine)" opacity="0.6"/><path d="M 50 37.5 L 53.6 45.6 L 62.1 46.4 L 55.7 52.2 L 57.6 60.5 L 50 55.8 L 42.4 60.5 L 44.3 52.2 L 37.9 46.4 L 46.4 45.6 Z" fill="none" stroke="%23FFF8E1" stroke-width="0.6" opacity="0.8"/><path d="M 50 38 L 53.2 45.8 L 61.5 46.6 L 55.3 52.2 L 57.1 60 L 50 55.5 L 42.9 60 L 44.7 52.2 L 38.5 46.6 L 46.8 45.8 Z" fill="url(%23star)" filter="url(%23emboss)"/></svg>');
}

 

/* 🏆 SVGトロフィーの共通設定 */
.reward-trophy-icon {
  display: inline-block;
  width: 115px;  /* 💡 メダルより一回り大きくして存在感を強調 */
  height: 115px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
 }


/* 🥉 銅のトロフィー */
.trophy-bronze {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="tm-b" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23FFCCBC"/><stop offset="18%" stop-color="%23FFE0B2"/><stop offset="45%" stop-color="%23D87A51"/><stop offset="70%" stop-color="%238D3C1B"/><stop offset="85%" stop-color="%23E0A98B"/><stop offset="95%" stop-color="%235D220A"/><stop offset="100%" stop-color="%232A0B00"/></linearGradient><linearGradient id="tb-b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23A14723"/><stop offset="50%" stop-color="%234A1D0D"/><stop offset="100%" stop-color="%231F0800"/></linearGradient><linearGradient id="ts-b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23FFF3E0"/><stop offset="30%" stop-color="%23FFCCBC"/><stop offset="75%" stop-color="%23D87A51"/><stop offset="100%" stop-color="%234A1D0D"/></linearGradient><linearGradient id="t-sh" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0.4"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></linearGradient><filter id="f-tb" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="%231F0800" flood-opacity="0.85"/></filter></defs><path d="M 32 26 C 10 26, 8 52, 32 54 L 32 46 C 18 45, 18 33, 32 33 Z" fill="url(%23tm-b)"/><path d="M 68 26 C 90 26, 92 52, 68 54 L 68 46 C 82 45, 82 33, 68 33 Z" fill="url(%23tm-b)"/><rect x="22" y="82" width="56" height="13" rx="3" fill="url(%23tb-b)" stroke="%233E1608" stroke-width="0.8"/><rect x="28" y="75" width="44" height="9" rx="2" fill="url(%23tm-b)"/><path d="M 42 56 L 58 56 L 55 76 L 45 76 Z" fill="url(%23tm-b)"/><ellipse cx="50" cy="57" rx="9" ry="2.5" fill="%23FFE0B2"/><path d="M 26 18 L 74 18 C 74 44, 62 60, 50 60 C 38 60, 26 44, 26 18 Z" fill="url(%23tm-b)"/><ellipse cx="50" cy="18" rx="24" ry="5" fill="url(%23tm-b)"/><ellipse cx="50" cy="19" rx="22" ry="4" fill="url(%23tm-b)"/><path d="M 43 18 L 51 18 L 49 60 L 46 60 Z" fill="url(%23t-sh)"/><path d="M 50 26.5 L 52.8 32.8 L 59.5 33.4 L 54.5 38.0 L 56.0 44.5 L 50 40.8 L 44 44.5 L 45.5 38.0 L 40.5 33.4 L 47.2 32.8 Z" fill="none" stroke="%23FFE0B2" stroke-width="0.6" opacity="0.8"/><path d="M 50 27 L 52.5 33 L 59 33.6 L 54.2 38.0 L 55.6 44 L 50 40.5 L 44.4 44 L 45.8 38.0 L 41 33.6 L 47.5 33 Z" fill="url(%23ts-b)" filter="url(%23f-tb)"/></svg>');
}

/* 🥈 銀のトロフィー */
.trophy-silver {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="tm-s" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ECEFF1"/><stop offset="18%" stop-color="%23FFFFFF"/><stop offset="45%" stop-color="%2390A4AE"/><stop offset="70%" stop-color="%23455A64"/><stop offset="85%" stop-color="%23CFD8DC"/><stop offset="95%" stop-color="%2337474F"/><stop offset="100%" stop-color="%23102027"/></linearGradient><linearGradient id="tb-s" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%2378909C"/><stop offset="50%" stop-color="%23263238"/><stop offset="100%" stop-color="%230D171D"/></linearGradient><linearGradient id="ts-s" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23FFFFFF"/><stop offset="30%" stop-color="%23ECEFF1"/><stop offset="75%" stop-color="%2390A4AE"/><stop offset="100%" stop-color="%23263238"/></linearGradient><linearGradient id="t-sh" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0.4"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></linearGradient><filter id="f-ts" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="%23102027" flood-opacity="0.85"/></filter></defs><path d="M 32 26 C 10 26, 8 52, 32 54 L 32 46 C 18 45, 18 33, 32 33 Z" fill="url(%23tm-s)"/><path d="M 68 26 C 90 26, 92 52, 68 54 L 68 46 C 82 45, 82 33, 68 33 Z" fill="url(%23tm-s)"/><rect x="22" y="82" width="56" height="13" rx="3" fill="url(%23tb-s)" stroke="%231C282E" stroke-width="0.8"/><rect x="28" y="75" width="44" height="9" rx="2" fill="url(%23tm-s)"/><path d="M 42 56 L 58 56 L 55 76 L 45 76 Z" fill="url(%23tm-s)"/><ellipse cx="50" cy="57" rx="9" ry="2.5" fill="%23FFFFFF"/><path d="M 26 18 L 74 18 C 74 44, 62 60, 50 60 C 38 60, 26 44, 26 18 Z" fill="url(%23tm-s)"/><ellipse cx="50" cy="18" rx="24" ry="5" fill="url(%23tm-s)"/><ellipse cx="50" cy="19" rx="22" ry="4" fill="url(%23tm-s)"/><path d="M 43 18 L 51 18 L 49 60 L 46 60 Z" fill="url(%23t-sh)"/><path d="M 50 26.5 L 52.8 32.8 L 59.5 33.4 L 54.5 38.0 L 56.0 44.5 L 50 40.8 L 44 44.5 L 45.5 38.0 L 40.5 33.4 L 47.2 32.8 Z" fill="none" stroke="%23FFFFFF" stroke-width="0.6" opacity="0.8"/><path d="M 50 27 L 52.5 33 L 59 33.6 L 54.2 38.0 L 55.6 44 L 50 40.5 L 44.4 44 L 45.8 38.0 L 41 33.6 L 47.5 33 Z" fill="url(%23ts-s)" filter="url(%23f-ts)"/></svg>');
}

/* 🥇 金のトロフィー */
.trophy-gold {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="tm-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23FFE082"/><stop offset="18%" stop-color="%23FFF59D"/><stop offset="45%" stop-color="%23FFB300"/><stop offset="70%" stop-color="%23FF6F00"/><stop offset="85%" stop-color="%23FFE082"/><stop offset="95%" stop-color="%23FF8F00"/><stop offset="100%" stop-color="%234E2600"/></linearGradient><linearGradient id="tb-g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23FFB300"/><stop offset="50%" stop-color="%238D4000"/><stop offset="100%" stop-color="%233E1C00"/></linearGradient><linearGradient id="ts-g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23FFFFFF"/><stop offset="30%" stop-color="%23FFE082"/><stop offset="75%" stop-color="%23FFB300"/><stop offset="100%" stop-color="%23D84315"/></linearGradient><linearGradient id="t-sh" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0.4"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></linearGradient><filter id="f-tg" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="%233E1C00" flood-opacity="0.85"/></filter></defs><path d="M 32 26 C 10 26, 8 52, 32 54 L 32 46 C 18 45, 18 33, 32 33 Z" fill="url(%23tm-g)"/><path d="M 68 26 C 90 26, 92 52, 68 54 L 68 46 C 82 45, 82 33, 68 33 Z" fill="url(%23tm-g)"/><rect x="22" y="82" width="56" height="13" rx="3" fill="url(%23tb-g)" stroke="%234E2600" stroke-width="0.8"/><rect x="28" y="75" width="44" height="9" rx="2" fill="url(%23tm-g)"/><path d="M 42 56 L 58 56 L 55 76 L 45 76 Z" fill="url(%23tm-g)"/><ellipse cx="50" cy="57" rx="9" ry="2.5" fill="%23FFF59D"/><path d="M 26 18 L 74 18 C 74 44, 62 60, 50 60 C 38 60, 26 44, 26 18 Z" fill="url(%23tm-g)"/><ellipse cx="50" cy="18" rx="24" ry="5" fill="url(%23tm-g)"/><ellipse cx="50" cy="19" rx="22" ry="4" fill="url(%23tm-g)"/><path d="M 43 18 L 51 18 L 49 60 L 46 60 Z" fill="url(%23t-sh)"/><path d="M 50 26.5 L 52.8 32.8 L 59.5 33.4 L 54.5 38.0 L 56.0 44.5 L 50 40.8 L 44 44.5 L 45.5 38.0 L 40.5 33.4 L 47.2 32.8 Z" fill="none" stroke="%23FFF8E1" stroke-width="0.6" opacity="0.8"/><path d="M 50 27 L 52.5 33 L 59 33.6 L 54.2 38.0 L 55.6 44 L 50 40.5 L 44.4 44 L 45.8 38.0 L 41 33.6 L 47.5 33 Z" fill="url(%23ts-g)" filter="url(%23f-tg)"/></svg>');
}




/* 👑 王冠の共通設定 */
.reward-crown-icon {
  display: inline-block;
  width: 120px; /* 💡 最大サイズで最高実績の圧倒的な存在感を演出 */
  height: 120px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  }

/* ===================================================
   🥉 銅の王冠 (メダル完全同期カラー版)
   =================================================== */
.crown-bronze {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="bm" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%235D220A"/><stop offset="15%" stop-color="%23D87A51"/><stop offset="35%" stop-color="%23FFCCBC"/><stop offset="42%" stop-color="%23FFE0B2"/><stop offset="65%" stop-color="%238D3C1B"/><stop offset="85%" stop-color="%23E0A98B"/><stop offset="100%" stop-color="%232A0B00"/></linearGradient><linearGradient id="br" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%235D220A"/><stop offset="20%" stop-color="%23D87A51"/><stop offset="40%" stop-color="%23FFCCBC"/><stop offset="60%" stop-color="%238D3C1B"/><stop offset="100%" stop-color="%232A0B00"/></linearGradient><radialGradient id="gem-b" cx="35%" cy="25%" r="70%"><stop offset="0%" stop-color="%23FFFFFF"/><stop offset="25%" stop-color="%236EE7B7"/><stop offset="60%" stop-color="%23047857"/><stop offset="100%" stop-color="%23064E3B"/></radialGradient><filter id="f3d-b" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="%231F0800" flood-opacity="0.85"/></filter></defs><g filter="url(%23f3d-b)"><path d="M 15 75 Q 50 77 85 75 C 88 60 86 46 84 36 C 79 46 71 46 66 26 C 61 40 55 40 50 18 C 45 40 39 40 34 26 C 29 46 21 46 16 36 C 14 46 12 60 15 75 Z" fill="url(%23bm)" stroke="%234A1D0D" stroke-width="1"/><path d="M 15 75 Q 50 77 85 75 L 85 60 Q 50 62 15 60 Z" fill="url(%23br)" stroke="%234A1D0D" stroke-width="1"/><circle cx="16" cy="36" r="3" fill="url(%23br)" stroke="%234A1D0D" stroke-width="0.8"/><circle cx="34" cy="26" r="3.5" fill="url(%23br)" stroke="%234A1D0D" stroke-width="0.8"/><circle cx="50" cy="18" r="4" fill="url(%23br)" stroke="%234A1D0D" stroke-width="0.8"/><circle cx="66" cy="26" r="3.5" fill="url(%23br)" stroke="%234A1D0D" stroke-width="0.8"/><circle cx="84" cy="36" r="3" fill="url(%23br)" stroke="%234A1D0D" stroke-width="0.8"/><circle cx="50" cy="48" r="7.5" fill="url(%23gem-b)" stroke="%234A1D0D" stroke-width="1"/><path d="M 45 52 A 5 5 0 0 0 55 52" fill="none" stroke="%23A7F3D0" stroke-width="1.2" opacity="0.8"/><circle cx="47.5" cy="45" r="2.5" fill="%23ffffff"/><circle cx="52" cy="49" r="1" fill="%23ffffff" opacity="0.8"/></g></svg>');
}

/* ===================================================
   🥈 銀の王冠 (メダル完全同期カラー版)
   =================================================== */
.crown-silver {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="sm" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%2337474F"/><stop offset="15%" stop-color="%2390A4AE"/><stop offset="35%" stop-color="%23ECEFF1"/><stop offset="42%" stop-color="%23FFFFFF"/><stop offset="65%" stop-color="%23455A64"/><stop offset="85%" stop-color="%23CFD8DC"/><stop offset="100%" stop-color="%23102027"/></linearGradient><linearGradient id="sr" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%2337474F"/><stop offset="20%" stop-color="%2390A4AE"/><stop offset="40%" stop-color="%23ECEFF1"/><stop offset="60%" stop-color="%23455A64"/><stop offset="100%" stop-color="%23102027"/></linearGradient><radialGradient id="gem-s" cx="35%" cy="25%" r="70%"><stop offset="0%" stop-color="%23FFFFFF"/><stop offset="25%" stop-color="%2338BDF8"/><stop offset="60%" stop-color="%230369A1"/><stop offset="100%" stop-color="%23075985"/></radialGradient><filter id="f3d-s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="%23102027" flood-opacity="0.85"/></filter></defs><g filter="url(%23f3d-s)"><path d="M 15 75 Q 50 77 85 75 C 88 60 86 46 84 36 C 79 46 71 46 66 26 C 61 40 55 40 50 18 C 45 40 39 40 34 26 C 29 46 21 46 16 36 C 14 46 12 60 15 75 Z" fill="url(%23sm)" stroke="%23263238" stroke-width="1"/><path d="M 15 75 Q 50 77 85 75 L 85 60 Q 50 62 15 60 Z" fill="url(%23sr)" stroke="%23263238" stroke-width="1"/><circle cx="16" cy="36" r="3" fill="url(%23sr)" stroke="%23263238" stroke-width="0.8"/><circle cx="34" cy="26" r="3.5" fill="url(%23sr)" stroke="%23263238" stroke-width="0.8"/><circle cx="50" cy="18" r="4" fill="url(%23sr)" stroke="%23263238" stroke-width="0.8"/><circle cx="66" cy="26" r="3.5" fill="url(%23sr)" stroke="%23263238" stroke-width="0.8"/><circle cx="84" cy="36" r="3" fill="url(%23sr)" stroke="%23263238" stroke-width="0.8"/><circle cx="50" cy="48" r="7.5" fill="url(%23gem-s)" stroke="%23263238" stroke-width="1"/><path d="M 45 52 A 5 5 0 0 0 55 52" fill="none" stroke="%23BAE6FD" stroke-width="1.2" opacity="0.85"/><circle cx="47.5" cy="45" r="2.5" fill="%23ffffff"/><circle cx="52" cy="49" r="1" fill="%23ffffff" opacity="0.9"/></g></svg>');
}

/* ===================================================
   🥇 金の王冠 (メダル完全同期カラー版)
   =================================================== */
.crown-gold {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="gm" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23FF8F00"/><stop offset="15%" stop-color="%23FFB300"/><stop offset="35%" stop-color="%23FFE082"/><stop offset="42%" stop-color="%23FFF59D"/><stop offset="65%" stop-color="%23FF6F00"/><stop offset="85%" stop-color="%23FFE082"/><stop offset="100%" stop-color="%234E2600"/></linearGradient><linearGradient id="gr" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23FF8F00"/><stop offset="20%" stop-color="%23FFB300"/><stop offset="40%" stop-color="%23FFE082"/><stop offset="60%" stop-color="%23FF6F00"/><stop offset="100%" stop-color="%234E2600"/></linearGradient><radialGradient id="gem-r" cx="35%" cy="25%" r="70%"><stop offset="0%" stop-color="%23FFFFFF"/><stop offset="25%" stop-color="%23FB7185"/><stop offset="60%" stop-color="%23BE123C"/><stop offset="100%" stop-color="%23881337"/></radialGradient></defs><g><path d="M 15 75 Q 50 77 85 75 C 88 60 86 46 84 36 C 79 46 71 46 66 26 C 61 40 55 40 50 18 C 45 40 39 40 34 26 C 29 46 21 46 16 36 C 14 46 12 60 15 75 Z" fill="url(%23gm)" stroke="%233E1C00" stroke-width="1"/><path d="M 15 75 Q 50 77 85 75 L 85 60 Q 50 62 15 60 Z" fill="url(%23gr)" stroke="%233E1C00" stroke-width="1"/><circle cx="16" cy="36" r="3" fill="url(%23gr)" stroke="%233E1C00" stroke-width="0.8"/><circle cx="34" cy="26" r="3.5" fill="url(%23gr)" stroke="%233E1C00" stroke-width="0.8"/><circle cx="50" cy="18" r="4" fill="url(%23gr)" stroke="%233E1C00" stroke-width="0.8"/><circle cx="66" cy="26" r="3.5" fill="url(%23gr)" stroke="%233E1C00" stroke-width="0.8"/><circle cx="84" cy="36" r="3" fill="url(%23gr)" stroke="%233E1C00" stroke-width="0.8"/><circle cx="50" cy="48" r="7.5" fill="url(%23gem-r)" stroke="%233E1C00" stroke-width="1"/><path d="M 45 52 A 5 5 0 0 0 55 52" fill="none" stroke="%23FECDD3" stroke-width="1.2" opacity="0.85"/><circle cx="47.5" cy="45" r="2.5" fill="%23ffffff"/><circle cx="52" cy="49" r="1" fill="%23ffffff" opacity="0.9"/></g></svg>');
}




/* ==========================================================================
   🌟 ポップアップ用の星設定（超軽量・GPU特化型）
   ========================================================================== */
.sparkle-popup .sparkle-star {
  position: absolute;
  font-style: normal;
  color: #ffffff;
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  display: block;
  line-height: 1;
  width: 1em;
  height: 1em;
  text-align: center;
  
  /* ⭕ 【超軽量化】3重の重い text-shadow を2重に引き締め、ボカシの計算負荷を大幅カット！
     色味の広がりと上品な発光感はそのままキープしています */
  text-shadow: 
    0 0 4px #ffffff,
    0 0 10px #eab308;

  /* 💡 アニメーション中の各星の拡大縮小を完全にGPU側へ委任するお守り */
  will-change: transform, opacity;
  transform-origin: center center;
}

/* 📍 1. 左上（小ぶりに調整） */
.sparkle-popup .star-1 {
  top: 4px;
  left: 8px;
  font-size: 22px;
  animation: popInPlace 2.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
}

/* 📍 2. 右上（小ぶりに調整） */
.sparkle-popup .star-2 {
  top: 14px;
  right: 8px;
  font-size: 14px;
  animation: popInPlace 3.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.9s infinite;
}

/* 📍 3. 左下（小ぶりに調整） */
.sparkle-popup .star-3 {
  bottom: 10px;
  left: 12px;
  font-size: 18px;
  animation: popInPlace 4.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.8s infinite;
}

/* 📍 4. 右下（小ぶりに調整） */
.sparkle-popup .star-4 {
  bottom: 6px;
  right: 10px;
  font-size: 24px;
  animation: popInPlace 3.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s infinite;
}


/* 🌟 その場で小ぶりにポンッと点滅するアニメーション（will-changeと連動して最速駆動） */
@keyframes popInPlace {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  20% {
    opacity: 1;
    transform: scale(1.1);
  }
  55% {
    opacity: 0;
    transform: scale(0.2);
  }
  100% {
    opacity: 0;
    transform: scale(0.1);
  }
}





/* ==============================================
   アイコン全体を中央寄せするコンテナ（位置・余白完全維持）
   ============================================== */
.reward-medal-container {
  position: relative;
  display: block;
  text-align: center;
  margin: 15px 0;
  padding: 10px;
}

/* ==============================================
   1. 級バッジ（丸型）＆ 右下配置（つやつや＆きらーん実装）
   ============================================== */

/* 💡 アイコン自体をバッジの基準点にする設定 */
.sparkle-frame {
  position: relative;
  display: inline-block;
  z-index: 20;
}

.badge-grade {
  position: absolute;
  
  /* 📌 指定の位置とサイズ、マージンは1ミリも動かさず完全維持 */
  bottom: 40px;        
  right: -180px;        
  width: 28px;
  height: 28px;
  border-radius: 50%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
  z-index: 30;

  /* 💡 【バグ完全防御】Safari等のブラウザで丸型のマスクから光が一瞬はみ出る描画バグを100%防ぐプロの技 */
  overflow: hidden;
  isolation: isolate; 
  
  /* 💡 【軽量化】ぷっくり立体感を出すinsetは完全維持。
     外側の重い影だけを低負荷な値に引き締め、アニメーション中のCPU負荷を激減 */
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.5),
    inset 0 2px 3px rgba(255, 255, 255, 0.9),
    inset 0 -2px 3px rgba(0, 0, 0, 0.3);
}

/* 💡 上半分のレンズっぽい「つや」をつくる擬似要素（完全維持） */
.badge-grade::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 48%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.05));
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  pointer-events: none;
  z-index: 1;
}

/* 💡 光がスッと走り抜ける「きらーん」アニメーション用 */
.badge-grade::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -150%;
  width: 60%;
  height: 200%;
  background: linear-gradient(
    90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.85) 50%, 
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(25deg);
  /* 💡 will-changeを追加して、5秒ごとの「きらーん」が走る瞬間も
     スマホの画面が絶対にカクつかないようにGPUをロックオン */
  will-change: transform;
  animation: shineGleam 5s infinite ease-in-out;
  pointer-events: none;
  z-index: 2;
}

/* 文字自体をハイライトより手前に表示（完全維持） */
.badge-grade span, 
.badge-grade {
  position: relative;
}

/* ==========================================================================
   🎉 ポップアップ内限定：級バッジをアイコンの右上に配置（位置完全維持）
   ========================================================================== */

/* 1. 全体枠をアイコンのサイズにピッタリ合わせる */
.reward-modal-overlay .reward-medal-container {
  position: relative !important;
  display: inline-block !important; 
}

/* 2. 級バッジをアイコンの右上へ配置 */
.reward-modal-overlay .badge-grade {
  position: absolute !important;
  
  /* 🎯 位置指定は1ミリも変えず完全維持 */
  top: 80px !important;     
  right: -20px !important;   
  bottom: auto !important;
  left: auto !important;
}


/* ==========================================================================
   2. 【マスター称号】上寄せ調整＆きらーん追加（形状・余白完全維持）
   ========================================================================== */
.badge-title-container {
  margin-top: -25px; 
  position: relative;
  z-index: 1;        
  text-align: center;
  /* 💡 【バグ修正・立体感復活】clip-pathで消えてしまうbox-shadowの代わりに、
     ここでリボン全体の形に合わせた高品質かつ軽量な影を表現します */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

.badge-title {
  position: relative; 
  /* 💡 【バグ完全防御】リボンの特殊な形状から光が一瞬はみ出る描画バグを100%カット */
  overflow: hidden;   
  isolation: isolate;
  
  display: inline-block;
  padding: 2px 18px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.5px;
  white-space: nowrap;
  
  /* 🎯 プロが作った美しいリボン形状のclip-pathは完全維持 */
  clip-path: polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%, 8% 50%);
}

/* 💡 マスター称号リボンを走り抜ける「きらーん」光線 */
.badge-title::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -150%;
  width: 40%;
  height: 200%;
  background: linear-gradient(
    90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.85) 50%, 
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(25deg);
  /* 💡 will-changeを追加し、リボンの変形マスク内での光線計算をGPUに100%任せて軽量化 */
  will-change: transform;
  /* 🎯 丸バッジから1秒遅れて光るプロのディレイ演出をそのまま完全維持 */
  animation: shineGleam 5s infinite ease-in-out 1s;
  pointer-events: none;
  z-index: 2;
}

/* 文字自体をハイライトより手前に表示 */
.badge-title span, 
.badge-title {
  position: relative;
}

/* ==============================================
   ✨ なめらかツヤツヤグラデーション（金属感アップ版・完全維持）
   ============================================== */

/* 🥉 ブロンズ（自然な光沢のコッパー・銅） */
.rank-bronze {
  background: linear-gradient(135deg, #ffeddb 0%, #e09b53 45%, #8c420b 100%);
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

/* 🥈 シルバー（自然な光沢の上品な銀） */
.rank-silver {
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 45%, #64748b 100%);
  color: #0f172a;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
}

/* 🥇 ゴールド（ボタン風の鮮やかでつややかな金） */
.rank-gold {
  background: linear-gradient(135deg, #fffbeb 0%, #facc15 45%, #b45309 100%);
  color: #3f2200;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* ---------------------------------------------------
   🎬 「きらーん」アニメーション定義（GPU完全駆動・超軽量化版）
   --------------------------------------------------- */
/* 💡 バッジ側、リボン側で設定した left: -150% などの初期位置を基準に、
   ブラウザを一切カクつかせない transform で最速駆動させます。 */
@keyframes shineGleam {
  0% {
    /* 💡 動き出しの基準点（0%） */
    transform: translateX(0) rotate(25deg); 
  }
  40% { 
    /* 💡 8秒（※設定周期）のうち最初の4割の時間を使って、バッジの上をゆっくり右方向へスライド */
    transform: translateX(180%) rotate(25deg); 
  }
  100% {
    /* 💡 残りの時間は右側（画面外）でお休み（ディレイ効果） */
    transform: translateX(180%) rotate(25deg); 
  }
}


 /* ボタン（完全動作・微調整版） */
  .reward-close-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(to right, #facc15, #f59e0b);
    color: #000;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 15px;
    /* 💡 【プロの隠し味】タップした瞬間にボタンが少し縮むエフェクトを追加し、サクサクした押し心地を演出 */
    transition: transform 0.1s ease;
  }
  .reward-close-btn:active {
    transform: scale(0.97);
  }

  /* アニメーション（完全動作・微調整版） */
  @keyframes rewardPopUp {
    /* 💡 0% の縮小率を 0.5 ➔ 0.8 に少し緩めることで、飛び出すスピード感が上がり、
       ゲームのテンポ（サクサク感）がより軽快に感じられるようになります */
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }






/* ==========================================================================
   🏆 メニュー画面用：獲得実績コレクション（完成・整理・最速版）
========================================================================== */

/* 📦 全体コンテナ（横幅・余白完全維持） */
.achievement-panel {
  width: 100%;
  max-width: 256px;
  margin: 25px auto 0;
  padding: 0;
  background: transparent;
  border: none;
  box-sizing: border-box;
}

.achievement-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
}

/* 📜 3x3 グリッドエリア（構造完全維持） */
.achievement-scroll-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 8px;
  padding: 8px 4px;
  overflow: visible !important;
}


/* ==========================================================================
   🎴 カード本体 & アニメーション状態（モバイル超軽量特化版）
========================================================================== */
.achievement-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
 }

/* 未解放（🔒）の状態 */
.achievement-card.locked {
  opacity: 0.25;
  /* 💡 白黒化のピッケージ計算をあらかじめGPU側に準備させ、メニュー画面全体のサクサク感を維持 */
  filter: grayscale(1);
  will-change: filter;
}

/* 獲得済み（✨）の状態 */
.achievement-card.unlocked {
  opacity: 1;
}




/* ==========================================================================
   👑 王冠の頭の上に載るマスターリボン（位置・余白完全復元・最速版）
   ========================================================================== */

.master-top-ribbon {
  font-size: 8px;
  font-weight: 700;
  padding: 2px 6px;
  color: #fff;
  white-space: nowrap;
  line-height: 1;
  
  /* 📌 位置指定、マージン、重ね合わせの数値は1ミリも動かさず完全維持 */
  position: relative;
  z-index: 10;                     
  top: -14px;                      
  margin-bottom: -12px;            

  /* 💡 【バグ修正・立体感復活】clip-pathで消えてしまうbox-shadowの代わりに、
     リボンのギザギザ形状に100%沿った、低負荷かつ美しいドロップシャドウを適用 */
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));

  /* 🎯 美しいV字リボン形状のclip-pathはそのまま完全維持 */
  clip-path: polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%, 8% 50%);
}

/* ---------------------------------------------------
   ✨ メタルグラデーション（色味変更なし・完全維持）
   --------------------------------------------------- */

/* 🥉 ブロンズ（Easy） */
.master-top-ribbon.easy { 
  background: linear-gradient(135deg, #ffeddb 0%, #e09b53 45%, #8c420b 100%);
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

/* 🥈 シルバー（Medium） */
.master-top-ribbon.medium { 
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 45%, #64748b 100%);
  color: #0f172a;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
}

/* 🥇 ゴールド（Hard） */
.master-top-ribbon.hard { 
  background: linear-gradient(135deg, #fffbeb 0%, #facc15 45%, #b45309 100%);
  color: #3f2200;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* 🔒 未解放（Locked） */
.master-top-ribbon.locked {
  background: rgba(51, 65, 85, 0.5);
  color: #64748b;
  /* 💡 不要な再計算を防ぐため、フィルター影を安全に解除 */
  filter: none;
  text-shadow: none;
}




/* ==========================================================================
   🎖️ アイコン領域 & サイズ調整（倍率・サイズ完全維持・最速版）
   ========================================================================== */
.achievement-icon-wrapper {
  width: 44px;
  height: 44px;         /* 📌 高さを固定して全カードの下端を一直線に揃える設計を完全維持 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin-bottom: 2px;   /* アイコンと「Easy 5勝」の間隔 */
  overflow: visible !important;
}

.achievement-icon-wrapper svg {
  width: 100%;
  height: 100%;
}

/* 👑 王冠（全色） */
.achievement-panel [class*="crown-"] {
  /* 🎯 プロが目視調整した1.1倍のスケール感は完全維持 */
  transform: scale(1.1);
  transform-origin: center center;
  /* 💡 縮尺のピクセル計算をあらかじめGPU側にロックさせ、メニュー読み込みを最速化 */
  will-change: transform;
}

/* 🏆 トロフィー（全色） */
.achievement-panel [class*="trophy-"] {
  /* 🎯 プロが目視調整した1.1倍のスケール感は完全維持 */
  transform: scale(1.1);
  transform-origin: center center;
  will-change: transform;
}

/* 🏅 メダル（全色） */
.achievement-panel [class*="medal-"] {
  /* 🎯 プロが目視調整した0.8倍のスケール感は完全維持 */
  transform: scale(0.8) !important;
  transform-origin: center center;
  will-change: transform;
}


/* ==========================================================================
   ℹ️ テキスト情報（アイコン下のラベル群・余白完全維持）
   ========================================================================== */
.achievement-info {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
}

/* 1行目：よわい 5勝 */
.streak-label {
  font-size: 8px;
  font-weight: 700;
  color: #94a3b8;
  line-height: 1;
  white-space: nowrap;
  margin-top: 0px;
  margin-bottom: 6px;   /* 1行目と2行目（級バッジ）の間の余白 */
}

/* 2行目：級バッジ */
.grade-badge {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 3px;
  line-height: 1;
  white-space: nowrap;
  display: inline-block;
  
  /* 📌 指定のカード底面への余白30pxは1ミリも動かさず完全維持 */
  margin-bottom: 30px;  
  
  /* 💡 低負荷な影の指定に引き締め、不要なGPUのバックグラウンド再計算をシャットアウト */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

/* 級バッジの色バリエーション（配色完全維持） */
.grade-badge.grade-easy   { background: #d97706; color: #fef3c7; }
.grade-badge.grade-medium { background: #d97706; color: #fef3c7; }
.grade-badge.grade-hard   { background: #d97706; color: #fef3c7; }


//* ==========================================================================
   ✨ キラキラ星（最前面ポップ演出：44px外枠基準・超軽量GPU特化版）
   ========================================================================== */

.sparkle-frame {
  position: relative;
  overflow: visible !important;
}

.sparkle-frame .sparkle-star {
  position: absolute;
  font-style: normal;
  color: #ffffff;
  z-index: 999 !important;
  pointer-events: none;
  opacity: 0;
  display: block;
  line-height: 1;
  width: 1em;
  height: 1em;
  text-align: center;
  transform-origin: center center;

  /* ⭕ 【常時駆動の超軽量化】3重の重い text-shadow を2重に引き締め、ボカシの計算コストを大幅カット！
     プロが目視調整した「小さく控えめな発光感」の美しさは完璧にキープしています */
  text-shadow: 
    0 0 2px #ffffff,
    0 0 6px #eab308;

  /* 💡 メニュー画面で常に4つの星が動き続けても、スマホの操作に1ミリも影響を与えないためのお守り */
  will-change: transform, opacity;
}

/* 📌 星の位置・サイズ・ゆったりアニメーション（プロの設定された秒数・サイズを完全維持） */
.sparkle-frame .star-1 {
  top: -2px;
  left: -2px;
  font-size: 11px;       
  animation: popInPlace 4.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; 
}

.sparkle-frame .star-2 {
  top: 0px;
  right: -2px;
  font-size: 8px;       
  animation: popInPlace 5.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.2s infinite; 
}

.sparkle-frame .star-3 {
  bottom: 0px;
  left: -2px;
  font-size: 9px;       
  animation: popInPlace 6.0s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.5s infinite; 
}

.sparkle-frame .star-4 {
  bottom: -2px;
  right: -2px;
  font-size: 10px;       
  animation: popInPlace 5.0s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s infinite; 
}

/* 🎬 アニメーション定義（優しい変化を完全維持 ＆ will-changeと連動して最速駆動） */
@keyframes popInPlace {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  20% {
    opacity: 0.9;        
    transform: scale(1.0);
  }
  50% {
    opacity: 0;
    transform: scale(0.2);
  }
  100% {
    opacity: 0;
    transform: scale(0.1);
  }
}



/* ---------------------------------------------------
   メニュー画面星用
   ---------------------------------------------------*/

.
.achievement-panel .sparkle-star {
  text-shadow: none !important; }




/* ---------------------------------------------------
   🌟 ポップアップ（✨後光・発光を強力に復活！・GPU超軽量版）
   --------------------------------------------------- */
/* 1. アイコン自体の輝く後光  */
.reward-modal-overlay .sparkle-popup {
  filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.95)) !important;
}


.achievement-panel .sparkle-star {
  text-shadow: none !important; }



/* ---------------------------------------------------
   🔒 ロック時の鍵バッジ（位置・サイズ完全維持・最速版）
   --------------------------------------------------- */
.lock-badge {
  position: absolute;
  /* 📌 プロが目視調整した枠の左下に引っ掛ける位置(-2px)は1ミリも動かさず完全維持 */
  bottom: -2px;            
  left: -2px;
  /* 📌 見やすく調整された20pxのサイズも完全維持 */
  width: 20px !important;  
  height: 20px !important;
  z-index: 10;
  
  /* ダークな丸背景にうっすらフチをつけて、どんなアイコンの上でも視認性抜群な設計を維持 */
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 3px;
  box-sizing: border-box;
  
  /* 💡 【軽量化】重いbox-shadowを低負荷な値に引き締め、メニュー全体のスクロールをさらにサクサクに */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}


/* ---------------------------------------------------
 🧪 一時テスト用：星とSVG以外を全部「枠線だけ」にして原因をあぶり出す。
コメントアウト中
   --------------------------------------------------

 .achievement-card * {
  outline: 1px solid red !important;
}  */





`;
document.head.appendChild(achievementStyle);



// ==========================================================================
// ⚙️ 🌟 [プロ最終最適化・分割版] ① 報酬設定 ＆ 爆速エフェクト制御
// ==========================================================================
const REWARD_CONFIG = Object.freeze({
  5: Object.freeze({
    baseClass: 'reward-medal-icon', 
    easy:   Object.freeze({ colorClass: 'medal-bronze', name: '銅メダル', grade: '9級', title: null }),
    medium: Object.freeze({ colorClass: 'medal-silver', name: '銀メダル', grade: '6級', title: null }),
    hard:   Object.freeze({ colorClass: 'medal-gold',   name: '金メダル', grade: '3級', title: null })
  }),
  10: Object.freeze({
    baseClass: 'reward-trophy-icon', 
    easy:   Object.freeze({ colorClass: 'trophy-bronze', name: '銅のトロフィー', grade: '8級', title: null }),
    medium: Object.freeze({ colorClass: 'trophy-silver', name: '銀のトロフィー', grade: '5級', title: null }),
    hard:   Object.freeze({ colorClass: 'trophy-gold',   name: '金のトロフィー', grade: '2級', title: null })
  }),
  20: Object.freeze({
    baseClass: 'reward-crown-icon', 
    easy:   Object.freeze({ colorClass: 'crown-bronze', name: '銅の王冠', grade: '7級', title: 'ブロンズマスター' }),
    medium: Object.freeze({ colorClass: 'crown-silver', name: '銀の王冠', grade: '4級', title: 'シルバーマスター' }),
    hard:   Object.freeze({ colorClass: 'crown-gold',   name: '金の王冠', grade: '1級', title: 'ゴールドマスター' })
  })
});

function checkAndShowReward(winCount, difficulty = 'easy') {
  if (winCount !== 5 && winCount !== 10 && winCount !== 20) return;

  const rewardGroup = REWARD_CONFIG[winCount];
  if (!rewardGroup) return; 

  const diffData = rewardGroup[difficulty] || rewardGroup.easy;
  if (!diffData) return; 

  const diffMap = { easy: 'よわい', medium: 'ふつう', hard: 'つよい' };
  const displayDiff = diffMap[difficulty] || 'よわい';

  const color = diffData.colorClass || '';
  const rankClass = color.indexOf('bronze') !== -1 ? 'rank-bronze' 
                  : color.indexOf('silver') !== -1 ? 'rank-silver' 
                  : 'rank-gold';

  closeRewardModal();

   if (typeof confetti === 'function') {
    const isCrown = winCount === 20;
    const isTrophy = winCount === 10;
    
    // 💥 あなたの一番お気に入りだった、最初の左右同時大爆発の枚数（200枚/140枚/80枚）を100%完全復活！
    const initialCount = isCrown ? 200 : (isTrophy ? 140 : 80);
    const intervalSpeed = isCrown ? 240 : (isTrophy ? 350 : 500);

    const defaultPalette = [
      '#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42',
      '#ffa62d', '#ff36ff', '#00ffcc', '#ff3366', '#33ccff', '#99ff33'
    ];
    const paletteLen = defaultPalette.length;

    // 💡 1. 【お掃除】もし前のゲームや古いループの計算が残っていたら、今すぐ全てを強制消去！
    if (window.confettiLoop) {
      clearInterval(window.confettiLoop);
      window.confettiLoop = null;
    }
    if (typeof confetti.reset === 'function') {
      confetti.reset(); // 👈 画面の裏に残っている見えない紙吹雪の計算をすべて完全消滅させます
    }

    // 💡 2. 【完全無風状態の確保】Reactの余韻が100%静止するのを待ってから着火
    setTimeout(function() {

      /* ==========================================================================
         🎉 👑 【完全リセット ＆ 左右同時ドカン大爆発 100%完全復活版】
         ========================================================================== */
      // 画面の重い計算が一度完全に「ゼロ」にリセットされた状態なので、
      // 左右から同時に大爆発（計400枚規模）を打ち上げても、スマホがカクつくことなく綺麗に弾けます！

      // 💥 左右同時にドカンと大爆発！（寿命50制限をかけて、出た後も一生軽くするお守り付き）
      confetti({ particleCount: initialCount, angle: 60, spread: 65, origin: { x: 0, y: 0.75 }, zIndex: 99999, scalar: 1.2, ticks: 50 });
      confetti({ particleCount: initialCount, angle: 120, spread: 65, origin: { x: 1, y: 0.75 }, zIndex: 99999, scalar: 1.2, ticks: 50 });

      // 3. 上からパラパラ降り続けるループ（寿命50制限で上からも確実に降らせます！）
      window.confettiLoop = setInterval(function() {
        const randomColor1 = defaultPalette[(Math.random() * paletteLen) | 0];
        const randomColor2 = defaultPalette[(Math.random() * paletteLen) | 0];
        const loopParticleCount = 1;

        confetti({ angle: 40,  spread: 60, startVelocity: 28, origin: { x: -0.05, y: -0.15 }, particleCount: loopParticleCount, gravity: 0.9, ticks: 50, colors: [randomColor1], zIndex: 99999, scalar: 1.1 });
        confetti({ angle: 90,  spread: 90, startVelocity: 16, origin: { x: 0.5,   y: -0.15 }, particleCount: loopParticleCount, gravity: 0.85, ticks: 50, colors: [randomColor2], zIndex: 99999, scalar: isCrown ? 1.35 : 1.15 });
        confetti({ angle: 140, spread: 60, startVelocity: 28, origin: { x: 1.05,  y: -0.15 }, particleCount: loopParticleCount, gravity: 0.9, ticks: 50, colors: [randomColor1], zIndex: 99999, scalar: 1.1 });
      }, intervalSpeed);

    }, 200); // 💡 Reactが完全にお片付けを終えて静止する、確実な200ミリ秒（0.2秒）のディレイ
  }



    // ==========================================================================
  // ② ⭕ [プロ最終最適化・エラー絶対回避版] HTML組み立てのフラット事前計算
  // ==========================================================================
  
  // 💡 改善：テンプレートリテラル内のネストを全廃し、事前にフラットな文字列として組み立てる
  // これによりブラウザのBabelのパースバグを100%予防し、最速でDOMへ流し込めるようになります。
  var gradeBadgeHtml = '';
  var gradeTextHtml = '';
  if (diffData.grade) {
    gradeBadgeHtml = '<span class="badge-grade ' + rankClass + '">' + diffData.grade + '</span>';
    gradeTextHtml = '<p style="font-size: 13px; color: #bae6fd; margin: 10px 0 0 0; font-weight: 500; line-height: 1.5; white-space: normal;">「' + diffData.grade + '」を取得しました！</p>';
  }

  var titleBadgeHtml = '';
  var titleTextHtml = '';
  if (diffData.title) {
    titleBadgeHtml = '<div class="badge-title-container"><span class="badge-title ' + rankClass + '">👑 ' + diffData.title + '</span></div>';
    titleTextHtml = '<p style="font-size: 12px; color: #ffd700; margin: 8px 0 0 0; font-weight: bold; line-height: 1.5; white-space: normal;">称号「' + diffData.title + '」が<br />授与されました！</p>';
  }

  const baseClassStr = rewardGroup.baseClass || '';
  const nameStr = diffData.name || '';

  // 文字列結合（+）をベースにHTMLを最速・確実に組み立て
  const modalHtml = 
    '<div id="rewardModalOverlay" class="reward-modal-overlay">' +
      '<div class="reward-modal-box">' +
        '<div style="color: #facc15; font-size: 12px; font-weight: bold;">★ ACHIEVEMENTS UNLOCKED ★</div>' +
        
        '<div class="reward-medal-container">' +
          '<span class="' + baseClassStr + ' ' + color + ' sparkle-popup">' +
            '<i class="sparkle-star star-1">✦</i>' +
            '<i class="sparkle-star star-2">✦</i>' +
            '<i class="sparkle-star star-3">✦</i>' +
            '<i class="sparkle-star star-4">✦</i>' +
          '</span>' +
          gradeBadgeHtml +
        '</div>' +
        
        titleBadgeHtml +
        
        '<p style="margin: 1px 0 -15px 0; font-size: 12px; font-weight: bold; color: #cbd5e1;">【 難易度：' + displayDiff + ' 】</p>' +
        '<h2 style="margin: 25px 0 15px 0; font-size: 22px;">' + winCount + '勝達成！</h2>' +
        '<p style="font-size: 12px; color: #ccc; margin: 0;">' + nameStr + 'を獲得しました！</p>' +
        gradeTextHtml +
        titleTextHtml +
        
        '<button class="reward-close-btn" onclick="closeRewardModal()" style="margin: 30px 0 20px 0;">受け取る！</button>' +
      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// ==========================================================================
// 🧹 🌟 ポップアップを閉じる（100%安全お掃除版）
// ==========================================================================
function closeRewardModal() {
  if (window.confettiLoop) {
    clearInterval(window.confettiLoop);
    window.confettiLoop = null;
  }

  if (typeof confetti === 'function' && typeof confetti.reset === 'function') {
    confetti.reset();
  }

  const modal = document.getElementById('rewardModalOverlay');
  if (modal) {
    modal.remove();
  }
}

// グローバルスコープへの安全な露出
window.checkAndShowReward = checkAndShowReward;
window.closeRewardModal = closeRewardModal;




// ==========================================================================
// 🏆 [プロ最終最適化・最軽量完全版] 獲得実績コレクション
// ==========================================================================

// 💡 1. 静的データを関数の「外側」へ追い出し、毎回のメモリ生成コストを完全ゼロへ！
const COLLECTION_ITEMS_DATA = Object.freeze([
  { id: 'm_easy',   streak: 5,  diff: 'easy',   diffLabel: 'よわい',   baseClass: 'reward-medal-icon',   colorClass: 'medal-bronze',  grade: '9級', title: null },
  { id: 't_easy',   streak: 10, diff: 'easy',   diffLabel: 'よわい',   baseClass: 'reward-trophy-icon',  colorClass: 'trophy-bronze', grade: '8級', title: null },
  { id: 'c_easy',   streak: 20, diff: 'easy',   diffLabel: 'よわい',   baseClass: 'reward-crown-icon',   colorClass: 'crown-bronze',  grade: '7級', title: 'ブロンズマスター' },

  { id: 'm_medium', streak: 5,  diff: 'medium', diffLabel: 'ふつう',   baseClass: 'reward-medal-icon',   colorClass: 'medal-silver',  grade: '6級', title: null },
  { id: 't_medium', streak: 10, diff: 'medium', diffLabel: 'ふつう',   baseClass: 'reward-trophy-icon',  colorClass: 'trophy-silver', grade: '5級', title: null },
  { id: 'c_medium', streak: 20, diff: 'medium', diffLabel: 'ふつう',   baseClass: 'reward-crown-icon',   colorClass: 'crown-silver',  grade: '4級', title: 'シルバーマスター' },

  { id: 'm_hard',   streak: 5,  diff: 'hard',   diffLabel: 'つよい',   baseClass: 'reward-medal-icon',   colorClass: 'medal-gold',    grade: '3級', title: null },
  { id: 't_hard',   streak: 10, diff: 'hard',   diffLabel: 'つよい',   baseClass: 'reward-trophy-icon',  colorClass: 'trophy-gold',   grade: '2級', title: null },
  { id: 'c_hard',   streak: 20, diff: 'hard',   diffLabel: 'つよい',   baseClass: 'reward-crown-icon',   colorClass: 'crown-gold',    grade: '1級', title: 'ゴールドマスター' }
]);

// 💡 2. 全体を React.memo で包み、実績データが本当に変わった時以外は再計算コストをシャットアウト
window.AchievementCollection = React.memo(function AchievementCollection(props) {
  var streaks = (props && props.streaks) ? props.streaks : {};
  var e = React.createElement;

  var cards = COLLECTION_ITEMS_DATA.map(function(item) {
    var count = Number(streaks[item.diff]) || 0;
    var isUnlocked = count >= item.streak;

    // ① マスター称号
    var topTitleElem;
    if (item.title) {
      topTitleElem = e('span', { 
        className: 'master-top-ribbon ' + item.diff + (isUnlocked ? '' : ' locked') 
      }, item.title);
    } else {
      topTitleElem = e('div', { className: 'master-top-spacer' }, ''); 
    }

    // ② アイコン領域
    var iconClass = 'reward-icon ' + item.baseClass + ' ' + item.colorClass;
    var iconChild = e('span', { className: iconClass });
    var wrapperClass = 'achievement-icon-wrapper' + (isUnlocked ? ' sparkle-frame' : '');
    var iconWrapper;

    if (isUnlocked) {
      var star1 = e('i', { className: 'sparkle-star star-1' }, '✦');
      var star2 = e('i', { className: 'sparkle-star star-2' }, '✦');
      var star3 = e('i', { className: 'sparkle-star star-3' }, '✦');
      var star4 = e('i', { className: 'sparkle-star star-4' }, '✦');
      iconWrapper = e('div', { className: wrapperClass }, iconChild, star1, star2, star3, star4);
    } else {
      var lockBadge = e('svg', {
        className: 'lock-badge',
        viewBox: '0 0 24 24',
        width: '18',
        height: '18',
        fill: 'none',
        stroke: '#ffffff',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      },
        e('rect', { x: '3', y: '10', width: '18', height: '12', rx: '2', ry: '2' }),
        e('path', { d: 'M7 10V6a5 5 0 0 1 10 0v4' }),
        e('circle', { cx: '12', cy: '15', r: '1.5', fill: '#ffffff', stroke: 'none' }),
        e('path', { d: 'M12 16.5v2', strokeWidth: '1.8' })
      );
      iconWrapper = e('div', { className: wrapperClass }, iconChild, lockBadge);
    }

    // ③ 下のテキスト情報
    var streakElem = e('div', { className: 'streak-label' }, item.diffLabel + ' ' + item.streak + '勝‼');
    var gradeElem = e('span', { className: 'grade-badge grade-' + item.diff }, item.grade);
    var infoArea = e('div', { className: 'achievement-info' }, streakElem, gradeElem);   

    // ④ カードの組み立て
    return e('div', {
      key: item.id,
      className: 'achievement-card ' + (isUnlocked ? 'unlocked' : 'locked')
    }, topTitleElem, iconWrapper, infoArea);
  });

  // ⑤ 全体パネルの組み立て
  return e('div', { className: 'achievement-panel' },
    e('h3', { className: 'achievement-title' }, '🏆 獲得実績コレクション'),
    e('div', { className: 'achievement-scroll-list' }, cards)
  );
}, function areEqual(prevProps, nextProps) {
  // 💡 【超高速化】連勝実績のオブジェクトの中身をプロファイルチェック
  // 実績の数字（easy, medium, hard）が一切変わっていないなら、このコンポーネントを完全に静止（フリーズ）させます。
  var p = prevProps.streaks || {};
  var n = nextProps.streaks || {};
  return p.easy === n.easy && p.medium === n.medium && p.hard === n.hard;
});
