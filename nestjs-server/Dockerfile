# Stage 1: Build Using also dev dependencies(like rimraf, typescript, etc)
FROM node:18 AS build

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

# Copy env files
COPY .env.prod .
COPY .development.docker.env .

RUN yarn install --production --immutable

CMD ["yarn", "start"]
