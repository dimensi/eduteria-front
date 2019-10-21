FROM node:11-slim

RUN apt-get update && apt-get --no-install-recommends --no-install-suggests -y install \
    nginx supervisor

WORKDIR /app

ADD . /app
RUN npm ci
RUN npm run build

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx-server.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisord/supervisord.conf

EXPOSE 80

CMD ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord/supervisord.conf"]
