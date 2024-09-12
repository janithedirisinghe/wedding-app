import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import InvtesPage from '../components/invites';

const UserPage: React.FC = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar and Page content */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">
          Open drawer
        </label>
        <InvtesPage />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default UserPage;
