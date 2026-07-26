// 地图 · ch00_city_house_in 民房（徐州城民居室内；16×10 统一规格，预留宝箱位暂空）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_city_house_in"] = {
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
      lines: ["徐州地处要冲，南来北往的客商都爱在这儿歇脚。"] },
  ],
  chests: [], // 预留宝箱位（未来支线用）
  transitions: [
    // 门口：回徐州城（落在民房门旁一格，不踩入口 transition）
    { x: 7, y: 9, to: { map: "ch00_city", x: 18, y: 4 } },
    { x: 8, y: 9, to: { map: "ch00_city", x: 18, y: 4 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
