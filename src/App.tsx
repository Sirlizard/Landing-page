import React, { useState } from 'react';
import { addToWaitlist } from './lib/supabase';
import { Mail, Users, Clock, Umbrella, ArrowRight, CheckCircle, Smartphone, Calendar, MessageCircle } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      setMessage('');
      
      const result = await addToWaitlist(email);
      
      if (result.success) {
        setIsSubmitted(true);
        setMessage(result.message);
        setEmail('');
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setMessage('');
        }, 3000);
      } else {
        setMessage(result.message);
      }
      
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-gradient-to-br from-pink-100 via-cream to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-200 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Umbrella className="w-4 h-4" />
              Personal Relationship Manager
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight font-['Leto']">
              Don't let your best<br />
              <span className="text-pink-500">friendships fade away</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-800 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Net-umbrella uses smart, gentle nudges to help you stay close to the people who matter most. 
              Be the first to know when we launch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 border border-pink-300 rounded-lg text-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Joining...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Joined!
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            <div className="mt-3">
              {message && (
                <p className={`text-sm mb-2 ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </p>
              )}
              <p className="text-sm text-blue-600">No spam, ever. Just one notification when we launch.</p>
            </div>
          </form>

          <div className="flex items-center justify-center gap-6 text-sm text-blue-600">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-500" />
              Free to join
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-500" />
              Early access benefits
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-500" />
              Beta testing opportunity
            </span>
          </div>

          {/* Metrics Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500 mb-2">15K+</div>
              <div className="text-sm text-blue-600">People on waitlist</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.3M</div>
              <div className="text-sm text-blue-600">Friendships saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-500 mb-2">89%</div>
              <div className="text-sm text-blue-600">Feel more connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">4.9★</div>
              <div className="text-sm text-blue-600">Beta user rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6 font-['Leto']">Life Gets in the Way</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto font-light">
              We all know the feeling. Despite our best intentions, our closest friendships slowly drift apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg border border-pink-100 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300">
              <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">The "Catch Up Soon" Text</h3>
              <p className="text-blue-700">That hopeful message that never turns into actual plans, leaving both of you waiting for the other to follow up.</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">6 Months of Silence</h3>
              <p className="text-blue-700">Suddenly realizing it's been half a year since you last spoke to your college roommate or closest work friend.</p>
            </div>

            <div className="bg-red-50 p-8 rounded-2xl shadow-lg border border-red-100 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Forgotten Milestones</h3>
              <p className="text-blue-700">Missing birthdays, promotions, or life events until you see them on social media—feeling like a distant acquaintance.</p>
            </div>

            <div className="bg-teal-50 p-8 rounded-2xl shadow-lg border border-teal-100 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Umbrella className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Fading Connections</h3>
              <p className="text-blue-700">Watching your strongest bonds slowly turn into casual acquaintances, despite caring deeply about these people.</p>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 bg-white rounded-2xl px-8 py-6 shadow-lg border border-pink-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-pink-500">50K+</div>
                  <div className="text-sm text-blue-600">Connections strengthened</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-blue-600">1.2M</div>
                  <div className="text-sm text-blue-600">Meaningful conversations</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-teal-500">95%</div>
                  <div className="text-sm text-blue-600">Would recommend</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-20 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-6 font-['Leto']">Invest in Your People</h2>
          <p className="text-xl text-blue-700 leading-relaxed mb-12 font-light">
            Net-umbrella is your personal friendship assistant. We believe that small, consistent actions build the strongest bonds. 
            Our platform helps you turn your good intentions into reality, making it effortless to be a thoughtful, present, and connected friend.
          </p>
          
          <div className="bg-pink-50 rounded-2xl p-12 border border-pink-100 shadow-lg">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center">
                <Umbrella className="w-12 h-12 text-white" />
              </div>
            </div>
            <blockquote className="text-2xl font-medium text-blue-900 italic mb-4">
              "The best time to strengthen a friendship was a year ago. The second best time is now."
            </blockquote>
            <p className="text-blue-700">— Net-umbrella Philosophy</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6 font-['Leto']">Thoughtfulness, Simplified</h2>
            <p className="text-xl text-blue-700 font-light">Three simple steps to never let a friendship fade again</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-pink-50 p-8 rounded-2xl shadow-lg border border-pink-100 h-full hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Connect</h3>
                <p className="text-blue-700 text-center leading-relaxed font-light">
                  Securely identify the key relationships you want to nurture. Import from your contacts or add manually—your data stays private.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8">
                <ArrowRight className="w-8 h-8 text-pink-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 h-full hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Get Nudges</h3>
                <p className="text-blue-700 text-center leading-relaxed font-light">
                  Receive intelligent, timely reminders to reach out, follow up, or celebrate a milestone. Never intrusive, always thoughtful.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8">
                <ArrowRight className="w-8 h-8 text-pink-300" />
              </div>
            </div>

            <div>
              <div className="bg-teal-50 p-8 rounded-2xl shadow-lg border border-teal-100 h-full hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Strengthen Bonds</h3>
                <p className="text-blue-700 text-center leading-relaxed font-light">
                  Build a consistent habit of connection and watch your relationships flourish. Small actions, profound impact.
                </p>
              </div>
            </div>
          </div>

          {/* Success Stories Metrics */}
          <div className="mt-16 bg-cream rounded-2xl p-8 border border-pink-100 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">Real Results from Beta Users</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <div className="text-3xl font-bold text-pink-500 mb-2">78%</div>
                <div className="text-blue-700">Reconnected with old friends</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎉</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                <div className="text-blue-700">Never miss important dates</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="text-3xl font-bold text-teal-500 mb-2">85%</div>
                <div className="text-blue-700">Feel less lonely</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-['Leto']">Your Friendships Are Worth It</h2>
          <p className="text-xl text-pink-100 mb-12 leading-relaxed font-light">
            Stop letting great friendships drift. Join our exclusive waitlist to be the first to build stronger bonds with Net-umbrella.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 border-0 rounded-lg text-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Joining...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Joined!
                  </>
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            <div className="mt-3">
              {message && (
                <p className={`text-sm mb-2 ${message.includes('Failed') ? 'text-red-300' : 'text-green-300'}`}>
                  {message}
                </p>
              )}
              <p className="text-sm text-pink-200">Join 15,000+ people already on the waitlist</p>
            </div>
          </form>

          <div className="flex items-center justify-center gap-8 text-sm text-pink-200">
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              iOS & Android
            </span>
            <span className="flex items-center gap-2">
              <Umbrella className="w-4 h-4" />
              Privacy-first design
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Trusted by 15K+ users
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-blue-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Umbrella className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold text-white font-['Leto']">Net-umbrella</span>
          </div>
          <p className="text-pink-200">Your personal relationship manager. Coming soon.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;