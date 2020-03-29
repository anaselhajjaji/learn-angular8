# Stage 1, "build-stage", based on Node.js, to build and compile the Angular Application
FROM node:12.7-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.1-alpine
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

# Copy the template of nginx.conf then replace the PORT using environment variable
COPY --from=build-stage /app/nginx.conf.template /etc/nginx/conf.d/default.conf.template
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'