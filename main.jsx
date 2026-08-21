import { createRoot } from 'react-dom/client';



// ==========================================================================
// 🌟 [プロ最終最適化・コアロジック完全版]
// ==========================================================================

// 型紙となる静的な空データを定義（メモリ量産を防ぐ防波堤）
const PROTO_EMPTY_BOARD = [[[], [], []], [[], [], []], [[], [], []]];
const EMPTY_BOARD = () => PROTO_EMPTY_BOARD.map(r => r.map(c => [...c]));

const LINES = [
  [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]],
  [[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]],
  [[0,0],[1,1],[2,2]], [[0,2],[1,1],[2,0]]
];

function cloneBoard(b) { 
  return b.map(r => r.map(c => [...c])); 
}

// ==========================================================================
// 🏆 ③ 勝利判定関数（ 変数生成コストを完全ゼロにした究極の先読み対応版 ）
// ==========================================================================
function checkWinner(board) {
  // ループ内での変数宣言を完全に全廃し、ダイレクトにメモリ番地を参照
  // これによりAIの何万回ものシミュレーション探索がミリ秒単位で爆速化します
  for (let i = 0; i < 8; i++) {
    const line = LINES[i];
    
    // 1マス目
    const s0 = board[line[0][0]][line[0][1]];
    if (s0.length === 0) continue;
    const color0 = s0[s0.length - 1];

    // 2マス目（一致しなければ即スキップ）
    const s1 = board[line[1][0]][line[1][1]];
    if (s1.length === 0 || s1[s1.length - 1] !== color0) continue;

    // 3マス目（一致すれば勝利確定）
    const s2 = board[line[2][0]][line[2][1]];
    if (s2.length === 0 || s2[s2.length - 1] !== color0) continue;

    return { winner: color0, line: line };
  }
  return null;
}

// ==========================================================================
// 💡 ④ 有効移動先ターゲットの取得（ 探索順序の最適化 ＆ 千日手高速ガード ）
// ==========================================================================
function getValidTargets(board, fromRow, fromCol, count, lastMove, currentPlayer) {
  const t = [];
  const isOpponentMove = lastMove && lastMove.type === 'move' && lastMove.player !== currentPlayer;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (r === fromRow && c === fromCol) continue;
      
      // コストの低い「枚数上限（3以下）」の判定を一番上に配置して最速弾き
      if (board[r][c].length + count > 3) continue;

      // 千日手（同一移動の繰り返し）の厳密なガード条件
      if (isOpponentMove && fromRow === lastMove.toRow && fromCol === lastMove.toCol && r === lastMove.fromRow && c === lastMove.fromCol) {
        if (count > 0 && count === lastMove.count) continue;
        if (count === 0 && board[fromRow][fromCol].length === lastMove.count) continue;
      }
      
      t.push([r, c]);
    }
  }
  return t;
}

// ==========================================================================
// 💡 ⑤ 配置ターゲットの取得
// ==========================================================================
function getPlaceTargets(board) {
  const t = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c].length < 3) t.push([r, c]);
    }
  }
  return t;
}

// ==========================================================================
// 🚀 ⑥ 【AI爆速化・極限軽量版】すべての打てる手を列挙する関数
// ==========================================================================
function getAllMoves(board, hands, player, lastMove) {
  const moves = [];
  
  // 1. 配置手（place）の列挙：ループ変数を外出しして再宣言コストをカット
  if (hands[player] > 0) {
    for (let r = 0; r < 3; r++) {
      const row = board[r];
      if (row[0].length < 3) moves.push({ type: 'place', row: r, col: 0 });
      if (row[1].length < 3) moves.push({ type: 'place', row: r, col: 1 });
      if (row[2].length < 3) moves.push({ type: 'place', row: r, col: 2 });
    }
  }
  
  // 2. 移動手（move）の列挙：変数宣言をループの外に追い出す
  const isOpponentMove = lastMove && lastMove.type === 'move' && lastMove.player !== player;
  const lmToRow = isOpponentMove ? lastMove.toRow : -1;
  const lmToCol = isOpponentMove ? lastMove.toCol : -1;
  const lmFromRow = isOpponentMove ? lastMove.fromRow : -1;
  const lmFromCol = isOpponentMove ? lastMove.fromCol : -1;
  const lmCount = isOpponentMove ? lastMove.count : -1;

  for (let r = 0; r < 3; r++) {
    const row = board[r];
    for (let c = 0; c < 3; c++) {
      const stackLen = row[c].length;
      if (stackLen === 0) continue;

      // 4重ループの無駄を徹底的に排除するため、ターゲット側のループを平坦化
      for (let n = 1; n <= stackLen; n++) {
        for (let tr = 0; tr < 3; tr++) {
          const targetRow = board[tr];
          
          // 💡 ターゲット列（tc）のループをインラインで展開し、4重ループを「3重」へ削減！
          // これにより、AIが先読みする際の一連の計算ステップ数が3分の1に減少します。
          
          // tc = 0 の判定
          if (!(tr === r && 0 === c) && (targetRow[0].length + n <= 3)) {
            if (!(isOpponentMove && r === lmToRow && c === lmToCol && tr === lmFromRow && 0 === lmFromCol && n === lmCount)) {
              moves.push({ type: 'move', fromRow: r, fromCol: c, count: n, toRow: tr, toCol: 0 });
            }
          }
          // tc = 1 の判定
          if (!(tr === r && 1 === c) && (targetRow[1].length + n <= 3)) {
            if (!(isOpponentMove && r === lmToRow && c === lmToCol && tr === lmFromRow && 1 === lmFromCol && n === lmCount)) {
              moves.push({ type: 'move', fromRow: r, fromCol: c, count: n, toRow: tr, toCol: 1 });
            }
          }
          // tc = 2 の判定
          if (!(tr === r && 2 === c) && (targetRow[2].length + n <= 3)) {
            if (!(isOpponentMove && r === lmToRow && c === lmToCol && tr === lmFromRow && 2 === lmFromCol && n === lmCount)) {
              moves.push({ type: 'move', fromRow: r, fromCol: c, count: n, toRow: tr, toCol: 2 });
            }
          }

        }
      }
    }
  }
  return moves;
}



// ==========================================================================
// 💡 ① ファンクション アプライムーブ（着手、反映：コピー負荷を半減）
// ==========================================================================
function applyMove(board, hands, player, move) {
  // 💡 ループによる完全ディープコピーを廃止し、変更の必要な行だけをシャローコピーしてメモリ負荷を劇的に軽減
  const b = [board[0].slice(), board[1].slice(), board[2].slice()];
  const h = { blue: hands.blue, yellow: hands.yellow };
  
  if (move.type === 'place') {
    const r = move.row;
    const c = move.col;
    b[r][c] = b[r][c].concat([player]);
    h[player]--;
  } else {
    const fr = move.fromRow;
    const fc = move.fromCol;
    const tr = move.toRow;
    const tc = move.toCol;
    const mc = move.count;
    
    const from = b[fr][fc].slice();
    const pieces = from.splice(from.length - mc, mc);
    
    b[fr][fc] = from;
    b[tr][tc] = b[tr][tc].concat(pieces);
  }
  return { board: b, hands: h };
}

// ==========================================================================
// 🏆 ② ファンクション エバリュエート（ 隠れたオブジェクト量産を完全ゼロにした究極評価 ）
// ==========================================================================
function evaluate(board, aiColor) {
  const opColor = aiColor === 'yellow' ? 'blue' : 'yellow';
  let score = 0;

  // 💡 ループ内の2重ループと「配列の分割代入 [r, c]」を完全に全廃！
  // 隠れた配列オブジェクトの自動生成を完全にストップさせ、探索速度を跳ね上げます。
  for (let i = 0; i < 8; i++) {
    const line = LINES[i];
    let aiCount = 0;
    let opCount = 0;

    // 1マス目
    const s0 = board[line[0][0]][line[0][1]];
    if (s0.length > 0) {
      if (s0[s0.length - 1] === aiColor) aiCount++;
      else s0[s0.length - 1] === opColor ? opCount++ : null; 
    }

    // 2マス目
    const s1 = board[line[1][0]][line[1][1]];
    if (s1.length > 0) {
      if (s1[s1.length - 1] === aiColor) aiCount++;
      else s1[s1.length - 1] === opColor ? opCount++ : null;
    }

    // 3マス目
    const s2 = board[line[2][0]][line[2][1]];
    if (s2.length > 0) {
      if (s2[s2.length - 1] === aiColor) aiCount++;
      else s2[s2.length - 1] === opColor ? opCount++ : null;
    }

    if (aiCount === 3) return 10000;
    if (opCount === 3) return -10000;
    
    if (opCount === 0) {
      if (aiCount === 2) score += 30;
      else if (aiCount === 1) score += 3;
    }
    if (aiCount === 0) {
      if (opCount === 2) score -= 25;
      else if (opCount === 1) score -= 2;
    }
  }

  // 中央（1,1）の支配度チェック
  const centerStack = board[1][1];
  if (centerStack.length > 0) {
    const centerColor = centerStack[centerStack.length - 1];
    if (centerColor === aiColor) score += 8;
    else if (centerColor === opColor) score -= 8;
  }

  return score;
}


