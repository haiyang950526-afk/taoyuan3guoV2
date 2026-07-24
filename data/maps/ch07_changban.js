// 地图 · ch07_changban 长坂坡（第七章大战场：赵云分线，连闯五阵）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch07_changban"] = {
  name: "长坂坡",
  grid: [
    "RRRRRRRRRRRRRRRRRRRRRRRR",
    "R...T......T......T....R",
    "G,,,,,,,,,,,,,,,,,,,,,,G",
    "R..T......T.......T....R",
    "R......................R",
    "R.....T......T.....T...R",
    "R......................R",
    "R..T....T.......T......R",
    "R......................R",
    "R......T.......T.......R",
    "R......................R",
    "R..T........T......T...R",
    "R......................R",
    "R.....T........T.......R",
    "R......................R",
    "RRRRRRRRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["曹军残兵"], ["博望曹军", "曹军残兵"]],
  npcs: [],
  chests: [],
  triggers: [
    // 赵云单骑救主：分线 + 五连战（末阵虎豹骑双波）
    { x: 10, y: 2, if: { flag: "q7", is: "changban" },
      do: [{ partySwap: { members: ["赵云"] } },
           { battle: "ch07_cb1",
             onWin: [{ say: "ch07.dangyang" }, { giveEquip: "丈八蛇矛" },
                     { warp: { map: "ch07_hanjin", x: 1, y: 6 } }] }] },
    { x: 11, y: 2, if: { flag: "q7", is: "changban" },
      do: [{ partySwap: { members: ["赵云"] } },
           { battle: "ch07_cb1",
             onWin: [{ say: "ch07.dangyang" }, { giveEquip: "丈八蛇矛" },
                     { warp: { map: "ch07_hanjin", x: 1, y: 6 } }] }] },
    { x: 12, y: 2, if: { flag: "q7", is: "changban" },
      do: [{ partySwap: { members: ["赵云"] } },
           { battle: "ch07_cb1",
             onWin: [{ say: "ch07.dangyang" }, { giveEquip: "丈八蛇矛" },
                     { warp: { map: "ch07_hanjin", x: 1, y: 6 } }] }] },
  ],
  transitions: [
    { x: 0, y: 2, to: { map: "ch06_field", x: 10, y: 15 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
