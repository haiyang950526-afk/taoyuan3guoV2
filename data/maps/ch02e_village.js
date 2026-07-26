// 地图 · ch02e_village 沛南村（ch02_field_east 沛县郊野的村庄；第二章；迷你城镇布局 20×14）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02e_village"] = {
  name: "沛南村",
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
      lines: ["吕温侯就屯在小沛，他手下兵士进村买东西，倒也给钱。"] },
    { id: "vil2", x: 6, y: 7, color: "#8a7a9a", name: "村妇",
      lines: ["袁术派纪灵带兵打来，村里人吓得把粮食都藏进了地窖。"] },
    { id: "vil3", x: 11, y: 12, color: "#7a8a9a", name: "老汉",
      lines: ["听说刘使君辕门射戟，一百五十步外射中画戟小枝，神了！"] },
  ],
  chests: [],
  transitions: [
    // 村口：回沛县郊野（落在村图标旁的草地）
    { x: 9, y: 13, to: { map: "ch02_field_east", x: 10, y: 16 } },
    { x: 10, y: 13, to: { map: "ch02_field_east", x: 10, y: 16 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
