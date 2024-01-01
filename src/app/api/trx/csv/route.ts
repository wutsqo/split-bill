import { Person, Transaction } from "@/app/app/type";

export async function POST(request: Request) {
  const res = await request.json();
  const people: Person[] = res.people;
  const transactions: Transaction[] = res.transactions;

  const csvHeaders = ["Date", "Name", "Currency", "Amount"];
  people.forEach((person) => {
    csvHeaders.push(person.name);
  });

  const csvRows = transactions.map((transaction) => [
    new Date(transaction.date).toISOString().split("T")[0],
    transaction.name,
    "IDR",
    transaction.amount,
    ...people.map((person) =>
      transaction.paidBy.id === person.id
        ? transaction.amount - transaction.split[person.id].amount
        : transaction.split[person.id].amount * -1
    ),
  ]);

  const csvFooters = [
    "",
    "Total Balance",
    "IDR",
    "",
    ...people.map((person) => person.balance),
  ];

  const csv = `${csvHeaders.join(";")}\n\n${csvRows
    .map((row) => row.join(";"))
    .join("\n")}\n\n${csvFooters.join(";")}`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=export.csv",
    },
  });
}
