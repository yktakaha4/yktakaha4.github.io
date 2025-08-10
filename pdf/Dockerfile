FROM ghcr.io/puppeteer/puppeteer:24

ENV TZ=Asia/Tokyo

USER root

RUN apt-get update && \
    apt-get install -y \
    locales \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
    libimage-exiftool-perl && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen

ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

USER pptruser
