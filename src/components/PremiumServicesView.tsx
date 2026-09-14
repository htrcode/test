import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MENTORS_DATA } from '../data/mentorsData';
import { Mentor } from '../types';
import {
  Crown,
  PhoneCall,
  Video,
  Clock,
  CheckCircle2,
  Star,
  Zap,
  ShieldCheck,
  Check,
  X,
  CreditCard,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const PremiumServicesView: React.FC = () => {
  const {
    student,
    counselingBookings,
    bookPriorityCounseling,
    isVipMember,
    vipPlanExpiry,
    subscribeVipPlan,
    cancelVipPlan
  } = useAuth();

  // Subscription Modal State
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [subPaymentMethod, setSubPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [subSuccessToast, setSubSuccessToast] = useState<boolean>(false);

  // Booking Mentor Modal State
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [mentorSlot, setMentorSlot] = useState<string>('');
  const [mentorTopic, setMentorTopic] = useState<string>('Chathamkulam & Kerala Admissions');
  const [mentorPaymentMethod, setMentorPaymentMethod] = useState<'upi' | 'card' | 'pay_later'>('upi');
  const [mentorSuccessToast, setMentorSuccessToast] = useState<boolean>(false);

  // VIP Express Form State
  const [phone, setPhone] = useState<string>(student.phone || '+91 98471 23456');
  const [mode, setMode] = useState<'Phone Call' | 'Video Meet' | 'In-Person (Palakkad/Kochi)'>('Phone Call');
  const [priority, setPriority] = useState<'Immediate Express (Within 20 mins)' | 'Standard VIP (Within 2 hrs)'>('Immediate Express (Within 20 mins)');
  const [targetCollege, setTargetCollege] = useState<string>('Chathamkulam Group of Institutions');
  const [notes, setNotes] = useState<string>('Need assistance evaluating eligibility for MBA/Degree programs and merit scholarship concessions.');
  const [vipSuccessToast, setVipSuccessToast] = useState<boolean>(false);

  const handleSubscribeModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeVipPlan();
    setSubSuccessToast(true);
    setTimeout(() => {
      setSubSuccessToast(false);
      setIsSubscriptionModalOpen(false);
    }, 2000);
  };

  const handleBookVIP = (e: React.FormEvent) => {
    e.preventDefault();

    // If student doesn't have the VIP plan yet, open subscription modal to pay ₹349/mo
    if (!isVipMember) {
      setIsSubscriptionModalOpen(true);
      return;
    }

    bookPriorityCounseling({
      studentName: student.name,
      studentEmail: student.email,
      phone,
      preferredMode: mode,
      priority,
      targetCollege,
      notes,
    });

    setVipSuccessToast(true);
    setTimeout(() => {
      setVipSuccessToast(false);
    }, 3500);
  };

  const handleBookMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !mentorSlot) return;

    // If not VIP member yet, automatically subscribe them as part of booking ₹349/month plan
    if (!isVipMember) {
      subscribeVipPlan();
    }

    bookPriorityCounseling({
      studentName: student.name,
      studentEmail: student.email,
      phone: student.phone,
      preferredMode: 'Video Meet',
      priority: 'Standard VIP (Within 2 hrs)',
      targetCollege: `Mentorship Session with ${selectedMentor.name}`,
      notes: `Topic: ${mentorTopic} | Slot: ${mentorSlot}`,
    });

    setMentorSuccessToast(true);
    setTimeout(() => {
      setMentorSuccessToast(false);
      setSelectedMentor(null);
      setMentorSlot('');
    }, 2500);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              MARGEXA VIP Mentorship Services
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Personalized Mentorship & Priority VIP Counseling
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fast-track your admissions with 20-minute priority callbacks and 1-on-1 strategic sessions led by former university deans, corporate recruiters, and academic advocates.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left shrink-0 space-y-1">
            <div className="text-xs text-slate-400 font-medium">VIP Student Desk Hotline</div>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              +91 94470 12389
            </div>
            <div className="text-[11px] text-slate-300">
              Palakkad & Kochi Central Admission Desks
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT VIP MONTHLY SUBSCRIPTION STATUS BANNER */}
      {isVipMember ? (
        <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-indigo-500/15 border-2 border-emerald-400/50 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 text-left shadow-xs">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              STUDENT VIP MENTORSHIP ACTIVE (₹349/mo)
            </div>
            <h2 className="text-xl font-black text-slate-900 font-heading">
              Unlimited Priority Counseling & 1-on-1 Mentorship Unlocked
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Your monthly subscription is active ({vipPlanExpiry}). Both <strong>Priority VIP Counseling (20-min express callback)</strong> and <strong>1-on-1 Academic Mentorship sessions</strong> are included without any per-session charges!
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              All VIP Features Unlocked
            </span>
            <button
              onClick={cancelVipPlan}
              className="text-[11px] text-slate-500 hover:text-slate-700 underline cursor-pointer"
            >
              Cancel Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-blue-500/15 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left shadow-sm">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-black border border-amber-300 shadow-2xs">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              STUDENT VIP MENTORSHIP PLAN • ₹349 / MONTH
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              One Monthly Plan. Unlocks Both Priority Counseling & 1-on-1 Mentorship.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Students don&apos;t have to pay every time! For just <strong className="text-slate-900">₹349 per month</strong>, get unlimited access to both <strong>Priority VIP Counseling (20-min express callback)</strong> and <strong>1-on-1 Academic Mentorship sessions</strong> with veteran university deans.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-700">
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Priority VIP Counseling (20-Min Callbacks)
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 1-on-1 Academic Mentorship Sessions
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> No Per-Session Fees • Single Monthly Plan
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-md text-center shrink-0 min-w-[240px] space-y-2.5">
            <div className="text-[11px] uppercase tracking-wider font-extrabold text-amber-800">
              Student Monthly Plan
            </div>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-black text-slate-950 font-heading">₹349</span>
              <span className="text-xs text-slate-500 font-semibold">/ month</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Covers both features • Cancel anytime
            </div>
            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              Subscribe to VIP (₹349/mo)
            </button>
          </div>
        </div>
      )}

      {/* SECTION 1: Priority VIP Counseling Fast-Track Form */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Zap className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Book Priority VIP Counseling
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Guaranteed callback or video consultation within 20 minutes with a senior admission officer.
            </p>
          </div>

          {isVipMember ? (
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-300 self-start md:self-auto flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Included with your ₹349/mo VIP Plan
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-300 self-start md:self-auto flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              VIP Feature • ₹349/mo Plan Required
            </span>
          )}
        </div>

        {/* Informative notice for non-VIP vs VIP */}
        {!isVipMember ? (
          <div className="my-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Crown className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Student VIP Mentorship Feature: </span>
                <span>Priority 20-minute counseling and 1-on-1 academic mentorship are unlocked with our <strong>₹349/month</strong> plan. Pay once a month — you do not pay every time!</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs whitespace-nowrap cursor-pointer transition shadow-xs self-start sm:self-auto"
            >
              Activate VIP Plan (₹349/mo)
            </button>
          </div>
        ) : (
          <div className="my-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Your <strong>Student VIP Plan (₹349/mo)</strong> is active! Fast-track 20-min callbacks are included at zero extra charge.</span>
          </div>
        )}

        {vipSuccessToast && (
          <div className="my-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Priority Counseling Scheduled! Our senior counselor is reviewing your profile and will connect on {phone} shortly.
          </div>
        )}

        <form onSubmit={handleBookVIP} className="pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Contact Phone
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Phone Call">Direct Phone Call</option>
                <option value="Video Meet">Google Meet / Video Consultation</option>
                <option value="In-Person (Palakkad/Kochi)">In-Person (Palakkad / Kochi Office)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Queue Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Immediate Express (Within 20 mins)">Immediate Express (Within 20 mins)</option>
                <option value="Standard VIP (Within 2 hrs)">Standard VIP (Within 2 hrs)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Target Institution
              </label>
              <input
                type="text"
                value={targetCollege}
                onChange={(e) => setTargetCollege(e.target.value)}
                placeholder="e.g. Chathamkulam Group of Institutions, Palakkad"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Counseling Requirements / Query
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {isVipMember ? (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  Confirm Priority Counseling Slot (Included in Plan)
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4 text-amber-300" />
                  Subscribe for ₹349/mo & Book Priority Counseling
                </>
              )}
            </button>
            <span className="text-[11px] text-slate-500">
              {isVipMember
                ? '✓ Covered under your active ₹349/mo subscription • No additional fee'
                : '₹349/month subscription unlocks both priority counseling & 1-on-1 mentorship'}
            </span>
          </div>
        </form>

        {/* Existing Bookings Tracker */}
        {counselingBookings.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              Your Active Priority Counseling Sessions ({counselingBookings.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {counselingBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-indigo-700">{b.id}</span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-semibold">
                        {b.status}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800">{b.targetCollege}</div>
                    <div className="text-slate-500 text-[11px]">
                      Mode: {b.preferredMode} • Booked: {b.bookedAt}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                    VIP Queue Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: 1-on-1 Personalized Academic Mentorship */}
      <div className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              1-on-1 Academic Mentors (Included with ₹349/mo VIP Plan)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose an expert advisor suited for your target field. Subscribing to the ₹349/month plan covers all mentor sessions without per-session charges.
            </p>
          </div>
          {isVipMember && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300 self-start sm:self-auto">
              ✓ All Mentors Included in Your Plan
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MENTORS_DATA.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-indigo-700 font-semibold">{mentor.role}</p>
                    <p className="text-[11px] text-slate-500">{mentor.affiliation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {mentor.rating}
                  </span>
                  <span>•</span>
                  <span>{mentor.sessionsCount}+ Sessions</span>
                  <span>•</span>
                  <span>{mentor.experience}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {mentor.bio}
                </p>

                <div className="space-y-1 pt-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Key Advisory Areas:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-700 rounded-md font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      {isVipMember ? 'Plan Status' : 'Student Monthly Plan'}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      {isVipMember ? (
                        <span className="text-base font-black text-emerald-700 font-heading">Included (Free)</span>
                      ) : (
                        <>
                          <span className="text-lg font-black text-indigo-700 font-heading">₹349</span>
                          <span className="text-xs text-slate-500 font-semibold">/ month</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    30-Min 1-on-1 Video
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setMentorSlot(mentor.availableSlots[0]);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  {isVipMember ? 'Book Session (Included in Plan)' : 'Subscribe for ₹349/mo & Book'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: VIP Mentorship Monthly Subscription Modal */}
      {isSubscriptionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 p-6 text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                Student VIP Mentorship Monthly Plan
              </h3>
              <button
                onClick={() => setIsSubscriptionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {subSuccessToast ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">VIP Subscription Activated!</h4>
                <p className="text-xs text-slate-600">
                  You now have full access to both <strong>Priority VIP Counseling (20-min callbacks)</strong> and <strong>1-on-1 Academic Mentorship sessions</strong> for 30 days. You do not need to pay per session!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubscriptionModalOpen(false);
                      setSubSuccessToast(false);
                    }}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                  >
                    Start Using VIP Features
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribeModalSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs space-y-2">
                  <div className="flex justify-between items-center text-slate-800">
                    <span className="font-medium">Plan:</span>
                    <span className="font-bold">Student VIP Monthly Membership</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-800">
                    <span className="font-medium">Billing Period:</span>
                    <span className="font-bold">30 Days (Monthly)</span>
                  </div>
                  <div className="border-t border-amber-200 pt-2 flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total Monthly Fee:</span>
                    <span className="text-lg font-black text-slate-950 font-heading">₹349 / mo</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                    What&apos;s Included in Your ₹349 Plan:
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Book Priority VIP Counseling:</strong> Fast-track 20-minute callback or video meet with senior admission officers.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>1-on-1 Dean Mentorship Sessions:</strong> Private 30-min strategy sessions with veteran university advisors.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Single Monthly Plan:</strong> You don&apos;t have to pay every time you consult or book.</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Payment Method (₹349)
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setSubPaymentMethod('upi')}
                      className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                        subPaymentMethod === 'upi'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-500'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      UPI / GPay
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubPaymentMethod('card')}
                      className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                        subPaymentMethod === 'card'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-500'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubPaymentMethod('netbanking')}
                      className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                        subPaymentMethod === 'netbanking'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-500'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      NetBanking
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsSubscriptionModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    Activate VIP Plan (₹349/mo)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Mentorship Session Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                Book VIP Mentorship with {selectedMentor.name}
              </h3>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {mentorSuccessToast ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">VIP Mentorship Booked!</h4>
                <p className="text-xs text-slate-600">
                  Google Meet invitation for{' '}
                  <span className="font-semibold text-slate-900">{mentorSlot}</span> with{' '}
                  <span className="font-semibold text-slate-900">{selectedMentor.name}</span> has been confirmed and sent to{' '}
                  <span className="text-indigo-600 font-semibold">{student.email}</span>.
                </p>
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  ✓ Covered by your ₹349/month Student VIP Plan. No per-session charges!
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedMentor(null);
                      setMentorSuccessToast(false);
                    }}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookMentor} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Available Consultation Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedMentor.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setMentorSlot(slot)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${
                          mentorSlot === slot
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Advisory Discussion Topic
                  </label>
                  <select
                    value={mentorTopic}
                    onChange={(e) => setMentorTopic(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
                  >
                    <option value="Chathamkulam Institutions Admission & Quotas">Chathamkulam Institutions Admission & Quotas</option>
                    <option value="Polytechnic Diploma vs B.Tech Career Pathways">Polytechnic Diploma vs B.Tech Career Pathways</option>
                    <option value="MBA Logistics & Supply Chain Industry Readiness">MBA Logistics & Supply Chain Industry Readiness</option>
                    <option value="Scholarship Application & Fee Concession Support">Scholarship Application & Fee Concession Support</option>
                  </select>
                </div>

                {/* VIP Subscription Plan Status Summary */}
                {isVipMember ? (
                  <div className="bg-emerald-50 p-3.5 rounded-2xl text-xs space-y-1.5 border border-emerald-200">
                    <div className="flex justify-between items-center text-slate-700">
                      <span>VIP Subscription:</span>
                      <span className="font-bold text-emerald-800">Active ({vipPlanExpiry})</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <span>Session Fee:</span>
                      <span className="font-extrabold text-emerald-700 text-sm">₹0 (Included in Plan)</span>
                    </div>
                    <div className="text-[11px] text-emerald-800 font-medium">
                      ✓ You do not need to pay per session — both priority counseling and 1-on-1 mentorship are covered under your ₹349/month plan!
                    </div>
                  </div>
                ) : (
                  <div className="bg-indigo-50/80 p-3.5 rounded-2xl text-xs space-y-2 border border-indigo-100">
                    <div className="flex justify-between items-center text-slate-700">
                      <span>Plan Activation:</span>
                      <span className="font-bold text-slate-900">Student VIP Monthly Plan</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <span>Monthly Fee:</span>
                      <span className="text-sm font-black text-indigo-700">₹349 / month</span>
                    </div>
                    <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-indigo-100">
                      ✨ <strong>Not a per-session fee:</strong> Paying ₹349 activates your monthly VIP membership. You get this mentor session, future mentor sessions, AND Priority VIP Counseling without paying every time!
                    </div>
                  </div>
                )}

                {!isVipMember && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Payment Method for Monthly Plan (₹349)
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setMentorPaymentMethod('upi')}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                          mentorPaymentMethod === 'upi'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-500'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        UPI / GPay
                      </button>
                      <button
                        type="button"
                        onClick={() => setMentorPaymentMethod('card')}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                          mentorPaymentMethod === 'card'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-500'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        Debit/Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setMentorPaymentMethod('pay_later')}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                          mentorPaymentMethod === 'pay_later'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-500'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        Pay Later
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    {isVipMember ? 'Confirm Session Slot (Included in Plan)' : 'Subscribe for ₹349/mo & Confirm Session'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
