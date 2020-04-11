#!/usr/bin/env python3
import http.server
import socketserver
import os
import platform
import signal


def keyboardInterruptHandler(signal, frame):
    print(f"Shutting down...")
    exit(0)


def wipe():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")


if __name__ == "__main__":
    signal.signal(signal.SIGINT, keyboardInterruptHandler)

    wipe()

    PORT = 8080

    Handler = http.server.SimpleHTTPRequestHandler

    Handler.extensions_map = {
        '.manifest': 'text/cache-manifest',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.css': 'text/css',
        '.js': 'application/x-javascript',
        '.json': 'application/json',
        '.xml': 'application/xml',
        '.wasm': 'application/wasm',
        '': 'application/octet-stream',  # Default
    }

    httpd = socketserver.TCPServer(("", PORT), Handler)

    print(f"Serving at port {PORT}")
    httpd.serve_forever()
