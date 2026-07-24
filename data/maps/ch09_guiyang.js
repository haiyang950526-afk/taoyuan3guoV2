// 地图 · ch09_guiyang 桂阳（第九章首城：四郡集市+黑市游商；Boss 赵范部将）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09_guiyang"] = {
  name: "桂阳",
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
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板",   shop: "ch09_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "武器店老板", shop: "ch09_weapon" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "杂货店老板", shop: "ch09_item" },
    { id: "black",  x: 12, y: 11, color: "#b85a8a", name: "荆州游商",   shop: "ch09_black" },
    { id: "camp",   x: 16, y: 11, color: "#7a8a9a", name: "老兵", facility: "camp" },
    { id: "v1",     x: 7,  y: 7,  color: "#4f8cff", name: "市民",
      lines: ["城里来了个荆州游商，东西好是好，就是贵。", "赵云将军取桂阳，百姓都盼着太平。"] },
    // Boss：赵范部将（赵云取桂阳）
    { id: "zhaofan", x: 10, y: 1, color: "#5a6a4a", name: "赵范部将",
      boss: "ch09_guiyang",
      appearIf: { flag: "q9", is: "start" },
      onWin: [{ set: { q9: "guiyang" } }, { toast: "桂阳已定，北取武陵（野外北门）" }] },
  ],
  chests: [
    { x: 18, y: 14, id: "g1", gold: 900 },
  ],
  transitions: [
    { x: 10, y: 0,  to: { map: "ch09_field_n", x: 10, y: 10 } },
    { x: 11, y: 0,  to: { map: "ch09_field_n", x: 10, y: 10 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
