#!/data/data/com.termux/files/usr/bin/bash
cd "$(dirname "$0")" || exit 1
printf '\nPortfolio server is starting...\nOpen Chrome: http://127.0.0.1:8000\nStop with Ctrl+C.\n\n'
python -m http.server 8000 --bind 0.0.0.0
