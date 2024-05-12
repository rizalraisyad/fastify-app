import { Transaction } from "@prisma/client";
import prisma from "../../utils/prisma";
import { PaymentSendInput, PaymentWithdrawInput} from "./payment.schema";

async function createTransaction(input:PaymentSendInput) {
  return await prisma.transaction.create({
    data: {
      amount: input.ammount,
      baseAccount: input.baseAccount,
      destionationAccount: input.destinationAccount,
      status: "PENDING"
    }
  });
}

async function createPaymentTransaction(input:PaymentSendInput) {
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'http://localhost:3001/api/payment/send',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ammount": input.ammount,
      "base": input.baseAccount,
      "destination": input.destinationAccount
    })

  };
  const res = await request(options, function (error: any, response: any) {
    if (error) return error;
    return response.body;
  });
  
  return res;
}

async function updateTransaction(input:Transaction, status: boolean) {
  let statusPayment = "failed"

  if (status === true) {
    statusPayment = "SUCCESS"
  } 
  return await prisma.transaction.update({
    data: {
      status: "SUCCESS"
    }, where: {
      id: input.id
    }
  });
}

export async function paymentWithdraw(
  data: PaymentSendInput
) {
  const transaction = await createTransaction(data)
  try {
    await createPaymentTransaction(data)
    const res = await updateTransaction(transaction, true)
    return res;
  } catch (e) {
    const res = await updateTransaction(transaction, false)
    return res;
  }
  
}

export async function paymentSend(data: PaymentWithdrawInput) {
  const transaction = await createTransaction(data)
  try {
    await createPaymentTransaction(data)
    const res = await updateTransaction(transaction, true)
    return res;
  } catch (e) {
    const res = await updateTransaction(transaction, false)
    return res;
  }
}

