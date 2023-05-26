FROM node:14

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

# Depending on the NODE_ENV, diffrent .env file will be used
CMD ["yarn", "start"]
