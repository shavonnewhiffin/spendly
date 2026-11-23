export function formatMoney(amount){
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function sum(expenses){
    return expenses.reduce((total, expense) => total + Number(expense.amount), 0)
}