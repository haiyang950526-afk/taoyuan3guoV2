// 地图 · ch06_tanxi 檀溪（第六章：限时脱出——30 步内到渡口，归零遇蔡瑁追兵）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_tanxi"] = {
  name: "檀溪",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "G,,,,,,,,,,,,,,,,G",
    "R......WWWW......R",
    "R..T...WWWW...T..R",
    "R......WWWW......R",
    "R....T......T....R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: [],
  npcs: [],
  chests: [],
  triggers: [
    // 入口：启动限时脱出（归零遇蔡瑁追兵；全歼有额外奖励）
    { x: 1, y: 6, if: { flag: "q6", is: "tanxi" },
      escapeTimer: { rounds: 30, penalty: "ch06_caimao",
        onWin: [{ say: ["（全歼追兵！缴获颇丰。）"] },
                { give: ["还魂丹", 2] }, { gold: 500 }] } },
    // 渡口：脱出成功
    { x: 16, y: 6, if: { flag: "q6", is: "tanxi" },
      escapeGoal: true,
      do: [{ say: "ch06.tanxiDone" }, { set: { q6: "shuijing" } },
           { warp: { map: "ch06_field", x: 10, y: 15 } },
           { toast: "去城东南水镜庄，访司马徽" }] },
  ],
  transitions: [],
};

if (typeof module !== "undefined") module.exports = MAPS;