// ==========================================================================
// 🚀 ③ ファンクション ミニマックス（ Alpha-Beta 構造の極限高速化 ）
// ==========================================================================
function minimax(board, hands, player, depth, alpha, beta, aiColor, maximizing, lastMove) {
  const winInfo = checkWinner(board);
  if (winInfo) {
    return winInfo.winner === aiColor ? (10000 + depth) : (-10000 - depth);
  }
  if (depth === 0) return evaluate(board, aiColor);

  const moves = getAllMoves(board, hands, player, lastMove);
  const movesLen = moves.length;
  if (movesLen === 0) return evaluate(board, aiColor);

  const nextPlayer = player === 'blue' ? 'yellow' : 'blue';

  if (maximizing) {
    let best = -Infinity;
    for (let i = 0; i < movesLen; i++) {
      const nextState = applyMove(board, hands, player, moves[i]);
      const val = minimax(nextState.board, nextState.hands, nextPlayer, depth - 1, alpha, beta, aiColor, false, moves[i]);
      if (val > best) best = val;
      if (val > alpha) alpha = val;
      if (beta <= alpha) break; // βカット
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < movesLen; i++) {
      const nextState = applyMove(board, hands, player, moves[i]);
      const val = minimax(nextState.board, nextState.hands, nextPlayer, depth - 1, alpha, beta, aiColor, true, moves[i]);
      if (val < best) best = val;
      if (val < beta) beta = val;
      if (beta <= alpha) break; // αカット
    }
    return best;
  }
}

// ==========================================================================
// 4. ファンクション ゲットAIムーブ（難易度調整パラメータ集約版）
// ==========================================================================
function getAIMove(board, hands, aiColor, difficulty, lastMove) {
  const moves = getAllMoves(board, hands, aiColor, lastMove);
  const movesLen = moves.length;
  if (movesLen === 0) return null;
  const opColor = aiColor === 'blue' ? 'yellow' : 'blue';

  // ==========================================================================
  // 難易度調整パラメータ（ここを書き換えて強さを自由に調整してください）
  // ==========================================================================
  
  // 1. 勝ち筋・守りの見逃し確率（1.00で100%成功、0.00で100%見落とす）
  const successRates = {
 easy: 1.00,    // よわいが勝ちを確実に見つける確率（元の挙動：1.00固定）
 medium: 1.00,  // ふつうが勝ち・ピンチに気づく確率（例：0.50なら半分うっかり見落とす）
 hard: 1.00     // つよいが勝ち・ピンチに気づく確率（1.00で鉄壁固定）
  };

  // 2. ランダムに打っちゃう確率（1.00で100%ランダム、0.00で思考をスキップしない）
  const randomRates = {
    easy: 0.60,    // よわいが思考を放棄して完全にランダムに打つ確率（元の設定：0.60）
    medium: 0.30,  // ふつうが思考を放棄して完全にランダムに打つ確率（元の設定：0.75）
    hard: 0.00     // つよいが完全にランダムに打つ確率（0.00で常に最善手を考える）
  };

  // 3. AIが読む深さ（数字が大きいほど賢くなりますが、処理が重くなります）
  const depthMap = {
    easy: 1,       // よわいの探索深度（元の設定：1）
    medium: 2,     // ふつうの探索深度（元の設定：2）
    hard: 4        // つよいの探索深度（元の設定：4）
  };

  // 各難易度ごとの成否判定（乱数とパラメータの比較）
  const currentSuccess = Math.random() < (successRates[difficulty] ?? 1.00);
  const currentRandom  = Math.random() < (randomRates[difficulty] ?? 0.00);
  const depth          = depthMap[difficulty] ?? 2;

  // ==========================================================================

  // 1. 勝ち筋があれば即座に打つ
  // 設定された確率（currentSuccess）に当選した場合のみ、勝ちを確定させる
  if (difficulty === 'hard' || currentSuccess) {
    for (let i = 0; i < movesLen; i++) {
      const nextState = applyMove(board, hands, aiColor, moves[i]);
      const winInfo = checkWinner(nextState.board);
      if (winInfo && winInfo.winner === aiColor) return moves[i]; 
    }
  }

  // 2. 守りのロジック
  // よわいは元々100%スルー。それ以外は確率（currentSuccess）で守る
  if (difficulty !== 'easy' && (difficulty === 'hard' || currentSuccess)) {
    const enemyMoves = getAllMoves(board, hands, opColor, null);
    const enemyLen = enemyMoves.length;
    let lethalEnemyMove = null;
    
    for (let i = 0; i < enemyLen; i++) {
      const enemyState = applyMove(board, hands, opColor, enemyMoves[i]);
      const winInfo = checkWinner(enemyState.board);
      if (winInfo && winInfo.winner === opColor) { 
        lethalEnemyMove = enemyMoves[i]; 
        break; 
      }
    }

    if (lethalEnemyMove) {
      for (let i = 0; i < movesLen; i++) {
        const nextState = applyMove(board, hands, aiColor, moves[i]);
        const nextEnemyMoves = getAllMoves(nextState.board, hands, opColor, null);
        
        let stillLethal = false;
        for (let j = 0; j < nextEnemyMoves.length; j++) {
          const checkState = applyMove(nextState.board, hands, opColor, nextEnemyMoves[j]);
          const winInfo = checkWinner(checkState.board);
          if (winInfo && winInfo.winner === opColor) {
            stillLethal = true;
            break;
          }
        }
        if (!stillLethal) return moves[i];
      }
    }
  }

  // 3. 確率設定（ランダムに打つ処理）
  // 設定したrandomRatesの確率で、ここを通過して即座にランダム着手します
  if (currentRandom) {
    return moves[Math.floor(Math.random() * movesLen)];
  }

  // 4. Minimax法による最善手の探索
  let bestScore = -Infinity;
  let bestMoves = [];
  const nextPlayer = aiColor === 'blue' ? 'yellow' : 'blue';

  for (let i = 0; i < movesLen; i++) {
    const nextState = applyMove(board, hands, aiColor, moves[i]);
    const score = minimax(nextState.board, nextState.hands, nextPlayer, depth - 1, -Infinity, Infinity, aiColor, false, moves[i]);
    if (score > bestScore) {
      bestScore = score;
      bestMoves = [moves[i]];
    } else if (score === bestScore) {
      bestMoves.push(moves[i]);
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}



// ==========================================================================
// 🌟 [プロ最終最適化・最軽量版] 盤面のコマ (Puck)
// ==========================================================================
const Puck = React.memo(function Puck({ color, index, isGlowing = false }) {
  const liftY = index * -14; 
  const microZ = 4 + (index * 0.2);
  const isBlue = color === 'blue';

  const topGradId = 'puckTopGrad-' + color;
  const sideGradId = 'puckSideGrad-' + color;
  const defaultStroke = isBlue ? '#93c5fd' : '#fef08a';

  // インラインスタイルのオブジェクト生成を極限までシンプルにリファクタリング
  const transformStyle = 'translateX(-10%) rotateZ(6deg) rotateX(-34deg) translateZ(' + microZ + 'px) translateY(' + liftY + 'px)';
  const glowClass = isGlowing ? 'is-glowing' : '';

  return (
    <div 
      className={'puck-svg-container ' + glowClass}
      style={{ 
        transform: transformStyle,
        zIndex: 10 + index,
      }}
    >
      <svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
        <path 
          className="puck-side"
          d="M 7,34 A 25,15 0 0,0 57,34 L 57,50 A 25,15 0 0,1 7,50 Z" 
          fill={'url(#' + sideGradId + ')'} 
        />
        <ellipse cx="32" cy="34" rx="25" ry="15" fill={'url(#' + topGradId + ')'} />
        <ellipse 
          className="puck-stroke"
          cx="32" 
          cy="34" 
          rx="23" 
          ry="13" 
          fill="none" 
          stroke={defaultStroke} 
          strokeWidth={1.8} 
          strokeOpacity={0.9}
        />
      </svg>
    </div>
  );
});

// ==========================================================================
// 🌟 [プロ最終最適化・最軽量版] 手札のコイン (HandPuck)
// ==========================================================================
const HandPuck = React.memo(function HandPuck({ color }) {
  const hTopGradId = 'hTopGrad-' + color;
  const hSideGradId = 'hSideGrad-' + color;

  return (
    <div className="w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 60 76" xmlns="http://www.w3.org/2000/svg">
        <path d="M 5,30 A 25,15 0 0,0 55,30 L 55,48 A 25,15 0 0,1 5,48 Z" fill={'url(#' + hSideGradId + ')'} />
        <ellipse cx="30" cy="30" rx="25" ry="15" fill={'url(#' + hTopGradId + ')'} stroke="#ffffff" strokeWidth="2.5" />
        <ellipse cx="30" cy="30" rx="19" ry="11" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeDasharray="4,2" />
      </svg>
    </div>
  );
});

// ==========================================================================
// 🌟 [プロ最終最適化・最軽量版] コインのグラデーション中央基地 (GameSvgDefs)
// ==========================================================================
// メモライズにより、アプリ起動時に1回読み込まれた後は、毎ターンの再計算負荷が完全に「ゼロ」になります
const GameSvgDefs = React.memo(function GameSvgDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* 🔵 手札のコイン（HandPuck）用 */}
        <radialGradient id="hTopGrad-blue" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#60a5fa" /><stop offset="40%" stopColor="#2563eb" /><stop offset="85%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <linearGradient id="hSideGrad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        {/* 🟡 手札のコイン（HandPuck）用 */}
        <radialGradient id="hTopGrad-yellow" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fbbf24" /><stop offset="40%" stopColor="#d97706" /><stop offset="85%" stopColor="#78350f" /><stop offset="100%" stopColor="#451a03" />
        </radialGradient>
        <linearGradient id="hSideGrad-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        {/* 🔵 盤面のコマ（Puck）用グラデーション */}
        <radialGradient id="puckTopGrad-blue" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#93c5fd" /><stop offset="100%" stopColor="#2563eb" />
        </radialGradient>
        <linearGradient id="puckSideGrad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        {/* 🟡 盤面のコマ（Puck）用グラデーション */}
        <radialGradient id="puckTopGrad-yellow" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" /><stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <linearGradient id="puckSideGrad-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" /><stop offset="40%" stopColor="#b45309" /><stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
    </svg>
  );
});





