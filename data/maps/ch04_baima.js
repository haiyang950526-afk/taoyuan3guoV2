// 地图 · ch04_baima 白马坡（第四章：颜良→文丑 Boss 连战）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch04_baima"] = {
  name: "白马坡",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T.....T.....R",
    "G,,,,,,,,,,,,,,,,G",
    "R......WW........R",
    "R..T...WW...T....R",
    "R......WW........R",
    "R....T......T....R",
    "R................R",
    "R..T....T......T.R",
    "R................R",
    "R.....T....T.....R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["曹军先锋", "曹军先锋"], ["曹军先锋", "曹军虎卫"]],
  npcs: [
    // 颜良：Boss 连战（斩颜良→诛文丑，中间不回血）
    { id: "yanliang", x: 8, y: 1, color: "#8a3a2a", name: "颜良",
      boss: "ch04_yanliang",
      appearIf: { flag: "q4", is: "tushan" },
      onWin: [{ say: "ch04.baimaDone" }, { set: { q4: "baima" } },
              { toast: "回土山见曹操，挂印封金" }] },
  ],
  chests: [
    { x: 16, y: 9, id: "b1", gold: 500 },
    // 名品隐藏宝箱：青龙偃月刀（关羽情怀毕业装）
    { x: 16, y: 3, id: "b2", items: { "青龙偃月刀": 1 } },
  ],
  transitions: [
    { x: 0,  y: 2, to: { map: "ch04_tushan", x: 14, y: 2 } },
    // 东门为袁军方向（剧情杀后不再前进）
    { x: 17, y: 2, if: { flag: "q4", is: "baima" }, to: { map: "ch04_tushan", x: 14, y: 2 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
