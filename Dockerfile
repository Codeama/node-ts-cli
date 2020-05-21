FROM node:13
RUN mkdir -p /usr/src/circle
WORKDIR /usr/src/circle
RUN npm install
RUN apt-get update
RUN apt-get install nano
COPY . /usr/src/circle
CMD ["/bin/sh"]