import { FastifyReply, FastifyRequest } from "fastify";
import { verifyPassword } from "../../utils/hash";
import { TransactionInput } from "./payment.schema";
import { processTransaction } from "./payment.service";

export async function paymentSendHandler(
  request: FastifyRequest<{
    Body: TransactionInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await processTransaction(body);
    
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function paymentWithdrawHandler(
  request: FastifyRequest<{
    Body: TransactionInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await processTransaction(body);
    
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}
