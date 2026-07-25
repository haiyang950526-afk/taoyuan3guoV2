// 地图 · ch09n_village 桂北村（ch09_field_n 荆南北野的村庄；第九章）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09n_village"] = {
  name: "桂北村",
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
      lines: ["赵太守降了刘使君，桂阳城总算不用打仗了。"] },
    { id: "vil2", x: 9, y: 6, color: "#8a7a9a", name: "村妇",
      lines: ["北边武陵的金太守脾气倔，怕是还要打一场。"] },
    { id: "vil3", x: 2, y: 6, color: "#7a8a9a", name: "老汉",
      lines: ["刘使君的兵不抢粮食，荆南百姓都说好。"] },
  ],
  chests: [],
  transitions: [
    // 村口：回荆南北野
    { x: 5, y: 8, to: { map: "ch09_field_n", x: 7, y: 8 } },
    { x: 6, y: 8, to: { map: "ch09_field_n", x: 7, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
