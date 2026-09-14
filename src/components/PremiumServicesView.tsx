import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MENTORS_DATA } from '../data/mentorsData';
import { Mentor } from '../types';
import {
  Crown,
  UserCheck,
  PhoneCall,
  Video,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  Star,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export const PremiumServicesView: React.FC = () => {
  const { student, counselingBookings, bookPriorityCounseling } = useAuth();

  // Booking Modal State
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [mentorSlot, setMentorSlot] = useState<string>('');
  const [mentorTopic, setMentorTopic] = useState<string>('Chathamkulam & Kerala Admissions');
  const [mentorSuccessToast, setMentorSuccessToast] = useState<boolean>(false);

  // VIP Express Form State
  const [phone, setPhone] = useState<string>(student.phone || '+91 98471 23456');
  const [mode, setMode] = useState<'Phone Call' | 'Video Meet' | 'In-Person (Palakkad/Kochi)'>('Phone Call');
  const [priority, setPriority] = useState<'Immediate Express (Within 20 mins)' | 'Standard VIP (Within 2 hrs)'>('Immediate Express (Within 20 mins)');
  const [targetCollege, setTargetCollege] = useState<string>('Chathamkulam Group of Institutions');
  const [notes, setNotes] = useState<string>('Need assistance evaluating eligibility for MBA/Degree programs and merit scholarship concessions.');
  const [vipSuccessToast, setVipSuccessToast] = useState<boolean>(false);

  const handleBookMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !mentorSlot) return;

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
    }, 2000);
  };

  const handleBookVIP = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              MARGEXA Premium Academic Advisory
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Personalized Mentorship & Priority Counseling
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fast-track your university admissions in Kerala with one-on-one sessions led by former university deans, corporate recruiters, and legal education advisors.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left shrink-0 space-y-1">
            <div className="text-xs text-slate-400 font-medium">Instant Hotline</div>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              +91 94470 12389
            </div>
            <div className="text-[11px] text-slate-300">
              Palakkad & Ernakulam Central Desks
            </div>
          </div>
        </div>
      </div>

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

          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 self-start md:self-auto flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Free for Registered MARGEXA Students
          </span>
        </div>

        {vipSuccessToast && (
          <div className="my-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Priority Counseling Scheduled! Our senior counselor is reviewing your profile and will connect on {phone} shortly.
          </div>
        )}

        <form onSubmit={handleBookVIP} className="pt-6 space-y-4">
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

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            Confirm Priority Counseling Slot
          </button>
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
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              1-on-1 Personalized Mentorship
            </h2>
            <p className="text-xs text-slate-500">
              Schedule targeted 30-minute strategic sessions with veteran academic advisors in Kerala.
            </p>
          </div>
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

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setMentorSlot(mentor.availableSlots[0]);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book 1-on-1 Mentorship
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentorship Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                Book Mentorship with {selectedMentor.name}
              </h3>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold p-1"
              >
                ✕
              </button>
            </div>

            {mentorSuccessToast ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Session Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  Calendar invitation sent to {student.email}.
                </p>
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
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition ${
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
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <option value="Chathamkulam Institutions Admission & Quotas">Chathamkulam Institutions Admission & Quotas</option>
                    <option value="Polytechnic Diploma vs B.Tech Career Pathways">Polytechnic Diploma vs B.Tech Career Pathways</option>
                    <option value="MBA Logistics & Supply Chain Industry Readiness">MBA Logistics & Supply Chain Industry Readiness</option>
                    <option value="Scholarship Application & Fee Concession Support">Scholarship Application & Fee Concession Support</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-slate-600 space-y-1 border border-slate-100">
                  <div><strong>Student:</strong> {student.name} ({student.percentage}%)</div>
                  <div><strong>Format:</strong> 1-on-1 Private Video Consultation (Google Meet)</div>
                  <div><strong>Cost:</strong> <span className="text-emerald-700 font-bold">Free via MARGEXA</span></div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer"
                  >
                    Confirm Session
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
