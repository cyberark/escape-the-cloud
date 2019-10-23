FROM node:lts-alpine
WORKDIR /app
RUN npm install -g @aws-amplify/cli --unsafe-perm=true
COPY . /app
RUN yarn
EXPOSE 3000
RUN ["chmod", "+x", "/app/headless_init_env.sh"]
ENTRYPOINT ["sh", "/app/headless_init_env.sh"]