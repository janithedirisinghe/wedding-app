import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

const SendInviteForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  // Generate the invitation link
  const generateInvitationLink = (): string => {
    const baseUrl = 'https://yourwebsite.com/invite';
    const phoneParam = encodeURIComponent(phoneNumber);
    return `${baseUrl}?phone=${phoneParam}`;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Generate the WhatsApp message URL
    const invitationLink = generateInvitationLink();
    const fullMessage = `${message} - Here’s your invitation: ${invitationLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(fullMessage)}`;

    // Redirect to WhatsApp URL
    router.push(whatsappUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter custom message"
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Send via WhatsApp
      </button>
    </form>
  );
};

export default SendInviteForm;