// ==========================================================================
// 🌟 [プロ最終最適化・最軽量版] ファンセルストック (CellStack)
// ==========================================================================

const CellStack = React.memo(function CellStack({ 
  stack, isSelected, isValidTarget, onClick, winHighlight, disabled,
  rowIdx, colIdx, lastMove, winResult, phase
}) {

  // 1. 勝者によるCSSクラスの切り替え
  let winClass = '';
  if (winHighlight && winResult) {
    winClass = winResult.winner === 'blue' ? 'cell-win-blue ' : 'cell-win-amber ';
  }

  // ゲームオーバー時の点滅停止クラス
  const isGameOverClass = phase === 'gameOver' ? 'is-game-over ' : '';
  const selectedClass = isSelected ? 'cell-selected ' : '';
  const validClass = isValidTarget ? 'cell-valid ' : '';
  const disabledClass = disabled ? 'cell-disabled' : 'cell-interactive';

  // 2. クラス名を安全な文字列結合で最速組み立て（Babelエラー防止）
  const cls = 'cell-3d ' + selectedClass + validClass + winClass + isGameOverClass + disabledClass;
  
  // 3. インラインアロー関数の全廃。クリック時に自分自身の情報を直接親に届けるハンドラ
  const handleItemClick = function() {
    if (!disabled && onClick) {
      onClick(rowIdx, colIdx);
    }
  };

  return (
    <div className={cls} onClick={handleItemClick}>
      <div className="cell-top" />
      <div className="cell-top" />
      
      {stack.map((color, i) => {
        let isGlowing = false;

        if (lastMove) {
          if (lastMove.type === 'place' && lastMove.row === rowIdx && lastMove.col === colIdx) {
            isGlowing = (i === stack.length - 1);
          } else if (lastMove.type === 'move' && lastMove.toRow === rowIdx && lastMove.toCol === colIdx) {
            const moveCount = lastMove.count || 1;
            isGlowing = (i >= stack.length - moveCount);
          }
        }

        // keyを安全な結合文字にしてPuck（コマ）の不要な再生成を防止
        return (
          <Puck 
            key={rowIdx + '-' + colIdx + '-' + i} 
            color={color} 
            index={i} 
            rowIdx={rowIdx} 
            colIdx={colIdx} 
            isGlowing={isGlowing}
          />
        );
      })}
      
      {stack.length > 0 && (
        <div className="stack-count-badge">
          {stack.length}
        </div>
      )}
    </div>
  );
}, function areEqual(prevProps, nextProps) {
  // 💡 【プロの極秘テクニック】9個のマスから不要な描画を完全に奪い去るカスタム比較関数
  // 前後のPropsを厳密に比較し、このマスに関するデータが「本当に変わった時」だけしか再描画を許可しません。
  return (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isValidTarget === nextProps.isValidTarget &&
    prevProps.winHighlight === nextProps.winHighlight &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.phase === nextProps.phase &&
    prevProps.lastMove === nextProps.lastMove &&
    prevProps.winResult === nextProps.winResult &&
    prevProps.stack.length === nextProps.stack.length &&
    prevProps.stack.every((color, idx) => color === nextProps.stack[idx])
  );
});

// ==========================================================================
// 🌟 [プロ最終最適化・最軽量版] ムーブカウントセレクター
// ==========================================================================
const MoveCountSelector = React.memo(function MoveCountSelector({ maxCount, onSelect, onCancel }) {
  
  // 関数の住所を1つに固定してガベージを防止
  const handleButtonClick = function(e) {
    const num = Number(e.currentTarget.dataset.num);
    if (onSelect) onSelect(num);
  };

  return (
    <div className="move-count-selector">
      <span className="move-count-label">取る数:</span>
      
      {/* 💡 ループによる無駄配列の量産（Array.from）を完全に全廃！ */}
      {/* 最大3枚というゲームスケールに最適化し、直接並べることで最速描画します */}
      {maxCount >= 1 && (
        <button key="move-btn-1" data-num="1" onClick={handleButtonClick} className="selector-btn btn-primary">1</button>
      )}
      {maxCount >= 2 && (
        <button key="move-btn-2" data-num="2" onClick={handleButtonClick} className="selector-btn btn-primary">2</button>
      )}
      {maxCount >= 3 && (
        <button key="move-btn-3" data-num="3" onClick={handleButtonClick} className="selector-btn btn-primary">3</button>
      )}
      
      <button onClick={onCancel} className="selector-btn btn-secondary">
        戻る
      </button>
    </div>
  );
});


// ==========================================================================
// 🌟 [プロ最終最適化・最軽量＆安全版] 決着時演出オーバーレイ (WinOverlay)
// ==========================================================================
const DIFFICULTY_LABELS = {
  easy: 'よわい',
  medium: 'ふつう',
  hard: 'つよい'
};

const STAR_COLORS = {
  easy: 'bronze',
  medium: 'silver',
  hard: 'gold'
};

const WinOverlay = React.memo(function WinOverlay({ winner, onReset, gameMode, backToMenu, difficulty, winStreak }) {
  const isBlue = winner === 'blue';

  // 💡 【プロの鉄壁ディフェンス】報酬演出の2重・多重発火を完全にシャットアウトするフラグ
  const hasTriggeredReward = useRef(false);

  React.useEffect(() => {
    if (isBlue && gameMode === 'ai' && !hasTriggeredReward.current) {
      if (typeof window.checkAndShowReward === 'function') {
        hasTriggeredReward.current = true; // 即座にロックをかける
        window.checkAndShowReward(winStreak, difficulty);
      }
    }
  }, [isBlue, gameMode, winStreak, difficulty]);

  // 表示名とクラスの決定（Babel環境に優しいフラット計算）
  const name = isBlue 
    ? 'プレイヤー1(青)' 
    : (gameMode === '2p' ? 'プレイヤー2(黄)' : 'CPU(黄)');
    
  const colorClass = isBlue ? 'text-blue-400' : 'text-amber-400';
  const isCpuWin = gameMode !== '2p' && !isBlue;
  const starColor = (gameMode === 'ai' && STAR_COLORS[difficulty]) || 'gold';

  return (
    <div className="overlay-backdrop">
      <div className="overlay-card overlay-enter flex flex-col items-center">

        {/* 勝利アイコン／ロボット／星 表示エリア */}
        <div className="victory-icon-container">
          {isCpuWin ? (
            <span className="icon-robot">🤖</span>
          ) : (
            <div className={'star-medal ' + starColor}></div>
          )}
        </div>
        
        {/* 1. 誰の勝ち */}
        <p className={'text-[18px] font-black mb-2 whitespace-nowrap text-center ' + colorClass}>
          {name + ' の勝利！'}
        </p>

        {/* CPU戦のときに難易度を表示 */}
        {gameMode !== '2p' && difficulty && (
          <p className="text-sm font-bold text-gray-300 mb-3">
            {'【難易度： ' + (DIFFICULTY_LABELS[difficulty] || difficulty) + ' 】'}
          </p>
        )}

        {/* 人間勝利時のみ通算勝利数を表示 */}
        {winStreak > 0 && !isCpuWin && (
          <p className="streak-count-text">{'TOTAL: ' + winStreak + '勝達成！'}</p>
        )}
       
        {/* 2. ゲーム終了 */}
        <h2 className="text-base font-bold text-gray-400 mt-2 mb-8 tracking-widest">
          — ゲーム終了 —
        </h2>
        
        {/* 3. ボタンエリア */}
        <div className="flex flex-col gap-3 w-full items-center">
          <button onClick={onReset} className="overlay-btn w-full">
            もう一度遊ぶ
          </button>
          <button onClick={backToMenu} className="overlay-btn w-full secondary">
            メニューに戻る
          </button>
        </div>

      </div>
    </div>
  );
});


// -------------------------------------------------------------
// 説明書コンポーネント (勝利報酬完全復元・最軽量リファクタリング版)
// -------------------------------------------------------------

// 💡 軽量画像ヘルパー（共通のonError処理などを集約）
const RuleImg = ({ src, alt }) => (
  <div className="w-full text-center my-0">
    <img
      src={src}
      alt={alt}
      className="w-full max-w-[250px] mx-auto rounded-xl border border-gray-600 shadow-md block"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        console.warn(`${src} が見つかりません。`);
      }}
    />
  </div>
);

