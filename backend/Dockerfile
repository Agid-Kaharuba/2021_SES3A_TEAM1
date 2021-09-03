# sudo docker system prune
# sudo docker rmi $(sudo docker images -q) -f
# sudo docker build -t 2021-ses3b-team1-back .
# sudo docker run -p 4000:4000 2021-ses3b-team1-back



FROM node:14-alpine
COPY ./ /app
WORKDIR /app
RUN npm install
ENTRYPOINT npm start
EXPOSE 4000