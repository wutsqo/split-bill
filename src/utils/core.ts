import { Debt, SplitType, Transaction } from "@/app/app/type";

export const calculatePortion = (
  trx: Transaction,
  personId: string
): number => {
  if (!trx.split[personId]) return 0;
  switch (trx.splitType) {
    case SplitType.EQUAL:
      return trx.amount / Object.values(trx.split).filter((v) => v).length;
    case SplitType.PERCENT:
      return (trx.amount * trx.split[personId]) / 100;
    case SplitType.EXACT:
      return trx.split[personId];
  }
};

export const getTotalDebtOfAPerson = (trxs: Transaction[], personId: string) =>
  trxs.reduce((acc, trx) => {
    if (trx.paidBy === personId) {
      return acc - calculatePortion(trx, personId);
    } else if (trx.split[personId]) {
      return acc + calculatePortion(trx, personId);
    }
    return acc;
  }, 0);

export const getTotalDebtOfAPersonToAnother = (
  trxs: Transaction[],
  lenderId: string,
  borrowerId: string
) =>
  trxs.reduce((acc, trx) => {
    if (lenderId === borrowerId) return acc;
    if (trx.paidBy === lenderId && trx.split[borrowerId]) {
      return acc - calculatePortion(trx, borrowerId);
    } else if (trx.paidBy === borrowerId && trx.split[lenderId]) {
      return acc + calculatePortion(trx, borrowerId);
    }
    return acc;
  }, 0);

export const generateDebtFromTransaction = (trx: Transaction) => {
  return Object.keys(trx.split).reduce((acc, personId) => {
    const lenderId = trx.paidBy;
    const borrowerId = personId;
    if (lenderId === borrowerId) return acc;
    const amount = calculatePortion(trx, personId);
    if (amount === 0) return acc;
    return [
      ...acc,
      {
        lenderId,
        borrowerId,
        amount,
        transactionId: trx.id,
      },
    ];
  }, [] as Debt[]);
};
