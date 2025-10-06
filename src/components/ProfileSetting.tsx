import React from "react";
import { ArrowLeft, Save, User, Lock } from "lucide-react";

interface ProfileSettingProps {
  userType: "client" | "musician" | "admin";
}

const ProfileSetting: React.FC<ProfileSettingProps> = ({ userType }) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Profile Settings
        </h2>
        <button className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Display Name
          </label>
          <input
            type="text"
            placeholder="John Musician"
            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 mt-8">
          <Lock className="text-gray-500 w-5 h-5" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Change password or manage your security settings
          </p>
        </div>

        <button className="mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ProfileSetting;
