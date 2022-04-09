FROM node:16.14.0

WORKDIR /usr/src/node-classroom-api

COPY ./ ./

RUN npm install

CMD ["npm", "start"]