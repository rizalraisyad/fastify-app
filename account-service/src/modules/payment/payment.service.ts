import { Transaction } from "@prisma/client";
import prisma from "../../utils/prisma";
import { PaymentSendInput, PaymentWithdrawInput} from "./payment.schema";
const axios = require('axios');

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
let data = JSON.stringify({
  "ammount": input.ammount,
  "base": input.baseAccount,
  "destination": input.destinationAccount
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3001/api/payment/send',
    headers: { 
      'Content-Type': 'application/json', 
    },
    data : data
  };

const res = await axios.request(config)
  .then((response: any) => {
    console.log(JSON.stringify(response.data));
    return response.data
  })
  .catch((error: any) => {
    return error
  });
  console.log(res)
return res
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

