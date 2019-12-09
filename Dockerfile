FROM node:alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache
COPY . .
RUN yarn build

FROM alpine:edge

COPY --from=build /usr/src/app/build /pub

ADD nginx-boot.sh /sbin/nginx-boot

RUN chmod +x /sbin/nginx-boot && \
    apk --update add nginx bash && \
    rm -fR /var/cache/apk/*

CMD [ "/sbin/nginx-boot" ]
EXPOSE 80
