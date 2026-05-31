"use client";

import { useState } from "react";
import TemplatesBox from "@/app/components/templateBoard";

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    { id: "all", name: "All Templates", count: 24 },
    { id: "elegant", name: "Elegant", count: 8 },
    { id: "modern", name: "Modern", count: 6 },
    { id: "classic", name: "Classic", count: 5 },
    { id: "rustic", name: "Rustic", count: 3 },
    { id: "floral", name: "Floral", count: 2 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-neutral-800">
            Wedding Templates
          </h1>
          <p className="text-neutral-600 mt-1">
            Choose from our beautiful collection of wedding invitation templates
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Template
          </button>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New
          </button>
        </div>
      </div>

      {/* Featured Templates Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Featured Templates</h2>
          <p className="text-pink-100 mb-6">Discover our most popular and trending wedding invitation designs</p>
          <button className="bg-white text-pink-600 px-6 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors duration-200">
            Explore Featured
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
      </div>

      {/* Search and Filter Bar */}
      <div className="card-elegant">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search templates by name, style, or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field min-w-[150px]"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <div className="flex border border-neutral-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-pink-100 text-pink-600" : "text-neutral-600 hover:bg-neutral-50"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-pink-100 text-pink-600" : "text-neutral-600 hover:bg-neutral-50"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-pink-100 text-pink-700 border-2 border-pink-200"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-2 border-transparent"
            }`}
          >
            {category.name}
            <span className="ml-2 text-xs opacity-75">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="card-elegant">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800">
              Browse Templates
            </h2>
            <p className="text-neutral-600 text-sm mt-1">
              {selectedCategory === "all" ? "All available templates" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} templates`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500">
              Sort by:
            </span>
            <select className="input-field min-w-[120px]">
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="name">Name A-Z</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
        <TemplatesBox />
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-2">
              Design Tips
            </h3>
            <p className="text-neutral-600 mb-4">
              Need help choosing the perfect template? Here are some tips to make your selection:
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                Consider your wedding theme and venue style
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                Choose colors that match your wedding palette
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                Think about your guest list size when selecting layout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
