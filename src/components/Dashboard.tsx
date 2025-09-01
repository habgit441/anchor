import React, { useState } from 'react';
import { BarChart3, Calendar, DollarSign, Users, Star, TrendingUp, MessageCircle, Settings, Bell, Upload, Edit, Eye, Trash2 } from 'lucide-react';

interface DashboardProps {
  userType: 'client' | 'musician' | 'admin';
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'profile' | 'bookings' | 'earnings' | 'messages' | 'settings'>('overview');

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  const renderMusicianDashboard = () => (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value="47"
          change={12}
          icon={Calendar}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Total Earnings"
          value="₦345,000"
          change={8}
          icon={DollarSign}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Average Rating"
          value="4.8"
          change={3}
          icon={Star}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          title="Profile Views"
          value="1,234"
          change={-2}
          icon={Eye}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((booking) => (
              <div key={booking} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Wedding Ceremony</h3>
                  <p className="text-gray-500 text-sm">Dec 15, 2024 • Lagos</p>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">₦25,000</div>
                  <div className="text-gray-500 text-sm">Confirmed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((event) => (
              <div key={event} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Church Service</h3>
                  <p className="text-gray-500 text-sm">Tomorrow, 10:00 AM</p>
                  <p className="text-gray-500 text-sm">Victory Chapel, Abuja</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Earnings Overview</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientDashboard = () => (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Jobs"
          value="12"
          change={15}
          icon={Calendar}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Total Spent"
          value="₦185,000"
          change={22}
          icon={DollarSign}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Hired Musicians"
          value="34"
          change={8}
          icon={Users}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Events Completed"
          value="28"
          change={12}
          icon={Star}
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Jobs</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((job) => (
              <div key={job} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Wedding Pianist</h3>
                  <p className="text-gray-500 text-sm">Posted 2 days ago • 8 applications</p>
                </div>
                <div className="text-right">
                  <div className="text-blue-600 font-semibold">₦30,000</div>
                  <div className="text-gray-500 text-sm">Active</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((event) => (
              <div key={event} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Anniversary Celebration</h3>
                  <p className="text-gray-500 text-sm">Dec 20, 2024, 6:00 PM</p>
                  <p className="text-gray-500 text-sm">Hired: Sarah Johnson (Piano)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hired Musicians */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Hired Musicians</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((musician) => (
            <div key={musician} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={`https://images.pexels.com/photos/${1115697 + musician}/pexels-photo-${1115697 + musician}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                alt="Musician"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">John Doe</h3>
                <p className="text-gray-500 text-sm">Pianist • 4.9 ⭐</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="2,847"
          change={18}
          icon={Users}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Active Jobs"
          value="156"
          change={12}
          icon={Calendar}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Total Revenue"
          value="₦12.8M"
          change={25}
          icon={DollarSign}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Platform Rating"
          value="4.7"
          change={5}
          icon={Star}
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User Growth</h2>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Growth chart visualization</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((activity) => (
              <div key={activity} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">New musician John Doe registered</span>
                <span className="text-gray-400">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-500 text-sm mb-4">Manage musicians and clients</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Manage Users
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Job Management</h3>
          <p className="text-gray-500 text-sm mb-4">Monitor and moderate jobs</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            Manage Jobs
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
          <p className="text-gray-500 text-sm mb-4">View detailed analytics</p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );

  const sidebarItems = {
    client: [
      { key: 'overview', label: 'Overview', icon: BarChart3 },
      { key: 'profile', label: 'Profile', icon: Users },
      { key: 'bookings', label: 'My Bookings', icon: Calendar },
      { key: 'earnings', label: 'Payments', icon: DollarSign },
      { key: 'messages', label: 'Messages', icon: MessageCircle },
      { key: 'settings', label: 'Settings', icon: Settings },
    ],
    musician: [
      { key: 'overview', label: 'Overview', icon: BarChart3 },
      { key: 'profile', label: 'Profile', icon: Users },
      { key: 'bookings', label: 'My Gigs', icon: Calendar },
      { key: 'earnings', label: 'Earnings', icon: DollarSign },
      { key: 'messages', label: 'Messages', icon: MessageCircle },
      { key: 'settings', label: 'Settings', icon: Settings },
    ],
    admin: [
      { key: 'overview', label: 'Overview', icon: BarChart3 },
      { key: 'profile', label: 'Users', icon: Users },
      { key: 'bookings', label: 'All Jobs', icon: Calendar },
      { key: 'earnings', label: 'Revenue', icon: DollarSign },
      { key: 'messages', label: 'Support', icon: MessageCircle },
      { key: 'settings', label: 'Settings', icon: Settings },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
              {userType} Dashboard
            </h2>
            <nav className="space-y-2">
              {sidebarItems[userType].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === key
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {userType === 'client' ? 'Grace' : userType === 'musician' ? 'John' : 'Admin'}! 👋
            </h1>
            <p className="text-gray-600">
              {userType === 'client' 
                ? "Here's what's happening with your events and bookings"
                : userType === 'musician'
                ? "Here's your performance overview and upcoming gigs"
                : "Platform overview and management tools"
              }
            </p>
          </div>

          {activeSection === 'overview' && (
            <>
              {userType === 'musician' && renderMusicianDashboard()}
              {userType === 'client' && renderClientDashboard()}
              {userType === 'admin' && renderAdminDashboard()}
            </>
          )}

          {activeSection !== 'overview' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                  {activeSection} Section
                </h2>
                <p className="text-gray-500">
                  This section is under development. More features coming soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;