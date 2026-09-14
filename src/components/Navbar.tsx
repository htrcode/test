import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MargexaLogo } from './MargexaLogo';
import {
  Sparkles,
  BookOpen,
  ClipboardList,
  Award,
  Crown,
  Bot,
  User,
  LogOut,
  LogIn,
  SlidersHorizontal,
  PhoneCall,
  CheckCircle2,
  Building,
  Handshake,
  Info,
  Compass,
  HelpCircle,
  Mail,
  ChevronDown
} from 'lucide-react';

export type NavTabType =
  | 'matchmaker'
  | 'colleges'
  | 'applications'
  | 'scholarships'
  | 'premium'
  | 'partners'
  | 'ai-counselor'
  | 'about'
  | 'how-it-works'
  | 'faq'
  | 'contact';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  onOpenCollegeRegistrationModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCollegeRegistrationModal }) => {
  const {
    student,
    isLoggedIn,
    applications,
    logout,
    setIsAuthModalOpen,
    setIsProfileModalOpen,
  } = useAuth();

  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Notification / Priority Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
              Admissions 2026 Open
            </span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              Direct institutional allotment for Chathamkulam Institutions, Palakkad & partner universities.
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <button
              onClick={() => setActiveTab('how-it-works')}
              className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition cursor-pointer"
            >
              <Compass className="w-3 h-3 text-indigo-400" />
              How It Works
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition cursor-pointer"
            >
              <Info className="w-3 h-3 text-amber-300" />
              About Us
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className="hidden lg:inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition cursor-pointer"
            >
              <HelpCircle className="w-3 h-3 text-cyan-300" />
              FAQ
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 font-semibold transition cursor-pointer"
            >
              <Mail className="w-3 h-3 text-amber-300" />
              <span>Contact Desk</span>
            </button>

            {onOpenCollegeRegistrationModal && (
              <button
                onClick={onOpenCollegeRegistrationModal}
                className="hidden xl:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 hover:text-emerald-200 transition cursor-pointer bg-emerald-950/60 hover:bg-emerald-900/80 px-2 py-0.5 rounded-md border border-emerald-500/30"
              >
                <Building className="w-3 h-3" />
                Register College
              </button>
            )}

            <button
              onClick={() => setActiveTab('partners')}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200 transition cursor-pointer"
            >
              <Handshake className="w-3 h-3" />
              B2B Partners
            </button>

            <button
              onClick={() => setActiveTab('premium')}
              className="text-amber-300 hover:text-amber-200 text-[11px] font-medium transition flex items-center gap-1 cursor-pointer"
            >
              <Crown className="w-3 h-3" />
              VIP
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo - Using Official MARGEXA Logo */}
          <div className="cursor-pointer shrink-0" onClick={() => setActiveTab('matchmaker')}>
            <MargexaLogo size="md" showTagline={true} />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('matchmaker')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'matchmaker'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Matchmaker
            </button>

            <button
              onClick={() => setActiveTab('colleges')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'colleges'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Colleges
            </button>

            <button
              onClick={() => setActiveTab('scholarships')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'scholarships'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Scholarships
            </button>

            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'how-it-works'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              How It Works
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              About Us
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Us
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 relative cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              Applications
              {applications.length > 0 && (
                <span
                  className={`w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${
                    activeTab === 'applications'
                      ? 'bg-white text-indigo-700'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {applications.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Handshake className="w-3.5 h-3.5 text-cyan-600" />
              Partners
            </button>

            <button
              onClick={() => setActiveTab('ai-counselor')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ai-counselor'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-600 hover:bg-indigo-50 font-bold'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              AI Advisor
            </button>
          </nav>

          {/* Right Action Profile / Auth Bar */}
          <div className="flex items-center gap-2.5">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* Profile Pill */}
                <div
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200 transition cursor-pointer group"
                  title="Click to edit your qualifications, budget & preferences"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {student.name.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition">
                        {student.name}
                      </span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                      <span>{student.percentage}%</span>
                      <span>•</span>
                      <span>₹{(student.budget / 1000).toFixed(0)}k/yr</span>
                      <span>•</span>
                      <span>{student.preferredMode}</span>
                    </div>
                  </div>
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
                </div>

                {/* Logout button */}
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  Free Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Navigation Strip */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2.5 border-t border-slate-200/60 no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('matchmaker')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 ${
              activeTab === 'matchmaker' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Matchmaker
          </button>
          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 ${
              activeTab === 'colleges' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Colleges
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 ${
              activeTab === 'applications' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('scholarships')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 ${
              activeTab === 'scholarships' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Scholarships
          </button>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'how-it-works' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            How It Works
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'about' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            About Us
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'faq' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'contact' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Us
          </button>
          <button
            onClick={() => setActiveTab('premium')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'premium' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            VIP Mentorship
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'partners' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Handshake className="w-3.5 h-3.5 text-cyan-600" />
            Partners
          </button>
          <button
            onClick={() => setActiveTab('ai-counselor')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ai-counselor' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            AI Advisor
          </button>
        </div>
      </div>
    </header>
  );
};
