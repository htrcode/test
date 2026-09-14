import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, NavTabType } from './components/Navbar';
import { MatchmakerView } from './components/MatchmakerView';
import { CollegeDirectoryView } from './components/CollegeDirectoryView';
import { ApplicationsDashboard } from './components/ApplicationsDashboard';
import { ScholarshipsView } from './components/ScholarshipsView';
import { PremiumServicesView } from './components/PremiumServicesView';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { AICounselorDrawer } from './components/AICounselorDrawer';
import { OfferLetterModal } from './components/OfferLetterModal';
import { CollegeDetailModal } from './components/CollegeDetailModal';
import { CollegeRegistrationModal } from './components/CollegeRegistrationModal';
import { PartnerNetworkView } from './components/PartnerNetworkView';
import { AboutView } from './components/AboutView';
import { HowItWorksView } from './components/HowItWorksView';
import { FAQView } from './components/FAQView';
import { ContactView } from './components/ContactView';
import { MargexaLogo } from './components/MargexaLogo';
import { College, Application } from './types';
import {
  GraduationCap,
  Sparkles,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  Bot,
  ShieldCheck,
  Award,
  Building,
  Handshake,
  Info,
  Compass,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type TabType = NavTabType;

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('matchmaker');
  const [selectedCollegeModal, setSelectedCollegeModal] = useState<College | null>(null);
  const [isCollegeRegModalOpen, setIsCollegeRegModalOpen] = useState(false);
  const [isAICounselorOpen, setIsAICounselorOpen] = useState(false);
  const [aiContext, setAiContext] = useState<{ college: string; program: string } | null>(null);
  const [selectedOfferApplication, setSelectedOfferApplication] = useState<Application | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollAction = () => {
    if (scrollY < 250) {
      window.scrollBy({ top: 600, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAICounselor = (context?: { college: string; program: string }) => {
    setAiContext(context || null);
    setIsAICounselorOpen(true);
  };

  const handleSelectCollege = (college: College) => {
    setSelectedCollegeModal(college);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab === 'ai-counselor' ? 'matchmaker' : activeTab}
        setActiveTab={(tab) => {
          if (tab === 'ai-counselor') {
            handleOpenAICounselor();
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenCollegeRegistrationModal={() => setIsCollegeRegModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeTab === 'matchmaker' && (
          <MatchmakerView
            onSelectCollege={handleSelectCollege}
            onOpenAICounselor={handleOpenAICounselor}
          />
        )}

        {activeTab === 'colleges' && (
          <CollegeDirectoryView
            selectedCollegeModal={selectedCollegeModal}
            setSelectedCollegeModal={setSelectedCollegeModal}
            onOpenAICounselor={handleOpenAICounselor}
            onOpenCollegeRegistrationModal={() => setIsCollegeRegModalOpen(true)}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsDashboard
            onNavigateToMatchmaker={() => setActiveTab('matchmaker')}
            onNavigateToCounseling={() => setActiveTab('premium')}
            onViewOfferLetter={(app) => setSelectedOfferApplication(app)}
          />
        )}

        {activeTab === 'scholarships' && <ScholarshipsView />}

        {activeTab === 'premium' && <PremiumServicesView />}

        {activeTab === 'partners' && (
          <PartnerNetworkView
            onOpenCollegeRegistrationModal={() => setIsCollegeRegModalOpen(true)}
            onOpenAICounselor={handleOpenAICounselor}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onNavigateToMatchmaker={() => setActiveTab('matchmaker')}
            onNavigateToColleges={() => setActiveTab('colleges')}
            onNavigateToScholarships={() => setActiveTab('scholarships')}
            onNavigateToContact={() => setActiveTab('contact')}
          />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksView
            onNavigateToMatchmaker={() => setActiveTab('matchmaker')}
            onNavigateToColleges={() => setActiveTab('colleges')}
            onNavigateToScholarships={() => setActiveTab('scholarships')}
            onNavigateToFAQ={() => setActiveTab('faq')}
            onNavigateToContact={() => setActiveTab('contact')}
          />
        )}

        {activeTab === 'faq' && (
          <FAQView
            onNavigateToMatchmaker={() => setActiveTab('matchmaker')}
            onNavigateToContact={() => setActiveTab('contact')}
            onNavigateToPartners={() => setActiveTab('partners')}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView onOpenAICounselor={handleOpenAICounselor} />
        )}
      </main>

      {/* Floating Scroll Navigation Button */}
      <button
        onClick={handleScrollAction}
        className="fixed bottom-20 right-6 z-40 bg-white/95 backdrop-blur-xs hover:bg-slate-50 text-slate-700 hover:text-indigo-600 p-3 sm:px-4 sm:py-2.5 rounded-full shadow-lg border border-slate-200/90 flex items-center gap-1.5 transition-all duration-200 cursor-pointer hover:shadow-xl hover:scale-105"
        title={scrollY < 250 ? 'Scroll Down' : 'Back to Top'}
        aria-label={scrollY < 250 ? 'Scroll Down' : 'Back to Top'}
      >
        {scrollY < 250 ? (
          <>
            <ChevronDown className="w-4 h-4 text-indigo-600 animate-bounce" />
            <span className="text-xs font-semibold hidden sm:inline">Scroll Down</span>
          </>
        ) : (
          <>
            <ChevronUp className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-semibold hidden sm:inline">Back to Top</span>
          </>
        )}
      </button>

      {/* Floating AI Counselor Floating Trigger */}
      <button
        onClick={() => handleOpenAICounselor()}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-xl shadow-indigo-600/30 flex items-center gap-2.5 transition duration-200 cursor-pointer border border-white/20 hover:scale-105"
        title="Chat with MARGEXA AI Counselor"
      >
        <Bot className="w-5 h-5 text-amber-300 animate-bounce" />
        <span className="text-xs font-bold hidden sm:inline">Ask AI Advisor</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
      </button>

      {/* Modals & Drawers */}
      <AuthModal />
      <ProfileModal />
      <AICounselorDrawer
        isOpen={isAICounselorOpen}
        onClose={() => {
          setIsAICounselorOpen(false);
          setAiContext(null);
        }}
        initialContext={aiContext}
      />
      <OfferLetterModal
        application={selectedOfferApplication}
        onClose={() => setSelectedOfferApplication(null)}
      />
      {/* College Full Details & Photo Gallery Modal */}
      <CollegeDetailModal
        college={selectedCollegeModal}
        onClose={() => setSelectedCollegeModal(null)}
        onOpenAICounselor={handleOpenAICounselor}
      />
      {/* College Institutional Registration Application Modal */}
      <CollegeRegistrationModal
        isOpen={isCollegeRegModalOpen}
        onClose={() => setIsCollegeRegModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16 pt-12 pb-8 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-3">
              <div className="bg-white/95 rounded-xl p-3 inline-block shadow-sm">
                <MargexaLogo size="sm" showTagline={true} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kerala's premier education consultancy and student-college matching platform, connecting academic merit with leading institutions including Chathamkulam Group of Institutions.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Admissions & Scholarship Partner</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Navigation & Admissions
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => setActiveTab('matchmaker')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    AI College Matchmaker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('colleges')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    Polytechnic & Degree Directory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('how-it-works')}
                    className="hover:text-indigo-300 transition cursor-pointer font-medium text-indigo-400"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('about')}
                    className="hover:text-amber-300 transition cursor-pointer font-medium text-amber-400"
                  >
                    About MARGEXA
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('faq')}
                    className="hover:text-cyan-300 transition cursor-pointer font-medium text-cyan-400"
                  >
                    Frequently Asked Questions (FAQ)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="hover:text-emerald-300 transition cursor-pointer font-medium text-emerald-400"
                  >
                    Contact Us (support@margexa.com)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('scholarships')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    Chathamkulam Merit Grants
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('partners')}
                    className="hover:text-cyan-300 transition cursor-pointer text-cyan-400 font-medium"
                  >
                    Career Center Partner Network
                  </button>
                </li>
              </ul>
            </div>

            {/* Featured Institutions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Partner Institutions
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <a
                    href="https://chathamkulaminstitutions.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 transition flex items-center gap-1"
                  >
                    <span>Chathamkulam Institutions, Palakkad</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>Chathamkulam Business School (MBA)</li>
                <li>Chathamkulam College of Arts & Science</li>
                <li>Chathamkulam Polytechnic College</li>
                <li>Rajagiri College of Social Sciences, Kochi</li>
                <li>SCMS Group of Institutions, Aluva</li>
                <li>Govt. Polytechnic College, Palakkad</li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Support & Admissions Desk
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Support Email:{' '}
                  <a
                    href="mailto:support@margexa.com"
                    className="text-white hover:text-amber-300 font-mono font-bold underline"
                  >
                    support@margexa.com
                  </a>
                </span>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3" />
                  Open Contact Us Form
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} MARGEXA Education Consultancy. All rights reserved. Featuring Chathamkulam Group of Institutions and premier Kerala academic institutions.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
