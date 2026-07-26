// 地图 · ch03_village_house_in 民房（许南村民居室内；宝箱已启用）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch03_village_house_in"] = {
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
      lines: ["天子脚下的村子，租子却比哪儿都重，唉。"] },
  ],
  chests: [
    { x: 1,  y: 1, id: "c1", items: { "清泉": 1 } },
    { x: 14, y: 1, id: "c2", gold: 200 },
  ], // 宝箱已启用
  transitions: [
    // 门口：回许南村（落在民房门旁的路上）
    { x: 7, y: 9, to: { map: "ch03_village", x: 4, y: 11 } },
    { x: 8, y: 9, to: { map: "ch03_village", x: 4, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
