// 地图 · ch07_bowang 博望坡（第七章战场：伏击夏侯惇，先守后火攻）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch07_bowang"] = {
  name: "博望坡",
  grid: [
    "RRRRRRRRRRRRRRRRRRRR",
    "R....T........T....R",
    "R........T.........R",
    "R..T..........T....R",
    "R..................R",
    "R.....T......T.....R",
    "R..................R",
    "R..T......T........R",
    "R..................R",
    "R......T.....T.....R",
    "R..................R",
    "R..T.......T.......R",
    "R........,,,.......R",
    "RRRRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["博望曹军"], ["博望曹军", "曹军残兵"]],
  npcs: [],
  chests: [
    { x: 17, y: 4, id: "b1", gold: 600 },
  ],
  triggers: [
    // 伏击战：夏侯惇（第 3 回合火攻演出）
    { x: 9,  y: 9, if: { flag: "q7", is: "start" },
      do: [{ battle: "ch07_bowang",
             onWin: [{ say: "ch07.bowangDone" }, { set: { q7: "bowang" } },
                     { warp: { map: "ch06_xinye", x: 10, y: 14 } },
                     { toast: "回新野布防" }] }] },
    { x: 10, y: 9, if: { flag: "q7", is: "start" },
      do: [{ battle: "ch07_bowang",
             onWin: [{ say: "ch07.bowangDone" }, { set: { q7: "bowang" } },
                     { warp: { map: "ch06_xinye", x: 10, y: 14 } },
                     { toast: "回新野布防" }] }] },
  ],
  transitions: [],
};

if (typeof module !== "undefined") module.exports = MAPS;
