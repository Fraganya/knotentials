"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../lib/supabase/client";
import Link from "next/link";
import { IconChevronLeft, IconPlus, IconX, IconCheck, IconTrash, IconMail, IconPhone, IconPencil, IconSearch } from "@tabler/icons-react";

export default function Guests() {
    const supabase = createClient();
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [editingGuest, setEditingGuest] = useState(null);
    const [editValues, setEditValues] = useState({ name: "", email: "", phone: "", notes: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [newGuest, setNewGuest] = useState({ name: "", email: "", phone: "", notes: "" });
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (!user) return;

            const { data, error } = await supabase
                .from('guests')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setGuests(data || []);
        } catch (error) {
            console.error('Error fetching guests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddGuest = async (e) => {
        e.preventDefault();
        if (!newGuest.name.trim() || !user) return;

        setSaving(true);

        try {
            const { data, error } = await supabase
                .from('guests')
                .insert({
                    user_id: user.id,
                    name: newGuest.name,
                    email: newGuest.email || null,
                    phone: newGuest.phone || null,
                    notes: newGuest.notes || null
                })
                .select()
                .single();

            if (error) throw error;

            // Optimistic update
            setGuests([data, ...guests]);

            setNewGuest({ name: "", email: "", phone: "", notes: "" });
            setIsAdding(false);

            // Show success feedback
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error adding guest:', error);
            alert('Failed to add guest. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const toggleConfirmed = async (guestId, currentStatus) => {
        try {
            const { error } = await supabase
                .from('guests')
                .update({ confirmed: !currentStatus })
                .eq('id', guestId);

            if (error) throw error;

            setGuests(guests.map(g =>
                g.id === guestId ? { ...g, confirmed: !currentStatus } : g
            ));
        } catch (error) {
            console.error('Error updating guest:', error);
        }
    };

    const startEditing = (guest) => {
        setEditingGuest(guest.id);
        setEditValues({
            name: guest.name,
            email: guest.email || "",
            phone: guest.phone || "",
            notes: guest.notes || ""
        });
    };

    const saveEdit = async (guestId) => {
        if (!editValues.name.trim()) return;

        try {
            const { error } = await supabase
                .from('guests')
                .update({
                    name: editValues.name,
                    email: editValues.email || null,
                    phone: editValues.phone || null,
                    notes: editValues.notes || null
                })
                .eq('id', guestId);

            if (error) throw error;

            setGuests(guests.map(g =>
                g.id === guestId ? { ...g, ...editValues } : g
            ));

            setEditingGuest(null);
            setEditValues({ name: "", email: "", phone: "", notes: "" });
        } catch (error) {
            console.error('Error updating guest:', error);
            alert('Failed to update guest. Please try again.');
        }
    };

    const cancelEdit = () => {
        setEditingGuest(null);
        setEditValues({ name: "", email: "", phone: "", notes: "" });
    };

    const deleteGuest = async (guestId) => {
        if (!confirm('Are you sure you want to remove this guest?')) return;

        try {
            const { error } = await supabase
                .from('guests')
                .delete()
                .eq('id', guestId);

            if (error) throw error;

            setGuests(guests.filter(g => g.id !== guestId));
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
    };

    // Filter guests based on search
    const filteredGuests = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalGuests = guests.length;
    const confirmedGuests = guests.filter(g => g.confirmed).length;
    const pendingGuests = totalGuests - confirmedGuests;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-100 to-primary/10">
            <header className="bg-primary/2 backdrop-blur-md border-b border-base-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <Link href="/dashboard" className="btn btn-circle btn-ghost hover:bg-base-200">
                                <IconChevronLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-primary mb-1">Guest List</h1>
                                <p className="text-base-content/60">Keep track of your favorite people</p>
                            </div>
                        </div>

                        <div className="bg-base-100 px-4 py-2 rounded-xl shadow-sm border border-base-200 flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Total</span>
                                <span className="text-lg font-bold text-base-content">{totalGuests}</span>
                            </div>
                            <div className="w-px h-8 bg-base-200"></div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Confirmed</span>
                                <span className="text-lg font-bold text-success">{confirmedGuests}</span>
                            </div>
                            <div className="w-px h-8 bg-base-200"></div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Pending</span>
                                <span className="text-lg font-bold text-warning">{pendingGuests}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                        <input
                            type="text"
                            className="input input-bordered w-full pl-10"
                            placeholder="Search guests by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsAdding(!isAdding)}
                    >
                        {isAdding ? (
                            <>
                                <IconX className="w-4 h-4" /> Cancel
                            </>
                        ) : (
                            <>
                                <IconPlus className="w-4 h-4" /> Add Guest
                            </>
                        )}
                    </button>
                </div>

                {isAdding && (
                    <div className="bg-base-100 p-6 rounded-xl border border-base-200 shadow-sm mb-6 animate-[slideDown_0.3s_ease-out]">
                        <h3 className="text-lg font-semibold mb-4">Add New Guest</h3>
                        <form onSubmit={handleAddGuest} className="flex flex-col gap-4">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Guest name *"
                                value={newGuest.name}
                                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                                required
                                autoFocus
                                disabled={saving}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    placeholder="Email (optional)"
                                    value={newGuest.email}
                                    onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                                    disabled={saving}
                                />
                                <input
                                    type="tel"
                                    className="input input-bordered w-full"
                                    placeholder="Phone (optional)"
                                    value={newGuest.phone}
                                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                                    disabled={saving}
                                />
                            </div>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows="2"
                                placeholder="Notes (optional) - e.g., dietary restrictions, plus-one"
                                value={newGuest.notes}
                                onChange={(e) => setNewGuest({ ...newGuest, notes: e.target.value })}
                                disabled={saving}
                            ></textarea>
                            <div className="flex gap-2 justify-end">
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <IconCheck className="w-4 h-4" /> Add Guest
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Success Toast */}
                {showSuccess && (
                    <div className="fixed top-20 right-4 z-50 animate-[slideIn_0.3s_ease-out]">
                        <div className="alert alert-success shadow-lg">
                            <IconCheck className="w-5 h-5" />
                            <span>Guest added successfully!</span>
                        </div>
                    </div>
                )}

                {guests.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-base-content/60 mb-4">No guests added yet</p>
                        <p className="text-sm text-base-content/40">Start adding your favorite people to keep track of who you've invited!</p>
                    </div>
                ) : filteredGuests.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-base-content/60 mb-4">No guests found</p>
                        <p className="text-sm text-base-content/40">Try a different search term</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {filteredGuests.map((guest) => (
                            <div
                                key={guest.id}
                                className="bg-base-100 p-3 rounded-lg border border-base-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {editingGuest === guest.id ? (
                                    // Edit Mode
                                    <div className="flex flex-col gap-3">
                                        <input
                                            type="text"
                                            className="input input-bordered input-sm w-full"
                                            placeholder="Name *"
                                            value={editValues.name}
                                            onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <input
                                                type="email"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Email"
                                                value={editValues.email}
                                                onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                                            />
                                            <input
                                                type="tel"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Phone"
                                                value={editValues.phone}
                                                onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                                            />
                                        </div>
                                        <textarea
                                            className="textarea textarea-bordered textarea-sm w-full"
                                            rows="2"
                                            placeholder="Notes"
                                            value={editValues.notes}
                                            onChange={(e) => setEditValues({ ...editValues, notes: e.target.value })}
                                        ></textarea>
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                className="btn btn-ghost btn-xs"
                                                onClick={cancelEdit}
                                            >
                                                <IconX className="w-4 h-4" /> Cancel
                                            </button>
                                            <button
                                                className="btn btn-success btn-xs"
                                                onClick={() => saveEdit(guest.id)}
                                            >
                                                <IconCheck className="w-4 h-4" /> Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-base text-base-content truncate">{guest.name}</h3>
                                                {guest.confirmed && (
                                                    <span className="badge badge-success badge-sm">Confirmed</span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                                {guest.email && (
                                                    <div className="flex items-center gap-1 text-xs text-base-content/60">
                                                        <IconMail className="w-3 h-3" />
                                                        <span className="truncate">{guest.email}</span>
                                                    </div>
                                                )}
                                                {guest.phone && (
                                                    <div className="flex items-center gap-1 text-xs text-base-content/60">
                                                        <IconPhone className="w-3 h-3" />
                                                        <span>{guest.phone}</span>
                                                    </div>
                                                )}
                                                {guest.notes && (
                                                    <span className="text-xs text-base-content/40 italic truncate">"{guest.notes}"</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-success checkbox-xs"
                                                checked={guest.confirmed}
                                                onChange={() => toggleConfirmed(guest.id, guest.confirmed)}
                                                title={guest.confirmed ? "Confirmed" : "Mark as confirmed"}
                                            />
                                            <button
                                                className="btn btn-xs btn-ghost btn-square"
                                                onClick={() => startEditing(guest)}
                                                title="Edit guest"
                                            >
                                                <IconPencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                className="btn btn-xs btn-ghost btn-square"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (window.confirm('Are you sure you want to remove this guest?')) {
                                                        deleteGuest(guest.id);
                                                    }
                                                }}
                                                title="Remove guest"
                                            >
                                                <IconTrash className="w-3.5 h-3.5 text-error" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
