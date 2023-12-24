import { usePeopleStore } from "./usePeopleStore";
import { useTransactionStore } from "./useTransactionStore";

export const useResetEverything = () => {
  const resetTransactions = useTransactionStore((state) => state.reset);
  const resetPeople = usePeopleStore((state) => state.resetPeople);

  return () => {
    resetPeople();
    resetTransactions();
  };
};
