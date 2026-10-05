import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MENTORS_DATA } from '../data/mentorsData';
import { Mentor, CampusVisitBooking, AdmissionPlusBooking } from '../types';
import {
  Crown,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Utensils,
  Compass,
  FileCheck,
  UserCheck,
  PhoneCall,
  Video,
  Star,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
  Building,
  Users,
  AlertCircle,
  Ticket,
  ChevronRight,
  Train,
  Camera,
  HeartHandshake,
  FileSpreadsheet,
  FileText,
  BadgePercent,
  Headphones,
  MessageSquare,
  ListChecks,
  BellRing,
  Route,
  Share2
} from 'lucide-react';

const FEATURED_CAMPUSES = [
  {
    id: 'chathamkulam-business-school',
    name: 'Chathamkulam Business School (CBS), Palakkad',
    tag: 'Anchor MBA Campus • Palakkad',
    address: 'Chathamkulam Knowledge City, Menonpara, Palakkad, Kerala',
    popularCourses: 'MBA: Marketing, Human Resources, Finance, Data Analysis, Logistics',
  },
  {
    id: 'rajagiri-social-sciences',
    name: 'Rajagiri College of Social Sciences, Kochi',
    tag: 'Autonomous • NAAC A++',
    address: 'Rajagiri Valley, Kakkanad, Kochi',
    popularCourses: 'MCA, MBA, B.Com, Psychology, MSW',
  },
  {
    id: 'scms-cochin',
    name: 'SCMS Group of Institutions, Aluva',
    tag: 'Premier Management & Tech',
    address: 'Prathap Nagar, Muttom, Aluva, Ernakulam',
    popularCourses: 'PGDM, B.Tech, BBA Digital Marketing',
  },
  {
    id: 'cet-trivandrum',
    name: 'College of Engineering Trivandrum (CET)',
    tag: 'Flagship Engineering • APJ KTU',
    address: 'Engineering College P.O, Sreekaryam, Thiruvananthapuram',
    popularCourses: 'B.Tech CSE, ECE, Mechanical, Civil, MBA',
  },
  {
    id: 'tkm-engineering',
    name: 'TKM College of Engineering, Kollam',
    tag: 'Govt Aided Premier • NAAC A+',
    address: 'Karicode, Kollam, Kerala',
    popularCourses: 'B.Tech CSE, Mechanical, Robotics, Civil',
  },
];

export type PackageTierKey =
  | 'MARGEXA Student Visit (₹999)'
  | 'MARGEXA Travel Plus (₹1,499)'
  | 'MARGEXA VIP Family Experience (₹1,999)';

const CAMPUS_PACKAGES_CONFIG = [
  {
    key: 'MARGEXA Student Visit (₹999)' as PackageTierKey,
    tag: 'Basic',
    name: 'MARGEXA Student Visit',
    price: 999,
    priceDisplay: '₹999',
    audience: 'For 1 student',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    headerNote: null,
    inclusions: [
      'Dedicated college guide.',
      'College admission assistance.',
      'Campus tour.',
      'Course and fee structure explanation.',
      'Free lunch.',
      'Free refreshments.',
      'Admission document checklist.',
      'College comparison notes.',
      'Post-visit digital summary.',
    ],
    recommended: false,
  },
  {
    key: 'MARGEXA Travel Plus (₹1,499)' as PackageTierKey,
    tag: 'Recommended',
    name: 'MARGEXA Travel Plus',
    price: 1499,
    priceDisplay: '₹1,499',
    audience: 'For 1 student',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    headerNote: 'Everything in Student Visit, plus:',
    inclusions: [
      'Free round-trip train transport to the college.',
      'Dedicated campus guide.',
      'Admission assistance.',
      'Free lunch.',
      'Free refreshments.',
      'Hostel and accommodation walkthrough.',
      'Interaction with current college students, where available.',
      'Priority campus visit coordination.',
      'Personalized visit itinerary.',
      'Post-visit digital college comparison report.',
    ],
    recommended: true,
  },
  {
    key: 'MARGEXA VIP Family Experience (₹1,999)' as PackageTierKey,
    tag: 'Family',
    name: 'MARGEXA VIP Family Experience',
    price: 1999,
    priceDisplay: '₹1,999',
    audience: '1 student + up to 3 family members',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    headerNote: 'Everything in Student Visit, plus:',
    inclusions: [
      'Free lunch for all 4 attendees.',
      'Free refreshments for all 4 attendees.',
      'Family-focused admission counselling.',
      'Detailed campus and hostel tour.',
      'Parent-focused college information session.',
      'Family discussion and college selection worksheet.',
      'Family photo at the campus, where permitted.',
      'Priority visit scheduling.',
    ],
    recommended: false,
  },
];

