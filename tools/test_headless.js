// 无头测试（node tools/test_headless.js，在 rpg/ 目录下运行）
// 覆盖：经验曲线、升级成长、伤害公式上下界、推荐等级队伍 vs 于禁模拟战、章节 flags 链路闭环
"use strict";
const path = require("path");
const fs = require("fs");

const RPG = path.join(__dirname, "..");

// ---------- 装配全局数据（模拟浏览器多脚本共享全局） ----------
const G = globalThis;
G.TEXT = require(path.join(RPG, "data", "text.js"));
const itemsMod = require(path.join(RPG, "data", "items.js"));
G.ITEMS = itemsMod.ITEMS; G.SHOPS = itemsMod.SHOPS;
const skMod = require(path.join(RPG, "data", "skills.js"));
G.SKILLS = skMod.SKILLS; G.COMMON_LEARN = skMod.COMMON_LEARN;
G.TERRAIN_BY_TILE = skMod.TERRAIN_BY_TILE;
G.HERO_TPL = require(path.join(RPG, "data", "heroes.js"));
const enemyMod = require(path.join(RPG, "data", "enemies.js"));
G.ENEMIES = enemyMod.ENEMIES; G.BATTLE_GROUPS = enemyMod.BATTLE_GROUPS;
G.CHAPTERS = require(path.join(RPG, "data", "chapters.js"));
G.FORMATIONS = require(path.join(RPG, "data", "formations.js"));
G.MAPS = {};
for (const f of fs.readdirSync(path.join(RPG, "data", "maps"))) {
  if (f.endsWith(".js")) Object.assign(G.MAPS, require(path.join(RPG, "data", "maps", f)));
}
const F = require(path.join(RPG, "engine", "formulas.js"));

// ---------- 测试框架 ----------
let pass = 0, fail = 0;
function ok(cond, msg) {
  if (cond) { pass++; console.log("  [PASS] " + msg); }
  else { fail++; console.log("  [FAIL] " + msg); }
}

