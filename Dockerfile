FROM alpine:latest

MAINTAINER lyhiving <lyhiving@gmail.com> 

RUN apk --update add nginx

COPY web /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]