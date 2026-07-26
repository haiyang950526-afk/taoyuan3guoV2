// 地图 · ch06_xiangyang_house_in 民房（襄阳民居室内；16×10 统一规格，宝箱已启用）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_xiangyang_house_in"] = {
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
      lines: ["襄阳文风鼎盛，隆中隐士、水镜先生都在左近。"] },
  ],
  chests: [
    { x: 14, y: 1, id: "c1", items: { "甘露": 1 } },
  ], // 宝箱已启用
  transitions: [
    // 门口：回襄阳（落在民房门旁一格，不踩入口 transition）
    { x: 7, y: 9, to: { map: "ch06_xiangyang", x: 13, y: 11 } },
    { x: 8, y: 9, to: { map: "ch06_xiangyang", x: 13, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
