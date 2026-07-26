// 地图 · ch09s_village_item_in 药铺（武东村设施室内；店主自 ch09s_village 迁入，shop id 不变）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch09s_village_item_in"] = {
  name: "药铺",
  grid: [
    "BBBBBBBBBBBBBBBB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLBBBBBB",
    "BLLLLLBLLLLLLLLB",
    "BLLLLLBLLLLLLLLB",
    "BBBBLLBLLLcttcLB",
    "BLLLLLLLLLLLLLLB",
    "BLLLLLLLLLLLLLLB",
    "BBBBBBB,,BBBBBBB",
  ],
  encounterTiles: [],
  npcs: [
    { id: "item", x: 4, y: 2, color: "#6a9a5a", name: "药铺掌柜", shop: "vil_item" },
  ],
  chests: [],
  transitions: [
    { x: 7, y: 9, to: { map: "ch09s_village", x: 13, y: 5 } },
    { x: 8, y: 9, to: { map: "ch09s_village", x: 13, y: 5 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
