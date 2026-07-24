// 地图 · ch00_field 徐州城外（序章野外；东侧两门：东南通郯城野外，东北通小沛方向）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_field"] = {
  name: "徐州城外",
  grid: [
    "RRRRRRRRRRRRRRRRRRRCCRRR",
    "RCC..TT..........WW....R",
    "RC...TTT....T...WW.....G",
    "R......T.....T...WW....G",
    "R....................,.R",
    "R..T......T......T..,..R",
    "R...................,..R",
    "R..T.....T..........,..R",
    "R..................,T..G",
    "R......T......T....,...G",
    "R..T..............,,...R",
    "R.........T......,.....R",
    "R..T............,..T...R",
    "R......T........,......R",
    "R..T.......T....,...T..R",
    "R....T..........,WW....R",
    "R..............,WW.....R",
    "RRCCRRRRRRGGRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.12,
  encounterGroups: [["黄巾贼"], ["黄巾贼", "黄巾贼"], ["黄巾贼", "黄巾弓手"]],
  npcs: [],
  chests: [
    { x: 13, y: 14, id: "f1", items: { "草药": 2 } },
  ],
  triggers: [
    // 第四章：攻城连战（斩车胄据徐州）
    { x: 10, y: 15, if: { flag: "q4", is: "start" },
      do: [{ battle: "ch04_siege",
             onWin: [{ say: "ch04.xuzhouTaken" }, { set: { q4: "xuzhou" } },
                     { warp: { map: "ch00_city", x: 10, y: 16 } },
                     { toast: "徐州光复！入城戒备" }] }] },
    { x: 11, y: 15, if: { flag: "q4", is: "start" },
      do: [{ battle: "ch04_siege",
             onWin: [{ say: "ch04.xuzhouTaken" }, { set: { q4: "xuzhou" } },
                     { warp: { map: "ch00_city", x: 10, y: 16 } },
                     { toast: "徐州光复！入城戒备" }] }] },
    // 第四章：夜袭曹营（演出战，失败剧情）
    { x: 21, y: 7, if: { flag: "q4", is: "ye" },
      do: [{ battle: "ch04_yexi",
             onWin: [{ say: "ch04.shisan" },
                     { partySwap: { members: ["关羽", "周仓"] } },
                     { say: "ch04.zhoucang" },
                     { set: { q4: "split" } },
                     { warp: { map: "ch04_tushan", x: 1, y: 2 } }] }] },
  ],
  transitions: [
    { x: 2,  y: 1,  to: { map: "ch00_cave", x: 9,  y: 11 } },
    { x: 1,  y: 1,  to: { map: "ch00_cave", x: 10, y: 11 } },
    { x: 10, y: 17, to: { map: "ch00_city", x: 10, y: 16 } },
    { x: 11, y: 17, to: { map: "ch00_city", x: 10, y: 16 } },
    // 北缘山地洞口：北山山洞（迷宫）
    { x: 19, y: 0,  to: { map: "ch00_cave2", x: 8, y: 11 } },
    { x: 20, y: 0,  to: { map: "ch00_cave2", x: 9, y: 11 } },
    // 南缘山地洞口：藏宝山洞（酒馆樗蒲首次全白后洞口才生效）
    { x: 2,  y: 17, if: { flag: "tavern_clue", exists: true }, to: { map: "ch00_cave3", x: 6, y: 6 } },
    { x: 3,  y: 17, if: { flag: "tavern_clue", exists: true }, to: { map: "ch00_cave3", x: 6, y: 6 } },
    // 东南门：第一章起通郯城野外
    { x: 23, y: 8,  if: { flag: "q1", exists: true }, to: { map: "ch01_field", x: 1, y: 8 } },
    { x: 23, y: 9,  if: { flag: "q1", exists: true }, to: { map: "ch01_field", x: 1, y: 8 } },
    // 东北门：第二章起通小沛方向
    { x: 23, y: 2,  if: { flag: "q2", exists: true }, to: { map: "ch02_field_east", x: 1, y: 2 } },
    { x: 23, y: 3,  if: { flag: "q2", exists: true }, to: { map: "ch02_field_east", x: 1, y: 2 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
