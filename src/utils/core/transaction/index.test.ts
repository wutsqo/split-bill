import { Debt, SplitData, SplitType, Transaction } from "@/app/app/type";
import TransactionService from ".";
import { trxBuilder } from "../builder";

describe("TransactionService", () => {
  describe("calculateSplitAmount", () => {
    it.each([
      [
        "Return correctly when splitType is EQUAL",
        {
          "1": 33,
          "2": 33,
          "3": 33,
        },
        99,
        SplitType.EQUAL,

        {
          "1": { fraction: 1 },
          "2": { fraction: 1 },
          "3": { fraction: 1 },
        },
      ],
      [
        "Return correctly when splitType is PERCENT",
        {
          "1": 50,
          "2": 50,
        },
        100,
        SplitType.PERCENT,

        {
          "1": { fraction: 50 },
          "2": { fraction: 50 },
        },
      ],
      [
        "Return correctly when splitType is EXACT",
        {
          "1": 69,
          "2": 30,
        },
        99,
        SplitType.EXACT,

        {
          "1": { fraction: 69 },
          "2": { fraction: 30 },
        },
      ],
    ])(
      `%s`,
      (
        _,
        expectedSplitAmounts: Record<string, number>,
        amount: Transaction["amount"],
        splitType: Transaction["splitType"],
        fractions: Record<string, Pick<SplitData, "fraction">>
      ) => {
        const split = Object.keys(fractions).reduce(
          (acc, id) => ({
            ...acc,
            [id]: {
              id,
              name: "name",
              amount: 0,
              fraction: fractions[id].fraction,
            },
          }),
          {} as Record<string, SplitData>
        );
        const calculatedSplitAmounts = TransactionService.calculateSplitAmount(
          amount,
          split,
          splitType
        );
        Object.keys(expectedSplitAmounts).forEach((id) => {
          expect(calculatedSplitAmounts[id].amount).toBe(
            expectedSplitAmounts[id] as number
          );
        });
      }
    );
  });

  describe("generateDebtsFromTransactions", () => {
    it.each([
      [
        "return correctly",
        [
          {
            lenderId: "1",
            borrowerId: "2",
            amount: 49,
            transactionId: "1",
          },
        ],
        [
          trxBuilder({
            amount: 98,
            payerId: "1",
            splitType: SplitType.EQUAL,
            splits: [
              { id: "1", fraction: 1 },
              { id: "2", fraction: 1 },
            ],
          }),
          trxBuilder({
            amount: 49,
            payerId: "1",
            splitType: SplitType.EXACT,
            splits: [{ id: "1", fraction: 0 }],
          }),
        ],
      ],
    ])(`%s`, (_, expectedDebts: Debt[], transactions: Transaction[]) => {
      const debts =
        TransactionService.generateDebtsFromTransactions(transactions);
      expect(debts).toEqual(expectedDebts);
    });
  });
});
