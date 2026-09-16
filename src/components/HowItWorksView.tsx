import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Sparkles,
  Award,
  FileCheck2,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  XCircle,
  HelpCircle,
  GraduationCap,
  Users,
  Compass,
  FileText,
  Clock,
  PhoneCall
} from 'lucide-react';

interface HowItWorksViewProps {
  onNavigateToMatchmaker: () => void;
  onNavigateToColleges: () => void;
  onNavigateToScholarships: () => void;
  onNavigateToFAQ: () => void;
  onNavigateToContact: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onNavigateToMatchmaker,
  onNavigateToColleges,
  onNavigateToScholarships,
  onNavigateToFAQ,
  onNavigateToContact,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Enter Academic Profile & Budget',
      tagline: 'Simple, 60-Second Setup',
      icon: SlidersHorizontal,
      color: 'indigo',
      description:
        'Tell us your academic baseline: 10th SSLC, Plus Two (Science/Commerce/Humanities), Polytechnic Diploma, or UG Degree score. Enter your preferred learning mode (Full-time Regular vs. Distance UGC-DEB) and your realistic annual tuition budget.',
      details: [
        'Supports CBSE, Kerala State Board (SSLC / DHSE), ICSE & Polytechnic credentials',
        'Transparent budget filtering (from ₹25,000/yr up to ₹2,50,000/yr)',
        'Option to indicate reservation categories for Kerala E-Grantz fee benefits',
      ],
    },
    {
      step: '02',
      title: 'Algorithmic Multi-Fit Scoring',
      tagline: 'Objective, Data-Driven Matching',
      icon: Sparkles,
      color: 'amber',
      description:
        'Our proprietary matchmaker calculates a weighted 100-point compatibility score across Academic Fit (40 pts), Budget Fit (25 pts), Study Mode (20 pts), and Career Interest (15 pts). It analyzes historical cutoff ranks, KEAM cutoffs, and direct management quotas across Kerala.',
      details: [
        'Zero biased placement algorithms: colleges are ranked solely on fit',
        'Includes Chathamkulam Institutions, Rajagiri, SCMS, and top polytechnics',
        'Identifies high-placement branches like Computer Engineering, MBA Logistics, and BCA',
      ],
    },
    {
      step: '03',
      title: 'Kerala Scholarship & Concession Tracker',
      tagline: 'Unlock State Welfare & Merit Grants',
      icon: Award,
      color: 'emerald',
      description:
        'MARGEXA automatically scans state and national higher education welfare guidelines to match you with valid schemes including Kerala E-Grantz 3.0, KSHEC Higher Education Fellowships, and AICTE Pragati grants.',
      details: [
        'Kerala E-Grantz 3.0: 100% Tuition & Exam Fee Reimbursement for eligible categories',
        'KSHEC Merit Scholarship: Up to ₹60,000/yr for top undergraduate & postgraduate students',
        'AICTE Pragati Scheme: ₹50,000/year for female technical diploma & degree students',
        'Central Sector Scheme (NSP): Direct cash grants for top 20th percentile Plus Two achievers',
      ],
    },
    {
      step: '04',
      title: '1-Click Free Provisional Application',
      tagline: 'Zero Capitation, Zero Booking Fees',
      icon: FileCheck2,
      color: 'cyan',
      description:
        'Select your matched course and click "Apply for Admission". MARGEXA generates an official provisional application record with your student ID, locking in your seat reservation directly with the college registrar.',
      details: [
        '100% Free: No hidden application fees or registration charges',
        'Official Application Reference code generated instantly',
        'Direct tracking under your student Applications Dashboard',
      ],
    },
    {
      step: '05',
      title: 'Provisional Offer Letter & Verification',
      tagline: 'Instant PDF Allotment Notice',
      icon: FileText,
      color: 'blue',
      description:
        'Within minutes of applying, receive a verified Provisional Allotment Letter detailing your locked tuition fee, merit concession, hostel facility allotment, and reporting guidelines for document verification.',
      details: [
        'Official institutional allotment letter with dean/registrar stamp',
        'Clear breakdown of installment schedules and hostel amenities',
        'Downloadable and shareable with parents and education loan banks',
      ],
    },
    {
      step: '06',
      title: 'Campus Visit & Senior Mentorship',
      tagline: 'Smooth Transition to College Life',
      icon: Building,
      color: 'violet',
      description:
        'Our Palakkad & Kochi admission coordinators arrange guided campus walkthroughs at Chathamkulam Knowledge City or partner campuses. Meet professors, inspect laboratory infrastructure, and finalize admission with complete confidence.',
      details: [
        'Hostel room inspections and mess food tasting arranged for parents',
        'Dedicated admissions desk to assist with original certificate deposits',
        'Continuous semester mentorship and campus placement guidance',
      ],
    },
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          <Compass className="w-3.5 h-3.5 text-indigo-600" />
          <span>Transparent 6-Step Admission Journey</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-950">
          How MARGEXA Works for Students & Parents
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          From academic evaluation to your verified provisional seat allotment at Chathamkulam Institutions or premier Kerala colleges, experience a modern, transparent, and fee-protected admission process.
        </p>
      </section>

      {/* Interactive Step Navigator */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    STEP {item.step}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  />
                </div>
                <div className="text-xs font-bold truncate">{item.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        {(() => {
          const current = steps[activeStepIndex];
          const CurrentIcon = current.icon;
          return (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border-2 border-indigo-600/30 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-lg shadow-indigo-600/20 shrink-0">
                    <CurrentIcon className="w-7 h-7 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                      Step {current.step} • {current.tagline}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-950">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStepIndex === steps.length - 1}
                    onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next Step
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {current.description}
              </p>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Key Safeguards & Features:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {current.details.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Comparison: Traditional Admission Broker vs MARGEXA Verified System */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-md space-y-6">
        <div className="max-w-2xl space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Integrity Benchmark</span>
          </div>
          <h2 className="text-2xl font-black font-heading text-slate-950">
            Why Kerala Parents Choose MARGEXA
          </h2>
          <p className="text-xs text-slate-600">
            Compare the transparency and legal standing of MARGEXA against traditional unverified roadside education agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Way */}
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base font-heading">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Traditional Unregulated Brokers</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Demand upfront 'seat booking' cash fees of ₹10,000 to ₹50,000.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Misrepresent unaccredited private degrees as valid for Kerala PSC exams.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Hide recurring mess, bus, and building development fees until enrollment.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Zero accountability once student arrives at the college gates.</span>
              </li>
            </ul>
          </div>

          {/* MARGEXA Way */}
          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base font-heading">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>MARGEXA Verified System</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>100% Free for Students:</strong> Zero application or booking fee charged.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Accredited Institutional Seats:</strong> Direct tie-ups with Chathamkulam Group & Calicut/KTU affiliated colleges.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Guaranteed Merit Discounts:</strong> Up to 50% tuition waiver printed directly on your offer letter.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Continuous Support:</strong> Campus liaison offices in Palakkad and Kochi ready to assist.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Ready to Find Your Best-Fit College?
          </h3>
          <p className="text-xs text-slate-300">
            Launch our AI Matchmaker to discover which Chathamkulam programs and Kerala colleges match your marks and fee budget.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={onNavigateToMatchmaker}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            Start Free Matchmaker
          </button>
          <button
            onClick={onNavigateToFAQ}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition cursor-pointer"
          >
            Read Frequently Asked Questions
          </button>
        </div>
      </section>
    </div>
  );
};
