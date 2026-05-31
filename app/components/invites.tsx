"use client";
import React, { useEffect, useState } from "react";
import GroupForm from "./groupForm";
import GroupTable from "./groupTable";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Group {
    id: number;
    name: string;
    description: string;
    memberCount?: number;
    lastUpdated?: string;
    status?: 'active' | 'inactive';
}

const InvtesPage: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentItems, setCurrentItems] = useState<Group[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 8;

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/api/groups`);
            if (!response.ok) {
                throw new Error("Failed to fetch groups");
            }
            const data: Group[] = await response.json();
            // Mock additional data for better UI
            const enhancedData = data.map(group => ({
                ...group,
                memberCount: Math.floor(Math.random() * 50) + 1,
                lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                status: Math.random() > 0.2 ? 'active' as const : 'inactive' as const
            }));
            setGroups(enhancedData);
            setCurrentItems(enhancedData.slice(0, itemsPerPage));
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const newOffset = page * itemsPerPage;
        const currentData = filteredGroups.slice(newOffset, newOffset + itemsPerPage);
        setCurrentItems(currentData);
    };

    useEffect(() => {
        const currentData = filteredGroups.slice(0, itemsPerPage);
        setCurrentItems(currentData);
        setCurrentPage(0);
    }, [searchTerm, groups, filteredGroups]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleForm();
    };

    const handleGroupClick = (group: Group) => {
        setSelectedGroup(group);
    };

    const handleBackToList = () => {
        setSelectedGroup(null);
    };

    const pageCount = Math.ceil(filteredGroups.length / itemsPerPage);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading guest groups...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search groups..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>
                </div>
                <button 
                    className="btn-primary"
                    onClick={toggleForm}
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Group
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleBackdropClick}></div>
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                            onClick={toggleForm}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="mb-6">
                            <h3 className="font-heading text-xl font-semibold text-neutral-800">
                                Create New Group
                            </h3>
                            <p className="text-neutral-600 text-sm mt-1">
                                Organize your guests into groups for easier management
                            </p>
                        </div>
                        <GroupForm />
                    </div>
                </div>
            )}

            {/* Group Detail View */}
            {selectedGroup ? (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <button 
                            className="btn-secondary"
                            onClick={handleBackToList}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Groups
                        </button>
                        <div>
                            <h2 className="font-heading text-xl font-semibold text-neutral-800">
                                {selectedGroup.name}
                            </h2>
                            <p className="text-neutral-600 text-sm">
                                {selectedGroup.description}
                            </p>
                        </div>
                    </div>
                    <GroupTable groupId={selectedGroup.id} />
                </div>
            ) : (
                <>
                    {/* Groups Grid */}
                    {currentItems.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-lg font-medium text-neutral-800 mb-2">
                                No groups found
                            </h3>
                            <p className="text-neutral-600 mb-6">
                                {searchTerm ? "No groups match your search." : "Create your first guest group to get started."}
                            </p>
                            {!searchTerm && (
                                <button 
                                    className="btn-primary"
                                    onClick={toggleForm}
                                >
                                    Create Your First Group
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentItems.map((group) => (
                                <div 
                                    key={group.id}
                                    className="card-elegant cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                                    onClick={() => handleGroupClick(group)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-heading text-lg font-semibold text-neutral-800 group-hover:text-pink-600 transition-colors duration-200">
                                                {group.name}
                                            </h3>
                                            <p className="text-neutral-600 text-sm mt-1 line-clamp-2">
                                                {group.description}
                                            </p>
                                        </div>
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                                            group.status === 'active' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-neutral-100 text-neutral-700'
                                        }`}>
                                            {group.status}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm text-neutral-600">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                            <span>{group.memberCount} members</span>
                                        </div>
                                        <span className="text-xs">
                                            {group.lastUpdated}
                                        </span>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-neutral-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-neutral-500">
                                                Click to view details
                                            </span>
                                            <svg className="w-4 h-4 text-neutral-400 group-hover:text-pink-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                                disabled={currentPage === 0}
                                className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            
                            {Array.from({ length: pageCount }, (_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                        currentPage === index 
                                            ? "bg-pink-600 text-white shadow-md" 
                                            : "border border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                                    }`}
                                    onClick={() => handlePageChange(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            
                            <button
                                onClick={() => handlePageChange(Math.min(pageCount - 1, currentPage + 1))}
                                disabled={currentPage === pageCount - 1}
                                className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default InvtesPage;
