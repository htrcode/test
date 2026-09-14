import React from 'react';
import { MargexaLogo } from './MargexaLogo';
import {
  ShieldCheck,
  Award,
  BookOpen,
  GraduationCap,
  Users,
  Target,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Building,
  ArrowRight,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface AboutViewProps {
  onNavigateToMatchmaker: () => void;
  onNavigateToColleges: () => void;
  onNavigateToScholarships: () => void;
  onNavigateToContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateToMatchmaker,
  onNavigateToColleges,
  onNavigateToScholarships,
  onNavigateToContact,
}) => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#0a1e3b] to-slate-900 text-white p-8 sm:p-14 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-indigo-500/15 to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>About MARGEXA Education Consultancy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight">
            Guiding Kerala’s Next Generation into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-indigo-200 to-teal-300">Merit-Driven Higher Education</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            MARGEXA is Kerala’s premier higher education consultancy and algorithmic student-institution matching platform. In direct institutional alliance with the prestigious <strong>Chathamkulam Group of Institutions (Palakkad)</strong> and leading universities across South India, we bridge the gap between student aspirations, real academic marks, and verified institutional seats.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onNavigateToMatchmaker}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore AI Matchmaker</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 flex items-center gap-2 transition cursor-pointer"
            >
              <Mail className="w-4 h-4 text-amber-300" />
              <span>Contact Admissions Desk</span>
            </button>
          </div>
        </div>
      </section>

      {/* Our Mission & Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-50/50 via-white to-indigo-50/30 border border-indigo-100 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900">Our Core Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To eliminate exploitative admission practices, exorbitant donations, and misleading consultancy advice. We ensure every Kerala student gains admission into a verified, accredited college that matches their genuine marks and family budget.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30 border border-emerald-100 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900">Zero Hidden Fees</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All fee structures published on MARGEXA are 100% transparent. Tuition fees, hostel boarding, laboratory charges, and university exam dues are itemized upfront. No surprise donation demands or mid-term hikes.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 border border-amber-100 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900">Guaranteed Merit Grants</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Through institutional endowments from Chathamkulam Group and affiliated foundations, students with 75%+ marks receive locked-in fee waivers between 25% and 50% for all semesters of study.
          </p>
        </div>
      </section>

      {/* Featured Strategic Alliance: Chathamkulam Group of Institutions */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <Building className="w-3.5 h-3.5 text-amber-700" />
              Strategic Campus Anchor
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-950">
              The Chathamkulam Group of Institutions Alliance
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Palakkad, Kerala — An esteemed hub of professional technical, managerial, and collegiate education.
            </p>
          </div>

          <a
            href="https://chathamkulaminstitutions.org/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shrink-0 self-start md:self-auto"
          >
            <span>Official Campus Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Chathamkulam Business School</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              AICTE approved, affiliated with the University of Calicut. Offers premium dual-specialization MBA programs in Logistics, Finance, Marketing, HR, and Business Analytics with strong tie-ups in Kochi and UAE.
            </p>
            <div className="text-[11px] font-bold text-indigo-600">
              • Annual Tuition: ₹1,20,000 (Waivers up to ₹60,000/yr)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-cyan-600" />
              <span>Chathamkulam Polytechnic College</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              DTE Kerala & AICTE approved 3-year polytechnic engineering diplomas in Computer, Mechanical, and Civil Engineering. Direct lateral entry pathway to 2nd year B.Tech via Kerala LET.
            </p>
            <div className="text-[11px] font-bold text-cyan-700">
              • Annual Tuition: ₹38,000 (Merit fees from ₹19,000/yr)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Chathamkulam Arts & Science</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Undergraduate powerhouse offering BCA, B.Com Computer Applications with Tally GST, and BBA. Modern air-conditioned computing labs and dedicated campus placement cell.
            </p>
            <div className="text-[11px] font-bold text-emerald-700">
              • Annual Tuition: ₹32,000 - ₹42,000/yr
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Advisory Council */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-1">
          <h2 className="text-2xl font-black font-heading text-slate-950">
            Advisory Council
          </h2>
          <p className="text-xs text-slate-600">
            Our governance, academic counseling, and institutional relations leadership team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              name: 'Anju Kuriyan',
              role: 'Chief Academic Advisor',
            },
            {
              name: 'Sindhu',
              role: 'Director of Student Welfare',
            },
            {
              name: 'Aloka',
              role: 'Junior Head of Institutional Relations',
            },
            {
              name: 'Jishna',
              role: 'Senior Head of Institutional Relations',
            },
            {
              name: 'Viswanath',
              role: 'Lead AI Counselor Architect',
            },
          ].map((advisor, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {advisor.name.charAt(0)}
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                  {advisor.name}
                </h4>
              </div>
              <div className="text-xs font-semibold text-indigo-600 pt-1 border-t border-slate-100">
                {advisor.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Support & Help CTA */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Official Kerala Admission Desk
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Have Questions About Admissions, Eligibility or Fees?
          </h3>
          <p className="text-xs text-slate-300">
            Our senior admissions counselors in Palakkad and Kochi are available six days a week to review your marksheets and answer questions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToContact}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            Contact Admissions Team
          </button>
          <a
            href="mailto:support@margexa.com"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-amber-300" />
            <span>support@margexa.com</span>
          </a>
        </div>
      </section>
    </div>
  );
};
