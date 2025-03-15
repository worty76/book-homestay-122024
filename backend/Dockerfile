FROM node:20

WORKDIR /usr/src/app

RUN npm i npm@latest -g

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

CMD ["node", "dist/main.js"]