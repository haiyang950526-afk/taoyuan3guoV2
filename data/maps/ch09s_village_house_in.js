// 地图 · ch09s_village_house_in 民房（武东村民居室内；宝箱已启用）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09s_village_house_in"] = {
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
      lines: ["去长沙的商路一通，家里的山货也能换盐喽。"] },
  ],
  chests: [
    { x: 1,  y: 1, id: "c1", items: { "还魂丹": 2 } },
    { x: 14, y: 1, id: "c2", gold: 500 },
  ], // 宝箱已启用
  transitions: [
    // 门口：回武东村（落在民房门旁的路上）
    { x: 7, y: 9, to: { map: "ch09s_village", x: 4, y: 11 } },
    { x: 8, y: 9, to: { map: "ch09s_village", x: 4, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
