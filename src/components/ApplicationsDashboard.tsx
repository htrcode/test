import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Application } from '../types';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  FileText,
  PhoneCall,
  Mail,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Building,
  UserCheck
} from 'lucide-react';

interface ApplicationsDashboardProps {
  onNavigateToMatchmaker: () => void;
  onNavigateToCounseling: () => void;
  onViewOfferLetter: (application: Application) => void;
}

export const ApplicationsDashboard: React.FC<ApplicationsDashboardProps> = ({
  onNavigateToMatchmaker,
  onNavigateToCounseling,
  onViewOfferLetter,
}) => {
  const { applications, student, withdrawApplication } = useAuth();

  const counts = {
    total: applications.length,
    submitted: applications.filter((a) => a.status === 'Submitted').length,
    verification: applications.filter((a) => a.status === 'Document Verification').length,
    offerIssued: applications.filter((a) => a.status === 'Offer Letter Issued').length,
    confirmed: applications.filter((a) => a.status === 'Admission Confirmed').length,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              <ClipboardList className="w-3.5 h-3.5" />
              Admission Lifecycle Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Application Tracker for {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Track live document scrutiny, counselor evaluation, and download verified provisional admission offer letters directly.
            </p>
          </div>

          <button
            onClick={onNavigateToMatchmaker}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition cursor-pointer flex items-center gap-2 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            Apply to More Colleges
          </button>
        </div>

        {/* Telemetry Counts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-2xl font-black text-white font-heading">{counts.total}</div>
            <div className="text-[11px] text-slate-400 font-medium">Total Applications</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-2xl font-black text-amber-400 font-heading">
              {counts.submitted + counts.verification}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Under Scrutiny</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-2xl font-black text-emerald-400 font-heading">
              {counts.offerIssued}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Offer Letters Ready</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-2xl font-black text-indigo-300 font-heading">100%</div>
            <div className="text-[11px] text-slate-400 font-medium">Application Fee Waived</div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map((app) => {
            const hasOffer = app.status === 'Offer Letter Issued' || app.status === 'Admission Confirmed';

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden text-left transition duration-200 hover:shadow-md"
              >
                {/* Card Top Header */}
                <div className="bg-slate-50 p-5 sm:px-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                        {app.id}
                      </span>
                      <span className="text-xs text-slate-500">
                        Applied: {app.appliedDate}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {app.applicationFeeStatus}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      {app.programName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <strong className="text-slate-800">{app.collegeName}</strong>
                    </div>
                  </div>

                  {/* Status Badge & Offer CTA */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === 'Offer Letter Issued'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : app.status === 'Submitted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {app.status}
                      </span>
                    </div>

                    {hasOffer && (
                      <button
                        onClick={() => onViewOfferLetter(app)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        View Offer Letter
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="p-6 border-b border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Admission Progression Stage
                  </h4>

                  <div className="relative">
                    <div className="hidden md:grid grid-cols-5 gap-2">
                      {app.timeline.map((step, idx) => {
                        return (
                          <div key={idx} className="relative text-left space-y-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                  step.done
                                    ? 'bg-emerald-600 text-white'
                                    : step.current
                                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                              >
                                {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <div
                                className={`h-1 flex-1 rounded-full ${
                                  step.done ? 'bg-emerald-500' : 'bg-slate-200'
                                }`}
                              ></div>
                            </div>

                            <p className="text-xs font-bold text-slate-800 pt-1 leading-tight">
                              {step.stage}
                            </p>
                            <p className="text-[10px] text-slate-500">{step.timestamp}</p>
                            {step.notes && (
                              <p className="text-[10px] text-indigo-700 bg-indigo-50/80 p-1.5 rounded-md mt-1 border border-indigo-100">
                                {step.notes}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Mobile Stepper View */}
                    <div className="md:hidden space-y-3">
                      {app.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                              step.done
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            {step.done ? '✓' : idx + 1}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{step.stage}</p>
                            <p className="text-[10px] text-slate-500">{step.timestamp}</p>
                            {step.notes && (
                              <p className="text-[10px] text-indigo-700 mt-0.5">{step.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Details: Counselor & Documents */}
                <div className="p-6 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Assigned Counselor */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Dedicated Admission Counselor
                        </div>
                        <div className="text-xs font-bold text-slate-800">
                          {app.counselorAssigned}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600">
                      Assigned to coordinate your interview, document attestation, and fee concession waivers.
                    </p>
                    <div className="pt-1 flex items-center gap-3 text-xs text-indigo-700 font-semibold">
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
                        {app.counselorContact.split('/')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Documents Scrutiny */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      Submitted Documents & Status
                    </div>
                    <div className="space-y-1.5">
                      {app.documents.map((doc, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0"
                        >
                          <span className="text-slate-700 font-medium">{doc.name}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              doc.status === 'Verified'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-6 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => withdrawApplication(app.id)}
                    className="text-slate-400 hover:text-rose-600 font-medium transition cursor-pointer"
                  >
                    Withdraw Application
                  </button>

                  <button
                    onClick={onNavigateToCounseling}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition cursor-pointer flex items-center gap-1"
                  >
                    Schedule Counselor Session <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <ClipboardList className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            No Applications Submitted Yet
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Use MARGEXA’s AI matchmaker to find college programs in Kerala aligned with your {student.percentage}% score and apply with 100% waived application fees.
          </p>
          <button
            onClick={onNavigateToMatchmaker}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Explore Personalized Recommendations
          </button>
        </div>
      )}
    </div>
  );
};
