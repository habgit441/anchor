import React, { useState } from 'react';
import { ArrowLeft, Play, Star, MapPin, Calendar, Clock, Users, Music, Heart, Share2, MessageCircle, Phone, Mail, ChevronLeft, ChevronRight, ShoppingCart, CreditCard } from 'lucide-react';
import { MusicianProfile } from '../types';

interface ProfilePageProps {
  profile: MusicianProfile;
  onBack: () => void;
  userType: 'client' | 'musician' | 'admin';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onBack, userType }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const reviews = [
    {
      id: 1,
      clientName: "Grace Emmanuel",
      rating: 5,
      comment: "Amazing performance at our wedding! Very professional and talented.",
      date: "2024-01-15",
      event: "Wedding Ceremony"
    },
    {
      id: 2,
      clientName: "Victory Church",
      rating: 5,
      comment: "Perfect for our Sunday service. Great communication and skill.",
      date: "2024-01-08",
      event: "Church Service"
    },
    {
      id: 3,
      clientName: "Lagos Events Co.",
      rating: 4,
      comment: "Professional and punctual. Would definitely hire again!",
      date: "2024-01-02",
      event: "Corporate Event"
    }
  ];

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Book {profile.name}</h3>
        <form className="space-y-4">
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
              <option>4+ hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Wedding</option>
              <option>Church Service</option>
              <option>Corporate Event</option>
              <option>Birthday Party</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              placeholder="Event location"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
            <textarea
              rows={3}
              placeholder="Any special songs or requirements..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Cost (2 hours):</span>
              <span className="text-2xl font-bold text-blue-600">₦{profile.hourlyRate * 2}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Send Booking Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Search</span>
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-64 md:h-80">
          <img
            src={profile.coverImage || profile.profileImage}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="mt-4 md:mt-0 flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{profile.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profile.type === 'individual' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-purple-500 text-white'
                  }`}>
                    {profile.type === 'individual' ? 'Individual' : 'Team/Band'}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{profile.rating} ({profile.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{profile.completedGigs} gigs completed</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{profile.bio}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.experience}</div>
                <div className="text-gray-500 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">₦{profile.hourlyRate}</div>
                <div className="text-gray-500 text-sm">Per Hour</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.completedGigs}</div>
                <div className="text-gray-500 text-sm">Gigs Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.rating}</div>
                <div className="text-gray-500 text-sm">Rating</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Instruments & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.instruments.map((instrument) => (
                  <span
                    key={instrument}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {instrument}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Video Portfolio */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Video Portfolio</h2>
            <div className="space-y-4">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                <img
                  src={`https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Play className="w-6 h-6 text-gray-800 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium">Live Performance - Gospel Medley</h3>
                  <p className="text-white/80 text-sm">Wedding ceremony performance</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video cursor-pointer group">
                    <img
                      src={`https://images.pexels.com/photos/${1105666 + index}/pexels-photo-${1105666 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                      alt={`Video ${index}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Courses */}
          {profile.courses && profile.courses.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Available Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.courses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span>{course.duration} • {course.level}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">₦{course.price}</span>
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowCourseModal(true);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Buy Course
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews ({reviews.length})</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium text-sm">
                        {review.clientName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{review.clientName}</h4>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm">• {review.date}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <span className="text-blue-600 text-sm font-medium">{review.event}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </button>
              
              <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Send Message</span>
              </button>
              
              <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call</span>
              </button>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Availability</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Week</span>
                <span className="text-green-600 font-medium">Available</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Week</span>
                <span className="text-green-600 font-medium">Available</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Weekends</span>
                <span className="text-yellow-600 font-medium">Limited</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <Clock className="w-4 h-4 inline mr-1" />
                Usually responds within 2 hours
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Pricing</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hourly Rate</span>
                <span className="font-bold text-xl text-blue-600">₦{profile.hourlyRate}</span>
              </div>
              <div className="text-gray-500 text-sm">
                <p>• Minimum 2 hours booking</p>
                <p>• Travel costs may apply</p>
                <p>• Equipment included</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated (3 hours)</span>
                  <span className="font-bold text-gray-900">₦{profile.hourlyRate * 3}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">+234 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">contact@musician.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}
    </div>
  );
};

export default ProfilePage;