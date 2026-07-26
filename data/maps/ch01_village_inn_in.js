// 地图 · ch01_village_inn_in 客栈（郯南村设施室内；店主自 ch01_village 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_village_inn_in"] = {
  name: "客栈",
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
    { id: "inn", x: 4, y: 2, color: "#c98a4b", name: "旅店老板", shop: "vil_inn" },
  ],
  chests: [],
  transitions: [
    { x: 7, y: 9, to: { map: "ch01_village", x: 4, y: 5 } },
    { x: 8, y: 9, to: { map: "ch01_village", x: 4, y: 5 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
