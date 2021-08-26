FROM node

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
