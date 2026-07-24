// 地图 · ch05_dongling 东岭关（第五章第一关：守将孔秀）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch05_dongling"] = {
  name: "东岭关",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R................#",
    "R....T......T....#",
    "G,,,,,,,,,,,,,,,,G",
    "R................#",
    "R..T..........T..#",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["东岭守军"], ["东岭守军", "东岭守军"]],
  npcs: [
    { id: "kongxiu", x: 15, y: 7, color: "#6a3a3a", name: "孔秀",
      boss: "ch05_kongxiu",
      appearIf: { flag: "q5", is: "start" },
      onWin: [{ set: { q5: "kongxiu" } }, { toast: "东岭关已过，西进洛阳" }] },
  ],
  chests: [
    { x: 2, y: 2, id: "d1", items: { "金疮药": 2 } },
  ],
  transitions: [
    { x: 17, y: 8, if: { flag: "q5", is: "kongxiu" }, to: { map: "ch05_luoyang", x: 10, y: 16 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
