import React, { useState } from 'react';

const GroupForm = () => {
    // State for the form inputs
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Get your API base URL

        // Retrieve userId from localStorage
        const userId = localStorage.getItem('userId');
        

        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }


        // Create the group data object with the specified keys
        const groupData = {
            name: groupName,        // Use "name" for group name
            description: description,
            userId: parseInt(userId) // Use "description" for group description
        };

        try {
            const response = await fetch(`${apiUrl}/api/groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify(groupData), // Send the updated group data
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            // Optionally reset the form
            setGroupName('');
            setDescription('');

            // Optionally, you could add a success message here or handle the response
            console.log('Group created successfully');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="group_name"
                    id="group_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)} // Update state on input change
                    required
                />
                <label
                    htmlFor="group_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Group Name
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="group_description"
                    id="group_description"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} // Update state on input change
                    required
                />
                <label
                    htmlFor="group_description"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Group Description
                </label>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Create Group
            </button>
        </form>
    );
};

export default GroupForm;
