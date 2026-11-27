"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DeleteButton({ id }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        if (!confirm("Delete this expense?")) return;

        setDeleting(true);
        try {
            const response = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                alert(data.error ?? "Couldn't delete this expense. Please try again.");
                return;
            }
            router.refresh();
        } catch {
            alert("Couldn't reach the server. Please try again.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <button onClick={handleDelete} className="link-button danger" disabled={deleting}>
            {deleting ? "Deleting…" : "Delete"}
        </button>
    )
}
