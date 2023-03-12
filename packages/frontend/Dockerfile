FROM node:14.21.3 AS builder

WORKDIR /usr/src/app
RUN chown node:node .
USER node

COPY --chown=node:node . .

RUN yarn install --immutable --immutable-cache
RUN yarn workspace ui-consents build
RUN mv /usr/src/app/packages/frontend/ui-consents/build /usr/src/app/build

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
