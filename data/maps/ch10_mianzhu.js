// 地图 · ch10_mianzhu 绵竹（第十章：马超收服战）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch10_mianzhu"] = {
  name: "绵竹",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R................R",
    "R....T......T....R",
    "R................R",
    "G,,,,,,,,,,,,,,,.R",
    "R................R",
    "R..T..........T..R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["西川兵", "蜀军弓手"], ["蜀军名将"]],
  npcs: [
    // 收服战：马超（4 回合内逼至三成血）
    { id: "machao", x: 15, y: 8, color: "#d8d8e8", name: "马超",
      boss: "ch10_machao",
      appearIf: { flag: "q10", is: "luo2" },
      onRecruit: [{ say: "ch10.machaoRecruit" }, { joinBench: "马岱" },
                  { set: { q10: "mianzhu" } },
                  { toast: "马超、马岱加入！进成都受降（野外东南）" }],
      onWin: [{ say: ["（马超拨马退走，绵竹城门紧闭。）",
                      "（若能四回合内逼至三成血，或可说降。再试一次吧。）"] }] },
  ],
  chests: [
    { x: 2, y: 2, id: "m1", items: { "精铁": 1 } },
  ],
  transitions: [
    { x: 0, y: 8, to: { map: "ch10_field", x: 22, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
