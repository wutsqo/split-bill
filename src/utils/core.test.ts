import { Debt, Person, SplitType, Transaction } from "@/app/app/type";
import {
  calculatePortion,
  generateDebtFromTransaction,
  getBalanceOfAPerson,
} from "./core";

const trxBuilder = ({
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

const SPLIT_EQUAL_TRANSACTION = trxBuilder({
  amount: 98,
  splitType: SplitType.EQUAL,
  payerId: "1",
  splits: [
    { id: "1", amount: 1 },
    { id: "2", amount: 1 },
  ],
});

const SPLIT_PERCENT_TRANSACTION = trxBuilder({
  amount: 100,
  splitType: SplitType.PERCENT,
  payerId: "1",
  splits: [
    { id: "1", amount: 50 },
    { id: "2", amount: 50 },
  ],
});

const SPLIT_EXACT_TRANSACTION = trxBuilder({
  amount: 99,
  splitType: SplitType.EXACT,
  payerId: "1",
  splits: [
    { id: "1", amount: 69 },
    { id: "2", amount: 30 },
  ],
});

describe("trxBuilder", () => {
  it("return split type correctly", () => {
    expect(SPLIT_EQUAL_TRANSACTION.splitType).toBe(SplitType.EQUAL);
    expect(SPLIT_PERCENT_TRANSACTION.splitType).toBe(SplitType.PERCENT);
    expect(SPLIT_EXACT_TRANSACTION.splitType).toBe(SplitType.EXACT);
  });

  it("return payer correctly", () => {
    expect(SPLIT_EQUAL_TRANSACTION.paidBy.id).toBe("1");
    expect(SPLIT_PERCENT_TRANSACTION.paidBy.id).toBe("1");
    expect(SPLIT_EXACT_TRANSACTION.paidBy.id).toBe("1");
  });

  it("return splits correctly", () => {
    expect(SPLIT_EQUAL_TRANSACTION.split["1"].amount).toBe(1);
    expect(SPLIT_EQUAL_TRANSACTION.split["2"].amount).toBe(1);
    expect(SPLIT_PERCENT_TRANSACTION.split["1"].amount).toBe(50);
    expect(SPLIT_PERCENT_TRANSACTION.split["2"].amount).toBe(50);
    expect(SPLIT_EXACT_TRANSACTION.split["1"].amount).toBe(69);
    expect(SPLIT_EXACT_TRANSACTION.split["2"].amount).toBe(30);
  });

  it("return amount correctly", () => {
    expect(SPLIT_EQUAL_TRANSACTION.amount).toBe(98);
    expect(SPLIT_PERCENT_TRANSACTION.amount).toBe(100);
    expect(SPLIT_EXACT_TRANSACTION.amount).toBe(99);
  });
});

describe("calculatePortion", () => {
  it.each([
    [
      "return correctly for payer at equal split",
      49,
      SPLIT_EQUAL_TRANSACTION,
      "1",
    ],
    [
      "return correctly for non-payer participant at equal split",
      49,
      SPLIT_EQUAL_TRANSACTION,
      "2",
    ],
    [
      "return correctly for non-participant at equal split",
      0,
      SPLIT_EQUAL_TRANSACTION,
      "3",
    ],
    [
      "return correctly for payer at percent split",
      50,
      SPLIT_PERCENT_TRANSACTION,
      "1",
    ],
    [
      "return correctly for non-payer participant at percent split",
      50,
      SPLIT_PERCENT_TRANSACTION,
      "2",
    ],
    [
      "return correctly for non-participant at percent split",
      0,
      SPLIT_PERCENT_TRANSACTION,
      "3",
    ],
    [
      "return correctly for payer at exact split",
      69,
      SPLIT_EXACT_TRANSACTION,
      "1",
    ],
    [
      "return correctly for non-payer participant at exact split",
      30,
      SPLIT_EXACT_TRANSACTION,
      "2",
    ],
    [
      "return correctly for non-participant at exact split",
      0,
      SPLIT_EXACT_TRANSACTION,
      "3",
    ],
  ])("%s", (_, expected, ...args) => {
    expect(calculatePortion(...args)).toBe(expected);
  });
});

describe("generateDebtFromTransaction", () => {
  it.each([
    [
      "return correctly for equal split",
      [
        {
          lenderId: "1",
          borrowerId: "2",
          amount: 49,
          transactionId: "1",
        },
      ],
      SPLIT_EQUAL_TRANSACTION,
    ],
    [
      "return correctly for percent split",
      [
        {
          lenderId: "1",
          borrowerId: "2",
          amount: 50,
          transactionId: "1",
        },
      ],
      SPLIT_PERCENT_TRANSACTION,
    ],
    [
      "return correctly for exact split",
      [
        {
          lenderId: "1",
          borrowerId: "2",
          amount: 30,
          transactionId: "1",
        },
      ],
      SPLIT_EXACT_TRANSACTION,
    ],
  ])("%s", (_, expected, ...args) => {
    expect(generateDebtFromTransaction(...args)).toEqual(expected);
  });
});

const personBuilder = ({ id, name }: { id: string; name: string }): Person => ({
  id,
  name,
  balance: 0,
  paysTo: {},
});

const PERSON_1 = personBuilder({ id: "1", name: "name_1" });
const PERSON_2 = personBuilder({ id: "2", name: "name_2" });

describe("personBuilder", () => {
  it("return id correctly", () => {
    expect(PERSON_1.id).toBe("1");
    expect(PERSON_2.id).toBe("2");
  });

  it("return name correctly", () => {
    expect(PERSON_1.name).toBe("name_1");
    expect(PERSON_2.name).toBe("name_2");
  });

  it("return balance correctly", () => {
    expect(PERSON_1.balance).toBe(0);
    expect(PERSON_2.balance).toBe(0);
  });

  it("return paysTo correctly", () => {
    expect(PERSON_1.paysTo).toEqual({});
    expect(PERSON_2.paysTo).toEqual({});
  });
});

const debtsBuilder = ({
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

describe("debtsBuilder", () => {
  it("return correctly", () => {
    expect(
      debtsBuilder({
        lenderIds: ["1", "2"],
        borrowerIds: ["2", "1"],
        amounts: [49, 49],
        transactionIds: ["1", "2"],
      })
    ).toEqual([
      {
        lenderId: "1",
        borrowerId: "2",
        amount: 49,
        transactionId: "1",
      },
      {
        lenderId: "2",
        borrowerId: "1",
        amount: 49,
        transactionId: "2",
      },
    ]);
  });
});

describe("getBalanceOfAPerson", () => {
  it.each([
    [
      "return correctly for person with no debt",
      {
        ...PERSON_1,
        balance: 0,
        paysTo: {} as Record<string, number>,
      },
      PERSON_1,
      [] as Debt[],
    ],
    [
      "return correctly for lender from single transaction",
      {
        ...PERSON_1,
        balance: 49,
        paysTo: {
          "2": -49,
        },
      },
      PERSON_1,
      debtsBuilder({
        lenderIds: ["1"],
        borrowerIds: ["2"],
        amounts: [49],
        transactionIds: ["1"],
      }),
    ],
    [
      "return correctly for borrower from single transaction",
      {
        ...PERSON_2,
        balance: -49,
        paysTo: {
          "1": 49,
        },
      },
      PERSON_2,
      debtsBuilder({
        lenderIds: ["1"],
        borrowerIds: ["2"],
        amounts: [49],
        transactionIds: ["1"],
      }),
    ],
    [
      "return correctly for lender from two transactions same borrower",
      {
        ...PERSON_1,
        balance: 99,
        paysTo: {
          "2": -99,
        },
      },
      PERSON_1,
      debtsBuilder({
        lenderIds: ["1", "1"],
        borrowerIds: ["2", "2"],
        amounts: [49, 50],
        transactionIds: ["1", "2"],
      }),
    ],
    [
      "return correctly for lender from two transactions different borrower",
      {
        ...PERSON_1,
        balance: 79,
        paysTo: {
          "2": -49,
          "3": -30,
        },
      },
      PERSON_1,
      debtsBuilder({
        lenderIds: ["1", "1"],
        borrowerIds: ["2", "3"],
        amounts: [49, 30],
        transactionIds: ["1", "2"],
      }),
    ],
    [
      "return correctly for borrower from two transactions same lender",
      {
        ...PERSON_2,
        balance: -99,
        paysTo: {
          "1": 99,
        },
      },
      PERSON_2,
      debtsBuilder({
        lenderIds: ["1", "1"],
        borrowerIds: ["2", "2"],
        amounts: [49, 50],
        transactionIds: ["1", "2"],
      }),
    ],
    [
      "return correctly for borrower from two transactions different lender",
      {
        ...PERSON_2,
        balance: -79,
        paysTo: {
          "1": 49,
          "3": 30,
        },
      },
      PERSON_2,
      debtsBuilder({
        lenderIds: ["1", "3"],
        borrowerIds: ["2", "2"],
        amounts: [49, 30],
        transactionIds: ["1", "2"],
      }),
    ],
    [
      "return correctly for lender and borrower from two transactions same lender and borrower",
      {
        ...PERSON_1,
        balance: 0,
        paysTo: {
          "2": 0,
        },
      },
      PERSON_1,
      debtsBuilder({
        lenderIds: ["1", "2"],
        borrowerIds: ["2", "1"],
        amounts: [49, 49],
        transactionIds: ["1", "2"],
      }),
    ],
    [
      "return correctly for lender and borrower from two transactions different lender and borrower",
      {
        ...PERSON_1,
        balance: 49 - 30,
        paysTo: {
          "2": -49,
          "3": 30,
        },
      },
      PERSON_1,
      debtsBuilder({
        lenderIds: ["1", "3"],
        borrowerIds: ["2", "1"],
        amounts: [49, 30],
        transactionIds: ["1", "2"],
      }),
    ],
    [
      "return correctly for lender and borrower from multiple transactions",
      {
        ...PERSON_1,
        balance: 10 - 15 + 20 - 5 - 10 + 5,
        paysTo: {
          "2": -10 + 15 + 10 - 5,
          "3": -20 + 5,
        },
      },
      PERSON_1,
      debtsBuilder({
        lenderIds: ["1", "2", "1", "3", "2", "1"],
        borrowerIds: ["2", "1", "3", "1", "1", "2"],
        amounts: [10, 15, 20, 5, 10, 5],
        transactionIds: ["1", "2", "3", "4", "5", "6"],
      }),
    ],
  ])("%s", (_, expected, ...args) => {
    expect(getBalanceOfAPerson(...args)).toEqual(expected);
  });
});
