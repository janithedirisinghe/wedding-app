"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the types for your data
interface InvitesData {
  id: number;
  name: string;
  phone: string;
  state: string;
  createdAt: string;
  groupId: number;
  userId: number;
}

export default function MygroupDetails() {
  const router = useRouter();
  const { groupId } = useParams() as { groupId: string };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invitesData, setInvitesData] = useState<InvitesData[]>([]);
  const { id } = useParams() as { id: string };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/invites?groupId=${groupId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }
        const data: InvitesData[] = await response.json();
        setInvitesData(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching group data");
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  // Pagination logic
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = invitesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-ring loading-md"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message
  }

  // Function to handle sharing
  const handleShareClick = async (inviteId: number) => {
    try {
      // Send a POST request to update the invite status
      const response = await fetch(`/api/invitestate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "pending",
          inviteId: inviteId,
          groupTemplateId: parseInt(id), // Use id as groupTemplateId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update invite status");
      }

      // Extract inviteStId from the response
      const { inviteStId } = await response.json();
      console.log("Invite status updated successfully with id:", inviteStId);

      // Redirect to the same page with the invite id in the query parameters
      router.push(`/mainpage/dashboard/${id}/${groupId}/${inviteStId}`);
    } catch (err) {
      console.error("Error updating invite status:", err);
      setError("Error updating invite status");
    }
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(invitesData.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <div className="flex justify-between m-3">
          <h1 className="text-xl font-semibold">Invite Details</h1>
        </div>

        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Invite Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">State</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((invite, index) => (
              <tr key={invite.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-6 py-4">{invite.name}</td>
                <td className="px-6 py-4">{invite.phone}</td>
                <td className="px-6 py-4">{invite.state}</td>
                <td className="px-6 py-4">
                  <button
                    className="btn btn-ghost btn-xs text-blue-500 hover:text-blue-700"
                    onClick={() => handleShareClick(invite.id)}
                  >
                    Share
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </button>
            </li>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePageChange(pageNumber + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === pageNumber + 1 ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {pageNumber + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
