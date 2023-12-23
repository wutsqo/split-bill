import { Debt, Person, SplitType, Transaction } from "@/app/app/type";

export const calculatePortion = (
  trx: Transaction,
  personId: string
): number => {
  if (!trx.split[personId]) return 0;
  switch (trx.splitType) {
    case SplitType.EQUAL:
      return (
        trx.amount / Object.values(trx.split).filter((v) => v.amount).length
      );
    case SplitType.PERCENT:
      return (trx.amount * trx.split[personId].amount) / 100;
    case SplitType.EXACT:
      return trx.split[personId].amount;
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

export const checkIfPersonRemovable = (
  transactions: Transaction[],
  id: string
): {
  removable: boolean;
  reason: string;
  transactions: Transaction[];
} => {
  const transactionsInvolvingThePerson = transactions.filter((trx) => {
    return Object.keys(trx.split).includes(id) || trx.paidBy.id === id;
  });
  if (transactionsInvolvingThePerson.length === 0) {
    return {
      removable: true,
      reason: "No transaction involving this person",
      transactions: [],
    };
  }
  return {
    removable: false,
    reason: "This person is involved in some transactions",
    transactions: transactionsInvolvingThePerson,
  };
};

export const calculateNewBalances = (
  people: Person[],
  debts: Debt[]
): Person[] => people.map((person) => getBalanceOfAPerson(person, debts));

export const generateDebtFromTransaction = (trx: Transaction) => {
  return Object.keys(trx.split).reduce((acc, personId) => {
    const lenderId = trx.paidBy.id;
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
