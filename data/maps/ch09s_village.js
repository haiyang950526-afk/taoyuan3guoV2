// 地图 · ch09s_village 武东村（ch09_field_s 荆南南野的村庄；第九章）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09s_village"] = {
  name: "武东村",
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
    { id: "vil1", x: 2, y: 3, color: "#9a8a6a", name: "村民",
      lines: ["金太守拒不纳降，武陵城破那天，村里都听得见喊杀声。"] },
    { id: "vil2", x: 9, y: 6, color: "#8a7a9a", name: "村妇",
      lines: ["东边长沙有位黄老将军，六十岁还能开三石弓，百步穿杨。"] },
    { id: "vil3", x: 2, y: 6, color: "#7a8a9a", name: "货郎",
      lines: ["仗打完了，去长沙的商路又通喽。"] },
  ],
  chests: [],
  transitions: [
    // 村口：回荆南南野
    { x: 5, y: 8, to: { map: "ch09_field_s", x: 9, y: 8 } },
    { x: 6, y: 8, to: { map: "ch09_field_s", x: 9, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
