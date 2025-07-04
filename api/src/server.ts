import fastify from "fastify";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();
const server = fastify({
  logger: true,
});

server.get("/ping", async (request, reply) => {
  return reply.send({
    message: "pong",
    status: 200,
  });
});

server.get("/", async (request, reply) => {
  return reply.send({
    message: "Api for brainloop",
    status: 200,
  });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
