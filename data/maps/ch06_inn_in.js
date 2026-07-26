// 地图 · ch06_inn_in 旅店（新野城设施室内；店主自 ch06_xinye 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_inn_in"] = {
  name: "旅店",
  grid: [
    "BBBBBBBBBBBBBBBB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLBBBBBB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BBBBLLBLLLcttcLB",
    "BLLLLLLLLLLLLLLB",
    "BLLLLLLLLLLLLLLB",
    "BBBBBBB,,BBBBBBB",
  ],
  encounterTiles: [],
  npcs: [
    { id: "inn6", x: 4, y: 2, color: "#c98a4b", name: "旅店老板", shop: "ch06_inn",
      hideIf: { flag: "q7", exists: true } },
    { id: "inn7", x: 4, y: 2, color: "#c98a4b", name: "旅店老板", shop: "ch07_inn",
      appearIf: { flag: "q7", exists: true } },
    { id: "helper", x: 1, y: 3, color: "#7a8a9a", name: "店小二",
      lines: ["住店一晚，全队气血精力俱足，比什么药都灵验。"] },
  ],
  chests: [],
  transitions: [
    { x: 7, y: 9, to: { map: "ch06_xinye", x: 5, y: 5 } },
    { x: 8, y: 9, to: { map: "ch06_xinye", x: 5, y: 5 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
