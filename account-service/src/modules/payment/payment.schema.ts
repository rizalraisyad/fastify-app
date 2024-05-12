import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const paymentSendInput = {
  ammount: z.number(),
  baseAccount: z.string(),
  destinationAccount: z.string(),
};

const paymentWithdrawInput = {
  ammount: z.number(),
  baseAccount: z.string(),
  destinationAccount: z.string(),
};

const paymentSendSchema = z.object({
  ...paymentSendInput,
});

const paymentWithdrawSchema = z.object({
  ...paymentWithdrawInput
});

const paymentSendResponseSchema = z.array(paymentSendSchema);
const paymentWithdrawResponseSchema = z.array(paymentWithdrawSchema);

export type PaymentSendInput = z.infer<typeof paymentSendSchema>;
export type PaymentWithdrawInput = z.infer<typeof paymentWithdrawSchema>;

export const { schemas: paymentSchemas, $ref } = buildJsonSchemas({
  paymentSendSchema,
  paymentWithdrawSchema,
  paymentSendResponseSchema,
  paymentWithdrawResponseSchema,
});
