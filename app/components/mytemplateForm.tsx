"use client";
import { useParams, useRouter } from 'next/navigation';

import React, { useState, useEffect } from 'react';

interface Group {
  id: string;
  name: string;
}

export default function MyTemplatesForm() {
  const [step, setStep] = useState(1); // Step state to control the current step
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [location, setVenue] = useState("");
  const [rsvpDate, setRsvpDate] = useState("");
  const [inviteDate, setDate] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [groupTemplateId, setGroupTemplateId] = useState<number | null>(null); // Store groupTemplateId here
  const router = useRouter();

  const { templateId: templateIdParam } = useParams() as { templateId: string };
  const templateId = parseInt(templateIdParam, 10);

  useEffect(() => {
    // Fetch groups from the backend for step 2
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  // Handle the first form submission (Step 1)
  const handleFirstFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Replace with actual API base URL
    const uId = localStorage.getItem('userId');
    const userId = uId ? parseInt(uId, 10) : null;
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    // Debugging: Log the value of templateId
    console.log('templateId:', templateId);

    const formData = {
      firstName,
      secondName,
      location,
      rsvpDate: new Date(rsvpDate).toISOString(),
      templateId,
      inviteDate: new Date(inviteDate).toISOString(),
      userId,
    };

    try {
      const response = await fetch(`${apiUrl}/api/mytemplate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(formData);
        throw new Error('Failed to submit first form');
      }

      const  createdTemplateId  = await response.json(); // Assuming the response contains the createdTemplateId
      console.log('Created template ID:', createdTemplateId);

      // Store groupTemplateId in the state
      setGroupTemplateId(createdTemplateId);

      console.log('First form submitted successfully');
      setStep(2); // Move to step 2 (Groups form) on successful submission
    } catch (error) {
      console.error('Error submitting first form', error);
    }
  };

  // Handle the second form submission (Step 2)
  const handleSecondFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Replace with actual API base URL
    if (!groupTemplateId) {
      console.error('Group template ID not found');
      return;
    }

    try {
      for (const groupId of selectedGroupIds) {
        const formData = {
          groupId,
          groupTemplateId, // Use the stored groupTemplateId from state
        };

        const response = await fetch(`${apiUrl}/api/mytemplateGroup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit group ID: ${groupId}`);
        }

        console.log(`Group ID ${groupId} submitted successfully`);
      }
      router.push('/mainpage');
    } catch (error) {
      console.error('Error submitting second form', error);
    }
  };

  const handleCheckboxChange = (groupId: string) => {
    setSelectedGroupIds((prevSelectedGroupIds) =>
      prevSelectedGroupIds.includes(groupId)
        ? prevSelectedGroupIds.filter((id) => id !== groupId)
        : [...prevSelectedGroupIds, groupId]
    );
  };

  return (
    <div>
      <ul className="steps">
        <li className={`step ${step === 1 ? 'step-primary' : ''}`}>Template Details</li>
        <li className={`step ${step === 2 ? 'step-primary' : ''}`}>Groups</li>
      </ul>

      {/* Step 1: Template Details Form */}
      {step === 1 && (
        <form className="bg-white p-6 rounded shadow-md mb-6" onSubmit={handleFirstFormSubmit}>
          <h2 className="text-xl font-semibold mb-4">Template Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter the first name"
              />
            </div>
            <div>
              <label htmlFor="second-name" className="block mb-2 text-sm font-medium text-gray-900">
                Second Name
              </label>
              <input
                type="text"
                id="second-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter the second name"
                required
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="venue" className="block mb-2 text-sm font-medium text-gray-900">
                Venue
              </label>
              <input
                type="text"
                id="venue"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter the venue"
                required
                value={location}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="rsvpdate" className="block mb-2 text-sm font-medium text-gray-900">
                RSVP Date
              </label>
              <input
                type="date"
                id="rsvpdate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                value={rsvpDate}
                onChange={(e) => setRsvpDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={inviteDate}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      )}

      {/* Step 2: Groups Form */}
      {step === 2 && (
        <form className="bg-white p-6 rounded shadow-md mb-6" onSubmit={handleSecondFormSubmit}>
          <h2 className="text-xl font-semibold mb-4">Select Groups</h2>
          <div className="grid grid-cols-1 gap-2">
            {groups.map((group) => (
              <div key={group.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={group.id}
                  checked={selectedGroupIds.includes(group.id)}
                  onChange={() => handleCheckboxChange(group.id)}
                  className="mr-2"
                />
                <label htmlFor={group.id} className="text-sm font-medium text-gray-900">
                  {group.name}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Groups
          </button>
        </form>
      )}
    </div>
  );
}
