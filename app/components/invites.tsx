"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import GroupForm from "./groupForm"; // Import the GroupForm component
import GroupTable from "./groupTable"; // Import the GroupTable component

const InvtesPage = () => {
    // Simulated dummy data
    const data = [
        { groupName: "Group A", description: "Description for Group A", invites: 50 },
        { groupName: "Group B", description: "Description for Group B", invites: 40 },
        { groupName: "Group C", description: "Description for Group C", invites: 30 },
        { groupName: "Group D", description: "Description for Group D", invites: 25 },
        { groupName: "Group E", description: "Description for Group E", invites: 60 },
        { groupName: "Group F", description: "Description for Group F", invites: 70 },
        { groupName: "Group G", description: "Description for Group G", invites: 80 },
        { groupName: "Group H", description: "Description for Group H", invites: 90 },
        { groupName: "Group I", description: "Description for Group I", invites: 100 },
        { groupName: "Group J", description: "Description for Group J", invites: 20 },
        { groupName: "Group K", description: "Description for Group K", invites: 15 },
        { groupName: "Group L", description: "Description for Group L", invites: 35 },
    ];

    const itemsPerPage = 6; // Number of items per page
    const [currentItems, setCurrentItems] = useState(data.slice(0, itemsPerPage));
    const [showForm, setShowForm] = useState(false); // State to manage form visibility
    const [selectedGroup, setSelectedGroup] = useState(null); // State to manage selected group

    // Handle page change
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = event.selected * itemsPerPage;
        const currentData = data.slice(newOffset, newOffset + itemsPerPage);
        setCurrentItems(currentData);
    };

    // Toggle form visibility
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Close form when clicking outside of it
    const handleBackdropClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop the click event from closing the form if clicking inside it
        toggleForm();
    };

    // Handle group click to show detailed table view
    const handleGroupClick = (group: any) => {
        setSelectedGroup(group);
    };

    // Handle back to list view
    const handleBackToList = () => {
        setSelectedGroup(null);
    };

    return (
        <div className="p-4">
            <div className="">
                <button className="btn w-lg p-2 mb-2" onClick={toggleForm}>
                    Create Group
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={handleBackdropClick}
                    ></div>

                    {/* Form */}
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={toggleForm}
                        >
                            &times;
                        </button>
                        <GroupForm />
                    </div>
                </div>
            )}

            {/* If a group is selected, show the table */}
            {selectedGroup ? (
                <div>
                    <button className="btn btn-outline mb-4" onClick={handleBackToList}>
                        Back to Groups
                    </button>
                    {/* Show GroupTable */}
                    <GroupTable />
                </div>
            ) : (
                <>
                    {/* Paginated items */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-center">
                        {currentItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-base-100 rounded-lg border border-gray-200 p-2 cursor-pointer"
                                onClick={() => handleGroupClick(item)} // Click event to show group details
                            >
                                {item.groupName}
                                <p>{item.description}</p>
                                <p><strong>Invites:</strong> {item.invites}</p>
                            </div>
                        ))}
                    </div>

                    {/* React Paginate controls */}
                    <div className="flex justify-center mt-4">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(data.length / itemsPerPage)}
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
