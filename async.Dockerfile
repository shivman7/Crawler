FROM node:8
MAINTAINER Shivanshu Jaiswal "shivanshujaiswal@gmail.com"

#Setting up app
WORKDIR /Crawler-async
COPY package.json /Crawler-async
RUN npm install
COPY . /Crawler-async
CMD ["npm", "start-async"]