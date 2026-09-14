import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MargexaIcon } from './MargexaLogo';
import { X, Lock, Mail, User, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signUp } = useAuth();
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    if (isSignUpMode) {
      if (!name) {
        setError('Please enter your full real name.');
        return;
      }
      signUp(email, password, name);
    } else {
      login(email, password);
    }

    setIsAuthModalOpen(false);
  };

  const handleDemoLogin = () => {
    login('rahul.menon@gmail.com', 'demo123');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-br from-[#0b2447] via-[#123363] to-[#0b2447] p-6 text-white text-left">
          <div className="flex items-center justify-between mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              100% Free Student Admission Portal
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/10 p-1 border border-white/20 flex items-center justify-center">
              <MargexaIcon className="w-full h-full" />
            </div>
          </div>
          <h3 className="text-xl font-bold font-heading">
            {isSignUpMode ? 'Create Your Student Profile' : 'Welcome Back to MARGEXA'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {isSignUpMode
              ? 'Join freely to unlock personalized Kerala college matching, cutoffs, and application tracking.'
              : 'Sign in to monitor your admission applications and scholarship status.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {isSignUpMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Real Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul K. Menon"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {isSignUpMode ? 'Sign Up Freely' : 'Sign In'}
            </button>
          </form>

          {/* Quick Demo Fill */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Sign in with Demo Student (Rahul Menon • 84%)
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsSignUpMode(!isSignUpMode);
                setError('');
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition cursor-pointer"
            >
              {isSignUpMode
                ? 'Already have an account? Sign In here'
                : "Don't have an account yet? Create one freely"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
