FROM node:alpine

WORKDIR /app/hub

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
