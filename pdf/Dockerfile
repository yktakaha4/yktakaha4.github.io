FROM ghcr.io/puppeteer/puppeteer:21

ENV TZ=Asia/Tokyo

USER root

RUN apt-get update

RUN apt-get install -y \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
    libimage-exiftool-perl

USER pptruser
