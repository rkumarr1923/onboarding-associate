# To install docker desktop : https://docs.docker.com/desktop/install/windows-install/
#cmd : docker build -t onboarding-associate-ui .
FROM node:12-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i --force
CMD ["npm", "run", "start"]