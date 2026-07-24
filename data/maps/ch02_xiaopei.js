// 地图 · ch02_xiaopei 小沛（第二章主城：旅店+武器店+杂货店；吕布、报信兵、简雍在此）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02_xiaopei"] = {
  name: "小沛",
  grid: [
    "##########GG##########",
    "#....................#",
    "#..BBBB...BBBB.......#",
    "#..BBBB...BBBB....T..#",
    "#..BDBB...BBDB.......#",
    "#....................#",
    "#...T..........T.....#",
    "#....................#",
    "#..BBBB...BBBB.......#",
    "#..BBBB...BBBB....T..#",
    "#..BDBB...BBDB.......#",
    "#....................#",
    "#.....T......T.......#",
    "#....................#",
    "#....................#",
    "#....T.......T.......#",
    "#....................#",
    "##########GG##########",
  ],
  encounterTiles: [],
  npcs: [
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板",   shop: "ch02_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "武器店老板", shop: "ch02_weapon" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "杂货店老板", shop: "ch02_item" },
    { id: "v1",     x: 6,  y: 7,  color: "#4f8cff", name: "村民", linesKey: "ch02.xpVillager" },
    { id: "v2",     x: 15, y: 13, color: "#d88a3a", name: "老者", linesKey: "ch02.xpElder" },
    // 编成所
    { id: "camp",   x: 16, y: 11, color: "#7a8a9a", name: "老兵", facility: "camp" },
    // 吕布：来投后在小沛安置
    { id: "lvbu",   x: 12, y: 11, color: "#c03a5a", name: "吕布",
      appearIf: { flag: "q2", is: "lvbu" },
      branches: [
        { say: "ch02.lvbuSettle",
          do: [{ set: { q2: "anzhi" } }, { toast: "吕布一军暂驻小沛" }] },
      ] },
    // 报信兵：吕布安置后来报纪灵来攻
    { id: "soldier2", x: 8, y: 7, color: "#9aa4b8", name: "报信兵",
      appearIf: { flag: "q2", is: "anzhi" },
      branches: [
        { say: "ch02.jilingCome",
          do: [{ set: { q2: "jilingCome" } }, { toast: "出小沛北门，迎战纪灵！" }] },
      ] },
    // 简雍：失下邳后收束本章，并衔接第三章（陈登留徐州，离队）
    { id: "jianyong", x: 14, y: 12, color: "#6a8a5a", name: "简雍",
      appearIf: { flag: "q2", is: "lost" },
      branches: [
        { say: "ch02.chapterEnd",
          do: [{ set: { q2: "done" } }, { leave: "陈登" },
               { say: "ch03.intro" }, { chapter: "ch03" }, { set: { q3: "start" } },
               { warp: { map: "ch03_xudu", x: 10, y: 16 } },
               { toast: "第三章 · 寄人篱下" }] },
      ] },
  ],
  chests: [],
  transitions: [
    { x: 10, y: 0,  to: { map: "ch02_field_east", x: 22, y: 9 } },
    { x: 11, y: 0,  to: { map: "ch02_field_east", x: 22, y: 9 } },
    // 南门：辕门射戟后才可往下邳方向
    { x: 10, y: 17, if: { flag: "q2", in: ["shed", "lost", "done"] }, to: { map: "ch02_field_south", x: 10, y: 1 } },
    { x: 11, y: 17, if: { flag: "q2", in: ["shed", "lost", "done"] }, to: { map: "ch02_field_south", x: 10, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
