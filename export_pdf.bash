#!/usr/bin/env bash

set -euo pipefail

base_path="$(cd "$(dirname "$0")";pwd)"
pdf_file_path="$base_path/pdf/out/resume.pdf"
mkdir -p "$(dirname "$pdf_file_path")"
chmod 0777 "$(dirname "$pdf_file_path")"

echo "remove old pdf file..."
rm -f "$pdf_file_path"

echo "generate pdf file..."
docker compose -f docker-compose.pdf.yml up -d --build
docker compose -f docker-compose.pdf.yml wait puppeteer

ls -l "$pdf_file_path"

echo "done!"
