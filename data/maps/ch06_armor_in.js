// 地图 · ch06_armor_in 防具店（新野城设施室内；店主自 ch06_xinye 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_armor_in"] = {
  name: "防具店",
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
    { id: "armor6", x: 4, y: 2, color: "#b08a5a", name: "防具店老板", shop: "ch06_armor",
      hideIf: { flag: "q7", exists: true } },
    { id: "armor7", x: 4, y: 2, color: "#b08a5a", name: "防具店老板", shop: "ch07_armor",
      appearIf: { flag: "q7", exists: true } },
    { id: "helper", x: 1, y: 3, color: "#7a8a9a", name: "店小二",
      lines: ["衣甲盔盾配齐全，上阵才扛得住刀砍箭射。"] },
  ],
  chests: [],
  transitions: [
    { x: 7, y: 9, to: { map: "ch06_xinye", x: 13, y: 11 } },
    { x: 8, y: 9, to: { map: "ch06_xinye", x: 13, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
