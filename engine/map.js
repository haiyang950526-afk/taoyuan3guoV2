// 引擎 · 地图：渲染、行走、NPC、传送、遇敌、宝箱、剧情触发器
"use strict";

// 地图字符说明：
//   # 城墙  B 建筑  D 店门  G 城门  T 树  W 水  R 山石/洞壁  P 宫殿
//   C 山洞入口  F 洞内地面  E 洞内出口  M 渡口木板  . 草地  , 道路（不遇敌）
//   L 室内木地板  X 殿柱
const TILE_META = {
  "#": { pass: false, name: "wall" },
  "B": { pass: false, name: "building" },
  "D": { pass: false, name: "door" },
  "G": { pass: true,  name: "gate" },
  "T": { pass: false, name: "tree" },
  "W": { pass: false, name: "water" },
  "R": { pass: false, name: "rock" },
  "C": { pass: true,  name: "cave_in" },
  "F": { pass: true,  name: "cave_floor" },
  "E": { pass: true,  name: "cave_out" },
  "P": { pass: false, name: "palace" },
  "M": { pass: true,  name: "dock" },
  ".": { pass: true,  name: "grass" },
  ",": { pass: true,  name: "road" },
  "L": { pass: true,  name: "floor" },
  "X": { pass: false, name: "pillar" },
};

// ---------------- 条件 / 文本 / 动作 ----------------
// 条件：{flag, is} | {flag, not} | {flag, in:[...]} | {flag, exists:true}
function evalCond(cond) {
  if (!cond) return true;
  const v = S.flags[cond.flag];
  if (cond.exists) return v !== undefined;
  if (cond.is !== undefined) return v === cond.is;
  if (cond.not !== undefined) return v !== cond.not;
  if (cond.in) return cond.in.indexOf(v) >= 0;
  return true;
}

// 文本路径："ch01.taoqianAsk" → TEXT.ch01.taoqianAsk
function resolveText(path) {
  if (Array.isArray(path)) return path;
  const parts = path.split(".");
  let t = TEXT;
  for (const p of parts) t = t && t[p];
  return t || ["……"];
}

// 顺序执行动作列表（任务链状态机的执行器）
function runActions(list, done, i) {
  i = i || 0;
  if (!list || i >= list.length) { if (done) done(); return; }
  const a = list[i];
  const next = () => runActions(list, done, i + 1);
  if (a.set) { for (const k in a.set) S.flags[k] = a.set[k]; hud(); next(); }
  else if (a.inc) { for (const k in a.inc) S.flags[k] = (S.flags[k] || 0) + a.inc[k]; hud(); next(); }
  else if (a.chapter) {
    // 章节切换 = 上一章通关：先放本章通关插画
    const cleared = S.chapter;
    S.chapter = a.chapter; hud();
    if (CHAPTERS[cleared] && cleared !== a.chapter) {
      showIllust("assets/illust/" + cleared + ".png",
        CHAPTERS[cleared].name + " · 完", next);
    } else next();
  }
  else if (a.gold) { S.gold += a.gold; hud(); next(); }
  else if (a.give) { addItem(a.give[0], a.give[1] || 1); next(); }
  else if (a.giveEquip) { addEquipInst(a.giveEquip); toast("获得装备：" + a.giveEquip + "（已入仓库）"); next(); }
  // 终章谢幕：先放五丈原谢幕插画，再回标题页
  else if (a.theEnd) {
    showIllust("assets/illust/end.png", "星落秋风五丈原", () => {
      S.mode = "title";
      show("scr-title");
      toast("感谢游玩《桃园三国》！");
      next();
    });
  }
  else if (a.toast) { toast(a.toast); next(); }
  else if (a.say) { say(resolveText(a.say), next); }
  else if (a.warp) { warpTo(a.warp.map, a.warp.x, a.warp.y); next(); }
  else if (a.join) { joinHero(a.join); next(); }
  else if (a.joinBench) { joinBench(a.joinBench); next(); }
  else if (a.leave) { leaveHero(a.leave); next(); }
  else if (a.healAll) { S.party.forEach(h => { h.hp = h.maxHp; h.mp = h.maxMp; }); next(); }
  // 分线叙事：暂存当前队伍，换临时队伍（剧情结束用 partyRestore 还原）
  else if (a.partySwap) {
    S.stash = { party: S.party, bench: S.bench, strategist: S.strategist };
    const lv = a.partySwap.lv || S.party.reduce((m, h) => Math.max(m, h.lv), 1);
    S.party = a.partySwap.members.map(k => newHero(k, lv));
    S.bench = []; S.strategist = null;
    toast("剧情整备中……");
    next();
  }
  else if (a.partyRestore) {
    if (S.stash) {
      S.party = S.stash.party;
      S.bench = S.stash.bench;
      S.strategist = S.stash.strategist;
      S.stash = null;
      toast("队伍回归。");
    }
    next();
  }
  // 小游戏：hunt 围猎 / collect 接箭（见 engine/minigame.js）
  else if (a.minigame) { startMinigame(a.minigame, next); }
  // 对话选项（仅 flavor：选项不影响结果，只改一句台词）
  else if (a.ask) { askChoice(a.ask, next); }
  else if (a.battle) { startBattle(a.battle, { onWin: a.onWin, onRecruit: a.onRecruit, onLoss: a.onLoss, onForceEnd: a.onForceEnd, after: next }); }
  else next();
}

