# -*- coding: utf-8 -*-
# 临时自查脚本：村庄改造后核对改动点 + 洪水填充连通性（用完可删）
import re, io, sys, os

RPG = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ORIG = {
"ch00_field": ["RRRRRRRRRRRRRRRRRRRCCRRR","RCC..TT..........WW....R","RC...TTT....T...WW.....G","R......T.....T...WW....G","R....................,.R","R..T......T......T..,..R","R...................,..R","R..T.....T..........,..R","R..................,T..G","R......T......T....,...G","R..T..............,,...R","R.........T......,.....R","R..T............,..T...R","R......T........,......R","R..T.......T....,...T..R","R....T..........,WW....R","R..............,WW.....R","RRRRRRRRRRGGRRRRRRRRRRRR"],
"ch01_field": ["RRRRRRRRR##GG##RRRRRRRRR","R...T.....,,......T....R","R..T......,,..T........R","R........,,........T...R","R..T...T..,,...........R","R.........,,....T......R","R.........,,...........R","R..T......,.....T......R","G,,,,,,,,,,,,,,,,,,,,,,G","G,,,,,,,,,,,,,,,,,,,,,,G","R..T.....T......T......R","R......................R","R......T......T....T...R","R..T...................R","R.........T......T.....R","R...T..................R","R........T......T......R","RRRRRCCRRRRRRRRRRRRRRRRR"],
"ch02_field_east": ["RRRRRRRRRRRRRRRRRRCCRRRR","R...T.....T......T.....R","G,,,,,,,,,.............R","G.........,,,,,....T...R","R..T........,,,........R","R......T......,,..T....R","R.............,,.......R","R..T....T.....,,....T..#","R..............,,......#","R.....T........,,,,,,,,G","R......................G","R..T.......T........T..#","R......................#","R......T......T........R","R..T...................R","R.........T......T.....R","R....T.................R","RRRRRRRRRRRRRRRRRRRRRRRR"],
"ch02_field_south": ["RRRRRRRR##GG##RRRRRRRRRR","R.........,,...........R","R..T......,,.....T.....R","R.........,,,..........R","R....T......,,,....T...R","R............,,,.......R","R..T....T.....,,....T..R","R..............,,......R","R.....T........,,......R","R..............,,......R","R..T...........,,...T..R","R..............,,......R","R......T.......,,......R","R..T...........,,......R","R..............,,,.....R","R....T..........,,,....R","R...............,,,....R","RRRRRRRRRRRRR##GG##RRRRR"],
"ch03_field": ["RRRRRRRRR##GG##RRRRRRRRR","R.........,,...........R","R..T......,,.....T.....R","R.........,,...........R","R.....T....,,....T.....R","R..........,,,.........R","R..T...T....,,.....T...R","R.............,,.......R","R.....T......,,........G","R............,,,.......G","R..T.........,,...T....R","R.............,,.......R","R......T......,,.......R","R..T........,,....T....R","R.............,,.......R","R....T........,,,......R","R..............,,,.....R","RRRRRRRRRRRRRRRRRRRRRRRR"],
"ch06_field": ["RRRRRRRR##GG##RRRRRRRRRR","R........,,............R","R..T.....,,.....T......R","R........,,,...........R","R....T....,,,....T.....R","R..........,,,.........R","R..T...T....,,.....T...R","R............,,........R","R....T......,,.........G","R...........,,,........G","R..T.........,,...T....R","R.............,,.......R","R......T......,,.......R","R..T........,,....T....R","R.............,,.......R","R....T........,,,......R","R.............,,,......R","RRRRRRRR##GG##RRRRRRRRRR"],
"ch09_field_n": ["RRRRRRRR##GG##RRRRRRRRRR","R.........,,...........R","R..T......,,.....T.....R","R.........,,,..........R","R....T......,,,....T...R","R............,,,.......R","R..T....T.....,,....T..R","R..............,,......R","R.....T........,,......R","R..............,,......R","R..T...........,,...T..R","RRRRRRRR##GG##RRRRRRRRRR"],
"ch09_field_s": ["RRRRRRRRRRRRRRRRRR","R....T......T....R","R................R","R..T..........T..R","R................R","R................R","#....T......T....#","#................#","G,,,,,,,,,,,,,,,,G","#................#","#..T..........T..#","RRRRRRRRRRRRRRRRRR"],
"ch10_field": ["RRRRRRRR##GG##RRRRRRRRRR","R........,,............R","R..T.....,,.....T......R","R........,,,...........R","R....T....,,,....T.....R","R..........,,,.........R","R..T...T....,,.....T...#","R............,,........#","G....T......,,.........G","G...........,,,........G","R..T.........,,...T....#","R.............,,.......#","R......T......,,.......R","R..T........,,....T....R","R.............,,.......R","R....T........,,,......R","R.............,,,......R","RRRRRRRR##GG##RRRRRRRRRR"],
}

