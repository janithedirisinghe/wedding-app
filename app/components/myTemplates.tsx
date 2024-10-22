"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Define the types for the data
interface MyTemplates {
  id: number;
  firstName: string;
  secondName: string;
}

const ITEMS_PER_PAGE = 4;

const MyTemplates: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [templates, setTemplates] = useState<MyTemplates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get User ID from localStorage
  useEffect(() => {
    const uId = localStorage.getItem("userId");
    const userId = uId ? parseInt(uId, 10) : null;

    if (userId) {
      // Fetch templates by userId using the native fetch API
      const fetchTemplates = async () => {
        try {
          const response = await fetch(`/api/mytemplate?userId=${userId}`);

          if (!response.ok) {
            throw new Error("Failed to fetch templates.");
          }

          const data: MyTemplates[] = await response.json();

          if (data && data.length > 0) {
            setTemplates(data); // Set the fetched data to the state
          } else {
            setTemplates([]); // If no templates, set an empty array
          }
        } catch (err) {
          console.error("Error fetching templates:", err);
          setError("Failed to fetch templates.");
        } finally {
          setLoading(false); // Mark loading as complete
        }
      };

      fetchTemplates();
    } else {
      console.error("User ID not found in localStorage");
      setError("User ID not found.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!templates.length) {
    return <div>No templates found for this user.</div>;
  }

  // Calculate the items for the current page
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = templates.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(templates.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-3">
      <h2 className="text-xl font-bold">My Templates</h2>
      {/* Horizontal Scrollable Cards */}
      <div className="flex overflow-x-auto space-x-4 py-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {/* Link to dynamic page with ID in URL */}
            <Link href={`/mainpage/dashboard/${item.id}`}>
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={"https://via.placeholder.com/150"}
                alt={`${item.firstName} ${item.secondName}`}
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {`${item.firstName} ${item.secondName}`}
                </h5>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Custom Pagination */}
      <div className="join mt-4 flex justify-center">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            className={`join-item btn ${currentPage === index ? "btn-active" : ""}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyTemplates;
