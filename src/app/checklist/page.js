"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../lib/supabase/client";
import Link from "next/link";
import { IconChevronLeft, IconSearch, IconPlus, IconX, IconCheck } from "@tabler/icons-react";

// Default seed data
const DEFAULT_ITEMS = [
    {
        id: "A",
        title: "Church Registration",
        details: [
            { label: "Wedding Date & Time", value: "" },
            { label: "Church Name", value: "" },
            { label: "Liaison/Contact", value: "" },
            { label: "Announcements Start Date", value: "" },
            { label: "Counselling Schedule", value: "" },
            { label: "Rehearsal Schedule", value: "" }
        ],
        actionItems: [
            { text: "Register at church", completed: false },
            { text: "Attend pre-marriage counseling", completed: false },
            { text: "Book wedding date", completed: false }
        ]
    },
    {
        id: "B",
        title: "Attire & Dressing",
        details: [
            { label: "Bride Dress Status", value: "" },
            { label: "Groom Suit Status", value: "" },
            { label: "Bridesmaids Dresses", value: "" },
            { label: "Groomsmen Suits", value: "" }
        ],
        actionItems: [
            { text: "Shop for wedding dress/suit", completed: false },
            { text: "Arrange bridesmaids dresses", completed: false },
            { text: "Arrange groomsmen suits", completed: false }
        ]
    },
    {
        id: "C",
        title: "Accommodation",
        details: [
            { label: "Bridal Party Accommodation", value: "" },
            { label: "Guest Accommodation", value: "" }
        ],
        actionItems: [
            { text: "Book accommodation for bridal party", completed: false },
            { text: "Arrange guest accommodation", completed: false }
        ]
    },
    {
        id: "D",
        title: "Reception Venue",
        details: [
            { label: "Venue Name", value: "" },
            { label: "Contact Person", value: "" },
            { label: "Seating Capacity", value: "" },
            { label: "Venue Cost", value: "" }
        ],
        actionItems: [
            { text: "Book reception venue", completed: false },
            { text: "Confirm seating capacity", completed: false }
        ]
    },
    {
        id: "E",
        title: "Decoration",
        details: [
            { label: "Decorator Name", value: "" },
            { label: "Color Scheme", value: "" },
            { label: "Decoration Cost", value: "" }
        ],
        actionItems: [
            { text: "Hire decorator", completed: false },
            { text: "Choose color scheme", completed: false }
        ]
    },
    {
        id: "F",
        title: "Wedding Cake",
        details: [
            { label: "Cake Provider", value: "" },
            { label: "Cake Cost", value: "" },
            { label: "Cake Details", value: "" }
        ],
        actionItems: [
            { text: "Order wedding cake", completed: false },
            { text: "Schedule cake tasting", completed: false }
        ]
    },
    {
        id: "G",
        title: "Cake Sharing",
        details: [
            { label: "Couples for Cake Sharing", value: "" }
        ],
        actionItems: [
            { text: "Arrange cake sharing couples", completed: false }
        ]
    },
    {
        id: "H",
        title: "Bridal Party",
        details: [
            { label: "Total Members", value: "" },
            { label: "Best Man", value: "" },
            { label: "Maid of Honor", value: "" }
        ],
        actionItems: [
            { text: "Select bridal party members", completed: false },
            { text: "Confirm availability", completed: false }
        ]
    },
    {
        id: "I",
        title: "Transport",
        details: [
            { label: "Wedding Car Provider", value: "" },
            { label: "Transport Cost", value: "" }
        ],
        actionItems: [
            { text: "Book wedding car", completed: false },
            { text: "Arrange guest transport", completed: false }
        ]
    },
    {
        id: "J",
        title: "Invitation Cards",
        details: [
            { label: "Designer/Printer", value: "" },
            { label: "Quantity", value: "" },
            { label: "Cost", value: "" }
        ],
        actionItems: [
            { text: "Design invitations", completed: false },
            { text: "Print and distribute invitations", completed: false }
        ]
    },
    {
        id: "K",
        title: "Catering & Snacks",
        details: [
            { label: "Caterer Name", value: "" },
            { label: "Number of Guests", value: "" },
            { label: "Menu", value: "" },
            { label: "Catering Cost", value: "" }
        ],
        actionItems: [
            { text: "Hire caterer", completed: false },
            { text: "Plan menu", completed: false }
        ]
    },
    {
        id: "L",
        title: "Beverages",
        details: [
            { label: "Drinks Quantity", value: "" },
            { label: "Drinks Cost", value: "" }
        ],
        actionItems: [
            { text: "Order drinks", completed: false },
            { text: "Arrange coolers and ice", completed: false }
        ]
    },
    {
        id: "M",
        title: "Traditional Ceremony",
        details: [
            { label: "Venue", value: "" },
            { label: "Date & Time", value: "" }
        ],
        actionItems: [
            { text: "Plan traditional ceremony", completed: false },
            { text: "Arrange catering", completed: false }
        ]
    },
    {
        id: "N",
        title: "Photography & Videography",
        details: [
            { label: "Photographer Name", value: "" },
            { label: "Videographer Name", value: "" },
            { label: "Photography Cost", value: "" },
            { label: "Videography Cost", value: "" }
        ],
        actionItems: [
            { text: "Book photographer", completed: false },
            { text: "Book videographer", completed: false }
        ]
    },
    {
        id: "O",
        title: "Entertainment",
        details: [
            { label: "DJ Name", value: "" },
            { label: "MC Name", value: "" },
            { label: "Entertainment Cost", value: "" }
        ],
        actionItems: [
            { text: "Book DJ", completed: false },
            { text: "Book MC", completed: false }
        ]
    },
    {
        id: "P",
        title: "Security",
        details: [
            { label: "Security Provider", value: "" },
            { label: "Number of Officers", value: "" },
            { label: "Security Cost", value: "" }
        ],
        actionItems: [
            { text: "Arrange security", completed: false }
        ]
    },
    {
        id: "Q",
        title: "Ushers",
        details: [
            { label: "Number of Ushers", value: "" },
            { label: "Usher Names", value: "" }
        ],
        actionItems: [
            { text: "Select ushers", completed: false },
            { text: "Brief ushers on duties", completed: false }
        ]
    },
    {
        id: "R",
        title: "Cashiers",
        details: [
            { label: "Number of Cashiers", value: "" },
            { label: "Cashier Names", value: "" }
        ],
        actionItems: [
            { text: "Select cashiers", completed: false },
            { text: "Prepare cash handling procedures", completed: false }
        ]
    },
    {
        id: "S",
        title: "Candle Lighting",
        details: [
            { label: "Candle Lighting Team", value: "" }
        ],
        actionItems: [
            { text: "Arrange candle lighting ceremony", completed: false }
        ]
    },
    {
        id: "T",
        title: "Cake Cutting",
        details: [
            { label: "Cake Cutting Couple", value: "" }
        ],
        actionItems: [
            { text: "Arrange cake cutting ceremony", completed: false }
        ]
    },
    {
        id: "U",
        title: "Gift Management",
        details: [
            { label: "Gift Custodians", value: "" }
        ],
        actionItems: [
            { text: "Assign gift custodians", completed: false }
        ]
    },
    {
        id: "V",
        title: "Champagne & Toasting",
        details: [
            { label: "Champagne Quantity", value: "" },
            { label: "Toasting Team", value: "" }
        ],
        actionItems: [
            { text: "Order champagne", completed: false },
            { text: "Plan toasting ceremony", completed: false }
        ]
    },
    {
        id: "W",
        title: "Chief Marshall",
        details: [
            { label: "Chief Marshall Name", value: "" }
        ],
        actionItems: [
            { text: "Appoint chief marshall", completed: false }
        ]
    },
    {
        id: "X",
        title: "Farewell",
        details: [
            { label: "Farewell Team", value: "" },
            { label: "Number of People", value: "" }
        ],
        actionItems: [
            { text: "Arrange farewell ceremony", completed: false }
        ]
    },
    {
        id: "Y",
        title: "Float & Petty Cash",
        details: [
            { label: "Float Amount", value: "" },
            { label: "Responsible Person", value: "" }
        ],
        actionItems: [
            { text: "Prepare float for vendors", completed: false }
        ]
    },
    {
        id: "Z",
        title: "Budget Management",
        details: [
            { label: "Total Budget", value: "" },
            { label: "Amount Spent", value: "" },
            { label: "Remaining Balance", value: "" }
        ],
        actionItems: [
            { text: "Create wedding budget", completed: false },
            { text: "Track expenses", completed: false }
        ]
    }
];

