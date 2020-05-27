FROM node:latest

ENV PORT 4000

# Create app directory
RUN mkdir -p /usr/src/back
WORKDIR /usr/src/back

# Installing dependencies
COPY package*.json /usr/src/back/
RUN npm install

# Copying source files
COPY . /usr/src/back

# Building app
EXPOSE 4000

ENV NODE_ENV=production

# Running the app
CMD "npm" "run" "start"