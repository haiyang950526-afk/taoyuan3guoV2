// 地图 · ch09_field_n 荆南北野（第九章野外：桂阳↔武陵）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09_field_n"] = {
  name: "荆南北野",
  grid: [
    "RRRRRRRR##GG##RRRRRRRRRR",
    "R.........,,...........R",
    "R..T......,,.....T.....R",
    "R.........,,,..........R",
    "R....T......,,,....T...R",
    "R............,,,.......R",
    "R..T..........,,....T..R",
    "R......h.......,,......R",
    "R.....T,.......,,......R",
    "R..............,,......R",
    "R..T...........,,...T..R",
    "RRRRRRRR##GG##RRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.11,
  encounterGroups: [["荆南兵"], ["荆南兵", "荆南弓手"], ["荆南弓手", "荆南弓手"]],
  npcs: [],
  chests: [
    { x: 16, y: 4, id: "f1", items: { "还魂丹": 2 } },
  ],
  transitions: [
    { x: 10, y: 11, to: { map: "ch09_guiyang", x: 10, y: 1 } },
    { x: 11, y: 11, to: { map: "ch09_guiyang", x: 10, y: 1 } },
    { x: 10, y: 0,  if: { flag: "q9", is: "guiyang" }, to: { map: "ch09_wuling", x: 10, y: 16 } },
    { x: 11, y: 0,  if: { flag: "q9", is: "guiyang" }, to: { map: "ch09_wuling", x: 10, y: 16 } },
    // 桂北村村口（路西）：走上小屋图标即进村
    { x: 7, y: 7, to: { map: "ch09n_village", x: 9, y: 12 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
