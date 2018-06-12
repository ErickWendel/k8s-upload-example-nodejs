FROM node:8-alpine

ADD . src/

WORKDIR /src

RUN npm i -g typescript pm2

RUN npm i 

RUN npm run build 

CMD npm start