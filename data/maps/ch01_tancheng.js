// 地图 · ch01_tancheng 郯城（第一章主城：旅店+武器店+杂货店+守将）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_tancheng"] = {
  name: "郯城",
  grid: [
    "######################",
    "#....T..........T....#",
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
    "#....................#",
    "#....................#",
    "##########GG##########",
  ],
  encounterTiles: [],
  npcs: [
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板",   shop: "ch01_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "武器店老板", shop: "ch01_weapon" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "杂货店老板", shop: "ch01_item" },
    { id: "v1",     x: 7,  y: 7,  color: "#4f8cff", name: "村民", linesKey: "ch01.tanVillager" },
    { id: "v2",     x: 15, y: 13, color: "#d88a3a", name: "老者", linesKey: "ch01.tanElder" },
    // 郯城守将：第一章任务链引导人
    { id: "general", x: 12, y: 11, color: "#b03a3a", name: "郯城守将",
      branches: [
        { if: { flag: "q1", is: "accepted" }, say: "ch01.tanGeneral1",
          do: [{ set: { q1: "ready" } }, { toast: "出城在大路上巡哨一遭" }] },
        { if: { flag: "q1", is: "ready" }, say: "ch01.tanGeneral1" },
        { if: { flag: "q1", is: "patrolDone" }, say: "ch01.tanGeneral2",
          do: [{ set: { q1: "march" } }, { toast: "泗水古道（野外东门）已可通行" }] },
        { if: { flag: "q1", is: "march" }, say: "ch01.tanGeneral2" },
        { if: { flag: "q1", is: "yujinDone" },
          say: ["于禁已退，曹操大军拔营东归！", "快回徐州城，向陶使君报捷吧。"] },
      ] },
  ],
  chests: [],
  transitions: [
    { x: 10, y: 17, to: { map: "ch01_field", x: 11, y: 1 } },
    { x: 11, y: 17, to: { map: "ch01_field", x: 11, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
