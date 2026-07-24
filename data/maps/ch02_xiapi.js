// 地图 · ch02_xiapi 下邳城（第二章大城：旅店+武器店+杂货店；南通淮水渡口）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02_xiapi"] = {
  name: "下邳城",
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
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板",   shop: "ch02b_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "武器店老板", shop: "ch02b_weapon" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "杂货店老板", shop: "ch02b_item" },
    // 失下邳前后，城中人口风不同
    { id: "v1", x: 7, y: 7, color: "#4f8cff", name: "村民",
      branches: [
        { if: { flag: "q2", in: ["lost", "done"] },
          say: ["温侯进了城，秋毫无犯……可大伙儿心里都不踏实。"] },
        { say: "ch02.xiapiVillager" },
      ] },
    { id: "v2", x: 15, y: 13, color: "#d88a3a", name: "老者", linesKey: "ch02.xiapiElder" },
    // 铁匠铺（武器强化，消耗精铁；第十章正式开放，此处先有设施）
    { id: "smith", x: 16, y: 11, color: "#a87a4a", name: "铁匠", facility: "smith" },
  ],
  chests: [],
  transitions: [
    { x: 10, y: 0,  to: { map: "ch02_field_south", x: 15, y: 16 } },
    { x: 11, y: 0,  to: { map: "ch02_field_south", x: 15, y: 16 } },
    { x: 10, y: 17, to: { map: "ch02_huaishui", x: 11, y: 1 } },
    { x: 11, y: 17, to: { map: "ch02_huaishui", x: 11, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