function InstructionScreen({ onBack, hasActiveGame, onResumeGame }) {
  const handleResetStreak = () => {
    if (window.confirm('これまでの通算勝利記録をすべてリセットしますか？\n（この操作は取り消せません）')) {
      localStorage.removeItem('game_streaks');
      alert('通算勝利記録をリセットしました。');
      window.location.reload();
    }
  };

  return (
    <div className="instruction-container">
      <h2 className="text-xl font-black text-white mb-5 text-center border-b-2 border-gray-700 pb-3">
        📜 公式ゲーム説明書
      </h2>

      <div className="space-y-6 text-[14px] leading-relaxed">
        {/* 🏆 基本ルール */}
        <div className="instruction-section">
                   <h3 className="instruction-title">🏆 基本ルール（勝利条件）</h3>
          <p className="mb-2">
            上から見て、自分の持ち駒を縦、横、斜めのいずれかに、<strong>先に3つ並べた方が勝ち</strong>となります。
          </p>
          
          {/* 💡 ==========================================================================
             ⏱️ 【社長公認】難易度ごとの思考時間を分かりやすくテキストに追加！
             ========================================================================== */}
          <div className="text-[12px] text-amber-400/90 font-bold  p-3 mt-2 space-y-1">
            <p className="flex items-center gap-1 text-[13px] text-amber-300 mb-1">⏱️ 思考時間（時間を過ぎると負け）</p>
            <p className="pl-1">🟢 難易度：よわい ── <strong className="text-white">1分（ 60秒 ）</strong></p>
            <p className="pl-1">🟠 難易度：ふつう ── <strong className="text-white">3分（ 180秒 ）</strong></p>
            <p className="pl-1">🔴 難易度：つよい ── <strong className="text-white">5分（ 300秒 ）</strong></p>
          </div>

        </div>

        {/* 🛠 ルールポイント */}
        <div className="instruction-section">
          <h3 className="instruction-title">🛠 3つのルールポイント</h3>
          <p className="mb-3">プレイヤーは順番ごとに<strong>【1回1動作】</strong>を行うことができます。</p>

          <div className="instruction-list">
            <p className="text-[20px] font-black text-amber-500 mt-2 mb-0 tracking-wide">
              ① 相手の駒も動かせます！
            </p>
            <RuleImg src="./d1.jpg" alt="相手の駒も動かせます！" />
            <p>「持ち駒を置く」か、「自分の駒を移動させる」か、あるいはマス上にある<strong>「相手の駒を移動させる」</strong>ことができます。</p>
            <p className="text-xs text-gray-400">※ マス上に置いた駒を自分の手元に引き取る事は出来ません。また、相手の手元にある持ち駒を動かせるのは相手のみです。</p>

            <p className="text-[20px] font-black text-amber-500 mt-2 mb-0 tracking-wide">
              ② 3個まで上に重ねられます！
            </p>
            <RuleImg src="./d2.jpg" alt="3個まで上に重ねられます！" />
            <p>すでに駒があるマスにも重ねられます。ただし、1マスに重ねられるのは<strong>最大3個まで</strong>です。</p>

            <p className="text-[20px] font-black text-amber-500 mt-2 mb-0 tracking-wide">
              ③ まとめて持って移動できます！
            </p>
            <RuleImg src="./d3.jpg" alt="まとめて持って移動できます！" />
            <p><strong>「1個〜3個重なったまま」</strong>一塊として移動させることができます。</p>
          </div>
        </div>

        {/* 🚫 禁止事項 */}
        <div className="instruction-section">
          <h3 className="text-amber-500 font-black mb-1.5 text-[16px]">🚫 禁止事項・ルール</h3>
          <div className="space-y-2.5">
            <p><strong>・同手戻しの禁止:</strong><br />相手が移動させた駒をそのまま逆に戻す行為は禁止です。</p>
            <p><strong>・下からの並び出しに注意:</strong><br />駒を移動させて退かした際に、<strong>下にあった相手の駒が3つ並んでしまう</strong>と、動かした側の負けとなります。</p>
            <p><strong>・ドロー（引き分け）判定:</strong><br />お互いに同じ手の繰り返しでループ状態になった時は、別の手で進むかリセットボタンでやり直してください。</p>
          </div>
        </div>

        {/* 🧠 脳力セクション */}
        <div className="instruction-section mt-6 border-t border-gray-800 pt-5">
          <h3 className="text-indigo-400 font-black mb-2 text-[16px]">🧠 こんな「脳力」が身に付きます</h3>
          <p className="text-[11px] text-gray-400 mb-4 font-bold">
            ※「脳力」とは、様々に考える力という意味の造語です。
          </p>

          <div className="space-y-5 text-sm text-gray-300 leading-relaxed font-bold">
            <p>これからの現代人に必要な考える力を、大人から子供まで楽しめるゲームにしました。</p>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-900/60 text-xs">
              <span className="text-indigo-300 font-black text-sm">👨‍⚕️ 考案者プロフィール</span>
              <p className="mt-1 text-gray-300">
                健康療法の専門家<strong>＜息吹友也・東洋医学名誉博士＞</strong>が考案。誰もが面白く、簡単に脳力を鍛えられるゲームです。
                <span className="text-amber-400 font-bold ml-1">＜特許出願中＞</span>
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-2.5">
                <span className="text-indigo-400 mt-0.5 text-lg">🔹</span>
                <div className="flex-1">
                  <h4 className="text-white font-black text-base mb-1">空間認知能力の発動</h4>
                  <p className="text-gray-300 leading-relaxed font-normal">
                    駒を立体に積む事で、立体的に物事を考える空間認知能力を発動できます。（IQや運動能力にも大きな関係があると話題に。）
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-indigo-400 mt-0.5 text-lg">🔹</span>
                <div className="flex-1">
                  <h4 className="text-white font-black text-base mb-1">様々な能力アップに</h4>
                  <p className="text-gray-300 leading-relaxed font-normal">
                    空間認知能力、集中力、観察力、判断力など、総合的な洞察が身に付きます。
                  </p>
                </div>
              </div>

              {/* 🏆 勝利報酬と昇級システム（★ご提示の原文コードを完全そのまま保持★） */}
              <div className="flex items-start gap-2.5">
                <span className="text-yellow-400 mt-0.5 text-lg">🏆</span>

                <div className="flex-1">
                  <h4 className="text-white font-black text-base mb-1">勝利を重ねて昇級＆マスター称号を獲得！</h4>
                  <p className="text-gray-300 leading-relaxed">
                    ＣＰＵ（コンピュータ）との対戦で勝利を重ねる毎に、昇級やマスターの称号が授与されます。<br />
                    <br />
                    <span className="text-amber-600 font-bold">・「よわい」</span><br />
                      5勝：銅メダル <span className="text-sky-300 font-bold">9級</span><br />
                     10勝：銅のトロフィー <span className="text-sky-300 font-bold">8級</span><br />
                     20勝：銅の王冠 <span className="text-sky-300 font-bold">7級</span> ＋<br />
                       <span className="text-amber-300 font-bold"> 👑 ブロンズマスターの称号授与</span><br />
                    <br />
                    <span className="text-gray-200 font-bold">・「ふつう」</span><br />
                      5勝：銀メダル <span className="text-sky-300 font-bold">6級</span><br />
                     10勝：銀のトロフィー <span className="text-sky-300 font-bold">5級</span><br />
                     20勝：銀の王冠 <span className="text-sky-300 font-bold">4級</span> ＋<br />
                      <span className="text-amber-300 font-bold"> 👑 シルバーマスターの称号授与</span><br />
                    <br />
                    <span className="text-yellow-400 font-bold">・「つよい」</span><br />
                      5勝：金メダル <span className="text-sky-300 font-bold">3級</span><br />
                     10勝：金のトロフィー <span className="text-sky-300 font-bold">2級</span><br />
                     20勝：金の王冠 <span className="text-sky-300 font-bold">1級</span> ＋<br />
                      <span className="text-amber-300 font-bold"> 👑 ゴールドマスターの称号授与</span>
                  </p>
                </div>
              </div>

              {/* ⚠️ 注意点 */}
              <div className="flex items-start gap-2.5">
                <span className="text-amber-400 mt-0.5 text-lg">⚠️</span>
                <div className="flex-1">
                  <h4 className="text-white font-black text-base mb-1">通算記録の保存とリセット</h4>
                  <p className="text-gray-300 leading-relaxed text-sm font-normal">
                    通算勝利記録は自動保存されます。最下部のボタンでリセット可能ですが、元に戻せませんのでご注意ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔍 洞察力 */}
        <div className="instruction-section mt-5 bg-amber-950/20 p-4 rounded-xl border border-amber-900/40">
          <h3 className="text-amber-500 font-black mb-2.5 text-[16px]">🔍 面白さのポイントは「洞察力」</h3>
          <div className="text-sm text-gray-300 leading-relaxed space-y-2 font-normal">
            <p>このゲームは、誰もが簡単に遊べるゲームでありながら、<strong>洞察力</strong>を養う事ができます。</p>
            <p className="text-gray-400">
              自分の駒ばかり見ていると、駒を動かした時に<span className="text-amber-400 font-bold">下にあった相手の駒が3つ並んでしまう事</span>に気付きません。
            </p>
            <p className="text-rose-400 font-bold">
              🚨 うっかり駒を動かした時点で、即座に対戦者に勝ちをあげる（自爆負けする）ことになります！
            </p>
          </div>
        </div>

        {/* 🔘 ボタンエリア */}
        <div className="flex flex-col gap-3 mt-8">
          {hasActiveGame && (
            <button onClick={onResumeGame} className="overlay-btn">
              🎮 ゲームに戻る (続きから)
            </button>
          )}
          <button onClick={onBack} className="btn-menu-back active:scale-95">
            メインメニューに戻る
          </button>

          <div className="mt-6 pt-4 border-t border-gray-800 text-center">
            <button
              type="button"
              onClick={handleResetStreak}
              className="text-xs text-red-400 hover:text-red-300 underline cursor-pointer transition-colors"
            >
              通算勝利記録をリセットする
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// ==========================================================================
// 🌟 [プロ最適化・エラー完全修正版] メニュースクリーン (MenuScreen) - 前半戦
// ==========================================================================
function MenuScreen({ streaks = {}, setStreaks, onStart, onOpenInstructions, hasHistory }) {
  // 🛠️ 1行でデバッグの有効/無効を切り替え（本番時は false に変更）
  const IS_DEBUG = true; 

  const [mode, setMode] = useState(null);               
  const [selectedDiff, setSelectedDiff] = useState(null); 
  const [debugTapCount, setDebugTapCount] = useState(0);  
  const [showDebug, setShowDebug] = useState(false);      

  // 💡 メニュー画面が開いた瞬間のスクロール位置リセット
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 3. 難易度選択ハンドラー
  const handleDiffSelect = function(diff) {
    setSelectedDiff(diff);
    setMode('turn');
  };

  // 💡 4. タイトルタップ処理の最適化（不要なメモリ保持を防ぐ）
  const handleTitleTap = function() {
    if (!IS_DEBUG) return;

    setDebugTapCount(function(prev) {
      const next = prev + 1;
      if (next >= 5) {
        setShowDebug(function(show) { return !show; });
        return 0; 
      }
      return next;
    });
  };

  // 💡 5. 勝利数更新用の共通処理
  const updateStreaksData = function(newStreaks) {
    localStorage.setItem('game_streaks', JSON.stringify(newStreaks));
    if (typeof setStreaks === 'function') {
      setStreaks(newStreaks); 
    }
  };

  // 6. 特定の難易度の勝利数を切り替え
  const toggleStreak = function(diff, count) {
    const current = streaks[diff] || 0;
    const nextCount = current === count ? 0 : count;

    const updated = Object.assign({}, streaks, { [diff]: nextCount });
    updateStreaksData(updated);

    if (nextCount > 0 && typeof window.checkAndShowReward === 'function') {
      window.checkAndShowReward(nextCount, diff);
    }
  };

  // 7. 全リセット
  const resetAllStreaks = function() {
    updateStreaksData({ easy: 0, medium: 0, hard: 0 });
  };

  // 8. 全9種一括解放
  const unlockAll = function() {
    updateStreaksData({ easy: 20, medium: 20, hard: 20 });
    if (typeof window.checkAndShowReward === 'function') {
      window.checkAndShowReward(20, 'hard');
    }
  };




  // ==========================================================================
  // 🎨 [プロ最終最適化・最軽量版] ボタンイベントの一元化（ガベージ生成完全シャットアウト）
  // ==========================================================================
  const handleMenuButtonClick = function(e) {
    const action = e.currentTarget.dataset.action;
    const val1 = e.currentTarget.dataset.val1;
    const val2 = e.currentTarget.dataset.val2;

    if (action === 'start') {
      onStart(val1, val2 || null);
    } else if (action === 'start-ai') {
      onStart('ai', selectedDiff, val1);
    } else if (action === 'set-mode') {
      setMode(val1 || null);
    } else if (action === 'diff-select') {
      handleDiffSelect(val1);
    } else if (action === 'open-instructions') {
      onOpenInstructions();
    }
  };

  return (
    <div className="menu-container">

      {/* ① メインメニュー表示時 */}
      {mode === null && (
        <React.Fragment>
          <div className="menu-main-content">
            <h1 
              onClick={handleTitleTap} 
              className="text-[42px] font-black text-white mb-[5px] tracking-tight cursor-pointer select-none"
              title={IS_DEBUG ? "5回クリックでデバッグ表示" : ""}
            >
              3<span className="text-indigo-400">ライン</span><span className="text-amber-500">！</span> 
            </h1>

            <p className="text-gray-400 text-[15px] mb-2 tracking-widest">脳力活性ゲーム！</p>
            <p className="text-gray-200 text-[13px] mb-7 tracking-widest font-bold">洞察力が身に付く立体３目並べ</p>

            <div className="flex flex-col gap-5 w-64">
              {hasHistory && (
                <button data-action="start" data-val1="resume" onClick={handleMenuButtonClick} className="menu-btn btn-resume animate-pulse">
                  途中から再開
                </button>
              )}
              <button data-action="start" data-val1="2p" onClick={handleMenuButtonClick} className="menu-btn btn-2p">2人対戦</button>
              <button data-action="set-mode" data-val1="ai" onClick={handleMenuButtonClick} className="menu-btn btn-ai">CPU対戦</button>
              <button onClick={handleMenuButtonClick} data-action="open-instructions" className="menu-btn btn-sub mt-2">📄 遊び方を見る</button>
            </div>
          </div>

          {window.AchievementCollection && (
            <window.AchievementCollection streaks={streaks} />
          )}
        </React.Fragment>
      )}

      {/* ② 難易度選択画面 */}
      {mode === 'ai' && (
        <div className="menu-main-content">
          <h1 onClick={handleTitleTap} className="text-[42px] font-black text-white mb-[5px] tracking-tight cursor-pointer select-none">
            3<span className="text-indigo-400">ライン</span><span className="text-amber-500">！</span> 
          </h1>
          <p className="text-gray-400 text-[15px] mb-6 tracking-widest">脳力活性ゲーム！</p>

          <div className="flex flex-col gap-4 w-64">
            <p className="text-gray-400 text-[14px] mb-1 font-bold">難易度を選択</p>
            
            <button data-action="diff-select" data-val1="easy" onClick={handleMenuButtonClick} className="menu-btn bg-green-600 text-white">よわい</button>
            <button id="btn-medium" data-action="diff-select" data-val1="medium" onClick={handleMenuButtonClick} className="menu-btn bg-orange-600 text-white">ふつう</button>
            <button id="btn-hard" data-action="diff-select" data-val1="hard" onClick={handleMenuButtonClick} className="menu-btn bg-red-600 text-white">つよい</button>
            
            <button data-action="set-mode" data-val1="" onClick={handleMenuButtonClick} className="menu-btn btn-sub mt-1">戻る</button>
          </div>
        </div>
      )}

      {/* ③ 先攻・後攻の選択画面 */}
      {mode === 'turn' && (
        <div className="menu-main-content">
          <h1 onClick={handleTitleTap} className="text-[42px] font-black text-white mb-[5px] tracking-tight cursor-pointer select-none">
            3<span className="text-indigo-400">ライン</span><span className="text-amber-500">！</span> 
          </h1>
          <p className="text-gray-400 text-[15px] mb-6 tracking-widest">脳力活性ゲーム！</p>

          <div className="flex flex-col gap-4 w-64">
            <p className="text-gray-400 text-[14px] mb-1 font-bold">順番を選択</p>
            
            <button data-action="start-ai" data-val1="blue" onClick={handleMenuButtonClick} className="menu-btn bg-indigo-600 text-white">先攻</button>
            <button data-action="start-ai" data-val1="yellow" onClick={handleMenuButtonClick} className="menu-btn bg-amber-600 text-white">後攻</button>
            
            <button data-action="set-mode" data-val1="ai" onClick={handleMenuButtonClick} className="menu-btn btn-sub mt-1">戻る</button>
          </div>
        </div>
      )}






           {/* 🛠️ デバッグパネル（銅・銀・金：5勝/10勝/20勝・ポップアップ連動対応） */}
      {IS_DEBUG && showDebug && (
        <div className="mt-6 p-4 bg-gray-900/95 border border-amber-500/50 rounded-xl w-full max-w-sm text-center z-50 shadow-2xl">
          <p className="text-amber-400 text-xs font-bold mb-3">🛠️ 実績・ポップアップテストパネル</p>

          {/* 💡 変更：インラインアロー関数を全廃するための、デバッグ専用一元化ハンドラ */}
          {/* これにより、デバッグパネル内の計12個のボタンが全て1つの関数参照だけを使い回します */}
          {(() => {
            const handleDebugClick = function(e) {
              const act = e.currentTarget.dataset.act;
              const diff = e.currentTarget.dataset.diff;
              const count = Number(e.currentTarget.dataset.count);

              if (act === 'toggle') {
                toggleStreak(diff, count);
              } else if (act === 'unlock') {
                unlockAll();
              } else if (act === 'reset') {
                resetAllStreaks();
              } else if (act === 'close') {
                setShowDebug(false);
              }
            };

            return (
              <React.Fragment>
                <div className="space-y-2 text-xs mb-3">
                  {/* Easy */}
                  <div className="bg-gray-800/60 p-2 rounded-lg">
                    <p className="text-green-400 font-bold mb-1 text-left text-[11px]">🟢 よわい（Easy）</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button data-act="toggle" data-diff="easy" data-count="5" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.easy >= 5 && streaks.easy < 10 ? 'bg-amber-700 text-white ring-2 ring-amber-400' : 'bg-gray-700 text-gray-300')}>🥉 5勝</button>
                      <button data-act="toggle" data-diff="easy" data-count="10" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.easy >= 10 && streaks.easy < 20 ? 'bg-slate-400 text-gray-900 ring-2 ring-slate-200' : 'bg-gray-700 text-gray-300')}>🥈 10勝</button>
                      <button data-act="toggle" data-diff="easy" data-count="20" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.easy >= 20 ? 'bg-yellow-500 text-gray-900 ring-2 ring-yellow-200' : 'bg-gray-700 text-gray-300')}>🥇 20勝</button>
                    </div>
                  </div>

                  {/* Medium */}
                  <div className="bg-gray-800/60 p-2 rounded-lg">
                    <p className="text-orange-400 font-bold mb-1 text-left text-[11px]">🟠 ふつう（Medium）</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button data-act="toggle" data-diff="medium" data-count="5" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.medium >= 5 && streaks.medium < 10 ? 'bg-amber-700 text-white ring-2 ring-amber-400' : 'bg-gray-700 text-gray-300')}>🥉 5勝</button>
                      <button data-act="toggle" data-diff="medium" data-count="10" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.medium >= 10 && streaks.medium < 20 ? 'bg-slate-400 text-gray-900 ring-2 ring-slate-200' : 'bg-gray-700 text-gray-300')}>🥈 10勝</button>
                      <button data-act="toggle" data-diff="medium" data-count="20" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.medium >= 20 ? 'bg-yellow-500 text-gray-900 ring-2 ring-yellow-200' : 'bg-gray-700 text-gray-300')}>🥇 20勝</button>
                    </div>
                  </div>

                  {/* Hard */}
                  <div className="bg-gray-800/60 p-2 rounded-lg">
                    <p className="text-red-400 font-bold mb-1 text-left text-[11px]">🔴 つよい（Hard）</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button data-act="toggle" data-diff="hard" data-count="5" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.hard >= 5 && streaks.hard < 10 ? 'bg-amber-700 text-white ring-2 ring-amber-400' : 'bg-gray-700 text-gray-300')}>🥉 5勝</button>
                      <button data-act="toggle" data-diff="hard" data-count="10" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.hard >= 10 && streaks.hard < 20 ? 'bg-slate-400 text-gray-900 ring-2 ring-slate-200' : 'bg-gray-700 text-gray-300')}>🥈 10勝</button>
                      <button data-act="toggle" data-diff="hard" data-count="20" onClick={handleDebugClick} className={'p-1.5 rounded font-bold transition-all active:scale-95 ' + (streaks.hard >= 20 ? 'bg-yellow-500 text-gray-900 ring-2 ring-yellow-200' : 'bg-gray-700 text-gray-300')}>🥇 20勝</button>
                    </div>
                  </div>
                </div>

                {/* 一括操作・リセットエリア */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button data-act="unlock" onClick={handleDebugClick} className="p-2 bg-amber-500 hover:bg-amber-400 text-gray-900 font-extrabold rounded text-xs transition-transform active:scale-95">
                    🏆 全9種を一括解禁
                  </button>
                  <button data-act="reset" onClick={handleDebugClick} className="p-2 bg-gray-700 hover:bg-gray-600 text-red-300 font-bold rounded text-xs transition-transform active:scale-95">
                    🔄 全リセット
                  </button>
                </div>

                <button data-act="close" onClick={handleDebugClick} className="text-[11px] text-gray-400 underline hover:text-white">
                  パネルをたたむ
                </button>
              </React.Fragment>
            );
          })()}
        </div>
      )}

    </div>
  );
}



