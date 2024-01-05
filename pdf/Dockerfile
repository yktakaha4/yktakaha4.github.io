FROM ghcr.io/puppeteer/puppeteer:21

USER root

RUN apt-get update && apt-get install -y \
    fonts-noto \
    fonts-noto-extra \
    fonts-noto-cjk \
    fonts-noto-color-emoji

USER pptruser
