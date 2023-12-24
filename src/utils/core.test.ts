import { SplitType, Transaction } from "@/app/app/type";
import { calculatePortion, generateDebtFromTransaction } from "./core";

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