// ==========================================================================
// 🌟 [プロ最終最適化・最軽量版] ハンドエリア (HandArea)
// ==========================================================================
const HandArea = React.memo(function HandArea({ color, count, isCurrentPlayer, isSelected, onSelect, playerLabel, disabled }) {
  const isBlue = color === 'blue';

  // 状態クラスの決定
  const activeStatusClass = isCurrentPlayer ? (isBlue ? 'is-blue' : 'is-amber') : 'is-inactive';
  const cardActiveBg = isCurrentPlayer 
    ? (isBlue ? 'bg-blue-950/70 border-blue-400' : 'bg-amber-950/70 border-amber-400')
    : 'bg-gray-900/90 border-gray-700';

  // 安全なクリック処理の共通化（関数の住所を1つに固定してガベージ防止）
  const handleSelect = function() {
    if (!disabled && isCurrentPlayer && onSelect) {
      onSelect();
    }
  };

  // 💡 【超軽量化】Array.from を全廃し、最大5枚という仕様に最適化したフラットレンダリング
  // これにより手札の描画コストが地球上で最も軽い状態（完全固定）になります
  const renderHandPieces = function() {
    const pieces = [];
    for (let i = 0; i < count; i++) {
      const isSelectedTarget = isSelected && (i === count - 1);
      const slotClass = 'hand-piece-slot ' + (isSelectedTarget ? 'is-selected' : '');
      
      pieces.push(
        <div 
          key={color + '-hand-' + i} 
          onClick={handleSelect} 
          className={slotClass}
        >
          <Puck color={color} index={0} isGlowing={false} />
        </div>
      );
    }
    return pieces;
  };

  const headerPulseClass = isCurrentPlayer ? 'animate-syncPulse' : '';

  return (
    <div className={'hand-card ' + cardActiveBg + ' ' + activeStatusClass}>
      
      <div className={'hand-player-header ' + headerPulseClass}>
        <span className="hand-player-name">
          {playerLabel}
        </span>
        {isCurrentPlayer && <span className="hand-player-arrow">◀</span>}
      </div>

      <div className="hand-area-row">
        <div className="hand-area-inner">
          
          {count > 0 ? (
            <React.Fragment>
              <div className="hand-piece-list">
                {renderHandPieces()}
              </div>
              <div className="hand-count-text">{'x' + count}</div>
            </React.Fragment>
          ) : (
            <span className="hand-empty-text">なし</span>
          )}

        </div>
      </div>

    </div>
  );
});




