FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8800

CMD ["node", "index.js"]