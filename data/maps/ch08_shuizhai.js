// 地图 · ch08_shuizhai 三江口水寨（第八章：草船借箭 + 赤壁决战）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch08_shuizhai"] = {
  name: "三江口水寨",
  grid: [
    "RRRRRRRRRRRRRRRRRRRRRR",
    "R....T........T......R",
    "R....................R",
    "R..T......T......T...R",
    "R....................R",
    "R......T.......T.....R",
    "G,,,,,,,,,,,,,,,,,,,.R",
    "R.........MMMMMMMM...R",
    "R..T.....WWWWWWWW..T.R",
    "R........WWWWWWWW....R",
    "R....T...WWWWWW...T..R",
    "R.........WWWW.......R",
    "R......T.....T.......R",
    "RRRRRRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["曹军水兵"], ["曹军水兵", "曹军水兵"]],
  npcs: [],
  chests: [],
  triggers: [
    // 草船借箭（30 秒接箭 → 箭×N）
    { x: 10, y: 6, if: { flag: "q8", is: "debate" },
      do: [{ minigame: { type: "collect" } },
           { say: "ch08.arrowsDone" }, { set: { q8: "arrows" } },
           { toast: "回柴桑复命" }] },
    { x: 11, y: 6, if: { flag: "q8", is: "debate" },
      do: [{ minigame: { type: "collect" } },
           { say: "ch08.arrowsDone" }, { set: { q8: "arrows" } },
           { toast: "回柴桑复命" }] },
    // 赤壁决战（火攻演出 + 水军残部两波）
    { x: 12, y: 7, if: { flag: "q8", is: "wind" },
      do: [{ battle: "ch08_chibi",
             onWin: [{ say: "ch08.chibiDone" }, { set: { q8: "chibi" } },
                     { warp: { map: "ch08_xiakou", x: 1, y: 8 } },
                     { toast: "追击！往乌林方向" }] }] },
    { x: 13, y: 7, if: { flag: "q8", is: "wind" },
      do: [{ battle: "ch08_chibi",
             onWin: [{ say: "ch08.chibiDone" }, { set: { q8: "chibi" } },
                     { warp: { map: "ch08_xiakou", x: 1, y: 8 } },
                     { toast: "追击！往乌林方向" }] }] },
  ],
  transitions: [
    { x: 0, y: 6, to: { map: "ch08_chaisang", x: 10, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
