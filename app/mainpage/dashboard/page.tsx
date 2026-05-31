"use client";

import { useState, useEffect } from "react";
import BarChart from "@/app/components/BarChart";
import DoughnutChart from "@/app/components/DoughnutChart";
import MyTemplates from "@/app/components/myTemplates";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalInvites: 0,
    sentInvites: 0,
    confirmedAttendees: 0,
    pendingResponses: 0
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    setStats({
      totalInvites: 150,
      sentInvites: 120,
      confirmedAttendees: 89,
      pendingResponses: 31
    });
  }, []);

  const statCards = [
    {
      title: "Total Invites",
      value: stats.totalInvites,
      change: "+12%",
      changeType: "positive",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-blue-500"
    },
    {
      title: "Sent Invites",
      value: stats.sentInvites,
      change: "+8%",
      changeType: "positive",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      color: "bg-green-500"
    },
    {
      title: "Confirmed",
      value: stats.confirmedAttendees,
      change: "+15%",
      changeType: "positive",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-pink-500"
    },
    {
      title: "Pending",
      value: stats.pendingResponses,
      change: "-3%",
      changeType: "negative",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-yellow-500"
    }
  ];

  const recentActivities = [
    { id: 1, action: "New invite sent", guest: "Sarah Johnson", time: "2 mins ago", type: "sent" },
    { id: 2, action: "RSVP confirmed", guest: "Mike Chen", time: "15 mins ago", type: "confirmed" },
    { id: 3, action: "Template created", guest: "Wedding Template #5", time: "1 hour ago", type: "template" },
    { id: 4, action: "Guest declined", guest: "Lisa Brown", time: "2 hours ago", type: "declined" },
    { id: 5, action: "New group created", guest: "College Friends", time: "3 hours ago", type: "group" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-neutral-800">
            Dashboard
          </h1>
          <p className="text-neutral-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your wedding invitations.
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Data
          </button>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Invite
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card-elegant">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-neutral-500 text-sm ml-1">from last week</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-elegant">
          <div className="mb-6">
            <h3 className="font-heading text-xl font-semibold text-neutral-800">
              Response Analytics
            </h3>
            <p className="text-neutral-600 text-sm mt-1">
              Track invitation responses over time
            </p>
          </div>
          <BarChart />
        </div>

        <div className="card-elegant">
          <div className="mb-6">
            <h3 className="font-heading text-xl font-semibold text-neutral-800">
              RSVP Status
            </h3>
            <p className="text-neutral-600 text-sm mt-1">
              Current breakdown of responses
            </p>
          </div>
          <DoughnutChart />
        </div>
      </div>

      {/* Recent Activity & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card-elegant">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-semibold text-neutral-800">
                Recent Activity
              </h3>
              <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'confirmed' ? 'bg-green-500' :
                    activity.type === 'sent' ? 'bg-blue-500' :
                    activity.type === 'declined' ? 'bg-red-500' :
                    activity.type === 'template' ? 'bg-purple-500' :
                    'bg-neutral-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{activity.action}</p>
                    <p className="text-sm text-neutral-600">{activity.guest}</p>
                  </div>
                  <span className="text-xs text-neutral-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Templates Preview */}
        <div className="card-elegant">
          <div className="mb-6">
            <h3 className="font-heading text-xl font-semibold text-neutral-800">
              My Templates
            </h3>
            <p className="text-neutral-600 text-sm mt-1">
              Quick access to your designs
            </p>
          </div>
          <MyTemplates />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-elegant">
        <h3 className="font-heading text-xl font-semibold text-neutral-800 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 group">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-200">
              <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-4 text-left">
              <p className="font-medium text-neutral-900">Create New Group</p>
              <p className="text-sm text-neutral-600">Organize your guests</p>
            </div>
          </button>

          <button className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4 text-left">
              <p className="font-medium text-neutral-900">Design Template</p>
              <p className="text-sm text-neutral-600">Create invitation design</p>
            </div>
          </button>

          <button className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9z" />
              </svg>
            </div>
            <div className="ml-4 text-left">
              <p className="font-medium text-neutral-900">View Analytics</p>
              <p className="text-sm text-neutral-600">Track your progress</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
