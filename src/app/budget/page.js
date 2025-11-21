"use client";
import { useState } from "react";
import styles from "./page.module.css";

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
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Budget Planner</h1>
                    <p className={styles.subtitle}>Manage your wedding expenses</p>
                </div>
                <div className={styles.summaryCard}>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Total Budget</span>
                        <span className={styles.summaryValue}>${totalBudget.toLocaleString()}</span>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Spent</span>
                        <span className={styles.summaryValue} style={{ color: 'var(--warning)' }}>
                            ${totalSpent.toLocaleString()}
                        </span>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Remaining</span>
                        <span className={styles.summaryValue} style={{ color: 'var(--success)' }}>
                            ${remaining.toLocaleString()}
                        </span>
                    </div>
                </div>
            </header>

            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${Math.min(percentSpent, 100)}%`, background: percentSpent > 100 ? 'var(--error)' : 'var(--primary)' }}
                    ></div>
                </div>
                <span className={styles.progressLabel}>{percentSpent}% Spent</span>
            </div>

            <div className={styles.controls}>
                <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? "Cancel" : "+ Add Expense"}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddExpense} className={styles.addForm}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newExpense.item}
                            onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
                            className={styles.input}
                            autoFocus
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <select
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                            className={styles.select}
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
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            placeholder="Cost"
                            value={newExpense.cost}
                            onChange={(e) => setNewExpense({ ...newExpense, cost: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary">Save</button>
                </form>
            )}

            <div className={styles.expenseList}>
                {expenses.map((expense) => (
                    <div key={expense.id} className={styles.expenseItem}>
                        <div className={styles.expenseInfo}>
                            <span className={styles.categoryTag}>{expense.category}</span>
                            <span className={styles.expenseName}>{expense.item}</span>
                        </div>
                        <div className={styles.expenseActions}>
                            <span className={styles.expenseCost}>${expense.cost.toLocaleString()}</span>
                            <button
                                className={`${styles.statusBtn} ${expense.paid ? styles.paid : ''}`}
                                onClick={() => togglePaid(expense.id)}
                            >
                                {expense.paid ? "Paid" : "Unpaid"}
                            </button>
                            <button
                                className={styles.deleteBtn}
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
