// 地图 · ch01_village 郯南村（ch01_field 郯城野外的村庄；第一章）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_village"] = {
  name: "郯南村",
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
      lines: ["曹军把郯城围得水泄不通，村里的壮丁都被拉去运粮了。"] },
    { id: "vil2", x: 9, y: 6, color: "#8a7a9a", name: "村妇",
      lines: ["陶使君仁厚，百姓都念他的好，可这仗什么时候是个头啊。"] },
    { id: "vil3", x: 2, y: 6, color: "#7a8a9a", name: "货郎",
      lines: ["东边的泗水古道如今全是曹兵哨卡，生意没法做喽。"] },
  ],
  chests: [],
  transitions: [
    // 村口：回郯城野外
    { x: 5, y: 8, to: { map: "ch01_field", x: 11, y: 14 } },
    { x: 6, y: 8, to: { map: "ch01_field", x: 11, y: 14 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
