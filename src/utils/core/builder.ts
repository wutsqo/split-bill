import { Debt, Person, SplitType, Transaction } from "@/app/app/type";

export const trxBuilder = ({
  amount,
  splitType,
  payerId,
  splits,
}: {
  amount: number;
  splitType: SplitType;
  payerId: string;
  splits: { id: string; amount: number }[];
}): Transaction => ({
  id: "1",
  name: "name",
  date: new Date(),
  amount: amount,
  paidBy: {
    id: payerId,
    name: "name",
  },
  splitType,
  split: splits.reduce(
    (acc, { id, amount }) => ({
      ...acc,
      [id]: {
        id,
        name: "name",
        amount,
      },
    }),
    {} as Record<string, { id: string; name: string; amount: number }>
  ),
});

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
