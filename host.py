#!/usr/bin/env python3
import http.server
import socketserver
import os
import platform
import signal
from tempfile import TemporaryDirectory


def open_browser():
    with TemporaryDirectory() as tempDir:
        url = "http://localhost:1337/dist"
        chrome_arguments = f"-incognito --new-window \"{url}\" --disable-extensions --user-data-dir=\"{tempDir}\""

        if platform.system() == "Windows":
            os.system(f"start \"\" /HIGH \"chrome\" {chrome_arguments}")
        else:
            # Should hopefully work on Linux/Mac! Untested, sadly.
            os.system(f"google-chrome {chrome_arguments}")


def ctrl_c_handler(signal, frame):
    print(f"Shutting down...")
    exit(0)


def wipe_screen():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")


if __name__ == "__main__":
    signal.signal(signal.SIGINT, ctrl_c_handler)

    wipe_screen()

    PORT = 1337

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

    print(f"Serving from port {PORT}...")

    print("Opening browser...")

    open_browser()

    httpd.serve_forever()
