// 地图 · ch06_xiangyang 襄阳（第六章：文房铺卖计策书；蔡瑁设宴）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_xiangyang"] = {
  name: "襄阳",
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
    { id: "inn",  x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板", shop: "ch06b_inn" },
    { id: "book", x: 12, y: 5,  color: "#b8a05a", name: "文房铺老板", shop: "ch06_book" },
    { id: "camp", x: 16, y: 11, color: "#7a8a9a", name: "老兵", facility: "camp" },
    { id: "v1",   x: 7,  y: 7,  color: "#4f8cff", name: "市民",
      lines: ["文房铺新到了计策书，读书人都去瞧瞧。", "蔡瑁将军设宴，城里最近热闹得很。"] },
    { id: "v2",   x: 15, y: 13, color: "#d88a3a", name: "老者",
      lines: ["司马徽先生住在城东南的水镜庄。", "卧龙凤雏，得一可安天下啊。"] },
    // 蔡瑁：设宴（剧情杀前奏）
    { id: "caimao", x: 10, y: 1, color: "#b03a3a", name: "蔡瑁",
      appearIf: { flag: "q6", is: "feast" },
      branches: [
        { say: "ch06.feast",
          do: [{ set: { q6: "tanxi" } },
               { warp: { map: "ch06_tanxi", x: 1, y: 6 } },
               { toast: "的卢跃檀溪——快往渡口去！" }] },
      ] },
  ],
  chests: [],
  transitions: [
    { x: 10, y: 17, to: { map: "ch06_field", x: 10, y: 1 } },
    { x: 11, y: 17, to: { map: "ch06_field", x: 10, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
