FROM node:18

WORKDIR /usr/src/api

COPY . .
COPY ./.env ./.env

COPY package*.json ./

RUN yarn --quiet --no-optional --no-fund --loglevel=error

RUN yarn build

EXPOSE 80

CMD ["yarn", "start:prod"]
