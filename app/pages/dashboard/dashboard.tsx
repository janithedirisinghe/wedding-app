import Sidebar from "@/app/components/sidebar";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top User Info Section */}
        <section className="bg-orange-400 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="ml-4">
                <h2 className="text-white font-semibold text-lg">Esthera Jackson</h2>
                <p className="text-white">esthera@jmmrrp.co</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white px-4 py-2 rounded-md">Overview</button>
              <button className="bg-white px-4 py-2 rounded-md">Teams</button>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mt-6 grid grid-cols-2 gap-6">
          {/* Demographic Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Statistics</h3>
            <p className="text-sm text-gray-500">Demographic</p>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-purple-500 text-2xl font-bold">3.1M</span>
                <span className="text-gray-500">Masculine</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-purple-500 text-2xl font-bold">2.3M</span>
                <span className="text-gray-500">Feminine</span>
              </div>
              {/* Example Chart Placeholder */}
              <div className="mt-4 h-32 bg-purple-200 rounded-md">
                {/* You can replace this with an actual chart later */}
              </div>
            </div>
          </div>

          {/* Views by Country */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Statistics</h3>
            <p className="text-sm text-gray-500">Views by country</p>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">USA</span>
                <span className="text-gray-500">39.11% (+2.98%)</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-blue-500">Canada</span>
                <span className="text-gray-500">28.02% (-2.35%)</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-blue-500">UK</span>
                <span className="text-gray-500">23.13% (+0.14%)</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-blue-500">Australia</span>
                <span className="text-gray-500">5.03% (-1.11%)</span>
              </div>
              {/* Example Chart Placeholder */}
              <div className="mt-4 h-32 bg-blue-200 rounded-md">
                {/* You can replace this with an actual pie chart later */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
