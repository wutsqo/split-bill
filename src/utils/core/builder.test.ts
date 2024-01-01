import { SplitType } from "@/app/app/type";
import {
  PERSON_1,
  PERSON_2,
  SPLIT_EQUAL_TRANSACTION,
  SPLIT_EXACT_TRANSACTION,
  SPLIT_PERCENT_TRANSACTION,
} from "./constant";
import { debtsBuilder, personWithBalanceBuilder } from "./builder";

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
    expect(SPLIT_EQUAL_TRANSACTION.split["1"].fraction).toBe(1);
    expect(SPLIT_EQUAL_TRANSACTION.split["2"].fraction).toBe(1);
    expect(SPLIT_PERCENT_TRANSACTION.split["1"].fraction).toBe(50);
    expect(SPLIT_PERCENT_TRANSACTION.split["2"].fraction).toBe(50);
    expect(SPLIT_EXACT_TRANSACTION.split["1"].fraction).toBe(69);
    expect(SPLIT_EXACT_TRANSACTION.split["2"].fraction).toBe(30);
  });

  it("return amount correctly", () => {
    expect(SPLIT_EQUAL_TRANSACTION.amount).toBe(98);
    expect(SPLIT_PERCENT_TRANSACTION.amount).toBe(100);
    expect(SPLIT_EXACT_TRANSACTION.amount).toBe(99);
  });
  it("return amount correctly", () => {
    expect(SPLIT_EQUAL_TRANSACTION.split["1"].amount).toBe(49);
    expect(SPLIT_EQUAL_TRANSACTION.split["2"].amount).toBe(49);
    expect(SPLIT_PERCENT_TRANSACTION.split["1"].amount).toBe(50);
    expect(SPLIT_PERCENT_TRANSACTION.split["2"].amount).toBe(50);
    expect(SPLIT_EXACT_TRANSACTION.split["1"].amount).toBe(69);
    expect(SPLIT_EXACT_TRANSACTION.split["2"].amount).toBe(30);
  });
});

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

describe("personWithBalanceBuilder", () => {
  it("return correctly", () => {
    expect(personWithBalanceBuilder(49)).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      balance: 49,
      paysTo: {},
      simplifiedPaysTo: {},
    });
  });
});
