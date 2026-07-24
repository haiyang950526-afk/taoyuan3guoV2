// 地图 · ch11_jieting 街亭（终章：马谡违令（固定败战）→ 挥泪斩马谡 → 限时撤退 → 空城计）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch11_jieting"] = {
  name: "街亭",
  grid: [
    "RRRRRRRRRRRRRRRRRR",
    "R....T......T....R",
    "R................R",
    "R..T..........T..R",
    "R................R",
    "R................R",
    "G,,,,,,,,,,,,,,,,G",
    "R................R",
    "R....T......T....R",
    "R................R",
    "R..T..........T..R",
    "RRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: [],
  npcs: [],
  chests: [],
  triggers: [
    // 马谡违令（固定败战）→ 斩马谡 → 启动限时撤退
    { x: 12, y: 6, if: { flag: "q11", is: "jiangwei" },
      do: [{ battle: "ch11_jieting",
             onLoss: [{ say: "ch11.masu" }, { set: { q11: "jieting" } },
                      { toast: "全军撤退——限时抵达西口！" }] }] },
    // 撤退倒计时（街亭败后进入即启动）
    { x: 11, y: 6, if: { flag: "q11", is: "jieting" },
      escapeTimer: { rounds: 25, penalty: "ch11_retreat" } },
    // 西口：脱出成功 → 空城计
    { x: 1, y: 6, if: { flag: "q11", is: "jieting" },
      escapeGoal: true,
      do: [{ say: "ch11.kongcheng" }, { set: { q11: "retreat" } },
           { warp: { map: "ch11_qishan", x: 1, y: 8 } },
           { toast: "再出祁山，连破三阵！" }] },
  ],
  transitions: [
    { x: 17, y: 6, to: { map: "ch11_hanzhong", x: 10, y: 1 } },
    { x: 0,  y: 6, if: { flag: "q11", is: "retreat" }, to: { map: "ch11_qishan", x: 1, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
