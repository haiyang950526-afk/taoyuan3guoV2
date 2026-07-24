// 地图 · ch10_luofeng 落凤坡（第十章：固定败战——庞统之殁）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch10_luofeng"] = {
  name: "落凤坡",
  grid: [
    "RRRRRRRRRRRRRRRR",
    "R....R......R..R",
    "R....R..T...R..R",
    "R.T..R......R..R",
    "R....R..T...R..R",
    "R....R......R..R",
    "G,,,,,,,,,,,,,,R",
    "R....R......R..R",
    "R..T.R..T...R..R",
    "R....R......R..R",
    "R....R......T..R",
    "RRRRRRRRRRRRRRRR",
  ],
  encounterTiles: [],
  npcs: [],
  chests: [],
  triggers: [
    // 中伏（固定败战：庞统剧情杀，永久离队）
    { x: 12, y: 6, if: { flag: "q10", is: "luo1" },
      do: [{ battle: "ch10_luofeng",
             onLoss: [{ say: "ch10.pangtongDeath" }, { leave: "庞统" },
                      { set: { q10: "luofeng" } },
                      { warp: { map: "ch10_field", x: 1, y: 8 } },
                      { toast: "化悲痛为力量——再攻雒城！" }] }] },
    { x: 13, y: 6, if: { flag: "q10", is: "luo1" },
      do: [{ battle: "ch10_luofeng",
             onLoss: [{ say: "ch10.pangtongDeath" }, { leave: "庞统" },
                      { set: { q10: "luofeng" } },
                      { warp: { map: "ch10_field", x: 1, y: 8 } },
                      { toast: "化悲痛为力量——再攻雒城！" }] }] },
  ],
  transitions: [
    { x: 0, y: 6, to: { map: "ch10_field", x: 1, y: 8 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
