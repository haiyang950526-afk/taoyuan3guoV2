// 地图 · ch05_sishui 汜水关（第五章第三关：守将卞喜）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch05_sishui"] = {
  name: "汜水关",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R................R",
    "#....T......T....R",
    "#................R",
    "G,,,,,,,,,,,,,,,,G",
    "#................R",
    "#..T..........T..R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["汜水守军"], ["汜水守军", "汜水守军"]],
  npcs: [
    { id: "bianxi", x: 15, y: 6, color: "#6a3a3a", name: "卞喜",
      boss: "ch05_bianxi",
      appearIf: { flag: "q5", is: "hanfu" },
      onWin: [{ set: { q5: "bianxi" } }, { toast: "汜水关已过，前往荥阳" }] },
  ],
  chests: [
    { x: 2, y: 9, id: "s1", items: { "还魂丹": 1 } },
  ],
  transitions: [
    { x: 0,  y: 8, to: { map: "ch05_luoyang", x: 10, y: 1 } },
    { x: 17, y: 8, if: { flag: "q5", is: "bianxi" }, to: { map: "ch05_xingyang", x: 1, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
