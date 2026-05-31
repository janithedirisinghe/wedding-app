/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState } from "react";

const Templates = [
  {
    templateId: 1,
    name: "Elegant Rose",
    image: "https://via.placeholder.com/300x400/ff69b4/ffffff?text=Elegant+Rose",
    description: "Beautiful elegant design with rose motifs perfect for romantic weddings",
    category: "elegant",
    price: "Free",
    features: ["Customizable colors", "RSVP integration", "Mobile responsive"],
    link: `/mywebs`,
  },
  {
    templateId: 2,
    name: "Modern Minimalist",
    image: "https://via.placeholder.com/300x400/4a90e2/ffffff?text=Modern+Minimal",
    description: "Clean and modern design with minimalist aesthetics for contemporary couples",
    category: "modern",
    price: "Pro",
    features: ["Animation effects", "Custom fonts", "Gallery support"],
    link: `/mywebs`,
  },
  {
    templateId: 3,
    name: "Classic Vintage",
    image: "https://via.placeholder.com/300x400/8b4513/ffffff?text=Classic+Vintage",
    description: "Timeless vintage style with classic typography and ornamental details",
    category: "classic",
    price: "Free",
    features: ["Vintage fonts", "Ornamental borders", "Traditional layout"],
    link: `/mywebs`,
  },
  {
    templateId: 4,
    name: "Rustic Charm",
    image: "https://via.placeholder.com/300x400/228b22/ffffff?text=Rustic+Charm",
    description: "Rustic and natural design perfect for outdoor and countryside weddings",
    category: "rustic",
    price: "Pro",
    features: ["Wood textures", "Nature themes", "Custom illustrations"],
    link: `/mywebs`,
  },
  {
    templateId: 5,
    name: "Floral Garden",
    image: "https://via.placeholder.com/300x400/ff1493/ffffff?text=Floral+Garden",
    description: "Beautiful floral patterns and garden-inspired designs",
    category: "floral",
    price: "Free",
    features: ["Botanical illustrations", "Spring colors", "Garden motifs"],
    link: `/mywebs`,
  },
  {
    templateId: 6,
    name: "Royal Luxury",
    image: "https://via.placeholder.com/300x400/ffd700/000000?text=Royal+Luxury",
    description: "Luxurious and sophisticated design with gold accents",
    category: "elegant",
    price: "Premium",
    features: ["Gold foil effects", "Premium typography", "Luxury styling"],
    link: `/mywebs`,
  }
];

const TemplatesBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof Templates[0] | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

  const openModal = (template: typeof Templates[0]) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case "Free": return "bg-green-100 text-green-700";
      case "Pro": return "bg-blue-100 text-blue-700";
      case "Premium": return "bg-purple-100 text-purple-700";
      default: return "bg-neutral-100 text-neutral-700";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Templates.map((template) => (
          <div 
            key={template.templateId}
            className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            onMouseEnter={() => setHoveredTemplate(template.templateId)}
            onMouseLeave={() => setHoveredTemplate(null)}
          >
            {/* Template Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src={template.image} 
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <button
                    onClick={() => openModal(template)}
                    className="w-full bg-white/90 backdrop-blur-sm text-neutral-800 py-2 rounded-lg font-medium hover:bg-white transition-colors duration-200"
                  >
                    Quick Preview
                  </button>
                </div>
              </div>
              
              {/* Price Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriceColor(template.price)}`}>
                  {template.price}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-neutral-700 capitalize">
                  {template.category}
                </span>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="mb-3">
                <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-1">
                  {template.name}
                </h3>
                <p className="text-neutral-600 text-sm line-clamp-2">
                  {template.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 2).map((feature, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 2 && (
                    <span className="text-xs text-neutral-500">
                      +{template.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link href={template.link} className="flex-1">
                  <button className="w-full btn-secondary text-sm py-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Demo
                  </button>
                </Link>
                <Link href={`/mainpage/templates/${template.templateId}`} className="flex-1">
                  <button className="w-full btn-primary text-sm py-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Use
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div>
                <h2 className="font-heading text-xl font-semibold text-neutral-800">
                  {selectedTemplate.name}
                </h2>
                <p className="text-neutral-600 text-sm mt-1">
                  Template Preview
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[70vh] overflow-auto">
              {/* Image */}
              <div className="p-6">
                <img 
                  src={selectedTemplate.image} 
                  alt={selectedTemplate.name}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Details */}
              <div className="p-6 lg:border-l border-neutral-200">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-2">
                      About This Template
                    </h3>
                    <p className="text-neutral-600">
                      {selectedTemplate.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-neutral-800 mb-3">Features Included</h4>
                    <div className="space-y-2">
                      {selectedTemplate.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-neutral-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-sm text-neutral-500">Category</span>
                      <p className="font-medium text-neutral-800 capitalize">{selectedTemplate.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-500">Pricing</span>
                      <p className={`font-medium ${
                        selectedTemplate.price === 'Free' ? 'text-green-600' : 
                        selectedTemplate.price === 'Pro' ? 'text-blue-600' : 'text-purple-600'
                      }`}>
                        {selectedTemplate.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Link href={selectedTemplate.link} className="flex-1">
                      <button className="w-full btn-secondary">
                        View Demo
                      </button>
                    </Link>
                    <Link href={`/mainpage/templates/${selectedTemplate.templateId}`} className="flex-1">
                      <button className="w-full btn-primary">
                        Use Template
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplatesBox;
