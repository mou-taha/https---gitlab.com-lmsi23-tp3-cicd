
FROM node:latest

WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

VOLUME ["/usr/src/app"]

EXPOSE 3003

CMD ["npm","run","watch"]