export default function Checklist() {
    const supabase = createClient();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);
    const [seedingProgress, setSeedingProgress] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeId, setActiveId] = useState("A");
    const [newItemText, setNewItemText] = useState("");
    const [addingToSection, setAddingToSection] = useState(null);
    const [newDetailLabel, setNewDetailLabel] = useState("");
    const [newDetailValue, setNewDetailValue] = useState("");
    const [addingDetailToSection, setAddingDetailToSection] = useState(null);

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Fetch sections
            const { data: sections, error: sectionsError } = await supabase
                .from('checklist_sections')
                .select('*')
                .eq('user_id', user.id) // Filter by user_id
                .order('letter');

            if (sectionsError) throw sectionsError;

            if (!sections || sections.length === 0) {
                setSeeding(true);
                await seedData(user.id);
                return;
            }

            // Fetch details and items
            const { data: details } = await supabase.from('checklist_details').select('*');
            const { data: actionItems } = await supabase.from('checklist_items').select('*').order('created_at');

            // Assemble data structure
            const assembledItems = sections.map(section => ({
                id: section.letter,
                dbId: section.id,
                title: section.title,
                details: details.filter(d => d.section_id === section.id).map(d => ({
                    id: d.id,
                    label: d.label,
                    value: d.value
                })),
                actionItems: actionItems.filter(i => i.section_id === section.id).map(i => ({
                    id: i.id,
                    text: i.text,
                    completed: i.completed
                })),
                expanded: false
            }));

            setItems(assembledItems);
        } catch (error) {
            console.error('Error fetching checklist:', error);
        } finally {
            setLoading(false);
        }
    };

    const seedData = async (userId) => {
        try {
            const totalItems = DEFAULT_ITEMS.length;

            for (let i = 0; i < DEFAULT_ITEMS.length; i++) {
                const item = DEFAULT_ITEMS[i];

                // Insert section
                const { data: section, error: sectionError } = await supabase
                    .from('checklist_sections')
                    .insert({
                        user_id: userId,
                        letter: item.id,
                        title: item.title
                    })
                    .select()
                    .single();

                if (sectionError) throw sectionError;

                // Insert details
                if (item.details.length > 0) {
                    await supabase.from('checklist_details').insert(
                        item.details.map(d => ({
                            section_id: section.id,
                            label: d.label,
                            value: d.value
                        }))
                    );
                }

                // Insert action items
                if (item.actionItems.length > 0) {
                    await supabase.from('checklist_items').insert(
                        item.actionItems.map(i => ({
                            section_id: section.id,
                            text: i.text,
                            completed: i.completed
                        }))
                    );
                }

                // Update progress
                setSeedingProgress(Math.round(((i + 1) / totalItems) * 100));
            }
            await fetchData();
        } catch (error) {
            console.error('Error seeding data:', error);
        } finally {
            setSeeding(false);
            setSeedingProgress(0);
        }
    };

    const toggleExpand = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    };

    const toggleActionItem = async (itemId, actionId) => {
        // Optimistic update
        const newItems = items.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    actionItems: item.actionItems.map(action =>
                        action.id === actionId ? { ...action, completed: !action.completed } : action
                    )
                };
            }
            return item;
        });
        setItems(newItems);

        // DB update
        const item = newItems.find(i => i.id === itemId);
        const action = item.actionItems.find(a => a.id === actionId);

        await supabase
            .from('checklist_items')
            .update({ completed: action.completed })
            .eq('id', actionId);
    };

    const handleAddItem = async (sectionId, dbId) => {
        if (!newItemText.trim()) return;

        try {
            const { data: newItem, error } = await supabase
                .from('checklist_items')
                .insert({
                    section_id: dbId,
                    text: newItemText,
                    completed: false
                })
                .select()
                .single();

            if (error) throw error;

            setItems(items.map(item => {
                if (item.id === sectionId) {
                    return {
                        ...item,
                        actionItems: [...item.actionItems, {
                            id: newItem.id,
                            text: newItem.text,
                            completed: newItem.completed
                        }]
                    };
                }
                return item;
            }));

            setNewItemText("");
            setAddingToSection(null);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleAddDetail = async (sectionId, dbId) => {
        if (!newDetailLabel.trim() || !newDetailValue.trim()) return;

        try {
            const { data: newDetail, error } = await supabase
                .from('checklist_details')
                .insert({
                    section_id: dbId,
                    label: newDetailLabel,
                    value: newDetailValue
                })
                .select()
                .single();

            if (error) throw error;

            setItems(items.map(item => {
                if (item.id === sectionId) {
                    return {
                        ...item,
                        details: [...item.details, {
                            id: newDetail.id,
                            label: newDetail.label,
                            value: newDetail.value
                        }]
                    };
                }
                return item;
            }));

            setNewDetailLabel("");
            setNewDetailValue("");
            setAddingDetailToSection(null);
        } catch (error) {
            console.error('Error adding detail:', error);
        }
    };

    const calculateProgress = (actionItems) => {
        if (!actionItems || actionItems.length === 0) return 0;
        const completed = actionItems.filter(a => a.completed).length;
        return Math.round((completed / actionItems.length) * 100);
    };

    const filteredItems = searchTerm
        ? items.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : items.filter(item => item.id === activeId);

    if (loading || seeding) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/5 flex items-center justify-center">
                <div className="text-center max-w-md w-full px-4">
                    <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                        {seeding ? "Setting Up Your Checklist" : "Loading Checklist"}
                    </h2>
                    <p className="text-base-content/60 mb-6">
                        {seeding
                            ? "Creating your personalized A-Z wedding checklist..."
                            : "Just a moment..."}
                    </p>

                    {seeding && (
                        <div className="w-full">
                            <div className="flex justify-between text-sm text-base-content/60 mb-2">
                                <span>Progress</span>
                                <span>{seedingProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${seedingProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/5">
            <div className="max-w-7xl mx-auto px-4 py-8">
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
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search checklist..."
                            className="input input-bordered w-full pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <IconSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                </header>

                {!searchTerm && (
                    <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar mask-linear-fade">
                        {alphabet.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => setActiveId(letter)}
                                className={`btn btn-circle btn-sm flex-shrink-0 ${activeId === letter ? 'btn-primary' : 'btn-ghost bg-base-200/50'}`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                )}

                <div className={searchTerm ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start" : "max-w-3xl mx-auto"}>
                    {filteredItems.map((item) => {
                        const progress = calculateProgress(item.actionItems);
                        const isExpanded = !searchTerm ? true : item.expanded;

                        return (
                            <div key={item.id} className={`bg-base-100 rounded-xl border border-base-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30 ${isExpanded ? 'expanded ring-1 ring-primary/20' : ''}`}>
                                <div className={`p-6 cursor-pointer hover:bg-base-50 ${isExpanded ? 'border-b border-base-200 bg-base-50' : 'bg-base-100'}`} onClick={() => toggleExpand(item.id)}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold font-serif text-xl shrink-0">{item.id}</div>
                                        <span className="text-2xl text-base-content/40 w-6 text-center">{isExpanded ? '−' : '+'}</span>
                                    </div>

                                    <h2 className="text-xl text-base-content font-semibold mb-4">{item.title}</h2>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs font-semibold text-base-content/60">
                                            <span>Progress</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-base-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-success rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="p-6 animate-[slideDown_0.3s_ease-out]">
                                        {/* Details Section */}
                                        <div className="mb-6 bg-base-200/50 p-4 rounded-lg">
                                            <h3 className="text-xs uppercase tracking-wider text-base-content/60 mb-3 font-semibold">Details</h3>
                                            {item.details && item.details.length > 0 && (
                                                <div className="flex flex-col gap-3 mb-3">
                                                    {item.details.map((detail, index) => (
                                                        <div key={index} className="flex flex-col gap-0.5">
                                                            <span className="text-xs text-base-content/60">{detail.label}</span>
                                                            <span className="font-medium text-sm text-base-content">{detail.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {addingDetailToSection === item.id ? (
                                                <div className="flex flex-col gap-2">
                                                    <input
                                                        type="text"
                                                        className="input input-sm input-bordered w-full"
                                                        placeholder="Label (e.g., Wedding Date)"
                                                        value={newDetailLabel}
                                                        onChange={(e) => setNewDetailLabel(e.target.value)}
                                                        autoFocus
                                                    />
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            className="input input-sm input-bordered w-full"
                                                            placeholder="Value (e.g., 31 Aug 2024)"
                                                            value={newDetailValue}
                                                            onChange={(e) => setNewDetailValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') handleAddDetail(item.id, item.dbId);
                                                                if (e.key === 'Escape') {
                                                                    setAddingDetailToSection(null);
                                                                    setNewDetailLabel("");
                                                                    setNewDetailValue("");
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            className="btn btn-sm btn-square btn-primary"
                                                            onClick={() => handleAddDetail(item.id, item.dbId)}
                                                        >
                                                            <IconCheck className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-square btn-ghost"
                                                            onClick={() => {
                                                                setAddingDetailToSection(null);
                                                                setNewDetailLabel("");
                                                                setNewDetailValue("");
                                                            }}
                                                        >
                                                            <IconX className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    className="text-left text-primary font-medium text-xs p-2 hover:underline w-fit flex items-center gap-1"
                                                    onClick={() => setAddingDetailToSection(item.id)}
                                                >
                                                    <IconPlus className="w-3 h-3" /> Add Detail
                                                </button>
                                            )}
                                        </div>

                                        {/* Action Items Section */}
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-xs uppercase tracking-wider text-base-content/60 mb-2 font-semibold">Action Items</h3>
                                            <div className="flex flex-col gap-2">
                                                {item.actionItems && item.actionItems.map((action) => (
                                                    <label key={action.id} className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-base-200/50 ${action.completed ? 'completed' : ''}`}>
                                                        <input
                                                            type="checkbox"
                                                            checked={action.completed}
                                                            onChange={() => toggleActionItem(item.id, action.id)}
                                                            className="checkbox checkbox-primary checkbox-xs mt-1"
                                                        />
                                                        <span className={`text-sm transition-colors ${action.completed ? 'line-through text-base-content/40' : 'text-base-content'}`}>{action.text}</span>
                                                    </label>
                                                ))}

                                                {addingToSection === item.id ? (
                                                    <div className="flex gap-2 mt-2">
                                                        <input
                                                            type="text"
                                                            className="input input-sm input-bordered w-full"
                                                            placeholder="New item..."
                                                            value={newItemText}
                                                            onChange={(e) => setNewItemText(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') handleAddItem(item.id, item.dbId);
                                                                if (e.key === 'Escape') {
                                                                    setAddingToSection(null);
                                                                    setNewItemText("");
                                                                }
                                                            }}
                                                            autoFocus
                                                        />
                                                        <button
                                                            className="btn btn-sm btn-square btn-primary"
                                                            onClick={() => handleAddItem(item.id, item.dbId)}
                                                        >
                                                            <IconCheck className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-square btn-ghost"
                                                            onClick={() => {
                                                                setAddingToSection(null);
                                                                setNewItemText("");
                                                            }}
                                                        >
                                                            <IconX className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="mt-1 text-left text-primary font-medium text-xs p-2 hover:underline w-fit flex items-center gap-1"
                                                        onClick={() => setAddingToSection(item.id)}
                                                    >
                                                        <IconPlus className="w-3 h-3" /> Add Item
                                                    </button>
                                                )}
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
