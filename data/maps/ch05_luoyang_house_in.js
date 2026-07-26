// 地图 · ch05_luoyang_house_in 民房（洛阳民居室内；16×10 统一规格，预留宝箱位暂空）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch05_luoyang_house_in"] = {
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
      lines: ["洛阳旧都，虽经战火，底子仍是天下第一等的繁华。"] },
  ],
  chests: [], // 预留宝箱位（未来支线用）
  transitions: [
    // 门口：回洛阳（落在民房门旁一格，不踩入口 transition）
    { x: 7, y: 9, to: { map: "ch05_luoyang", x: 16, y: 5 } },
    { x: 8, y: 9, to: { map: "ch05_luoyang", x: 16, y: 5 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
