// 地图 · ch01_village_house_in 民房（郯南村民居室内；宝箱已启用）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_village_house_in"] = {
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
      lines: ["曹兵把城围了，村里存粮不多，客人就将就喝口热水吧。"] },
  ],
  chests: [
    { x: 14, y: 1, id: "c1", gold: 80 },
  ], // 宝箱已启用
  transitions: [
    // 门口：回郯南村（落在民房门旁的路上）
    { x: 7, y: 9, to: { map: "ch01_village", x: 4, y: 11 } },
    { x: 8, y: 9, to: { map: "ch01_village", x: 4, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
