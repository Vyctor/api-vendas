FROM node:latest

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 3333

