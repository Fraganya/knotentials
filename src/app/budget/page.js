"use client";
import { useState } from "react";

export default function Budget() {
    const [totalBudget, setTotalBudget] = useState(30000);
    const [expenses, setExpenses] = useState([
        { id: 1, category: "Venue", item: "Reception Hall Deposit", cost: 5000, paid: true },
        { id: 2, category: "Attire", item: "Wedding Dress", cost: 2500, paid: false },
        { id: 3, category: "Photography", item: "Photographer Package", cost: 3500, paid: false },
        { id: 4, category: "Catering", item: "Food & Drinks", cost: 8000, paid: false },
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newExpense, setNewExpense] = useState({ category: "Other", item: "", cost: "" });

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.cost, 0);
    const remaining = totalBudget - totalSpent;
    const percentSpent = Math.round((totalSpent / totalBudget) * 100);

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!newExpense.item || !newExpense.cost) return;

        setExpenses([
            ...expenses,
            {
                id: Date.now(),
                category: newExpense.category,
                item: newExpense.item,
                cost: parseFloat(newExpense.cost),
                paid: false
            }
        ]);
        setNewExpense({ category: "Other", item: "", cost: "" });
        setIsAdding(false);
    };

    const togglePaid = (id) => {
        setExpenses(expenses.map(exp =>
            exp.id === id ? { ...exp, paid: !exp.paid } : exp
        ));
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <header className="flex flex-col items-start gap-6 mb-8 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-1">Budget Planner</h1>
                    <p className="text-base-content/60">Manage your wedding expenses</p>
                </div>
                <div className="bg-base-100 p-6 rounded-xl shadow-md flex items-center gap-6 border border-base-200 w-full md:w-auto justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Total Budget</span>
                        <span className="text-xl font-bold text-base-content">${totalBudget.toLocaleString()}</span>
                    </div>
                    <div className="w-px h-10 bg-base-200"></div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Spent</span>
                        <span className="text-xl font-bold text-warning">
                            ${totalSpent.toLocaleString()}
                        </span>
                    </div>
                    <div className="w-px h-10 bg-base-200"></div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Remaining</span>
                        <span className="text-xl font-bold text-success">
                            ${remaining.toLocaleString()}
                        </span>
                    </div>
                </div>
            </header>

            <div className="mb-8 flex items-center gap-4">
                <div className="flex-1 h-3 bg-base-200 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${Math.min(percentSpent, 100)}%`, background: percentSpent > 100 ? 'var(--error)' : 'var(--primary)' }}
                    ></div>
                </div>
                <span className="text-sm font-semibold text-base-content/60 min-w-[80px] text-right">{percentSpent}% Spent</span>
            </div>

            <div className="mb-6">
                <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? "Cancel" : "+ Add Expense"}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddExpense} className="bg-base-100 p-6 rounded-lg border border-base-200 mb-6 flex flex-col gap-4 items-stretch animate-[slideDown_0.3s_ease-out] md:flex-row md:items-center">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newExpense.item}
                            onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
                            className="input-enhanced w-full"
                            autoFocus
                        />
                    </div>
                    <div className="flex-1">
                        <select
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                            className="select-enhanced w-full"
                        >
                            <option>Venue</option>
                            <option>Catering</option>
                            <option>Attire</option>
                            <option>Photography</option>
                            <option>Music</option>
                            <option>Decor</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <input
                            type="number"
                            placeholder="Cost"
                            value={newExpense.cost}
                            onChange={(e) => setNewExpense({ ...newExpense, cost: e.target.value })}
                            className="input-enhanced w-full"
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary">Save</button>
                </form>
            )}

            <div className="flex flex-col gap-2">
                {expenses.map((expense) => (
                    <div key={expense.id} className="bg-base-100 px-6 py-4 rounded-lg border border-base-200 flex justify-between items-center transition-all duration-150 hover:border-primary/30 hover:translate-x-1">
                        <div className="flex items-center gap-4">
                            <span className="text-xs bg-base-200 px-3 py-1 rounded-full text-base-content/60 font-medium uppercase">{expense.category}</span>
                            <span className="font-medium text-base-content">{expense.item}</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="font-semibold text-base-content">${expense.cost.toLocaleString()}</span>
                            <button
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${expense.paid ? 'bg-success/10 text-success border-success/20' : 'bg-base-200 text-base-content/60 border-base-300'}`}
                                onClick={() => togglePaid(expense.id)}
                            >
                                {expense.paid ? "Paid" : "Unpaid"}
                            </button>
                            <button
                                className="text-base-content/40 text-2xl leading-none px-1 hover:text-error"
                                onClick={() => deleteExpense(expense.id)}
                                aria-label="Delete expense"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
