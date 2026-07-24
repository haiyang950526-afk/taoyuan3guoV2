// 地图 · ch10_luocheng 雒城（第十章：攻坚 → 落凤坡后二战张任）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch10_luocheng"] = {
  name: "雒城",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R................R",
    "R....T......T....R",
    "R................R",
    "R................R",
    "R..T..........T..R",
    "R........,.......R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["雒城守军"], ["雒城守军", "蜀军弓手"]],
  npcs: [
    // 二战：张任（落凤坡之后）
    { id: "zhangren", x: 9, y: 1, color: "#3a3a4a", name: "张任",
      boss: "ch10_zhangren",
      appearIf: { flag: "q10", is: "luofeng" },
      onWin: [{ say: "ch10.zhangrenDone" }, { set: { q10: "luo2" } },
              { toast: "雒城已下！进军绵竹（野外东门）" }] },
  ],
  chests: [],
  triggers: [
    // 一战：雒城攻坚
    { x: 9, y: 9, if: { flag: "q10", is: "fu" },
      do: [{ battle: "ch10_luo1",
             onWin: [{ set: { q10: "luo1" } },
                     { toast: "外围已破——穿落凤坡迂回（野外西门）" }] }] },
  ],
  transitions: [
    { x: 9, y: 10, to: { map: "ch10_field", x: 10, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
