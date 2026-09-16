import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { COLLEGES_DATA } from '../data/collegesData';
import { rankMatchesForStudent } from '../utils/matchingEngine';
import { MatchResult, College, Program } from '../types';
import {
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  IndianRupee,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Award,
  Zap,
  Info,
  Check,
  ChevronRight,
  Crown
} from 'lucide-react';

interface MatchmakerViewProps {
  onSelectCollege: (college: College) => void;
  onOpenAICounselor: (collegeContext?: { college: string; program: string }) => void;
  onNavigateToMentorship?: () => void;
}

export const MatchmakerView: React.FC<MatchmakerViewProps> = ({
  onSelectCollege,
  onOpenAICounselor,
  onNavigateToMentorship,
}) => {
  const { student, applyToProgram, applications, setIsProfileModalOpen } = useAuth();

  // Filters
  const [levelFilter, setLevelFilter] = useState<'All' | 'Diploma' | 'Undergraduate' | 'Postgraduate'>('All');
  const [modeFilter, setModeFilter] = useState<'All' | 'Offline' | 'Distance'>('All');
  const [withinBudgetOnly, setWithinBudgetOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMatchForDetail, setSelectedMatchForDetail] = useState<MatchResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute matches
  const allMatches = useMemo(() => {
    return rankMatchesForStudent(student, COLLEGES_DATA);
  }, [student]);

  // Filtered matches
  const filteredMatches = useMemo(() => {
    return allMatches.filter((match) => {
      // Level
      if (levelFilter !== 'All' && match.program.level !== levelFilter) {
        return false;
      }
      // Mode
      if (modeFilter !== 'All' && match.program.mode !== modeFilter) {
        return false;
      }
      // Budget
      if (withinBudgetOnly && match.program.annualFee > student.budget) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCollege = match.college.name.toLowerCase().includes(query) || match.college.location.district.toLowerCase().includes(query);
        const matchesProgram = match.program.name.toLowerCase().includes(query) || match.program.discipline.toLowerCase().includes(query);
        if (!matchesCollege && !matchesProgram) return false;
      }
      return true;
    });
  }, [allMatches, levelFilter, modeFilter, withinBudgetOnly, searchQuery, student.budget]);

  // Key stats
  const guaranteedCount = useMemo(() => {
    return allMatches.filter((m) => m.overallScore >= 85).length;
  }, [allMatches]);

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
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-indigo-500/40 animate-in slide-in-from-bottom-5 duration-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold text-white">Application Recorded</p>
            <p className="text-slate-300 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Nextenti-inspired Profile Matching Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/40">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/2 -top-16 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              MARGEXA AI Talent & College Match Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
              Personalized College Matching for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-amber-200">
                {student.name}
              </span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              We cross-referenced your <strong className="text-white">{student.percentage}%</strong> in{' '}
              <strong className="text-white">{student.stream}</strong> against admission cutoffs,{' '}
              <strong className="text-white">₹{student.budget.toLocaleString('en-IN')}/yr</strong> budget, and{' '}
              <strong className="text-white">{student.preferredMode}</strong> preference across top Kerala institutions.
            </p>

            {/* Student Profile Quick Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/10 font-medium">
                Qualification: {student.qualification}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                Score: {student.percentage}%
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold">
                Budget: ₹{student.budget.toLocaleString('en-IN')}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                Mode: {student.preferredMode}
              </span>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <SlidersHorizontal className="w-3 h-3" />
                Adjust Profile
              </button>
            </div>
          </div>

          {/* Quick Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-emerald-400 font-heading">
                {guaranteedCount}
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                High Admission Probability (85%+)
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-indigo-300 font-heading">
                {allMatches.length}
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                Qualified Programs in Kerala
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 lg:col-span-2 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 flex items-center justify-between">
              <div className="text-left">
                <div className="text-xs font-bold text-amber-200 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Chathamkulam Merit Eligible
                </div>
                <div className="text-[10px] text-slate-300">
                  Up to 40% fee waiver on qualifying score
                </div>
              </div>
              <button
                onClick={() => {
                  const chathamkulam = COLLEGES_DATA.find((c) => c.chathamkulamFlag);
                  if (chathamkulam) onSelectCollege(chathamkulam);
                }}
                className="text-[11px] font-bold text-white bg-amber-600 hover:bg-amber-500 px-2.5 py-1 rounded-lg transition cursor-pointer"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student VIP Mentorship Banner (₹349/month) */}
      <div className="bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-blue-500/15 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left shadow-xs">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
            <Crown className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded border border-amber-300">
                VIP Mentorship Monthly Plan • ₹349/mo
              </span>
              <h3 className="text-sm font-bold text-slate-950">
                Students can get Priority VIP Counseling & 1-on-1 Mentorship for ₹349/mo
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              One monthly subscription unlocks 20-minute priority callbacks and 1-on-1 strategic sessions with veteran academic deans. You do not have to pay every time!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400 font-medium">Monthly Plan</div>
            <div className="text-sm font-black text-slate-900">₹349 / month</div>
          </div>
          <button
            onClick={() => onNavigateToMentorship && onNavigateToMentorship()}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            Get VIP Plan (₹349/mo)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Level Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Program:</span>
          {(['All', 'Diploma', 'Undergraduate', 'Postgraduate'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                levelFilter === lvl
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {lvl === 'All' ? 'All Degrees & Diplomas' : lvl === 'Undergraduate' ? "Bachelor's (UG)" : lvl === 'Postgraduate' ? "Master's (PG)" : 'Diploma / Polytechnic'}
            </button>
          ))}
        </div>

        {/* Right Study Mode & Budget Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Study Mode */}
          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 text-xs font-semibold text-slate-600">
            {(['All', 'Offline', 'Distance'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setModeFilter(mode)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  modeFilter === mode ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {mode === 'All' ? 'All Modes' : mode === 'Offline' ? 'Offline' : 'Distance'}
              </button>
            ))}
          </div>

          {/* Within Budget Checkbox */}
          <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-100 transition">
            <input
              type="checkbox"
              checked={withinBudgetOnly}
              onChange={(e) => setWithinBudgetOnly(e.target.checked)}
              className="accent-indigo-600 rounded-xs"
            />
            <span>Within Budget (≤ ₹{(student.budget / 1000).toFixed(0)}k)</span>
          </label>

          {/* Search box */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search college or branch..."
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 w-full sm:w-44"
          />
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <p>
          Showing <strong className="text-slate-900">{filteredMatches.length}</strong> matched courses ranked by compatibility with your academic score and budget
        </p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Guaranteed Match (85%+)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Strong Prospect (74-84%)
          </span>
        </div>
      </div>

      {/* Match Cards List */}
      <div className="space-y-4">
        {filteredMatches.map((match) => {
          const applied = isApplied(match.college.id, match.program.id);
          const isHighMatch = match.overallScore >= 85;
          const isModerateMatch = match.overallScore >= 74 && match.overallScore < 85;
          const feeDifference = student.budget - match.program.annualFee;

          return (
            <div
              key={`${match.college.id}-${match.program.id}`}
              className={`rounded-2xl bg-white border transition duration-200 hover:shadow-lg overflow-hidden ${
                match.college.chathamkulamFlag
                  ? 'border-indigo-300 ring-1 ring-indigo-200/60 shadow-xs'
                  : 'border-slate-200/90 shadow-xs'
              }`}
            >
              {/* Top Banner if Chathamkulam or High Match */}
              {match.college.chathamkulamFlag && (
                <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 text-white px-4 py-1.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-indigo-950 font-extrabold text-[10px] uppercase tracking-wider">
                      Featured Campus
                    </span>
                    <span className="font-semibold text-indigo-100">
                      Chathamkulam Group of Institutions, Palakkad (AICTE & Calicut Univ Affiliated)
                    </span>
                  </div>
                  <a
                    href="https://chathamkulaminstitutions.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-amber-300 hover:text-white flex items-center gap-1 font-medium transition"
                  >
                    Official Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Side: Score & Details */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Nextenti Style Circular Match Meter */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div
                      className={`w-18 h-18 rounded-2xl flex flex-col items-center justify-center font-heading text-center p-2 shadow-inner border ${
                        isHighMatch
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isModerateMatch
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <span className="text-xl font-extrabold tracking-tight leading-none">
                        {match.overallScore}%
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                        MATCH
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${
                        isHighMatch
                          ? 'bg-emerald-100 text-emerald-800'
                          : isModerateMatch
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {match.admissionProbability.split(' ')[0]}
                    </span>
                  </div>

                  {/* College & Program Info */}
                  <div className="space-y-1.5 flex-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {match.program.level}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700">
                        {match.program.mode} Study
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {match.program.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition font-heading">
                      {match.program.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <button
                        onClick={() => onSelectCollege(match.college)}
                        className="font-medium hover:underline text-slate-800 text-left"
                      >
                        {match.college.name}
                      </button>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-0.5 text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {match.college.location.city}, {match.college.location.district}
                      </span>
                    </div>

                    {/* Compatibility Breakdown Bars */}
                    <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="flex justify-between text-slate-500">
                          <span>Academic Fit</span>
                          <strong className="text-slate-800">{match.breakdown.academicFit}/40</strong>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${(match.breakdown.academicFit / 40) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="flex justify-between text-slate-500">
                          <span>Budget Fit</span>
                          <strong className="text-slate-800">{match.breakdown.budgetFit}/25</strong>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(match.breakdown.budgetFit / 25) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="flex justify-between text-slate-500">
                          <span>Study Mode</span>
                          <strong className="text-slate-800">{match.breakdown.modeFit}/20</strong>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${(match.breakdown.modeFit / 20) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="flex justify-between text-slate-500">
                          <span>Discipline Fit</span>
                          <strong className="text-slate-800">{match.breakdown.interestFit}/15</strong>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-violet-500 rounded-full"
                            style={{ width: `${(match.breakdown.interestFit / 15) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Nextenti-style "Why you match" Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {match.matchReasons.map((reason, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-slate-100/90 text-slate-700 font-medium"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          {reason}
                        </span>
                      ))}
                      {match.potentialScholarship && (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                          <Zap className="w-3 h-3 text-amber-600" />
                          {match.potentialScholarship}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: Fee & Action CTA */}
                <div className="lg:w-64 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-3 text-left">
                  {/* Fee vs Budget */}
                  <div className="bg-slate-50/90 p-3 rounded-xl border border-slate-100">
                    <div className="text-[11px] text-slate-500 font-medium">Annual Course Fee</div>
                    <div className="text-xl font-black text-slate-900 flex items-center font-heading">
                      <IndianRupee className="w-4 h-4 text-slate-700" />
                      {match.program.annualFee.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-slate-500 ml-1">/ year</span>
                    </div>
                    {match.program.totalFee && (
                      <div className="text-[11px] font-semibold text-slate-600 mt-0.5">
                        Total Course: ₹{match.program.totalFee.toLocaleString('en-IN')}
                      </div>
                    )}
                    {match.program.feeNote && (
                      <div className="text-[10px] text-indigo-700 font-medium bg-indigo-50/80 px-2 py-0.5 rounded mt-1">
                        {match.program.feeNote}
                      </div>
                    )}
                    {feeDifference >= 0 ? (
                      <div className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ₹{feeDifference.toLocaleString('en-IN')} below your budget
                      </div>
                    ) : (
                      <div className="text-[11px] text-amber-700 font-medium mt-0.5">
                        ₹{Math.abs(feeDifference).toLocaleString('en-IN')} above standard budget
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {applied ? (
                      <div className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Application Submitted (Tracked)
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApply(match.college, match.program)}
                        className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>One-Click Free Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectCollege(match.college)}
                        className="py-1.5 px-2 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer text-center"
                      >
                        View College
                      </button>
                      <button
                        onClick={() =>
                          onOpenAICounselor({
                            college: match.college.name,
                            program: match.program.name,
                          })
                        }
                        className="py-1.5 px-2 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition cursor-pointer text-center flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        AI Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredMatches.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Info className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-800 font-heading">
              No course matches found for current filter selections
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your annual fee filter, switching to "All Degrees & Diplomas", or updating your profile percentage and budget preferences.
            </p>
            <button
              onClick={() => {
                setLevelFilter('All');
                setModeFilter('All');
                setWithinBudgetOnly(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
