import { Debt } from "@/app/app/type";
import {
  calculatePortion,
  generateDebtFromTransaction,
  getBalanceOfAPerson,
} from ".";
import { debtsBuilder } from "./builder";
import {
  PERSON_1,
  PERSON_2,
  SPLIT_EQUAL_TRANSACTION,
  SPLIT_EXACT_TRANSACTION,
  SPLIT_PERCENT_TRANSACTION,
} from "./constant";

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

describe("getBalanceOfAPerson", () => {
  it.each([
    [
      "return correctly for person with no debt",
      {
        ...PERSON_1,
        balance: 0,
        paysTo: {},
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
  ])("%s", (_, expected, person, debts) => {
    expect(getBalanceOfAPerson(person, debts)).toEqual(expected);
  });
});
