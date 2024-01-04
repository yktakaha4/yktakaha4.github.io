#!/usr/bin/env bash

set -euo pipefail

pdf_file_path="$(cd "$(dirname "$0")";pwd)/pdf/out/resume.pdf"

echo "remove old pdf file..."
rm -f "$pdf_file_path"

echo "generate pdf file..."
docker compose -f docker-compose.pdf.yml up -d

while [ ! -e "$pdf_file_path" ]; do
  echo "waiting for pdf file..."
  sleep 3
done

echo "pdf file generated!"
ls -l "$pdf_file_path"

echo "remove docker container..."
docker compose -f docker-compose.pdf.yml down

echo "done!"
