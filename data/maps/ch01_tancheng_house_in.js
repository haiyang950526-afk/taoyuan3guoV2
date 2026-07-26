// 地图 · ch01_tancheng_house_in 民房（郯城民居室内；16×10 统一规格，预留宝箱位暂空）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_tancheng_house_in"] = {
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
      lines: ["郯城离海不远，海风一吹，城里的鱼虾市就热闹起来。"] },
  ],
  chests: [], // 预留宝箱位（未来支线用）
  transitions: [
    // 门口：回郯城（落在民房门旁一格，不踩入口 transition）
    { x: 7, y: 9, to: { map: "ch01_tancheng", x: 4, y: 16 } },
    { x: 8, y: 9, to: { map: "ch01_tancheng", x: 4, y: 16 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
