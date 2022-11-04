# To install docker desktop : https://docs.docker.com/desktop/install/windows-install/
#cmd : docker build -t onboarding-associate-ui .
# Fetching the latest node image on apline linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /onboarding-associate-ui

# Installing dependencies
COPY ./package.json /onboarding-associate-ui
RUN npm install --force

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start