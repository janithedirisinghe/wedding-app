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

  if (loading) return <div className="text-center py-10 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-10 text-xl text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg mt-3">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Send Invitation</h1>
      
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          id="phone"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your custom message"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
        />
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleShareClick}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Share via WhatsApp
        </button>
      </div>
    </div>
  );
}
