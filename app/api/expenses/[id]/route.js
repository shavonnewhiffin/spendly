import { updateExpense, deleteExpense } from "@/lib/expenses";
import { validateExpense } from "@/lib/validate";

export async function PATCH(request, { params }){
    const { id } = await params;
    let data;
    try {
        data = await request.json();
    } catch {
        return Response.json({ error: "Invalid request body" }, { status: 400 })
    }

    const error = validateExpense(data);
    if(error){
        return Response.json({ error }, { status: 400 })
    }

    const expense = await updateExpense(id, data);
    if(!expense){
        return Response.json({ error: "Expense not found" }, { status: 404 })
    }

    return Response.json(expense)
}

export async function DELETE(request, { params }) {
const { id } = await params;
    const deleted = await deleteExpense(id);
    if(!deleted){
        return Response.json({ error: "Expense not found." }, { status: 404 })
    }

return Response.json({ success: true })
}
