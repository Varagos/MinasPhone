FROM node as builder

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:slim

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json yarn.lock ./
COPY templates ./templates

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/app/dist ./dist

EXPOSE 8080
CMD [ "node", "dist/index.js" ]