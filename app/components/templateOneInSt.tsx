"use client";
import React, { useEffect, useState } from 'react';
import Countdown from '../components/countdown';
import GoogleMap from '../components/GoogleMap';
import { MdRsvp } from 'react-icons/md';
import { useParams } from 'next/navigation';

interface InviteState {
    inviteStId: number;
    status: string;
    createdAt: string;
    inviteId: number;
    groupTemplateId: number;
    inviteName: string;
    inviteDate: string;
    firstName: string;
    secondName: string;
    location: string;
    rsvpDate: string;
}

const TemplateOneStx = () => {
  const { inviteStId } = useParams() as { inviteStId: string };
  const [inviteState, setInviteState] = useState<InviteState | null>(null);
  const weddingDate = '2024-12-12T15:00:00';

  const fetchInviteState = async () => {
    try {
      const response = await fetch(`/api/invitation?inviteStId=${inviteStId}`);
      const data = await response.json();
      setInviteState(data);
    } catch (error) {
      console.error("Failed to fetch invite state:", error);
    }
  };

  useEffect(() => {
    if (inviteStId) {
      fetchInviteState();
    }
  }, [inviteStId]);

  const handleRSVP = async (status: string) => {
    try {
      const response = await fetch(`/api/invitation?inviteStId=${inviteStId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedInviteState = await response.json();
        setInviteState(updatedInviteState.updatedInviteState); // Update state with new RSVP status
        console.log('RSVP status updated:', updatedInviteState.message);

        // Fetch updated invite state
        fetchInviteState();
      } else {
        console.error('Failed to update RSVP status:', await response.json());
      }
    } catch (error) {
      console.error('Error updating RSVP status:', error);
    }
  };

  if (!inviteState) {
    return <p>Loading...</p>;
  }

  return (
    <div className='ps-3 pe-3 max-w-md mx-auto satisfy bgColour relative'>
      <label htmlFor="my_modal_6" className="btn fixed bottom-4 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-1/3 lg:bottom-10 lg:left-1/3">
        <MdRsvp className="text-2xl" />
      </label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello {inviteState.inviteName}</h3>
          <p className="py-4">Will you be attending?</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn" onClick={() => handleRSVP('attend')}>Yes</label>
            <label htmlFor="my_modal_6" className="btn" onClick={() => handleRSVP('notAttend')}>No</label>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-48 mx-auto mt-1">
        <img src="/file.png" alt="imgIcon" />
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-3xl fontColour satisfy">
          {inviteState.firstName} & {inviteState.secondName}
        </h2>
      </div>
      <p className='text-center p-3 italic roboto fontColour2'>
        We are delighted to announce the beginning of our lifelong journey together as husband and wife
      </p>
      <p className='text-center p-3 italic fontColour2'>
        It is with great joy and love that we invite you to join us in celebrating the union of our hearts in marriage
      </p>
      <div className="relative max-w-xs mx-auto mt-2">
        <img src="/file (2).png" alt="imgIcon" />
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 text-center fontColour3">
        <div>
          <p>Date</p>
          <p>{new Date(inviteState.inviteDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p>Venue</p>
          <p>{inviteState.location}</p>
        </div>
      </div>
      <p className='text-center p-3 italic font-semibold fontColour4'>
        Please click to RSVP
        Kindly RSVP before {new Date(inviteState.rsvpDate).toLocaleDateString()}
      </p>
      <div className="relative max-w-xs mx-auto mt-2">
        <img src="/file (2).png" alt="imgIcon" />
      </div>
      <p className='text-center p-3 italic fontColour4'>
        Countdown
      </p>
      <Countdown targetDate={weddingDate} />
      <div className="relative max-w-xs mx-auto mt-2">
        <img src="/file (2).png" alt="imgIcon" />
      </div>
      <p className='text-center p-3 italic fontColour4'>
        Location
      </p>
      <GoogleMap />
    </div>
  );
};

export default TemplateOneStx;
