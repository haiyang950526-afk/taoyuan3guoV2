// 地图 · ch00_village 徐家庄（ch00_field 徐州城外的村庄；序章；迷你城镇布局 20×14）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_village"] = {
  name: "徐家庄",
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
    { id: "vil1", x: 14, y: 9, color: "#9a8a6a", name: "老汉",
      lines: ["村里日子还算安稳，就是山里的黄巾余党时不时下来抢粮。"] },
    { id: "vil2", x: 6, y: 7, color: "#8a7a9a", name: "村妇",
      lines: ["曹老太爷在境内遇害，曹将军怕是要兴兵报仇，徐州要遭殃喽。"] },
    { id: "vil3", x: 11, y: 12, color: "#7a8a9a", name: "樵夫",
      lines: ["北边山里有处山洞，黑黢黢的，村里人砍柴都绕着走。"] },
  ],
  chests: [],
  transitions: [
    // 村口：回徐州城外（落在村图标旁的路上）
    { x: 9, y: 13, to: { map: "ch00_field", x: 4, y: 14 } },
    { x: 10, y: 13, to: { map: "ch00_field", x: 4, y: 14 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
