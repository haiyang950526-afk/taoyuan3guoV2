// 地图 · ch03_field 许都野外（第三章野外：北回许都，东通许田猎场；突围战在此）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch03_field"] = {
  name: "许都野外",
  grid: [
    "RRRRRRRRR##GG##RRRRRRRRR",
    "R.........,,...........R",
    "R..T......,,.....T.....R",
    "R.........,,...........R",
    "R.....T....,,....T.....R",
    "R..........,,,.........R",
    "R..T...T....,,.....T...R",
    "R.............,,.......R",
    "R.....T......,,........G",
    "R............,,,.......G",
    "R..T.........,,...T....R",
    "R.............,,.......R",
    "R......T......,,.......R",
    "R..T........,,....T....R",
    "R.....BB.BB.BB,,.......R",
    "R....TBD.DB.BD,,,......R",
    "R........,.....,,,.....R",
    "RRRRRRRRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.12,
  encounterGroups: [["曹军精锐"], ["曹军精锐", "曹军精骑"], ["曹军精骑", "曹军精骑"], ["曹军精锐", "曹军都伯"]],
  npcs: [
    // 突围战：离许时车胄先锋拦路
    { id: "chezhou_van", x: 13, y: 16, color: "#3a4a6a", name: "车胄先锋",
      boss: "ch03_tuwei",
      appearIf: { flag: "q3", is: "leave" },
      onWin: [{ say: "ch03.tuweiDone" }, { set: { q3: "done" } },
              { chapter: "ch04" }, { set: { q4: "start" } },
              { say: "ch04.intro" }, { warp: { map: "ch00_field", x: 11, y: 15 } },
              { toast: "第四章 · 风云再散" }] },
  ],
  chests: [
    { x: 2, y: 13, id: "f1", items: { "金疮药": 2 } },
  ],
  transitions: [
    { x: 11, y: 0,  to: { map: "ch03_xudu", x: 10, y: 18 } },
    { x: 12, y: 0,  to: { map: "ch03_xudu", x: 10, y: 18 } },
    // 东门：围猎期间开放
    { x: 23, y: 8,  if: { flag: "q3", is: "audience" }, to: { map: "ch03_hunt", x: 1, y: 6 } },
    { x: 23, y: 9,  if: { flag: "q3", is: "audience" }, to: { map: "ch03_hunt", x: 1, y: 6 } },
    // 许南村村口（南部）：朝北走进门触发
    { x: 9, y: 16, face: [0, -1], to: { map: "ch03_village", x: 5, y: 7 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
