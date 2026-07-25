// 地图 · ch02_inn_in 旅店（小沛设施室内；店主自 ch02_xiaopei 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02_inn_in"] = {
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
    { id: "inn", x: 4, y: 2, color: "#c98a4b", name: "旅店老板", shop: "ch02_inn" },
    { id: "helper", x: 1, y: 3, color: "#7a8a9a", name: "店小二",
      lines: ["住店一晚，全队气血精力俱足，比什么药都灵验。"] },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch02_xiaopei", x: 5, y: 5 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
