import React, { useState } from "react";
import {
  Search,
  Menu,
  User,
  Bell,
  MessageCircle,
  Music,
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
  Settings,
  Eye,
  Camera,
} from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: "search" | "profile" | "jobs" | "dashboard" | "settings") => void;
  userType: "client" | "musician" | "admin";
  onUserTypeChange: (type: "client" | "musician" | "admin") => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onPageChange,
  userType,
}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Upload profile image
  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Toggle Dark/Light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  // Helper: close menus and perform an action
  const handleMenuClick = (action: () => void) => {
    action();
    setShowProfileMenu(false);
    setShowMobileMenu(false);
    setShowNotif(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${
        isDarkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-white/95 border-gray-200"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onPageChange("dashboard")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h1 className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AnchorMusic Connects
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Browse Musicians", key: "search" },
              { name: userType === "client" ? "Post Jobs" : "Find Jobs", key: "jobs" },
              { name: "Dashboard", key: "dashboard" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => onPageChange(item.key as any)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.key
                    ? "text-blue-600"
                    : isDarkMode
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4 relative">
            {/* Notifications */}
            <button
              onClick={() => {
                setShowNotif(!showNotif);
                setShowProfileMenu(false);
              }}
              className={`relative p-2 rounded-lg ${
                isDarkMode
                  ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              } transition-colors`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                3
              </span>
            </button>

            {/* Messages */}
            <button
              className={`relative p-2 rounded-lg ${
                isDarkMode
                  ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              } transition-colors`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                2
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotif(false);
                }}
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-1 rounded-full cursor-pointer transition-all opacity-0 group-hover:opacity-100">
                  <Camera className="w-3 h-3 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
                </label>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-600">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          John Musician
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {userType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                   
                    <button 
                      onClick={() => handleMenuClick(() => onPageChange("profile"))}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                    >
                      <User className="w-4 h-4 text-blue-500" />
                      <span>View Profile</span>
                    </button>
                  

                    <button
                      onClick={() => handleMenuClick(() => onPageChange("settings"))}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                    >
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span>Profile Settings</span>
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Privacy Policy</span>
                    </button>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                    >
                      {isDarkMode ? (
                        <>
                          <Sun className="w-4 h-4 text-yellow-500" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4 text-indigo-500" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

                    <button
                      onClick={() => handleMenuClick(() => console.log("Logging out..."))}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                setShowNotif(false);
                setShowProfileMenu(false);
              }}
              className={`md:hidden p-2 rounded-lg ${
                isDarkMode
                  ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              } transition-colors`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              {[
                { name: "Browse Musicians", key: "search" },
                { name: userType === "client" ? "Post Jobs" : "Find Jobs", key: "jobs" },
                { name: "Dashboard", key: "dashboard" },
                { name: "Profile", key: "profile" },
                { name: "Settings", key: "settings" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(() => onPageChange(item.key as any))}
                  className={`text-left py-2 px-3 rounded-lg text-sm font-medium ${
                    currentPage === item.key
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  } transition-colors`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
