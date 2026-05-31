import React from 'react';
import Countdown from '../components/countdown';// Ensure you have the Countdown component imported
import GoogleMap from '../components/GoogleMap';
import { MdRsvp } from "react-icons/md";

const TemplateOne = () => {
  const weddingDate = '2024-12-12T15:00:00';
  return (
    <div className='ps-3 pe-3 max-w-md mx-auto satisfy bgColour relative'>

      {/* Modal for the RSVP */}
      <label htmlFor="my_modal_7" className="btn fixed bottom-4 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-1/3 lg:bottom-10 lg:left-1/3">
        <MdRsvp className="text-2xl" />
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello </h3>
          <p className="py-4">Will you be attending?</p>
          <div className="modal-action">
          <button className="btn">Yes</button>
          <button className="btn">No</button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>
      
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

export default TemplateOne;