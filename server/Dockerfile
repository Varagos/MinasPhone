# Installs Node.js image
FROM node:16.13.1-alpine3.14
WORKDIR /usr/src/app
COPY ["package.json", "tsconfig.json", "nodemon.json", ".docker.dev.env", "./"]
COPY templates ./templates
# Copies everything in the src directory to WORKDIR/src
COPY src ./src
RUN ls -a
RUN npm install
# EXPOSE 8080
CMD ["npm","run","start:dev:docker"]