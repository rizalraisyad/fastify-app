import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { JWT } from "fastify-jwt";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";
import { version } from "../package.json";
import paymentRoutes from "./modules/payment/payment.route";
import { transactionSchemas } from "./modules/payment/payment.schema";

declare module "fastify" {}

function buildServer() {
  const server = Fastify();

  server.register(fjwt, {
    secret: "dcsdvsvsadcdassfnfiu84r2340r35jgas",
  });

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  for (const schema of [...transactionSchemas]) {
    server.addSchema(schema);
  }

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "API for some Payment",
          version,
        },
      },
    })
  );

  server.register(paymentRoutes, { prefix: "api/payment" });

  return server;
}

export default buildServer;
