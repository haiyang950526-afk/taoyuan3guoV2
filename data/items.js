// 数据 · 装备 / 道具 / 商店库存
// 装备代际（02/04 文档）：序章铜 → 第一章铁 → 第二章钢。
// 三槽：weapon 加攻 / armor 加防 / acc 特殊效果（护心镜：防+3）。
// 商店数据驱动：type = inn 旅店 / equip 武器店（兼售防具饰品）/ item 杂货店。
// 定价假设：同代武器 ≈ 本章野怪 15-20 场的收入；旅店 ≈ 2-3 场，保证
// "出城一波、回城休整"后仍有结余向下一代装备攒钱。
"use strict";

const ITEMS = {
  // 武器（atk）
  "铜剑":   { type: "weapon", atk: 3,  price: 400,  desc: "青铜利剑，攻击+3" },
  "铁剑":   { type: "weapon", atk: 6,  price: 900,  desc: "精铁打造，攻击+6" },
  "钢剑":   { type: "weapon", atk: 10, price: 2000, desc: "百炼钢刃，攻击+10" },
  "精钢剑": { type: "weapon", atk: 20, price: 4500, desc: "精钢百炼，攻击+20" },
  "白银剑": { type: "weapon", atk: 32, price: 10000, desc: "白银流光，攻击+32" },
  "龙泉剑": { type: "weapon", atk: 48, price: 22000, desc: "龙泉秋水，攻击+48" },
  "铁刀":   { type: "weapon", arm: "blade", atk: 22, price: 4800, desc: "镔铁长刀，攻击+22（刀系）" },
  "铁矛":   { type: "weapon", arm: "spear", atk: 22, price: 4800, desc: "精铁蛇矛，攻击+22（矛系）" },
  "铁枪":   { type: "weapon", arm: "pike",  atk: 22, price: 4800, desc: "白蜡铁枪，攻击+22（枪系）" },
  "铁脊弓": { type: "weapon", arm: "bow",   atk: 26, price: 5000, desc: "铁脊强弓，攻击+26（弓系）" },
  "羽扇":   { type: "weapon", arm: "fan",   atk: 6, int: 10, price: 3000, desc: "白羽纶扇，攻+6 智+10（扇系）" },
  // 名品（情怀毕业装，不可售；获取：剧情赠送 / 隐藏宝箱 / 汉中军需限量）
  "雌雄双股剑": { type: "weapon", atk: 60, price: 60000, nosell: true, desc: "名品：刘备佩剑，攻击+60" },
  "青龙偃月刀": { type: "weapon", arm: "blade", atk: 65, price: 60000, nosell: true, desc: "名品：冷艳锯，攻击+65（刀系）" },
  "丈八蛇矛":   { type: "weapon", arm: "spear", atk: 62, price: 60000, nosell: true, desc: "名品：燕人神兵，攻击+62（矛系）" },
  "龙胆枪":     { type: "weapon", arm: "pike",  atk: 63, price: 60000, nosell: true, desc: "名品：常山龙胆，攻击+63（枪系）" },
  "落日弓":     { type: "weapon", arm: "bow",   atk: 58, price: 60000, nosell: true, desc: "名品：落日九射，攻击+58（弓系）" },
  "七星杖":     { type: "weapon", arm: "fan",   atk: 20, int: 50, price: 60000, nosell: true, desc: "名品：七星续命，攻+20 智+50（扇系）" },
  "七星剑":     { type: "weapon", atk: 55, price: 50000, nosell: true, desc: "名品彩蛋：七星宝剑，攻击+55" },
  // 防具（def）
  "布衣":   { type: "armor", def: 2,  price: 150,  desc: "粗布衣裳，防御+2" },
  "皮甲":   { type: "armor", def: 4,  price: 500,  desc: "鞣制皮甲，防御+4" },
  "皮盾":   { type: "armor", def: 5,  price: 700,  desc: "蒙皮木盾，防御+5" },
  "铁甲":   { type: "armor", def: 7,  price: 1200, desc: "铁叶札甲，防御+7" },
  "钢甲":   { type: "armor", def: 11, price: 2400, desc: "钢锻重铠，防御+11" },
  "玄铁甲": { type: "armor", def: 18, price: 5200, desc: "玄铁细铠，防御+18" },
  "白银铠": { type: "armor", def: 30, price: 12000, desc: "白银重铠，防御+30" },
  "龙鳞铠": { type: "armor", def: 45, price: 26000, desc: "龙鳞宝铠，防御+45" },
  // 饰品（特殊效果）
  "护心镜": { type: "acc", def: 3, price: 1500, desc: "护住心口的铜镜，防御+3" },
  "玉佩":   { type: "acc", int: 3, price: 2000, desc: "温润古玉，智力+3" },
  "诸葛巾": { type: "acc", int: 20, price: 30000, nosell: true, desc: "名品彩蛋：武侯纶巾，智力+20" },
  // 消耗道具（heal 治疗 / mp 回蓝 / revive 复活比例 / dmgAll 固定群伤 / mat 素材）
  "草药":   { type: "item", heal: 40,  price: 50,  desc: "回复40点HP" },
  "金疮药": { type: "item", heal: 120, price: 180, desc: "回复120点HP" },
  "还魂丹": { type: "item", heal: 300, price: 500, desc: "回复300点HP" },
  "仙草露": { type: "item", heal: "full", price: 1500, desc: "HP 全部回复" },
  "甘露":   { type: "item", mp: 40,    price: 300, desc: "回复40点MP" },
  "清泉":   { type: "item", mp: 15,    price: 120, desc: "回复15点MP" },
  "火药弹": { type: "item", dmgAll: 80, price: 400, desc: "敌全体80点伤害（战斗中用）" },
  "诸葛连弩图": { type: "item", dmgAll: 200, price: 800, desc: "敌全体200点伤害（战斗中用）" },
  "返魂香": { type: "item", revive: 0.5, price: 600, desc: "复活队友并回复50%HP（第九章起售）" },
  "精铁":   { type: "item", mat: true, price: 300, desc: "武器强化素材（第十章铁匠铺）" },
  "箭":     { type: "item", price: 0, nosell: true, desc: "草船借来的箭（剧情道具）" },
  // 计策书（type: book，道具页给指定角色习得对应谋略，不可重复）
  "火计书": { type: "book", skill: "huoji",  price: 800,  desc: "习得：火计" },
  "水计书": { type: "book", skill: "shuiji", price: 1000, desc: "习得：水计" },
  "落石书": { type: "book", skill: "luoshi", price: 1000, desc: "习得：落石" },
  "风计书": { type: "book", skill: "fengji", price: 1200, desc: "习得：风计" },
  "雷计书": { type: "book", skill: "leiji",  price: 2000, desc: "习得：雷计" },
  "石阵书": { type: "book", skill: "baguazhen", price: 2500, desc: "习得：八卦阵" },
};