// ---------------- 地图工具 ----------------
function mapDef() { return MAPS[S.map]; }
function tileAt(x, y) {
  const g = mapDef().grid;
  if (y < 0 || y >= g.length || x < 0 || x >= g[y].length) return "#";
  // 条件地块覆盖（tileOverrides: [{x, y, ch, if, else?}]）：
  // 条件成立显示 ch（如藏宝洞口），否则显示 else 或原格——用于"剧情触发后才出现"的地形
  const ov = mapDef().tileOverrides && mapDef().tileOverrides.find(o => o.x === x && o.y === y);
  if (ov) return evalCond(ov.if) ? ov.ch : (ov.else || g[y][x]);
  return g[y][x];
}
function npcVisible(n) {
  return evalCond(n.appearIf) && !(n.hideIf && evalCond(n.hideIf));
}
function npcAt(x, y) {
  return mapDef().npcs.find(n => n.x === x && n.y === y && npcVisible(n));
}
function chestAt(x, y) {
  const m = mapDef();
  if (!m.chests) return null;
  return m.chests.find(c => c.x === x && c.y === y &&
    !S.flags["chest_" + S.map + "_" + c.id]);
}
function passable(x, y) {
  return TILE_META[tileAt(x, y)].pass && !npcAt(x, y) && !chestAt(x, y);
}
function transitionAt(x, y) {
  return mapDef().transitions.find(t => t.x === x && t.y === y && evalCond(t.if));
}

function warpTo(mapKey, x, y) {
  S.map = mapKey; S.px = x; S.py = y;
  S.steps = 99;
  S.moving = null;
  // 传送后锁定：松开方向键前不再移动，防止出城门时长按方向被直接带回城（城门循环）
  S.warpLock = true;
  hud();
}

// ---------------- 渲染 ----------------
const TILE_COLORS = {
  "#": ["#4a5060", "#3a3f4c"], "B": ["#8a6a45", "#6a4f32"],
  "D": ["#3a2a1a", "#2a1f12"], "G": ["#6a7288", "#4a5060"],
  "T": ["#3d7a3d", "#2a5a2a"], "W": ["#3a6ac0", "#2a4f96"],
  "R": ["#6a5a4a", "#4f4336"], "C": ["#1a1410", "#6a5a4a"],
  "F": ["#3a332c", "#332c26"], "E": ["#c9b89a", "#3a332c"],
  "P": ["#7a5a8a", "#5a4068"], "M": ["#a8845a", "#8a6a45"],
  ".": ["#4f8a45", "#467a3d"], ",": ["#a89468", "#9a885e"],
  "L": ["#9a7a52", "#8a6a45"], "X": ["#7a4a3a", "#5a3428"],
};

