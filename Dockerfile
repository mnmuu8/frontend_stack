FROM node:16.20.2-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "dev"]