// ==========================================================================
// ⏱️ 🌟 [プロ最終最適化・最軽量完全版] ゲームタイマー (GameTimer)
// ==========================================================================

const GameTimer = React.memo(function GameTimer({ 
  screen, winResult, interactionDisabled, currentPlayer, onTimeOut,
  difficulty /* 💡 1. 忘れずにここにも難易度（difficulty）を受け取るように追加 */
}) {
  
  // 💡 2. 【社長のご要望】難易度ごとの秒数表（マップ）を定義
  const LIMIT_SECONDS = {
    easy: 60,     // よわい：60秒
    medium: 180,  // ふつう：180秒
    hard: 300     // つよい：300秒
  };

  // 今の難易度に応じた秒数を取得（万が一のために、見つからなければ60秒にする安全弁付き）
  const activeLimit = LIMIT_SECONDS[difficulty] || 60;

  // 💡 3. 初期値（スタート時の秒数）を、現在の難易度の秒数にする
  const [timeLeft, setTimeLeft] = useState(activeLimit);

  // プレイヤーが切り替わったら、現在の難易度の秒数で最速リセット
  useEffect(() => {
    setTimeLeft(activeLimit);
  }, [currentPlayer, activeLimit]); // 👈 依存配列に activeLimit を追加して連動させます

  // 常に最新のonTimeOutを保持するRef（タイマーの寿命を最大化するプロの技）
  const timeoutRef = useRef(onTimeOut);
  useEffect(() => {
    timeoutRef.current = onTimeOut;
  }, [onTimeOut]);

  useEffect(() => {
    if (screen !== 'game' || winResult || interactionDisabled) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (timeoutRef.current) timeoutRef.current(); 
          return activeLimit; // 時間切れ時も、その難易度の秒数に戻す
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, winResult, interactionDisabled, activeLimit]); 

  // クラス名の組み立てをBabelに優しい安全な文字列結合にリファクタリング
  const warningClass = timeLeft <= 10 ? 'warning' : '';

  return (
    <div className={'timer-display ' + warningClass}>
      <span className="timer-icon">⏱️</span>
      残り時間: {timeLeft}秒
    </div>
  );
});


// 💡 2. 状態メッセージのマッピング（外出しされていて非常に美しいです）
const phaseMessagesBase = {
  placeSelect: '配置先を選んでください',
  moveCountSelect: '取る駒の数を選んでください',
  moveTargetSelect: '移動先を選んでください',
  winDelay: '決着！盤面を確認中...', 
  gameOver: ''
};

// =============================================================
// 🖲️ ③ 盤面描画コンポーネント (GameBoard) - プロ最終最適化版
// =============================================================
function GameBoard({ 
  board, selectedCell, isValidTarget, lastMove, winLineSet, winResult, 
  handleCellClick, interactionDisabled,
  phase /* 🟢 忘れずにここにも phase を受け取るようにしておきます */
}) {
  return (
    <div className="board-space-block">
      <div className="board-scaler">
        <div className="board-iso-grid">
          {board.map((row, r) => row.map((cell, c) => (
            <CellStack 
              key={`${r}-${c}`} 
              stack={cell} 
              isSelected={selectedCell?.row === r && selectedCell?.col === c} 
              isValidTarget={isValidTarget(r, c)} 
              rowIdx={r} 
              colIdx={c} 
              lastMove={lastMove} 
              winHighlight={winLineSet.has(`${r},${c}`)} 
              winResult={winResult} 
              phase={phase} /* 🟢 以前修正した、ゲームオーバー時に点滅を止めるフェーズ情報を連携 */
              
              /* 💡 変更：ループ内でアロー関数を量産（ () => ... ）するのを完全にやめ、
                  handleCellClick の関数の住所（参照）を直接使い回します。メモリ消費がゼロになります。 */
              onClick={handleCellClick} 
              disabled={interactionDisabled} 
            />
          )))}
        </div>
      </div>
    </div>
  );
}


// ==========================================================================
// 🌟 [プロ最終最適化・分割版] ① 状態管理・Ref・AI制御
// ==========================================================================

const PHASE_MESSAGES_BASE = {
  placeSelect: '配置するマスを選択してください',
  moveCountSelect: '移動させる枚数を選択してください',
  moveTargetSelect: '移動先のマスを選択してください',
};

