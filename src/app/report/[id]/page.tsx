import { PersonLabel } from "../../app/person";
import { TrxCard } from "../../app/bills/trx-card";
import { SummaryCard } from "../../app/summary/summary-card";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { formatMoney } from "@/utils/common";
import { SITE_URL, appName } from "../../config";
import { Person, Transaction } from "../../app/type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/supabase.types";

export default async function Page({
  params,
}: {
  readonly params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data } = await supabase
    .from("workspace")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) return <div>Not found</div>;
  const people = JSON.parse(data.people?.toString() ?? "[]") as Person[];
  const transactions = JSON.parse(
    data.transactions?.toString() ?? "[]"
  ) as Transaction[];
  return (
    <div className="bg-white min-h-screen relative">
      <div
        className="w-full h-64 p-8 text-white grid place-content-center taviraj"
        style={{
          backgroundImage: "url(/haikei.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl">Group Expense Report</h1>
        <p>by {appName}</p>
      </div>
      <div className="container mx-auto max-w-screen-md px-4 py-6 z-10 relative">
        <div className="flex items-baseline justify-between mt-6 bg-[#3d3056] text-white p-6">
          <h2 className="taviraj">People</h2>
          <div>{people.length} people</div>
        </div>
        <div className="p-4 mt-4 border text-sm rounded-2xl">
          <p>
            A negative balance means they owe money to the group, a positive
            balance means they are owed.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {people.map((person) => (
            <a href={`#summary-card-${person.id}`} key={person.id}>
              <li className="p-4 break-inside-avoid border rounded-2xl">
                <div className="flex justify-between items-center">
                  <PersonLabel person={person} />
                  <div className="text-sm">{formatMoney(person.balance)}</div>
                </div>
              </li>
            </a>
          ))}
        </ul>
        <div className="mt-8">
          <div className="mt-8 flex items-baseline justify-between break-before-page bg-[#3d3056] text-white p-6">
            <h2 className="taviraj">Transactions</h2>
            <div>
              {transactions.length} transaction
              {transactions.length > 1 ? "s" : ""}
            </div>
          </div>
          <div className="p-4 mt-4 border text-sm rounded-2xl">
            <p>
              All the transactions between people listed in reverse
              chronological order.
            </p>
          </div>
          <ul className="columns-2 gap-2 mt-4">
            {transactions
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((transaction) => (
                <li
                  key={transaction.id}
                  className="border break-inside-avoid mb-2 rounded-2xl"
                >
                  <TrxCard trx={transaction} hideActions />
                </li>
              ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8">
          <div className="flex flex-col gap-2 break-before-page pt-8">
            <div className="flex gap-3 items-center bg-[#3d3056] text-white p-6">
              <h2 className="taviraj">Settle Up</h2>
              <div className="badge badge-outline">default</div>
            </div>
            <div className="p-4 border text-sm rounded-2xl">
              <p>
                Default means each person have to pay back money only to the
                people they borrowed it from.
              </p>
            </div>
            <div className="columns-2 gap-2">
              {people.map((person) => (
                <div
                  className="border rounded-2xl break-inside-avoid w-full mb-2"
                  key={`summary-card-${person.id}`}
                >
                  <SummaryCard person={person} preferSimplified={false} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 break-before-page pt-8">
            <div className="flex gap-3 items-center bg-[#3d3056] text-white p-6">
              <h2 className="taviraj">Settle Up</h2>
              <div className="badge badge-outline gap-1">
                <CheckBadgeIcon className="w-4 h-4" />
                simplified
              </div>
            </div>
            <div className="p-4 border text-sm rounded-2xl">
              <p>
                Simplified means the debts are automatically combined to reduce
                the total number of repayments.
              </p>
            </div>
            <div className="columns-2 gap-2">
              {people.map((person) => (
                <div
                  className="border break-inside-avoid mb-2 rounded-2xl"
                  key={`summary-card-${person.id}`}
                  id={`summary-card-${person.id}`}
                >
                  <SummaryCard person={person} preferSimplified={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full h-screen p-8 text-white grid place-content-center break-before-page relative"
        style={{
          backgroundImage: "url(/back-cover.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md text-left">
          <h1 className="text-6xl taviraj">{appName}.</h1>
          <p className="text-xl mt-2 font-semibold">
            The Easiest Expense Sharing App.
          </p>
        </div>
      </div>
      <div className="print:fixed bottom-4 left-8 text-xs text-[#001220]">
        Generated using {appName}. Create your own for free at{" "}
        <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
          {SITE_URL}
        </a>
      </div>
    </div>
  );
}
