// 地图 · ch00_tavern_in 酒馆（徐州城设施室内；樗蒲赌坊 facility: tavern）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_tavern_in"] = {
  name: "酒馆",
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
    { id: "tavern", x: 4, y: 2, color: "#b08a4a", name: "酒馆老板", facility: "tavern" },
    { id: "drunk", x: 1, y: 3, color: "#9a6a5a", name: "醉汉",
      lines: ["呃……樗蒲再来一把！要是掷出个全白，嘿嘿，有缘自见分晓……"] },
  ],
  chests: [],
  transitions: [
    { x: 7, y: 9, to: { map: "ch00_city", x: 8, y: 9 } },
    { x: 8, y: 9, to: { map: "ch00_city", x: 8, y: 9 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
