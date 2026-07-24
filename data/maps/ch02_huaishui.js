// 地图 · ch02_huaishui 淮水渡口（第二章：张辽来袭演出战在此触发）
var MAPS = typeof MAPS !== "undefined" ? MAPS : {};

MAPS["ch02_huaishui"] = {
  name: "淮水渡口",
  grid: [
    "RRRRRRRRR##GG##RRRRRRRRR",
    "R..........,,..........R",
    "R..T.......,,.....T....R",
    "R..........,,..........R",
    "R.....T....,,,....T....R",
    "R...........,,,........R",
    "R..T........MMMM.......R",
    "R..........WWWWWW......R",
    "R....T....WWWWWWWW..T..R",
    "R.........WWWWWWWW.....R",
    "R..T......WWWWWW....T..R",
    "R..........WWWW........R",
    "R.....T.....WW.....T...R",
    "RRRRRRRRRRRRRRRRRRRRRRRR",
  ],
  encounterTiles: [],
  npcs: [],
  chests: [],
  triggers: (function () {
    // 张辽来袭（演出战：撑 5 回合即过关）——辕门射戟后、张飞盗马吕布反目触发一次
    // 覆盖大路及渡口木板的所有进路，防止绕行漏触发
    var liao = [{ battle: "ch02_zhangliao",
      onWin: [{ say: "ch02.lostXiapi" }, { set: { q2: "lost" } },
              { warp: { map: "ch02_xiaopei", x: 10, y: 16 } },
              { toast: "退回小沛，找简雍从长计议" }] }];
    var spots = [[11, 5], [12, 5], [13, 5], [14, 5], [12, 6], [13, 6], [14, 6], [15, 6]];
    return spots.map(function (s) {
      return { x: s[0], y: s[1], if: { flag: "q2", is: "shed" }, do: liao };
    });
  })(),
  transitions: [
    { x: 11, y: 0, to: { map: "ch02_xiapi", x: 10, y: 16 } },
    { x: 12, y: 0, to: { map: "ch02_xiapi", x: 10, y: 16 } },
  ],
};

if (typeof module !== "undefined") module.exports = MAPS;
