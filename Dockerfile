FROM node:15 AS base

WORKDIR /app

COPY package.json .

COPY ./src/ ./src/

EXPOSE 4000

#---------------------------------------

FROM base AS development

RUN npm install

CMD [ "npm", "run" , "start-dev" ]

#----------------------------------------------

FROM base AS production

RUN npm install --only=production

CMD [ "npm", "start" ]