/* ===================================================
   🏆 連勝＆実績システム（CSS + HTML + JS 一体型パック）
=================================================== */

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
  box-shadow: 0 0 30px rgba(250, 204, 21, 0.4);
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
  filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5));
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
  width: 115px;  /* 👈 トロフィーのサイズはここで一括変更できます */
  height: 115px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5));
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
    width: 120px;
    height: 120px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: middle;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
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




/* ===================================================
   🌟 ポップアップ用の星設定（小ぶり化・発光調整済み）
   =================================================== */
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
  
  /* 💡 発光の広がりを抑えて、光が太く膨らまないように調整 */
  text-shadow: 
    0 0 6px #ffffff,
    0 0 12px #fef08a,
    0 0 18px #eab308;

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
/* ✨ 王冠本体の輝き */
@keyframes gentleGlow {
  0% {
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5)) brightness(1);
  }
  100% {
    filter: drop-shadow(0 4px 15px rgba(234, 179, 8, 0.5)) brightness(1.08);
  }
}

/* 🌟 その場で小ぶりにポンッと点滅するアニメーション */
@keyframes popInPlace {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  20% {
    opacity: 1;
    transform: scale(1.1); /* 1.4倍 ➔ 1.1倍に抑えて膨らみを抑制 */
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


 
 /* ボタン */
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
  }

  /* アニメーション */
  @keyframes rewardPopUp {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

 

  /* 難易度ボタンの横につくミニアイコン用 */
  .diff-icon {
    margin-left: 6px;
    font-size: 1.1em;
  }



/* ==============================================
   アイコン全体を中央寄せするコンテナ
   ============================================== */
.reward-medal-container {
  position: relative;
  display: block;
  text-align: center; /* 💡 アイコンを中央に寄せる */
  margin: 15px 0;
  padding: 10px;
}

/* ==============================================
   1. 級バッジ（丸型）＆ 右下配置（つやつや＆きらーん実装）
   ============================================== */

/* 💡 アイコン自体をバッジの基準点にする設定 */
.sparkle-frame {
  position: relative;
  display: inline-block; /* アイコンの大きさにピッタリ合わせる */
  z-index: 20;
}

.badge-grade {
  position: absolute;
  
  /* 位置とサイズは完全維持 */
  bottom: 40px;        
  right: -180px;        
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  flex-shrink: 0;
  box-sizing: border-box;
  
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
  z-index: 30; /* バッジを前面に出す */

  /* 💡 追加1：光線が飛び出さないように＆光のベース */
  overflow: hidden;
  
  /* 💡 追加2：ぷっくり立体感を生む内部ハイライトと影 */
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.6),
    inset 0 2px 3px rgba(255, 255, 255, 0.9),  /* 上部の白い光の反射 */
    inset 0 -2px 3px rgba(0, 0, 0, 0.3);       /* 下部の影 */
}

/* 💡 追加3：上半分のレンズっぽい「つや」をつくる擬似要素 */
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

/* 💡 追加4：光がスッと走り抜ける「きらーん」アニメーション用 */
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
  animation: shineGleam 5s infinite ease-in-out;
  pointer-events: none;
  z-index: 2;
}

/* 文字自体をハイライトより手前に表示 */
.badge-grade span, 
.badge-grade {
  position: relative;
}


/* ===================================================
   🎉 ポップアップ内限定：級バッジをアイコンの右上に配置
   =================================================== */

/* 1. 全体枠をアイコンのサイズにピッタリ合わせる */
.reward-modal-overlay .reward-medal-container {
  position: relative !important;
  display: inline-block !important; /* 余計な横幅を無くしてアイコンサイズにする */
}

/* 2. 級バッジをアイコンの右上へ配置 */
.reward-modal-overlay .badge-grade {
  position: absolute !important;
  
  /* 🎯 位置をアイコンの右上（上と右）へ指定 */
  top: 80px !important;     /* 💡 マイナスを大きくすると「もっと上」へ */
  right: -20px !important;   /* 💡 マイナスを大きくすると「もっと右」へ */
  bottom: auto !important;
  left: auto !important;
}





