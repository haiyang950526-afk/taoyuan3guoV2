// 地图 · ch11_hanzhong 汉中（终章主城：军需商店；出师表）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch11_hanzhong"] = {
  name: "汉中",
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
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "军需客栈",   shop: "ch11_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "军需官",     shop: "ch11_weapon" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "军需药材铺", shop: "ch11_item" },
    { id: "smith",  x: 16, y: 11, color: "#a87a4a", name: "铁匠", facility: "smith" },
    { id: "camp",   x: 16, y: 13, color: "#7a8a9a", name: "老兵", facility: "camp" },
    { id: "v1",     x: 7,  y: 7,  color: "#4f8cff", name: "市民",
      lines: ["丞相《出师表》，军中人人传诵。", "北伐北伐！还于旧都！"] },
    // 诸葛亮：出师表
    { id: "zhuge11", x: 10, y: 1, color: "#e8e8f0", name: "诸葛亮",
      appearIf: { flag: "q11", is: "start" },
      branches: [
        { say: "ch11.intro",
          do: [{ set: { q11: "tianshui" } }, { toast: "出兵天水（北门外）" }] },
      ] },
  ],
  chests: [],
  transitions: [
    { x: 10, y: 0,  if: { flag: "q11", in: ["tianshui", "jiangwei"] }, to: { map: "ch11_tianshui", x: 8, y: 10 } },
    { x: 11, y: 0,  if: { flag: "q11", in: ["tianshui", "jiangwei"] }, to: { map: "ch11_tianshui", x: 8, y: 10 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