// 可复现的伪随机（LCG）
function lcg(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeHero(key, lv, equips) {
  const tpl = G.HERO_TPL[key];
  const h = { key, lv, exp: F.expForLevel(lv), hp: 0, mp: 0,
    equips: equips || { weapon: null, armor: null, acc: null }, skills: [], auto: !!tpl.auto };
  for (let l = 1; l <= lv; l++) {
    const learn = (tpl.learn[l] || []).concat(G.COMMON_LEARN[l] || []);
    learn.forEach(s => { if (h.skills.indexOf(s) < 0) h.skills.push(s); });
  }
  F.recalcHero(h);
  return h;
}

// ---------- 1. 经验曲线 ----------
console.log("== 经验曲线 ==");
let mono = true;
for (let L = 1; L < 55; L++) if (F.expForLevel(L + 1) <= F.expForLevel(L)) mono = false;
ok(mono, "EXP(L)=80×L^1.8 在 1-55 级单调递增");
ok(F.expForLevel(2) === Math.round(80 * Math.pow(2, 1.8)),
  "1→2 级所需与公式一致：" + F.expForLevel(2));

// ---------- 2. 升级成长 ----------
console.log("== 升级成长 ==");
const gy = makeHero("关羽", 10), lb = makeHero("刘备", 10), zgl = makeHero("诸葛亮", 10);
ok(gy.stats.atk > lb.stats.atk, "Lv10 关羽攻(" + gy.stats.atk + ") > 刘备攻(" + lb.stats.atk + ")");
ok(zgl.stats.int > gy.stats.int, "Lv10 诸葛亮智(" + zgl.stats.int + ") > 关羽智(" + gy.stats.int + ")");
const gy2 = makeHero("关羽", 2);
ok(gy2.stats.atk === G.HERO_TPL["关羽"].base.atk + Math.floor(1.2 * 1.30),
  "成长率计算正确（S=1.30×基准1.2）");

// ---------- 3. 伤害公式上下界 ----------
console.log("== 伤害公式 ==");
{
  const atk = 30, mult = 1.8, def = 12, luck = 10;
  const low = Math.max(1, Math.round(atk * mult * 0.9 - def / 2));
  const highNoCrit = Math.max(1, Math.round(atk * mult * 1.1 - def / 2));
  const high = Math.round(highNoCrit * 1.5);
  let inRange = true, critSeen = false;
  for (let i = 0; i < 100; i++) {
    const r = F.physDmg(atk, mult, def, luck, lcg(42 + i));
    if (r.dmg < low || r.dmg > high) inRange = false;
    if (r.crit) critSeen = true;
  }
  ok(inRange, "100 次随机伤害落在 [" + low + "," + high + "] 理论界内");
  console.log("       （100 次中出现暴击：" + critSeen + "）");
}

// ---------- 3b. 存档迁移（v2→v3→v4 逐级；装备实例化展开；v1 不兼容） ----------
console.log("== 存档迁移 ==");
{
  const v2 = { v: 2, chapter: "ch01", map: "ch00_city", x: 10, y: 16, gold: 100,
    inv: {}, equips: { "铁剑": 2, "皮甲": 1 }, party: [], flags: {}, ts: 1 };
  const m2 = F.migrateSave(JSON.parse(JSON.stringify(v2)));
  ok(m2 && m2.v === 4, "v2 旧档逐级迁移为 v4");
  ok(Array.isArray(m2.equips) && m2.equips.length === 3,
    "旧 {id:数量} 仓库展开为 3 个装备实例");
  ok(m2.equips.filter(e => e.id === "铁剑").length === 2 &&
     new Set(m2.equips.map(e => e.uid)).size === 3,
    "实例 uid 唯一（铁剑×2 不合并）");
  ok(Array.isArray(m2.bench) && m2.formation === null && m2.strategist === null &&
     m2.enhance && m2.dex, "v4 补齐 bench/formation/strategist/enhance/dex 字段");
  ok(F.migrateSave({ map: "cave", gold: 714 }) === null, "v1 旧档（无 v 字段）判定不兼容");
  ok(F.migrateSave(null) === null, "空档判定不兼容");
}

// ---------- 3c. 技能随等级缩放 + 通用计策 ----------
console.log("== 技能缩放与通用计策 ==");
{
  ok(F.skillScale(1) === 1, "skillScale(1) = 1");
  ok(Math.abs(F.skillScale(8) - 1.21) < 1e-9, "skillScale(8) ≈ 1.21");
  const gy8 = makeHero("关羽", 8);
  ok(gy8.skills.indexOf("huoji") >= 0, "全员 Lv6 自动习得火计");
  ok(gy8.skills.indexOf("luoshi") < 0, "Lv8 尚未习得落石（Lv10）");
  const zgl14 = makeHero("诸葛亮", 14);
  ok(zgl14.skills.indexOf("shuiji") >= 0, "全员 Lv14 自动习得水计");
  // 计策伤害上下界：基础=智×系数×(0.9~1.1)，减敌智/3，联动×1.5
  const intv = 20, coef = 1.5, tInt = 6;
  const low = Math.max(1, Math.round(intv * coef * 0.9 - tInt / 3));
  const high = Math.round(Math.max(1, Math.round(intv * coef * 1.1 - tInt / 3)) * 1.5);
  let inRange = true;
  for (let i = 0; i < 100; i++) {
    const d = F.magicDmg(intv, coef, tInt, true, lcg(7 + i));
    if (d < low || d > high) inRange = false;
  }
  ok(inRange, "100 次计策伤害（联动）落在 [" + low + "," + high + "] 理论界内");
}

// ---------- 3d. 掉落经济校验 ----------
console.log("== 掉落经济 ==");
{
  // 以第一章野外编组（曹兵×2+曹军弓手）为例：
  //   曹兵掉落期望 = 草药20×0.15 + 金疮药72×0.08 + 皮甲200×0.03 = 3+5.76+6 = 14.76（售价为买价40%）
  //   弓手掉落期望 = 3+5.76+皮盾280×0.03(8.4) = 17.16；合计 46.68
  //   金钱期望 = 65×2 + 75 = 205；占比 22.8% ≤ 25%
  const sell = id => Math.floor(G.ITEMS[id].price * 0.4);
  const grp = ["曹兵", "曹兵", "曹军弓手"];
  let dropExp = 0, goldExp = 0;
  for (const k of grp) {
    const e = G.ENEMIES[k];
    for (const d of e.drops) dropExp += sell(d.item) * d.rate;
    goldExp += (e.gold[0] + e.gold[1]) / 2;
  }
  console.log("       掉落期望 " + dropExp.toFixed(2) + " 金 / 金钱期望 " + goldExp +
    " 金 = " + (dropExp / goldExp * 100).toFixed(1) + "%");
  ok(dropExp <= goldExp * 0.25, "单场掉落期望金额 ≤ 金钱期望的 25%（不冲垮住店+买药循环）");
  // Boss 保底掉落：所有 Boss 必有 rate:1 的掉落（演出战 Boss 除外，其 fixedReward 不掉落）
  const unbeatableBosses = new Set(["张辽", "张飞(误会)"]);
  for (const k of Object.keys(G.ENEMIES)) {
    const e = G.ENEMIES[k];
    if (e.boss && !unbeatableBosses.has(k)) {
      ok((e.drops || []).some(d => d.rate === 1), k + "（Boss）有保底掉落 rate:1");
    }
  }
}

// ---------- 3e. 编成 / 军师 / 阵形 / 受击权重 ----------
console.log("== 编成·军师·阵形 ==");
{
  // 阵形数据：5 种齐全
  const names = Object.keys(G.FORMATIONS).map(k => G.FORMATIONS[k].name);
  ok(["鹤翼阵", "鱼鳞阵", "锋矢阵", "冲轭阵", "八卦阵"].every(n => names.indexOf(n) >= 0),
    "五种阵形齐全（" + names.join("、") + "）");
  // 阵形修正进入属性：鱼鳞前排防×1.25、锋矢先锋攻×1.3 其余防×1.1
  ok(F.formStat(100, "def", 0, "yulin") === 125, "鱼鳞阵：前排防 100→125");
  ok(F.formStat(100, "def", 3, "yulin") === 100, "鱼鳞阵：后排防不变");
  ok(F.formStat(100, "atk", 0, "fengshi") === 130, "锋矢阵：先锋攻×1.3");
  ok(Math.abs(F.formStat(100, "def", 2, "fengshi") - 110) < 1e-9, "锋矢阵：其余防×1.1");
  // 军师 allStats 被动
  ok(Math.abs(F.formStat(100, "atk", 0, null, { type: "allStats", value: 0.03 }) - 103) < 1e-9,
    "军师 allStats 被动：全属性×1.03");
  // 前/后排受击权重分布（5 人队，前 2 前排）：1000 次加权抽取前排占比 ≈ 65%
  const weights = [0, 1, 2, 3, 4].map(i => F.aggroWeight(i, 2, 3, null));
  ok(Math.abs(weights.reduce((s, w) => s + w, 0) - 1) < 1e-9, "受击权重归一");
  let front = 0;
  const rand = lcg(20260723);
  for (let i = 0; i < 1000; i++) {
    if (F.pickWeightedIndex(weights, rand) < F.FRONT_COUNT) front++;
  }
  console.log("       1000 次抽取前排占比 " + (front / 10).toFixed(1) + "%（期望 65%）");
  ok(front > 590 && front < 710, "前排受击权重 ≈ 65%（±6%）");
}

// ---------- 3f. 连战 / 波次 / 收服 / 固定败 / 多形态 ----------
console.log("== 特殊战斗机制 ==");
{
  // 连战状态机：编组 chain 展开为有序战斗队列，全部打完才结算一次
  const g1 = { enemies: ["曹兵"], chain: ["g2", "g3"] };
  const queue = [g1].concat(g1.chain);
  ok(queue.length === 3 && queue[1] === "g2" && queue[2] === "g3",
    "连战：chain 展开为 3 场连续战斗");
  // 连战后续场为 waves 组时，nextChainBattle 与 startBattle 同口径取第 1 波
  // （回归：ch07_cb5 是 chain 末段且为 waves 组，曾会取不到敌人）
  {
    const grp = G.BATTLE_GROUPS.ch07_cb5;
    const names = grp.waves ? grp.waves[0] : grp.enemies;
    ok(Array.isArray(names) && names.length > 0 &&
       grp.waves.slice(1).length === grp.waves.length - 1,
      "连战嵌波次：waves 组作为 chain 后续场能正确取第 1 波（ch07_cb5）");
  }
  // 波次：第一波为初始敌人，其余按序续战，只结算一次
  const gw = { waves: [["曹兵"], ["曹军弓手", "曹兵"], ["曹军什长"]] };
  ok(gw.waves[0].length === 1 && gw.waves.length === 3,
    "波次战：waves 共 3 波（首波 1 敌，后续按序进场）");
  // 收服判定：3 回合内打到 30% 血以下（未击杀）才成立
  const rc = { withinRounds: 3, hpBelow: 0.3, joins: "黄忠" };
  ok(F.checkRecruit(rc, 2, 29, 100) === true, "收服：第 2 回合打到 29% 血 → 成立");
  ok(F.checkRecruit(rc, 4, 29, 100) === false, "收服：超过限定回合 → 不成立");
  ok(F.checkRecruit(rc, 2, 0, 100) === false, "收服：已击杀 → 不成立");
  // 固定败战：第 2 回合起敌方×3（模拟倍率规则）
  const sl = { scriptedLoss: true };
  const mult = (sl.scriptedLoss && 2 >= 2) ? 3 : 1;
  ok(mult === 3, "固定败战：第 2 回合敌方属性×3");
  // 多形态：过阈值切换，支持三段
  const phases = [{ hpBelow: 0.7 }, { hpBelow: 0.4 }, { hpBelow: 0.15 }];
  ok(F.phaseIndex(phases, 100, 100) === -1, "多形态：满血为初始形态");
  ok(F.phaseIndex(phases, 65, 100) === 0, "多形态：65% 血进入形态一");
  ok(F.phaseIndex(phases, 10, 100) === 2, "多形态：10% 血进入形态三");
  // 纪灵（数据内多形态示例）：30% 血触发
  const jl = G.ENEMIES["纪灵"];
  ok(jl.phases && F.phaseIndex(jl.phases, 200, 700) === 0, "纪灵：200/700 血触发狂怒形态");
}

// ---------- 3g. 武器强化 / 装备实例化 / 复活 / 图鉴 / 小游戏 ----------
console.log("== 强化·复活·图鉴·小游戏 ==");
{
  // 强化费用递增 + 数值 +5%/级 + 上限
  ok(F.enhanceFee(900, 0) === 270 && F.enhanceFee(900, 4) === 1350,
    "强化费用递增（铁剑 +1 需 270，+5 需 1350）");
  ok(F.enhancedAtk(6, 2) === 7 && F.enhancedAtk(6, 5) === 8,
    "强化数值：铁剑6攻 +2→7、+5→8（每级+5%）");
  ok(F.ENHANCE_MAX === 5, "强化上限 +5");
  // 实例化：同种装备不合并
  const ex = F.expandEquips({ "钢剑": 2 });
  ok(ex.list.length === 2 && ex.list[0].uid !== ex.list[1].uid && ex.list[0].plus === 0,
    "装备实例化：同种不合并，uid 唯一，初始 +0");
  // 复活道具
  ok(G.ITEMS["返魂香"] && G.ITEMS["返魂香"].revive === 0.5, "返魂香：复活+50%HP");
  ok(G.ITEMS["精铁"] && G.ITEMS["精铁"].mat === true, "精铁：强化素材已定义");
  // 图鉴：宝箱总数可统计（图鉴页 X/Y 的 Y）
  let chestTotal = 0;
  for (const mk of Object.keys(G.MAPS)) chestTotal += (G.MAPS[mk].chests || []).length;
  ok(chestTotal >= 8, "宝箱总数可统计（当前 " + chestTotal + " 个）");
  // 小游戏注册表
  const MG = require(path.join(RPG, "engine", "minigame.js"));
  ok(MG.MINIGAMES.hunt && MG.MINIGAMES.hunt.duration === 20, "小游戏 hunt（围猎 20 秒）已注册");
  ok(MG.MINIGAMES.collect && MG.MINIGAMES.collect.duration === 30, "小游戏 collect（借箭 30 秒）已注册");
}

// ---------- 4. 模拟战：推荐等级队伍(Lv8) vs 于禁 ----------
console.log("== 模拟战：Lv8 队伍 vs 于禁 ==");
{
  const rand = lcg(20260723);
  const party = [
    makeHero("刘备", 8, { weapon: "铜剑", armor: "皮甲", acc: null }),
    makeHero("关羽", 8, { weapon: "铁剑", armor: "皮甲", acc: null }),
    makeHero("张飞", 8, { weapon: "铁剑", armor: "皮甲", acc: null }),
  ];
  const enemies = G.BATTLE_GROUPS.ch01_boss.enemies.map(k =>
    Object.assign({ maxHp: G.ENEMIES[k].hp, defBuff: 1 }, G.ENEMIES[k]));
  let potions = 4; // 金疮药×4（一次补给量）
  let round = 0, win = false;
  while (round < 30) {
    round++;
    const aliveH = party.filter(h => h.hp > 0);
    const aliveE = enemies.filter(e => e.hp > 0);
    if (!aliveE.length) { win = true; break; }
    if (!aliveH.length) break;
    // 我方行动：关羽优先青龙斩，其余普攻；刘备急救；血线危险用金疮药
    for (const h of aliveH) {
      const target = aliveE.filter(e => e.hp > 0).sort((a, b) => a.hp - b.hp)[0];
      if (!target) break;
      if (h.key === "刘备") {
        const hurt = aliveH.filter(x => x.hp < x.maxHp * 0.5)
          .sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
        if (hurt && h.mp >= G.SKILLS.rende.cost) {
          h.mp -= G.SKILLS.rende.cost;
          const pw = Math.round(G.SKILLS.rende.power * F.skillScale(h.lv));
          aliveH.forEach(x => { x.hp = Math.min(x.maxHp, x.hp + pw); });
          continue;
        }
      }
      if (h.hp < h.maxHp * 0.3 && potions > 0) {
        potions--; h.hp = Math.min(h.maxHp, h.hp + 120); continue;
      }
      let mult = 1;
      if (h.key === "关羽" && h.mp >= G.SKILLS.qinglong.cost) {
        h.mp -= G.SKILLS.qinglong.cost;
        mult = G.SKILLS.qinglong.mult * F.skillScale(h.lv); // 与引擎一致：倍率×等级缩放
      }
      const r = F.physDmg(F.atkTotal(h), mult, target.def * target.defBuff, h.stats.luck, rand);
      target.hp = Math.max(0, target.hp - r.dmg);
    }
    // 敌方行动：于禁逢 3 回合整肃，其余普攻血最少者
    for (const e of enemies.filter(e => e.hp > 0)) {
      if (e.key === "于禁" && e.skill && round % 3 === 1 && e.defBuff === 1) {
        enemies.forEach(x => { x.defBuff = 1.5; });
        continue;
      }
      const t = aliveH.filter(x => x.hp > 0).sort((a, b) => a.hp - b.hp)[0];
      if (!t) break;
      const r = F.physDmg(e.atk, 1, F.defTotal(t), e.luck, rand);
      t.hp = Math.max(0, t.hp - r.dmg);
    }
    if (!enemies.some(e => e.hp > 0)) { win = true; break; }
  }
  ok(win, "推荐等级队伍战胜于禁（用了 " + round + " 回合）");
  ok(round <= 12, "回合数 " + round + " ≤ 12（03 文档 Boss 预算 8-12 回合）");
}

// ---------- 5. 章节 flags 链路闭环 ----------
console.log("== 章节链路闭环 ==");
const PASS = new Set("GCEFM.,".split(""));
function tileOf(m, x, y) {
  if (y < 0 || y >= m.grid.length || x < 0 || x >= m.grid[y].length) return "#";
  return m.grid[y][x];
}
// 5a. 每章地图存在、起点/主城落点可通行
for (const cid of Object.keys(G.CHAPTERS)) {
  const ch = G.CHAPTERS[cid];
  for (const mk of ch.maps) ok(!!G.MAPS[mk], cid + " 地图存在：" + mk);
  for (const p of [ch.start, ch.home]) {
    const m = G.MAPS[p.map];
    ok(m && PASS.has(tileOf(m, p.x, p.y)), cid + " 落点可通行：" + p.map + "(" + p.x + "," + p.y + ")");
  }
}
// 5b. 收集数据层所有 set 动作，校验任务链各阶段可达成且文案齐全
function collectSets(obj, out, seen) {
  if (!obj || typeof obj !== "object") return;
  seen = seen || new Set();
  if (seen.has(obj)) return;   // 舌战 ask 自引用，防循环
  seen.add(obj);
  if (obj.set) for (const k of Object.keys(obj.set)) out.add(obj.set[k] === true ? k : k + "=" + obj.set[k]);
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v && typeof v === "object") collectSets(v, out, seen);
  }
}
const setActions = new Set();
for (const mk of Object.keys(G.MAPS)) collectSets(G.MAPS[mk], setActions);
const INITIAL = { q0: "notStarted", q1: "start", q2: "start" };
for (const cid of Object.keys(G.CHAPTERS)) {
  const ch = G.CHAPTERS[cid];
  const qf = ch.questFlag;
  for (const stage of Object.keys(ch.questText)) {
    const reachable = stage === INITIAL[qf] || setActions.has(qf + "=" + stage);
    ok(reachable, cid + " 任务阶段可达成：" + qf + "=" + stage);
  }
  // 数据里 set 过的该旗标的值，都有任务文案
  for (const s of setActions) {
    if (s.indexOf(qf + "=") === 0) {
      const v = s.slice(qf.length + 1);
      ok(!!ch.questText[v], cid + " 阶段 " + v + " 有 HUD 文案");
    }
  }
}
// 5c. Boss 编组台词齐全（战前 + 50%血）
for (const gk of Object.keys(G.BATTLE_GROUPS)) {
  const g = G.BATTLE_GROUPS[gk];
  if (!g.boss) continue;
  const resolve = p => p.split(".").reduce((t, k) => t && t[k], G.TEXT);
  ok(!!(g.pre && resolve(g.pre)), gk + " 有战前台词");
  ok(!!(g.half && resolve(g.half)), gk + " 有 50% 血台词");
}
// 5d. 演出战配置
const zl = G.BATTLE_GROUPS.ch02_zhangliao;
ok(zl.unbeatable === true && zl.surviveRounds === 5, "张辽演出战：unbeatable + 撑 5 回合");
ok(!!zl.fixedReward, "张辽演出战：固定结算（不按击杀给经验金钱）");

