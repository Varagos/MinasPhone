# Stage 1: Build Using also dev dependencies(like rimraf, typescript, etc)
FROM node:18 AS build
ARG SENTRY_AUTH_TOKEN

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json .
COPY yarn.lock .

RUN yarn install --production --immutable

CMD ["yarn", "start"]
