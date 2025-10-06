import React from "react";
import { User, Mail, Phone, MapPin, Edit3 } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-sm rounded-2xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover"
          />
          <button className="absolute bottom-1 right-1 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full shadow">
            <Edit3 size={16} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="text-indigo-500" /> Grace Johnson
          </h2>
          <p className="text-gray-600 flex items-center gap-2">
            <Mail className="text-gray-400" /> gracejohnson@email.com
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Phone className="text-gray-400" /> +234 810 234 5678
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="text-gray-400" /> Lagos, Nigeria
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* About Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          About Grace
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Grace is a talented musician who specializes in contemporary gospel
          and jazz. She’s passionate about using music to inspire and connect
          people. Currently available for private events and studio recordings.
        </p>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Account Info */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Account Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Account Type:</p>
            <p>Client</p>
          </div>
          <div>
            <p className="font-medium">Joined:</p>
            <p>January 2025</p>
          </div>
          <div>
            <p className="font-medium">Total Bookings:</p>
            <p>12</p>
          </div>
          <div>
            <p className="font-medium">Active Subscriptions:</p>
            <p>Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
