# Fetching the latest node image on apline linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /onboarding-associate

# Installing dependencies
COPY ./package.json /onboarding-associate
RUN npm install --force

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start