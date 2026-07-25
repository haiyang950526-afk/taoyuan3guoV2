// 地图 · ch06_book_in 文房铺（襄阳设施室内；店主自 ch06_xiangyang 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_book_in"] = {
  name: "文房铺",
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
    { id: "book", x: 4, y: 2, color: "#b8a05a", name: "文房铺老板", shop: "ch06_book" },
    { id: "helper", x: 1, y: 3, color: "#9a8a6a", name: "书生",
      lines: ["计策书交予军师，两军阵前便能呼风唤雨。"] },
  ],
  chests: [],
  transitions: [
    { x: 4, y: 5, to: { map: "ch06_xiangyang", x: 13, y: 5 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
