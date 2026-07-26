// 地图 · ch09n_village_house_in 民房（桂北村民居室内；原预留宝箱房启用，宝箱位暂空）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09n_village_house_in"] = {
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
      lines: ["桂阳降了刘使君，村里人总算能安心种田了。"] },
  ],
  chests: [], // 预留宝箱位（未来支线用）
  transitions: [
    // 门口：回桂北村（落在民房门旁的路上）
    { x: 7, y: 9, to: { map: "ch09n_village", x: 4, y: 11 } },
    { x: 8, y: 9, to: { map: "ch09n_village", x: 4, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
