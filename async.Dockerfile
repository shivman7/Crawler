FROM node:8
MAINTAINER Shivanshu Jaiswal "shivanshujaiswal@gmail.com"

#Setting up app
WORKDIR /Crawler
COPY package.json /Crawler
RUN npm install
COPY . /Crawler
CMD ["npm", "start-async"]