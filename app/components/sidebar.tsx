import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { GrTemplate } from "react-icons/gr";
import { LuMailOpen } from "react-icons/lu";

const Sidebar = () => {
  return (
    <ul className="menu bg-amber-600 text-white min-h-full w-80 p-4 sideimg gap-2 pt-8 text-md">
      <li><a  className=''> <div className='bg-amber-500 rounded-lg p-2'><GrHomeRounded /></div>Dashboard</a></li>
      <li><a className=''> <div className='bg-amber-500 rounded-lg p-2'><LuMailOpen /> </div>Invites</a></li>
      <li><a className=''> <div className='bg-amber-500 rounded-lg p-2'><GrTemplate /> </div>Templates</a></li>
    </ul>
  )
}

export default Sidebar
