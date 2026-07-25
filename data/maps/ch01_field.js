// 地图 · ch01_field 郯城野外（第一章野外：西通徐州城外，北通郯城，东通泗水古道）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_field"] = {
  name: "郯城野外",
  grid: [
    "RRRRRRRRR##GG##RRRRRRRRR",
    "R...T.....,,......T....R",
    "R..T......,,..T........R",
    "R........,,........T...R",
    "R..T...T..,,...........R",
    "R.........,,....T......R",
    "R.........,,...........R",
    "R..T......,.....T......R",
    "G,,,,,,,,,,,,,,,,,,,,,,G",
    "G,,,,,,,,,,,,,,,,,,,,,,G",
    "R..T.....T......T......R",
    "R.......BB.BB.BB.......R",
    "R......TBD.DB.BD...T...R",
    "R..T.......,...........R",
    "R.........T,.....T.....R",
    "R...T..................R",
    "R........T......T......R",
    "RRRRRCCRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.12,
  encounterGroups: [["曹兵"], ["曹兵", "曹兵"], ["曹兵", "曹军弓手"], ["曹军弓手", "曹兵"]],
  npcs: [],
  chests: [
    { x: 2, y: 15, id: "f1", items: { "金疮药": 1 } },
  ],
  triggers: [
    // 巡哨：整备完毕后踩中大路中央触发遭遇战
    { x: 12, y: 9, if: { flag: "q1", is: "ready" },
      do: [{ say: "ch01.patrolPre" },
           { battle: "ch01_patrol",
             onWin: [{ set: { q1: "patrolDone" } }, { say: "ch01.patrolDone" }] }] },
  ],
  transitions: [
    { x: 0,  y: 8,  to: { map: "ch00_field", x: 22, y: 8 } },
    { x: 0,  y: 9,  to: { map: "ch00_field", x: 22, y: 8 } },
    { x: 11, y: 0,  to: { map: "ch01_tancheng", x: 10, y: 16 } },
    { x: 12, y: 0,  to: { map: "ch01_tancheng", x: 10, y: 16 } },
    // 南缘山地洞口：郯城山窟（迷宫）
    { x: 5,  y: 17, to: { map: "ch01_cave2", x: 7, y: 11 } },
    { x: 6,  y: 17, to: { map: "ch01_cave2", x: 8, y: 11 } },
    // 东门：守将下令进军后才可通行
    { x: 23, y: 8,  if: { flag: "q1", is: "march" }, to: { map: "ch01_sishui", x: 1, y: 8 } },
    { x: 23, y: 9,  if: { flag: "q1", is: "march" }, to: { map: "ch01_sishui", x: 1, y: 8 } },
    // 郯南村村口（路南）：朝北走进门触发
    { x: 11, y: 13, face: [0, -1], to: { map: "ch01_village", x: 5, y: 7 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
