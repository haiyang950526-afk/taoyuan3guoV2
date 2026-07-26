// 地图 · ch02s_village_inn_in 客栈（邳西村设施室内；店主自 ch02s_village 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02s_village_inn_in"] = {
  name: "客栈",
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
    { id: "inn", x: 4, y: 2, color: "#c98a4b", name: "旅店老板", shop: "vil_inn" },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch02s_village", x: 4, y: 5 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
