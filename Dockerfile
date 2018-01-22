FROM node:8.5.0

WORKDIR /usr/src/frontend

COPY package.json /usr/src/frontend
COPY package-lock.json /usr/src/frontend
RUN npm install

COPY . /usr/src/frontend

EXPOSE 4200

CMD ["npm", "start"]
