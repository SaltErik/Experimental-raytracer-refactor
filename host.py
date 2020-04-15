#!/usr/bin/env python3
import http.server
import os
import platform
import signal
import socketserver
from tempfile import TemporaryDirectory

PORT = 1337

MIME_TYPES = {
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


def open_browser():
    print("Opening browser...")
    with TemporaryDirectory() as tempDir:
        url = "http://localhost:1337/dist"
        chrome_arguments = f"-incognito --new-window \"{url}\" --disable-extensions --user-data-dir=\"{tempDir}\" --enable-benchmarking"

        if platform.system() == "Windows":
            os.system(f"start \"\" /HIGH \"chrome\" {chrome_arguments}")
        else:
            # Should hopefully work on Linux/Mac! Untested, sadly.
            os.system(f"google-chrome {chrome_arguments}")


def handle_ctrl_c(signal, frame):
    print(f"Shutting down...")
    exit(0)


def register_ctrl_c_handler():
    signal.signal(signal.SIGINT, handle_ctrl_c)


def wipe_screen():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")


def init_server():
    Handler = http.server.SimpleHTTPRequestHandler
    Handler.extensions_map = MIME_TYPES
    return socketserver.TCPServer(("", PORT), Handler)


if __name__ == "__main__":
    register_ctrl_c_handler()

    wipe_screen()

    open_browser()

    httpd = init_server()

    print(f"Serving from port {PORT}...")

    httpd.serve_forever()
