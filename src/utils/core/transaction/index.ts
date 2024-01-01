import {
  Debt,
  Person,
  SplitData,
  SplitType,
  Transaction,
} from "@/app/app/type";

export default class TransactionService {
  private static getSplitAmountValue(
    amount: Transaction["amount"],
    splitType: Transaction["splitType"],
    split: Record<string, Omit<SplitData, "amount">>,
    id: Person["id"]
  ): SplitData["amount"] {
    switch (splitType) {
      case SplitType.EQUAL:
        return amount / Object.values(split).filter((v) => v.fraction).length;
      case SplitType.PERCENT:
        return (amount * split[id].fraction) / 100;
      case SplitType.EXACT:
        return split[id].fraction;
    }
  }

  public static calculateSplitAmount(
    amount: Transaction["amount"],
    split: Record<string, Omit<SplitData, "amount">>,
    splitType: Transaction["splitType"]
  ) {
    return Object.keys(split).reduce(
      (acc, id) => ({
        ...acc,
        [id]: {
          ...split[id],
          amount: this.getSplitAmountValue(amount, splitType, split, id),
        },
      }),
      {} as Record<string, SplitData>
    );
  }

  private static generateDebtFromTransaction(trx: Transaction): Debt[] {
    return Object.keys(trx.split).reduce((acc, personId) => {
      const lenderId = trx.paidBy.id;
      const borrowerId = personId;
      if (lenderId === borrowerId) return acc;
      return [
        ...acc,
        {
          lenderId,
          borrowerId,
          amount: trx.split[personId].amount,
          transactionId: trx.id,
        },
      ];
    }, [] as Debt[]);
  }

  public static generateDebtsFromTransactions(trxs: Transaction[]): Debt[] {
    const debts: Debt[] = [];
    trxs.forEach((trx) => {
      debts.push(...this.generateDebtFromTransaction(trx));
    });
    return debts;
  }
}
