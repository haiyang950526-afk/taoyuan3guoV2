// 地图 · ch00_dojo_in 训练所（徐州城设施室内；教头 facility: dojo）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_dojo_in"] = {
  name: "训练所",
  grid: [
    "BBBBBBBBBBBBBBBB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLBBBBBB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BBBBLLBLLLcttcLB",
    "BLLLLLLLLLLLLLLB",
    "BLLLLLLLLLLLLLLB",
    "BBBBBBB,,BBBBBBB",
  ],
  encounterTiles: [],
  npcs: [
    { id: "dojo", x: 4, y: 2, color: "#8a7a6a", name: "教头", facility: "dojo" },
  ],
  chests: [],
  transitions: [
    { x: 7, y: 9, to: { map: "ch00_city", x: 20, y: 14 } },
    { x: 8, y: 9, to: { map: "ch00_city", x: 20, y: 14 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
