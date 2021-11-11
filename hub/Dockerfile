FROM node:alpine

WORKDIR /app/notifier

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
