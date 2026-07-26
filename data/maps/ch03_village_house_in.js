// 地图 · ch03_village_house_in 民房（许南村民居室内；原预留宝箱房启用，宝箱位暂空）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch03_village_house_in"] = {
  name: "民房",
  grid: [
    "BBBBBBBBBBBB",
    "BLLLLLLLLLLB",
    "BLLLLLLLLLLB",
    "BLLLLLLLLLLB",
    "BLLLLLLLLLLB",
    "BLLLLLLLLLLB",
    "BLLLLLLLLLLB",
    "BBBBB,,BBBBB",
  ],
  encounterTiles: [],
  npcs: [
    { id: "owner", x: 4, y: 2, color: "#9a8a6a", name: "屋主",
      lines: ["天子脚下的村子，租子却比哪儿都重，唉。"] },
  ],
  chests: [], // 预留宝箱位（未来支线用）
  transitions: [
    // 门口：回许南村（落在民房门旁的路上）
    { x: 5, y: 7, to: { map: "ch03_village", x: 4, y: 11 } },
    { x: 6, y: 7, to: { map: "ch03_village", x: 4, y: 11 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
