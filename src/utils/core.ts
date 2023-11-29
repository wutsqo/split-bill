import { SplitType, Transaction } from "@/app/app/type";

export const calculatePortion = (trx: Transaction, personId: string) => {
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
