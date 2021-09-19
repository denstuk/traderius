FROM node:alpine

WORKDIR /app/trader

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9092

CMD ["npm", "run", "start:dev"]
