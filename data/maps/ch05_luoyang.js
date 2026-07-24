// 地图 · ch05_luoyang 洛阳（第五章大城：商店+编成所；守将韩福）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch05_luoyang"] = {
  name: "洛阳",
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
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板",   shop: "ch05_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "武器店老板", shop: "ch05_weapon" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "杂货店老板", shop: "ch05_item" },
    { id: "camp",   x: 16, y: 11, color: "#7a8a9a", name: "老兵", facility: "camp" },
    { id: "v1",     x: 7,  y: 7,  color: "#4f8cff", name: "市民",
      lines: ["洛阳刚遭过兵燹，好在店铺都重开了。", "关将军过五关的事，已经传开了。"] },
    { id: "v2",     x: 15, y: 13, color: "#d88a3a", name: "老者",
      lines: ["城里韩太守表面客气，背地里可不是善茬。", "往北出城就是汜水关。"] },
    // 韩福：第二关守将（在城北门拦路）
    { id: "hanfu", x: 10, y: 1, color: "#6a3a3a", name: "韩福",
      boss: "ch05_hanfu",
      appearIf: { flag: "q5", is: "kongxiu" },
      onWin: [{ set: { q5: "hanfu" } }, { toast: "北门已开，前往汜水关" }] },
  ],
  chests: [
    { x: 18, y: 14, id: "l1", gold: 400 },
  ],
  transitions: [
    { x: 10, y: 17, to: { map: "ch05_dongling", x: 16, y: 8 } },
    { x: 11, y: 17, to: { map: "ch05_dongling", x: 16, y: 8 } },
    { x: 10, y: 0,  if: { flag: "q5", is: "hanfu" }, to: { map: "ch05_sishui", x: 1, y: 8 } },
    { x: 11, y: 0,  if: { flag: "q5", is: "hanfu" }, to: { map: "ch05_sishui", x: 1, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
