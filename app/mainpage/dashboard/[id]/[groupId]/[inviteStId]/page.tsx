"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function InvitePage() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { groupId } = useParams() as { groupId: string };
  const { id } = useParams() as { id: string };
  const { inviteStId } = useParams() as { inviteStId: string };

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const response = await fetch(`/api/invitestate?id=${inviteStId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch phone number");
        }
        const data = await response.json();
        setPhoneNumber(data.phone); // Set the phone number in state
        setDescription(data.description); // Set the description in state
        setLoading(false);
      } catch (err) {
        setError("Error fetching phone number");
        setLoading(false);
      }
    };

    fetchPhoneNumber();
  }, [inviteStId]);

  // Generate the invitation link
  const generateInvitationLink = (): string => {
    return `${apiUrl}${description}/${encodeURIComponent(inviteStId)}`;
  };

  const handleShareClick = () => {
    const invitationLink = generateInvitationLink();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      `${message} - Here’s your invitation: ${invitationLink}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Send Invitation</h1>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button onClick={handleShareClick}>Share via WhatsApp</button>
    </div>
  );
}
