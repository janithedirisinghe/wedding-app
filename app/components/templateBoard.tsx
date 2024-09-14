"use client";
import React, { useState } from "react";

const Templates = [
  { id: 1, image: "https://via.placeholder.com/150", description: "This is the description of the image" },
  { id: 2, image: "https://via.placeholder.com/150", description: "This is the description of the image" },
  { id: 3, image: "https://via.placeholder.com/150", description: "This is the description of the image" },
  { id: 4, image: "https://via.placeholder.com/150", description: "This is the description of the image" },
  { id: 5, image: "https://via.placeholder.com/150", description: "This is the description of the image" },
  { id: 6, image: "https://via.placeholder.com/150", description: "This is the description of the image" },
  { id: 7, image: "https://via.placeholder.com/150", description: "This is the description of the image" },
];

const TemplatesBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {Templates.map((template) => (
        <div className="p-4 sm:p-6 bgColour rounded-lg border border-gray-200 m-2" key={template.id}>
          <div className="grid grid-cols-4">
            <div onClick={() => openModal(template.image)}>
              <img src={template.image} alt="template" />
            </div>
            <div className="col-span-3">
              {template.description}
              <div className="pt-4">
                <button className="bg-blue-200 text-white rounded-lg px-2 py-1">Use Template</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for opening image */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Selected Image</h2>
              <button onClick={closeModal} className="text-red-500">Close</button>
            </div>
            <img src={selectedImage} alt="Selected Template" className="max-w-full h-auto" />
          </div>
        </div>
      )}
    </>
  );
};

export default TemplatesBox;
