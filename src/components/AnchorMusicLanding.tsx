import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Music,
  Users,
  BookOpen,
  Briefcase,
  ChevronRight,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Star,
  Calendar,
  Award,
  Sparkles,
} from 'lucide-react';

type AnchorMusicLandingProps = {
  onAuthSuccess?: () => void;
};

export default function AnchorMusicLanding({ onAuthSuccess }: AnchorMusicLandingProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    instrument: '',
    experience: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpMethod, setOtpMethod] = useState<'email' | 'phone'>('email');

  const heroTexts = [
    'Unlock Your Musical Potential',
    'Build Your Dream Career',
    'Discover Premium Opportunities',
    'Transform Your Passion Into Profit',
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(featureInterval);
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+?[\d\s-]{10,}$/.test(phone);
  const validatePassword = (password: string) =>
    password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (authMode === 'signup') {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.instrument) newErrors.instrument = 'Please select your instrument';
      if (!formData.experience) newErrors.experience = 'Please select your experience level';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (authMode === 'signup') {
      if (!formData.phone || !validatePhone(formData.phone)) {
        newErrors.phone = 'Valid phone number is required';
      }
    }

    if (authMode !== 'forgot') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (authMode === 'signup' && !validatePassword(formData.password)) {
        newErrors.password = 'Password must be 8+ chars with uppercase, lowercase, and number';
      }

      if (authMode === 'signup') {
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowOTP(true);
      const method = otpMethod === 'email' ? formData.email : formData.phone;
      window.alert(`OTP sent to ${method}. For testing, use any 6-digit code.`);
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      window.alert('Please enter complete 6-digit OTP');
      return;
    }
    window.alert(`OTP ${otpCode} verified successfully! Welcome to Anchormusic!`);
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    window.alert('Authentication successful — Welcome aboard!');
    setShowAuth(false);
    setShowOTP(false);
    setOtp(['', '', '', '', '', '']);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      instrument: '',
      experience: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !validateEmail(formData.email)) {
      setErrors({ email: 'Valid email is required' });
      return;
    }
    window.alert(`Password reset link sent to ${formData.email}`);
    setAuthMode('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Landing navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse">
              <Music className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Anchormusic</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'hero', label: 'Discover' },
              { id: 'features', label: 'Features' },
              { id: 'about', label: 'About' },
              { id: 'testimonials', label: 'Reviews' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm hover:text-purple-300 transition-all duration-300 hover:scale-110 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowAuth(true)}
              className="px-3 sm:px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-24 relative z-10">
        {/* Home Section with animated hero text */}
        <section id="home" className={`max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-xs sm:text-sm">Your Premier Music Platform</span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 min-h-[80px] sm:min-h-[120px]">
            <span className="inline-block animate-pulse bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {heroTexts[currentTextIndex]}
            </span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            Join the ultimate platform connecting talented musicians with students and incredible opportunities. 
            Whether you're seeking gigs, teaching opportunities, or collaborations — we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <button
              onClick={() => setShowAuth(true)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Start Your Journey
            </button>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Explore Features
            </a>
          </div>

          {/* Floating stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
            {[
              { number: '10K+', label: 'Active Musicians' },
              { number: '5K+', label: 'Gigs Completed' },
              { number: '15K+', label: 'Students Connected' },
              { number: '4.9★', label: 'Average Rating' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Hero Visual Section */}
        <section id="hero" className="py-12 sm:py-16 bg-gradient-to-br from-white/5 via-white/3 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-xs sm:text-sm text-purple-300">Verified & Trusted</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Connect with the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Perfect Match</span>
              </h3>
              
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Browse through thousands of verified musician profiles, complete with audition clips, reviews, and real-time booking availability. 
                Finding your ideal collaborator has never been easier.
              </p>
              
              <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                {[
                  { icon: Star, text: 'Verified profiles with authentic reviews' },
                  { icon: Calendar, text: 'Integrated scheduling & secure payments' },
                  { icon: Users, text: 'Perfect for teachers, session players & bands' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <div className="mt-1 p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all duration-300">
                      <item.icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="group-hover:text-white transition-colors duration-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="order-1 lg:order-2 h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
              <div className="text-center space-y-4 p-6">
                <Music className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto animate-bounce" />
                <span className="text-sm sm:text-base text-gray-300">Premium Experience Awaits</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with animated cards */}
        <section id="features" className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                Powerful <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Features</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-4">
                Everything you need to succeed in the music industry, all in one place
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: Users,
                  title: 'Discover Top Talent',
                  description: 'Browse our curated network of musicians filtered by instrument, genre, experience level, and competitive rates.',
                },
                {
                  icon: Briefcase,
                  title: 'Secure Bookings',
                  description: 'Post opportunities and hire with confidence through our verified platform with built-in contracts and protection.',
                },
                {
                  icon: BookOpen,
                  title: 'Teach & Earn',
                  description: 'Offer private lessons, manage your student roster, and handle scheduling seamlessly through our platform.',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`group p-6 sm:p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                    activeFeature === idx ? 'ring-2 ring-purple-400' : ''
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/50">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-20 bg-white/3 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                  Why <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Anchormusic</span>?
                </h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  We're more than just a platform — we're a community dedicated to empowering musicians worldwide. 
                  Our mission is to simplify connections, streamline bookings, and ensure every transaction is secure and transparent.
                </p>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  From emerging artists to seasoned professionals, Anchormusic provides the tools and network you need 
                  to focus on what matters most — creating incredible music.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                  {['Trusted', 'Secure', 'Professional', 'Global'].map((badge, idx) => (
                    <div
                      key={idx}
                      className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30 text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-300"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-64 sm:h-80 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                <div className="text-center space-y-4 p-6">
                  <Award className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto animate-pulse" />
                  <span className="text-sm sm:text-base text-gray-300">Award-Winning Platform</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                Loved by <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Musicians Worldwide</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-4">
                Don't just take our word for it — hear from our thriving community
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  text: "Anchormusic transformed my wedding planning! Found an incredible band within hours. Their professionalism and talent exceeded all expectations.",
                  author: 'Sarah M.',
                  role: 'Event Coordinator',
                  rating: 5,
                },
                {
                  text: "As a music instructor, managing students and payments used to be chaotic. This platform is a game-changer — everything I need in one place!",
                  author: 'Daniel K.',
                  role: 'Piano Teacher',
                  rating: 5,
                },
                {
                  text: "Booked an exceptional session guitarist in under 24 hours. The quality of talent and ease of use is unmatched. Highly recommended!",
                  author: 'Priya R.',
                  role: 'Music Producer',
                  rating: 5,
                },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-200 italic leading-relaxed mb-4 sm:mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm sm:text-base font-semibold text-purple-300">{testimonial.author}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 sm:py-20 bg-white/3 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Premium Services</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-4">
                Comprehensive solutions designed to elevate your music career
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: Award,
                  title: 'Profile Verification',
                  description: 'Rigorous verification process ensuring authentic credentials, reviews, and qualifications to build trust within our community.',
                },
                {
                  icon: Lock,
                  title: 'Secure Transactions',
                  description: 'Industry-leading payment protection with escrow services, deposit management, and secure fund transfers for complete peace of mind.',
                },
                {
                  icon: Calendar,
                  title: 'Smart Scheduling',
                  description: 'Intuitive calendar integration with automated reminders, booking confirmations, and seamless availability management.',
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="group p-6 sm:p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/50">
                    <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                Let's <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Connect</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-300 px-4">
                Have questions or feedback? We're here to help and would love to hear from you.
              </p>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.alert('Thank you for reaching out! We will get back to you shortly.');
              }}
              className="space-y-4 sm:space-y-6 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10"
            >
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
                <input
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 resize-none text-sm sm:text-base"
                  required
                />
              </div>
              
              <button className="w-full px-6 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 bg-black/40 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Anchormusic
                </span>
              </div>
              <div className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
                © 2025 Anchormusic. All rights reserved. Empowering musicians worldwide.
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/20 max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-slideUp shadow-2xl shadow-purple-500/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Join Anchormusic' : 'Reset Password'}
              </h2>
              <button
                onClick={() => {
                  setShowAuth(false);
                  setShowOTP(false);
                  setErrors({});
                }}
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:rotate-90 transform"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!showOTP ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {authMode === 'signup' && (
                  <div className="transform transition-all duration-300">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                  </div>
                )}

                <div className="transform transition-all duration-300">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                {authMode === 'signup' && (
                  <div className="transform transition-all duration-300">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 text-sm sm:text-base"
                      placeholder="+1234567890"
                    />
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                )}

                {authMode !== 'forgot' && (
                  <div className="transform transition-all duration-300">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 pr-12 text-sm sm:text-base"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                  </div>
                )}

                {authMode === 'signup' && (
                  <div className="transform transition-all duration-300">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 pr-12 text-sm sm:text-base"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer group">
                    <input
                      type="radio"
                      checked={otpMethod === 'email'}
                      onChange={() => setOtpMethod('email')}
                      className="w-4 h-4 accent-purple-500"
                    />
                    <span className="group-hover:text-purple-300 transition-colors duration-300">Email</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer group">
                    <input
                      type="radio"
                      checked={otpMethod === 'phone'}
                      onChange={() => setOtpMethod('phone')}
                      className="w-4 h-4 accent-purple-500"
                    />
                    <span className="group-hover:text-purple-300 transition-colors duration-300">Phone</span>
                  </label>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                  
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300"
                    >
                      Forgot your password?
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-300 text-center pt-4">
                  {authMode === 'signup' ? (
                    <>
                      By signing up, you agree to our{' '}
                      <button className="underline hover:text-purple-300 transition-colors duration-300">
                        Terms & Conditions
                      </button>
                    </>
                  ) : (
                    <>
                      New to Anchormusic?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signup')}
                        className="underline hover:text-purple-300 transition-colors duration-300 font-semibold"
                      >
                        Create an account
                      </button>
                    </>
                  )}
                </p>
              </form>
            ) : (
              <div className="space-y-6">
                <p className="text-center text-sm sm:text-base text-gray-300">
                  Enter the 6-digit verification code sent to{' '}
                  <span className="font-semibold text-purple-300">
                    {otpMethod === 'email' ? formData.email : formData.phone}
                  </span>
                </p>
                
                <div className="flex justify-center gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(idx, e)}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl rounded-xl bg-white/10 border-2 border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 font-bold"
                    />
                  ))}
                </div>
                
                <button
                  onClick={handleOTPSubmit}
                  className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 text-sm sm:text-base"
                >
                  Verify Code
                </button>
                
                <button
                  type="button"
                  onClick={() => window.alert('Verification code resent successfully!')}
                  className="w-full text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300"
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}