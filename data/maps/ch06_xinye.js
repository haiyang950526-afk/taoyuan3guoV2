// 地图 · ch06_xinye 新野城（第六、七章主城；商店第六章价 / 第七章战时价两套 NPC）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch06_xinye"] = {
  name: "新野城",
  grid: [
    "##########GG##########",
    "#.......,,,,.........#",
    "#..BBBB...BBBBBBBB...#",
    "#..BBBB...BBBBBBBBT..#",
    "#..BDBB...BBDBBDBB...#",
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
    { x: 12, y: 2, text: "武", color: "#ffd166" },
    { x: 4,  y: 8, text: "药", color: "#ffd166" },
    { x: 12, y: 8, text: "装", color: "#ffd166" },
  ],
  npcs: [
    // 北门口告示牌
    { id: "board", x: 12, y: 1, color: "#8a7a5a", name: "告示牌",
      lines: ["告示：此处是新野城。",
              "北门出去是新野野外；南门通往博望坡（时机未到暂不能通行）。",
              "西街：旅店·杂货店　东街：武器店·防具店",
              "东南：编成所（老兵）"] },
    // 商店：第六章价（q7 出现后隐藏）/ 第七章战时价（priceMult 1.2）
    // 商店：第六章价 / 第七章战时价双店主，均已迁入各自店内（门口 D 格朝门下钻）
    { id: "camp", x: 16, y: 11, color: "#7a8a9a", name: "老兵", facility: "camp" },
    { id: "v1", x: 7, y: 7, color: "#4f8cff", name: "村民", linesKey: "ch06.xinyeVillager" },
    { id: "v2", x: 15, y: 13, color: "#d88a3a", name: "老者", linesKey: "ch06.xyVillager" },
    // 刘表：第六章任务发布
    { id: "liubiao", x: 10, y: 1, color: "#b8a05a", name: "刘表",
      appearIf: { flag: "q6", exists: true },
      hideIf: { flag: "q7", exists: true },
      branches: [
        { if: { flag: "q6", is: "start" }, say: "ch06.liubiao",
          do: [{ set: { q6: "bandits" } }, { toast: "出城平定三处匪首" }] },
        { if: { flag: "q6", is: "bandits" },
          say: ["匪患未平，城外三处匪首，还须玄德公辛劳。"] },
        { if: { flag: "q6", is: "feast" }, say: ["襄阳的宴席，玄德公小心为上。"] },
      ] },
    // 平匪完成后的复命触发（用报信兵代收）
    { id: "xy_soldier", x: 8, y: 5, color: "#9aa4b8", name: "报信兵",
      appearIf: { flag: "q6", is: "bandits" },
      branches: [
        { if: { flag: "bandits", is: 3 }, say: "ch06.banditsDone",
          do: [{ set: { q6: "feast" } }, { toast: "去襄阳赴宴（野外北门）" }] },
        { say: ["三处匪首尚未平定，报信兵指着城外的地图。"] },
      ] },
    // 第七章：夏侯惇来攻
    { id: "xy_soldier7", x: 14, y: 5, color: "#9aa4b8", name: "报信兵",
      appearIf: { flag: "q7", is: "start" },
      branches: [
        { say: "ch07.baoxin",
          do: [{ set: { sys_dex: true } }, { set: { q7: "start" } },
               { toast: "图鉴开放！出北门去博望坡" }] },
      ] },
  ],
  triggers: [
    // 第七章：火烧新野（回城时触发残兵突围战）
    { x: 10, y: 15, if: { flag: "q7", is: "bowang" },
      do: [{ battle: "ch07_fire",
             onWin: [{ say: "ch07.xinyeFireDone" }, { set: { q7: "escort" } },
                     { join: "百姓" },
                     { toast: "护送百姓渡江（野外三场遭遇战）" }] }] },
    { x: 11, y: 15, if: { flag: "q7", is: "bowang" },
      do: [{ battle: "ch07_fire",
             onWin: [{ say: "ch07.xinyeFireDone" }, { set: { q7: "escort" } },
                     { join: "百姓" },
                     { toast: "护送百姓渡江（野外三场遭遇战）" }] }] },
  ],
  chests: [],
  transitions: [
    // 北门：第六章通野外；第七章通博望坡
    { x: 10, y: 0,  to: { map: "ch06_field", x: 10, y: 16 } },
    { x: 11, y: 0,  to: { map: "ch06_field", x: 10, y: 16 } },
    // 南门：第七章起通博望坡
    { x: 10, y: 17, if: { flag: "q7", exists: true }, to: { map: "ch07_bowang", x: 10, y: 12 } },
    { x: 11, y: 17, if: { flag: "q7", exists: true }, to: { map: "ch07_bowang", x: 10, y: 12 } },
    // 店铺室内下钻（朝门才进，路过不触发）
    { x: 4,  y: 5,  face: [0, -1], to: { map: "ch06_inn_in", x: 7, y: 8 } },
    { x: 12, y: 5,  face: [0, -1], to: { map: "ch06_weapon_in", x: 7, y: 8 } },
    { x: 12, y: 11, face: [0, -1], to: { map: "ch06_armor_in", x: 7, y: 8 } },
    { x: 4,  y: 11, face: [0, -1], to: { map: "ch06_item_in", x: 7, y: 8 } },
    // 民房下钻（朝门才进，路过不触发）
    { x: 15, y: 5, face: [0, -1], to: { map: "ch06_xinye_house_in", x: 7, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
