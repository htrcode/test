import React, { useState } from 'react';
import { College, Program, getEffectiveFee } from '../types';
import { COLLEGES_DATA } from '../data/collegesData';
import {
  Crown,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Video,
  ExternalLink,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Building,
  GraduationCap,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  X,
  FileText
} from 'lucide-react';

interface FeaturedCollegePromotionsProps {
  onSelectCollege: (college: College) => void;
  onOpenAICounselor: (context?: { college: string; program: string }) => void;
  onNavigateToCollegePlans?: () => void;
}

export const FeaturedCollegePromotions: React.FC<FeaturedCollegePromotionsProps> = ({
  onSelectCollege,
  onOpenAICounselor,
  onNavigateToCollegePlans,
}) => {
  const chathamkulam = COLLEGES_DATA.find((c) => c.id === 'chathamkulam-institutions');
  const devagiri = COLLEGES_DATA.find((c) => c.id === 'devagiri-calicut');

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

  return (
    <div className="space-y-4 my-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 rounded-3xl border border-indigo-900/60 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                Featured Promotions
              </span>
              <span className="text-xs text-slate-300 font-medium hidden md:inline">
                Verified MARGEXA College Premium & Enterprise Partners
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white font-heading mt-0.5">
              Promoted Institutional Admissions 2026
            </h2>
          </div>
        </div>

        {onNavigateToCollegePlans && (
          <button
            onClick={onNavigateToCollegePlans}
            className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/20 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Are you a college? View Plans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CARD 1: CHATHAMKULAM BUSINESS SCHOOL - ENTERPRISE PLAN (₹7,999/mo) */}
        {chathamkulam && (
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white border-2 border-amber-400/60 shadow-xl shadow-amber-500/5 overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition-all duration-300">
            {/* Top Priority Badge */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 py-2 flex items-center justify-between text-xs font-black uppercase tracking-wider shadow-sm">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-slate-950 animate-bounce" />
                <span>Priority Enterprise Promotion #1</span>
              </div>
              <span className="text-[10px] bg-slate-950 text-amber-300 font-black px-2 py-0.5 rounded-full border border-amber-400/30">
                ₹7,999 /mo Enterprise Plan
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* College Title & Campus */}
              <div className="flex items-start gap-3.5">
                <img
                  src={chathamkulam.logo}
                  alt={chathamkulam.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400/40 shrink-0 bg-white/10"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Palakkad, Kerala • Affiliated to University of Calicut</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                    {chathamkulam.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {chathamkulam.tagline}
                  </p>
                </div>
              </div>

              {/* MBA Specializations Pill Strip */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-200 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    Exclusively Offered MBA Specializations (5 Programs):
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                    Flat -₹10,000 Fee Deduction
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Marketing Management',
                    'Human Resources',
                    'Financial Management',
                    'Data Analysis & BI',
                    'Logistics & Supply Chain',
                  ].map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-indigo-900/60 border border-indigo-400/30 text-indigo-200 rounded-md text-[11px] font-medium"
                    >
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enterprise Exclusive Capabilities */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">Online Video Counselling</div>
                    <div className="text-[10px] text-slate-400">Direct booking with Dean</div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">94%+ Placement Cell</div>
                    <div className="text-[10px] text-slate-400">Top MNC recruiters</div>
                  </div>
                </div>
              </div>

              {/* Fee and Incentive */}
              <div className="bg-emerald-950/60 border border-emerald-500/30 p-3 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                    MARGEXA Institutional Grant
                  </span>
                  <span className="text-slate-300 text-[11px]">
                    Standard Tuition: <span className="line-through">₹1,35,000/yr</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-300">
                    Net: ₹1,25,000/yr
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-semibold">
                    Instant -₹10,000 Concession
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 sm:p-6 pt-0 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleOpenCounseling(chathamkulam)}
                className="flex-1 min-w-[170px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-[1.02]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Online Counselling</span>
              </button>

              <button
                onClick={() => onSelectCollege(chathamkulam)}
                className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View All 5 MBA Programs</span>
              </button>

              <a
                href={chathamkulam.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition flex items-center justify-center"
                title="Official Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* CARD 2: ST. JOSEPH'S COLLEGE (AUTONOMOUS), DEVAGIRI - PREMIUM PLAN (₹3,999/mo) */}
        {devagiri && (
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white border-2 border-indigo-400/60 shadow-xl shadow-indigo-500/5 overflow-hidden flex flex-col justify-between group hover:border-indigo-400 transition-all duration-300">
            {/* Top Premium Badge */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 text-white px-4 py-2 flex items-center justify-between text-xs font-black uppercase tracking-wider shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Featured College Premium Promotion</span>
              </div>
              <span className="text-[10px] bg-white/20 text-white font-black px-2 py-0.5 rounded-full border border-white/20">
                ₹3,999 /mo Premium Plan
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* College Title & Campus */}
              <div className="flex items-start gap-3.5">
                <img
                  src={devagiri.logo}
                  alt={devagiri.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-400/40 shrink-0 bg-white/10"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-bold mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Kozhikode, Kerala • NAAC A++ (CGPA 3.76)</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                    {devagiri.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {devagiri.tagline}
                  </p>
                </div>
              </div>

              {/* Flagship Autonomous Degrees */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-indigo-200 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    Flagship Autonomous Programs Listed:
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                    Flat -₹10,000 Fee Deduction
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {devagiri.programs.map((prog) => (
                    <span
                      key={prog.id}
                      className="px-2 py-0.5 bg-blue-900/60 border border-blue-400/30 text-blue-200 rounded-md text-[11px] font-medium"
                    >
                      ✓ {prog.name} (₹{getEffectiveFee(prog.annualFee).toLocaleString('en-IN')}/yr)
                    </span>
                  ))}
                </div>
              </div>

              {/* Premium Perks Highlight */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">Digital Prospectus & 4K Gallery</div>
                    <div className="text-[10px] text-slate-400">Verified Campus Tour</div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">Priority Enquiry Alerts</div>
                    <div className="text-[10px] text-slate-400">Fast admissions review</div>
                  </div>
                </div>
              </div>

              {/* Net Subsidized Tuition */}
              <div className="bg-indigo-950/60 border border-indigo-500/30 p-3 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-300 block">
                    Starting Net Student Fee
                  </span>
                  <span className="text-slate-300 text-[11px]">
                    Govt. Aided Autonomous Tuition from
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-indigo-300">
                    Net: ₹6,000 – ₹35,000/yr
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-semibold">
                    Flat -₹10,000 MARGEXA Concession
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 sm:p-6 pt-0 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleOpenEnquiry(devagiri)}
                className="flex-1 min-w-[170px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-black text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-[1.02]"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>Submit Course Enquiry</span>
              </button>

              <button
                onClick={() => onSelectCollege(devagiri)}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Prospectus & Degrees</span>
              </button>

              <a
                href={devagiri.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition flex items-center justify-center"
                title="Official Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Online Counseling Booking Modal (Enterprise Plan Feature - Chathamkulam) */}
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
                    Enterprise Online Counselling Scheduler
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Schedule Video Counselling with {counselingCollege.shortName}
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Exclusive feature for Chathamkulam Business School via the MARGEXA College Enterprise plan.
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
                    💡 <strong>Enterprise Guarantee:</strong> An authorized admissions faculty from Chathamkulam Business School will join you on video to review your degree marks, KMAT eligibility, and ensure your flat ₹10,000 MARGEXA deduction is credited.
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

      {/* Quick Enquiry Modal (Premium Plan Feature - Devagiri) */}
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
                  <strong>{enquiryCollege.name}</strong> via MARGEXA College Premium CRM.
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
                    <span className="text-slate-500">Priority Notification:</span>
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
                    College Premium Direct Enquiry
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Direct Student Enquiry for {enquiryCollege.shortName}
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Subscribed to MARGEXA College Premium (₹3,999/mo) with priority notification alerts.
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
