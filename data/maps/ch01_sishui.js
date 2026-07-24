// 地图 · ch01_sishui 泗水古道（第一章战场迷宫，尽头是于禁）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch01_sishui"] = {
  name: "泗水古道",
  grid: [
    "RRRRRRRRRRRRRRRRRRRR",
    "R...WW...T....T....R",
    "R.T.WW......TT.....R",
    "R...WW..T......T...R",
    "R,,,WW......T......R",
    "R,,WW...T..........R",
    "R,,..........T..T..R",
    "R,,.T...TT.........R",
    "G,,,,,,,,,,,,,,,,,.R",
    "R........T.........R",
    "R..T..........TT...R",
    "R..........WW......R",
    "R.T....T...WW...T..R",
    "R..........WW......R",
    "R....T.............R",
    "RRRRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["曹兵", "曹军弓手"], ["曹军弓手", "曹军弓手"], ["曹兵", "曹军什长"], ["曹军什长"]],
  npcs: [
    { id: "yujin", x: 17, y: 1, color: "#3a4a78", name: "于禁",
      boss: "ch01_boss",
      appearIf: { flag: "q1", is: "march" },
      onWin: [{ say: "ch01.caoRetreat" }, { set: { q1: "yujinDone" } },
              { toast: "曹操退兵了！回徐州城报捷" }] },
  ],
  chests: [
    { x: 1, y: 13, id: "s1", items: { "金疮药": 1, "草药": 2 } },
  ],
  transitions: [
    { x: 0, y: 8, to: { map: "ch01_field", x: 22, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
