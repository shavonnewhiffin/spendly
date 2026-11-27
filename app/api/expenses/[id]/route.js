import { deleteExpense } from "@/lib/expenses";

export async function DELETE(request, { params }) {
const { id } = await params;
    const deleted = await deleteExpense(id);
    if(!deleted){
        return Response.json({ error: "Expense not found." }, { status: 404 })
    }

return Response.json({ success: true })
}
