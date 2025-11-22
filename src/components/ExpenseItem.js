// Helper component for expense item
const ExpenseItem = ({ expense, editingId, editForm, setEditForm, saving, startEdit, cancelEdit, saveEdit, togglePaid, deleteExpense }) => {
    const isEditing = editingId === expense.id;

    if (isEditing) {
        return (
            <div className="bg-base-100 px-6 py-4 rounded-sm border border-base-200">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={editForm.item}
                            onChange={(e) => setEditForm({ ...editForm, item: e.target.value })}
                            className="input input-bordered input-sm flex-1"
                            placeholder="Item name"
                        />
                        <select
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            className="select select-bordered select-sm"
                        >
                            <option>Venue</option>
                            <option>Catering</option>
                            <option>Attire</option>
                            <option>Photography</option>
                            <option>Music</option>
                            <option>Decor</option>
                            <option>Other</option>
                        </select>
                        <input
                            type="number"
                            value={editForm.cost}
                            onChange={(e) => setEditForm({ ...editForm, cost: e.target.value })}
                            className="input input-bordered input-sm w-32"
                            placeholder="Cost"
                        />
                    </div>
                    <textarea
                        value={editForm.notes}
                        onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                        className="textarea textarea-bordered textarea-sm w-full"
                        placeholder="Notes (optional)"
                        rows="2"
                    />
                    <div className="flex gap-2 justify-end">
                        <button onClick={cancelEdit} className="btn btn-sm btn-ghost">
                            Cancel
                        </button>
                        <button onClick={() => saveEdit(expense.id)} className="btn btn-sm btn-primary" disabled={saving}>
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-base-100 px-6 py-4 rounded-sm border border-base-200 flex justify-between items-start transition-all duration-150 hover:border-primary/30 hover:shadow-sm">
            <div className="flex items-start gap-4 flex-1">
                <span className="text-xs bg-base-200 px-3 py-1 rounded-full text-base-content/60 font-medium uppercase mt-0.5">{expense.category}</span>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-base-content">{expense.item}</span>
                        {expense.notes && (
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-base-content/40 hover:text-base-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div tabIndex={0} className="dropdown-content z-10 card card-compact w-64 p-4 shadow-lg bg-base-100 border border-base-200 rounded-lg">
                                    <p className="text-sm text-base-content/80">{expense.notes}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-semibold text-base-content">${expense.cost.toLocaleString()}</span>
                <button
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${expense.paid ? 'bg-success/10 text-success border-success/20' : 'bg-base-200 text-base-content/60 border-base-300'}`}
                    onClick={() => togglePaid(expense.id, expense.paid)}
                >
                    {expense.paid ? "Paid" : "Unpaid"}
                </button>
                <button
                    className="btn btn-ghost btn-xs text-base-content/60 hover:text-primary"
                    onClick={() => startEdit(expense)}
                    aria-label="Edit expense"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
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
    );
};

export default ExpenseItem;
