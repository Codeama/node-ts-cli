FROM node:13
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm cache clean --force
RUN npm install
RUN apt-get update
RUN apt-get install nano
COPY . /usr/src/app
CMD ["/bin/sh"]