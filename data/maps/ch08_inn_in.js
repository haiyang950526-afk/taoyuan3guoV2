// 地图 · ch08_inn_in 旅店（柴桑设施室内；店主自 ch08_chaisang 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch08_inn_in"] = {
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
    { id: "inn", x: 4, y: 2, color: "#c98a4b", name: "旅店老板", shop: "ch08_inn" },
    { id: "helper", x: 1, y: 3, color: "#7a8a9a", name: "店小二",
      lines: ["住店一晚，全队气血精力俱足，比什么药都灵验。"] },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch08_chaisang", x: 5, y: 5 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
