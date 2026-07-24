// 地图 · ch11_qishan 祁山（终章：连破三阵——郭淮/孙礼/曹真）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch11_qishan"] = {
  name: "祁山",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R................R",
    "R....T......T....R",
    "R................R",
    "G,,,,,,,,,,,,,,,,G",
    "R................R",
    "R..T..........T..R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["魏军先锋", "魏军虎贲"], ["魏军虎贲"]],
  npcs: [
    // 三阵守将（姜维/魏延/赵云高光各一战）
    { id: "guohuai", x: 14, y: 8, color: "#4a4a5a", name: "郭淮",
      boss: "ch11_guohuai",
      appearIf: { flag: "q11", is: "retreat" }, hideIf: { flag: "z1", is: true },
      onWin: [{ set: { z1: true } }, { inc: { zhens: 1 } }, { toast: "第一阵已破（姜维建功）" }] },
    { id: "sunli", x: 14, y: 5, color: "#5a4a4a", name: "孙礼",
      boss: "ch11_sunli",
      appearIf: { flag: "z1", is: true }, hideIf: { flag: "z2", is: true },
      onWin: [{ set: { z2: true } }, { inc: { zhens: 1 } }, { toast: "第二阵已破（魏延陷阵）" }] },
    { id: "caozhen", x: 14, y: 2, color: "#3a3a5a", name: "曹真",
      boss: "ch11_caozhen",
      appearIf: { flag: "z2", is: true }, hideIf: { flag: "z3", is: true },
      onWin: [{ set: { z3: true } }, { inc: { zhens: 1 } },
              { set: { q11: "qishan" } }, { toast: "三阵连破！决战五丈原（东门）" }] },
  ],
  chests: [
    { x: 2, y: 2, id: "q1", items: { "诸葛连弩图": 1 } },
  ],
  transitions: [
    { x: 0,  y: 8, to: { map: "ch11_jieting", x: 16, y: 6 } },
    { x: 17, y: 8, if: { flag: "q11", is: "qishan" }, to: { map: "ch11_wuzhang", x: 9, y: 13 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