function draw() {
  if (S.mode === "title") return;
  if (S.mode === "battle") { drawBattle(); return; }
  if (S.mode === "minigame") { drawMinigame(); return; }
  const c = cam();
  ctx.clearRect(0, 0, VW * TILE, VH * TILE);
  for (let ty = 0; ty < VH; ty++) {
    for (let tx = 0; tx < VW; tx++) {
      const ch = tileAt(c.x + tx, c.y + ty);
      const col = TILE_COLORS[ch] || TILE_COLORS["."];
      ctx.fillStyle = col[0];
      ctx.fillRect(tx * TILE, ty * TILE, TILE, TILE);
      // 简单纹理
      ctx.fillStyle = col[1];
      if (ch === "T") { ctx.beginPath(); ctx.arc(tx*TILE+16, ty*TILE+14, 11, 0, Math.PI*2); ctx.fill(); }
      else if (ch === "B") ctx.fillRect(tx * TILE, ty * TILE, TILE, 8);
      else if (ch === "P") { ctx.fillRect(tx*TILE, ty*TILE, TILE, 10); ctx.fillRect(tx*TILE+6, ty*TILE+18, 20, 4); }
      else if (ch === "R") { ctx.fillRect(tx*TILE+4, ty*TILE+6, 10, 8); ctx.fillRect(tx*TILE+18, ty*TILE+18, 9, 7); }
      else if (ch === "W" && (tx + ty) % 2 === 0) ctx.fillRect(tx*TILE+6, ty*TILE+14, 20, 2);
      else if (ch === "M") ctx.fillRect(tx*TILE+2, ty*TILE+8, 28, 3);
      else if (ch === ".") { ctx.fillRect(tx*TILE+8, ty*TILE+9, 2, 4); ctx.fillRect(tx*TILE+22, ty*TILE+20, 2, 4); }
      else if (ch === "C") { ctx.beginPath(); ctx.arc(tx*TILE+16, ty*TILE+18, 10, Math.PI, 0); ctx.fill(); }
      else if (ch === "D") ctx.fillRect(tx*TILE+10, ty*TILE+4, 12, 26);
      else if (ch === "G") { ctx.fillRect(tx*TILE+4, ty*TILE+2, 24, 6); }
      else if (ch === "E") { ctx.fillRect(tx*TILE+8, ty*TILE+8, 16, 4); ctx.fillRect(tx*TILE+8, ty*TILE+16, 16, 4); }
      else if (ch === ",") { ctx.fillRect(tx*TILE+2, ty*TILE+6, 12, 9); ctx.fillRect(tx*TILE+18, ty*TILE+17, 12, 9); }
      else if (ch === "L") ctx.fillRect(tx*TILE, ty*TILE+15, TILE, 2);
      else if (ch === "X") { ctx.beginPath(); ctx.arc(tx*TILE+16, ty*TILE+16, 10, 0, Math.PI*2); ctx.fill(); }
    }
  }
  // 建筑招牌（数据驱动：地图可选字段 signs: [{x, y, text, color}]，画在 tile 之上）
  for (const sg of (mapDef().signs || [])) {
    const sgx = (sg.x - c.x) * TILE, sgy = (sg.y - c.y) * TILE;
    if (sgx < -TILE || sgy < -TILE || sgx > VW * TILE || sgy > VH * TILE) continue;
    ctx.fillStyle = sg.color || "#ffd166";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(sg.text, sgx + TILE / 2, sgy + TILE / 2);
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
  }
  // 宝箱（已开启的画成空箱，仍可通行）
  for (const ch2 of (mapDef().chests || [])) {
    const opened = !!S.flags["chest_" + S.map + "_" + ch2.id];
    const bx = (ch2.x - c.x) * TILE, by = (ch2.y - c.y) * TILE;
    ctx.fillStyle = opened ? "#5a4530" : "#8a5a2a";
    ctx.beginPath();
    ctx.roundRect(bx + 5, by + 10, 22, 16, 3);
    ctx.fill();
    ctx.fillStyle = opened ? "#7a6a50" : "#e8c84a";
    ctx.fillRect(bx + 14, by + 10, 4, 16);
  }
  // NPC
  for (const n of mapDef().npcs) {
    if (!npcVisible(n)) continue;
    drawMapSprite((n.x - c.x) * TILE, (n.y - c.y) * TILE, npcLook(n), { x: 0, y: 1 });
  }
  // 玩家（补间）
  let rx = S.px, ry = S.py;
  if (S.moving) {
    const t = Math.min(1, (performance.now() - S.moving.t0) / 130);
    rx = S.moving.fx + (S.moving.tx - S.moving.fx) * t;
    ry = S.moving.fy + (S.moving.ty - S.moving.fy) * t;
  }
  drawMapSprite((rx - c.x) * TILE, (ry - c.y) * TILE, partyLeaderLook(), S.dir);
}

// ---------------- 行走 ----------------
function stepLogic() {
  if (S.moving && performance.now() - S.moving.t0 >= 130) {
    S.px = S.moving.tx; S.py = S.moving.ty;
    S.moving = null;
    afterStep();
  }
  if (S.moving) return;
  // 传送后锁定：松开方向键/摇杆前不移动（见 warpTo）
  if (S.warpLock) {
    if (!S.held.x && !S.held.y) S.warpLock = false;
    return;
  }
  if (!S.held.x && !S.held.y) return;
  if (performance.now() - S.lastStep < 140) return;
  S.lastStep = performance.now();
  S.dir = { x: S.held.x, y: S.held.y };
  const nx = S.px + S.dir.x, ny = S.py + S.dir.y;
  if (!passable(nx, ny)) return;
  S.moving = { fx: S.px, fy: S.py, tx: nx, ty: ny, t0: performance.now() };
}

