"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define the types for your data
interface GroupData {
  id: number;
  groupId: number;
  groupName: string;
  description: string;
}

export default function CardDetailPage() {
  const { id } = useParams() as { id: string }; // Fetch the dynamic id (groupTemplateId) from the URL
  const [groupData, setGroupData] = useState<GroupData[]>([]); // State to hold the fetched group data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState<string | null>(null); // State to manage errors

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/mytemplateGroup?groupTemplateId=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }

        const data: GroupData[] = await response.json();
        setGroupData(data); // Set the fetched data to the state
        setLoading(false); // Set loading to false
      } catch (err) {
        setError("Error fetching group data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Fetch data when `id` changes

  if (loading) {
    return <div className="">
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-md"></span>
      </div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <div className="flex justify-between m-3">Group Details</div>

        <table className="table table-zebra">
          <thead>
            <tr>
              <td>ID</td>
              <td>Group Name</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {groupData.map((item, index) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.groupName}</td>
                <td>{item.description}</td>
                <td>
                  <button>
                    <Link href={`/mainpage/dashboard/${id}/${item.groupId}`}>
                      Share
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
