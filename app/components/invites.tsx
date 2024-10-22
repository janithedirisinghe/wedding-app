"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import GroupForm from "./groupForm"; // Import the GroupForm component
import GroupTable from "./groupTable"; // Import the GroupTable component

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define the Group interface
interface Group {
    id: number;
    name: string;
    description: string;
}

const InvtesPage: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]); // State to hold fetched groups
    const [currentItems, setCurrentItems] = useState<Group[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const itemsPerPage = 6;

    // Fetch groups from the API
    const fetchGroups = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/groups`); // Adjust the endpoint as necessary
            if (!response.ok) {
                throw new Error("Failed to fetch groups");
            }
            const data: Group[] = await response.json(); // Type assertion
            setGroups(data); // Store fetched groups in state
            setCurrentItems(data.slice(0, itemsPerPage)); // Set initial items for pagination
            // Retrieve userId from localStorage
            const userId = localStorage.getItem('userId');


            if (!userId) {
                console.error('User ID not found in localStorage');
                return;
            }
            console.log(userId);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    // Effect to fetch groups on component mount
    useEffect(() => {
        fetchGroups();
    }, []);

    // Handle page change
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = event.selected * itemsPerPage;
        const currentData = groups.slice(newOffset, newOffset + itemsPerPage);
        setCurrentItems(currentData);
    };

    // Toggle form visibility
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Close form when clicking outside of it
    const handleBackdropClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleForm();
    };

    // Handle group click to show detailed table view
    const handleGroupClick = (group: Group) => {
        setSelectedGroup(group);
    };

    // Handle back to list view
    const handleBackToList = () => {
        setSelectedGroup(null);
    };



    return (
        <div className="p-4">
            <div>
                <button className="btn w-lg p-2 mb-2" onClick={toggleForm}>
                    Create Group
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={handleBackdropClick}></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={toggleForm}>
                            &times;
                        </button>
                        <GroupForm />
                    </div>
                </div>
            )}

            {selectedGroup ? (
                <div>
                    <button className="btn btn-outline mb-4" onClick={handleBackToList}>
                        Back to Groups
                    </button>
                    <GroupTable groupId={selectedGroup.id} />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-center">
                        {currentItems.map((item, index) => (
                            <div key={index} className="bg-base-100 rounded-lg border border-gray-200 p-2 cursor-pointer" onClick={() => handleGroupClick(item)}>
                                {item.name}
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(groups.length / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination flex space-x-2"}
                            activeClassName={"btn btn-primary"}
                            pageClassName={"btn"}
                            previousClassName={"btn btn-outline"}
                            nextClassName={"btn btn-outline"}
                            disabledClassName={"btn-disabled"}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default InvtesPage;
