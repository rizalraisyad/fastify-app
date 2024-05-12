import { FastifyInstance } from "fastify";
import { paymentSendHandler, paymentWithdrawHandler } from "./payment.controller";
import { $ref } from "./payment.schema";

async function paymentRoutes(server: FastifyInstance) {
  server.post(
    "/send",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("paymentSendSchema"),
        response: {
          201: $ref("paymentSendResponseSchema"),
        },
      },
    },
    paymentSendHandler
  );

  server.post(
    "/withdraw",
    {
      schema: {
        body: $ref("paymentWithdrawSchema"),
        response: {
          201: $ref("paymentWithdrawResponseSchema"),
        },
      },
    },

    paymentWithdrawHandler
  );
}

export default paymentRoutes;
