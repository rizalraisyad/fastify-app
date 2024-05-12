import { FastifyInstance } from "fastify";
import { paymentSendHandler, paymentWithdrawHandler } from "./payment.controller";
import { $ref } from "./payment.schema";

async function paymentRoutes(server: FastifyInstance) {
  server.post(
    "/send",
    {
      schema: {
        body: $ref("transactionCreatedSchema"),
        response: {
          201: $ref("transactionResponseSchema"),
        },
      },
    },
    paymentSendHandler
  );

  server.post(
    "/withdraw",
    {
      schema: {
        body: $ref("transactionCreatedSchema"),
        response: {
          201: $ref("transactionResponseSchema"),
        },
      },
    },
    paymentWithdrawHandler
  );
}

export default paymentRoutes;
