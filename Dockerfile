FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app/cms-scheduler-site
WORKDIR /usr/src/app/cms-scheduler-site

# Install app dependencies
COPY package.json /usr/src/app/cms-scheduler-site
RUN npm install

# Bundle app source
COPY . /usr/src/app/cms-scheduler-site
EXPOSE 8080

CMD [ "npm", "start" ]