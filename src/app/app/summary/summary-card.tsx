import { FC } from "react";
import { PersonLabel } from "../person";
import { formatMoney } from "@/utils/common";
import { Person } from "../type";
import { usePeopleStore } from "@hooks/usePeopleStore";

interface SummaryCardProps {
  person: Person;
  preferSimplified: boolean;
}

export const SummaryCard: FC<SummaryCardProps> = ({
  person,
  preferSimplified,
}) => {
  const { getPerson } = usePeopleStore();
  const debtsByPerson = Object.keys(
    preferSimplified ? person.simplifiedPaysTo : person.paysTo
  ).map((personId) => ({
    id: personId,
    amount: preferSimplified
      ? person.simplifiedPaysTo[personId]
      : person.paysTo[personId],
  }));
  const givesTo = debtsByPerson.filter((debt) => debt.amount > 0);
  const receivesFrom = debtsByPerson.filter((debt) => debt.amount < 0);
  const givesToTotal = givesTo.reduce((a, b) => a + b.amount, 0);
  const receivesFromTotal = receivesFrom.reduce((a, b) => a - b.amount, 0);

  return (
    <div className="card card-compact bg-base-100" key={person.id}>
      <div className="card-body">
        <div className="text-lg">
          <PersonLabel person={person} />
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div>Gives in total</div>
          <div>{givesToTotal ? formatMoney(givesToTotal) : "Nothing"}</div>
        </div>
        {givesToTotal === 0 ? null : (
          <div className="card card-compact bg-base-200">
            <div className="card-body">
              {givesTo.map((debt) => (
                <div key={debt.id} className="flex justify-between">
                  <PersonLabel
                    person={getPerson(debt.id)!}
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
          <div className="card card-compact bg-base-200">
            <div className="card-body">
              {receivesFrom.map((debt) => (
                <div key={debt.id} className="flex justify-between">
                  <PersonLabel
                    person={getPerson(debt.id)!}
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
