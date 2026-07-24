// 地图 · ch00_cave 山洞（序章迷宫，洞底黄巾头目）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_cave"] = {
  name: "山洞",
  grid: [
    "RRRRRRRRRRRRRRRR",
    "RFFFFFFFFFFFFFFR",
    "RFFRFFRFFRFFRFFR",
    "RFFFFFFFFFFFFFFR",
    "RFRFFRFFRFFRFFFR",
    "RFFFFFFFFFFFFFFR",
    "RFFRFFRFFRFFRFFR",
    "RFFFFFFFFFFFFFFR",
    "RFRFFRFFRFFRFFFR",
    "RFFFFFFFFFFFFFFR",
    "RFFFFFEEFFFFFFFR",
    "RRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["F"],
  encounterRate: 0.10,
  encounterGroups: [["黄巾贼", "黄巾弓手"], ["黄巾弓手", "黄巾弓手"], ["黄巾贼", "黄巾贼", "黄巾弓手"]],
  npcs: [
    // 黄巾头目：接了任务才出现；未接任务时只有动静
    { id: "boss", x: 7, y: 1, color: "#c0392b", name: "黄巾头目",
      boss: "ch00_boss",
      appearIf: { flag: "q0", is: "accepted" },
      onWin: [{ set: { q0: "bossDone" } }, { toast: "黄巾头目已消灭，回城复命吧" }] },
  ],
  chests: [
    { x: 13, y: 1, id: "c1", gold: 200 },
    { x: 1,  y: 9, id: "c2", items: { "草药": 2 } },
  ],
  transitions: [
    { x: 5, y: 10, to: { map: "ch00_field", x: 2, y: 2 } },
    { x: 6, y: 10, to: { map: "ch00_field", x: 2, y: 2 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
