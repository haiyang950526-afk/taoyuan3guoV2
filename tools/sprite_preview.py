#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 立绘预览（python tools/sprite_preview.py，在 rpg/ 目录下运行）
# 从 engine/sprites.js 抽出点阵定义，按同一叠加规则合成，写成 ASCII 到
# tools/sprite_preview.txt，便于不开浏览器检查造型（与 JS 渲染结果一致）
import json
import re
import os

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, "..", "engine", "sprites.js")


def extract_array(src, name):
    m = re.search(name + r"\s*=\s*\[(.*?)\];", src, re.S)
    return re.findall(r'"([^"]*)"', m.group(1))


def extract_map(src, name):
    m = re.search(name + r"\s*=\s*\{(.*?)\n\};", src, re.S)
    body = m.group(1)
    out = {}
    for key, blk in re.findall(r'(\w+):\s*\{(.*?)\},?\s*(?:\n|  )', body, re.S):
        rows = {int(r): s for r, s in re.findall(r'(\d+):\s*"([^"]*)"', blk)}
        out[key] = rows
    return out


def overlay(grid, rows):
    for r, row in rows.items():
        g = list(grid[r])
        for i, ch in enumerate(row[:16]):
            if ch != ".":
                g[i] = row[i]
        grid[r] = "".join(g)


def compose(base, heads, beards, weapons, back_rows, look, back=False):
    grid = list(base)
    head = look.get("head", "none")
    if head in heads:
        overlay(grid, heads[head])
    if back:
        if head in ("helmet", "lunjin", "bandana"):
            grid[5] = grid[5].replace("E", "S")
        else:
            overlay(grid, back_rows)
    elif look.get("beard", "none") in beards:
        overlay(grid, beards[look["beard"]])
    if look.get("weapon", "none") in weapons:
        overlay(grid, weapons[look["weapon"]])
    return grid


def main():
    src = open(SRC, encoding="utf-8").read()
    base = extract_array(src, "SPR_BASE")
    heads = extract_map(src, "SPR_HEADS")
    beards = extract_map(src, "SPR_BEARDS")
    weapons = extract_map(src, "SPR_WEAPONS")
    back_rows = {int(r): s for r, s in re.findall(
        r'(\d+):\s*"([^"]*)"', re.search(r"SPR_BACK\s*=\s*\{(.*?)\};", src, re.S).group(1))}

    samples = [
        ("刘备(金冠/短须/剑)", {"head": "crown", "beard": "small", "weapon": "sword"}, False),
        ("关羽(绿巾/长髯/刀)", {"head": "bandana", "beard": "long", "weapon": "blade"}, False),
        ("张飞(散发/虬髯/矛)", {"beard": "bushy", "weapon": "spear"}, False),
        ("赵云(银盔/枪)", {"head": "helmet", "weapon": "pike"}, False),
        ("诸葛亮(纶巾/扇)", {"head": "lunjin", "weapon": "fan"}, False),
        ("黄忠(白盔/弓)", {"head": "helmet", "beard": "small", "weapon": "bow"}, False),
        ("百姓(素衣)", {}, False),
        ("敌兵(盔/剑)", {"head": "helmet", "weapon": "sword"}, False),
        ("敌弓手(巾/弓)", {"head": "bandana", "weapon": "bow"}, False),
        ("敌谋士(笠/扇)", {"head": "hat", "weapon": "fan"}, False),
        ("司马懿(纶巾/扇)", {"head": "lunjin", "weapon": "fan", "beard": "small"}, False),
        ("村民(背面)", {}, True),
    ]
    out = []
    for name, look, back in samples:
        out.append("== " + name + " ==")
        for row in compose(base, heads, beards, weapons, back_rows, look, back):
            out.append("".join("██" if ch != "." else "  " for ch in row))
        out.append("")
    dst = os.path.join(BASE, "sprite_preview.txt")
    with open(dst, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print("written:", dst)


if __name__ == "__main__":
    main()
