import { SplitType } from "@/app/app/type";
import { personBuilder, trxBuilder } from "./builder";

export const SPLIT_EQUAL_TRANSACTION = trxBuilder({
  amount: 98,
  splitType: SplitType.EQUAL,
  payerId: "1",
  splits: [
    { id: "1", fraction: 1 },
    { id: "2", fraction: 1 },
  ],
});

export const SPLIT_PERCENT_TRANSACTION = trxBuilder({
  amount: 100,
  splitType: SplitType.PERCENT,
  payerId: "1",
  splits: [
    { id: "1", fraction: 50 },
    { id: "2", fraction: 50 },
  ],
});

export const SPLIT_EXACT_TRANSACTION = trxBuilder({
  amount: 99,
  splitType: SplitType.EXACT,
  payerId: "1",
  splits: [
    { id: "1", fraction: 69 },
    { id: "2", fraction: 30 },
  ],
});

export const PERSON_1 = personBuilder({ id: "1", name: "name_1" });
export const PERSON_2 = personBuilder({ id: "2", name: "name_2" });
export const PERSON_3 = personBuilder({ id: "3", name: "name_3" });
