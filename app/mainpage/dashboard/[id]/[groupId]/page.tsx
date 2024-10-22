"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

//Define the types for your data
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
  const { groupId } = useParams() as { groupId: string };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invitesData, setInvitesData] = useState<InvitesData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(`/api/invites?groupId=${groupId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }
        const data: InvitesData[] = await response.json();
        setInvitesData(data);
        setLoading(false);
      }catch(err){
        setError("Error fetching group data");
        setLoading(false);
      }
    }

    fetchData();
  }, [groupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }


  return (
    <div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <div className='flex justify-between m-3'>Invite Details</div>

          <table className="table table-xs table-pin-rows table-pin-cols">
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
                  <button>
                    <Link href='#'>
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
    </div>
  );
}

