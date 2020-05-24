FROM node:14.2.0
COPY package.json /src/package.json
RUN  cd /src; npm install
COPY . /src
EXPOSE 4000
WORKDIR /src

CMD npm run start