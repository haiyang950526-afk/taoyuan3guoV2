// 地图 · ch03_xudu 许都（第三章主城：宫殿献帝、相府曹操、大商店+防具店+酒馆+训练所）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch03_xudu"] = {
  name: "许都",
  grid: [
    "########################",
    "#.......PPPPPPPP.......#",
    "#.......PPPPPPPP...T...#",
    "#.......PPPPPPPP.......#",
    "#.......,,.............#",
    "#....T..,,.......T.....#",
    "#..BBBB.,,.BBBB........#",
    "#..BBBB.,,.BBBB....T...#",
    "#..BDBB.,,.BBDB........#",
    "#,,,,,,,,,,,,,,,,,,,,,,#",
    "#...T...,,......T......#",
    "#.......,,.............#",
    "#..BBBB.,,.BBBB........#",
    "#..BBBB.,,.BBBB....T...#",
    "#..BDBB.,,.BBDB........#",
    "#,,,,,,,,,,,,,,,,,,,,,,#",
    "#...BBBBBB,,...........#",
    "#...BBBBBB,,.......T...#",
    "#...BBBBBB,,...........#",
    "##########GG############",
  ],
  encounterTiles: [],
  // 建筑招牌（画在顶部居中的 B 格上；皇宫挂在 P 墙正中）
  signs: [
    { x: 11, y: 1,  text: "府", color: "#ffd166" },
    { x: 4,  y: 6,  text: "客", color: "#ffd166" },
    { x: 12, y: 6,  text: "武", color: "#ffd166" },
    { x: 14, y: 6,  text: "装", color: "#ffd166" },
    { x: 4,  y: 12, text: "药", color: "#ffd166" },
    { x: 12, y: 12, text: "酒", color: "#ffd166" },
    { x: 14, y: 12, text: "训", color: "#ffd166" },
    { x: 6,  y: 16, text: "府", color: "#ffd166" },
  ],
  npcs: [
    // 城门口告示牌
    { id: "board", x: 12, y: 18, color: "#8a7a5a", name: "告示牌",
      lines: ["告示：北：皇宫　南：相府",
              "西街：旅店·杂货店　东街：武器店·防具店",
              "东南：酒馆·训练所"] },
    { id: "inn",    x: 4,  y: 9,  color: "#c98a4b", name: "旅店老板",   shop: "ch03_inn" },
    { id: "weapon", x: 12, y: 9,  color: "#8a93a8", name: "武器店老板", shop: "ch03_weapon" },
    { id: "armor",  x: 14, y: 9,  color: "#b08a5a", name: "防具店老板", shop: "ch03_armor" },
    { id: "item",   x: 4,  y: 15, color: "#7ee2a0", name: "杂货店老板", shop: "ch03_item" },
    // 酒馆（樗蒲）与训练所：东南楼下露天
    { id: "tavern", x: 12, y: 15, color: "#b08a4a", name: "酒馆老板", facility: "tavern" },
    { id: "dojo",   x: 14, y: 15, color: "#8a7a6a", name: "教头", facility: "dojo" },
    { id: "v1",     x: 7,  y: 11, color: "#4f8cff", name: "市民", linesKey: "ch03.xuduVillager" },
    { id: "v2",     x: 15, y: 13, color: "#d88a3a", name: "老者", linesKey: "ch03.xuduElder" },
    // 献帝：宫前召见
    { id: "xiandi", x: 10, y: 4, color: "#e8d84a", name: "献帝",
      branches: [
        { if: { flag: "q3", is: "xiangfu" }, say: "ch03.audience",
          do: [{ set: { q3: "audience" } }, { toast: "去东郊许田猎场（城外东门）" }] },
        { if: { flag: "q3", is: "wine" }, say: "ch03.yidaizhao",
          do: [{ set: { q3: "zhao" } }, { toast: "衣带诏在身，回相府辞行" }] },
        { say: ["（天子深居宫中，四周皆是曹氏眼线。）"] },
      ] },
    // 曹操：相府任务链核心
    { id: "caocao", x: 6, y: 15, color: "#b03a3a", name: "曹操",
      branches: [
        { if: { flag: "q3", is: "start" }, say: "ch03.caocaoMeet",
          do: [{ set: { q3: "xiangfu" } }, { toast: "去宫中见驾" }] },
        { if: { flag: "q3", is: "audience" }, say: "ch03.huntIntro" },
        { if: { flag: "q3", is: "hunted" },
          ask: { title: "煮酒论英雄", say: "ch03.wineSay",
            options: [
              { label: "河北袁绍，可为英雄？", say: "ch03.wineOpt1" },
              { label: "淮南袁术，可为英雄？", say: "ch03.wineOpt2" },
              { label: "刘表孙策，可为英雄？", say: "ch03.wineOpt3" },
            ] },
          do: [{ say: "ch03.wineEnd" }, { set: { q3: "wine" } },
               { toast: "去宫中再探献帝" }] },
        { if: { flag: "q3", is: "zhao" }, say: "ch03.lixu",
          do: [{ set: { q3: "leave" } }, { toast: "火速离许！往南城门走" }] },
        { say: ["曹操：玄德公，许都住得可还习惯？"] },
      ] },
  ],
  chests: [
    { x: 20, y: 5, id: "c1", gold: 300 },
  ],
  transitions: [
    { x: 10, y: 19, to: { map: "ch03_field", x: 11, y: 1 } },
    { x: 11, y: 19, to: { map: "ch03_field", x: 11, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
