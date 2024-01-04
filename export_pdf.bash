#!/usr/bin/env bash

set -euo pipefail

pdf_file_path="$(cd "$(dirname "$0")";pwd)/pdf/out/resume.pdf"

echo "remove old pdf file..."
rm -f "$pdf_file_path"

echo "generate pdf file..."
docker compose -f docker-compose.pdf.yml up
docker compose -f docker-compose.pdf.yml wait puppeteer

ls -l "$pdf_file_path"

echo "done!"
