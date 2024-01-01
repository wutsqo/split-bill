import { Debt, Person, SplitType, Transaction } from "@/app/app/type";

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
): Person[] => {
  const peopleWithNewBalances = [
    ...people.map((person) => getBalanceOfAPerson(person, debts)),
  ];
  const subsets = dividePeopleIntoZeroSumSubsets(peopleWithNewBalances);
  return calculateSimplifiedBalances(peopleWithNewBalances, subsets);
};

export function combinations<T>(arr: T[], k: number): T[][] {
  const result: T[][] = [];
  function combine(start: number, current: T[]) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      combine(i + 1, current);
      current.pop();
    }
  }
  combine(0, []);
  return result;
}

export const dividePeopleIntoZeroSumSubsets = (
  balances: Person[]
): Person[][] => {
  const remainingBalances = [...balances];
  const subsets: Person[][] = [];
  const findZeroSumSubset = (balances: Person[]): Person[] => {
    for (let i = 0; i < balances.length; i++)
      for (const subset of combinations(balances, i + 1))
        if (subset.reduce((acc, v) => acc + v.balance, 0) === 0) return subset;
    return [];
  };
  while (remainingBalances.length) {
    const subset = findZeroSumSubset(remainingBalances);
    subset.forEach((person) => {
      remainingBalances.splice(
        remainingBalances.findIndex((p) => p.id === person.id),
        1
      );
    });
    subsets.push(subset);
  }
  return subsets;
};

export const simplifyDebtsUsingCollector = (
  people: Person[]
): Record<Person["id"], Person["simplifiedPaysTo"]> => {
  const collector = people[0];
  const rest = [...people].slice(1);
  const simplifiedPaysTo = {} as Record<string, Person["simplifiedPaysTo"]>;
  rest.forEach((person) => {
    simplifiedPaysTo[person.id] = {
      ...simplifiedPaysTo[person.id],
      [collector.id]: person.balance * -1,
    };
    simplifiedPaysTo[collector.id] = {
      ...simplifiedPaysTo[collector.id],
      [person.id]: person.balance,
    };
  });
  return simplifiedPaysTo;
};

export const calculateSimplifiedBalances = (
  people: Person[],
  subsets: Person[][]
): Person[] => {
  const newPeople = [...people];
  subsets.forEach((subset) => {
    const simplifiedPaysTo = simplifyDebtsUsingCollector(subset);
    subset.forEach((person) => {
      newPeople.splice(
        newPeople.findIndex((p) => p.id === person.id),
        1,
        {
          ...person,
          simplifiedPaysTo: simplifiedPaysTo[person.id] ?? {},
        }
      );
    });
  });
  return newPeople;
};
