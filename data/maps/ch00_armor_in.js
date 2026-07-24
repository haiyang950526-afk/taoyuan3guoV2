// 地图 · ch00_armor_in 防具店（徐州城设施室内；新店主，shop: ch00_armor）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_armor_in"] = {
  name: "防具店",
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
    { id: "armor", x: 4, y: 2, color: "#a89a6a", name: "防具店老板", shop: "ch00_armor" },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch00_city", x: 20, y: 9 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
