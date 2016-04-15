FROM alpine:latest

MAINTAINER lyhiving <lyhiving@gmail.com> 

RUN apk --update add nginx

VOLUME ["/home/wwwroot", "/var/log"]

COPY web /usr/share/nginx/html
COPY __ORG__/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]