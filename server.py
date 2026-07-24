#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""桃园三国 RPG · 后端（零依赖，Python 标准库）

- 静态托管本目录全部文件（index.html / data.js / game.js）
- POST /api/save  {"state": {...}}  -> 存档（SQLite 单槽位）
- GET  /api/load                    -> 读档
- GET  /api/health                  -> {"ok": true}

数据存同目录 rpg.db。运行：python server.py（默认 0.0.0.0:8322）
"""

import json
import os
import sqlite3
import sys
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, unquote

BASE = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE, "rpg.db")
HOST, PORT = "0.0.0.0", 8322

MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".png": "image/png", ".jpg": "image/jpeg",
    ".json": "application/json; charset=utf-8",
}


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS saves (
            slot TEXT PRIMARY KEY,
            state TEXT NOT NULL,
            ts REAL NOT NULL
        )
    """)
    return conn


def json_response(handler, obj, code=200):
    body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
    handler.send_response(code)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")
    handler.end_headers()
    handler.wfile.write(body)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        sys.stdout.write("[%s] %s\n" % (time.strftime("%H:%M:%S"), fmt % args))

    def _body(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length) or b"{}"
        try:
            return json.loads(raw.decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return {}

    def do_OPTIONS(self):
        json_response(self, {})

    def do_GET(self):
        path = unquote(urlparse(self.path).path)  # unquote：支持中文文件名资产
        if path == "/api/health":
            json_response(self, {"ok": True})
            return
        if path == "/api/load":
            conn = get_db()
            row = conn.execute(
                "SELECT state FROM saves WHERE slot='default'").fetchone()
            conn.close()
            if row:
                json_response(self, {"state": json.loads(row[0])})
            else:
                json_response(self, {"error": "no save"}, 404)
            return
        # 静态文件（防目录穿越）
        if path == "/":
            path = "/index.html"
        rel = os.path.normpath(path.lstrip("/"))
        full = os.path.join(BASE, rel)
        if not full.startswith(BASE) or not os.path.isfile(full):
            json_response(self, {"error": "not found"}, 404)
            return
        ext = os.path.splitext(full)[1].lower()
        with open(full, "rb") as f:
            body = f.read()
        self.send_response(200)
        self.send_header("Content-Type", MIME.get(ext, "application/octet-stream"))
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        path = urlparse(self.path).path
        if path == "/api/save":
            data = self._body()
            state = data.get("state")
            if state is None:
                json_response(self, {"error": "missing state"}, 400)
                return
            conn = get_db()
            conn.execute(
                "INSERT OR REPLACE INTO saves (slot, state, ts) VALUES ('default', ?, ?)",
                (json.dumps(state, ensure_ascii=False), time.time()))
            conn.commit()
            conn.close()
            json_response(self, {"ok": True})
        else:
            json_response(self, {"error": "not found"}, 404)


def main():
    get_db().close()
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"桃园三国服务已启动：http://localhost:{PORT}")
    print(f"手机请访问：http://<本机局域网IP>:{PORT}（同一 Wi-Fi）")
    print("按 Ctrl+C 停止")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止")


if __name__ == "__main__":
    main()
