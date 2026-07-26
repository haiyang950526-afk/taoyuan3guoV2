// 地图 · ch09_changsha_house_in 民房（长沙城民居室内；16×10 统一规格，预留宝箱位暂空）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09_changsha_house_in"] = {
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
      lines: ["长沙米粮丰足，街上的湘莲与糯米最是有名。"] },
  ],
  chests: [], // 预留宝箱位（未来支线用）
  transitions: [
    // 门口：回长沙城（落在民房门旁一格，不踩入口 transition）
    { x: 7, y: 9, to: { map: "ch09_changsha", x: 13, y: 11 } },
    { x: 8, y: 9, to: { map: "ch09_changsha", x: 13, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
