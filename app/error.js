"use client"

export default function ErrorPage({ retry }){
return (
    <main>
        <h1>Somthing went wrong</h1>
        <p className="muted">We could not load your expenses. Check data/expenses.json for a typo</p>
        <button onClick={(() => retry())} className="button">Try again</button>
    </main>
)
}