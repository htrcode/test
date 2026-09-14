import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { COLLEGES_DATA } from '../data/collegesData';
import { College, Program } from '../types';
import {
  Search,
  Building,
  MapPin,
  ExternalLink,
  Award,
  BookOpen,
  IndianRupee,
  CheckCircle2,
  Filter,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Check,
  ChevronRight,
  X
} from 'lucide-react';

interface CollegeDirectoryViewProps {
  selectedCollegeModal: College | null;
  setSelectedCollegeModal: (college: College | null) => void;
  onOpenAICounselor: (collegeContext?: { college: string; program: string }) => void;
  onOpenCollegeRegistrationModal?: () => void;
}

export const CollegeDirectoryView: React.FC<CollegeDirectoryViewProps> = ({
  selectedCollegeModal,
  setSelectedCollegeModal,
  onOpenAICounselor,
  onOpenCollegeRegistrationModal,
}) => {
  const { applyToProgram, applications } = useAuth();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState<'All' | 'Diploma' | 'Undergraduate' | 'Postgraduate'>('All');
  const [modeFilter, setModeFilter] = useState<'All' | 'Offline' | 'Distance'>('All');
  const [maxFee, setMaxFee] = useState(300000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const districts = ['All', 'Palakkad', 'Ernakulam', 'Kozhikode', 'Kollam', 'Malappuram'];

  const filteredColleges = useMemo(() => {
    return COLLEGES_DATA.filter((college) => {
      // District
      if (districtFilter !== 'All' && college.location.district !== districtFilter) {
        return false;
      }

      // Mode
      if (modeFilter === 'Distance' && !college.distanceEducationAvailable) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(q) || college.shortName.toLowerCase().includes(q);
        const matchesCity = college.location.city.toLowerCase().includes(q) || college.location.district.toLowerCase().includes(q);
        const matchesCourses = college.programs.some((p) => p.name.toLowerCase().includes(q) || p.discipline.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesCourses) return false;
      }

      // Program Level & Fee within college
      if (levelFilter !== 'All') {
        const hasLevel = college.programs.some((p) => p.level === levelFilter);
        if (!hasLevel) return false;
      }

      // At least one program within maxFee
      const hasAffordableProgram = college.programs.some((p) => p.annualFee <= maxFee);
      if (!hasAffordableProgram) return false;

      return true;
    });
  }, [districtFilter, modeFilter, searchQuery, levelFilter, maxFee]);

  const chathamkulam = useMemo(() => {
    return COLLEGES_DATA.find((c) => c.chathamkulamFlag);
  }, []);

  const handleApply = (college: College, program: Program) => {
    const res = applyToProgram(college, program);
    setToastMessage(res.message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const isApplied = (collegeId: string, programId: string) => {
    return applications.some((a) => a.collegeId === collegeId && a.programId === programId);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-indigo-500/40 animate-in slide-in-from-bottom-5 duration-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold text-white">Application Successfully Submitted</p>
            <p className="text-slate-300 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Featured Spotlight: Chathamkulam Institutions */}
      {chathamkulam && (
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden shadow-xl border border-indigo-500/30">
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-indigo-950 font-black text-xs uppercase tracking-wider shadow-xs">
                  Featured Institution
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold border border-indigo-400/30">
                  Palakkad, Kerala
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                  AICTE & Calicut University Affiliated
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
                {chathamkulam.name}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {chathamkulam.description}
              </p>

              {/* Key Amenities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 text-slate-200">
                {chathamkulam.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => setSelectedCollegeModal(chathamkulam)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/30 transition cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  View All Degree & Diploma Courses ({chathamkulam.programs.length})
                </button>

                <a
                  href={chathamkulam.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Visit chathamkulaminstitutions.org</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() =>
                    onOpenAICounselor({
                      college: chathamkulam.name,
                      program: 'MBA & Polytechnic Programs',
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold text-xs border border-amber-400/40 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Ask AI About Admissions
                </button>
              </div>
            </div>

            {/* Visual Card / Stats */}
            <div className="w-full lg:w-80 shrink-0 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 space-y-4">
              <div className="rounded-xl overflow-hidden aspect-video bg-slate-800 relative">
                <img
                  src={chathamkulam.heroImage}
                  alt={chathamkulam.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                  <span className="text-[11px] font-bold text-white">
                    Palakkad Campus Infrastructure
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/5 p-2.5 rounded-xl">
                  <div className="text-xl font-extrabold text-amber-300 font-heading">
                    {chathamkulam.rating} ★
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {chathamkulam.reviewsCount} Student Reviews
                  </div>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl">
                  <div className="text-xl font-extrabold text-emerald-300 font-heading">
                    94%+
                  </div>
                  <div className="text-[10px] text-slate-300">Placement Record</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 text-left bg-white/5 p-3 rounded-xl border border-white/5">
                <strong className="text-white block mb-1">Offered Programs:</strong>
                Chathamkulam Business School (MBA), College of Arts & Science (B.Com, BBA, BCA), and Polytechnic (Mechanical, Civil, Computer Engineering).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filter Bar */}
      <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search colleges, degrees, diplomas, or cities in Kerala..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {(['All', 'Diploma', 'Undergraduate', 'Postgraduate'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  levelFilter === lvl
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl === 'All' ? 'All Degrees & Diplomas' : lvl === 'Undergraduate' ? 'Degree (UG)' : lvl === 'Postgraduate' ? 'Postgrad (PG)' : 'Polytechnic Diploma'}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Row: District, Study Mode, Max Fee */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100 text-left">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              Kerala District
            </label>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Kerala Districts' : d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Delivery Mode
            </label>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            >
              <option value="All">All Modes (Offline & Distance)</option>
              <option value="Offline">Offline / Regular Campus Only</option>
              <option value="Distance">Distance / Online Learning Only</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                Max Annual Fee Cap
              </label>
              <span className="text-xs font-bold text-emerald-700">
                ₹{maxFee.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="300000"
              step="5000"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* College Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => {
          return (
            <div
              key={college.id}
              className={`rounded-2xl bg-white border flex flex-col overflow-hidden transition duration-200 hover:shadow-lg ${
                college.chathamkulamFlag
                  ? 'border-indigo-400 ring-2 ring-indigo-200/60 shadow-md'
                  : 'border-slate-200/90 shadow-xs'
              }`}
            >
              {/* College Image Banner */}
              <div className="h-44 relative bg-slate-800 overflow-hidden">
                <img
                  src={college.heroImage}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg text-amber-300 font-bold text-xs flex items-center gap-1 border border-white/10">
                  <span>★</span> {college.rating}
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({college.reviewsCount})
                  </span>
                </div>

                {/* Location Pill */}
                <div className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-indigo-300" />
                  {college.location.city}, {college.location.district}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {college.type}
                    </span>
                    {college.distanceEducationAvailable && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Distance Avail.
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug font-heading">
                    {college.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {college.tagline || college.description}
                  </p>

                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <strong className="text-slate-800 block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Available Programs ({college.programs.length}):
                    </strong>
                    <div className="flex flex-wrap gap-1">
                      {college.programs.slice(0, 3).map((p) => (
                        <span
                          key={p.id}
                          className="px-2 py-0.5 bg-white rounded-md border border-slate-200 text-[10px] font-medium text-slate-700"
                        >
                          {p.name.length > 28 ? p.name.slice(0, 26) + '...' : p.name}
                        </span>
                      ))}
                      {college.programs.length > 3 && (
                        <span className="text-[10px] text-indigo-600 font-semibold self-center">
                          +{college.programs.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCollegeModal(college)}
                    className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition cursor-pointer text-center flex items-center justify-center gap-1"
                  >
                    <span>View Courses & Apply</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={college.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer border border-slate-200"
                    title="Open official college website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Institutional College Registration Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Building className="w-3.5 h-3.5" />
            Institutional Admissions 2026-27
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
            Are You a College, Polytechnic, or Career Guidance Center?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Apply to register your institution on MARGEXA. List degree and polytechnic seat quotas, receive pre-qualified student applications, and partner with regional career centers across Kerala.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          {onOpenCollegeRegistrationModal && (
            <button
              onClick={onOpenCollegeRegistrationModal}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Building className="w-4 h-4" />
              <span>Apply for College Registration</span>
            </button>
          )}

          <a
            href="tel:+919447012389"
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Liaison Desk: +91 94470 12389</span>
          </a>
        </div>
      </div>
    </div>
  );
};
