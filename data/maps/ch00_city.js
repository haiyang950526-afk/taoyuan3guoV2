// 地图 · ch00_city 徐州城（序章主城；第一章扩建：北部太守府，陶谦在此）
// 浏览器共享全局 MAPS；node 各自导出，由测试脚本合并
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch00_city"] = {
  name: "徐州城",
  grid: [
    "########################",
    "#......PPPPPPPP........#",
    "#......PPPPPPPP...T....#",
    "#......PPPPPPPP........#",
    "#......................#",
    "#....T..........T......#",
    "#..BBBB...BBBB.........#",
    "#..BBBB...BBBB....T....#",
    "#..BDBB...BBDB.........#",
    "#......................#",
    "#...T..........T.......#",
    "#......................#",
    "#..BBBB...BBBB.........#",
    "#..BBBB...BBBB....T....#",
    "#..BDBB...BBDB.........#",
    "#......................#",
    "#.....T......T.........#",
    "##########GG############",
  ],
  encounterTiles: [],
  npcs: [
    { id: "inn",    x: 4,  y: 9,  color: "#c98a4b", name: "旅店老板",   shop: "ch00_inn" },
    { id: "weapon", x: 12, y: 9,  color: "#8a93a8", name: "武器店老板", shop: "ch00_weapon" },
    { id: "item",   x: 4,  y: 15, color: "#7ee2a0", name: "杂货店老板", shop: "ch00_item" },
    { id: "v1",     x: 7,  y: 11, color: "#4f8cff", name: "村民", linesKey: "ch00.v1" },
    { id: "v2",     x: 15, y: 13, color: "#d88a3a", name: "村民", linesKey: "ch00.v2" },
    // 编成所（主城设施：出战/后备调换、阵形、军师）
    { id: "camp",   x: 16, y: 11, color: "#7a8a9a", name: "老兵", facility: "camp" },
    // 曹操使者：序章任务发布人；进入第一章后离城
    { id: "envoy",  x: 10, y: 16, color: "#b03a3a", name: "曹操使者",
      hideIf: { flag: "q1", exists: true },
      branches: [
        { if: { flag: "q0", is: "notStarted" }, say: "ch00.envoyOffer",
          do: [{ set: { q0: "accepted" } }, { toast: "接取任务：讨伐黄巾余党" }] },
        { if: { flag: "q0", is: "accepted" }, say: "ch00.envoyAccepted" },
        { if: { flag: "q0", is: "bossDone" }, say: "ch00.envoyReward",
          do: [{ gold: 1000 }, { set: { q0: "done" } }, { toast: "获得 1000 金！" }] },
        { say: "ch00.envoyDone",
          do: [{ chapter: "ch01" }, { set: { q1: "start" } },
               { say: "ch01.intro" }, { toast: "第一章 · 父仇之火" }] },
      ] },
    // 陶谦：第一章起在太守府前；第二章病逝剧情后不再出现
    { id: "taoqian", x: 10, y: 4, color: "#b8a05a", name: "陶谦",
      appearIf: { flag: "q1", exists: true },
      hideIf: { flag: "q2", in: ["seal", "lvbu", "anzhi", "jilingCome", "shed", "lost", "done"] },
      branches: [
        { if: { flag: "q1", is: "start" }, say: "ch01.taoqianAsk",
          do: [{ set: { q1: "accepted" } }, { toast: "接取任务：驰援郯城" }] },
        { if: { flag: "q1", in: ["accepted", "ready", "patrolDone", "march"] },
          say: "ch01.taoqianWait" },
        { if: { flag: "q1", is: "yujinDone" }, say: "ch01.rangXuzhou",
          do: [{ set: { q1: "done" } }, { chapter: "ch02" }, { set: { q2: "start" } },
               { say: "ch02.intro" }, { toast: "第二章 · 三让徐州" }] },
        { if: { flag: "q2", is: "start" }, say: "ch02.taoqianDeath",
          do: [{ set: { q2: "seal" } }, { join: "陈登" }] },
      ] },
    // 报信兵：第二章接印后出现，引出吕布来投
    { id: "soldier", x: 8, y: 5, color: "#9aa4b8", name: "报信兵",
      appearIf: { flag: "q2", is: "seal" },
      branches: [
        { say: "ch02.soldierLvbu",
          do: [{ set: { q2: "lvbu" } }, { toast: "城外东北方向（小沛）已可通行" }] },
      ] },
    // 报信兵：第四章据徐州后来报曹操亲征
    { id: "soldier4", x: 12, y: 5, color: "#9aa4b8", name: "报信兵",
      appearIf: { flag: "q4", is: "xuzhou" },
      branches: [
        { say: "ch04.baoxin",
          do: [{ set: { q4: "ye" } }, { toast: "出城夜袭曹营（城外北面路口）" }] },
      ] },
  ],
  chests: [
    { x: 20, y: 5, id: "c1", gold: 150 },
  ],
  transitions: [
    { x: 10, y: 17, to: { map: "ch00_field", x: 11, y: 16 } },
    { x: 11, y: 17, to: { map: "ch00_field", x: 11, y: 16 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
