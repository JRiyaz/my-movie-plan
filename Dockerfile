FROM node:16-alpine3.18 AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./

EXPOSE 4200

RUN npm install

COPY . .

# RUN npm install -g @angular/cli@11.2.14

# CMD ["ng", "serve","--host", "0.0.0.0", "--disable-host-check"]

RUN npm run build --prod

FROM nginx:alpine3.18

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/my-movie-plan /usr/share/nginx/html

EXPOSE 4200

CMD nginx -g "daemon off;"
