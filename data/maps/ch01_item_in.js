// 地图 · ch01_item_in 杂货店（郯城设施室内；店主自 ch01_tancheng 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_item_in"] = {
  name: "杂货店",
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
    { id: "item", x: 4, y: 2, color: "#7ee2a0", name: "杂货店老板", shop: "ch01_item" },
    { id: "helper", x: 1, y: 3, color: "#7a8a9a", name: "店小二",
      lines: ["伤药清泉多备些，城外拼命，全靠它们救命。"] },
  ],
  chests: [],
  transitions: [
    { x: 7, y: 9, to: { map: "ch01_tancheng", x: 5, y: 11 } },
    { x: 8, y: 9, to: { map: "ch01_tancheng", x: 5, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
