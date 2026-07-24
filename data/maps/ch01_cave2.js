// 地图 · ch01_cave2 郯城山窟（第一章野外迷宫 18×13；入口在郯城野外南缘山地）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_cave2"] = {
  name: "郯城山窟",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "RFFFFFRFFRFFFFFFFR",
    "RRRRFRRFRRFRRRFRRR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRFRRRFRRRRFRRRRR",
    "RFFFFFFFFRFFFFFFFR",
    "RFRRRRRFRRRFRRRRFR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRRFRRRRRFRRRFRRR",
    "RFFFFFFFFFFFFFFFFR",
    "RFRRRRRFRRRRRRFRRR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRRRRREERRRRRRRRR",
  ],
  encounterTiles: ["F"],
  encounterRate: 0.10,
  encounterGroups: [["曹兵", "曹兵"], ["曹兵", "曹军弓手"], ["曹军什长", "曹兵"]],
  npcs: [],
  chests: [
    { x: 8,  y: 1, id: "c1", items: { "铁甲": 1 } },
    { x: 16, y: 5, id: "c2", items: { "金疮药": 1 } },
    { x: 16, y: 9, id: "c3", gold: 200 },
  ],
  transitions: [
    { x: 7, y: 12, to: { map: "ch01_field", x: 5, y: 16 } },
    { x: 8, y: 12, to: { map: "ch01_field", x: 6, y: 16 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
