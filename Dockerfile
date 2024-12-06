# base image for nodejs installation in the container that is system dependency for the application
FROM node:18

# create the working directory in the container
WORKDIR /app

# Install build tools
RUN apk add --no-cache build-base musl-dev

# copy the package.json and package-lock.json files to the container working directory
COPY package*.json ./

# Set environment variable for development
ENV NODE_ENV=development

# install dependencies
RUN apt-get update && apt-get install -y build-essential musl-dev && npm install

# copy the source code to the container working directory
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]