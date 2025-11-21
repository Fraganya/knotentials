"use client";
import { useState } from "react";
import styles from "./page.module.css";

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
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Wedding Checklist</h1>
                <p className={styles.subtitle}>Stay organized from A to Z</p>
            </header>

            <div className={styles.list}>
                {items.map((item) => {
                    const progress = calculateProgress(item.actionItems);

                    return (
                        <div key={item.id} className={`${styles.itemCard} ${item.expanded ? styles.expanded : ''}`}>
                            <div className={styles.itemHeader} onClick={() => toggleExpand(item.id)}>
                                <div className={styles.headerLeft}>
                                    <div className={styles.idBadge}>{item.id}</div>
                                    <h2 className={styles.itemTitle}>{item.title}</h2>
                                </div>
                                <div className={styles.headerRight}>
                                    <div className={styles.miniProgress}>
                                        <span className={styles.progressText}>{progress}% Done</span>
                                        <div className={styles.progressBar}>
                                            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                    <span className={styles.chevron}>{item.expanded ? '−' : '+'}</span>
                                </div>
                            </div>

                            {item.expanded && (
                                <div className={styles.itemContent}>
                                    {/* Details Section */}
                                    {item.details.length > 0 && (
                                        <div className={styles.detailsSection}>
                                            <h3 className={styles.sectionTitle}>Details</h3>
                                            <div className={styles.detailsGrid}>
                                                {item.details.map((detail, index) => (
                                                    <div key={index} className={styles.detailItem}>
                                                        <span className={styles.detailLabel}>{detail.label}</span>
                                                        <span className={styles.detailValue}>{detail.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Items Section */}
                                    <div className={styles.actionsSection}>
                                        <h3 className={styles.sectionTitle}>Action Items</h3>
                                        <div className={styles.actionsList}>
                                            {item.actionItems.map((action) => (
                                                <label key={action.id} className={`${styles.actionItem} ${action.completed ? styles.completed : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={action.completed}
                                                        onChange={() => toggleActionItem(item.id, action.id)}
                                                        className={styles.checkbox}
                                                    />
                                                    <span className={styles.actionText}>{action.text}</span>
                                                </label>
                                            ))}
                                            <button className={styles.addBtn}>+ Add Action Item</button>
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