/* 2. 【マスター称号】上寄せ調整＆きらーん追加 */
.badge-title-container {
  margin-top: -25px; /* 💡 -50px ➔ -25px にして位置を下に下げました */
  position: relative;
  z-index: 1;        /* 💡 10 ➔ 1 にして、星のキラキラ（z-index: 10）より下に配置 */
  text-align: center;
}

.badge-title {
  position: relative; /* 💡 光線アニメーションの基準点 */
  overflow: hidden;   /* 💡 はみ出た光をカット */
  display: inline-block;
  padding: 2px 18px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.5px;
  clip-path: polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%, 8% 50%);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  white-space: nowrap;
}

/* 💡 追加：マスター称号リボンを走り抜ける「きらーん」光線 */
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
  /* 💡 丸バッジから0.8秒遅れて光る設定（3.5s周期⇒変更した） */
  animation: shineGleam 5s infinite ease-in-out 1s;
  pointer-events: none;
  z-index: 2;
}

/* ==============================================
   ✨ なめらかツヤツヤグラデーション（金属感アップ版）
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
   🎬 「きらーん」アニメーション定義
   --------------------------------------------------- */
/* 3. ✨ 光の動き（無駄な助走を削って、ずーっと見えるように修正！） */
@keyframes shineGleam {
  0% {
    /* 💡 見え始めるギリギリの位置からスタート */
    left: -60%; 
  }
  40% { 
    /* 💡 8秒のうち6秒（75%）もかけて、バッジの上をゆっくり「すぅーーーーっ」と移動 */
    left: 120%; 
  }
  100% {
    /* 残りの2秒はお休み */
    left: 120%; 
  }
}


/* ===================================================
   🏆 メニュー画面用：獲得実績コレクション（完成・整理版）
   =================================================== */

/* 📦 全体コンテナ */
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

/* 📜 3x3 グリッドエリア */
.achievement-scroll-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 8px;
  padding: 8px 4px;
  overflow: visible !important;
}


/* ===================================================
   🎴 カード本体 & アニメーション状態
   =================================================== */

.achievement-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: transform 0.2s ease;
}

.achievement-card:hover {
  transform: translateY(-2px);
}

/* 未解放（🔒）の状態 */
.achievement-card.locked {
  opacity: 0.25;
  filter: grayscale(1);
}

/* 獲得済み（✨）の状態 */
.achievement-card.unlocked {
  opacity: 1;
}



/* ===================================================
   👑 王冠の頭の上に載るマスターリボン（位置完全復元版）
   =================================================== */

.master-top-ribbon {
  font-size: 8px;
  font-weight: 700;
  padding: 2px 6px;
  color: #fff;
  white-space: nowrap;
  line-height: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);

  position: relative;
  z-index: 10;                     /* 👈 10に上げて確実に前面へ出す */
  
  /* 💡★ ここです！リボンを上に持ち上げて王冠の頭に被せる */
  top: -14px;                      /* 👈 以前よりさらに上に引っ張り上げる */
  margin-bottom: -12px;            /* 👈 下の要素（王冠）を押し下げないように打ち消す */

  /* 💡 ポップアップと同じV字リボン形状 */
  clip-path: polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%, 8% 50%);
}

/* ---------------------------------------------------
   ✨ メタルグラデーション（変更なし）
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
  box-shadow: none;
  text-shadow: none;
}




/*===================================================
   🎖️ アイコン領域 & サイズ調整
   =================================================== */

.achievement-icon-wrapper {
  width: 44px;
  height: 44px;         /* 高さを固定して全カードの下端を一直線に揃える */
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
  transform: scale(1.1);
  transform-origin: center center;
}

/* 🏆 トロフィー（全色） */
.achievement-panel [class*="trophy-"] {
  transform: scale(1.1);
  transform-origin: center center;
}

/* 🏅 メダル（全色） */
.achievement-panel [class*="medal-"] {
  transform: scale(0.8) !important;
  transform-origin: center center;
}


/* ===================================================
   ℹ️ テキスト情報（アイコン下のラベル群）
   =================================================== */

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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  display: inline-block;
  margin-bottom: 30px;  /* 👈 級の下側（カード底面）への余白 */
}