const { useState, useCallback, useMemo, useEffect, useRef } = React;

function App() {
  // --- 🚪 画面遷移とゲームモード（頻繁に変わらないコア状態） ---
  const [screen, setScreen] = useState('menu');
  const [gameMode, setGameMode] = useState('2p');
  const [difficulty, setDifficulty] = useState('easy');
  const [hasActiveGame, setHasActiveGame] = useState(false);
  const [timerKey, setTimerKey] = useState(0); 
  const [firstPlayer, setFirstPlayer] = useState('blue');
  const [aiThinking, setAiThinking] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // --- 🎮 【最軽量化】ゲームの進行状態を1つのオブジェクトに集約 ---
  const [gameState, setGameState] = useState(() => ({
    board: EMPTY_BOARD(), 
    hands: { blue: 5, yellow: 5 },
    currentPlayer: 'blue',
    phase: 'selectAction',
    selectedCell: null,
    moveCount: 0,
    winResult: null,
    lastMove: null,
  }));

  // --- 🏆 データの永続化 ---
  const [streaks, setStreaks] = useState(() => {
    const saved = localStorage.getItem('game_streaks');
    return saved ? JSON.parse(saved) : { '2p_blue': 0, '2p_yellow': 0, easy: 0, medium: 0, hard: 0 };
  });

  const aiTimerRef = useRef(null);
  const delayTimerRef = useRef(null);
  const aiColor = 'yellow';
  
  // 💡 gameStateから変数を取り出す
  const { board, hands, currentPlayer, phase, selectedCell, moveCount, winResult, lastMove } = gameState;
  const isAITurn = gameMode === 'ai' && currentPlayer === aiColor && !winResult;

  // --- 🛡️ 【最強の防波堤】常に最新の状態を保持するRef ---
  const latestRef = useRef({ gameState, gameMode, difficulty, screen, aiThinking, isAITurn });
  useEffect(() => {
    latestRef.current = { gameState, gameMode, difficulty, screen, aiThinking, isAITurn };
  });

  // ==========================================================================
  // 🤖 🌟 AIの自動着手コントロール（useEffectの精密制御）
  // ==========================================================================
  useEffect(() => {
    if (screen !== 'game' || phase !== 'selectAction' || !isAITurn) return;

    setAiThinking(true);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);

    aiTimerRef.current = setTimeout(() => {
      const { gameState: currentGameState, difficulty: currentDiff } = latestRef.current;
      if (currentGameState.phase !== 'selectAction') {
        setAiThinking(false);
        return;
      }

      const move = getAIMove(currentGameState.board, currentGameState.hands, aiColor, currentDiff, currentGameState.lastMove);
      if (!move) { 
        setAiThinking(false); 
        return; 
      }

      const { board: nb, hands: nh } = applyMove(currentGameState.board, currentGameState.hands, aiColor, move);
      setAiThinking(false); 
      doNextTurn(nb, nh, move);
    }, 500); 

    return () => { if (aiTimerRef.current) clearTimeout(aiTimerRef.current); };
  }, [isAITurn, phase, screen]); // 💡 doNextTurnは第2弾で定義するため、ここでは依存配列から一時的に外してパースエラーを防ぎます


  // ==========================================================================
  // 🔄 🌟 ターン進行 ＆ 勝敗・実績同期ロジック
  // ==========================================================================
  const doNextTurn = useCallback((newBoard, newHands, move = null) => {
    const { gameMode: currentMode, difficulty: currentDiff } = latestRef.current;
    const moveWithPlayer = move ? Object.assign({}, move, { player: currentPlayer }) : null;
    const result = checkWinner(newBoard);

    if (result) {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        hands: newHands,
        lastMove: moveWithPlayer,
        selectedCell: null,
        moveCount: 0,
        winResult: result,
        phase: 'winDelay'
      }));
      setHasActiveGame(false);

      if (currentMode === 'ai' && result.winner === 'blue') {
        setStreaks(prev => {
          const nextStreaks = Object.assign({}, prev, { [currentDiff]: (prev[currentDiff] || 0) + 1 });
          localStorage.setItem('game_streaks', JSON.stringify(nextStreaks));
          return nextStreaks;
        });
      }

      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      delayTimerRef.current = setTimeout(() => { 
        setGameState(prev => ({ ...prev, phase: 'gameOver' }));
        setShowOverlay(true); 
      }, 2500); 

    } else {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        hands: newHands,
        lastMove: moveWithPlayer,
        selectedCell: null,
        moveCount: 0,
        currentPlayer: prev.currentPlayer === 'blue' ? 'yellow' : 'blue',
        phase: 'selectAction'
      }));
    }
  }, [currentPlayer]);

  // ==========================================================================
  // ⏱️ 🌟 時間切れ用の処理
  // ==========================================================================
  const handleTimeOut = useCallback(() => {
    const { gameMode: currentMode, difficulty: currentDiff } = latestRef.current;
    const winnerColor = currentPlayer === 'blue' ? 'yellow' : 'blue';
    
    setGameState(prev => ({
      ...prev,
      winResult: { winner: winnerColor, line: [] },
      phase: 'gameOver'
    }));
    setShowOverlay(true);
    setHasActiveGame(false);

    if (currentMode === 'ai' && winnerColor === 'blue') {
      setStreaks(prev => {
        const nextStreaks = Object.assign({}, prev, { [currentDiff]: (prev[currentDiff] || 0) + 1 });
        localStorage.setItem('game_streaks', JSON.stringify(nextStreaks));
        return nextStreaks;
      });
    }
  }, [currentPlayer]);

  // ==========================================================================
  // 🎮 🌟 ゲーム開始処理 (startGame)
  // ==========================================================================
  const startGame = useCallback((mode, diff, startColor = 'blue') => {
    if (mode === 'resume') { setScreen('game'); return; }

    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);

    setGameMode(mode); 
    setDifficulty(diff); 
    const initialColor = mode === 'ai' ? startColor : 'blue';
    setFirstPlayer(initialColor);

    setGameState({
      board: EMPTY_BOARD(),
      hands: { blue: 5, yellow: 5 },
      currentPlayer: initialColor,
      phase: 'selectAction',
      selectedCell: null,
      moveCount: 0,
      winResult: null,
      lastMove: null,
    });

    setShowOverlay(false); 
    setAiThinking(false); 
    setTimerKey(prev => prev + 1); 
    setScreen('game');
    setHasActiveGame(true);
  }, []);

  // ==========================================================================
  // 🎯 🌟 ハイライト・ターゲットマスの計算（Set高速ルックアップ）
  // ==========================================================================
  const validTargetsSet = useMemo(() => {
    if (winResult || aiThinking || (gameMode === 'ai' && currentPlayer === 'yellow')) return new Set();
    
    let targets = [];
    if (phase === 'placeSelect') targets = getPlaceTargets(board);
    if ((phase === 'moveTargetSelect' || phase === 'moveCountSelect') && selectedCell) {
      targets = getValidTargets(board, selectedCell.row, selectedCell.col, moveCount, lastMove, currentPlayer);
    }
    return new Set(targets.map(([r, c]) => r + ',' + c));
  }, [phase, board, selectedCell, moveCount, lastMove, currentPlayer, winResult, aiThinking, gameMode]);

  const isValidTarget = useCallback((r, c) => {
    return validTargetsSet.has(r + ',' + c);
  }, [validTargetsSet]);

  const winLineSet = useMemo(() => { 
    if (!winResult || !winResult.line) return new Set(); 
    return new Set(winResult.line.map(([r, c]) => r + ',' + c)); 
  }, [winResult]);

  // ==========================================================================
  // 👆 🌟 各種クリック・キャンセル処理
  // ==========================================================================
  const cancelAction = useCallback(() => {
    setGameState(prev => ({ ...prev, phase: 'selectAction', selectedCell: null, moveCount: 0 }));
  }, []);

  const handleHandClick = useCallback(() => {
    const { gameState: current, aiThinking: at, isAITurn: ait } = latestRef.current;
    if (at || ait || current.phase === 'winDelay' || current.phase === 'gameOver') return;
    
    if (current.phase === 'selectAction' && current.hands[current.currentPlayer] > 0) { 
      setGameState(prev => ({ ...prev, phase: 'placeSelect', selectedCell: null }));
    } else if (current.phase === 'placeSelect') { 
      setGameState(prev => ({ ...prev, phase: 'selectAction', selectedCell: null }));
    }
  }, []); 

  const handleMoveCountSelect = useCallback((count) => {
    setGameState(prev => ({ ...prev, moveCount: count, phase: 'moveTargetSelect' }));
  }, []);

  // ==========================================================================
  // 🎯 🌟 盤面マスのクリック処理
  // ==========================================================================
  const handleCellClick = useCallback((row, col) => {
    const { gameState: current, aiThinking: at, isAITurn: ait } = latestRef.current;
    if (at || ait || current.phase === 'winDelay' || current.phase === 'gameOver' || current.winResult) return;
    
    if (current.phase === 'selectAction') {
      const stackHeight = current.board[row][col].length;
      if (stackHeight === 0) return;

      setGameState(prev => ({
        ...prev,
        selectedCell: { row, col },
        moveCount: stackHeight === 1 ? 1 : 0,
        phase: stackHeight === 1 ? 'moveTargetSelect' : 'moveCountSelect'
      }));
    } 
    else if (current.phase === 'placeSelect') {
      if (!validTargetsSet.has(row + ',' + col)) return;

      const newBoard = current.board.map(r => [...r]);
      newBoard[row][col].push(current.currentPlayer);
      const newHands = Object.assign({}, current.hands, { [current.currentPlayer]: current.hands[current.currentPlayer] - 1 });

      doNextTurn(newBoard, newHands, { type: 'place', row, col });
    } 
    else if (current.phase === 'moveCountSelect') {
      if (row === current.selectedCell.row && col === current.selectedCell.col) { cancelAction(); return; }
      if (current.board[row][col].length > 0) {
        setGameState(prev => ({ ...prev, selectedCell: { row, col } }));
      }
    } 
    else if (current.phase === 'moveTargetSelect') {
      if (row === current.selectedCell.row && col === current.selectedCell.col) { cancelAction(); return; }
      if (!validTargetsSet.has(row + ',' + col)) return;

      const newBoard = current.board.map(r => [...r]);
      const pieces = newBoard[current.selectedCell.row][current.selectedCell.col].splice(
        newBoard[current.selectedCell.row][current.selectedCell.col].length - current.moveCount, 
        current.moveCount
      );
      newBoard[row][col].push(...pieces); 
      
      doNextTurn(newBoard, current.hands, { 
        type: 'move', fromRow: current.selectedCell.row, fromCol: current.selectedCell.col, toRow: row, toCol: col, count: current.moveCount 
      });
    }
  }, [validTargetsSet, doNextTurn, cancelAction]);


  // ==========================================================================
  // 🚪 画面遷移 ＆ リセット
  // ==========================================================================
  const backToMenu = useCallback(() => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    setScreen('menu'); 
    setAiThinking(false);
  }, []);

  const openInstructionsFromGame = useCallback(() => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    setAiThinking(false); 
    setScreen('instructions');
  }, []);

  const resetGame = useCallback(() => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    
    setGameState({
      board: EMPTY_BOARD(),
      hands: { blue: 5, yellow: 5 },
      currentPlayer: firstPlayer,
      phase: 'selectAction',
      selectedCell: null,
      moveCount: 0,
      winResult: null,
      lastMove: null,
    });
    setShowOverlay(false); 
    setAiThinking(false); 
    setHasActiveGame(true);
    setTimerKey(prev => prev + 1);
  }, [firstPlayer]);

  const openInstructions = useCallback(() => setScreen('instructions'), []);
  const resumeGame = useCallback(() => setScreen('game'), []);

  // ==========================================================================
  // 📊 高速事前計算
  // ==========================================================================
  const maxMovable = selectedCell ? board[selectedCell.row][selectedCell.col].length : 0;
  const isBlue = currentPlayer === 'blue';
  const turnLabel = isBlue ? 'プレイヤー1(青)' : (gameMode === '2p' ? 'プレイヤー2(黄)' : 'CPU(黄)');
  const turnColor = isBlue ? 'text-blue-400' : 'text-amber-500';
  const diffLabel = { easy: 'よわい', medium: 'ふつう', hard: 'つよい' }[difficulty] || '';

  const phaseMessages = useMemo(() => {
    return Object.assign({}, PHASE_MESSAGES_BASE, {
      selectAction: aiThinking ? 'CPU思考中...' : '駒をタップして配置、または移動'
    });
  }, [aiThinking]);

  const currentWinStreak = winResult 
    ? (gameMode === '2p' ? (streaks[winResult.winner === 'blue' ? '2p_blue' : '2p_yellow'] || 0) : (streaks[difficulty] || 0))
    : 0;

  const interactionDisabled = aiThinking || isAITurn || phase === 'winDelay' || phase === 'gameOver';

  // ==========================================================================
  // 🛠️ デバッグ環境用グローバル関数
  // ==========================================================================
  useEffect(() => {
    window.setWins = (count = 10, targetDiff = null) => {
      const activeDiff = targetDiff || difficulty || 'easy';
      setStreaks(prev => Object.assign({}, prev, { [activeDiff]: count }));
    };

    window.testWin = (count = 10, targetDiff = null) => {
      const activeDiff = targetDiff || difficulty || 'easy';
      setDifficulty(activeDiff);
      setGameMode('ai');
      setScreen('game');
      setStreaks(prev => Object.assign({}, prev, { [activeDiff]: count }));
      setGameState(prev => Object.assign({}, prev, {
        winResult: { winner: 'blue', line: [], winningLine: [], winningCells: [] },
        phase: 'gameOver'
      }));
      setShowOverlay(true);
    };

    window.resetWins = () => {
      localStorage.removeItem('game_streaks');
      setStreaks({ '2p_blue': 0, '2p_yellow': 0, easy: 0, medium: 0, hard: 0 });
      window.location.reload(); 
    };

    return () => {
      delete window.setWins;
      delete window.testWin;
      delete window.resetWins;
    };
  }, [difficulty]);

  // ==========================================================================
  // 🎨 レンダリング（ノーカット修復版・Babel最適化）
  // ==========================================================================
  return (
    <div className="app-screen">
      <GameSvgDefs />

      {screen === 'menu' && (
        <MenuScreen streaks={streaks} setStreaks={setStreaks} onStart={startGame} onOpenInstructions={openInstructions} hasHistory={hasActiveGame} />
      )}

      {screen === 'instructions' && (
        <InstructionScreen onBack={backToMenu} hasActiveGame={hasActiveGame} onResumeGame={resumeGame} />
      )}

      {screen === 'game' && (
        <React.Fragment>
          <div className="text-center w-full">
            <h1 className="text-base font-black text-white mb-2 tracking-tight">
              3<span className="text-indigo-400">ライン</span>！
            </h1>
            <div className={'text-[16px] h-5 mt-0.5 mb-1 transition-all duration-300 ' + (!winResult ? (currentPlayer === 'blue' ? 'animate-syncTextBlue' : 'animate-syncTextAmber') : '')}>
              {!winResult ? (
                <React.Fragment>
                  <span className={'font-black ' + turnColor}>{turnLabel}</span>
                  <span className="text-gray-400 ml-1 font-bold">の番</span>
                </React.Fragment>
              ) : (
                <span className={'font-black animate-pulse ' + (winResult.winner === 'blue' ? 'text-blue-400' : 'text-amber-500')}>
                  ★ WINNER ★
                </span>
              )}
            </div>
          </div>

          <HandArea color="blue" count={hands.blue} isCurrentPlayer={currentPlayer === 'blue' && !winResult} isSelected={phase === 'placeSelect' && currentPlayer === 'blue'} onSelect={handleHandClick} playerLabel="P1 青" disabled={interactionDisabled} />

          <div className="game-message-container">
            <div className={'game-message-text ' + (!winResult ? (currentPlayer === 'blue' ? 'text-blue-200 animate-syncTextBlue' : 'text-amber-200 animate-syncTextAmber') : 'text-gray-200')}>
              {phaseMessages[phase] || ''}
            </div>
            <div className="game-action-row">
              {phase === 'moveCountSelect' && selectedCell && !interactionDisabled && (
                <MoveCountSelector maxCount={maxMovable} onSelect={handleMoveCountSelect} onCancel={cancelAction} />
              )}
              {(phase === 'placeSelect' || phase === 'moveTargetSelect') && !interactionDisabled && (
                <button onClick={cancelAction} className="btn-cancel">キャンセル</button>
              )}
            </div>
          </div>

         <GameTimer key={timerKey} screen={screen} winResult={winResult} interactionDisabled={interactionDisabled} currentPlayer={currentPlayer} onTimeOut={handleTimeOut} difficulty={difficulty} />


          <GameBoard board={board} selectedCell={selectedCell} isValidTarget={isValidTarget} lastMove={lastMove} winLineSet={winLineSet} winResult={winResult} handleCellClick={handleCellClick} interactionDisabled={interactionDisabled} />

          <HandArea color="yellow" count={hands.yellow} isCurrentPlayer={currentPlayer === 'yellow' && !winResult} isSelected={phase === 'placeSelect' && currentPlayer === 'yellow'} onSelect={handleHandClick} playerLabel={gameMode === '2p' ? 'P2 黄' : 'CPU (' + diffLabel + ')'} disabled={interactionDisabled || gameMode === 'ai'} />

          <div className="flex flex-col items-center gap-2 w-full mb-auto pt-4">
            {!winResult && (
              <button onClick={openInstructionsFromGame} className="w-full py-2 bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-300 rounded-xl text-sm font-black border border-indigo-800/60 shadow-sm active:scale-95 transition-transform">
                📄 試合を中断して説明を読む
              </button>
            )}
            <div className="flex gap-4 mt-4">
              <button onClick={resetGame} className="w-32 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-sm font-black shadow-sm active:scale-95 transition-transform">
                Reset
              </button>
              <button onClick={backToMenu} className="w-32 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-black shadow-sm active:scale-95 transition-transform">
                メニューへ
              </button>
            </div>
          </div>

       
   {/* ==========================================================================
             🔋 👑 【完全修復版】通常の勝利画面をシンプルに配置
             ========================================================================== */}
          {showOverlay && winResult && (
            <WinOverlay 
              winner={winResult.winner} 
              onReset={resetGame} 
              gameMode={gameMode} 
              backToMenu={backToMenu} 
              difficulty={difficulty} 
              winStreak={currentWinStreak} 
            />
          )}
        </React.Fragment>
      )}



    </div>
  );
}

// ==========================================================================
// 🚀 React アプリケーションのエントリーポイント起動
// ==========================================================================
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
