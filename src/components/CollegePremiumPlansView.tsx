import React, { useState } from 'react';
import { COLLEGE_PLANS, COLLEGE_FEATURE_MATRIX, SAMPLE_COLLEGE_LEADS } from '../data/collegePlansData';
import { COLLEGES_DATA } from '../data/collegesData';
import { CollegePlanTier, CollegeSubscriptionBooking, CollegeEnquiryLead } from '../types';
import { MargexaLogo } from './MargexaLogo';
import {
  Building2,
  Check,
  CheckCircle2,
  Sparkles,
  Crown,
  Zap,
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  PhoneCall,
  Calendar,
  Layers,
  HelpCircle,
  FileText,
  BarChart3,
  Search,
  MessageSquare,
  Award,
  ChevronDown,
  ExternalLink,
  Laptop,
  CheckSquare2,
  X,
  PlusCircle,
  Clock,
  Send,
  Star
} from 'lucide-react';

interface CollegePremiumPlansViewProps {
  onOpenCollegeRegistrationModal?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToContact?: () => void;
}

export const CollegePremiumPlansView: React.FC<CollegePremiumPlansViewProps> = ({
  onOpenCollegeRegistrationModal,
  onNavigateToDirectory,
  onNavigateToContact,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeSubTab, setActiveSubTab] = useState<'plans' | 'matrix' | 'demo' | 'faq'>('plans');

  // Subscription Modal State
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<CollegePlanTier>('premium');
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('chathamkulam-institutions');
  const [customCollegeName, setCustomCollegeName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactDesignation, setContactDesignation] = useState('Director of Admissions / Principal');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [modalBillingCycle, setModalBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [paymentSuccessData, setPaymentSuccessData] = useState<CollegeSubscriptionBooking | null>(null);

  // Live Portal Demo State
  const [demoSelectedCollege, setDemoSelectedCollege] = useState<string>('chathamkulam-institutions');
  const [demoLeads, setDemoLeads] = useState<CollegeEnquiryLead[]>(SAMPLE_COLLEGE_LEADS);
  const [selectedDemoLead, setSelectedDemoLead] = useState<CollegeEnquiryLead | null>(SAMPLE_COLLEGE_LEADS[0]);
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('All');
  const [isCampaignActive, setIsCampaignActive] = useState<boolean>(true);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => {
      setNotificationToast(null);
    }, 3500);
  };

  const handleOpenSubscribe = (planId: CollegePlanTier) => {
    setSelectedPlanForModal(planId);
    setModalBillingCycle(billingCycle);
    setPaymentSuccessData(null);
    setIsSubscribeModalOpen(true);
  };

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    const collegeObj = COLLEGES_DATA.find((c) => c.id === selectedCollegeId);
    const collegeTitle = selectedCollegeId === 'other' ? customCollegeName || 'New Institutional Partner' : collegeObj?.name || 'Partner College';
    const planObj = COLLEGE_PLANS.find((p) => p.id === selectedPlanForModal);

    let pricePerMo = planObj?.price || 0;
    let finalAmount = modalBillingCycle === 'annual' ? Math.round(pricePerMo * 12 * 0.8) : pricePerMo;

    const newBooking: CollegeSubscriptionBooking = {
      id: `SUB-${Date.now().toString().slice(-6)}`,
      collegeId: selectedCollegeId,
      collegeName: collegeTitle,
      contactPerson: contactName || 'Authorized Signatory',
      designation: contactDesignation,
      email: contactEmail || 'admissions@college.edu',
      phone: contactPhone || '+91 94470 00000',
      plan: selectedPlanForModal,
      billingCycle: modalBillingCycle,
      amount: finalAmount,
      status: selectedPlanForModal === 'free' ? 'Active' : 'Trial Active',
      subscribedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      validUntil: modalBillingCycle === 'annual' ? '31 Mar 2028' : '30 Apr 2027',
      assignedManager: 'Prof. Ananthan R. (MARGEXA Institutional Partnerships)',
    };

    setPaymentSuccessData(newBooking);
    showToast(`🎉 Plan ${planObj?.name} activated for ${collegeTitle}!`);
  };

  const handleLeadStatusChange = (leadId: string, newStatus: CollegeEnquiryLead['status']) => {
    setDemoLeads((prev) =>
      prev.map((ld) => (ld.id === leadId ? { ...ld, status: newStatus } : ld))
    );
    if (selectedDemoLead && selectedDemoLead.id === leadId) {
      setSelectedDemoLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Lead status updated to "${newStatus}"`);
  };

  const handleAssignStaff = (leadId: string, staffName: string) => {
    setDemoLeads((prev) =>
      prev.map((ld) => (ld.id === leadId ? { ...ld, assignedStaff: staffName } : ld))
    );
    if (selectedDemoLead && selectedDemoLead.id === leadId) {
      setSelectedDemoLead((prev) => (prev ? { ...prev, assignedStaff: staffName } : null));
    }
    showToast(`Assigned lead to ${staffName}`);
  };

  const filteredDemoLeads = demoLeads.filter((ld) => {
    if (leadFilterStatus === 'All') return true;
    return ld.status === leadFilterStatus;
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-20">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-indigo-500/30 flex items-center gap-3 animate-fade-in text-sm font-medium">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white pt-12 pb-16 px-4 border-b border-indigo-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Dedicated For Colleges, Universities & Institutes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            MARGEXA <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-indigo-200 bg-clip-text text-transparent">College Premium Plans</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
            Empower your admissions office with high-intent Kerala & South Indian student enquiries, smart lead follow-up automation, featured search visibility, and course demand analytics.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveSubTab('plans')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'plans'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Subscription Plans</span>
            </button>
            <button
              onClick={() => setActiveSubTab('matrix')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'matrix'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Feature Comparison</span>
            </button>
            <button
              onClick={() => setActiveSubTab('demo')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'demo'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Live Portal Demo</span>
              <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded font-black">
                LIVE
              </span>
            </button>
            <button
              onClick={() => setActiveSubTab('faq')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'faq'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Institutional FAQ</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">
        {/* TAB 1: PLANS & PRICING */}
        {activeSubTab === 'plans' && (
          <div>
            {/* Billing Interval Toggle */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 mb-8 max-w-md mx-auto flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                Billing Cycle:
              </span>
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    billingCycle === 'annual'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Annual</span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-black">
                    SAVE 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12">
              {COLLEGE_PLANS.map((plan) => {
                const isRecommended = plan.id === 'premium';
                const isEnterprise = plan.id === 'enterprise';
                const isFree = plan.id === 'free';

                // Price calculations
                const displayMonthly = plan.price;
                const displayAnnual = Math.round(plan.price * 12 * 0.8);

                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                      isRecommended
                        ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-100/50 md:-translate-y-2'
                        : isEnterprise
                        ? 'bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl'
                        : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* Top Badges */}
                    {isRecommended && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Recommended Starting Plan</span>
                      </div>
                    )}

                    {isEnterprise && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-amber-300" />
                        <span>Maximum Admission Reach</span>
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-6 sm:p-8 flex-1">
                      {/* Name & Description */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className={`text-xl font-black ${
                              isEnterprise ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {plan.name}
                          </h3>
                          {isFree && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full border border-slate-200">
                              Standard
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs min-h-[36px] ${
                            isEnterprise ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {plan.description}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="py-4 border-y border-slate-100 mb-6">
                        {isFree ? (
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                            </div>
                            <span className="text-xs font-semibold text-slate-500">
                              For every listed college
                            </span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span
                                className={`text-4xl font-extrabold ${
                                  isEnterprise ? 'text-white' : 'text-slate-900'
                                }`}
                              >
                                {billingCycle === 'monthly'
                                  ? `₹${displayMonthly.toLocaleString('en-IN')}`
                                  : `₹${Math.round(displayAnnual / 12).toLocaleString('en-IN')}`}
                              </span>
                              <span
                                className={`text-xs font-semibold ${
                                  isEnterprise ? 'text-slate-400' : 'text-slate-500'
                                }`}
                              >
                                /month
                              </span>
                            </div>
                            <p
                              className={`text-[11px] mt-1 ${
                                isEnterprise ? 'text-indigo-300' : 'text-indigo-700 font-medium'
                              }`}
                            >
                              {billingCycle === 'annual'
                                ? `Billed annually (₹${displayAnnual.toLocaleString('en-IN')}/yr - 20% Off)`
                                : 'Billed monthly, cancel or pause anytime'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* SubFeatures Header */}
                      {plan.subFeaturesHeader && (
                        <div
                          className={`text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-1.5 ${
                            isEnterprise ? 'text-indigo-400' : 'text-indigo-700'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>{plan.subFeaturesHeader}</span>
                        </div>
                      )}

                      {/* Feature Items */}
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isEnterprise
                                  ? 'bg-indigo-900/60 text-indigo-300'
                                  : isRecommended
                                  ? 'bg-indigo-100 text-indigo-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span
                              className={`leading-relaxed ${
                                isEnterprise ? 'text-slate-300' : 'text-slate-700'
                              }`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="p-6 sm:p-8 pt-0">
                      <button
                        onClick={() => handleOpenSubscribe(plan.id)}
                        className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95 ${
                          isRecommended
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                            : isEnterprise
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                        }`}
                      >
                        {isFree ? (
                          <>
                            <span>List / Claim College Free</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : isRecommended ? (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Select College Premium</span>
                          </>
                        ) : (
                          <>
                            <Crown className="w-4 h-4" />
                            <span>Select College Enterprise</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Institutional Highlights */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl mb-12 border border-indigo-800/40">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Admissions Network in Kerala</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Why Kerala’s Top Business Schools & Engineering Colleges Choose MARGEXA
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Unlike generic web directories that sell stale bulk phone databases, MARGEXA connects you only with students who matched your courses based on qualifying marks, budget, and specific career ambitions.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveSubTab('demo')}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Test-Drive College Portal</span>
                  </button>
                  <button
                    onClick={() => onOpenCollegeRegistrationModal?.()}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Register New College</span>
                  </button>
                </div>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-800/60 text-indigo-300 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">High Conversion Enquiries</h4>
                    <p className="text-slate-300">
                      Average 42% enquiry-to-application conversion from students who match your fee and cutoffs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-800/60 text-indigo-300 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Direct Student Access</h4>
                    <p className="text-slate-300">
                      Instant WhatsApp and call follow-up with applicants interested in your specific degree programs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-800/60 text-indigo-300 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Course Demand Intel</h4>
                    <p className="text-slate-300">
                      Gain real-time insights into which disciplines (e.g. MBA Data Analysis, MBA Logistics) have rising demand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED FEATURE MATRIX */}
        {activeSubTab === 'matrix' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-12">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">
                  Comprehensive Plan Feature Matrix
                </h2>
                <p className="text-xs text-slate-500">
                  Compare every institutional tool, limit, and service across Free, College Premium, and College Enterprise.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenSubscribe('premium')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Choose Premium (₹3,999/mo)</span>
                </button>
                <button
                  onClick={() => handleOpenSubscribe('enterprise')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Choose Enterprise (₹7,999/mo)</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-4 px-4 font-bold text-slate-700 w-1/3">Feature Category & Capability</th>
                    <th className="py-4 px-4 font-bold text-slate-700 text-center w-1/5 bg-slate-50 rounded-t-xl">
                      Free (₹0)
                    </th>
                    <th className="py-4 px-4 font-extrabold text-indigo-700 text-center w-1/4 bg-indigo-50/70 border-x border-indigo-200 rounded-t-xl">
                      <div className="flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>College Premium</span>
                      </div>
                      <div className="text-[10px] font-normal text-slate-500">₹3,999 /mo</div>
                    </th>
                    <th className="py-4 px-4 font-extrabold text-slate-900 text-center w-1/4 bg-amber-50/60 rounded-t-xl">
                      <div className="flex items-center justify-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-amber-600" />
                        <span>College Enterprise</span>
                      </div>
                      <div className="text-[10px] font-normal text-slate-500">₹7,999 /mo</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COLLEGE_FEATURE_MATRIX.map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      <tr className="bg-slate-100/70">
                        <td colSpan={4} className="py-2.5 px-4 font-black text-slate-800 text-[11px] uppercase tracking-wider">
                          {cat.category}
                        </td>
                      </tr>
                      {cat.items.map((item, itemIdx) => (
                        <tr key={itemIdx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-4 text-slate-800 font-medium">
                            <div className="font-semibold text-slate-900">{item.feature}</div>
                            {item.tooltip && (
                              <div className="text-[11px] text-slate-400 mt-0.5">{item.tooltip}</div>
                            )}
                          </td>

                          {/* Free */}
                          <td className="py-3 px-4 text-center bg-slate-50/40">
                            {typeof item.free === 'boolean' ? (
                              item.free ? (
                                <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                              ) : (
                                <span className="text-slate-300 font-bold">—</span>
                              )
                            ) : (
                              <span className="font-medium text-slate-600">{item.free}</span>
                            )}
                          </td>

                          {/* Premium */}
                          <td className="py-3 px-4 text-center bg-indigo-50/30 border-x border-indigo-100">
                            {typeof item.premium === 'boolean' ? (
                              item.premium ? (
                                <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700">
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                </div>
                              ) : (
                                <span className="text-slate-300 font-bold">—</span>
                              )
                            ) : (
                              <span className="font-bold text-indigo-900">{item.premium}</span>
                            )}
                          </td>

                          {/* Enterprise */}
                          <td className="py-3 px-4 text-center bg-amber-50/20">
                            {typeof item.enterprise === 'boolean' ? (
                              item.enterprise ? (
                                <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-800">
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                </div>
                              ) : (
                                <span className="text-slate-300 font-bold">—</span>
                              )
                            ) : (
                              <span className="font-black text-slate-900">{item.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Need customized multi-campus institutional licensing or university grouping? Contact our Higher Ed team.
              </div>
              <button
                onClick={() => onNavigateToContact?.()}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Talk to Institutional Advisor</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE PORTAL DEMO (PREVIEW FOR ADMISSION DIRECTORS) */}
        {activeSubTab === 'demo' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-12">
            {/* Header of Demo */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Live Interactive Preview: College Premium / Enterprise Suite</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Admission Officer Dashboard & Lead Management
                </h2>
                <p className="text-xs text-slate-500">
                  Experience firsthand how your admissions team will track, assign, and convert student enquiries in real-time.
                </p>
              </div>

              {/* College Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">Viewing as:</span>
                <select
                  value={demoSelectedCollege}
                  onChange={(e) => setDemoSelectedCollege(e.target.value)}
                  className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-indigo-500"
                >
                  <option value="chathamkulam-institutions">Chathamkulam Business School, Palakkad</option>
                  <option value="rajagiri-institutions">Rajagiri Institutions, Kochi</option>
                  <option value="scms-institutions">SCMS Group, Aluva</option>
                </select>
              </div>
            </div>

            {/* Simulated Analytics Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-[11px] text-slate-500 font-semibold mb-1">Monthly Profile Views</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">3,420</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    +48%
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Via MARGEXA AI Matchmaker</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-[11px] text-slate-500 font-semibold mb-1">Direct Student Enquiries</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-indigo-700">184</span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    New this month
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Course-specific forms</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-[11px] text-slate-500 font-semibold mb-1">Counseling Calls Booked</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-600">52</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                    Scheduled
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Online counseling scheduler</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-[11px] text-slate-500 font-semibold mb-1">Admission Campaign Status</div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      isCampaignActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-300'
                    }`}
                  ></span>
                  <span className="text-xs font-bold text-slate-800">
                    {isCampaignActive ? 'Featured Spotlight Active' : 'Campaign Paused'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCampaignActive(!isCampaignActive);
                    showToast(isCampaignActive ? 'Campaign paused' : 'Priority Spotlight activated!');
                  }}
                  className="text-[10px] text-indigo-600 font-bold hover:underline mt-1 cursor-pointer"
                >
                  {isCampaignActive ? 'Pause Spotlight' : 'Reactivate Spotlight'}
                </button>
              </div>
            </div>

            {/* Split Lead Management Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Left Column: Leads List */}
              <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                      Incoming Student Enquiries ({filteredDemoLeads.length})
                    </h3>
                  </div>

                  {/* Filter Status */}
                  <select
                    value={leadFilterStatus}
                    onChange={(e) => setLeadFilterStatus(e.target.value)}
                    className="text-[11px] font-semibold px-2 py-1 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Counseling Scheduled">Counseling Scheduled</option>
                    <option value="Admission Confirmed">Admission Confirmed</option>
                  </select>
                </div>

                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {filteredDemoLeads.map((lead) => {
                    const isSelected = selectedDemoLead?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedDemoLead(lead)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-400 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-indigo-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{lead.studentName}</span>
                              <span className="text-[10px] font-normal text-slate-400">
                                ({lead.district})
                              </span>
                            </div>
                            <div className="text-indigo-600 font-semibold text-[11px] mt-0.5">
                              {lead.courseInterest}
                            </div>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              lead.status === 'New'
                                ? 'bg-rose-100 text-rose-800'
                                : lead.status === 'Contacted'
                                ? 'bg-amber-100 text-amber-800'
                                : lead.status === 'Counseling Scheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <span>Score: {lead.scorePercentage}%</span>
                            <span>•</span>
                            <span>Budget: ₹{(lead.budgetAnnual / 1000).toFixed(0)}k/yr</span>
                          </div>
                          <span className="text-slate-400 text-[10px]">{lead.receivedAt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Lead Detail & Follow-up Actions */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                {selectedDemoLead ? (
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Enquiry Details
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900">
                          {selectedDemoLead.studentName}
                        </h4>
                      </div>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600 font-semibold">
                        {selectedDemoLead.id}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs mb-6">
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">Interested Course:</span>
                        <span className="font-bold text-slate-800 text-right">
                          {selectedDemoLead.courseInterest}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">Phone:</span>
                        <span className="font-mono font-semibold text-slate-800">
                          {selectedDemoLead.phone}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">Email:</span>
                        <span className="font-medium text-slate-800">{selectedDemoLead.email}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">Student District:</span>
                        <span className="font-medium text-slate-800">{selectedDemoLead.district}, Kerala</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">Academic Score:</span>
                        <span className="font-bold text-emerald-600">{selectedDemoLead.scorePercentage}%</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">Assigned Staff:</span>
                        <span className="font-bold text-indigo-700">
                          {selectedDemoLead.assignedStaff || 'Unassigned'}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-[11px] text-slate-600">
                        <strong className="block text-slate-800 mb-0.5">Counselor Notes:</strong>
                        {selectedDemoLead.notes || 'No notes added yet.'}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-700">Update Lead Status:</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => handleLeadStatusChange(selectedDemoLead.id, 'Contacted')}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-semibold cursor-pointer"
                        >
                          Mark Contacted
                        </button>
                        <button
                          onClick={() =>
                            handleLeadStatusChange(selectedDemoLead.id, 'Counseling Scheduled')
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-semibold cursor-pointer hover:bg-blue-100"
                        >
                          Schedule Video Call
                        </button>
                        <button
                          onClick={() =>
                            handleLeadStatusChange(selectedDemoLead.id, 'Admission Confirmed')
                          }
                          className="col-span-2 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold cursor-pointer hover:bg-emerald-700"
                        >
                          ✓ Confirm Admission / Issue Offer
                        </button>
                      </div>

                      {/* Quick Assign Staff (Enterprise feature) */}
                      <div className="pt-2">
                        <div className="text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                          <span>Assign Admission Counselor:</span>
                          <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded font-bold">
                            Enterprise Feature
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() =>
                              handleAssignStaff(selectedDemoLead.id, 'Smt. Priya R. (Senior Counselor)')
                            }
                            className="flex-1 px-2 py-1 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                          >
                            Priya R.
                          </button>
                          <button
                            onClick={() =>
                              handleAssignStaff(selectedDemoLead.id, 'Dr. Vivek Menon (Dean)')
                            }
                            className="flex-1 px-2 py-1 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                          >
                            Dr. Vivek
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Select a student enquiry on the left to view actions and details.
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                  <button
                    onClick={() => handleOpenSubscribe('premium')}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Activate This CRM for Your College</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INSTITUTIONAL FAQ */}
        {activeSubTab === 'faq' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              Frequently Asked Questions for Colleges & Universities
            </h2>
            <p className="text-xs text-slate-500 mb-8">
              Everything you need to know about joining MARGEXA as a recognized partner college.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  What is included in the Free listing plan?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Every legitimate college recognized by AICTE, UGC, or Kerala universities is entitled to our Free plan at ₹0. This includes your basic college profile, verified course and fee details, standard search ranking, basic enquiry form, and official contact information.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  Why should we upgrade to College Premium at ₹3,999 /month?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  College Premium is our recommended starting plan. It unlocks student enquiry management, enhanced campus photo galleries and downloadable prospectus, priority notifications whenever an applicant matches your cutoff, monthly performance reports, and limited featured placements across search results.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  What additional capabilities are in College Enterprise at ₹7,999 /month?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  College Enterprise is engineered for institutions running active admissions campaigns with multiple admission staff members. It provides multi-staff accounts, round-robin lead assignment, automated enquiry WhatsApp/SMS follow-up reminders, priority #1 campaign placement, online video counselling scheduler, custom landing pages, advanced course demand insights, and a quarterly executive strategy review.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  How does the MARGEXA flat ₹10,000 fee deduction tie into this?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  MARGEXA offers students a flat ₹10,000 direct institutional fee concession across colleges. Partner colleges that subscribe to College Premium or Enterprise gain direct access to this pool of high-motivation applicants who have already had their eligibility and budgets pre-screened.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  Can we switch from Monthly to Annual billing later?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Yes, at any time. When switching to annual billing, your institution receives an automatic 20% discount (equivalent to over 2 months free) plus dedicated onboarding assistance from our academic relations team.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subscription / Plan Activation Modal */}
      {isSubscribeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scale-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSubscribeModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {paymentSuccessData ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">
                  Subscription Confirmed!
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Your college account is now provisioned with{' '}
                  <strong className="text-indigo-600">
                    {COLLEGE_PLANS.find((p) => p.id === paymentSuccessData.plan)?.name}
                  </strong>
                  .
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subscription Ref ID:</span>
                    <span className="font-mono font-bold text-slate-800">{paymentSuccessData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Institution:</span>
                    <span className="font-bold text-slate-800">{paymentSuccessData.collegeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plan Tier:</span>
                    <span className="font-bold text-indigo-700 capitalize">{paymentSuccessData.plan} Plan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Billing Cycle:</span>
                    <span className="capitalize text-slate-800">{paymentSuccessData.billingCycle}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                    <span>Total Amount:</span>
                    <span>₹{paymentSuccessData.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Account Manager:</span>
                    <span className="text-slate-700">{paymentSuccessData.assignedManager}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsSubscribeModalOpen(false);
                      setActiveSubTab('demo');
                    }}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Open Admission Portal</span>
                  </button>
                  <button
                    onClick={() => setIsSubscribeModalOpen(false)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Institutional Subscription
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Activate {COLLEGE_PLANS.find((p) => p.id === selectedPlanForModal)?.name}
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Complete your college details to start receiving direct verified admission enquiries and priority campaign placement.
                </p>

                <form onSubmit={handleConfirmSubscription} className="space-y-4">
                  {/* Select College */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Select Your College / Institution *
                    </label>
                    <select
                      value={selectedCollegeId}
                      onChange={(e) => setSelectedCollegeId(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                      required
                    >
                      {COLLEGES_DATA.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.name} ({col.location.city})
                        </option>
                      ))}
                      <option value="other">Other / New Institution (Enter name below)</option>
                    </select>
                  </div>

                  {selectedCollegeId === 'other' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        College / University Full Name *
                      </label>
                      <input
                        type="text"
                        value={customCollegeName}
                        onChange={(e) => setCustomCollegeName(e.target.value)}
                        placeholder="e.g. Malabar Institute of Technology"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  )}

                  {/* Plan & Billing Tier Selection */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Selected Plan Tier
                      </label>
                      <select
                        value={selectedPlanForModal}
                        onChange={(e) => setSelectedPlanForModal(e.target.value as CollegePlanTier)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-indigo-700"
                      >
                        <option value="free">Free (₹0)</option>
                        <option value="premium">College Premium (₹3,999/mo)</option>
                        <option value="enterprise">College Enterprise (₹7,999/mo)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Billing Term
                      </label>
                      <select
                        value={modalBillingCycle}
                        onChange={(e) => setModalBillingCycle(e.target.value as 'monthly' | 'annual')}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual (Save 20%)</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Person Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Admissions Officer / Principal Name *
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Dr. K. Narayanan"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Designation *
                      </label>
                      <input
                        type="text"
                        value={contactDesignation}
                        onChange={(e) => setContactDesignation(e.target.value)}
                        placeholder="Principal / Admissions Director"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Official Email ID *
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="admissions@college.edu.in"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Direct Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+91 94471 23456"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      College GSTIN (Optional for Tax Invoicing)
                    </label>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="e.g. 32AAAAA0000A1Z5"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs">
                    <div className="flex justify-between font-bold text-slate-900 mb-1">
                      <span>Subscription Total:</span>
                      <span className="text-indigo-700 text-sm">
                        {selectedPlanForModal === 'free'
                          ? '₹0 (Free Forever)'
                          : modalBillingCycle === 'annual'
                          ? `₹${Math.round(
                              (COLLEGE_PLANS.find((p) => p.id === selectedPlanForModal)?.price || 0) *
                                12 *
                                0.8
                            ).toLocaleString('en-IN')} / year`
                          : `₹${(
                              COLLEGE_PLANS.find((p) => p.id === selectedPlanForModal)?.price || 0
                            ).toLocaleString('en-IN')} / month`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Includes instant CRM access, automated student lead notifications, and performance tracking.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {selectedPlanForModal === 'free'
                          ? 'Activate Free Listing'
                          : `Confirm & Activate Plan`}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubscribeModalOpen(false)}
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
