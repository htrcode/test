import React, { useState } from 'react';
import { MargexaLogo } from './MargexaLogo';
import { CareerCenterPartner } from '../types';
import {
  Building,
  GraduationCap,
  Users,
  Award,
  Crown,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  Layers,
  FileCheck,
  DollarSign,
  IndianRupee,
  Check,
  Send,
  Zap,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface PartnerNetworkViewProps {
  onOpenCollegeRegistrationModal: () => void;
  onOpenAICounselor: (context?: { college: string; program: string }) => void;
}

export const PartnerNetworkView: React.FC<PartnerNetworkViewProps> = ({
  onOpenCollegeRegistrationModal,
  onOpenAICounselor,
}) => {
  // Mode toggle: Career Guidance Centers (B2B) vs College Institutional Portal
  const [partnerAudience, setPartnerAudience] = useState<'consultancies' | 'colleges'>('consultancies');

  // Commission Calculator State - Tier-based Commission (Silver: ₹5,000, Gold: ₹10,000, Platinum: ₹15,000)
  const [studentCount, setStudentCount] = useState<number>(20);
  const [calculatorTier, setCalculatorTier] = useState<'silver' | 'gold' | 'platinum'>('gold');

  // Consultancy Registration Form
  const [centerName, setCenterName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Kozhikode');
  const [district, setDistrict] = useState('Kozhikode');
  const [studentVolume, setStudentVolume] = useState<CareerCenterPartner['annualStudentVolume']>('50-100 students');
  const [selectedTier, setSelectedTier] = useState<CareerCenterPartner['partnershipTier']>('Gold Certified (₹19,999/mo)');
  const [services, setServices] = useState<string[]>(['Plus Two Career Guidance', 'Degree & MBA Admissions']);

  // Success State
  const [registeredPartner, setRegisteredPartner] = useState<CareerCenterPartner | null>(null);

  // Commission Rates: Silver: ₹5,000, Gold: ₹10,000, Platinum: ₹15,000
  const ratePerStudent =
    calculatorTier === 'silver'
      ? 5000
      : calculatorTier === 'gold'
      ? 10000
      : 15000;

  const totalCalculatedRevenue = studentCount * ratePerStudent;

  const handleRegisterConsultancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!centerName.trim() || !phone.trim() || !email.trim()) {
      alert('Please fill out all mandatory details.');
      return;
    }

    const partnerCode = `M-PTR-${Math.floor(100 + Math.random() * 900)}`;
    const newPartner: CareerCenterPartner = {
      id: `CP-${Date.now()}`,
      centerName,
      directorName,
      phone,
      email,
      district,
      city,
      annualStudentVolume: studentVolume,
      partnershipTier: selectedTier,
      servicesOffered: services,
      partnerCode,
      status: 'Active Partner',
      registeredAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setRegisteredPartner(newPartner);
  };

  const toggleService = (srv: string) => {
    if (services.includes(srv)) {
      setServices(services.filter((s) => s !== srv));
    } else {
      setServices([...services, srv]);
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-left">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0b2447] to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-teal-500/10 to-transparent pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
              <Crown className="w-3.5 h-3.5 text-teal-300" />
              MARGEXA Partner & Institutional Network
            </div>
            <span className="text-xs text-slate-300">Kerala Higher Education Alliance</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight text-white">
            Connecting Colleges, Career Guidance Centers & Qualified Students
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether you are an <strong>academic college or polytechnic</strong> looking to register and list your seat quotas, or a <strong>career guidance consultancy</strong> looking to boost admissions revenue and offer certified student allotments — MARGEXA is your official partner.
          </p>

          {/* Audience Switcher Tabs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setPartnerAudience('consultancies')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
                partnerAudience === 'consultancies'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>For Career Guidance Centers & Consultancies</span>
            </button>

            <button
              onClick={() => setPartnerAudience('colleges')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
                partnerAudience === 'colleges'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/20'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>For Colleges & Polytechnic Campuses</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: FOR CAREER GUIDANCE CENTERS & CONSULTANCIES */}
      {partnerAudience === 'consultancies' && (
        <div className="space-y-10">
          {/* Value Prop Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-400 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <IndianRupee className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-slate-950 font-heading">
                High Referral Commissions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Earn <strong>₹15,000 to ₹25,000</strong> per confirmed student admission at partner institutions like Chathamkulam Group of Institutions and premier Kerala colleges.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-400 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-bold text-slate-950 font-heading">
                AI Matchmaker Software License
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Empower your counseling counselors with MARGEXA's AI college matching software to match student marks, budget, and location within seconds during office walk-ins.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-400 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-950 font-heading">
                Guaranteed Institutional Quota
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reserve direct management and merit quota seats for your registered students in AICTE-approved MBA, BBA, B.Com, BCA, and Polytechnic Engineering branches.
              </p>
            </div>
          </div>

          {/* Interactive B2B Commission & Revenue Calculator */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  B2B Revenue Estimator
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Consultancy Earnings & Commission Calculator
                </h3>
                <p className="text-xs text-slate-300">
                  See how partnering with MARGEXA dramatically boosts your annual career center bottom line.
                </p>
              </div>

              <div className="text-right shrink-0 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400 font-medium">Estimated Partner Revenue</span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-heading flex items-center justify-end">
                  <IndianRupee className="w-6 h-6" />
                  {totalCalculatedRevenue.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-emerald-400">Direct admission bonuses paid upon enrollment</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Slider Controls */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-slate-300">Number of Students Guided per Season:</span>
                    <span className="text-amber-400 font-mono text-base">{studentCount} Students</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={studentCount}
                    onChange={(e) => setStudentCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>5 Students</span>
                    <span>50 Students</span>
                    <span>100 Students</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    Select Your Partner Tier & Commission:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setCalculatorTier('silver')}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition cursor-pointer ${
                        calculatorTier === 'silver'
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div>Silver Counselor</div>
                      <span className="text-[10px] opacity-90 font-bold">₹5,000 / seat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalculatorTier('gold')}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition cursor-pointer ${
                        calculatorTier === 'gold'
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div>Gold Certified</div>
                      <span className="text-[10px] opacity-90 font-bold">₹10,000 / seat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalculatorTier('platinum')}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition cursor-pointer ${
                        calculatorTier === 'platinum'
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div>Platinum Master</div>
                      <span className="text-[10px] opacity-90 font-bold">₹15,000 / seat</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Breakdown details */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Institutional Allotment Breakdown:
                </h4>
                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Targeted Students:</span>
                    <strong className="text-white">{studentCount} Admissions</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Admission Commission (Per Student):</span>
                    <strong className="text-amber-400 font-bold">₹{ratePerStudent.toLocaleString('en-IN')} / candidate</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Plan Billing Basis:</span>
                    <strong className="text-emerald-400 font-bold">Monthly (No Annual Lock-in)</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Included Student Merit Fee Waivers:</span>
                    <strong className="text-emerald-400">Up to 50% Tuition Waiver</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Provisional Allotment Letter Issuance:</span>
                    <strong className="text-white">Instant (Within 10 Mins)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Consultancy Partnership Tiers */}
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Monthly Subscriptions — No Yearly Lock-in
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-950">
                Consultancy Partnership Plans & Licensing
              </h2>
              <p className="text-xs text-slate-600">
                All partner plans are billed on a <strong>monthly basis</strong> with direct, guaranteed per-admission commission payouts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Silver Tier */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                      Silver Counselor
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Monthly Plan</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-950 font-heading">
                      ₹9,999 <span className="text-xs font-normal text-slate-500">/ month</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-600 mt-0.5">
                      Commission: ₹5,000 per admission
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Ideal for individual career counselors, teachers, and boutique local advisories.
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <strong>₹5,000 commission on every direct admission</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Monthly subscription with no annual lock-in</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct student submission portal & dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Access to Chathamkulam application tracker</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Official MARGEXA Certified Counselor badge</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedTier('Silver Counselor (₹9,999/mo • ₹5,000 commission)');
                    const el = document.getElementById('consultancy-reg-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
                >
                  Join as Silver Counselor (₹9,999/mo)
                </button>
              </div>

              {/* Gold Tier - Featured */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-50/50 via-white to-indigo-50/30 border-2 border-indigo-600 shadow-xl space-y-5 flex flex-col justify-between relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-xs">
                  Most Popular • Monthly Billing
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                      Gold Certified
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-600">Monthly Plan</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-950 font-heading">
                      ₹19,999 <span className="text-xs font-normal text-slate-500">/ month</span>
                    </div>
                    <div className="text-xs font-bold text-indigo-700 mt-0.5">
                      Commission: ₹10,000 per admission
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    For active career guidance centers, overseas advisories, and coaching academies.
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <strong>₹10,000 commission per student admission</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Monthly plan billed month-to-month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>White-label AI Matchmaker Software License</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Reserved Quota at Chathamkulam Business School</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Priority document verification within 4 hours</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedTier('Gold Certified (₹19,999/mo)');
                    const el = document.getElementById('consultancy-reg-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition cursor-pointer"
                >
                  Apply for Gold Certified (₹19,999/mo)
                </button>
              </div>

              {/* Platinum Franchise Tier */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                      Platinum Master Franchise
                    </div>
                    <span className="text-[11px] font-semibold text-amber-700">Monthly Plan</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-950 font-heading">
                      ₹49,999 <span className="text-xs font-normal text-slate-500">/ month</span>
                    </div>
                    <div className="text-xs font-bold text-amber-700 mt-0.5">
                      Commission: ₹15,000 per admission
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Exclusive territorial franchise rights for an entire district in Kerala.
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <strong>Maximum ₹15,000 commission per admission</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Monthly subscription — cancel or renew monthly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Exclusive District Master Franchise Rights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Dedicated Institutional Relationship Manager</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Joint advertising & expo recruitment booth</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedTier('Platinum Master Franchise (₹49,999/mo)');
                    const el = document.getElementById('consultancy-reg-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                >
                  Apply for Master Franchise (₹49,999/mo)
                </button>
              </div>
            </div>
          </div>

          {/* Consultancy Registration Form */}
          <div id="consultancy-reg-form" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-1">
                <FileCheck className="w-3.5 h-3.5" />
                Authorized Partner Registration
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-950">
                Register Your Career Guidance Center / Consultancy
              </h3>
              <p className="text-xs text-slate-500">
                Gain instant access to institutional admission quotas and client referral tools.
              </p>
            </div>

            {registeredPartner ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-emerald-950 font-heading">
                    Consultancy Partner Account Registered!
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    Your agency has been provisioned as an authorized admissions partner on the MARGEXA network.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Partner Organization:</span>
                    <strong className="text-slate-900">{registeredPartner.centerName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Authorized Partner Code:</span>
                    <strong className="font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                      {registeredPartner.partnerCode}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Selected Tier:</span>
                    <strong className="text-indigo-900">{registeredPartner.partnershipTier}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">District:</span>
                    <strong className="text-slate-900">{registeredPartner.city}, {registeredPartner.district}</strong>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href="tel:+919447012389"
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Partner Desk (+91 94470 12389)</span>
                  </a>
                  <button
                    onClick={() => setRegisteredPartner(null)}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                  >
                    Register Another Agency
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterConsultancy} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Center / Consultancy Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={centerName}
                      onChange={(e) => setCenterName(e.target.value)}
                      placeholder="e.g. Apex Career Guidance Academy"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Director / Lead Counselor Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={directorName}
                      onChange={(e) => setDirectorName(e.target.value)}
                      placeholder="e.g. Adv. K. Vinod"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98470 11223"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Official Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="counseling@apexacademy.in"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      City / Office Location
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Kozhikode / Palakkad"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      District
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      {['Palakkad', 'Kozhikode', 'Ernakulam', 'Malappuram', 'Thrissur', 'Kollam', 'Thiruvananthapuram', 'Kannur'].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Annual Student Inquiries Handled
                    </label>
                    <select
                      value={studentVolume}
                      onChange={(e) => setStudentVolume(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="20-50 students">20 - 50 students</option>
                      <option value="50-100 students">50 - 100 students</option>
                      <option value="100-300 students">100 - 300 students</option>
                      <option value="300+ students">300+ students</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Partnership Plan
                    </label>
                    <select
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white font-bold"
                    >
                      <option value="Silver Counselor (₹9,999/mo • ₹5,000 commission)">
                        Silver Counselor (₹9,999/mo • ₹5,000 Commission)
                      </option>
                      <option value="Gold Certified (₹19,999/mo)">
                        Gold Certified (₹19,999/mo • ₹10,000 Commission - Popular)
                      </option>
                      <option value="Platinum Master Franchise (₹49,999/mo)">
                        Platinum Master Franchise (₹49,999/mo • ₹15,000 Commission)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Services Offered by Your Center
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      'Plus Two Career Guidance',
                      'Degree & MBA Admissions',
                      'Polytechnic Diploma Admissions',
                      'Scholarship Processing',
                      'Entrance Exam Coaching',
                      'Study Abroad Guidance',
                    ].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleService(s)}
                        className={`p-2 rounded-xl border transition cursor-pointer text-left ${
                          services.includes(s)
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {services.includes(s) ? '✓ ' : '+ '} {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Register Agency & Activate Partner Code</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: FOR COLLEGES & POLYTECHNIC INSTITUTIONS */}
      {partnerAudience === 'colleges' && (
        <div className="space-y-10">
          {/* Main College Registration CTA Banner */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                Institutional Admissions Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Register Your College or Polytechnic on MARGEXA
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Reach verified academic applicants in Kerala matching your minimum percentages and budget criteria. Fill your degree, MBA, and polytechnic engineering batches with zero marketing waste.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  AICTE & University Affiliated
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Direct Online Application Processing
                </span>
              </div>
            </div>

            <div className="shrink-0 space-y-3">
              <button
                onClick={onOpenCollegeRegistrationModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Building className="w-4 h-4" />
                <span>Apply for Institutional Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-slate-400">
                Liaison Line: <strong className="text-white">+91 94470 12389</strong>
              </div>
            </div>
          </div>

          {/* Institutional Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 font-heading">
                Pre-Qualified Academic Merit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students applying to your institution are pre-filtered against your specific board requirements (+2 Science/Commerce marks, KMAT scores, or SSLC grades).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 font-heading">
                Instant Provisional Allotment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepted candidates receive an official MARGEXA Provisional Allotment Letter complete with your fee waiver concessions and reporting dates.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 font-heading">
                Comprehensive Campus Profile
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Showcase your campus photo gallery, high-tech engineering workshops, smart classrooms, hostels, and placement statistics to thousands of prospective students.
              </p>
            </div>
          </div>

          {/* Featured Anchor Partner: Chathamkulam Group of Institutions */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white p-1.5 border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80"
                    alt="Chathamkulam"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Primary Institutional Partner Case Study
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 font-heading">
                    Chathamkulam Group of Institutions, Palakkad
                  </h3>
                </div>
              </div>

              <a
                href="https://chathamkulaminstitutions.org/"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-center"
              >
                <span>Visit Campus Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Through their official partnership with MARGEXA, Chathamkulam Business School has expanded admissions across Malabar and Central Kerala for their AICTE-approved, Calicut University-affiliated 2-Year MBA program (₹1,35,000 total course fee).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <div className="text-slate-400 text-[10px]">Affiliation:</div>
                <strong className="text-slate-900">University of Calicut</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <div className="text-slate-400 text-[10px]">Accreditation:</div>
                <strong className="text-slate-900">AICTE Approved</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <div className="text-slate-400 text-[10px]">Key Offerings:</div>
                <strong className="text-slate-900">MBA, BBA, B.Com, BCA, Diplomas</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <div className="text-slate-400 text-[10px]">Merit Waiver:</div>
                <strong className="text-emerald-600">Up to 50% Tuition Waiver</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onOpenCollegeRegistrationModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Register Your Institution Alongside Chathamkulam</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
