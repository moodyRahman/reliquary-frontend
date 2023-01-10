FROM node:18-alpine as build

# setting the workdir kinda mkdir and cd's us into that folder
WORKDIR /app

COPY package* ./

RUN yarn install

COPY . .

RUN yarn build



FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
