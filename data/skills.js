// 数据 · 谋略定义（按 02 文档框架，后续章节在此追加）
// type 说明：
//   dmg           武技·单体物理（攻驱动，mult 倍率）
//   dmgAll        武技·敌全体物理
//   healFixed     固定值治疗（target: one/all）
//   healInt       智驱动治疗（coef 系数，target: one/all）
//   magic         计策·智驱动单体伤害（coef 系数，terrain 命中联动地形 ×1.5）
//   buffAtk       我方单体攻击提升 30%（本战有效）
//   debuffAtkAll  敌全体攻击下降 30%（本战有效）
//   enemyBuffDef  敌方全体防御提升 50%（敌方专用，如于禁"整肃"）
"use strict";

const SKILLS = {
  rende:    { name: "仁德",   cost: 6,  type: "healFixed", target: "all", power: 25, desc: "全体回复25" },
  jili:     { name: "激励",   cost: 5,  type: "buffAtk",   mult: 1.3, desc: "单体攻击提升" },
  dade:     { name: "大德",   cost: 14, type: "healInt",   target: "all", coef: 0.9, desc: "全体回复(智×0.9)" },
  qinglong: { name: "青龙斩", cost: 4,  type: "dmg",       mult: 1.8, desc: "1.8倍伤害" },
  yanyue:   { name: "偃月",   cost: 8,  type: "dmgAll",    mult: 1.2, desc: "横扫敌全体" },
  shemao:   { name: "蛇矛突", cost: 6,  type: "dmg",       mult: 2.2, desc: "2.2倍伤害" },
  dahe:     { name: "大喝",   cost: 8,  type: "debuffAtkAll", mult: 0.7, desc: "敌全体攻击下降" },
  qingzhang:{ name: "清瘴",   cost: 8,  type: "healInt",   target: "one", coef: 1.6, desc: "单体治疗(智×1.6)" },
  longdan:  { name: "龙胆",   cost: 8,  type: "dmg",       mult: 2.4, desc: "2.4倍伤害" },
  lianzhu:  { name: "连珠箭", cost: 6,  type: "dmg",       mult: 1.5, desc: "1.5倍伤害（弓）" },
  baibu:    { name: "百步穿杨", cost: 10, type: "dmg",     mult: 2.6, desc: "2.6倍伤害（弓）" },
  kuangzhan:{ name: "狂击",   cost: 7,  type: "dmg",       mult: 2.0, desc: "2.0倍伤害" },
  jinma:    { name: "锦马超", cost: 9,  type: "dmg",       mult: 2.3, desc: "2.3倍伤害（枪）" },
  qilin:    { name: "麒麟儿", cost: 8,  type: "dmg",       mult: 2.4, desc: "2.4倍伤害" },
  youlin:   { name: "幼麟计", cost: 8,  type: "magic", coef: 1.6, desc: "智×1.6，火计中" },
  // —— 通用计策（全员到级自动习得，见下方 COMMON_LEARN；智驱动单体，吃地形联动）——
  huoji:  { name: "火计", cost: 4, type: "magic", coef: 1.5, terrain: "forest",   desc: "智×1.5，对林中敌×1.5" },
  luoshi: { name: "落石", cost: 5, type: "magic", coef: 1.7, terrain: "mountain", desc: "智×1.7，对山地敌×1.5" },
  shuiji: { name: "水计", cost: 5, type: "magic", coef: 1.7, terrain: "water",    desc: "智×1.7，对水上敌×1.5" },
  // —— 计策书谋略（襄阳文房铺） ——
  fengji: { name: "风计", cost: 7,  type: "magic", coef: 1.6, desc: "智×1.6，借风助势" },
  leiji:  { name: "雷计", cost: 10, type: "magic", coef: 2.0, desc: "智×2.0，雷霆一击" },
  // —— 诸葛亮专属 ——
  baguazhen: { name: "八卦阵", cost: 12, type: "buffDefAll", mult: 1.3, desc: "全军防御提升" },
  dongfeng:  { name: "东风",   cost: 16, type: "magicAll", coef: 1.4, desc: "全体火计" },
  xingluo:   { name: "星落",   cost: 30, type: "magicAll", coef: 2.2, desc: "究极计策" },
  // —— 敌方专用 ——
  zhengshu: { name: "整肃",   cost: 0,  type: "enemyBuffDef", mult: 1.5, desc: "全军防御上升" },
  tianming: { name: "天命",   cost: 0,  type: "enemyMagicAll", coef: 1.2, desc: "全屏计策" },
};

// 全员通用习得表（等级：谋略）——所有角色模板（含以后章节新增）共用
const COMMON_LEARN = { 6: ["huoji"], 10: ["luoshi"], 14: ["shuiji"] };

// 地块 → 计策地形联动映射（03 文档：火计对林中、落石对山地、水计对水上 ×1.5）
const TERRAIN_BY_TILE = { "T": "forest", "R": "mountain", "W": "water" };

if (typeof module !== "undefined") module.exports = { SKILLS: SKILLS, COMMON_LEARN: COMMON_LEARN, TERRAIN_BY_TILE: TERRAIN_BY_TILE };