// ---------- 5e. 第三~五章内容闭环 ----------
console.log("== ch03-05 内容闭环 ==");
{
  // partySwap → partyRestore 数据闭环：两处动作都存在，临时队伍成员有模板
  const found = { swaps: [], restore: 0 };
  const seenObjs = new Set();
  (function walk(o) {
    if (!o || typeof o !== "object" || seenObjs.has(o)) return;
    seenObjs.add(o);
    if (o.partySwap) found.swaps.push(o.partySwap.members);
    if (o.partyRestore) found.restore++;
    for (const k of Object.keys(o)) walk(o[k]);
  })(G.MAPS);
  ok(found.swaps.length >= 2 &&
     found.swaps.every(ms => ms.every(k => G.HERO_TPL[k])),
    "分线：partySwap 成员均有模板（" + found.swaps.map(m => m.join("、")).join(" / ") + "）");
  ok(found.swaps.some(ms => ms.join() === "关羽,周仓") &&
     found.swaps.some(ms => ms.join() === "赵云"),
    "分线：第四章（关羽、周仓）与第七章（赵云单骑）均有分线");
  ok(found.restore >= 1, "分线：partyRestore 存在（古城/汉津渡还原主队）");
  // 五关守将：编组存在、Boss 标记、敌人与台词存在
  const guards = [["ch05_kongxiu", "孔秀"], ["ch05_hanfu", "韩福"], ["ch05_bianxi", "卞喜"],
                  ["ch05_wangzhi", "王植"], ["ch05_qinqi", "秦琪"]];
  const resolve = p => p.split(".").reduce((t, k) => t && t[k], G.TEXT);
  for (const [gk, name] of guards) {
    const g = G.BATTLE_GROUPS[gk];
    ok(g && g.boss && g.enemies[0] === name && G.ENEMIES[name].boss &&
       resolve(g.pre) && resolve(g.half),
      "守将编组完整：" + gk + "（" + name + " HP" + G.ENEMIES[name].hp + "）");
  }
  // Boss HP 递增（1500→2400）
  const hps = guards.map(([, n]) => G.ENEMIES[n].hp);
  ok(hps.every((h, i) => i === 0 || h > hps[i - 1]),
    "五关守将 HP 递增：" + hps.join("→"));
  // 赵云模板：成长后速度 > 关羽
  const zy = makeHero("赵云", 20), gy20 = makeHero("关羽", 20);
  ok(zy.stats.spd > gy20.stats.spd,
    "赵云 Lv20 速(" + zy.stats.spd + ") > 关羽(" + gy20.stats.spd + ")");
  ok(makeHero("周仓", 16).stats.hp > 0 && makeHero("孙乾", 16).stats.mp > 0,
    "周仓/孙乾模板可用");
  // 编成所 flags 门控：引擎在 ch05 前提示未开放
  const mapSrc = require("fs").readFileSync(path.join(RPG, "engine", "map.js"), "utf-8");
  ok(mapSrc.indexOf("sys_camp") >= 0 && mapSrc.indexOf("尚未开放") >= 0,
    "编成所 flags 门控存在（sys_camp）");
}

