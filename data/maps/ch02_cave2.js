// 地图 · ch02_cave2 沛县山窟（第二章野外迷宫 18×13；入口在沛县郊野北缘山地）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02_cave2"] = {
  name: "沛县山窟",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "RFFFFFFFFRFFFFRFFR",
    "RRRRFRRRRRRFRRRRFR",
    "RFFFFFFFFFFFFFFFFR",
    "RFRRRRFRRRRRRFRRRR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRFRRRRFRRRRRRFRR",
    "RFFFFFFFFFFFFFFFFR",
    "RFRRRRRRRFRRRRRRFR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRRFRRRRRFRRRFRRR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRRRRRREERRRRRRRR",
  ],
  encounterTiles: ["F"],
  encounterRate: 0.10,
  encounterGroups: [["袁术兵", "袁术兵"], ["袁术兵", "袁术弓手"], ["袁术弓手", "袁术弓手"]],
  npcs: [],
  chests: [
    { x: 8,  y: 1, id: "c1", items: { "钢剑": 1 } },
    { x: 1,  y: 5, id: "c2", items: { "还魂丹": 1 } },
    { x: 16, y: 9, id: "c3", gold: 300 },
  ],
  transitions: [
    { x: 8, y: 12, to: { map: "ch02_field_east", x: 18, y: 1 } },
    { x: 9, y: 12, to: { map: "ch02_field_east", x: 19, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
