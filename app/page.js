import { getExpenses } from "@/lib/expenses";
import { formatMoney, sum } from "@/lib/helpers";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

// Read expenses.json on every request so new expenses show up (otherwise the build caches this page)
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const expenses = await getExpenses();

  return (
    <main>
      <div className="page-header">
      <h1>Expenses</h1>
      <Link href="/expenses/new" className="button">+ Add expense</Link>
      </div>

      <section className="card">
        <div className="list-header">
          <h2>All expenses</h2>
          <p className="total">{formatMoney(sum(expenses))}</p>
        </div>
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense">
              <div className="">
                <p className="expense-title">{expense.title}</p>
                <p className="muted">
                  {expense.category} · {expense.date}
                </p>
              </div>
              <p className="expense-amount">{formatMoney(expense.amount)}</p>
              <div className="expense-actions">
                <DeleteButton id={expense.id} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
