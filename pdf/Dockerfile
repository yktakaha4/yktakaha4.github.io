FROM ghcr.io/puppeteer/puppeteer:21

ENV LANG ja_JP.UTF-8

USER root

RUN apt-get update && apt-get install -y \
    fonts-noto \
    fonts-noto-extra \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
    locales

RUN locale-gen ja_JP.UTF-8

USER pptruser
