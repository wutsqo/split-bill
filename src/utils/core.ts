import { Debt, Person, SplitType, Transaction } from "@/app/app/type";

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

export const getBalanceOfAPerson = (person: Person, debts: Debt[]): Person =>
  debts.reduce(
    (acc, debt) => {
      const isLender = debt.lenderId === person.id;
      const isBorrower = debt.borrowerId === person.id;
      if (isLender || isBorrower) {
        const amount = isLender ? debt.amount : -debt.amount;
        const counterPartyId = isLender ? debt.borrowerId : debt.lenderId;
        return {
          ...acc,
          balance: acc.balance + amount,
          paysTo: {
            ...acc.paysTo,
            [counterPartyId]: (acc.paysTo[counterPartyId] || 0) - amount,
          },
        };
      }
      return acc;
    },
    {
      ...person,
      balance: 0,
      paysTo: {} as Record<string, number>,
    }
  );

export const calculateNewBalances = (
  people: Person[],
  debts: Debt[]
): Person[] => people.map((person) => getBalanceOfAPerson(person, debts));

export const getTotalDebtOfAPersonToAnother = (
  debts: Debt[],
  lenderId: string,
  borrowerId: string
) =>
  debts.reduce((acc, debt) => {
    if (lenderId === borrowerId) return acc;
    if (debt.lenderId === lenderId && debt.borrowerId === borrowerId) {
      return acc - debt.amount;
    } else if (debt.lenderId === borrowerId && debt.borrowerId === lenderId) {
      return acc + debt.amount;
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
