// 地图 · ch05_ferry 黄河渡（第五章第五关：守将秦琪；战后孙乾来会）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch05_ferry"] = {
  name: "黄河渡",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R................R",
    "R....T......T....R",
    "G,,,,,,,,,,,,,,,,G",
    "R..........WWWW..R",
    "R..T......WWWW...R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["荥阳守军"], ["荥阳守军", "汜水守军"]],
  npcs: [
    { id: "qinqi", x: 15, y: 7, color: "#6a3a3a", name: "秦琪",
      boss: "ch05_qinqi",
      appearIf: { flag: "q5", is: "wangzhi" },
      onWin: [{ set: { q5: "qinqi" } }, { say: "ch05.sunqian" }, { set: { q5: "sunqian" } },
              { toast: "主公在汝南！往卧牛山方向去" }] },
  ],
  chests: [],
  transitions: [
    { x: 0,  y: 8, to: { map: "ch05_xingyang", x: 16, y: 8 } },
    { x: 17, y: 8, if: { flag: "q5", is: "sunqian" }, to: { map: "ch05_woniu", x: 1, y: 2 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
