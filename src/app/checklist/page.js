"use client";
import { useState } from "react";

export default function Checklist() {
    // Initial data based on user's file and request
    const [items, setItems] = useState([
        {
            id: "A",
            title: "Church Registration",
            details: [
                { label: "Wedding Date & Time", value: "31 Aug 2024, 7:30 AM" },
                { label: "Name of Church", value: "St Louis de Montfort C.I Parish" },
                { label: "Church Liaison", value: "Catechist T. Nantunga (884496695)" }
            ],
            actionItems: [
                { id: 1, text: "Submit registration forms", completed: false },
                { id: 2, text: "Meet with the priest", completed: false },
                { id: 3, text: "Pay church fees", completed: false }
            ],
            expanded: true
        },
        {
            id: "B",
            title: "Reception Venue",
            details: [
                { label: "Location", value: "Grand Hotel Ballroom" },
                { label: "Capacity", value: "200 Guests" }
            ],
            actionItems: [
                { id: 4, text: "Sign contract", completed: true },
                { id: 5, text: "Pay deposit", completed: true },
                { id: 6, text: "Finalize menu tasting", completed: false }
            ],
            expanded: false
        }
    ]);

    const toggleExpand = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    };

    const toggleActionItem = (itemId, actionId) => {
        setItems(items.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    actionItems: item.actionItems.map(action =>
                        action.id === actionId ? { ...action, completed: !action.completed } : action
                    )
                };
            }
            return item;
        }));
    };

    const calculateProgress = (actionItems) => {
        if (actionItems.length === 0) return 0;
        const completed = actionItems.filter(a => a.completed).length;
        return Math.round((completed / actionItems.length) * 100);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-primary mb-1">Wedding Checklist</h1>
                <p className="text-base-content/60 text-lg">Stay organized from A to Z</p>
            </header>

            <div className="flex flex-col gap-6">
                {items.map((item) => {
                    const progress = calculateProgress(item.actionItems);

                    return (
                        <div key={item.id} className={`bg-base-100 rounded-xl border border-base-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30 ${item.expanded ? 'expanded' : ''}`}>
                            <div className={`p-6 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-base-50 gap-4 ${item.expanded ? 'border-b border-base-200 bg-base-50' : 'bg-base-100'}`} onClick={() => toggleExpand(item.id)}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold font-serif text-xl shrink-0">{item.id}</div>
                                    <h2 className="text-xl text-base-content m-0 font-semibold">{item.title}</h2>
                                </div>
                                <div className="flex items-center gap-6 w-full md:w-auto justify-between">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-xs font-semibold text-base-content/60">{progress}% Done</span>
                                        <div className="w-24 h-1.5 bg-base-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-success rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                    <span className="text-2xl text-base-content/40 w-6 text-center">{item.expanded ? '−' : '+'}</span>
                                </div>
                            </div>

                            {item.expanded && (
                                <div className="p-6 animate-[slideDown_0.3s_ease-out]">
                                    {/* Details Section */}
                                    {item.details.length > 0 && (
                                        <div className="mb-8 bg-base-200/50 p-4 rounded-lg">
                                            <h3 className="text-sm uppercase tracking-wider text-base-content/60 mb-4 font-semibold">Details</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {item.details.map((detail, index) => (
                                                    <div key={index} className="flex flex-col gap-1">
                                                        <span className="text-xs text-base-content/60">{detail.label}</span>
                                                        <span className="font-medium text-base-content">{detail.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Items Section */}
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-sm uppercase tracking-wider text-base-content/60 mb-4 font-semibold">Action Items</h3>
                                        <div className="flex flex-col gap-2">
                                            {item.actionItems.map((action) => (
                                                <label key={action.id} className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-colors hover:bg-base-200/50 ${action.completed ? 'completed' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={action.completed}
                                                        onChange={() => toggleActionItem(item.id, action.id)}
                                                        className="checkbox checkbox-primary checkbox-sm"
                                                    />
                                                    <span className={`text-base transition-colors ${action.completed ? 'line-through text-base-content/40' : 'text-base-content'}`}>{action.text}</span>
                                                </label>
                                            ))}
                                            <button className="mt-2 text-left text-primary font-medium text-sm p-2 hover:underline w-fit">+ Add Action Item</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
