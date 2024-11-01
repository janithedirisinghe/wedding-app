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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message
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

  return (
    <div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <div className="flex justify-between m-3">Invite Details</div>

          <table className="table table-zebra">
            <thead>
              <tr>
                <td></td>
                <td>Invite Name</td>
                <td>Phone</td>
                <td>State</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {invitesData.map((invite, index) => (
                <tr key={invite.id}>
                  <td>{index + 1}</td>
                  <td>{invite.name}</td>
                  <td>{invite.phone}</td>
                  <td>{invite.state}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
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
      </div>
    </div>
  );
}
