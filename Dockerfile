FROM node:slim
ENV NODE_ENV=production \
    PORT=3000 

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]