// 地图 · ch10_fucheng 涪城（第十章：涪城宴，庞统随军）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch10_fucheng"] = {
  name: "涪城",
  grid: [
    "##########GG##########",
    "#.......,,,,.........#",
    "#..BBBB...BBBB.......#",
    "#..BBBB...BBBB....T..#",
    "#..BDBB...BBDB.......#",
    "#,,,,,,,,,,,,,,,,,,,,#",
    "#...T...,,.....T.....#",
    "#.......,,...........#",
    "#..BBBB.,,BBBB.......#",
    "#..BBBB.,,BBBB....T..#",
    "#..BDBB.,,BBDB.......#",
    "#,,,,,,,,,,,,,,,,,,,,#",
    "#.....T...,,.T.......#",
    "#.........,,.........#",
    "#.........,,.........#",
    "#....T....,,.T.......#",
    "#.........,,.........#",
    "##########GG##########",
  ],
  encounterTiles: [],
  // 建筑招牌（画在顶部居中的 B 格上）
  signs: [
    { x: 4,  y: 2, text: "客", color: "#ffd166" },
  ],
  npcs: [
    { id: "inn", x: 4, y: 5, color: "#c98a4b", name: "旅店老板", shop: "ch10b_inn" },
    { id: "v1",  x: 7, y: 7, color: "#4f8cff", name: "市民",
      lines: ["刘使君与我家主公同宗，此番入蜀是客。", "张任将军镇守雒城，是蜀中第一忠勇。"] },
    // 刘璋：涪城宴
    { id: "liuzhang", x: 10, y: 1, color: "#b8a05a", name: "刘璋",
      appearIf: { flag: "q10", is: "start" },
      branches: [
        { say: "ch10.fu",
          do: [{ set: { q10: "fu" } }, { toast: "北攻雒城（野外北门）" }] },
      ] },
  ],
  chests: [],
  transitions: [
    { x: 10, y: 0,  to: { map: "ch10_field", x: 10, y: 16 } },
    { x: 11, y: 0,  to: { map: "ch10_field", x: 10, y: 16 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
