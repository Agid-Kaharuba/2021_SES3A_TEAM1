# docker build -t 2021-ses3b-team1 .
# docker run -p 4000:4000 2021-ses3b-team1

FROM node:14
COPY ./ /app
WORKDIR /app
RUN npm install
ENTRYPOINT npm start
EXPOSE 4000