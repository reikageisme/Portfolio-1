FROM node:20-alpine

# Cài đặt sqlite3 dependencies (python, build-base) cần thiết cho Alpine
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
