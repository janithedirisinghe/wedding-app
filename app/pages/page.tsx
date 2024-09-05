import React from 'react';
import Countdown from '../components/countdown';// Ensure you have the Countdown component imported
import GoogleMap from '../components/GoogleMap';
import Navbar from '../components/navbar';

const UserPage: React.FC = () => {
  const weddingDate = '2024-12-12T15:00:00';
  return (
    <div className='p-4 sm:p-6 max-w-md mx-auto satisfy bgColour'>
      {/* <Navbar /> */}
      <div className="relative max-w-48 mx-auto mt-1">
        <img src="/file.png" alt="imgIcon" />
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-3xl fontColour satisfy">Madusha & Isiri</h2>
      </div>
      <p className='text-center p-3 italic roboto fontColour2'>We are delighted to announce the beginning of our lifelong journey together as husband and wife</p>
      <p className='text-center p-3 italic fontColour2'>It is with great joy and love that we invite you to join us in celebrating the union of our hearts in marriage</p>
      <div className="relative max-w-xs mx-auto mt-2">
        <img src="/file (2).png" alt="imgIcon" />
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 text-center fontColour3">
        <div>
          <p>Date</p>
          <p>2024/12/12</p>
        </div>
        <div>
          <p>Venue</p>
          <p>Paradise In bolgoda</p>
        </div>
      </div>
      <p className='text-center p-3 italic font-semibold fontColour4'>
        Please click to RSVP
        Kindly RSVP before 16th January 2024
      </p>
      <div className="relative max-w-xs mx-auto mt-2">
        <img src="/file (2).png" alt="imgIcon" />
      </div>
      <p className='text-center p-3 italic fontColour4'>
        Countdown
      </p>
      <Countdown targetDate="2025-01-01T00:00:00Z" />
      <div className="relative max-w-xs mx-auto mt-2">
        <img src="/file (2).png" alt="imgIcon" />
      </div>
      <p className='text-center p-3 italic fontColour4'>
        Location
      </p>
      <GoogleMap />
    </div>
  );
}

export default UserPage;