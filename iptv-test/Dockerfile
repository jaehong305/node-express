FROM node:16

WORKDIR /backend/
COPY ./package.json /backend/
COPY ./package-lock.json /backend/
RUN npm install

COPY . /backend/
CMD npm start