// 地图 · ch02_field_south 下邳郊野（第二章野外：北通小沛，南通下邳城）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02_field_south"] = {
  name: "下邳郊野",
  grid: [
    "RRRRRRRR##GG##RRRRRRRRRR",
    "R.........,,...........R",
    "R..T......,,.....T.....R",
    "R.........,,,..........R",
    "R....T......,,,....T...R",
    "R............,,,.......R",
    "R..T....T.....,,....T..R",
    "R..............,,......R",
    "R.....T........,,......R",
    "R..............,,......R",
    "R..T...........,,...T..R",
    "R..............,,......R",
    "R......T.......,,......R",
    "R..T...........,,......R",
    "R..............,,,.....R",
    "R....T..........,,,....R",
    "R...............,,,....R",
    "RRRRRRRRRRRRR##GG##RRRRR",
  ],
  encounterTiles: ["."],
  encounterRate: 0.11,
  encounterGroups: [["袁术兵", "袁术弓手"], ["袁术弓手", "袁术弓手"], ["袁术兵", "袁术兵", "袁术弓手"]],
  npcs: [],
  chests: [
    { x: 18, y: 5, id: "f1", items: { "金疮药": 2 } },
  ],
  transitions: [
    { x: 10, y: 0,  to: { map: "ch02_xiaopei", x: 10, y: 16 } },
    { x: 11, y: 0,  to: { map: "ch02_xiaopei", x: 10, y: 16 } },
    { x: 15, y: 17, to: { map: "ch02_xiapi", x: 10, y: 1 } },
    { x: 16, y: 17, to: { map: "ch02_xiapi", x: 10, y: 1 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
