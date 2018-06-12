FROM node:8-alpine

ADD . src/

WORKDIR /src

RUN npm i -g typescript pm2 && npm i && npm run build 

CMD npm start