EXPECT = {
"ch00_field": dict([((11,x),'B') for x in (1,2,4,5,7,8)]+[((11,3),'T'),((12,1),'B'),((12,2),'D'),((12,4),'D'),((12,5),'B'),((12,7),'B'),((12,8),'D'),((13,4),','),((14,4),',')]),
"ch01_field": dict([((11,x),'B') for x in (8,9,11,12,14,15)]+[((12,8),'B'),((12,9),'D'),((12,11),'D'),((12,12),'B'),((12,14),'B'),((12,15),'D'),((13,11),','),((14,11),',')]),
"ch02_field_east": dict([((14,x),'B') for x in (6,7,9,10,12,13)]+[((15,6),'B'),((15,7),'D'),((15,9),'D'),((15,10),'B'),((15,12),'B'),((15,13),'D'),((16,9),',')]),
"ch02_field_south": dict([((9,x),'B') for x in (4,5,7,8,10,11)]+[((10,4),'B'),((10,5),'D'),((10,7),'D'),((10,8),'B'),((10,10),'B'),((10,11),'D'),((11,7),',')]),
"ch03_field": dict([((14,x),'B') for x in (6,7,9,10,12,13)]+[((15,6),'B'),((15,7),'D'),((15,9),'D'),((15,10),'B'),((15,12),'B'),((15,13),'D'),((16,9),',')]),
"ch06_field": dict([((11,x),'B') for x in (5,6,8,9,11,12)]+[((12,5),'B'),((12,6),'D'),((12,8),'D'),((12,9),'B'),((12,11),'B'),((12,12),'D'),((13,8),','),((14,8),',')]),
"ch09_field_n": dict([((5,x),'B') for x in (4,5,7,8,10,11)]+[((6,4),'B'),((6,5),'D'),((6,7),'D'),((6,8),'B'),((6,10),'B'),((6,11),'D'),((7,7),','),((8,7),',')]),
"ch09_field_s": dict([((5,x),'B') for x in (6,7,9,10,12,13)]+[((6,6),'B'),((6,7),'D'),((6,9),'D'),((6,10),'B'),((6,12),'B'),((6,13),'D'),((7,9),',')]),
"ch10_field": dict([((11,x),'B') for x in (5,6,8,9,11,12)]+[((12,5),'B'),((12,6),'D'),((12,8),'D'),((12,9),'B'),((12,11),'B'),((12,12),'D'),((13,8),','),((14,8),',')]),
}

PASS = set("GCEFM.,L")

def load(f):
    src = io.open(os.path.join(RPG, "data", "maps", f + ".js"), encoding="utf-8").read()
    g = re.findall(r'"([^"]*)"', re.search(r'grid:\s*\[(.*?)\]', src, re.S).group(1))
    return src, g

def flood(g, sx, sy):
    seen = set([(sx, sy)]); stack = [(sx, sy)]
    while stack:
        x, y = stack.pop()
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x+dx, y+dy
            if 0 <= ny < len(g) and 0 <= nx < len(g[0]) and (nx,ny) not in seen and g[ny][nx] in PASS:
                seen.add((nx,ny)); stack.append((nx,ny))
    return seen

bad = 0
for f, orig in ORIG.items():
    src, cur = load(f)
    diff = {}
    for y in range(len(orig)):
        for x in range(len(orig[0])):
            if orig[y][x] != cur[y][x]:
                diff[(y,x)] = cur[y][x]
    if diff != EXPECT[f]:
        bad += 1
        print("[%s] DIFF MISMATCH extra:%s missing:%s" % (f,
            {k:v for k,v in diff.items() if k not in EXPECT[f]},
            {k:v for k,v in EXPECT[f].items() if k not in diff}))
    pts = [(int(m.group(1)), int(m.group(2))) for m in re.finditer(r'\{\s*x:\s*(\d+),\s*y:\s*(\d+)', src)]
    start = pts[0]
    ro = flood(orig, start[0], start[1])
    rn = flood(cur, start[0], start[1])
    lost = ro - rn
    intended = set((x, y) for (y, x) in EXPECT[f])  # flood 用 (x,y)
    real = [l for l in lost if cur[l[1]][l[0]] in PASS]  # 仍可通行却丢失
    unexpected = set(lost) - intended
    if real or unexpected:
        bad += 1
        print("[%s] REAL LOST:%s UNEXPECTED:%s" % (f, sorted(real), sorted(unexpected)))
    unreachable = [p for p in set(pts) if cur[p[1]][p[0]] in PASS and p not in rn]
    if unreachable:
        bad += 1
        print("[%s] UNREACHABLE POINTS:%s" % (f, unreachable))
    print("[%s] changed=%d connectivity OK (+%d new reachable tiles)" % (f, len(diff), len(rn - ro)))

for v in ["ch00_village","ch01_village","ch02e_village","ch02s_village","ch03_village","ch06_village","ch09n_village","ch09s_village","ch10_village"]:
    src, g = load(v)
    r = flood(g, 5, 7)
    allpass = set((x,y) for y in range(len(g)) for x in range(len(g[0])) if g[y][x] in PASS)
    npcs = [(int(m.group(2)), int(m.group(3))) for m in re.finditer(r'\{\s*id:\s*"([^"]+)",\s*x:\s*(\d+),\s*y:\s*(\d+)', src)]
    missing = allpass - r
    npc_bad = [n for n in npcs if n not in r]
    if missing or npc_bad:
        bad += 1
        print("[%s] VILLAGE UNREACHABLE:%s NPC BAD:%s" % (v, sorted(missing), npc_bad))
    else:
        print("[%s] village fully reachable from landing (%d tiles), %d NPCs OK" % (v, len(allpass), len(npcs)))

print("BAD=%d" % bad)
sys.exit(1 if bad else 0)
