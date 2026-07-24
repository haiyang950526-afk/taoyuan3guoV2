// 地图 · ch00_cave2 北山山洞（序章野外迷宫 18×13；入口在徐州城外北缘山地）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_cave2"] = {
  name: "北山山洞",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "RFFFFRFFFFFRFFFFFR",
    "RRFRRRRRFRRRRRFRRR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRRFRRRRRFRRRRFRR",
    "RFFFFFRFFFFFFFFFFR",
    "RRFRRRRRRFRRRFRRRR",
    "RFFFFFFFFRFFFFFFFR",
    "RRRFRRRRRRRFRRRRRR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRRRFRRRRRRFRRRRR",
    "RFFFFFFFFFFFFFFFFR",
    "RRRRRRRREERRRRRRRR",
  ],
  encounterTiles: ["F"],
  encounterRate: 0.10,
  encounterGroups: [["黄巾贼", "黄巾弓手"], ["黄巾弓手", "黄巾弓手"], ["黄巾贼", "黄巾贼", "黄巾弓手"]],
  npcs: [],
  chests: [
    { x: 9,  y: 6, id: "c1", items: { "铁剑": 1 } },
    { x: 6,  y: 1, id: "c2", items: { "金疮药": 1 } },
    { x: 16, y: 1, id: "c3", gold: 150 },
  ],
  transitions: [
    { x: 8, y: 12, to: { map: "ch00_field", x: 19, y: 1 } },
    { x: 9, y: 12, to: { map: "ch00_field", x: 20, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
