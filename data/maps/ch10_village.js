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
  // 左下民房：原预留宝箱房，现已可进入（室内 ch10_village_house_in，宝箱位预留）
  npcs: [
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
    // 客栈/药铺室内下钻（朝门才进，路过不触发）
    { x: 3, y: 5, face: [0, -1], to: { map: "ch10_village_inn_in", x: 4, y: 4 } },
    { x: 12, y: 5, face: [0, -1], to: { map: "ch10_village_item_in", x: 4, y: 4 } },
    // 民房下钻（朝门才进，路过不触发）
    { x: 3, y: 11, face: [0, -1], to: { map: "ch10_village_house_in", x: 5, y: 6 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
