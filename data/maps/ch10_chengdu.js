// 地图 · ch10_chengdu 成都（第十章主城：大宝库 + 铁匠铺；受降文戏）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch10_chengdu"] = {
  name: "成都",
  grid: [
    "##########GG##########",
    "#....................#",
    "#..BBBB...BBBB.......#",
    "#..BBBB...BBBB....T..#",
    "#..BDBB...BBDB.......#",
    "#....................#",
    "#...T..........T.....#",
    "#....................#",
    "#..BBBB...BBBB.......G",
    "#..BBBB...BBBB....T..G",
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
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板",   shop: "ch10_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "武器店老板", shop: "ch10_weapon" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "杂货店老板", shop: "ch10_item" },
    { id: "smith",  x: 16, y: 11, color: "#a87a4a", name: "铁匠", facility: "smith" },
    { id: "camp",   x: 16, y: 13, color: "#7a8a9a", name: "老兵", facility: "camp" },
    { id: "v1",     x: 7,  y: 7,  color: "#4f8cff", name: "市民",
      lines: ["天府之国，总算迎来了明主。", "铁匠铺能强化兵器，就是精铁难得。"] },
    // 刘璋：成都受降
    { id: "liuzhang10", x: 10, y: 1, color: "#b8a05a", name: "刘璋",
      appearIf: { flag: "q10", is: "mianzhu" },
      branches: [
        { say: "ch10.chengdu",
          do: [{ set: { q10: "chengdu" } }, { toast: "东出定军山，争夺汉中（东门）" }] },
      ] },
  ],
  chests: [
    { x: 18, y: 14, id: "c1", items: { "精铁": 2 } },
  ],
  transitions: [
    // 东门：定军山（受降后开放）
    { x: 21, y: 8,  if: { flag: "q10", is: "chengdu" }, to: { map: "ch10_dingjun", x: 1, y: 8 } },
    { x: 21, y: 9,  if: { flag: "q10", is: "chengdu" }, to: { map: "ch10_dingjun", x: 1, y: 8 } },
    { x: 10, y: 17, to: { map: "ch10_field", x: 22, y: 8 } },
    { x: 11, y: 17, to: { map: "ch10_field", x: 22, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
