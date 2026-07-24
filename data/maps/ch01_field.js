// 地图 · ch01_field 郯城野外（第一章野外：西通徐州城外，北通郯城，东通泗水古道）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_field"] = {
  name: "郯城野外",
  grid: [
    "RRRRRRRRRRRGGRRRRRRRRRRR",
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
    "R......................R",
    "R......T......T....T...R",
    "R..T...................R",
    "R.........T......T.....R",
    "R...T..................R",
    "R........T......T......R",
    "RRRRRRRRRRRRRRRRRRRRRRRR",
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
    // 东门：守将下令进军后才可通行
    { x: 23, y: 8,  if: { flag: "q1", is: "march" }, to: { map: "ch01_sishui", x: 1, y: 8 } },
    { x: 23, y: 9,  if: { flag: "q1", is: "march" }, to: { map: "ch01_sishui", x: 1, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
