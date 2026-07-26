// 地图 · ch06_village_house_in 民房（新西村民居室内；宝箱已启用）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_village_house_in"] = {
  name: "民房",
  grid: [
    "BBBBBBBBBBBBBBBB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BBBBLLBLLLcttcLB",
    "BLLLLLLLLLLLLLLB",
    "BLLLLLLLLLLLLLLB",
    "BBBBBBB,,BBBBBBB",
  ],
  encounterTiles: [],
  npcs: [
    { id: "owner", x: 4, y: 2, color: "#9a8a6a", name: "屋主",
      lines: ["自打刘使君屯兵新野，村里夜里都不用闭户喽。"] },
  ],
  chests: [
    { x: 1,  y: 1, id: "c1", items: { "还魂丹": 1 } },
    { x: 14, y: 1, id: "c2", gold: 300 },
  ], // 宝箱已启用
  transitions: [
    // 门口：回新西村（落在民房门旁的路上）
    { x: 7, y: 9, to: { map: "ch06_village", x: 4, y: 11 } },
    { x: 8, y: 9, to: { map: "ch06_village", x: 4, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
