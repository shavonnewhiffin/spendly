"use client"

export default function ErrorPage({ reset }){
return (
    <main>
        <h1>Something went wrong</h1>
        <p className="muted">We could not load your expenses. Check data/expenses.json for a typo</p>
        <button onClick={() => reset()} className="button">Try again</button>
    </main>
)
}