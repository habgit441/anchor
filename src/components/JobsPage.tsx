import React, { useState } from 'react';
import { Plus, Calendar, MapPin, DollarSign, Clock, Users, Filter, Search, Star, MessageCircle, ChevronRight } from 'lucide-react';
import { JobPosting } from '../types';
import { mockJobs } from '../data/mockData';

interface JobsPageProps {
  userType: 'client' | 'musician' | 'admin';
}

const JobsPage: React.FC<JobsPageProps> = ({ userType }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'applied' | 'posted'>('all');
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs] = useState<JobPosting[]>(mockJobs);

  const JobCard = ({ job }: { job: JobPosting }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              job.type === 'individual' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {job.type === 'individual' ? 'Individual' : 'Band'}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{job.client}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">₦{job.budget}</div>
          <div className="text-gray-500 text-sm">Budget</div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date(job.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{job.duration} hours</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{job.applicants} applied</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Required Instruments:</h4>
        <div className="flex flex-wrap gap-2">
          {job.instruments.map((instrument) => (
            <span
              key={instrument}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {instrument}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          job.status === 'open' 
            ? 'bg-green-100 text-green-800' 
            : job.status === 'in-progress'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>

        <div className="flex space-x-2">
          {userType === 'musician' && job.status === 'open' && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Apply Now
            </button>
          )}
          
          {userType === 'client' && (
            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>View Applications</span>
            </button>
          )}
          
          <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const JobPostForm = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 my-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                placeholder="e.g., Wedding Pianist Needed"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₦)</label>
              <input
                type="number"
                placeholder="Enter your budget"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
            <textarea
              rows={4}
              placeholder="Describe your event and requirements..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Time</label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>1 hour</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
                <option>5+ hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Location</label>
            <input
              type="text"
              placeholder="Enter event location"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Instruments</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['Piano', 'Guitar', 'Drums', 'Violin', 'Saxophone', 'Vocals', 'Bass', 'Trumpet'].map(instrument => (
                <label key={instrument} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{instrument}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Looking For</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="type" value="individual" />
                <span className="text-sm">Individual Musician</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="type" value="band" />
                <span className="text-sm">Band/Team</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Wedding</option>
              <option>Church Service</option>
              <option>Corporate Event</option>
              <option>Birthday Party</option>
              <option>Concert</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowJobForm(false)}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === 'client' ? 'Job Postings' : 'Find Jobs'}
          </h1>
          <p className="text-gray-600">
            {userType === 'client' 
              ? 'Post jobs and find the perfect musicians for your events'
              : 'Browse and apply to music gigs that match your skills'
            }
          </p>
        </div>
        
        {userType === 'client' && (
          <button
            onClick={() => setShowJobForm(true)}
            className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Job</span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-gray-500 text-sm">Active Jobs</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-gray-500 text-sm">
                {userType === 'client' ? 'Applications' : 'Applied Jobs'}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">₦2.4M</div>
              <div className="text-gray-500 text-sm">Total Earnings</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-gray-500 text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs by title, instrument, or location..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-4">
            <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Instruments</option>
              <option>Piano</option>
              <option>Guitar</option>
              <option>Drums</option>
              <option>Violin</option>
            </select>
            
            <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Locations</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Port Harcourt</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Jobs ({jobs.length})
        </button>
        
        {userType === 'musician' && (
          <button
            onClick={() => setActiveTab('applied')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'applied'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Applied (12)
          </button>
        )}
        
        {userType === 'client' && (
          <button
            onClick={() => setActiveTab('posted')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'posted'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            My Jobs (8)
          </button>
        )}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Load More Jobs
        </button>
      </div>

      {/* Job Form Modal */}
      {showJobForm && <JobPostForm />}
    </div>
  );
};

export default JobsPage;