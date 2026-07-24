// 地图 · ch00_inn_in 旅店（徐州城设施室内；店主自 ch00_city 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_inn_in"] = {
  name: "旅店",
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
    { id: "inn", x: 4, y: 2, color: "#c98a4b", name: "旅店老板", shop: "ch00_inn" },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch00_city", x: 4, y: 9 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
