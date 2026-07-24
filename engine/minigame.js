// 引擎 · 小游戏框架（第三、八章用）
// 实例：
//   hunt    许田围猎：20 秒内准星射鹿（色块），命中计分，分数 × goldPerPoint 换算赏金
//   collect 草船借箭：30 秒内左右移动接下落箭矢，接住计分（箭×N 由剧情动作发放）
// 剧情动作 schema：{minigame: {type: "hunt"|"collect", duration?: 秒}, ...}
// 结束后自动结算赏金（如配置）并继续后续剧情动作。
"use strict";

const MINIGAMES = {
  hunt:    { name: "许田围猎", duration: 20, goldPerPoint: 20 },
  collect: { name: "草船借箭", duration: 30, goldPerPoint: 0, rewardItem: "箭" },
};

const MG = { type: null, t0: 0, dur: 0, score: 0, objs: [], px: 0, py: 0,
             after: null, lastSpawn: 0, reward: 0 };

function startMinigame(cfg, after) {
  const def = MINIGAMES[cfg.type];
  if (!def) { if (after) after(); return; }
  MG.type = cfg.type;
  MG.dur = (cfg.duration || def.duration) * 1000;
  MG.t0 = performance.now();
  MG.score = 0;
  MG.objs = [];
  MG.px = VW * TILE / 2;
  MG.py = VH * TILE / 2;
  MG.after = after || null;
  MG.lastSpawn = 0;
  MG.reward = def.goldPerPoint;
  S.mode = "minigame";
  toast(def.name + " 开始！");
}

// A 键：hunt 射击
function mgFire() {
  if (MG.type !== "hunt") return;
  for (const o of MG.objs) {
    if (Math.abs(o.x - MG.px) < 22 && Math.abs(o.y - MG.py) < 18) {
      o.dead = true;
      MG.score++;
      return;
    }
  }
}

function stepMinigame() {
  const now = performance.now();
  if (now - MG.t0 >= MG.dur) { endMinigame(); return; }
  const W = VW * TILE, H = VH * TILE;
  // 玩家/准星移动
  const sp = 4;
  MG.px = Math.max(10, Math.min(W - 10, MG.px + S.held.x * sp));
  if (MG.type === "hunt") MG.py = Math.max(10, Math.min(H - 10, MG.py + S.held.y * sp));
  else MG.py = H - 40;
  // 生成
  const gap = MG.type === "hunt" ? 900 : 650;
  if (now - MG.lastSpawn > gap) {
    MG.lastSpawn = now;
    if (MG.type === "hunt") {
      MG.objs.push({ x: 30 + Math.random() * (W - 60), y: 30 + Math.random() * (H - 100),
        vx: (Math.random() - 0.5) * 2.4, vy: (Math.random() - 0.5) * 2.4 });
    } else {
      MG.objs.push({ x: 20 + Math.random() * (W - 40), y: -10, vy: 2 + Math.random() * 1.5 });
    }
  }
  // 运动与判定
  for (const o of MG.objs) {
    if (MG.type === "hunt") {
      o.x += o.vx; o.y += o.vy;
      if (o.x < 12 || o.x > W - 12) o.vx = -o.vx;
      if (o.y < 12 || o.y > H - 60) o.vy = -o.vy;
    } else {
      o.y += o.vy;
      if (o.y >= MG.py && Math.abs(o.x - MG.px) < 24) { o.dead = true; MG.score++; }
      else if (o.y > H) o.dead = true;
    }
  }
  MG.objs = MG.objs.filter(o => !o.dead);
}

function endMinigame() {
  const score = MG.score, reward = score * MG.reward;
  S.mode = "map";
  if (reward > 0) { S.gold += reward; }
  // 计分道具（草船借箭：箭×N）
  let itemMsg = "";
  const def = MINIGAMES[MG.type];
  if (def.rewardItem && score > 0) {
    S.inv[def.rewardItem] = (S.inv[def.rewardItem] || 0) + score;
    itemMsg = "，得 " + def.rewardItem + "×" + score;
  }
  hud();
  toast("得分 " + score + (reward > 0 ? "，赏金 " + reward + " 金" : "") + itemMsg);
  const after = MG.after; MG.after = null; MG.type = null;
  if (after) after();
}

function drawMinigame() {
  const W = VW * TILE, H = VH * TILE;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = MG.type === "hunt" ? "#2c3a2a" : "#16283e";
  ctx.fillRect(0, 0, W, H);
  // 目标物
  for (const o of MG.objs) {
    if (MG.type === "hunt") {
      ctx.fillStyle = "#c98a4b";
      ctx.beginPath();
      ctx.roundRect(o.x - 14, o.y - 10, 28, 20, 6);
      ctx.fill();
      ctx.fillStyle = "#e8c49a";
      ctx.fillRect(o.x + 8, o.y - 16, 8, 8);
    } else {
      ctx.fillStyle = "#d8d8e8";
      ctx.fillRect(o.x - 1, o.y - 8, 3, 16);
      ctx.fillStyle = "#c03a3a";
      ctx.fillRect(o.x - 3, o.y + 6, 7, 4);
    }
  }
  // 玩家 / 准星
  if (MG.type === "hunt") {
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(MG.px, MG.py, 14, 0, Math.PI * 2);
    ctx.moveTo(MG.px - 20, MG.py); ctx.lineTo(MG.px + 20, MG.py);
    ctx.moveTo(MG.px, MG.py - 20); ctx.lineTo(MG.px, MG.py + 20);
    ctx.stroke();
  } else {
    ctx.fillStyle = "#8a6a45";
    ctx.beginPath();
    ctx.roundRect(MG.px - 26, MG.py, 52, 14, 6);
    ctx.fill();
  }
  // 计时/计分
  const left = Math.max(0, Math.ceil((MG.dur - (performance.now() - MG.t0)) / 1000));
  ctx.fillStyle = "#e8ecf4";
  ctx.font = "16px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(MINIGAMES[MG.type].name + "　得分 " + MG.score + "　剩余 " + left + " 秒", 12, 24);
}

if (typeof module !== "undefined") module.exports = { MINIGAMES: MINIGAMES };
