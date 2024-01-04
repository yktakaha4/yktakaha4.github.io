#!/usr/bin/env bash

set -euo pipefail

pdf_file_path="$(cd "$(dirname "$0")";pwd)/pdf/out/resume.pdf"
chmod 0777 "$(dirname "$pdf_file_path")"

echo "remove old pdf file..."
rm -f "$pdf_file_path"

echo "generate pdf file..."
docker compose -f docker-compose.pdf.yml up -d
docker compose -f docker-compose.pdf.yml wait puppeteer

ls -l "$pdf_file_path"

echo "done!"
