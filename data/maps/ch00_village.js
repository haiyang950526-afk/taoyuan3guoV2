// 地图 · ch00_village 徐家庄（ch00_field 徐州城外的村庄；序章）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_village"] = {
  name: "徐家庄",
  grid: [
    "RRRRRRRRRRRRR",
    "R.BB.BB.BB..R",
    "R.BD.BD.BD..R",
    "R...........R",
    "R..BBBB.....R",
    "R..BBBB.....R",
    "R...........R",
    "R....,,.....R",
    "RRRRR,,RRRRRR",
  ],
  encounterTiles: [],
  // 建筑招牌（画在顶部居中的 B 格上）
  signs: [
    { x: 4, y: 4, text: "客", color: "#ffd166" },
  ],
  // 上方三栋空房为预留宝箱房：只放建筑，门口不放 transition（未来放宝箱用）
  npcs: [
    { id: "inn", x: 4, y: 6, color: "#c98a4b", name: "旅店老板", shop: "vil_inn" },
    { id: "herb", x: 8, y: 5, color: "#6a9a5a", name: "药铺掌柜", shop: "vil_item" },
    { id: "vil1", x: 2, y: 3, color: "#9a8a6a", name: "老汉",
      lines: ["村里日子还算安稳，就是山里的黄巾余党时不时下来抢粮。"] },
    { id: "vil2", x: 9, y: 6, color: "#8a7a9a", name: "村妇",
      lines: ["曹老太爷在境内遇害，曹将军怕是要兴兵报仇，徐州要遭殃喽。"] },
    { id: "vil3", x: 2, y: 6, color: "#7a8a9a", name: "樵夫",
      lines: ["北边山里有处山洞，黑黢黢的，村里人砍柴都绕着走。"] },
  ],
  chests: [],
  transitions: [
    // 村口：回徐州城外
    { x: 5, y: 8, to: { map: "ch00_field", x: 4, y: 14 } },
    { x: 6, y: 8, to: { map: "ch00_field", x: 4, y: 14 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
