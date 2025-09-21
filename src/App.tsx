import React, { useState } from 'react';
import { Mail, Users, Clock, Heart, ArrowRight, CheckCircle, Smartphone, Calendar, MessageCircle } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send to your backend/email service
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Personal Relationship Manager
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Don't let your best<br />
              <span className="text-blue-700">friendships fade away</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Friend Umbrella uses smart, gentle nudges to help you stay close to the people who matter most. 
              Be the first to know when we launch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                {isSubmitted ? (
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
            <p className="text-sm text-gray-500 mt-3">No spam, ever. Just one notification when we launch.</p>
          </form>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Free to join
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Early access benefits
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Beta testing opportunity
            </span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Life Gets in the Way</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We all know the feeling. Despite our best intentions, our closest friendships slowly drift apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">The "Catch Up Soon" Text</h3>
              <p className="text-gray-600">That hopeful message that never turns into actual plans, leaving both of you waiting for the other to follow up.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6 Months of Silence</h3>
              <p className="text-gray-600">Suddenly realizing it's been half a year since you last spoke to your college roommate or closest work friend.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Forgotten Milestones</h3>
              <p className="text-gray-600">Missing birthdays, promotions, or life events until you see them on social media—feeling like a distant acquaintance.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Fading Connections</h3>
              <p className="text-gray-600">Watching your strongest bonds slowly turn into casual acquaintances, despite caring deeply about these people.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Invest in Your People</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            Friend Umbrella is your personal friendship assistant. We believe that small, consistent actions build the strongest bonds. 
            Our platform helps you turn your good intentions into reality, making it effortless to be a thoughtful, present, and connected friend.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            <blockquote className="text-2xl font-medium text-gray-800 italic mb-4">
              "The best time to strengthen a friendship was a year ago. The second best time is now."
            </blockquote>
            <p className="text-gray-600">— Friend Umbrella Philosophy</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thoughtfulness, Simplified</h2>
            <p className="text-xl text-gray-600">Three simple steps to never let a friendship fade again</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Connect</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Securely identify the key relationships you want to nurture. Import from your contacts or add manually—your data stays private.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8">
                <ArrowRight className="w-8 h-8 text-blue-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Get Nudges</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Receive intelligent, timely reminders to reach out, follow up, or celebrate a milestone. Never intrusive, always thoughtful.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8">
                <ArrowRight className="w-8 h-8 text-blue-300" />
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Strengthen Bonds</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Build a consistent habit of connection and watch your relationships flourish. Small actions, profound impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-700 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Your Friendships Are Worth It</h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Stop letting great friendships drift. Join our exclusive waitlist to be the first to build stronger bonds with Friend Umbrella.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                {isSubmitted ? (
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
            <p className="text-sm text-blue-200 mt-3">Join 2,500+ people already on the waitlist</p>
          </form>

          <div className="flex items-center justify-center gap-8 text-sm text-blue-200">
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              iOS & Android
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Privacy-first design
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Built by friendship experts
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold text-white">Friend Umbrella</span>
          </div>
          <p className="text-gray-400">Your personal relationship manager. Coming soon.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;