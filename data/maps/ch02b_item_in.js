// 地图 · ch02b_item_in 杂货店（下邳城设施室内；店主自 ch02_xiapi 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02b_item_in"] = {
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
    { id: "item", x: 4, y: 2, color: "#7ee2a0", name: "杂货店老板", shop: "ch02b_item" },
    { id: "helper", x: 1, y: 3, color: "#7a8a9a", name: "店小二",
      lines: ["伤药清泉多备些，城外拼命，全靠它们救命。"] },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch02_xiapi", x: 5, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
