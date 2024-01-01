import {
  Debt,
  Person,
  SplitData,
  SplitType,
  Transaction,
} from "@/app/app/type";
import { v4 as uuidv4 } from "uuid";
import TransactionService from "./transaction";

export const trxBuilder = ({
  amount,
  splitType,
  payerId,
  splits,
}: {
  amount: number;
  splitType: SplitType;
  payerId: string;
  splits: Pick<SplitData, "id" | "fraction">[];
}): Transaction => {
  const split: Record<string, Omit<SplitData, "amount">> = splits.reduce(
    (acc, { id, fraction }) => ({
      ...acc,
      [id]: {
        id,
        name: "name",
        fraction,
      },
    }),
    {} as Record<string, Omit<SplitData, "amount">>
  );
  return {
    id: "1",
    name: "name",
    date: new Date(),
    amount: amount,
    paidBy: {
      id: payerId,
      name: "name",
    },
    splitType,
    split: TransactionService.calculateSplitAmount(amount, split, splitType),
  };
};

export const personBuilder = ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Person => ({
  id,
  name,
  balance: 0,
  paysTo: {},
  simplifiedPaysTo: {},
});

export const personWithBalanceBuilder = (balance: number): Person => ({
  balance,
  id: uuidv4(),
  name: "name",
  paysTo: {},
  simplifiedPaysTo: {},
});

export const debtsBuilder = ({
  lenderIds,
  borrowerIds,
  amounts,
  transactionIds,
}: {
  lenderIds: string[];
  borrowerIds: string[];
  amounts: number[];
  transactionIds: string[];
}): Debt[] => {
  return lenderIds.reduce((acc, lenderId, index) => {
    const borrowerId = borrowerIds[index];
    const amount = amounts[index];
    const transactionId = transactionIds[index];
    return [
      ...acc,
      {
        lenderId,
        borrowerId,
        amount,
        transactionId,
      },
    ];
  }, [] as Debt[]);
};
