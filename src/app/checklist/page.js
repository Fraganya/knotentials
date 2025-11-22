"use client";
import { useState } from "react";

import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export default function Checklist() {
    // Initial data based on user's file and request
    const [items, setItems] = useState([
        {
            id: "A",
            title: "Church Registration",
            details: [
                { label: "Wedding Date & Time", value: "31 Aug 2024, 7:30 AM" },
                { label: "Church", value: "St Louis de Montfort C.I Parish" },
                { label: "Liaison", value: "Catechist T. Nantunga (884496695)" },
                { label: "Announcements Start", value: "11 August 2024" },
                { label: "Counselling", value: "29–30 Aug, 8:00–12:00" },
                { label: "Rehearsals", value: "29–30 Aug, 13:30" }
            ],
            actionItems: [
                { id: 1, text: "Buy Bible", completed: true },
                { id: 2, text: "Buy Candle", completed: true },
                { id: 3, text: "Buy Small Candles", completed: true },
                { id: 4, text: "Gifts for Priest (Parents)", completed: false },
                { id: 5, text: "Wedding Rings (Take to church)", completed: true }
            ],
            expanded: true
        },
        {
            id: "B",
            title: "Dressing Status",
            details: [],
            actionItems: [
                { id: 1, text: "Bride Dress (Fully paid)", completed: true },
                { id: 2, text: "Groom Suit (Fully paid, 1 collected)", completed: true },
                { id: 3, text: "Bridesmaids Dresses (Ready)", completed: true },
                { id: 4, text: "Groomsmen Suits (Ready)", completed: true },
                { id: 5, text: "Flower Girl Dress (Mrs B. Washoni)", completed: false },
                { id: 6, text: "Page Boy Attire (Mrs T. Matenje)", completed: false }
            ],
            expanded: false
        },
        {
            id: "C",
            title: "Accommodation (Night Before)",
            details: [],
            actionItems: [
                { id: 1, text: "Groom + 6 Boys (Mr & Mrs Nyirenda)", completed: false },
                { id: 2, text: "Bride + 6 Girls (Mrs J. Masikamu)", completed: false },
                { id: 3, text: "Flower Girl (Mrs B Washoni)", completed: false },
                { id: 4, text: "Page Boy (Mrs Tene Matenje)", completed: false },
                { id: 5, text: "Lady in Waiting (Mrs Lydia Chisoni & Mrs Chisomo Mlenga)", completed: false }
            ],
            expanded: false
        },
        {
            id: "D",
            title: "Reception",
            details: [
                { label: "Venue", value: "Golden Peacock – Lilongwe Hall @ 13:30" },
                { label: "Contact", value: "Khumbo Gwede (0995298829)" },
                { label: "Chairs", value: "300–500 (confirm)" },
                { label: "Extra Chairs", value: "200 already paid" }
            ],
            actionItems: [
                { id: 1, text: "Pay Venue Charge (K1,500,000)", completed: true },
                { id: 2, text: "Pay Security Fee (K150,000)", completed: false }
            ],
            expanded: false
        },
        {
            id: "E",
            title: "Decoration",
            details: [
                { label: "Decorator", value: "Eden Events by Idah" },
                { label: "Colors", value: "Sage green, blush pink, rose gold, white" },
                { label: "Charge", value: "2,220,000 (Transport included)" }
            ],
            actionItems: [
                { id: 1, text: "Arrange 6 extra tables", completed: false },
                { id: 2, text: "Request 12 carnations", completed: false },
                { id: 3, text: "Negotiate decoration for 3 cars", completed: false }
            ],
            expanded: false
        },
        {
            id: "F",
            title: "Wedding Cake",
            details: [
                { label: "Provider", value: "Cornish Nkonya" },
                { label: "Charge", value: "325,000 (Transport included)" },
                { label: "Details", value: "3 cakes, 3 dummies, 50 boxes" }
            ],
            actionItems: [
                { id: 1, text: "Pay deposit (250,000)", completed: true },
                { id: 2, text: "Pay table deposit (35,000)", completed: true },
                { id: 3, text: "Pay balance", completed: false },
                { id: 4, text: "Verify glasses, baskets, knife, candle lighters", completed: false }
            ],
            expanded: false
        },
        {
            id: "G",
            title: "Cake Sharing",
            details: [],
            actionItems: [
                { id: 1, text: "Couples: Bwanali, Chimole, Kanock‑Shumba, Kalima", completed: false }
            ],
            expanded: false
        },
        {
            id: "H",
            title: "Bridal Party",
            details: [
                { label: "Members", value: "19 Total" }
            ],
            actionItems: [
                { id: 1, text: "Confirm all members (Bride, Groom, Best Man, etc.)", completed: false }
            ],
            expanded: false
        },
        {
            id: "I",
            title: "Transport",
            details: [
                { label: "Fleet", value: "BMW" },
                { label: "Owner", value: "Lewis Machilika" }
            ],
            actionItems: [
                { id: 1, text: "Verify details with transport team", completed: false },
                { id: 2, text: "Confirm fuel/driver budgets", completed: false }
            ],
            expanded: false
        },
        {
            id: "J",
            title: "Invitation Cards",
            details: [],
            actionItems: [
                { id: 1, text: "Share 100 cards", completed: true }
            ],
            expanded: false
        },
        {
            id: "K",
            title: "Snacks",
            details: [
                { label: "Provider", value: "Luckia Foods Catering" },
                { label: "Quantity", value: "450" },
                { label: "Package", value: "Samosa, chicken drumstick, cupcake, toothpick" },
                { label: "Charge", value: "1,390,000" }
            ],
            actionItems: [
                { id: 1, text: "Pay deposit (1,200,000)", completed: true },
                { id: 2, text: "Pay balance", completed: false }
            ],
            expanded: false
        },
        {
            id: "L",
            title: "Soft Drinks",
            details: [
                { label: "Quantity", value: "23 crates (450 drinks + 450 water)" }
            ],
            actionItems: [
                { id: 1, text: "Purchase drinks", completed: true },
                { id: 2, text: "Arrange cooler & ice blocks", completed: false }
            ],
            expanded: false
        },
        {
            id: "M",
            title: "Mwambo",
            details: [
                { label: "Venue", value: "Mr & Mrs Nyirenda – Green Corner" }
            ],
            actionItems: [
                { id: 1, text: "Engage caterer", completed: true },
                { id: 2, text: "Arrange lunch prep & transport", completed: false }
            ],
            expanded: false
        },
        {
            id: "N",
            title: "Videography & Photography",
            details: [
                { label: "Providers", value: "Pixel Ads & Twiggalite" },
                { label: "Charges", value: "380,000 + 360,000" },
                { label: "Site", value: "Kautsire Garden" }
            ],
            actionItems: [
                { id: 1, text: "Verify payment & transport", completed: false }
            ],
            expanded: false
        },
        {
            id: "O",
            title: "DJ & MC",
            details: [],
            actionItems: [
                { id: 1, text: "Pay DJ Tman (200,000)", completed: true },
                { id: 2, text: "Pay MC George Adams (170,000)", completed: true },
                { id: 3, text: "Verify genset & fuel", completed: false }
            ],
            expanded: false
        },
        {
            id: "P",
            title: "Security",
            details: [
                { label: "Station", value: "Soche Police" },
                { label: "Additional", value: "Joseph Magoya" }
            ],
            actionItems: [
                { id: 1, text: "Pay officers (60,000)", completed: false }
            ],
            expanded: false
        },
        {
            id: "Q",
            title: "Ushers",
            details: [
                { label: "Source", value: "Provided by caterer" }
            ],
            actionItems: [
                { id: 1, text: "Confirm number & transport", completed: false }
            ],
            expanded: false
        },
        {
            id: "R",
            title: "Cashiers",
            details: [
                { label: "Team", value: "Rose Bindula, Patience Chikalamba, Redge Ntukula, Tadala Maloni, Clara Kapachika, Sekanawo Nyalapa, Agness Malonda, Dyna Maferano + 2 TBD" }
            ],
            actionItems: [
                { id: 1, text: "Confirm final team list", completed: false }
            ],
            expanded: false
        },
        {
            id: "S",
            title: "Candle Lighting",
            details: [],
            actionItems: [
                { id: 1, text: "Mrs Tene Matenje & Mrs Lydia Sande", completed: false }
            ],
            expanded: false
        },
        {
            id: "T",
            title: "Cake Cutting",
            details: [],
            actionItems: [
                { id: 1, text: "Mr & Mrs Chirwa", completed: false }
            ],
            expanded: false
        },
        {
            id: "U",
            title: "Gift Custodians",
            details: [],
            actionItems: [
                { id: 1, text: "Deborah Washoni, Lilian Magoya", completed: false }
            ],
            expanded: false
        },
        {
            id: "V",
            title: "Champagne & Toasting",
            details: [
                { label: "Main", value: "Concern Thom" }
            ],
            actionItems: [
                { id: 1, text: "Confirm Poppers team (Makungwa, Masoamphambe, etc.)", completed: false }
            ],
            expanded: false
        },
        {
            id: "W",
            title: "Chief Marshall",
            details: [],
            actionItems: [
                { id: 1, text: "Provided by Mr Ganya Snr.", completed: false }
            ],
            expanded: false
        },
        {
            id: "X",
            title: "Farewell Girls",
            details: [],
            actionItems: [
                { id: 1, text: "Confirm 16 names (Emma, Apaliwanje, etc.)", completed: false }
            ],
            expanded: false
        },
        {
            id: "Y",
            title: "Float",
            details: [
                { label: "Responsible", value: "Mrs J. Nyirenda" }
            ],
            actionItems: [
                { id: 1, text: "Determine denominations", completed: false }
            ],
            expanded: false
        },
        {
            id: "Z",
            title: "Budget",
            details: [
                { label: "Total", value: "10,443,600" },
                { label: "Paid", value: "9,656,600" },
                { label: "Balance", value: "852,000" },
                { label: "Cash at Hand", value: "200,000" },
                { label: "Deficit", value: "812,000" }
            ],
            actionItems: [
                { id: 1, text: "Raise deficit (Couple 300k + Family 512k)", completed: false }
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
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/5">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 pb-6 border-b border-base-300">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="btn btn-circle btn-ghost hover:bg-base-200">
                            <IconChevronLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-primary mb-1">Wedding Checklist</h1>
                            <p className="text-base-content/60">Stay organized from A to Z</p>
                        </div>
                    </div>
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
        </div>
    );
}
