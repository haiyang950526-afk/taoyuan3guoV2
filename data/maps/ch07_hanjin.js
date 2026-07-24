// 地图 · ch07_hanjin 汉津渡（第七章末：会合东渡，衔接第八章）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch07_hanjin"] = {
  name: "汉津渡",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "G,,,,,,,MMMM.....R",
    "R.........WWWWW..R",
    "R..T.....WWWWWW..R",
    "R.......WWWWW....R",
    "R....T.....T.....R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: [],
  npcs: [
    // 船夫：会合 → 还原主队 → 东渡（第八章）
    { id: "boatman", x: 11, y: 6, color: "#8ab8d8", name: "船夫",
      appearIf: { flag: "q7", is: "changban" },
      branches: [
        { say: "ch07.hanjin",
          do: [{ partyRestore: true }, { leave: "百姓" }, { set: { q7: "done" } },
               { say: "ch08.intro" }, { chapter: "ch08" }, { set: { q8: "start" } },
               { warp: { map: "ch08_chaisang", x: 10, y: 16 } },
               { toast: "第八章 · 赤壁鏖兵" }] },
      ] },
  ],
  chests: [],
  transitions: [
    { x: 0, y: 6, to: { map: "ch07_changban", x: 1, y: 2 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
