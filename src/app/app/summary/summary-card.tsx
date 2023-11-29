import { FC } from "react";
import { useAppContext } from "../context";
import { DELETED_USER } from "../constant";
import { PersonLabel } from "../person";
import {
  getTotalDebtOfAPerson,
  getTotalDebtOfAPersonToAnother,
} from "@/utils/core";
import { formatMoney } from "@/utils/common";

interface SummaryCardProps {
  personId: string;
}

export const SummaryCard: FC<SummaryCardProps> = ({ personId }) => {
  const { people, transactions, simplifyDebts } = useAppContext();

  const person =
    people.find((person) => person.id === personId) ?? DELETED_USER;

  const totalDebt = getTotalDebtOfAPerson(transactions, personId);
  const totalOwedTo = totalDebt > 0 ? totalDebt : 0;

  const debtSeparatedByPerson = people.reduce((acc, personTheyOwed) => {
    const amount = getTotalDebtOfAPersonToAnother(
      transactions,
      personId,
      personTheyOwed.id
    );

    return [...acc, { name: personTheyOwed.name, amount }];
  }, [] as { name: string; amount: number }[]);

  const owesTo = debtSeparatedByPerson.filter((person) => person.amount > 0);

  return (
    <div className="card card-compact bg-base-200" key={person.id}>
      <div className="card-body">
        <div className="text-lg">
          <PersonLabel name={person.name} />
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div>Owes in total</div>
          <div>{totalOwedTo ? formatMoney(totalOwedTo) : "Nothing"}</div>
        </div>
        {owesTo.length === 0 ? null : (
          <div className="card card-compact bg-base-100">
            <div className="card-body">
              {owesTo.map((person) => (
                <div key={person.name} className="flex justify-between">
                  <PersonLabel name={person.name} prefix="To" size="sm" />
                  <div>{formatMoney(person.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
