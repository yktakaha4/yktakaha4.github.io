#!/usr/bin/env bash

set -euo pipefail

base_path="$(cd "$(dirname "$0")";pwd)"
pdf_out_path="$base_path/pdf/out"
pdf_file_path="$pdf_out_path/resume.pdf"

echo "remove old pdf file..."
rm -rf "$pdf_out_path"
mkdir -p "$pdf_out_path"
chmod 0777 "$pdf_out_path"

echo "generate pdf file..."
docker compose -f docker-compose.pdf.yml down
docker compose -f docker-compose.pdf.yml rm -f
docker compose -f docker-compose.pdf.yml up -d --build resume
docker compose -f docker-compose.pdf.yml up --build puppeteer

ls -l "$pdf_file_path"

echo "done!"
