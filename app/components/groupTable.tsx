"use client";

import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ReactPaginate from "react-paginate";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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

const GroupTable = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("active"); // Default state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  // Fetch invites on component mount
  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = () => {
    fetch(`${apiUrl}/api/invites`)
      .then((response) => response.json())
      .then((data) => setInvites(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvite = { name, phone, state };

    fetch(`${apiUrl}/api/invites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInvite),
    })
      .then((response) => response.json())
      .then((data) => {
        setInvites([...invites, data]); // Add new invite to state
        setName(""); // Reset form fields
        setPhone("");
        setEmail("");
        setState("active");
      })
      .catch((error) => console.error("Error adding invite:", error));
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
            <MdOutlineDeleteOutline className="text-lg text-red-500 cursor-pointer hover:text-red-700" />
          </div>
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
              id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter the name"/>
          </div>
          <div>
            <label htmlFor="phone-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                  <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                </svg>
              </div>
              <input type="text" id="phone-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="0\d{9}" placeholder="0xxxxxxxxx" required value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the email if have"/>
          </div>
          <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select value={state}
              onChange={(e) => setState(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Vacation">Vacation</option>
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
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center items-center mt-6"}
          pageClassName={"mx-1"}
          pageLinkClassName={
            "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
          }
          previousLinkClassName={
            "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
          }
          nextLinkClassName={
            "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
          }
          activeLinkClassName={"bg-blue-500 text-white"}
        />
      </div>
    </div>
  );
};

export default GroupTable;
