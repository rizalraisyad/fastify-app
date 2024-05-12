import { FastifyRequest } from "fastify";
import { PaymentSendInput, PaymentWithdrawInput } from "./payment.schema";
import { paymentSend, paymentWithdraw } from "./payment.service";

export async function paymentSendHandler(
  request: FastifyRequest<{
    Body: PaymentSendInput;
  }>
) {
  const product = await paymentSend({
    ...request.body,
  });

  return product;
}

export async function paymentWithdrawHandler(
  request: FastifyRequest<{
    Body: PaymentWithdrawInput;
  }>
) {
  const product = await paymentWithdraw({
    ...request.body,
  });

  return product;
}
