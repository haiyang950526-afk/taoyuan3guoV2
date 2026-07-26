// 地图 · ch09_lingling_house_in 民房（零陵民居室内；16×10 统一规格，预留宝箱位暂空）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09_lingling_house_in"] = {
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
      lines: ["零陵是荆南门户，四乡的山货土产都从这里中转。"] },
  ],
  chests: [], // 预留宝箱位（未来支线用）
  transitions: [
    // 门口：回零陵（落在民房门旁一格，不踩入口 transition）
    { x: 7, y: 9, to: { map: "ch09_lingling", x: 13, y: 11 } },
    { x: 8, y: 9, to: { map: "ch09_lingling", x: 13, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
