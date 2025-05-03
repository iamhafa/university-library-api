FROM node:latest

WORKDIR /app/university-library-api

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD [ "yarn", "start:prod" ]