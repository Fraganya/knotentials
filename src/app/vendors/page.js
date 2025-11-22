"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../lib/supabase/client";
import Link from "next/link";
import { IconChevronLeft, IconPlus, IconX, IconCheck, IconTrash, IconPencil, IconSearch, IconPhone, IconMail } from "@tabler/icons-react";

export default function Vendors() {
    const supabase = createClient();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);
    const [editValues, setEditValues] = useState({ name: "", service: "", contact: "", email: "", cost: "", notes: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [newVendor, setNewVendor] = useState({ name: "", service: "", contact: "", email: "", cost: "", notes: "" });
    const [user, setUser] = useState(null);

    // Common service types for suggestions
    const serviceTypes = [
        "Venue", "Catering", "Photography", "Videography", "DJ/Music", "Band",
        "Florist", "Cake", "Makeup Artist", "Hair Stylist", "Wedding Planner",
        "Decorations", "Lighting", "Transportation", "Officiant", "Rentals"
    ];

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (!user) return;

            const { data, error } = await supabase
                .from('vendors')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setVendors(data || []);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddVendor = async (e) => {
        e.preventDefault();
        if (!newVendor.name.trim() || !newVendor.service.trim() || !user) return;

        setSaving(true);

        try {
            const { data, error } = await supabase
                .from('vendors')
                .insert({
                    user_id: user.id,
                    name: newVendor.name,
                    service: newVendor.service,
                    contact: newVendor.contact || null,
                    email: newVendor.email || null,
                    cost: newVendor.cost ? parseFloat(newVendor.cost) : null,
                    notes: newVendor.notes || null
                })
                .select()
                .single();

            if (error) throw error;

            setVendors([data, ...vendors]);
            setNewVendor({ name: "", service: "", contact: "", email: "", cost: "", notes: "" });
            setIsAdding(false);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error adding vendor:', error);
            alert('Failed to add vendor. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const startEditing = (vendor) => {
        setEditingVendor(vendor.id);
        setEditValues({
            name: vendor.name,
            service: vendor.service,
            contact: vendor.contact || "",
            email: vendor.email || "",
            cost: vendor.cost || "",
            notes: vendor.notes || ""
        });
    };

    const saveEdit = async (vendorId) => {
        if (!editValues.name.trim() || !editValues.service.trim()) return;

        try {
            const { error } = await supabase
                .from('vendors')
                .update({
                    name: editValues.name,
                    service: editValues.service,
                    contact: editValues.contact || null,
                    email: editValues.email || null,
                    cost: editValues.cost ? parseFloat(editValues.cost) : null,
                    notes: editValues.notes || null
                })
                .eq('id', vendorId);

            if (error) throw error;

            setVendors(vendors.map(v =>
                v.id === vendorId ? { ...v, ...editValues, cost: editValues.cost ? parseFloat(editValues.cost) : null } : v
            ));

            setEditingVendor(null);
            setEditValues({ name: "", service: "", contact: "", email: "", cost: "", notes: "" });
        } catch (error) {
            console.error('Error updating vendor:', error);
            alert('Failed to update vendor. Please try again.');
        }
    };

    const cancelEdit = () => {
        setEditingVendor(null);
        setEditValues({ name: "", service: "", contact: "", email: "", cost: "", notes: "" });
    };

    const togglePaid = async (vendorId, currentStatus) => {
        try {
            const { error } = await supabase
                .from('vendors')
                .update({ paid: !currentStatus })
                .eq('id', vendorId);

            if (error) throw error;

            setVendors(vendors.map(v =>
                v.id === vendorId ? { ...v, paid: !currentStatus } : v
            ));
        } catch (error) {
            console.error('Error updating vendor:', error);
        }
    };

    const deleteVendor = async (vendorId) => {
        try {
            const { error } = await supabase
                .from('vendors')
                .delete()
                .eq('id', vendorId);

            if (error) throw error;

            setVendors(vendors.filter(v => v.id !== vendorId));
        } catch (error) {
            console.error('Error deleting vendor:', error);
        }
    };

    // Filter vendors based on search
    const filteredVendors = vendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contact?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalVendors = vendors.length;
    const paidVendors = vendors.filter(v => v.paid).length;
    const totalCost = vendors.reduce((sum, v) => sum + (v.cost || 0), 0);
    const paidCost = vendors.filter(v => v.paid).reduce((sum, v) => sum + (v.cost || 0), 0);

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
                                <h1 className="text-3xl font-bold text-primary mb-1">Vendors</h1>
                                <p className="text-base-content/60">Manage your wedding service providers</p>
                            </div>
                        </div>

                        <div className="bg-base-100 px-4 py-2 rounded-xl shadow-sm border border-base-200 flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Total</span>
                                <span className="text-lg font-bold text-base-content">{totalVendors}</span>
                            </div>
                            <div className="w-px h-8 bg-base-200"></div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Paid</span>
                                <span className="text-lg font-bold text-success">{paidVendors}</span>
                            </div>
                            <div className="w-px h-8 bg-base-200"></div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Cost</span>
                                <span className="text-lg font-bold text-base-content">${totalCost.toLocaleString()}</span>
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
                            placeholder="Search vendors by name, service, or contact..."
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
                                <IconPlus className="w-4 h-4" /> Add Vendor
                            </>
                        )}
                    </button>
                </div>

                {isAdding && (
                    <div className="bg-base-100 p-6 rounded-xl border border-base-200 shadow-sm mb-6 animate-[slideDown_0.3s_ease-out]">
                        <h3 className="text-lg font-semibold mb-4">Add New Vendor</h3>
                        <form onSubmit={handleAddVendor} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Vendor name *"
                                    value={newVendor.name}
                                    onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                                    required
                                    autoFocus
                                    disabled={saving}
                                />
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Service type *"
                                    list="service-types"
                                    value={newVendor.service}
                                    onChange={(e) => setNewVendor({ ...newVendor, service: e.target.value })}
                                    required
                                    disabled={saving}
                                />
                                <datalist id="service-types">
                                    {serviceTypes.map(service => (
                                        <option key={service} value={service} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="tel"
                                    className="input input-bordered w-full"
                                    placeholder="Contact number"
                                    value={newVendor.contact}
                                    onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
                                    disabled={saving}
                                />
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    placeholder="Email (optional)"
                                    value={newVendor.email}
                                    onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                                    disabled={saving}
                                />
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    placeholder="Cost (optional)"
                                    value={newVendor.cost}
                                    onChange={(e) => setNewVendor({ ...newVendor, cost: e.target.value })}
                                    disabled={saving}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows="2"
                                placeholder="Notes (optional)"
                                value={newVendor.notes}
                                onChange={(e) => setNewVendor({ ...newVendor, notes: e.target.value })}
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
                                            <IconCheck className="w-4 h-4" /> Add Vendor
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
                            <span>Vendor added successfully!</span>
                        </div>
                    </div>
                )}

                {vendors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-base-content/60 mb-4">No vendors added yet</p>
                        <p className="text-sm text-base-content/40">Start adding your wedding service providers!</p>
                    </div>
                ) : filteredVendors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-base-content/60 mb-4">No vendors found</p>
                        <p className="text-sm text-base-content/40">Try a different search term</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {filteredVendors.map((vendor) => (
                            <div
                                key={vendor.id}
                                className="bg-base-100 p-3 rounded-lg border border-base-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {editingVendor === vendor.id ? (
                                    // Edit Mode
                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <input
                                                type="text"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Vendor name *"
                                                value={editValues.name}
                                                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                                            />
                                            <input
                                                type="text"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Service type *"
                                                list="service-types-edit"
                                                value={editValues.service}
                                                onChange={(e) => setEditValues({ ...editValues, service: e.target.value })}
                                            />
                                            <datalist id="service-types-edit">
                                                {serviceTypes.map(service => (
                                                    <option key={service} value={service} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                            <input
                                                type="tel"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Contact"
                                                value={editValues.contact}
                                                onChange={(e) => setEditValues({ ...editValues, contact: e.target.value })}
                                            />
                                            <input
                                                type="email"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Email"
                                                value={editValues.email}
                                                onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                                            />
                                            <input
                                                type="number"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Cost"
                                                value={editValues.cost}
                                                onChange={(e) => setEditValues({ ...editValues, cost: e.target.value })}
                                                min="0"
                                                step="0.01"
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
                                                onClick={() => saveEdit(vendor.id)}
                                            >
                                                <IconCheck className="w-4 h-4" /> Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="font-semibold text-base text-base-content truncate">{vendor.name}</h3>
                                                <span className="badge badge-primary badge-sm">{vendor.service}</span>
                                                {vendor.paid && (
                                                    <span className="badge badge-success badge-sm">Paid</span>
                                                )}
                                                {vendor.cost && (
                                                    <span className="text-sm font-semibold text-base-content">${vendor.cost.toLocaleString()}</span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                                {vendor.contact && (
                                                    <div className="flex items-center gap-1 text-xs text-base-content/60">
                                                        <IconPhone className="w-3 h-3" />
                                                        <span>{vendor.contact}</span>
                                                    </div>
                                                )}
                                                {vendor.email && (
                                                    <div className="flex items-center gap-1 text-xs text-base-content/60">
                                                        <IconMail className="w-3 h-3" />
                                                        <span className="truncate">{vendor.email}</span>
                                                    </div>
                                                )}
                                                {vendor.notes && (
                                                    <span className="text-xs text-base-content/40 italic truncate">"{vendor.notes}"</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            {vendor.cost && (
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-success checkbox-xs"
                                                    checked={vendor.paid}
                                                    onChange={() => togglePaid(vendor.id, vendor.paid)}
                                                    title={vendor.paid ? "Paid" : "Mark as paid"}
                                                />
                                            )}
                                            <button
                                                className="btn btn-xs btn-ghost btn-square"
                                                onClick={() => startEditing(vendor)}
                                                title="Edit vendor"
                                            >
                                                <IconPencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                className="btn btn-xs btn-ghost btn-square"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (window.confirm('Are you sure you want to remove this vendor?')) {
                                                        deleteVendor(vendor.id);
                                                    }
                                                }}
                                                title="Remove vendor"
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
