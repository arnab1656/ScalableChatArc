# Scalable Chat Application

## Overview

This project is a scalable chat application built using Node.js, Socket.IO, Redis, Kafka and Postgres . The architecture is designed to handle high loads by scaling horizontally, ensuring that messages are efficiently distributed among clients while maintaining a responsive and real-time communication experience.

## Features

- Real-time messaging using WebSockets (Socket.IO)
- Horizontal scalability with Redis for pub/sub messaging
- Kafka integration for reliable message delivery
- Structured and maintainable code following DRY and Orthogonal principles

## 🏗️ Development & Contribution

This is for you if you want to contribute to the Scalable_chat project or run it locally.

Please read the [contribution guidelines](CONTRIBUTING.md) before contributing.

### Requirements

- Node
- yarn
- Docker

### Setup

As per Example .env.example file Look for the setup and create it `.env` or `.env.developement` in root, but you can choose to create your own `.env.local` files instead.

In a terminal, start the dependencies (Postgres, Kafka ,Zookeeper and Redis) as Docker containers:

```sh
docker compose -f docker-compose.yaml up
```

Then:

Go to the Server workspace of the apps

RUN:

# Push the most recent Prisma schema to the database

```sh
npx run prisma db push
```

### Database migrations

If you make changes to the Prisma schema, you need to run the following command to create a migration:

```sh
pnpm run prisma migrate dev
```

You can also open Prisma Studio to see the database interface and edit data directly:

```sh
pnpm run prisma studio
```

```sh
yarn install

# Run build to build everything once
yarn build


# Start the dev server
yarn run dev
```

You can now open the ChatApp at [http://localhost:4040](http://localhost:4040), API on port 8080.
