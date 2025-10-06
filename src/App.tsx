import React, { useState } from "react";
import {
  Search,
  Menu,
  User,
  Bell,
  MessageCircle,
  Calendar,
  MapPin,
  Star,
  Play,
  Heart,
  Filter,
} from "lucide-react";
import AnchorMusicLanding from "./components/AnchorMusicLanding";
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";
import JobsPage from "./components/JobsPage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import ProfileSetting from "./components/ProfileSetting"; // ✅ add this
import { MusicianProfile } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "welcome" | "search" | "profile" | "jobs" | "dashboard" | "settings"
  >("welcome");

  const [selectedProfile, setSelectedProfile] = useState<MusicianProfile | null>(
    null
  );
  const [userType, setUserType] = useState<"client" | "musician" | "admin">(
    "client"
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleProfileSelect = (profile: MusicianProfile) => {
    setSelectedProfile(profile);
    setCurrentPage("profile");
  };

  const handleBack = () => {
    setCurrentPage("search");
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      {loggedIn && (
        <Header
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          userType={userType}
          onUserTypeChange={setUserType}
        />
      )}

      <main className="pt-16">
        {!loggedIn && currentPage === "welcome" && (
          <AnchorMusicLanding
            onAuthSuccess={() => {
              setLoggedIn(true);
              setCurrentPage("search");
            }}
          />
        )}

        {currentPage === "search" && (
          <SearchPage onProfileSelect={handleProfileSelect} />
        )}

        {currentPage === "profile" && selectedProfile && (
          <ProfilePage
            profile={selectedProfile}
            onBack={handleBack}
            userType={userType}
          />
        )}

        {currentPage === "jobs" && <JobsPage userType={userType} />}

        {currentPage === "dashboard" && <Dashboard userType={userType} />}

        {/* ✅ Profile Settings Page */}
        {currentPage === "settings" && <ProfileSetting userType={userType} />}
      </main>
    </div>
  );
}

export default App;
