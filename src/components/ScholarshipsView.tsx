import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Scholarship } from '../types';
import {
  Award,
  CheckCircle2,
  Clock,
  IndianRupee,
  Building,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Percent,
  Check
} from 'lucide-react';

export const ScholarshipsView: React.FC = () => {
  const { scholarships, student, applyForScholarship } = useAuth();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApply = (sch: Scholarship) => {
    applyForScholarship(sch.id);
    setToastMessage(`Scholarship Application submitted for ${sch.title}. Application ID: SCH-${Date.now().toString().slice(-6)}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-indigo-500/40 animate-in slide-in-from-bottom-5 duration-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold text-white">Scholarship Application Dispatched</p>
            <p className="text-slate-300 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
              <Award className="w-3.5 h-3.5" />
              Kerala Exclusive Scholarship Tracker
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Merit & Institutional Fee Concessions
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We cross-check your academic percentage (<strong className="text-white">{student.percentage}%</strong>) and family budget against state welfare grants and private trust scholarships including{' '}
              <strong className="text-amber-200">Chathamkulam Institutional Merit Grants</strong>.
            </p>
          </div>

          {/* Eligibility Snapshot */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0 text-left space-y-2">
            <div className="text-xs text-slate-400 font-medium">Your Scholarship Standing</div>
            <div className="text-2xl font-black text-emerald-400 font-heading">
              {student.percentage >= 75 ? 'Tier 1 (High Merit)' : 'Tier 2 (Standard)'}
            </div>
            <div className="text-[11px] text-slate-300">
              Eligible for up to <strong>₹75,000/yr</strong> fee reductions
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships List */}
      <div className="space-y-4">
        {scholarships.map((sch) => {
          const isEligibleMarks = student.percentage >= sch.eligibilityMarks;
          const isSubmitted = sch.applicationStatus === 'Submitted';

          return (
            <div
              key={sch.id}
              className={`rounded-3xl bg-white border p-6 transition duration-200 hover:shadow-md text-left ${
                sch.category === 'Institutional'
                  ? 'border-indigo-300 ring-1 ring-indigo-200/50 shadow-xs'
                  : 'border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        sch.category === 'Institutional'
                          ? 'bg-amber-100 text-amber-900'
                          : sch.category === 'Government'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {sch.category}
                    </span>

                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Deadline: {sch.deadline}
                    </span>

                    {isEligibleMarks ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Qualified ({student.percentage}% ≥ {sch.eligibilityMarks}%)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600">
                        Min. Cutoff: {sch.eligibilityMarks}%
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {sch.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sch.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{sch.provider}</span>
                    </div>
                    <div className="text-slate-300">•</div>
                    <div>
                      <strong>Covered:</strong> {sch.collegesCovered.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Amount & CTA */}
                <div className="lg:w-64 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Grant Benefit
                    </div>
                    <div className="text-base font-extrabold text-emerald-700 font-heading">
                      {sch.amount}
                    </div>
                  </div>

                  {isSubmitted ? (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Application Under Review
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApply(sch)}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Apply for Scholarship
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