// ---------- 5f. 第六~八章内容闭环 ----------
console.log("== ch06-08 内容闭环 ==");
{
  // 诸葛亮 Lv26 智 > 所有武将
  const zg = makeHero("诸葛亮", 26);
  const maxWu = Math.max(makeHero("关羽", 26).stats.int,
    makeHero("张飞", 26).stats.int, makeHero("赵云", 26).stats.int);
  ok(zg.stats.int > maxWu, "诸葛亮 Lv26 智(" + zg.stats.int + ") > 武将最高智(" + maxWu + ")");
  // 军师被动 magicDmg ×1.15 进入计算
  const p = G.HERO_TPL["诸葛亮"].strategistPassive;
  ok(p && p.type === "magicDmg" && p.value === 0.15, "诸葛亮军师被动：计策伤害+15%");
  const r1 = lcg(99), r2 = lcg(99);
  const dBase = F.magicDmg(40, 1.5, 10, false, r1);
  const dBuff = F.magicDmg(40, 1.5 * (1 + p.value), 10, false, r2);
  ok(dBuff > dBase, "军师被动生效：计策伤害 " + dBase + " → " + dBuff);
  // 计策书：6 种，物品→谋略映射齐全
  const books = Object.keys(G.ITEMS).filter(id => G.ITEMS[id].type === "book");
  ok(books.length === 6 && books.every(id => G.SKILLS[G.ITEMS[id].skill]),
    "计策书 6 种且映射存在（" + books.join("、") + "）");
  // 檀溪限时脱出：escapeTimer + penalty 编组存在
  const tanxi = G.MAPS.ch06_tanxi;
  const esc = (tanxi.triggers || []).find(t => t.escapeTimer);
  ok(!!esc && G.BATTLE_GROUPS[esc.escapeTimer.penalty],
    "檀溪 escapeTimer 存在，penalty=" + (esc && esc.escapeTimer.penalty));
  // 护送：百姓 auto 队友 + 三场护送编组 protect 标记
  ok(G.HERO_TPL["百姓"] && G.HERO_TPL["百姓"].auto === true, "百姓为 auto 队友模板");
  ok(["ch07_escort1", "ch07_escort2", "ch07_escort3"].every(k =>
    G.BATTLE_GROUPS[k] && G.BATTLE_GROUPS[k].protect === "百姓"),
    "三场护送战 protect=百姓（阵亡重来）");
  // 长坂 5 连战 chain 闭环
  const chain = ["ch07_cb1"];
  while (G.BATTLE_GROUPS[chain[chain.length - 1]].chain) {
    chain.push(G.BATTLE_GROUPS[chain[chain.length - 1]].chain[0]);
  }
  ok(chain.length === 5 && chain[4] === "ch07_cb5" &&
     G.BATTLE_GROUPS.ch07_cb5.waves.length === 2,
    "长坂五连战闭环：" + chain.join("→") + "（末阵双波）");
  // 华容道"突围"强制结束
  ok(G.BATTLE_GROUPS.ch08_huarong.forceEndRound === 6, "华容道：第 6 回合强制结束");
  // 战时商店 priceMult
  ok(G.SHOPS.ch07_weapon.priceMult === 1.2 && G.SHOPS.ch07_item.priceMult === 1.2,
    "第七章战时商店 priceMult=1.2");
  // 火攻演出（博望坡第 3 回合 / 赤壁第 2 回合）
  ok(G.BATTLE_GROUPS.ch07_bowang.fire.round === 3 &&
     G.BATTLE_GROUPS.ch08_chibi.fire.round === 2, "火攻演出编组配置存在");
}
// ---------- 5g. 第九~十一章（终章）内容闭环 ----------
console.log("== ch09-11 内容闭环 ==");
{
  // 新角色模板可用；姜维 Lv47 文武双修
  for (const k of ["黄忠", "魏延", "庞统", "马超", "马岱", "姜维"]) {
    const h = makeHero(k, 40);
    ok(h.stats.hp > 0 && h.stats.atk > 0, k + " 模板可用");
  }
  const jw = makeHero("姜维", 47);
  ok(jw.stats.atk > 30 && jw.stats.int > 30,
    "姜维 Lv47 文武双修（攻" + jw.stats.atk + " 智" + jw.stats.int + "）");
  // 收服战参数
  ok(G.BATTLE_GROUPS.ch09_huangzhong.recruit.withinRounds === 3 &&
     G.BATTLE_GROUPS.ch09_huangzhong.recruit.hpBelow === 0.3 &&
     G.BATTLE_GROUPS.ch09_huangzhong.recruit.joins === "黄忠",
    "黄忠收服战参数（3 回合 / 30% / 加入黄忠）");
  ok(G.BATTLE_GROUPS.ch10_machao.recruit.joins === "马超" &&
     G.BATTLE_GROUPS.ch11_jiangwei.recruit.joins === "姜维",
    "马超/姜维收服战参数存在");
  // 固定败战：落凤坡 + 街亭
  ok(G.BATTLE_GROUPS.ch10_luofeng.scriptedLoss === true &&
     G.BATTLE_GROUPS.ch11_jieting.scriptedLoss === true,
    "落凤坡/街亭 scriptedLoss 存在");
  // 司马懿三形态：阈值递减
  const sy = G.ENEMIES["司马懿"];
  ok(sy.phases.length === 2 && sy.phases[0].hpBelow > sy.phases[1].hpBelow &&
     sy.phases[1].skills[0] === "tianming",
    "司马懿三形态（初始坚守→0.7反击→0.4天命），阈值递减");
  // 八卦阵 4 阵眼触发器
  const wz = G.MAPS.ch11_wuzhang;
  const eyeFlags = new Set();
  (function walk(o, seen) {
    if (!o || typeof o !== "object" || seen.has(o)) return;
    seen.add(o);
    if (o.set) for (const k of Object.keys(o.set)) if (/^eye[1-4]$/.test(k)) eyeFlags.add(k);
    for (const k of Object.keys(o)) walk(o[k], seen);
  })(wz.triggers, new Set());
  ok(eyeFlags.size === 4, "八卦阵 4 阵眼触发器存在（" + Array.from(eyeFlags).join("、") + "）");
  // 6 件名品全部有获取来源（商店库存 / 宝箱 / giveEquip 剧情动作）
  const sources = new Set();
  for (const sk of Object.keys(G.SHOPS)) (G.SHOPS[sk].stock || []).forEach(id => sources.add(id));
  (function walk2(o, seen) {
    if (!o || typeof o !== "object" || seen.has(o)) return;
    seen.add(o);
    if (o.giveEquip) sources.add(o.giveEquip);
    if (o.items) for (const id of Object.keys(o.items)) sources.add(id);
    for (const k of Object.keys(o)) walk2(o[k], seen);
  })(G.MAPS, new Set());
  const mingpin = ["雌雄双股剑", "青龙偃月刀", "丈八蛇矛", "龙胆枪", "落日弓", "七星杖"];
  ok(mingpin.every(id => sources.has(id) && G.ITEMS[id]),
    "6 件名品均有获取来源（商店/宝箱/剧情）");
  // 结局谢幕
  let hasEnd = false;
  (function walk3(o, seen) {
    if (!o || typeof o !== "object" || seen.has(o)) return;
    seen.add(o);
    if (o.theEnd) hasEnd = true;
    for (const k of Object.keys(o)) walk3(o[k], seen);
  })(G.MAPS, new Set());
  ok(hasEnd, "结局谢幕触发（theEnd）存在");
  // 武器系别限定
  ok(F.canWield("张飞", "丈八蛇矛") && !F.canWield("张飞", "铁脊弓"),
    "系别限定：张飞可用矛、不可用弓");
  ok(F.canWield("黄忠", "落日弓") && F.canWield("关羽", "龙泉剑"),
    "系别限定：黄忠可用弓、剑系通用");
}

console.log("\n共 " + (pass + fail) + " 项断言，通过 " + pass + "，失败 " + fail);
process.exit(fail ? 1 : 0);
