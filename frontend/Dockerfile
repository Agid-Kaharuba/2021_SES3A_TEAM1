# sudo docker build -t 2021-ses3b-team1-front .
# sudo docker run -p 3000:3000 2021-ses3b-team1-front

FROM node:14-alpine
COPY ./ /app
WORKDIR /app
ENTRYPOINT npm run prod
EXPOSE 3000