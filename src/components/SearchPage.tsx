import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Star, Play, Users, Music, ChevronLeft, ChevronRight } from 'lucide-react';
import { MusicianProfile } from '../types';
import { mockMusicians } from '../data/mockData';

interface SearchPageProps {
  onProfileSelect: (profile: MusicianProfile) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onProfileSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredMusicians, setFilteredMusicians] = useState<MusicianProfile[]>(mockMusicians);
  const [filters, setFilters] = useState({
    location: '',
    instruments: [] as string[],
    skillLevel: '',
    type: '',
    availability: ''
  });

  // Featured categories
  const categories = [
    { name: 'Piano', count: 45, icon: '🎹' },
    { name: 'Guitar', count: 78, icon: '🎸' },
    { name: 'Drums', count: 32, icon: '🥁' },
    { name: 'Violin', count: 28, icon: '🎻' },
    { name: 'Saxophone', count: 19, icon: '🎷' },
    { name: 'Vocals', count: 65, icon: '🎤' }
  ];

  const instrumentOptions = ['Piano', 'Guitar', 'Drums', 'Violin', 'Saxophone', 'Vocals', 'Bass', 'Trumpet', 'Flute', 'Cello'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  useEffect(() => {
    let filtered = mockMusicians;

    if (searchQuery) {
      filtered = filtered.filter(musician =>
        musician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        musician.instruments.some(inst => inst.toLowerCase().includes(searchQuery.toLowerCase())) ||
        musician.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(musician =>
        musician.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.instruments.length > 0) {
      filtered = filtered.filter(musician =>
        musician.instruments.some(inst => filters.instruments.includes(inst))
      );
    }

    if (filters.skillLevel) {
      filtered = filtered.filter(musician =>
        musician.skillLevel === filters.skillLevel
      );
    }

    if (filters.type) {
      filtered = filtered.filter(musician =>
        musician.type === filters.type
      );
    }

    setFilteredMusicians(filtered);
  }, [searchQuery, filters]);

  const toggleInstrument = (instrument: string) => {
    setFilters(prev => ({
      ...prev,
      instruments: prev.instruments.includes(instrument)
        ? prev.instruments.filter(i => i !== instrument)
        : [...prev.instruments, instrument]
    }));
  };

  const MusicianCard = ({ musician }: { musician: MusicianProfile }) => (
    <div
      onClick={() => onProfileSelect(musician)}
      className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="relative">
        <img
          src={musician.profileImage}
          alt={musician.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-800 ml-1" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            musician.type === 'individual' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            {musician.type === 'individual' ? 'Individual' : 'Team/Band'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-medium">{musician.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{musician.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {musician.location}
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{musician.bio}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {musician.instruments.slice(0, 3).map((instrument) => (
            <span
              key={instrument}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {instrument}
            </span>
          ))}
          {musician.instruments.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              +{musician.instruments.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-semibold">₦{musician.hourlyRate}/hr</span>
          <span className="text-gray-500 text-sm">{musician.completedGigs} gigs</span>
        </div>
      </div>
    </div>
  );

  const CategorySection = ({ title, musicians }: { title: string; musicians: MusicianProfile[] }) => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {musicians.map((musician) => (
          <MusicianCard key={musician.id} musician={musician} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Your Perfect
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {' '}Musical Match
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Connect with talented musicians and bands for your events, lessons, and special occasions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for musicians, bands, or instruments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter city..."
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Instruments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instruments</label>
                <div className="relative">
                  <select
                    onChange={(e) => toggleInstrument(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select instruments...</option>
                    {instrumentOptions.map(instrument => (
                      <option key={instrument} value={instrument}>{instrument}</option>
                    ))}
                  </select>
                </div>
                {filters.instruments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {filters.instruments.map(instrument => (
                      <span
                        key={instrument}
                        onClick={() => toggleInstrument(instrument)}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs cursor-pointer"
                      >
                        {instrument} ×
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                <select
                  value={filters.skillLevel}
                  onChange={(e) => setFilters(prev => ({ ...prev, skillLevel: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All levels</option>
                  {skillLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Both</option>
                  <option value="individual">Individual</option>
                  <option value="band">Team/Band</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <input
                  type="date"
                  value={filters.availability}
                  onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setFilters({
                  location: '',
                  instruments: [],
                  skillLevel: '',
                  type: '',
                  availability: ''
                })}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Clear all filters
              </button>
              <span className="text-sm text-gray-500">
                {filteredMusicians.length} musicians found
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
            <p className="text-gray-500 text-sm">{category.count} musicians</p>
          </div>
        ))}
      </div>

      {/* Featured Musicians */}
      <CategorySection 
        title="Featured Musicians" 
        musicians={filteredMusicians.filter(m => m.featured).slice(0, 6)} 
      />

      {/* Top Rated */}
      <CategorySection 
        title="Top Rated" 
        musicians={filteredMusicians.sort((a, b) => b.rating - a.rating).slice(0, 6)} 
      />

      {/* New Members */}
      <CategorySection 
        title="New Members" 
        musicians={filteredMusicians.filter(m => m.isNew).slice(0, 6)} 
      />

      {/* Near You */}
      <CategorySection 
        title="Near You" 
        musicians={filteredMusicians.slice(0, 6)} 
      />
    </div>
  );
};

export default SearchPage;