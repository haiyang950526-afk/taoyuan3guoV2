// 地图 · ch08_huarong 华容道（第八章末：曹操亲卫队"突围"强制结束，义释两种台词）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch08_huarong"] = {
  name: "华容道",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R................R",
    "R.T..........T...R",
    "R................R",
    "R....T.....T.....R",
    "R................R",
    "R................R",
    "R..T...........T.R",
    "G,,,,,,,,,,,,,,,.R",
    "R................R",
    "R....T......T....R",
    "R................R",
    "R..T.........T...R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["华容曹兵"], ["华容曹兵", "华容曹兵"]],
  npcs: [
    // 曹操亲卫队：第 6 回合强制结束（突围），按血量给两种义释台词
    { id: "caocao8", x: 16, y: 8, color: "#3a2a3a", name: "曹操",
      boss: "ch08_huarong",
      appearIf: { flag: "q8", is: "wulin" },
      onForceEnd: {
        win: [{ say: "ch08.huarongWin" }, { set: { q8: "done" } },
              { say: "ch08.chapterEnd" }, { say: "ch09.intro" },
              { chapter: "ch09" }, { set: { q9: "start" } },
              { warp: { map: "ch09_guiyang", x: 10, y: 16 } },
              { toast: "第九章 · 荆南四郡" }],
        lose: [{ say: "ch08.huarongLose" }, { set: { q8: "done" } },
               { say: "ch08.chapterEnd" }, { say: "ch09.intro" },
               { chapter: "ch09" }, { set: { q9: "start" } },
               { warp: { map: "ch09_guiyang", x: 10, y: 16 } },
               { toast: "第九章 · 荆南四郡" }],
      } },
  ],
  chests: [
    { x: 9, y: 1, id: "h1", items: { "诸葛连弩图": 1 } },
  ],
  transitions: [
    { x: 0, y: 8, to: { map: "ch08_xiakou", x: 16, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
