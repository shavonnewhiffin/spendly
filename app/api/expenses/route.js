import { getExpenses, createExpense } from "@/lib/expenses";

export async function GET(){
    const expenses = await getExpenses();
    return Response.json(expenses)
}

export async function POST(request){
    const data = await request.json();
    const expense = await createExpense(data);
    return Response.json(expense)
}