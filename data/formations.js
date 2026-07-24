// 数据 · 阵形定义（03 文档，第六章开放；编成所内选择）
// schema：
//   all:      全体属性倍率 {atk/def/int/spd/luck: 倍率}
//   front:    仅前排（出战位前 2 人）倍率
//   back:     仅后排倍率
//   slotMods: 指定出战位 {"0": {...}}（优先级最高，乘算）
//   other:    除 slotMods 指定者外其余人倍率（锋矢阵用）
//   aggroFront: 前排受击权重（默认 0.65）
//   magicResist: 计策抗性（受计策伤害 ×(1-值)）
"use strict";

const FORMATIONS = {
  heyi:    { name: "鹤翼阵", desc: "平衡，两翼速+10%",
             slotMods: { "1": { spd: 1.1 }, "3": { spd: 1.1 } } },
  yulin:   { name: "鱼鳞阵", desc: "前排防+25%，后排攻+10%",
             front: { def: 1.25 }, back: { atk: 1.1 } },
  fengshi: { name: "锋矢阵", desc: "先锋攻+30%防-15%，其余防+10%",
             slotMods: { "0": { atk: 1.3, def: 0.85 } }, other: { def: 1.1 } },
  chonge:  { name: "冲轭阵", desc: "全体速+20%，防-10%",
             all: { spd: 1.2, def: 0.9 } },
  bagua:   { name: "八卦阵", desc: "智+20%，计策抗性+20%",
             all: { int: 1.2 }, magicResist: 0.2 },
};

if (typeof module !== "undefined") module.exports = FORMATIONS;
