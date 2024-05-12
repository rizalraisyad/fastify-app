import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const transactionCore = {
  base: z.string(),
  destination: z.string(),
  ammount: z.number(),
};

const transactionCreatedSchema = z.object({
  ...transactionCore,
});

const transactionResponseSchema = z.object({
  ...transactionCore,
});

export type TransactionInput = z.infer<typeof transactionCreatedSchema>;

export type TransactionResponse = z.infer<typeof transactionResponseSchema>;

export const { schemas: transactionSchemas, $ref } = buildJsonSchemas({
  transactionCreatedSchema,
  transactionResponseSchema
});
