import React from 'react';
import Link from 'next/link';
import { GrHomeRounded } from 'react-icons/gr';
import { GrTemplate } from 'react-icons/gr';
import { LuMailOpen } from 'react-icons/lu';

const Sidebar: React.FC = () => {
  return (
    <ul className="menu bg-amber-600 text-white min-h-full w-80 p-4 sideimg gap-2 pt-8 text-md">
      <li>
        <Link href="/dashboard">
            <div className="bg-amber-500 rounded-lg p-2">
              <GrHomeRounded />
            </div>
            Dashboard
        </Link>
      </li>
      <li>
        <Link href="/invites">
      
            <div className="bg-amber-500 rounded-lg p-2">
              <LuMailOpen />
            </div>
            Invites
     
        </Link>
      </li>
      <li>
        <Link href="/templates">
      
            <div className="bg-amber-500 rounded-lg p-2">
              <GrTemplate />
            </div>
            Templates
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
