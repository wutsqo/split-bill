import { FC } from "react";
import { PersonLabel } from "../person";
import { formatMoney } from "@/utils/common";
import { usePeopleStore } from "@hooks/usePeopleStore";

interface SummaryCardProps {
  personId: string;
}

export const SummaryCard: FC<SummaryCardProps> = ({ personId }) => {
  const { peopleMap } = usePeopleStore();

  const person = peopleMap[personId];
  const debtsByPerson = Object.keys(person.paysTo).map((personId) => ({
    id: personId,
    amount: person.paysTo[personId],
  }));
  const givesTo = debtsByPerson.filter((debt) => debt.amount > 0);
  const receivesFrom = debtsByPerson.filter((debt) => debt.amount < 0);
  const givesToTotal = givesTo.reduce((a, b) => a + b.amount, 0);
  const receivesFromTotal = receivesFrom.reduce((a, b) => a - b.amount, 0);

  return (
    <div className="card card-compact bg-base-200" key={person.id}>
      <div className="card-body">
        <div className="text-lg">
          <PersonLabel person={person} />
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div>Gives in total</div>
          <div>{givesToTotal ? formatMoney(givesToTotal) : "Nothing"}</div>
        </div>
        {givesToTotal === 0 ? null : (
          <div className="card card-compact bg-base-100">
            <div className="card-body">
              {givesTo.map((debt) => (
                <div key={debt.id} className="flex justify-between">
                  <PersonLabel
                    person={peopleMap[debt.id]}
                    prefix="To"
                    size="sm"
                  />
                  <div>{formatMoney(debt.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-2 items-center">
          <div>Receives in total</div>
          <div>
            {receivesFromTotal ? formatMoney(receivesFromTotal) : "Nothing"}
          </div>
        </div>
        {receivesFromTotal === 0 ? null : (
          <div className="card card-compact bg-base-100">
            <div className="card-body">
              {receivesFrom.map((debt) => (
                <div key={debt.id} className="flex justify-between">
                  <PersonLabel
                    person={peopleMap[debt.id]}
                    prefix="From"
                    size="sm"
                  />
                  <div>{formatMoney(-debt.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
