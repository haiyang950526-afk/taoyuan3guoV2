// 地图 · ch10_chengdu 成都（第十章主城：大宝库+防具店+铁匠铺+酒馆+训练所；受降文戏）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch10_chengdu"] = {
  name: "成都",
  grid: [
    "##########GG##########",
    "#.......,,,,.........#",
    "#..BBBB...BBBB.......#",
    "#..BBBB...BBBB....T..#",
    "#..BDBB...BBDB.......#",
    "#,,,,,,,,,,,,,,,,,,,,#",
    "#...T...,,.....T....,#",
    "#.......,,..........,#",
    "#..BBBB.,,BBBB......,G",
    "#..BBBB.,,BBBB....T.,G",
    "#..BDBB.,,BBDB......,#",
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
    { x: 12, y: 2, text: "武", color: "#ffd166" },
    { x: 13, y: 2, text: "装", color: "#ffd166" },
    { x: 4,  y: 8, text: "药", color: "#ffd166" },
    { x: 12, y: 8, text: "铁", color: "#ffd166" },
  ],
  npcs: [
    // 城门口告示牌
    { id: "board", x: 12, y: 16, color: "#8a7a5a", name: "告示牌",
      lines: ["告示：西：旅店·杂货店　东：武器店·防具店",
              "城东：酒馆（樗蒲）　东南：铁匠铺·训练所·编成所",
              "东门通向定军山方向"] },
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板",   shop: "ch10_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "武器店老板", shop: "ch10_weapon" },
    { id: "armor",  x: 13, y: 5,  color: "#b08a5a", name: "防具店老板", shop: "ch10_armor" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "杂货店老板", shop: "ch10_item" },
    { id: "smith",  x: 12, y: 11, color: "#a87a4a", name: "铁匠", facility: "smith" },
    { id: "camp",   x: 16, y: 13, color: "#7a8a9a", name: "老兵", facility: "camp" },
    // 酒馆（樗蒲）：城东露天酒摊
    { id: "tavern", x: 16, y: 7,  color: "#b08a4a", name: "酒馆老板", facility: "tavern" },
    // 训练所：城东南露天校场（编成所旁）
    { id: "dojo",   x: 17, y: 13, color: "#8a7a6a", name: "教头", facility: "dojo" },
    { id: "v1",     x: 7,  y: 7,  color: "#4f8cff", name: "市民",
      lines: ["天府之国，总算迎来了明主。", "铁匠铺能强化兵器，就是精铁难得。"] },
    // 刘璋：成都受降
    { id: "liuzhang10", x: 10, y: 1, color: "#b8a05a", name: "刘璋",
      appearIf: { flag: "q10", is: "mianzhu" },
      branches: [
        { say: "ch10.chengdu",
          do: [{ set: { q10: "chengdu" } }, { toast: "东出定军山，争夺汉中（东门）" }] },
      ] },
  ],
  chests: [
    { x: 18, y: 14, id: "c1", items: { "精铁": 2 } },
  ],
  transitions: [
    // 东门：定军山（受降后开放）
    { x: 21, y: 8,  if: { flag: "q10", is: "chengdu" }, to: { map: "ch10_dingjun", x: 1, y: 8 } },
    { x: 21, y: 9,  if: { flag: "q10", is: "chengdu" }, to: { map: "ch10_dingjun", x: 1, y: 8 } },
    { x: 10, y: 17, to: { map: "ch10_field", x: 22, y: 8 } },
    { x: 11, y: 17, to: { map: "ch10_field", x: 22, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
