import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";

// Define columns and users data
const columns = [
  { name: "Name", uid: "name" },
  { name: "Telephone", uid: "telephone" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "John Doe",
    telephone: "+1234567890",
    status: "active",
    avatar: "/avatars/avatar1.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    telephone: "+0987654321",
    status: "paused",
    avatar: "/avatars/avatar2.png",
  },
  {
    id: 3,
    name: "Mark Taylor",
    telephone: "+1122334455",
    status: "vacation",
    avatar: "/avatars/avatar3.png",
  },
];

const statusColorMap: { [key: string]: string } = {
  active: "bg-green-100 text-green-700",
  paused: "bg-red-100 text-red-700",
  vacation: "bg-yellow-100 text-yellow-700",
};

const GroupTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvite, setNewInvite] = useState({ name: "", telephone: "", status: "" });

  const renderCell = (user: any, columnKey: string) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-semibold">{cellValue}</div>
              <div className="text-gray-500">{user.telephone}</div>
            </div>
          </div>
        );
      case "telephone":
        return <span>{cellValue}</span>;
      case "status":
        return (
          <span className={`px-2 py-1 rounded text-sm font-medium capitalize ${statusColorMap[user.status]}`}>
            {cellValue}
          </span>
        );
      case "actions":
        return (
          <div className="flex space-x-2">
            <IoEyeOutline className="text-lg text-gray-500 cursor-pointer hover:text-blue-500" />
            <RiEditLine className="text-lg text-gray-500 cursor-pointer hover:text-yellow-500" />
            <MdOutlineDeleteOutline className="text-lg text-red-500 cursor-pointer hover:text-red-700" />
          </div>
        );
      default:
        return cellValue;
    }
  };

  // Handle modal form submission
  const handleAddInvite = () => {
    console.log("New Invite:", newInvite);
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Group Invites</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Add Invite
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.uid}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              {columns.map((column) => (
                <td key={column.uid} className="px-6 py-4 whitespace-nowrap">
                  {renderCell(user, column.uid)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add Invite */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Invite</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newInvite.name}
                  onChange={(e) => setNewInvite({ ...newInvite, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telephone</label>
                <input
                  type="text"
                  value={newInvite.telephone}
                  onChange={(e) => setNewInvite({ ...newInvite, telephone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                  placeholder="Enter telephone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newInvite.status}
                  onChange={(e) => setNewInvite({ ...newInvite, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleAddInvite}
              >
                Add Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupTable;