function afterStep() {
  // 传送点
  const tr = transitionAt(S.px, S.py);
  if (tr) { warpTo(tr.to.map, tr.to.x, tr.to.y); return; }
  const m = mapDef();
  // 剧情触发器（踩点）
  const trig = (m.triggers || []).find(t => t.x === S.px && t.y === S.py && evalCond(t.if));
  if (trig) {
    // 限时脱出：到达出口，解除倒计时
    if (trig.escapeGoal && S.escape) {
      S.escape = null;
      toast("摆脱了追兵！");
    }
    // 限时脱出：启动倒计时（rounds 按步数计，1 步 = 1 回合）
    if (trig.escapeTimer) {
      S.escape = { left: trig.escapeTimer.rounds, penalty: trig.escapeTimer.penalty,
        onWin: trig.escapeTimer.onWin || null };
      toast("追兵将至——限 " + trig.escapeTimer.rounds + " 步内抵达出口！");
    }
    if (trig.do) { runActions(trig.do); return; }
  }
  // 限时脱出倒计时推进：归零且未达出口 → 强制遇敌
  if (S.escape) {
    S.escape.left--;
    if (S.escape.left <= 0) {
      const penalty = S.escape.penalty, onWin = S.escape.onWin;
      S.escape = null;
      blog2startBattle(penalty, onWin);
      return;
    }
  }
  // Boss 触发（走到相邻格）
  const boss = m.npcs.find(n => n.boss && npcVisible(n) &&
    Math.abs(n.x - S.px) + Math.abs(n.y - S.py) === 1);
  if (boss) { triggerBoss(boss); return; }
  // 随机遇敌
  S.steps++;
  if ((m.encounterTiles || []).indexOf(tileAt(S.px, S.py)) >= 0 &&
      S.steps > 4 && Math.random() < (m.encounterRate || 0)) {
    S.steps = 0;
    const grp = m.encounterGroups[Math.floor(Math.random() * m.encounterGroups.length)];
    startBattle(null, { enemies: grp });
  }
}

// 脱出失败的伏击战（编组 key 或敌人数组均可；可带 onWin 追加奖励）
function blog2startBattle(penalty, onWin) {
  if (typeof penalty === "string") startBattle(penalty, onWin ? { onWin: onWin } : undefined);
  else startBattle(null, { enemies: penalty, onWin: onWin });
}

function triggerBoss(n) {
  const grp = BATTLE_GROUPS[n.boss];
  const go = () => startBattle(n.boss, {
    onWin: n.onWin, onRecruit: n.onRecruit, onLoss: n.onLoss, onForceEnd: n.onForceEnd });
  if (grp.pre) say(resolveText(grp.pre), go);
  else go();
}

// ---------------- 交互（A键） ----------------
function interact() {
  const x = S.px + S.dir.x, y = S.py + S.dir.y;
  // 宝箱：面对按 A 开启
  const chest = chestAt(x, y);
  if (chest) {
    S.flags["chest_" + S.map + "_" + chest.id] = true;
    if (chest.gold) { S.gold += chest.gold; toast("打开宝箱：获得 " + chest.gold + " 金！"); }
    if (chest.items) for (const id in chest.items) {
      // 装备类进仓库（实例化），消耗品进背包
      if (ITEMS[id] && ITEMS[id].type !== "item" && ITEMS[id].type !== "book") {
        for (let i = 0; i < chest.items[id]; i++) addEquipInst(id);
        toast("打开宝箱：获得 " + id + "！");
      } else addItem(id, chest.items[id]);
    }
    hud();
    return;
  }
  const n = npcAt(x, y);
  if (!n) return;
  if (n.shop) { openShop(n.shop); return; }
  // 设施：编成所（第五章起开放，由 flags.sys_camp 门控）/ 铁匠铺（只存在于主城地图）
  if (n.facility === "camp") {
    if (!S.flags.sys_camp) {
      say(["（老兵：编成所尚未开放——待你们到了洛阳，再来整编不迟。）"]);
      return;
    }
    openCamp(); return;
  }
  if (n.facility === "smith") { openSmith(); return; }
  // 酒馆（樗蒲赌局）/ 训练所（花钱买经验），面板见 ui.js
  if (n.facility === "tavern") { openGamble(); return; }
  if (n.facility === "dojo") { openDojo(); return; }
  if (n.boss) { triggerBoss(n); return; }
  if (n.branches) {
    const br = n.branches.find(b => !b.if || evalCond(b.if));
    if (br) {
      const acts = (br.do || []).slice();
      if (br.say) acts.unshift({ say: br.say });
      if (br.ask) acts.unshift({ ask: br.ask });
      runActions(acts);
      return;
    }
  }
  if (n.lines) say(n.lines);
  else if (n.linesKey) say(resolveText(n.linesKey));
}
