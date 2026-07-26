// 地图 · ch10_village 川西村（ch10_field 西川野外的村庄；第十章；迷你城镇布局 20×14）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch10_village"] = {
  name: "川西村",
  grid: [
    "RRRRRRRRRRRRRRRRRRRR",
    "R..T...........T...R",
    "R.BBBB.....BBBB....R",
    "R.BBBB.....BBBB....R",
    "R.BDBB.....BDBB....R",
    "R..,........,......R",
    "R..,........,...T..R",
    "R..,,,,,,,,,,......R",
    "R.BBBB...,,........R",
    "R.BBBB...,,....v...R",
    "R.BDBB...,,....T...R",
    "R..,,,,,,,.........R",
    "R........,,.....T..R",
    "RRRRRRRRRGGRRRRRRRRR",
  ],
  encounterTiles: [],
  // 建筑招牌（画在建筑顶格）
  signs: [
    { x: 3, y: 2, text: "客", color: "#ffd166" },
    { x: 12, y: 2, text: "药", color: "#ffd166" },
  ],
  // 左下民房为预留宝箱房：只放建筑，门口不放 transition（未来放宝箱用）
  npcs: [
    { id: "inn", x: 4, y: 5, color: "#c98a4b", name: "旅店老板", shop: "vil_inn" },
    { id: "herb", x: 13, y: 5, color: "#6a9a5a", name: "药铺掌柜", shop: "vil_item" },
    { id: "vil1", x: 14, y: 9, color: "#9a8a6a", name: "村民",
      lines: ["刘璋暗弱，西川多少豪杰都盼着换个明主。"] },
    { id: "vil2", x: 6, y: 7, color: "#8a7a9a", name: "村妇",
      lines: ["北边雒城的张任硬气得很，刘使君攻了快一年还没打下来。"] },
    { id: "vil3", x: 11, y: 12, color: "#7a8a9a", name: "老汉",
      lines: ["落凤坡那地方邪性，听说庞军师就殁在那儿。"] },
  ],
  chests: [],
  transitions: [
    // 村口：回西川野外（落在村图标旁的草地）
    { x: 9, y: 13, to: { map: "ch10_field", x: 9, y: 13 } },
    { x: 10, y: 13, to: { map: "ch10_field", x: 9, y: 13 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
