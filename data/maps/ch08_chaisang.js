// 地图 · ch08_chaisang 柴桑（第八章主城：舌战群儒、七星坛祭风、大商店）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

// 舌战群儒：三问，答错重来不惩罚（选项只影响一句台词）
var ASK3 = { title: "舌战群儒 · 三", options: [
  { label: "曹军远来疲弊，不习水战！", say: "ch08.debateOpt3R",
    do: [{ set: { q8: "debate" } }, { toast: "去后堂见孙权" }] },
  { label: "兵多未必能胜。", say: "ch08.debateOpt3W" }] };
ASK3.options[1].do = [{ ask: ASK3 }];
var ASK2 = { title: "舌战群儒 · 二", options: [
  { label: "我主汉室之胄，仁义著于四海！", say: "ch08.debateOpt2R", do: [{ ask: ASK3 }] },
  { label: "兵多未必胜。", say: "ch08.debateOpt2W" }] };
ASK2.options[1].do = [{ ask: ASK2 }];
var ASK1 = { title: "舌战群儒 · 一", say: "ch08.debateSay", options: [
  { label: "燕雀安知鸿鹄之志？", say: "ch08.debateOpt1R", do: [{ ask: ASK2 }] },
  { label: "胜败乃兵家常事。", say: "ch08.debateOpt1W" }] };
ASK1.options[1].do = [{ ask: ASK1 }];

MAPS["ch08_chaisang"] = {
  name: "柴桑",
  grid: [
    "##########GG##########",
    "#....................#",
    "#..BBBB...BBBB.......#",
    "#..BBBB...BBBB....T..#",
    "#..BDBB...BBDB.......#",
    "#....................#",
    "#...T..........T.....#",
    "#....................#",
    "#..BBBB...BBBB.......G",
    "#..BBBB...BBBB....T..G",
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
    { id: "inn",    x: 4,  y: 5,  color: "#c98a4b", name: "旅店老板",   shop: "ch08_inn" },
    { id: "weapon", x: 12, y: 5,  color: "#8a93a8", name: "武器店老板", shop: "ch08_weapon" },
    { id: "item",   x: 4,  y: 11, color: "#7ee2a0", name: "杂货店老板", shop: "ch08_item" },
    { id: "camp",   x: 16, y: 11, color: "#7a8a9a", name: "老兵", facility: "camp" },
    { id: "v1",     x: 7,  y: 7,  color: "#4f8cff", name: "市民",
      lines: ["曹军八十万压境，城里人心惶惶。", "孙刘联手，才有活路啊。"] },
    { id: "v2",     x: 15, y: 13, color: "#d88a3a", name: "老者",
      lines: ["三江口在北边江上，水寨连绵。", "听说法坛上能借来东风，神了。"] },
    // 张昭：舌战群儒
    { id: "zhangzhao", x: 12, y: 11, color: "#b8a05a", name: "张昭",
      appearIf: { flag: "q8", is: "start" },
      branches: [{ ask: ASK1 }] },
    // 孙权：联盟决断（舌战后的过场）
    { id: "sunquan", x: 10, y: 1, color: "#4a8a5a", name: "孙权",
      appearIf: { flag: "q8", is: "debate" },
      branches: [
        { say: "ch08.debateDone",
          do: [{ toast: "去三江口草船借箭（北门外）" }] },
      ] },
    // 庞统：连环计过场
    { id: "pangtong", x: 8, y: 7, color: "#9a6a8a", name: "庞统",
      appearIf: { flag: "q8", is: "arrows" },
      branches: [
        { say: "ch08.lianhuan",
          do: [{ set: { q8: "lianhuan" } }, { toast: "去七星坛祭风（城东南）" }] },
      ] },
    // 七星坛：祭风
    { id: "qixing", x: 16, y: 13, color: "#e8e8f0", name: "七星坛",
      appearIf: { flag: "q8", is: "lianhuan" },
      branches: [
        { say: "ch08.windSay",
          do: [{ set: { q8: "wind" } }, { toast: "东风已起！去三江口决战" }] },
      ] },
  ],
  chests: [
    { x: 18, y: 14, id: "c1", gold: 800 },
  ],
  transitions: [
    // 北门：三江口水寨
    { x: 10, y: 0,  if: { flag: "q8", in: ["debate", "arrows", "lianhuan", "wind"] },
      to: { map: "ch08_shuizhai", x: 1, y: 6 } },
    { x: 11, y: 0,  if: { flag: "q8", in: ["debate", "arrows", "lianhuan", "wind"] },
      to: { map: "ch08_shuizhai", x: 1, y: 6 } },
    // 东门：夏口（赤壁决战后追击方向）
    { x: 21, y: 8,  if: { flag: "q8", in: ["chibi", "wulin", "done"] },
      to: { map: "ch08_xiakou", x: 1, y: 8 } },
    { x: 21, y: 9,  if: { flag: "q8", in: ["chibi", "wulin", "done"] },
      to: { map: "ch08_xiakou", x: 1, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
