// 地图 · ch04_mangdang 芒砀山（第四章支线：张飞落草处，黄巾残党）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch04_mangdang"] = {
  name: "芒砀山",
  grid: [
    "RRRRRRRRRRRRRRRR",
    "R...T......T...R",
    "G..............R",
    "R..T......T....R",
    "R..............R",
    "R.T....T....T..R",
    "R..............R",
    "R....T.........R",
    "R...........T..R",
    "R..T...........R",
    "R........T.....R",
    "RRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["黄巾残党"], ["黄巾残党", "黄巾残党"]],
  npcs: [
    { id: "md_v", x: 8, y: 6, color: "#4f8cff", name: "山民", linesKey: "ch04.mangdangVillager" },
  ],
  chests: [
    { x: 12, y: 10, id: "m1", items: { "金疮药": 2 } },
  ],
  transitions: [
    { x: 0, y: 2, to: { map: "ch00_field", x: 22, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
