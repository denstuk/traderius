FROM node:alpine

WORKDIR /app/trader

COPY /Users/mac/Documents/WorkFolder/denstuk/traderius/common /app/common

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9092

CMD ["npm", "run", "start:dev"]
