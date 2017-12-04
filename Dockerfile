FROM node:8.5.0

WORKDIR /usr/src/frontend

COPY package.json /usr/src/frontend

RUN npm update
RUN npm install

COPY ../../NessemuT/Desktop/frontend /usr/src/frontend

EXPOSE 4200

CMD ["npm", "start"]
