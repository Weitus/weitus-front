FROM node:14
WORKDIR /frontend

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./
RUN pnpm fetch

ADD . ./

RUN pnpm install -r --offline
RUN pnpm run build

EXPOSE 5173
CMD ["pnpm", "run", "preview"]