const ADMISSION_PLUS_INCLUSIONS = [
  '5 one-to-one calls with MARGEXA staff.',
  '20 minutes per call.',
  '100 minutes of total assistance.',
  'College and course selection guidance.',
  'Admission eligibility guidance.',
  'Application form assistance.',
  'Scholarship and fee structure information.',
  'Personalized college comparison report.',
  'Digital admission checklist.',
  'Admission deadline reminders.',
  'Personalized admission roadmap.',
  'WhatsApp scheduling support.',
  'Session summaries and action points.',
];

interface PremiumServicesViewProps {
  onNavigateToCollegePlans?: () => void;
}

export const PremiumServicesView: React.FC<PremiumServicesViewProps> = ({ onNavigateToCollegePlans }) => {
  const {
    student,
    campusVisitBookings,
    bookCampusVisit,
    admissionPlusBookings,
    bookAdmissionPlus,
    counselingBookings,
    bookPriorityCounseling
  } = useAuth();

  // Selected Campus Package Tier State (default: Recommended Travel Plus)
  const [selectedTier, setSelectedTier] = useState<PackageTierKey>('MARGEXA Travel Plus (₹1,499)');
  const [selectedCampus, setSelectedCampus] = useState<string>(FEATURED_CAMPUSES[0].name);
  const [visitDate, setVisitDate] = useState<string>('2026-10-12');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (09:30 AM - 01:00 PM)');
  const [attendeesCount, setAttendeesCount] = useState<number>(1);
  const [foodPreference, setFoodPreference] = useState<'Vegetarian' | 'Non-Vegetarian' | 'Any'>('Vegetarian');
  const [boardingStation, setBoardingStation] = useState<string>('Palakkad Junction (PGT)');
  const [visitorName, setVisitorName] = useState<string>(student.name || 'Rahul K. Menon');
  const [visitorPhone, setVisitorPhone] = useState<string>(student.phone || '+91 98471 89210');
  const [visitorEmail, setVisitorEmail] = useState<string>(student.email || 'rahul.menon@gmail.com');
  const [notes, setNotes] = useState<string>('Interested in campus walkthrough, hostel inspection, and MBA/Polytechnic merit grants.');

  // Confirmation Modal / Toast State
  const [bookedPass, setBookedPass] = useState<CampusVisitBooking | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Admission Plus Online Modal & Booking State
  const [isAdmissionPlusModalOpen, setIsAdmissionPlusModalOpen] = useState<boolean>(false);
  const [admissionWhatsapp, setAdmissionWhatsapp] = useState<string>(student.phone || '+91 98471 89210');
  const [admissionCourse, setAdmissionCourse] = useState<string>('MBA Logistics / Engineering Diploma / BBA');
  const [admissionTiming, setAdmissionTiming] = useState<string>('Evening (05:00 PM - 07:00 PM)');
  const [admissionNotes, setAdmissionNotes] = useState<string>('Need help shortlisting top colleges in Kerala and reviewing Chathamkulam merit fee waivers.');
  const [admissionSuccessModal, setAdmissionSuccessModal] = useState<AdmissionPlusBooking | null>(null);

  // VIP Express Callback State
  const [callbackPhone, setCallbackPhone] = useState<string>(student.phone || '+91 98471 89210');
  const [callbackMode, setCallbackMode] = useState<'Phone Call' | 'Video Meet' | 'In-Person (Palakkad/Kochi)'>('Phone Call');
  const [callbackPriority, setCallbackPriority] = useState<'Immediate Express (Within 20 mins)' | 'Standard VIP (Within 2 hrs)'>('Immediate Express (Within 20 mins)');
  const [callbackCollege, setCallbackCollege] = useState<string>('Chathamkulam Group of Institutions');
  const [callbackNotes, setCallbackNotes] = useState<string>('Need assistance evaluating merit fee concessions and campus visit dates.');
  const [vipSuccessToast, setVipSuccessToast] = useState<boolean>(false);

  // Mentor Booking State
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [mentorSlot, setMentorSlot] = useState<string>('');
  const [mentorTopic, setMentorTopic] = useState<string>('Chathamkulam & Kerala Admissions');
  const [mentorSuccessToast, setMentorSuccessToast] = useState<boolean>(false);

  const currentPkg = CAMPUS_PACKAGES_CONFIG.find((p) => p.key === selectedTier) || CAMPUS_PACKAGES_CONFIG[1];

  const handleSelectPackage = (key: PackageTierKey) => {
    setSelectedTier(key);
    if (key.includes('Family')) {
      setAttendeesCount(4);
    } else {
      setAttendeesCount(1);
    }
  };

  const handleBookVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = currentPkg.price;
    const extraNotes = selectedTier.includes('Travel Plus')
      ? `${notes ? notes + ' | ' : ''}Train Boarding Station: ${boardingStation}`
      : notes;

    const newBooking = bookCampusVisit({
      studentName: visitorName,
      studentEmail: visitorEmail,
      phone: visitorPhone,
      collegeName: selectedCampus,
      packageTier: selectedTier,
      amount,
      visitDate: new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(new Date(visitDate || Date.now())),
      timeSlot,
      attendeesCount,
      foodPreference,
      notes: extraNotes,
    });

    setBookedPass(newBooking);
    setShowSuccessModal(true);
  };

  const handleAdmissionPlusSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSubscription = bookAdmissionPlus({
      studentName: student.name || 'Rahul K. Menon',
      studentEmail: student.email || 'rahul.menon@gmail.com',
      phone: visitorPhone,
      whatsappNumber: admissionWhatsapp,
      targetCourse: admissionCourse,
      preferredTiming: admissionTiming,
      notes: admissionNotes,
    });

    setIsAdmissionPlusModalOpen(false);
    setAdmissionSuccessModal(newSubscription);
  };

  const handleBookVIPCallback = (e: React.FormEvent) => {
    e.preventDefault();
    bookPriorityCounseling({
      studentName: student.name,
      studentEmail: student.email,
      phone: callbackPhone,
      preferredMode: callbackMode,
      priority: callbackPriority,
      targetCollege: callbackCollege,
      notes: callbackNotes,
    });

    setVipSuccessToast(true);
    setTimeout(() => {
      setVipSuccessToast(false);
    }, 3500);
  };

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

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Switcher Banner for Colleges */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 rounded-3xl p-4 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              <span>Are You a College Admissions Dean, Principal, or Trustee?</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white">
              Explore MARGEXA College Premium & Enterprise Plans
            </h4>
            <p className="text-xs text-slate-300">
              Free (₹0), College Premium (₹3,999/mo), and Enterprise (₹7,999/mo) with full student enquiry management, campaign placement & course demand analytics.
            </p>
          </div>
        </div>
        {onNavigateToCollegePlans && (
          <button
            onClick={onNavigateToCollegePlans}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0 hover:scale-105"
          >
            <span>View College Plans</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-indigo-900/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/40">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>MARGEXA Premium Academic Advisory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              MARGEXA Premium
            </h1>

            <div className="inline-flex items-center gap-3 text-xl sm:text-2xl font-black text-amber-400 font-heading bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
              <span>₹499 – ₹1,999 per plan</span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Whether you need remote one-to-one telephonic assistance or a fully guided on-campus immersion, MARGEXA has you covered. Explore our remote <strong>Admission Plus (₹499)</strong> or our 3 official on-campus visit packages (<strong>₹999 – ₹1,999</strong>).
            </p>

            {/* Quick Ribbon */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700 text-xs font-bold text-emerald-200">
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                Online: Admission Plus (₹499)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-xs font-bold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                Basic: Student Visit (₹999)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-900/80 border border-indigo-700 text-xs font-bold text-indigo-200">
                <Train className="w-3.5 h-3.5 text-indigo-400" />
                Recommended: Travel Plus (₹1,499)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900/80 border border-amber-700 text-xs font-bold text-amber-200">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Family: VIP Family Experience (₹1,999)
              </span>
            </div>
          </div>

          {/* Quick Hotline & Stats Card */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 text-left shrink-0 space-y-4 lg:w-80">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-semibold text-slate-300">Official Admissions Desk</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                Active Desk
              </span>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                Student Helpline
              </div>
              <a
                href="tel:+919447012389"
                className="text-xl font-black text-white hover:text-amber-300 transition flex items-center gap-2 mt-0.5 font-mono"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                +91 94470 12389
              </a>
              <p className="text-[11px] text-slate-300 mt-1">
                Mon – Sat: 8:30 AM – 7:30 PM (Palakkad & Kochi)
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Chathamkulam & Kerala Admissions Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Over 1,200+ guided student sessions completed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setIsAdmissionPlusModalOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Online (₹499)</span>
              </button>
              <a
                href="#packages-comparison-section"
                className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 text-center"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Visits (₹999+)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: MARGEXA ADMISSION PLUS (Featured Online Assistance Showcase) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/40 shadow-xl text-left">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-emerald-900/60">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/40">
              <Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span>Online Distance & Telephonic Assistance</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
              MARGEXA Admission Plus
            </h2>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-heading">
                ₹499
              </span>
              <span className="text-xs sm:text-sm text-emerald-200/80 font-medium">
                For one student · Online assistance
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get comprehensive 1-on-1 counseling from our central admission officers from the comfort of your home. Includes 5 dedicated calls, document review, personalized roadmap, and priority WhatsApp scheduling.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsAdmissionPlusModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Enroll in Admission Plus (₹499)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 13 Bullet Points Grid */}
        <div className="relative z-10 pt-8 space-y-4">
          <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>All 13 Inclusions in MARGEXA Admission Plus:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ADMISSION_PLUS_INCLUSIONS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <span className="text-xs text-slate-200 font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: MARGEXA'S THREE CAMPUS PACKAGES */}
      <section id="packages-comparison-section" className="space-y-8 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            Guided Campus Visits
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-heading">
            MARGEXA's Three Campus Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Experience your chosen college in-person with a dedicated MARGEXA guide.
          </p>
        </div>

        {/* 3 Packages Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {CAMPUS_PACKAGES_CONFIG.map((pkg) => {
            const isSelected = selectedTier === pkg.key;
            return (
              <div
                key={pkg.key}
                onClick={() => handleSelectPackage(pkg.key)}
                className={`relative rounded-3xl p-6 sm:p-7 border-2 transition duration-200 flex flex-col justify-between cursor-pointer ${
                  pkg.recommended
                    ? isSelected
                      ? 'border-indigo-600 bg-white shadow-2xl ring-2 ring-indigo-600/30'
                      : 'border-indigo-400 bg-white shadow-lg hover:border-indigo-600'
                    : isSelected
                    ? pkg.tag === 'Family'
                      ? 'border-amber-500 bg-white shadow-2xl ring-2 ring-amber-500/30'
                      : 'border-slate-800 bg-white shadow-xl ring-2 ring-slate-800/20'
                    : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Top Badge */}
                {pkg.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    Recommended / Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                        pkg.tag === 'Basic'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : pkg.tag === 'Recommended'
                          ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {pkg.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {pkg.audience}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h3 className="text-xl font-black text-slate-950 font-heading">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
                        {pkg.priceDisplay}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ visit</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mt-1">
                      {pkg.audience}
                    </div>
                  </div>

                  {/* Plus header note if present */}
                  {pkg.headerNote && (
                    <div className="pt-2 text-xs font-bold text-indigo-700 border-t border-slate-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{pkg.headerNote}</span>
                    </div>
                  )}

                  {/* Inclusions List */}
                  <div className={`space-y-2.5 text-xs text-slate-700 ${!pkg.headerNote ? 'pt-4 border-t border-slate-100' : 'pt-2'}`}>
                    {pkg.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug text-slate-800 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPackage(pkg.key);
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? pkg.recommended
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                          : pkg.tag === 'Family'
                          ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                          : 'bg-slate-900 text-white shadow-lg'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selected Package ({pkg.priceDisplay})</span>
                      </>
                    ) : (
                      <span>Select {pkg.name} ({pkg.priceDisplay})</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: Interactive Booking Engine Form for Campus Visits */}
      <section id="book-visit-form" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Ticket className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-heading">
                Book Campus Visit Pass
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Currently Selected: <strong className="text-indigo-700">{currentPkg.name} ({currentPkg.priceDisplay})</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 self-start md:self-auto">
            <span className="text-xs font-bold text-slate-700 px-2">Total Amount:</span>
            <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-xs font-mono">
              {currentPkg.priceDisplay}
            </span>
          </div>
        </div>

        <form onSubmit={handleBookVisitSubmit} className="pt-8 space-y-6">
          {/* Package Selection Radio Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2">
              Confirm or Change Your Campus Package Tier <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CAMPUS_PACKAGES_CONFIG.map((pkg) => (
                <button
                  key={pkg.key}
                  type="button"
                  onClick={() => handleSelectPackage(pkg.key)}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                    selectedTier === pkg.key
                      ? pkg.recommended
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-600/30'
                        : pkg.tag === 'Family'
                        ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/30'
                        : 'border-slate-800 bg-slate-50 text-slate-950 ring-2 ring-slate-800/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">
                      {pkg.tag}
                    </span>
                    {pkg.recommended && (
                      <span className="text-[9px] font-black bg-indigo-600 text-white px-1.5 py-0.5 rounded-sm uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold mt-1 text-slate-900">{pkg.name}</div>
                  <div className="text-[11px] text-slate-500">{pkg.audience}</div>
                  <div className="font-mono text-sm font-black text-indigo-700 mt-2">
                    {pkg.priceDisplay}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target College Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                <span>Select Campus for Visit <span className="text-rose-500">*</span></span>
                <span className="text-[11px] font-normal text-indigo-600">All Kerala campuses</span>
              </label>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                {FEATURED_CAMPUSES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.tag})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Tip: Chathamkulam Knowledge City Palakkad offers on-campus escort for both MBA, Polytechnic and Degree departments.
              </p>
            </div>

            {/* Travel Plus specific field: Round-trip train station */}
            {selectedTier.includes('Travel Plus') ? (
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Free Round-Trip Train Boarding Station <span className="text-rose-500">*</span></span>
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600">100% Free via Travel Plus</span>
                </label>
                <select
                  value={boardingStation}
                  onChange={(e) => setBoardingStation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-indigo-300 bg-indigo-50/30 font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <option value="Palakkad Junction (PGT)">Palakkad Junction (PGT) / Town (PGTN)</option>
                  <option value="Shoranur Junction (SRR)">Shoranur Junction (SRR)</option>
                  <option value="Ernakulam Junction (ERS) / Town (ERN)">Ernakulam Junction (ERS) / Town (ERN) - Kochi</option>
                  <option value="Thrissur (TCR)">Thrissur (TCR)</option>
                  <option value="Kozhikode (CLT)">Kozhikode (CLT) - Calicut</option>
                  <option value="Aluva (AWY)">Aluva (AWY)</option>
                  <option value="Thiruvananthapuram Central (TVC)">Thiruvananthapuram Central (TVC)</option>
                  <option value="Kollam Junction (QLN)">Kollam Junction (QLN)</option>
                  <option value="Kannur (CAN)">Kannur (CAN)</option>
                  <option value="Coimbatore Junction (CBE)">Coimbatore Junction (CBE)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Our coordination desk books your confirmed round-trip train ticket directly to the nearest railway station.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Total Attendees (Student + Family) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={attendeesCount}
                  onChange={(e) => setAttendeesCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  {selectedTier.includes('Family') ? (
                    <>
                      <option value={4}>4 People (Student + 3 Family Members - Full Package)</option>
                      <option value={3}>3 People (Student + 2 Parents / Guardians)</option>
                      <option value={2}>2 People (Student + 1 Parent)</option>
                      <option value={1}>1 Person (Student only)</option>
                    </>
                  ) : (
                    <>
                      <option value={1}>1 Person (For 1 Student as per package)</option>
                      <option value={2}>2 People (Student + 1 Parent companion)</option>
                    </>
                  )}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  {selectedTier.includes('Family')
                    ? 'Free lunch & refreshments included for all attendees.'
                    : 'Designed for individual student guidance.'}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Preferred Date */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Preferred Visit Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Preferred Time Slot <span className="text-rose-500">*</span>
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Morning (09:30 AM - 01:00 PM)">Morning (09:30 AM - 01:00 PM)</option>
                <option value="Afternoon (01:30 PM - 05:00 PM)">Afternoon (01:30 PM - 05:00 PM)</option>
                <option value="Full Day Intensive (10:00 AM - 04:30 PM)">Full Day Intensive (10:00 AM - 04:30 PM)</option>
              </select>
            </div>

            {/* Food Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                <span>Free Lunch & Food Preference <span className="text-rose-500">*</span></span>
                <span className="text-emerald-600 font-semibold text-[11px]">Included free</span>
              </label>
              <select
                value={foodPreference}
                onChange={(e) => setFoodPreference(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Vegetarian">Pure Vegetarian (Kerala Meals / Sadya)</option>
                <option value="Non-Vegetarian">Non-Vegetarian (Chicken / Fish Meals)</option>
                <option value="Any">No Specific Preference</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Student Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                WhatsApp / Contact Mobile <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Specific Query / Focus Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Specific Academic Interests or Special Requests (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Inspect women's hostel, meet Mechanical HOD, check MBA logistics placement records"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Booking Summary Box */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span>Selected Package:</span>
                <span className="text-indigo-700 font-extrabold">{currentPkg.name}</span>
                <span className="bg-indigo-100 text-indigo-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {currentPkg.tag}
                </span>
              </div>
              <div className="text-slate-600">
                Destination: <strong>{selectedCampus}</strong> • Audience: <strong>{currentPkg.audience}</strong> • Food: <strong>{foodPreference}</strong>
              </div>
              {selectedTier.includes('Travel Plus') && (
                <div className="text-[11px] text-indigo-700 flex items-center gap-1 font-semibold">
                  <Train className="w-3.5 h-3.5" />
                  <span>Free Round-trip Train from {boardingStation}</span>
                </div>
              )}
              {selectedTier.includes('Family') && (
                <div className="text-[11px] text-amber-800 flex items-center gap-1 font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Free food, refreshments & admission counseling for all 4 attendees</span>
                </div>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Total Payable</div>
                <div className="text-2xl font-black text-slate-950 font-mono">
                  {currentPkg.priceDisplay}
                </div>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4 text-amber-300" />
                <span>Confirm & Reserve {currentPkg.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* SECTION: Active Bookings & Subscriptions Tracker */}
      <section className="space-y-6 text-left">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-950 font-heading flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Your Active MARGEXA Packages & Bookings
          </h3>
          <p className="text-xs text-slate-500">
            Track your online Admission Plus calls balance and your confirmed on-campus tour passes.
          </p>
        </div>

        {/* 1. Admission Plus Subscriptions */}
        {admissionPlusBookings.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active MARGEXA Admission Plus Subscriptions ({admissionPlusBookings.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {admissionPlusBookings.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-gradient-to-br from-emerald-950/95 to-slate-900 text-white rounded-2xl p-5 border border-emerald-700/50 shadow-md space-y-4"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          {sub.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/40">
                          {sub.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-white mt-1 font-heading">
                        MARGEXA Admission Plus
                      </h4>
                    </div>
                    <span className="text-xs font-black font-mono text-emerald-300 bg-white/10 px-2.5 py-1 rounded-lg">
                      ₹{sub.amount}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div>
                      <span className="text-[10px] text-emerald-400 block font-bold uppercase">Call Balance</span>
                      <span className="font-bold text-white text-sm">
                        {sub.remainingCalls} of {sub.totalCalls} Calls Left
                      </span>
                      <span className="text-[11px] text-slate-400 block">{sub.totalMinutes} Mins Total Assistance</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 block font-bold uppercase">Assigned Advisor</span>
                      <span className="font-semibold text-white">{sub.assignedAdvisor}</span>
                      <span className="text-[11px] text-slate-400 block">{sub.preferredTiming}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 text-xs flex items-center justify-between border border-white/10">
                    <div className="space-y-0.5">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">WhatsApp Concierge</div>
                      <div className="font-mono font-bold text-white">{sub.whatsappNumber}</div>
                    </div>
                    <a
                      href={`https://wa.me/919447012389?text=Hi%2C%20I%20have%20an%20active%20MARGEXA%20Admission%20Plus%20package%20(${sub.id}).%20I%20would%20like%20to%20schedule%20my%20next%20one-to-one%20call.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition flex items-center gap-1 shrink-0"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Schedule Call</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>Target: <strong>{sub.targetCourse}</strong></span>
                    <span className="text-emerald-300 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Roadmap Dispatched
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Campus Visit Passes */}
        <div className="space-y-3">
          <div className="text-xs uppercase font-extrabold tracking-wider text-slate-700 flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-indigo-600" />
            <span>Confirmed On-Campus Guided Tours ({campusVisitBookings.length})</span>
          </div>

          {campusVisitBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-dashed border-slate-300 text-center space-y-3">
              <Ticket className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-sm font-bold text-slate-800">No Campus Visits Booked Yet</div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Book one of MARGEXA's three campus packages above to explore Chathamkulam Group of Institutions or other premier colleges with an escort guide.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campusVisitBookings.map((visit) => (
                <div
                  key={visit.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4 hover:border-indigo-300 transition"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                          {visit.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {visit.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 font-heading">
                        {visit.collegeName}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black font-mono text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg block">
                        ₹{visit.amount}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                        {visit.packageTier.replace(/\(.*?\)/, '').trim()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Visit Date & Slot</span>
                      <span className="font-semibold text-slate-900">{visit.visitDate}</span>
                      <span className="text-[11px] text-slate-500 block">{visit.timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Attendees & Meals</span>
                      <span className="font-semibold text-slate-900">{visit.attendeesCount} Person(s)</span>
                      <span className="text-[11px] text-slate-500 block">{visit.foodPreference} Lunch Included</span>
                    </div>
                  </div>

                  {/* Assigned Guide Card */}
                  <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-amber-800">
                        Assigned Campus Guide:
                      </div>
                      <div className="font-bold text-slate-900">
                        {visit.guideAssigned || 'Prof. K. Sreedharan (Senior Academic Escort)'}
                      </div>
                    </div>
                    <a
                      href={`tel:${visit.guideContact || '+919447012389'}`}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-[11px] transition flex items-center gap-1 shrink-0"
                    >
                      <PhoneCall className="w-3 h-3" />
                      Call Guide
                    </a>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span>Student: <strong>{visit.studentName}</strong></span>
                    <button
                      onClick={() => {
                        setBookedPass(visit);
                        setShowSuccessModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
                    >
                      View Visit Pass
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION: Fast-Track VIP Counseling Callback Form */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Express Remote Counseling
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white mt-1.5">
              Need Instant Telephonic or Video Guidance?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Book a guaranteed callback within 20 minutes with our central admission officers.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1.5 self-start md:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Free for Registered Students
          </span>
        </div>

        {vipSuccessToast && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            VIP Priority Consultation Requested! A senior counselor is reviewing your profile and will connect on {callbackPhone} shortly.
          </div>
        )}

        <form onSubmit={handleBookVIPCallback} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Student Contact Phone
              </label>
              <input
                type="text"
                required
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Preferred Consultation Mode
              </label>
              <select
                value={callbackMode}
                onChange={(e) => setCallbackMode(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-white/20 text-white focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              >
                <option value="Phone Call">Direct Phone Call</option>
                <option value="Video Meet">Google Meet / Video Consultation</option>
                <option value="In-Person (Palakkad/Kochi)">In-Person (Palakkad / Kochi Office)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Queue Priority
              </label>
              <select
                value={callbackPriority}
                onChange={(e) => setCallbackPriority(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-white/20 text-white focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              >
                <option value="Immediate Express (Within 20 mins)">Immediate Express (Within 20 mins)</option>
                <option value="Standard VIP (Within 2 hrs)">Standard VIP (Within 2 hrs)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target College / Campus
              </label>
              <input
                type="text"
                value={callbackCollege}
                onChange={(e) => setCallbackCollege(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Specific Query / Assistance Required
              </label>
              <input
                type="text"
                value={callbackNotes}
                onChange={(e) => setCallbackNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-slate-950" />
            Connect with Priority Counselor
          </button>
        </form>

        {/* Existing Callback Sessions */}
        {counselingBookings.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Your Remote Priority Counseling Slots ({counselingBookings.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {counselingBookings.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono font-bold text-amber-300">{c.id} • {c.targetCollege}</div>
                    <div className="text-slate-400 text-[11px]">{c.preferredMode} • {c.bookedAt}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECTION: 1-on-1 Personalized Academic Mentors */}
      <section className="space-y-4 text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
            Academic Advisory Panel
          </div>
          <h2 className="text-2xl font-black text-slate-950 font-heading mt-1.5">
            Book 1-on-1 Strategic Mentorship
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Consult senior professors, industry heads, and academic deans in Kerala before finalizing your course.
          </p>
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
      </section>

      {/* MODAL: MARGEXA ADMISSION PLUS ENROLLMENT (₹499) */}
      {isAdmissionPlusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Online Assistance Plan</span>
                </div>
                <h3 className="text-xl font-black text-slate-950 font-heading mt-2">
                  Enroll in MARGEXA Admission Plus (₹499)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  5 one-to-one calls (100 mins total) with MARGEXA staff, WhatsApp support & roadmap.
                </p>
              </div>
              <button
                onClick={() => setIsAdmissionPlusModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAdmissionPlusSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  WhatsApp Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={admissionWhatsapp}
                  onChange={(e) => setAdmissionWhatsapp(e.target.value)}
                  placeholder="e.g. +91 98471 23456"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  All 5 call scheduling links & meeting summaries are delivered directly to this WhatsApp.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Target Degree / Preferred Programs <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={admissionCourse}
                  onChange={(e) => setAdmissionCourse(e.target.value)}
                  placeholder="e.g. MBA Logistics, Polytechnic Computer Diploma, BBA Honors"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Preferred Call Timings <span className="text-rose-500">*</span>
                </label>
                <select
                  value={admissionTiming}
                  onChange={(e) => setAdmissionTiming(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="Morning (10:00 AM - 12:30 PM)">Morning (10:00 AM - 12:30 PM)</option>
                  <option value="Afternoon (02:00 PM - 04:30 PM)">Afternoon (02:00 PM - 04:30 PM)</option>
                  <option value="Evening (05:00 PM - 07:00 PM)">Evening (05:00 PM - 07:00 PM)</option>
                  <option value="Late Evening (07:30 PM - 09:30 PM)">Late Evening (07:30 PM - 09:30 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Specific Questions / Profile Details
                </label>
                <textarea
                  rows={2}
                  value={admissionNotes}
                  onChange={(e) => setAdmissionNotes(e.target.value)}
                  placeholder="e.g. Need assistance calculating merit fee waiver at Chathamkulam, checking LET cutoff ranks, comparing MBA specializations..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Price & Summary Callout */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span>Package Total:</span>
                  <span className="font-mono text-base font-black text-emerald-800">₹499 (One-Time)</span>
                </div>
                <div className="text-[11px] text-emerald-800">
                  ✓ 5 calls · 20 mins/call · 100 mins total · Personalized roadmap · Digital checklist
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdmissionPlusModalOpen(false)}
                  className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30 transition cursor-pointer"
                >
                  Confirm & Activate (₹499)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: ADMISSION PLUS SUBSCRIBED */}
      {admissionSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 sm:p-8 text-left space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                  Subscription Active
                </span>
                <h3 className="text-xl font-black text-slate-950 font-heading mt-2">
                  MARGEXA Admission Plus Activated!
                </h3>
              </div>
              <button
                onClick={() => setAdmissionSuccessModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-5 border border-emerald-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs font-bold text-emerald-300">
                  ID: {admissionSuccessModal.id}
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-400/30">
                  ₹499 Paid
                </span>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Available Call Balance</div>
                <div className="text-xl font-black text-white font-mono">
                  {admissionSuccessModal.totalCalls} Calls / {admissionSuccessModal.totalMinutes} Minutes
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Assigned Advisor</div>
                  <div className="font-semibold">{admissionSuccessModal.assignedAdvisor}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">WhatsApp Concierge</div>
                  <div className="font-semibold">{admissionSuccessModal.whatsappNumber}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-1.5">
              <div className="font-bold text-slate-900">What happens next:</div>
              <div className="text-[11px]">• Your personalized admission roadmap and digital checklist are being generated.</div>
              <div className="text-[11px]">• Your assigned advisor will send a WhatsApp message to {admissionSuccessModal.whatsappNumber} within 15 minutes.</div>
              <div className="text-[11px]">• You can schedule each of your 5 calls at your convenience.</div>
            </div>

            <button
              onClick={() => setAdmissionSuccessModal(null)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer text-center"
            >
              Great, Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Campus Visit Pass */}
      {showSuccessModal && bookedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                  Visit Confirmed
                </span>
                <h3 className="text-xl font-black text-slate-950 font-heading mt-2">
                  MARGEXA Campus Pass
                </h3>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Pass Card Visual */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs font-bold text-amber-400">
                  PASS ID: {bookedPass.id}
                </div>
                <div className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded-md">
                  {bookedPass.packageTier}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Campus Destination</div>
                <div className="text-base font-bold text-white font-heading">{bookedPass.collegeName}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-white/10">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Date & Time</div>
                  <div className="font-semibold">{bookedPass.visitDate}</div>
                  <div className="text-[11px] text-slate-300">{bookedPass.timeSlot}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Visitor Details</div>
                  <div className="font-semibold">{bookedPass.studentName}</div>
                  <div className="text-[11px] text-slate-300">{bookedPass.attendeesCount} Person(s) • {bookedPass.foodPreference} Meal</div>
                </div>
              </div>

              {bookedPass.notes && (
                <div className="text-[11px] text-slate-300 bg-white/5 p-2 rounded-lg border border-white/10">
                  {bookedPass.notes}
                </div>
              )}

              <div className="bg-white/10 rounded-xl p-3 text-xs flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-amber-300 uppercase font-bold">Assigned Guide</div>
                  <div className="font-bold text-white">{bookedPass.guideAssigned}</div>
                </div>
                <a
                  href={`tel:${bookedPass.guideContact}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition"
                >
                  Call Guide
                </a>
              </div>
            </div>

            {/* Inclusions Recap */}
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="font-bold text-slate-900">What's next for your visit:</div>
              <div className="space-y-1 text-[11px]">
                <div>• Your dedicated MARGEXA guide will receive you at the campus reception.</div>
                <div>• Free food & refreshments arranged at the college cafeteria.</div>
                <div>• Complete walkthrough of classrooms, laboratories, and hostels.</div>
                <div>• Personalized admission counseling and document verification.</div>
                {bookedPass.packageTier.includes('Travel Plus') && (
                  <div className="text-indigo-700 font-semibold">• Free round-trip train ticket details will be dispatched to your WhatsApp.</div>
                )}
                {bookedPass.packageTier.includes('Family') && (
                  <div className="text-amber-800 font-semibold">• Parent information session & family discussion worksheet will be handed on arrival.</div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer text-center"
              >
                Done / Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

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
