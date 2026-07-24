// 地图 · ch00_cave 山洞（序章迷宫 20×14，洞底黄巾头目；死胡同藏保底装备箱）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_cave"] = {
  name: "山洞",
  grid: [
    "RRRRRRRRRRRRRRRRRRRR",
    "RFFFFRFFFFFRFFFFFRFR",
    "RRFRRRRFRRRRRFRRRFFR",
    "RFFFFFFFFFRFFFFFFFFR",
    "RRRRFRRRRRRFRRRRFRRR",
    "RFFFFFFFFRFFFFFFFFFR",
    "RRRRFRRRRFRRRRFRRRRR",
    "RFFFFFFRFFFFFFFFFFFR",
    "RRFRRRRRRRFRRRRFRRRR",
    "RFFFFFRFFFFFFFFFFFFR",
    "RRRFRRRRFRRRRRRRFRRR",
    "RFFFFFFFFFFFFFFFFFFR",
    "RRRRRRRRREERRRRRRRRR",
    "RRRRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: ["F"],
  encounterRate: 0.10,
  encounterGroups: [["黄巾贼", "黄巾弓手"], ["黄巾弓手", "黄巾弓手"], ["黄巾贼", "黄巾贼", "黄巾弓手"]],
  npcs: [
    // 黄巾头目：接了任务才出现；未接任务时只有动静
    { id: "boss", x: 1, y: 1, color: "#c0392b", name: "黄巾头目",
      boss: "ch00_boss",
      appearIf: { flag: "q0", is: "accepted" },
      onWin: [{ set: { q0: "bossDone" } }, { toast: "黄巾头目已消灭，回城复命吧" }] },
  ],
  chests: [
    { x: 5,  y: 9, id: "c1", gold: 200 },
    { x: 6,  y: 7, id: "c2", items: { "草药": 2 } },
    // 保底装备箱（死胡同尽头）
    { x: 18, y: 1, id: "c3", items: { "铜剑": 1 } },
    { x: 9,  y: 6, id: "c4", items: { "布衣": 1 } },
    { x: 16, y: 1, id: "c5", items: { "皮甲": 1 } },
  ],
  transitions: [
    { x: 9,  y: 12, to: { map: "ch00_field", x: 2, y: 2 } },
    { x: 10, y: 12, to: { map: "ch00_field", x: 2, y: 2 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
