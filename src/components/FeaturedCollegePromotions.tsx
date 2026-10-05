import React, { useState, useEffect, useRef } from 'react';
import { College, Program, getEffectiveFee } from '../types';
import { COLLEGES_DATA } from '../data/collegesData';
import {
  Crown,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  Video,
  ExternalLink,
  BookOpen,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Megaphone,
  Check
} from 'lucide-react';

interface FeaturedCollegePromotionsProps {
  onSelectCollege: (college: College) => void;
  onOpenAICounselor: (context?: { college: string; program: string }) => void;
  onNavigateToCollegePlans?: () => void;
}

interface PromotedAdItem {
  id: string;
  collegeId: string;
  badge: string;
  badgeType: 'enterprise' | 'premium';
  headline: string;
  subheadline: string;
  keyPills: string[];
  ctaText: string;
  ctaType: 'counseling' | 'enquiry' | 'view';
  themeColor: 'amber' | 'indigo' | 'emerald';
}

export const FeaturedCollegePromotions: React.FC<FeaturedCollegePromotionsProps> = ({
  onSelectCollege,
  onOpenAICounselor,
  onNavigateToCollegePlans,
}) => {
  const chathamkulam = COLLEGES_DATA.find((c) => c.id === 'chathamkulam-institutions');
  const devagiri = COLLEGES_DATA.find((c) => c.id === 'devagiri-calicut');

  // Ad rotation items (5 seconds each)
  const adItems: PromotedAdItem[] = [
    {
      id: 'ad-cbs',
      collegeId: 'chathamkulam-institutions',
      badge: 'Top Recommendation',
      badgeType: 'enterprise',
      headline: 'Chathamkulam Business School (Palakkad)',
      subheadline: 'AICTE Approved • Affiliated to University of Calicut • 5 Specialized MBA Programs',
      keyPills: [
        'Marketing, HR, Finance, Data & Logistics',
        '94%+ Placement Record',
        'Online 1-on-1 Video Counselling with Dean',
        'Flat -₹10,000 MARGEXA Deduction',
      ],
      ctaText: 'Schedule Video Counselling',
      ctaType: 'counseling',
      themeColor: 'amber',
    },
    {
      id: 'ad-devagiri',
      collegeId: 'devagiri-calicut',
      badge: 'Top Recommendation',
      badgeType: 'premium',
      headline: "St. Joseph's College (Autonomous), Devagiri",
      subheadline: 'NAAC A++ (CGPA 3.76) • Heritage Autonomous Institution in Kozhikode',
      keyPills: [
        'B.Sc Computer Science, B.Com & M.Sc Data Analytics',
        'Direct Fast-Track Admissions Desk',
        'Govt. Subsidized Fees from ₹6,000/yr',
        'Flat -₹10,000 Fee Concession',
      ],
      ctaText: 'Submit Course Enquiry',
      ctaType: 'enquiry',
      themeColor: 'indigo',
    },
    {
      id: 'ad-rajagiri',
      collegeId: 'rajagiri-institutions',
      badge: 'Top Recommendation',
      badgeType: 'premium',
      headline: 'Rajagiri College of Social Sciences & RSET (Kochi)',
      subheadline: 'NAAC A++ (CGPA 3.83) • Premier Management & Tech Institution',
      keyPills: [
        'MBA, MCA & B.Com Computer Applications',
        'Infopark & SmartCity Placement Tie-ups',
        'International University Collaborations',
        'Flat -₹10,000 Fee Concession',
      ],
      ctaText: 'View Autonomous Degrees',
      ctaType: 'view',
      themeColor: 'emerald',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);

  // Interactive Online Counseling Modal for Enterprise Plan (Chathamkulam)
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);
  const [counselingCollege, setCounselingCollege] = useState<College | null>(null);
  const [counselingDate, setCounselingDate] = useState('2026-10-15');
  const [counselingTime, setCounselingTime] = useState('03:30 PM - 04:00 PM');
  const [studentPhone, setStudentPhone] = useState('');
  const [counselingCourse, setCounselingCourse] = useState('MBA in Data Analysis & Business Intelligence');
  const [counselingSuccess, setCounselingSuccess] = useState(false);

  // Quick Enquiry Modal for Premium Plan (Devagiri)
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryCollege, setEnquiryCollege] = useState<College | null>(null);
  const [enquiryCourse, setEnquiryCourse] = useState('B.Sc in Computer Science (Autonomous)');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Reliable 5-second auto-rotation timer
  useEffect(() => {
    // Only pause if user manually toggled pause or opened a popup modal
    if (isManualPaused || isCounselingModalOpen || isEnquiryModalOpen) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isManualPaused, isCounselingModalOpen, isEnquiryModalOpen, currentIndex, adItems.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % adItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + adItems.length) % adItems.length);
  };

  const handleSelectAd = (index: number) => {
    setCurrentIndex(index);
  };

  const activeAd = adItems[currentIndex];
  const activeCollege = COLLEGES_DATA.find((c) => c.id === activeAd.collegeId);

  const handleOpenCounseling = (college: College) => {
    setCounselingCollege(college);
    setCounselingSuccess(false);
    setIsCounselingModalOpen(true);
  };

  const handleOpenEnquiry = (college: College) => {
    setEnquiryCollege(college);
    setEnquirySuccess(false);
    setIsEnquiryModalOpen(true);
  };

  const handleBookCounseling = (e: React.FormEvent) => {
    e.preventDefault();
    setCounselingSuccess(true);
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
  };

  if (!activeCollege) return null;

  return (
    <div className="my-5 space-y-2">
      <style>{`
        @keyframes adProgressAnim {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* Small, comfortable 5-Second Rotating Promoted Ad Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border border-slate-700/80 shadow-lg transition-all duration-300 group">
        {/* Animated 5-Second Progress Bar at Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <div
            key={currentIndex}
            className={`h-full ${
              activeAd.themeColor === 'amber'
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400'
                : activeAd.themeColor === 'emerald'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400'
                : 'bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-400'
            }`}
            style={{
              animation: (isManualPaused || isCounselingModalOpen || isEnquiryModalOpen)
                ? 'none'
                : 'adProgressAnim 5s linear forwards',
            }}
          />
        </div>

        {/* Top Header Bar inside Ad */}
        <div className="px-4 py-2 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Top Recommendation
            </span>
            <span className="text-[11px] font-bold text-slate-300 hidden sm:inline">
              Recommended by MARGEXA Academic Advisory
            </span>
          </div>

          {/* 5-Second Rotation Indicators & Pause Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {adItems.map((ad, idx) => (
                <button
                  key={ad.id}
                  onClick={() => handleSelectAd(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 bg-amber-400'
                      : 'w-2 bg-slate-600 hover:bg-slate-400'
                  }`}
                  title={`Switch to ${ad.headline}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
              <span>5s</span>
              <button
                onClick={() => setIsManualPaused(!isManualPaused)}
                className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
                title={isManualPaused ? 'Resume 5s rotation' : 'Pause rotation'}
              >
                {isManualPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Compact Main Content Row */}
        <div className="p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Left: College Logo & Details */}
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            {/* Verified College Logo (Clean, non-broken SVG / image) */}
            <div className="relative shrink-0">
              <img
                src={activeCollege.logo}
                alt={activeCollege.name}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-contain p-1 border-2 border-white/20 bg-slate-900 shadow-md shrink-0"
                onError={(e) => {
                  e.currentTarget.src =
                    activeCollege.id === 'devagiri-calicut'
                      ? '/devagiri-logo.svg'
                      : '/chathamkulam-logo.svg';
                }}
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-xs">
                ✓
              </span>
            </div>

            {/* Texts */}
            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-amber-300 border border-white/10">
                  {activeCollege.location.city}, Kerala
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {activeCollege.accreditation.split('|')[0]}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-black text-white truncate font-heading mt-0.5">
                {activeCollege.name}
              </h3>

              {/* Key Features Pill Strip */}
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {activeAd.keyPills.slice(0, 3).map((pill, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium whitespace-nowrap"
                  >
                    ✓ {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Direct Action Buttons & Navigation Arrows */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between md:justify-end pt-1 md:pt-0 border-t md:border-t-0 border-white/10">
            {/* Primary Action Button based on college */}
            {activeAd.ctaType === 'counseling' ? (
              <button
                onClick={() => handleOpenCounseling(activeCollege)}
                className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-105"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{activeAd.ctaText}</span>
              </button>
            ) : (
              <button
                onClick={() => handleOpenEnquiry(activeCollege)}
                className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-black text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-105"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>{activeAd.ctaText}</span>
              </button>
            )}

            {/* View College Details */}
            <button
              onClick={() => onSelectCollege(activeCollege)}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition flex items-center justify-center gap-1 cursor-pointer border border-white/15"
              title="View Programs & Cutoffs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Programs</span>
            </button>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1 pl-1">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition cursor-pointer"
                title="Previous Ad"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition cursor-pointer"
                title="Next Ad"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Online Counseling Booking Modal (For Chathamkulam) */}
      {isCounselingModalOpen && counselingCollege && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scale-up text-left">
            <button
              onClick={() => setIsCounselingModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {counselingSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Online Counselling Confirmed!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your 1-on-1 video counselling session with the Admissions Director of{' '}
                  <strong className="text-indigo-700">{counselingCollege.name}</strong> has been scheduled.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Slot:</span>
                    <span className="font-bold text-slate-800">{counselingDate} at {counselingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selected Course:</span>
                    <span className="font-bold text-indigo-700">{counselingCourse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Meeting Link:</span>
                    <span className="font-mono text-indigo-600 font-bold">meet.google.com/cbs-admission</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2">
                    <span className="text-slate-500">MARGEXA Deduction:</span>
                    <span className="font-bold text-emerald-600">✓ Flat ₹10,000 Reserved</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCounselingModalOpen(false)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-amber-600 mb-1">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Online Counselling Scheduler
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Schedule Video Counselling with {counselingCollege.shortName}
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Direct admission consultation with Chathamkulam Business School faculty.
                </p>

                <form onSubmit={handleBookCounseling} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target MBA Specialization *
                    </label>
                    <select
                      value={counselingCourse}
                      onChange={(e) => setCounselingCourse(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                      {counselingCollege.programs.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={counselingDate}
                        onChange={(e) => setCounselingDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Time Slot *
                      </label>
                      <select
                        value={counselingTime}
                        onChange={(e) => setCounselingTime(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      >
                        <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                        <option value="03:30 PM - 04:00 PM">03:30 PM - 04:00 PM</option>
                        <option value="05:30 PM - 06:00 PM">05:30 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="+91 94471 28901"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
                    💡 <strong>Faculty Counselling:</strong> An authorized admissions faculty from Chathamkulam Business School will join you on video to review your degree marks, KMAT eligibility, and ensure your flat ₹10,000 MARGEXA deduction is credited.
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Video Slot</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCounselingModalOpen(false)}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Enquiry Modal (For Devagiri) */}
      {isEnquiryModalOpen && enquiryCollege && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scale-up text-left">
            <button
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {enquirySuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Enquiry Dispatched Directly!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your enquiry for <strong className="text-indigo-700">{enquiryCourse}</strong> has been routed to the Admissions Desk of{' '}
                  <strong>{enquiryCollege.name}</strong> via MARGEXA Verified Desk.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1.5 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Institution:</span>
                    <span className="font-bold text-slate-800">{enquiryCollege.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Course Selected:</span>
                    <span className="font-bold text-indigo-700">{enquiryCourse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Notification:</span>
                    <span className="text-emerald-700 font-bold">✓ Sent to Devagiri Admissions Team</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEnquiryModalOpen(false)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Direct Course Enquiry
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Direct Student Enquiry for {enquiryCollege.shortName}
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Admissions notification routed directly to Devagiri College Calicut.
                </p>

                <form onSubmit={handleSendEnquiry} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Interested Degree Program *
                    </label>
                    <select
                      value={enquiryCourse}
                      onChange={(e) => setEnquiryCourse(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                      {enquiryCollege.programs.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      placeholder="+91 98460 34120"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Send Enquiry to Devagiri Desk</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEnquiryModalOpen(false)}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
