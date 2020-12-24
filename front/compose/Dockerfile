FROM node:14-buster

COPY ./front/compose/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

WORKDIR /app