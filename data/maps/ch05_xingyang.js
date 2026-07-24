// 地图 · ch05_xingyang 荥阳（第五章第四关：守将王植）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch05_xingyang"] = {
  name: "荥阳",
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
  encounterGroups: [["荥阳守军"], ["荥阳守军", "荥阳守军"]],
  npcs: [
    { id: "wangzhi", x: 15, y: 6, color: "#6a3a3a", name: "王植",
      boss: "ch05_wangzhi",
      appearIf: { flag: "q5", is: "bianxi" },
      onWin: [{ set: { q5: "wangzhi" } }, { toast: "荥阳已过，前往黄河渡口" }] },
  ],
  chests: [
    { x: 2, y: 2, id: "x1", items: { "还魂丹": 1 } },
  ],
  transitions: [
    { x: 0,  y: 8, to: { map: "ch05_sishui", x: 16, y: 8 } },
    { x: 17, y: 8, if: { flag: "q5", is: "wangzhi" }, to: { map: "ch05_ferry", x: 1, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
