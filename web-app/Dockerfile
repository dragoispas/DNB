# pull official base image
FROM node:20-alpine

# set working directory
WORKDIR /usr/src/app

# install dependencies
COPY package.json package-lock.json ./
RUN npm install

# copy project
COPY . .

# build the app
RUN npm run build

# expose port
EXPOSE 3000

# start the app
CMD ["npm", "start"]
