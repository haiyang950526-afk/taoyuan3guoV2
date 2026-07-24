// 地图 · ch09_lingling 零陵（第九章：传檄而定，文戏）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09_lingling"] = {
  name: "零陵",
  grid: [
    "##########GG##########",
    "#....................#",
    "#..BBBB...BBBB.......#",
    "#..BBBB...BBBB....T..#",
    "#..BDBB...BBDB.......#",
    "#....................#",
    "#...T..........T.....#",
    "#....................#",
    "#..BBBB...BBBB.......#",
    "#..BBBB...BBBB....T..#",
    "#..BDBB...BBDB.......#",
    "#....................#",
    "#.....T......T.......#",
    "#....................#",
    "#....................#",
    "#....T.......T.......#",
    "#....................#",
    "##########GG##########",
  ],
  encounterTiles: [],
  npcs: [
    { id: "inn",  x: 4, y: 5, color: "#c98a4b", name: "旅店老板", shop: "ch09_inn" },
    // 刘度：传檄而定
    { id: "liudu", x: 10, y: 1, color: "#b8a05a", name: "刘度",
      appearIf: { flag: "q9", is: "changsha" },
      branches: [
        { say: "ch09.lingling",
          do: [{ set: { q9: "lingling" } }, { toast: "四郡悉平！回长沙见鲁肃" }] },
      ] },
    { id: "v1", x: 7, y: 7, color: "#4f8cff", name: "市民",
      lines: ["不战而降，是全城百姓的福气。", "刘使君仁义，名不虚传。"] },
  ],
  chests: [],
  transitions: [
    { x: 10, y: 17, to: { map: "ch09_changsha", x: 10, y: 1 } },
    { x: 11, y: 17, to: { map: "ch09_changsha", x: 10, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
