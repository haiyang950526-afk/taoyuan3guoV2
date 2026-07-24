// 地图 · ch00_item_in 杂货店（徐州城设施室内；店主自 ch00_city 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_item_in"] = {
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
    { id: "item", x: 4, y: 2, color: "#7ee2a0", name: "杂货店老板", shop: "ch00_item" },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch00_city", x: 4, y: 14 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
