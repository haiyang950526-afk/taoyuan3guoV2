// 地图 · ch06_item_in 杂货店（新野城设施室内；店主自 ch06_xinye 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_item_in"] = {
  name: "杂货店",
  grid: [
    "BBBBBBBB",
    "BLLLLLLB",
    "BLLLLLLB",
    "BLLLLLLB",
    "BLLLLLLB",
    "BBBB,BBB",
  ],
  encounterTiles: [],
  npcs: [
    { id: "item6", x: 4, y: 2, color: "#7ee2a0", name: "杂货店老板", shop: "ch06_item",
      hideIf: { flag: "q7", exists: true } },
    { id: "item7", x: 4, y: 2, color: "#7ee2a0", name: "杂货店老板", shop: "ch07_item",
      appearIf: { flag: "q7", exists: true } },
    { id: "helper", x: 1, y: 3, color: "#7a8a9a", name: "店小二",
      lines: ["伤药清泉多备些，城外拼命，全靠它们救命。"] },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch06_xinye", x: 5, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
