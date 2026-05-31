"use client";

import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ReactPaginate from "react-paginate";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GroupTableProps {
  groupId: number; // Add this line
}

interface Invite {
  id: number;
  name: string;
  phone: string;
  email: string;
  state: string;
  createdAt: string;
}

const statusColorMap: { [key: string]: string } = {
  active: "bg-green-100 text-green-700",
  paused: "bg-red-100 text-red-700",
  vacation: "bg-yellow-100 text-yellow-700",
};

const GroupTable: React.FC<GroupTableProps> = ({ groupId }) => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  const [state, setState] = useState("active"); // Default state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  // Fetch invites on component mount
  useEffect(() => {
    fetchInvites();
  }, [groupId]); // Add groupId as a dependency

  const fetchInvites = () => {
    fetch(`${apiUrl}/api/invites?groupId=${groupId}`) // Adjust the endpoint as necessary
      .then((response) => response.json())
      .then((data) => setInvites(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Retrieve userId from localStorage
  const userId = Number(localStorage.getItem('userId'));

  if (!userId) {
      console.error('User ID not found in localStorage');
      return;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvite = { name, phone, state ,groupId, userId}; // Include email in the new invite

    fetch(`${apiUrl}/api/invites?groupId=${groupId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInvite),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setInvites([...invites, data]); // Add new invite to state
        setName(""); // Reset form fields
        setPhone("");
         // Reset email
        setState("active");
      })
      .catch((error) => console.error("Error adding invite:", error));
  };

  const handleDeleteInvite = (inviteId: number) => {
    fetch(`${apiUrl}/api/invites?id=${inviteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting invite');
        }
        setInvites(invites.filter((invite) => invite.id !== inviteId)); // Remove invite from the state
      })
      .catch((error) => console.error("Error deleting invite:", error));
  };

  const renderCell = (invite: Invite, columnKey: string) => {
    const cellValue = invite[columnKey as keyof Invite];
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-semibold">{cellValue}</div>
              <div className="text-gray-500">{invite.phone}</div>
            </div>
          </div>
        );
      case "telephone":
        return <span>{invite.phone}</span>;
      case "status":
        return (
          <span className={`px-2 py-1 rounded text-sm font-medium capitalize ${statusColorMap[invite.state]}`}>
            {cellValue}
          </span>
        );
      case "actions":
        return (
          <div className="flex space-x-2">
            <IoEyeOutline className="text-lg text-gray-500 cursor-pointer hover:text-blue-500" />
            <RiEditLine className="text-lg text-gray-500 cursor-pointer hover:text-yellow-500" />
            <MdOutlineDeleteOutline
              className="text-lg text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => handleDeleteInvite(invite.id)} // Call delete function on click
            />  </div>
        );
      default:
        return cellValue;
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const paginatedInvites = invites.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Group Invites</h1>
      </div>

      {/* Add Invite Form */}
      <form className="bg-white p-6 rounded shadow-md mb-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Add New Invite</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter the name"
            />
          </div>
          <div>
            <label htmlFor="phone-input" className="block mb-2 text-sm font-medium text-gray-900">Phone number:</label>
            <div className="relative">
              <input
                type="text"
                id="phone-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                pattern="0\d{9}"
                placeholder="0xxxxxxxxx"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter the email if have"
            />
          </div>
          <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="vacation">Vacation</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Invite
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telephone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedInvites.map((invite) => (
            <tr key={invite.id}>
              <td className="px-6 py-4 whitespace-nowrap">{renderCell(invite, "name")}</td>
              <td className="px-6 py-4 whitespace-nowrap">{renderCell(invite, "telephone")}</td>
              <td className="px-6 py-4 whitespace-nowrap">{renderCell(invite, "status")}</td>
              <td className="px-6 py-4 whitespace-nowrap">{renderCell(invite, "actions")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={Math.ceil(invites.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center mt-4"}
          pageClassName={"mx-1"}
          previousClassName={"mx-1"}
          nextClassName={"mx-1"}
          activeClassName={"font-bold"}
          disabledClassName={"text-gray-400"}
        />
      </div>
    </div>
  );
};

export default GroupTable;
