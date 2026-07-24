// 地图 · ch11_tianshui 天水（终章：首战 → 伏击 → 收姜维）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch11_tianshui"] = {
  name: "天水",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R................R",
    "R....T......T....R",
    "R................R",
    "R................R",
    "R..T..........T..R",
    "R........,.......R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.10,
  encounterGroups: [["魏军先锋"], ["魏军先锋", "天水守军"]],
  npcs: [
    // 收服战：姜维（识破伏击后，4 回合内逼至三成五血）
    { id: "jiangwei", x: 9, y: 1, color: "#6ab8a8", name: "姜维",
      boss: "ch11_jiangwei",
      appearIf: { flag: "ambushDone", is: true },
      onRecruit: [{ say: "ch11.jiangRecruit" }, { set: { q11: "jiangwei" } },
                  { warp: { map: "ch11_jieting", x: 1, y: 6 } },
                  { toast: "姜维加入！守街亭！" }],
      onWin: [{ say: ["（姜维且战且退，隐入城中。）",
                      "（若能四回合内逼至三成五血，或可说降。再试一次吧。）"] }] },
  ],
  chests: [
    { x: 2, y: 2, id: "t1", items: { "仙草露": 1 } },
  ],
  triggers: [
    // 首战祁山先锋（一次性）
    { x: 9, y: 9, if: { flag: "f1", not: true },
      do: [{ battle: "ch11_first",
             onWin: [{ say: "ch11.firstDone" }, { set: { f1: true } }] }] },
    // 姜维伏击（识破，一次性：胜利后 f1 置为 done）
    { x: 9, y: 5, if: { flag: "f1", is: true },
      do: [{ battle: "ch11_ambush",
             onWin: [{ set: { f1: "done" } }, { set: { ambushDone: true } },
                     { toast: "伏击已破——姜维就在城下" }] }] },
  ],
  transitions: [
    { x: 9, y: 10, to: { map: "ch11_hanzhong", x: 10, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
