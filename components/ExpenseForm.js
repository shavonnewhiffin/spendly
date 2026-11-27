"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CATEGORIES } from "../lib/categories"

export default function ExpenseForm({ expense }) {
    const router = useRouter();
    const isEditing = Boolean(expense)

    const [title, setTitle] = useState(expense?.title ?? "");
    const [amount, setAmount] = useState(expense?.amount ?? "");
    const [category, setCategory] = useState(expense?.category ?? CATEGORIES[0]);
    const [date, setDate] = useState(expense?.date ?? todayLocal());
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSaving(true);

        const url = isEditing ? `/api/expenses/${expense.id}` : "/api/expenses"

        try {
            const response = await fetch (url, {
                method: isEditing ? "PATCH" : "POST" ,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, amount: Number(amount), category, date })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                setError(data.error ?? "Something went wrong. Please try again.");
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setError("Couldn't reach the server. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card form">
            {error && <p className="error" role="alert">{error}</p>}
            <label>
                Title
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Groceries" required />
            </label>
            <label>
                Amount ($)
                <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="$25.00"
                />
            </label>
            <label>
                Category
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </label>
            <label>
                Date
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>

            <div className="form-actions">
            <button type="submit" className="button" disabled={saving}>
                {saving ? "Saving…" : isEditing ? "Save changes" : "Add expense"}
            </button>
            <Link href="/">Cancel</Link>
            </div>
        </form>
    )
}


// Today's date as YYYY-MM-DD in the user's local time zone (toISOString uses UTC)
function todayLocal() {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
}