const SHOPS = {
  // 序章 · 徐州城（铜代际）
  ch00_inn:    { type: "inn", cost: 30, text: "客官，住店吗？30金一晚，包你精神百倍。" },
  ch00_weapon: { type: "equip", stock: ["铜剑", "铁剑", "布衣", "皮甲"], text: "客官，看看兵器衣甲？买了立刻给好汉配上。" },
  ch00_item:   { type: "item", stock: ["草药"], text: "草药便宜卖了，出门必备。" },
  // 第一章 · 郯城（铁代际）
  ch01_inn:    { type: "inn", cost: 60, text: "兵荒马乱的，60金一晚，热水管够。" },
  ch01_weapon: { type: "equip", stock: ["铁剑", "铁甲", "皮盾"], text: "曹军势大，不添点铁器怎么行？" },
  ch01_item:   { type: "item", stock: ["草药", "金疮药"], text: "金疮药是新到的伤药，疗伤有奇效。" },
  // 第二章 · 小沛（钢代际）
  ch02_inn:    { type: "inn", cost: 80, text: "小沛地方小，80金一晚，委屈客官了。" },
  ch02_weapon: { type: "equip", stock: ["钢剑", "钢甲", "护心镜"], text: "钢器难得，价钱是不便宜，可保命啊。" },
  ch02_item:   { type: "item", stock: ["草药", "金疮药"], text: "药材都有些，客官看着挑。" },
  // 第二章 · 下邳城（钢代际，与 小沛 同价）
  ch02b_inn:    { type: "inn", cost: 80, text: "下邳大城，80金一晚，住得舒坦。" },
  ch02b_weapon: { type: "equip", stock: ["钢剑", "钢甲", "护心镜"], text: "钢剑钢甲护心镜，都是好货色。" },
  ch02b_item:   { type: "item", stock: ["草药", "金疮药"], text: "药材齐备，客官请便。" },
  // 第三章 · 许都（大商店：钢+代，玉佩、清泉、火药弹上线）
  ch03_inn:    { type: "inn", cost: 120, text: "许都繁华，120金一晚，酒水齐全。" },
  ch03_weapon: { type: "equip", stock: ["钢剑", "精钢剑", "钢甲", "玄铁甲", "护心镜", "玉佩"], text: "许都大店，南北好货都有，客官慢挑。" },
  ch03_item:   { type: "item", stock: ["草药", "金疮药", "清泉", "火药弹"], text: "清泉润喉，火药防身，都是时新货。" },
  // 第五章 · 洛阳（大商店：精钢系列、还魂丹上线）
  ch05_inn:    { type: "inn", cost: 150, text: "洛阳古都，150金一晚，马虎不得。" },
  ch05_weapon: { type: "equip", stock: ["精钢剑", "玄铁甲", "玉佩"], text: "精钢玄铁，都是关内难寻的好东西。" },
  ch05_item:   { type: "item", stock: ["金疮药", "还魂丹", "清泉"], text: "还魂丹千金难求，客官要不要备一颗？" },
  // 第五章 · 古城（小旅店）
  ch05g_inn:   { type: "inn", cost: 100, text: "古城虽小，100金一晚，被褥干净。" },
  // 第六章 · 新野 / 襄阳（文房铺卖计策书）
  ch06_inn:    { type: "inn", cost: 150, text: "新野小城，150金一晚，客官歇息。" },
  ch06_weapon: { type: "equip", stock: ["精钢剑", "玄铁甲", "玉佩"], text: "新野地僻，这些是压箱底的好货。" },
  ch06_item:   { type: "item", stock: ["金疮药", "还魂丹", "清泉"], text: "药材齐备，客官请便。" },
  ch06_book:   { type: "item", stock: ["火计书", "水计书", "落石书", "风计书", "雷计书", "石阵书"], text: "文房铺中，计策书六卷，识货的自来。" },
  ch06b_inn:   { type: "inn", cost: 180, text: "襄阳大城，180金一晚。" },
  // 第七章 · 新野战时商店（兵荒马乱，全线 +20%）
  ch07_inn:    { type: "inn", cost: 180, text: "兵荒马乱的，180金一晚，热水照供。" },
  ch07_weapon: { type: "equip", priceMult: 1.2, stock: ["精钢剑", "玄铁甲", "玉佩"], text: "战事吃紧，价钱涨了两成，客官莫怪。" },
  ch07_item:   { type: "item", priceMult: 1.2, stock: ["金疮药", "还魂丹", "清泉", "火药弹"], text: "物资紧张，涨了两成，仍是保命要紧。" },
  // 第八章 · 柴桑（大商店：白银系列）
  ch08_inn:    { type: "inn", cost: 220, text: "柴桑临江，220金一晚，江景上房。" },
  ch08_weapon: { type: "equip", stock: ["白银剑", "白银铠", "玉佩"], text: "白银精工，江东最好的铁器都在这了。" },
  ch08_item:   { type: "item", stock: ["金疮药", "还魂丹", "甘露", "仙草露", "诸葛连弩图"], text: "甘露仙草，连弩图谱，客官好眼光。" },
  // 第九章 · 四郡集市（弓系上线、返魂香开售；黑市游商贵五成）
  ch09_inn:    { type: "inn", cost: 260, text: "荆南地界，260金一晚，图个安稳。" },
  ch09_weapon: { type: "equip", stock: ["白银剑", "白银铠", "铁刀", "铁矛", "铁枪", "铁脊弓", "羽扇"], text: "四郡集市，刀枪矛弓扇，各系齐备。" },
  ch09_item:   { type: "item", stock: ["金疮药", "还魂丹", "甘露", "返魂香"], text: "返魂香能救命，客官备一支？" },
  ch09_black:  { type: "equip", priceMult: 1.5, stock: ["白银剑", "白银铠"], text: "荆州游商：好货不便宜，概不还价。（固定两件，贵五成）" },
  // 第十章 · 成都大宝库（龙泉系列）
  ch10_inn:    { type: "inn", cost: 300, text: "天府之国，300金一晚，巴适得很。" },
  ch10_weapon: { type: "equip", stock: ["龙泉剑", "龙鳞铠", "白银剑", "白银铠"], text: "成都大宝库，龙泉龙鳞，镇店之宝。" },
  ch10_item:   { type: "item", stock: ["还魂丹", "仙草露", "甘露", "返魂香", "精铁"], text: "仙草返魂，还有精铁少许。" },
  ch10b_inn:   { type: "inn", cost: 240, text: "涪城小店，240金一晚。" },
  // 第十一章 · 汉中军需（终极常规装备 + 名品限量）
  ch11_inn:    { type: "inn", cost: 350, text: "汉中军需客栈，350金一晚。" },
  ch11_weapon: { type: "equip", stock: ["龙泉剑", "龙鳞铠", "雌雄双股剑", "龙胆枪", "七星剑", "诸葛巾"], text: "军需官：名品限量，只卖识货之人。" },
  ch11_item:   { type: "item", stock: ["仙草露", "甘露", "返魂香", "诸葛连弩图"], text: "军需药材，北伐专用。" },
};

if (typeof module !== "undefined") module.exports = { ITEMS: ITEMS, SHOPS: SHOPS };