/* 級バッジの色バリエーション */
.grade-badge.grade-easy   { background: #d97706; color: #fef3c7; }
.grade-badge.grade-medium { background: #d97706; color: #fef3c7; }
.grade-badge.grade-hard   { background: #d97706; color: #fef3c7; }


/* ===================================================
   ✨ キラキラ星（最前面ポップ演出：44px外枠基準）
   =================================================== */

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

  /* ★光の広がり（シャドウ）を小さく控えめに調整 */
  text-shadow: 
    0 0 3px #ffffff,
    0 0 6px #fef08a,
    0 0 10px #eab308;
}

/* 📍 星の位置・サイズ・ゆったりアニメーション（秒数を長めに変更） */
.sparkle-frame .star-1 {
  top: -2px;
  left: -2px;
  font-size: 11px;       /* 👈 少し小さく (旧: 16px) */
  animation: popInPlace 4.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; /* 👈 ゆっくり (旧: 2.8s) */
}

.sparkle-frame .star-2 {
  top: 0px;
  right: -2px;
  font-size: 8px;       /* 👈 少し小さく (旧: 12px) */
  animation: popInPlace 5.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.2s infinite; /* 👈 ゆっくり (旧: 3.6s) */
}

.sparkle-frame .star-3 {
  bottom: 0px;
  left: -2px;
  font-size: 9px;       /* 👈 少し小さく (旧: 13px) */
  animation: popInPlace 6.0s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.5s infinite; /* 👈 ゆっくり (旧: 4.2s) */
}

.sparkle-frame .star-4 {
  bottom: -2px;
  right: -2px;
  font-size: 10px;       /* 👈 少し小さく (旧: 15px) */
  animation: popInPlace 5.0s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s infinite; /* 👈 ゆっくり (旧: 3.2s) */
}

/* 🎬 アニメーション定義（出現〜消えるまでの変化も優しく） */
@keyframes popInPlace {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  20% {
    opacity: 0.9;        /* 眩しすぎないよう不透明度をほんのり抑えめに */
    transform: scale(1.0);/* 大きくなりすぎないよう 1.0 に変更 */
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




/* 🧪 一時テスト用：星とSVG以外を全部「枠線だけ」にして原因をあぶり出す

 .achievement-card * {
  outline: 1px solid red !important;
}



/* ---------------------------------------------------
   🚫 実績パネル側はスッキリ（影・後光をカット）
   --------------------------------------------------- */
.achievement-panel .achievement-icon-wrapper,
.achievement-panel .reward-icon,
.achievement-panel .sparkle-frame {
  filter: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
}

.achievement-panel .sparkle-star {
  text-shadow: none !important;
}


/* ---------------------------------------------------
   🌟 ポップアップ（✨後光・発光を強力に復活！）
   --------------------------------------------------- */
/* 1. アイコン自体の輝く後光（ドロップシャドウ） */
.reward-modal-overlay .sparkle-popup {
  filter: drop-shadow(0 0 12px rgba(250, 204, 21, 0.8)) 
          drop-shadow(0 0 24px rgba(234, 179, 8, 0.5)) !important;
}

/* 2. 星（✦）のぼんやり黄金発光（テキシャドウ） */
.reward-modal-overlay .sparkle-popup .sparkle-star {
  text-shadow: 
    0 0 6px #ffffff,
    0 0 12px #fef08a,
    0 0 18px #eab308 !important;
}

/* 🔒 ロック時の鍵バッジ（少し大きく＆リアルに） */
.lock-badge {
  position: absolute;
  bottom: -2px;            /* 👈 枠の左下に少しだけ引っ掛ける位置 */
  left: -2px;
  width: 20px !important;  /* 👈 もうちょい大きく見やすく調整 */
  height: 20px !important;
  z-index: 10;
  
  /* ダークな丸背景にうっすらフチをつけて、どんなアイコンの上でも視認性抜群に */
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 3px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}












`;
document.head.appendChild(achievementStyle);






// ---------------------------------------------------
// ⚙️ 報酬設定データ（5勝=メダル / 10勝=トロフィー / 20勝=王冠）
// ---------------------------------------------------
const REWARD_CONFIG = {
  5: {
    baseClass: 'reward-medal-icon', // 🏅 メダル用
   easy:   { colorClass: 'medal-bronze', name: '銅メダル', grade: '9級', title: null },
    medium: { colorClass: 'medal-silver', name: '銀メダル', grade: '6級', title: null },
    hard:   { colorClass: 'medal-gold',   name: '金メダル', grade: '3級', title: null }
  },
 
  10: {
    baseClass: 'reward-trophy-icon', // 🏆 トロフィー用
   easy:   { colorClass: 'trophy-bronze', name: '銅のトロフィー', grade: '8級', title: null },
    medium: { colorClass: 'trophy-silver', name: '銀のトロフィー', grade: '5級', title: null },
    hard:   { colorClass: 'trophy-gold',   name: '金のトロフィー', grade: '2級', title: null }
  },

 20: {
    baseClass: 'reward-crown-icon', // 👑 王冠用
    easy:   { colorClass: 'crown-bronze', name: '銅の王冠', grade: '7級', title: 'ブロンズマスター' },
    medium: { colorClass: 'crown-silver', name: '銀の王冠', grade: '4級', title: 'シルバーマスター' },
    hard:   { colorClass: 'crown-gold',   name: '金の王冠', grade: '1級', title: 'ゴールドマスター' }
  }

};




// ---------------------------------------------------
// 3. 📦 本体の難易度ボタン横にメダルアイコンを自動で差し込む処理
// ---------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // id="btn-easy", "btn-medium", "btn-hard" のボタンを探してアイコンをつける
  const btnEasy   = document.getElementById('btn-easy');
  const btnMedium = document.getElementById('btn-medium');
  const btnHard   = document.getElementById('btn-hard');

  if (btnEasy)   btnEasy.innerHTML   += ` <span class="diff-icon">${DIFFICULTY_CONFIG.easy.icon}</span>`;
  if (btnMedium) btnMedium.innerHTML += ` <span class="diff-icon">${DIFFICULTY_CONFIG.medium.icon}</span>`;
  if (btnHard)   btnHard.innerHTML   += ` <span class="diff-icon">${DIFFICULTY_CONFIG.hard.icon}</span>`;
});


// ---------------------------------------------------
// 4. 🎯 勝利時に呼ぶメイン関数（5勝・10勝・20勝判定＆ポップアップ表示）
// ---------------------------------------------------
function checkAndShowReward(winCount, difficulty = 'easy') {
  
  // 5勝・10勝・20勝の時だけ発動
  if (winCount !== 5 && winCount !== 10 && winCount !== 20) return;

  // 設定を取得
  const rewardGroup = REWARD_CONFIG[winCount];
  const diffData = rewardGroup[difficulty] || rewardGroup.easy;

  const iconHtml = `<div class="${rewardGroup.baseClass} ${diffData.colorClass}"></div>`;

  closeRewardModal();

  // ① 最前面でクラッカー🎉を発射＆連続発射ループを開始
  if (typeof confetti === 'function') {
    
    // 💡 勝利数に応じた「初動の量」と「ループの間隔(ms)」の設定
    const initialCount = winCount === 20 ? 200 : (winCount === 10 ? 100 : 50);
    const intervalSpeed = winCount === 20 ? 180 : (winCount === 10 ? 300 : 450);

    const defaultPalette = [
      '#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42',
      '#ffa62d', '#ff36ff', '#00ffcc', '#ff3366', '#33ccff', '#99ff33'
    ];

    const getRandomColor = () => [defaultPalette[Math.floor(Math.random() * defaultPalette.length)]];

    // 1. 最初の下からのドカン！🎉（左＆右）
    confetti({ particleCount: initialCount, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, zIndex: 99999 });
    confetti({ particleCount: initialCount, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, zIndex: 99999 });

    // 2. 降り続けるループ✨（発射パラメータをまとめてスッキリ化）
    const launchPoints = [
      { angle: 35,  spread: 55, startVelocity: 30, origin: { x: -0.05, y: -0.15 } }, // 左上
      { angle: 90,  spread: 80, startVelocity: 15, origin: { x: 0.5,   y: -0.15 } }, // 中央上
      { angle: 145, spread: 55, startVelocity: 30, origin: { x: 1.05,  y: -0.15 } }  // 右上
    ];

    if (window.confettiLoop) clearInterval(window.confettiLoop);

    window.confettiLoop = setInterval(() => {
      // 3方向からそれぞれ2発ずつ（計6発）別々の色で飛ばす
      launchPoints.forEach(pt => {
        for (let i = 0; i < 2; i++) {
          confetti({
            ...pt,
            particleCount: 1,
            gravity: 0.82,
            ticks: 150,
            colors: getRandomColor(),
            zIndex: 99999,
            scalar: 1.15
          });
        }
      });
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
        ${diffData.title ? `<div class="badge-title-container"><span class="badge-title ${rankClass}">👑 ${diffData.title}</span></div>` : ''}




        <h2 style="margin: 25px 0 15px 0; font-size: 22px;">${winCount}勝達成！</h2>
    
        <!-- 1. メダル・トロフィー・王冠名 -->
        <p style="font-size: 12px; color: #ccc; margin: 0;">${diffData.name}を獲得しました！</p>
        
      <!-- 2. 級の授与（grade が存在する場合のみ表示） -->
        ${diffData.grade ? `<p style="font-size: 13px; color: #bae6fd; margin: 10px 0 0 0; font-weight: 500; line-height: 1.5; white-space: normal;">「${diffData.grade}」を取得しました！</p>` : ''}
        
        <!-- 3. マスター称号の獲得（title が存在する場合のみ表示） -->
        ${diffData.title ? `<p style="font-size: 12px; color: #ffd700; margin: 8px 0 0 0; font-weight: bold; line-height: 1.5; white-space: normal;">称号「${diffData.title}」が授与されました！</p>` : ''}

        <!-- 💡 ボタン（上下マージンを上20px・下10pxに拡張） -->
        <button class="reward-close-btn" onclick="closeRewardModal()" style="margin: 40px 0 20px 0;">受け取る！</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}



// 🎁 「受け取る！」ボタンを押した時
function closeRewardModal() {
  // ① これから出る紙吹雪のタイマーをストップ！
  if (window.confettiLoop) {
    clearInterval(window.confettiLoop);
    window.confettiLoop = null;
  }

  // ② 【追加】今画面で舞っている紙吹雪を一瞬でピタッと完全消去！✨
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
window.AchievementCollection = function(props) {
  var streaks = (props && props.streaks) ? props.streaks : {};
  var e = React.createElement;

 // ⚙️ 9個のコレクション実績リスト定義（REWARD_CONFIGと完全連動）
const COLLECTION_ITEMS = [

  // 🥉 1段目：銅（Easy）グループ
  { id: 'm_easy',   streak: 5,  diff: 'easy',   diffLabel: 'よわい',   baseClass: 'reward-medal-icon',   colorClass: 'medal-bronze',  grade: '9級', title: null },
  { id: 't_easy',   streak: 10, diff: 'easy',   diffLabel: 'よわい',   baseClass: 'reward-trophy-icon',  colorClass: 'trophy-bronze', grade: '8級', title: null },
  { id: 'c_easy',   streak: 20, diff: 'easy',   diffLabel: 'よわい',   baseClass: 'reward-crown-icon',   colorClass: 'crown-bronze',  grade: '7級', title: 'ブロンズマスター' },

  // 🥈 2段目：銀（Normal）グループ
  { id: 'm_medium', streak: 5,  diff: 'medium', diffLabel: 'ふつう', baseClass: 'reward-medal-icon',   colorClass: 'medal-silver',  grade: '6級', title: null },
  { id: 't_medium', streak: 10, diff: 'medium', diffLabel: 'ふつう', baseClass: 'reward-trophy-icon',  colorClass: 'trophy-silver', grade: '5級', title: null },
  { id: 'c_medium', streak: 20, diff: 'medium', diffLabel: 'ふつう', baseClass: 'reward-crown-icon',   colorClass: 'crown-silver',  grade: '4級', title: 'シルバーマスター' },

  // 🥇 3段目：金（Hard）グループ
  { id: 'm_hard',   streak: 5,  diff: 'hard',   diffLabel: 'つよい',   baseClass: 'reward-medal-icon',   colorClass: 'medal-gold',    grade: '3級', title: null },
  { id: 't_hard',   streak: 10, diff: 'hard',   diffLabel: 'つよい',   baseClass: 'reward-trophy-icon',  colorClass: 'trophy-gold',   grade: '2級', title: null },
  { id: 'c_hard',   streak: 20, diff: 'hard',   diffLabel: 'つよい',   baseClass: 'reward-crown-icon',   colorClass: 'crown-gold',    grade: '1級', title: 'ゴールドマスター' },

];


  // 9個のカード要素を1つずつ安全に生成
var cards = COLLECTION_ITEMS.map(function(item) {
  var count = Number(streaks[item.diff]) || 0;
  var isUnlocked = count >= item.streak;

 
  // ★王冠アイコンの「頭の上」に載せるマスター称号
  // （メダル・トロフィーの時は null ではなく空要素にして Error #130 を完全に防ぐ！）
  var topTitleElem;
  if (item.title) {
    topTitleElem = e('span', { 
      className: 'master-top-ribbon ' + item.diff + (isUnlocked ? '' : ' locked') 
    }, item.title);
  } else {
    topTitleElem = e('div', { className: 'master-top-spacer' }, ''); // 👈 これでエラー回避＆高さ揃え！
  }

// ② アイコン（星の配置基準を44pxの外枠へ固定）
  var iconClass = 'reward-icon ' + item.baseClass + ' ' + item.colorClass;
  var iconChild = e('span', { className: iconClass });

  var wrapperClass = 'achievement-icon-wrapper' + (isUnlocked ? ' sparkle-frame' : '');
  var iconWrapper;

  if (isUnlocked) {
    // 獲得時は星4つを外枠（44pxエリア）の直下に配置
    var star1 = e('i', { className: 'sparkle-star star-1' }, '✦');
    var star2 = e('i', { className: 'sparkle-star star-2' }, '✦');
    var star3 = e('i', { className: 'sparkle-star star-3' }, '✦');
    var star4 = e('i', { className: 'sparkle-star star-4' }, '✦');
    iconWrapper = e('div', { className: wrapperClass }, iconChild, star1, star2, star3, star4);
  } else {
    // 🔒 ロック時はアイコンの左下にリアルな白い鍵マークを配置
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
      // 鍵の本体（胴体）
      e('rect', { x: '3', y: '10', width: '18', height: '12', rx: '2', ry: '2' }),
      // 上のツル（アーク）
      e('path', { d: 'M7 10V6a5 5 0 0 1 10 0v4' }),
      // 🔑 鍵穴（円 + 下に伸びる軸）
      e('circle', { cx: '12', cy: '15', r: '1.5', fill: '#ffffff', stroke: 'none' }),
      e('path', { d: 'M12 16.5v2', strokeWidth: '1.8' })
    );
    iconWrapper = e('div', { className: wrapperClass }, iconChild, lockBadge);
  }



  // ③ 下のテキスト情報（1行目: Easy 5勝 / 2行目: 9級）
  var streakElem = e('div', { className: 'streak-label' }, item.diffLabel + ' ' + item.streak + '勝‼');
  var gradeElem = e('span', { className: 'grade-badge grade-' + item.diff }, item.grade);

  var infoArea = e('div', { className: 'achievement-info' }, streakElem, gradeElem);

  // ④ カードの組み立て（順番：トップ称号 ➔ アイコン ➔ 下テキスト（ホバー時））
  return e('div', {
    key: item.id,
    className: 'achievement-card ' + (isUnlocked ? 'unlocked' : 'locked'),
    title: item.diffLabel + ' ' + item.streak + '勝達成 (' + item.grade + ')'
  },  topTitleElem, iconWrapper, infoArea);
});

  // ⑤ 全体パネルの組み立て
  return e('div', { className: 'achievement-panel' },
    e('h3', { className: 'achievement-title' }, '🏆 獲得実績コレクション'),
    e('div', { className: 'achievement-scroll-list' }, cards)
  );
};
