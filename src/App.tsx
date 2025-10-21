import React, { useState } from 'react';
import { addToWaitlist, getCurrentUser, signOut } from './lib/supabase';
import { Mail, Umbrella, ArrowRight, CheckCircle } from 'lucide-react';
import AuthModal from './components/AuthModal';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check for authenticated user on component mount
  React.useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { user } = await getCurrentUser();
    setUser(user);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    if (email) {
      setIsLoading(true);
      setMessage('');
      
      const result = await addToWaitlist(email, 'landing_page', 'A');
      
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

  const handleAuthSuccess = () => {
    checkUser();
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      setUser(null);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-cream to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* User Status Bar */}
        {user && (
          <div className="fixed top-4 right-4 flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-lg">
            <span className="text-sm text-blue-700">Welcome, {user.email}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-pink-500 hover:text-pink-600 font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-200 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Umbrella className="w-4 h-4" />
            Personal Relationship Manager
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight font-['Leto']">
            Don't let your best<br />
            <span className="text-pink-500">friendships fade away</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-blue-800 mb-12 leading-relaxed font-light">
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
                  {user ? 'Join Waitlist' : 'Sign In to Join'}
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
            <p className="text-sm text-blue-600">
              {user ? 'No spam, ever. Just one notification when we launch.' : 'Create an account to join the waitlist'}
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Umbrella className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold text-blue-900 font-['Leto']">Net-umbrella</span>
          </div>
          <p className="text-blue-700">Your personal relationship manager. Coming soon.</p>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;