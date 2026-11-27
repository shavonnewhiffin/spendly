import "server-only";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const expensesFile = path.join(process.cwd(), "data", "expenses.json")

export async function getExpenses() {
    await new Promise ((resolve) => setTimeout(resolve, 2000));
    // TEMP fake slow
    const text = await readFile(expensesFile, "utf-8");
    const expenses = JSON.parse(text);
    return expenses.sort((a, b) => b.date.localeCompare(a.date));
}

export async function saveExpenses(expenses){
    await writeFile(expensesFile, JSON.stringify(expenses, null, 2));
}

export async function createExpense({ title, amount, category, date }){
    const expenses = await getExpenses();
    const expense = { id: crypto.randomUUID(), title: title.trim(), amount: Number(amount), category, date};
    await saveExpenses([...expenses, expense]);
    return expense;
}

export async function deleteExpense(id){
    const expenses = await getExpenses();
    const remaining = expenses.filter((expense) => expense.id !== id)
    if(remaining.length === expenses.length) return false;

    await saveExpenses(remaining);
    return true;
}