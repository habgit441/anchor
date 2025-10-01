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
    'Master Your Instrument',
    'Connect With Students',
    'Find Music Gigs',
    'Grow Your Career',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
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
    // Notify parent that auth succeeded (signup/login complete)
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    // Congratulate user on signup/login
    window.alert('Signup/Login successful — Congratulations!');
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col">
      {/* Landing navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg">Anchormusic</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#home" onClick={() => document.getElementById('home')?.scrollIntoView({behavior:'smooth'})} className="text-sm hover:text-purple-300">Home</a>
            <a href="#hero" onClick={() => document.getElementById('hero')?.scrollIntoView({behavior:'smooth'})} className="text-sm hover:text-purple-300">Hero</a>
            <a href="#features" onClick={() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'})} className="text-sm hover:text-purple-300">Features</a>
            <a href="#about" onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})} className="text-sm hover:text-purple-300">About</a>
            <a href="#testimonials" onClick={() => document.getElementById('testimonials')?.scrollIntoView({behavior:'smooth'})} className="text-sm hover:text-purple-300">Testimonials</a>
            <a href="#services" onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})} className="text-sm hover:text-purple-300">Services</a>
            <a href="#contact" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="text-sm hover:text-purple-300">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowAuth(true)} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-sm font-semibold">Get Started</button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-24">
        {/* Home Section */}
        <section id="home" className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">{heroTexts[currentTextIndex]}</h2>
          <p className="text-gray-200 max-w-2xl mx-auto mb-8">Connect with musicians, students, and opportunities. Anchormusic helps you find gigs, students, and collaborators — all in one place.</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setShowAuth(true)} className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold">Sign up / Login</button>
            <a href="#features" onClick={() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'})} className="px-6 py-3 rounded-lg bg-white/10 border border-white/20">Learn More</a>
          </div>
        </section>

        {/* Hero (visual) Section */}
        <section id="hero" className="py-16 bg-gradient-to-br from-white/5 via-white/3 to-transparent">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Find the right musician or student</h3>
              <p className="text-gray-300 mb-6">Search verified profiles, audition clips, and booking availability in one place.</p>
              <ul className="space-y-2 text-gray-300">
                <li>• Verified profiles & reviews</li>
                <li>• Built-in scheduling & payments</li>
                <li>• Tools for teachers, session musicians, and bands</li>
              </ul>
            </div>
            <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">{/* placeholder visual */}
              <span className="text-gray-400">[Hero visual / mockup]</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold mb-2">Browse Musicians</h4>
                <p className="text-gray-300">Find local and remote musicians by instrument, style, and rate.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold mb-2">Book Gigs</h4>
                <p className="text-gray-300">Create job posts and hire musicians with confidence.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold mb-2">Teach & Learn</h4>
                <p className="text-gray-300">Offer lessons, accept students, and manage schedules.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white/3">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold mb-4">About Anchormusic</h3>
            <p className="text-gray-200 max-w-3xl">Anchormusic connects musicians, students, and clients through a simple, trusted platform. We streamline booking, communication, and payments so you can focus on music.</p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-center mb-8">What clients say about us</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-lg">
                <p className="text-gray-200 italic">"Anchormusic helped me find the perfect band for my wedding. Professional and responsive."</p>
                <p className="text-sm text-gray-400 mt-3">— Sarah, Event Planner</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <p className="text-gray-200 italic">"As a teacher, I can manage students and payments in one place. Highly recommended."</p>
                <p className="text-sm text-gray-400 mt-3">— Daniel, Music Teacher</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <p className="text-gray-200 italic">"Booked a session musician within 24 hours — seamless experience."</p>
                <p className="text-sm text-gray-400 mt-3">— Priya, Producer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white/3">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold mb-6">Our Services</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold">Profile Verification</h4>
                <p className="text-gray-300">We verify musician credentials and reviews to build trust.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold">Secure Payments</h4>
                <p className="text-gray-300">Integrated payments and deposit handling for gigs and lessons.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold">Calendar & Scheduling</h4>
                <p className="text-gray-300">Built-in scheduling, reminders, and booking management.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-4">Get in touch</h3>
            <p className="text-gray-300 mb-6">Questions or feedback? Reach out and we'll get back to you.</p>
            <form onSubmit={(e)=>{e.preventDefault(); window.alert('Thanks — we will contact you soon!')}} className="grid gap-4">
              <input name="name" placeholder="Your name" className="p-3 rounded-md bg-white/5 border border-white/10" />
              <input name="email" placeholder="Your email" className="p-3 rounded-md bg-white/5 border border-white/10" />
              <textarea name="message" placeholder="Message" rows={4} className="p-3 rounded-md bg-white/5 border border-white/10" />
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full border border-white/20 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Join Anchormusic' : 'Reset Password'}
              </h2>
              <button
                onClick={() => {
                  setShowAuth(false);
                  setShowOTP(false);
                  setErrors({});
                }}
                className="text-gray-400 hover:text-white"
              >
                <X />
              </button>
            </div>

            {!showOTP ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm text-gray-300">Full name</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/10"
                    />
                    {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-300">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/10"
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm text-gray-300">Phone</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/10"
                    />
                    {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                  </div>
                )}

                {authMode !== 'forgot' && (
                  <div>
                    <label className="block text-sm text-gray-300">Password</label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-2 top-2 text-gray-300"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
                  </div>
                )}

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm text-gray-300">Confirm Password</label>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        className="absolute right-2 top-2 text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword}</p>}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={otpMethod === 'email'}
                      onChange={() => setOtpMethod('email')}
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={otpMethod === 'phone'}
                      onChange={() => setOtpMethod('phone')}
                    />
                    Phone
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold">
                    {authMode === 'login' ? 'Login' : 'Sign up'}
                  </button>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-sm text-purple-200"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-300 text-center">
                  {authMode === 'signup' ? (
                    <>
                      By signing up you agree to our <button className="underline">Terms</button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <button type="button" onClick={() => setAuthMode('signup')} className="underline">
                        Create one
                      </button>
                    </>
                  )}
                </p>
              </form>
            ) : (
              <div>
                <p className="text-center mb-4 text-gray-300">
                  Enter the 6-digit code sent to {otpMethod === 'email' ? formData.email : formData.phone}
                </p>
                <div className="flex justify-center gap-2 mb-4">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(idx, e)}
                      className="w-12 h-12 text-center text-2xl rounded-lg bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none"
                    />
                  ))}
                </div>
                <button
                  onClick={handleOTPSubmit}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={() => window.alert('OTP resent!')}
                  className="w-full mt-3 text-sm text-purple-400 hover:text-purple-300"
                >
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
