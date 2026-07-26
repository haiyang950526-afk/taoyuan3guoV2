// 地图 · ch02s_village_house_in 民房（邳西村民居室内；宝箱已启用）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02s_village_house_in"] = {
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
      lines: ["沂水泗水绕着下邳流，就怕哪天真灌进城去。"] },
  ],
  chests: [
    { x: 14, y: 1, id: "c1", items: { "金疮药": 2 } },
  ], // 宝箱已启用
  transitions: [
    // 门口：回邳西村（落在民房门旁的路上）
    { x: 7, y: 9, to: { map: "ch02s_village", x: 4, y: 11 } },
    { x: 8, y: 9, to: { map: "ch02s_village", x: 4, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
