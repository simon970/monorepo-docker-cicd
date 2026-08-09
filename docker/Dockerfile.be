FROM oven/bun:1

WORKDIR /usr/src/apps

COPY ./packages ./packages

COPY ./bun.lock ./bun.lock

COPY ./turbo.json ./turbo.json

COPY ./package.json ./package.json

COPY ./apps/backend ./apps/backend

RUN bun install

COPY . .

RUN bun install
RUN bun run db:generate

EXPOSE 8080

CMD [ "bun","run","start:backend" ]