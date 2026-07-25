// 地图 · ch09_field_s 荆南南野（第九章野外：武陵↔长沙）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09_field_s"] = {
  name: "荆南南野",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R.....BB.BB.BB...R",
    "#....TBD.DB.BD...#",
    "#........,.......#",
    "G,,,,,,,,,,,,,,,,G",
    "#................#",
    "#..T..........T..#",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.11,
  encounterGroups: [["荆南兵", "荆南弓手"], ["荆南弓手"], ["荆南兵", "荆南兵"]],
  npcs: [],
  chests: [
    { x: 8, y: 3, id: "f1", items: { "甘露": 1 } },
  ],
  transitions: [
    { x: 0,  y: 8, to: { map: "ch09_wuling", x: 10, y: 1 } },
    { x: 17, y: 8, if: { flag: "q9", is: "wuling" }, to: { map: "ch09_changsha", x: 10, y: 16 } },
    // 武东村村口（路北）：朝北走进门触发
    { x: 9, y: 7, face: [0, -1], to: { map: "ch09s_village", x: 5, y: 7 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
