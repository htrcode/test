import React, { useState } from 'react';
import { CollegeRegistrationApplication } from '../types';
import { MargexaLogo } from './MargexaLogo';
import {
  X,
  Building,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Globe,
  Award,
  CheckCircle2,
  FileText,
  Clock,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Search
} from 'lucide-react';

interface CollegeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplicationSubmitted?: (app: CollegeRegistrationApplication) => void;
}

export const CollegeRegistrationModal: React.FC<CollegeRegistrationModalProps> = ({
  isOpen,
  onClose,
  onApplicationSubmitted,
}) => {
  // Mode: Apply vs Track Status
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');

  // Form State
  const [collegeName, setCollegeName] = useState('');
  const [shortName, setShortName] = useState('');
  const [type, setType] = useState<CollegeRegistrationApplication['type']>('Self-Financing');
  const [universityAffiliation, setUniversityAffiliation] = useState('University of Calicut');
  const [accreditation, setAccreditation] = useState('AICTE Approved');
  const [establishedYear, setEstablishedYear] = useState<number>(2010);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('Palakkad');
  const [officialWebsite, setOfficialWebsite] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [designation, setDesignation] = useState('Principal / Admissions Director');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [offeredLevels, setOfferedLevels] = useState<string[]>(['Undergraduate', 'Diploma']);
  const [estimatedIntake, setEstimatedIntake] = useState<number>(300);
  const [meritScholarshipOffered, setMeritScholarshipOffered] = useState<boolean>(true);
  const [notes, setNotes] = useState('');

  // Submitted Application state
  const [submittedApplication, setSubmittedApplication] = useState<CollegeRegistrationApplication | null>(null);

  // Tracking query state
  const [searchRefId, setSearchRefId] = useState('');
  const [trackedApp, setTrackedApp] = useState<CollegeRegistrationApplication | null>(null);

  if (!isOpen) return null;

  const districts = [
    'Palakkad',
    'Ernakulam',
    'Kozhikode',
    'Thrissur',
    'Malappuram',
    'Thiruvananthapuram',
    'Kollam',
    'Kottayam',
    'Kannur',
    'Alappuzha',
    'Idukki',
    'Pathanamthitta',
    'Wayanad',
    'Kasaragod',
  ];

  const affiliations = [
    'University of Calicut',
    'APJ Abdul Kalam Technological University (KTU)',
    'Mahatma Gandhi University (MGU)',
    'Cochin University of Science and Technology (CUSAT)',
    'University of Kerala',
    'State Board of Technical Education (DTE Kerala)',
    'Deemed to be University / Autonomous',
  ];

  const toggleLevel = (lvl: string) => {
    if (offeredLevels.includes(lvl)) {
      setOfferedLevels(offeredLevels.filter((l) => l !== lvl));
    } else {
      setOfferedLevels([...offeredLevels, lvl]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName.trim() || !email.trim() || !phone.trim() || !city.trim()) {
      alert('Please fill out all mandatory institutional fields.');
      return;
    }

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newApp: CollegeRegistrationApplication = {
      id: `MARGEXA-COL-${randomId}`,
      collegeName,
      shortName: shortName || collegeName.split(' ')[0],
      type,
      universityAffiliation,
      accreditation,
      establishedYear,
      city,
      district,
      state: 'Kerala',
      officialWebsite: officialWebsite.startsWith('http') ? officialWebsite : `https://${officialWebsite || 'example.edu.in'}`,
      representativeName,
      designation,
      email,
      phone,
      offeredLevels: offeredLevels as any,
      estimatedIntake,
      meritScholarshipOffered,
      notes,
      status: 'Pending Review',
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setSubmittedApplication(newApp);
    if (onApplicationSubmitted) {
      onApplicationSubmitted(newApp);
    }
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRefId.trim()) return;

    if (submittedApplication && submittedApplication.id.toLowerCase() === searchRefId.trim().toLowerCase()) {
      setTrackedApp(submittedApplication);
    } else if (searchRefId.includes('CHATHAMKULAM') || searchRefId.includes('8942') || searchRefId.includes('MARGEXA')) {
      // Mock existing verified partner status
      setTrackedApp({
        id: searchRefId.toUpperCase(),
        collegeName: 'Chathamkulam Group of Institutions',
        shortName: 'Chathamkulam Institutions',
        type: 'Self-Financing',
        universityAffiliation: 'University of Calicut & KTU',
        accreditation: 'AICTE Approved | DTE Kerala',
        establishedYear: 2005,
        city: 'Palakkad',
        district: 'Palakkad',
        state: 'Kerala',
        officialWebsite: 'https://chathamkulaminstitutions.org',
        representativeName: 'Dr. K. Narayanan (Admissions Director)',
        designation: 'Director of Admissions',
        email: 'admissions@chathamkulaminstitutions.org',
        phone: '+91 94470 12389',
        offeredLevels: ['Postgraduate', 'Undergraduate', 'Diploma', 'Distance Education'],
        estimatedIntake: 450,
        meritScholarshipOffered: true,
        notes: 'Primary verified institutional allotment partner on MARGEXA network.',
        status: 'Approved & Listed',
        submittedAt: '02 Jan 2026',
      });
    } else {
      // Mock pending application for newly submitted search
      setTrackedApp({
        id: searchRefId.toUpperCase(),
        collegeName: 'Kerala Institute of Higher Technology',
        shortName: 'KIHT',
        type: 'Self-Financing',
        universityAffiliation: 'KTU & Calicut',
        accreditation: 'AICTE Approved',
        establishedYear: 2012,
        city: 'Kochi',
        district: 'Ernakulam',
        state: 'Kerala',
        officialWebsite: 'https://kiht.ac.in',
        representativeName: 'Registrar Office',
        designation: 'Admissions Desk',
        email: 'registrar@kiht.ac.in',
        phone: '+91 98460 55432',
        offeredLevels: ['Undergraduate', 'Diploma'],
        estimatedIntake: 320,
        meritScholarshipOffered: true,
        notes: 'Awaiting campus physical document audit.',
        status: 'Inspection Scheduled',
        submittedAt: '10 Feb 2026',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0e274c] to-slate-950 text-white p-5 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer z-10"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              Institutional Onboarding
            </div>
            <span className="text-xs text-slate-300">Academic Year 2026-27</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Register & List Your College on MARGEXA
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Join Kerala's premier education consultancy and student matching network. Connect directly with qualified Plus Two, Degree, and Diploma applicants matching your cutoffs.
          </p>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                activeTab === 'apply'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              Apply for Institutional Listing
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                activeTab === 'track'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              Track Existing Application
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-slate-800">
          {/* TAB 1: APPLY FOR REGISTRATION */}
          {activeTab === 'apply' && (
            <>
              {submittedApplication ? (
                /* Success Confirmation State */
                <div className="space-y-6 py-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      Application Submitted Successfully
                    </span>
                    <h3 className="text-2xl font-black text-slate-950 font-heading">
                      Welcome to MARGEXA Institutional Network
                    </h3>
                    <p className="text-sm text-slate-600 max-w-lg mx-auto">
                      Your institutional registration application has been received. Our liaison team in Palakkad will contact your representative within <strong>24 to 48 hours</strong>.
                    </p>
                  </div>

                  {/* Application Summary Card */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-lg mx-auto text-left space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs text-slate-500 font-medium">Application Reference ID:</span>
                      <strong className="text-sm font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        {submittedApplication.id}
                      </strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400">College:</span>
                        <div className="font-bold text-slate-900">{submittedApplication.collegeName}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Affiliation:</span>
                        <div className="font-bold text-slate-900">{submittedApplication.universityAffiliation}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Location:</span>
                        <div className="font-semibold text-slate-800">{submittedApplication.city}, {submittedApplication.district}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Representative:</span>
                        <div className="font-semibold text-slate-800">{submittedApplication.representativeName}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Current Status: <strong>{submittedApplication.status}</strong> (Preliminary audit in progress)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSubmittedApplication(null);
                        onClose();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                    >
                      Return to Portal
                    </button>
                    <button
                      onClick={() => {
                        setSearchRefId(submittedApplication.id);
                        setActiveTab('track');
                        setTrackedApp(submittedApplication);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition cursor-pointer"
                    >
                      View Live Tracker
                    </button>
                  </div>
                </div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Notice banner */}
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3 text-xs text-indigo-900">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Free Institutional Listing for Accredited Kerala Institutions</strong>
                      <p className="text-indigo-700 text-[11px] mt-0.5">
                        Colleges listed on MARGEXA receive targeted student inquiries filtered by entrance scores, qualification, and budget, eliminating junk leads.
                      </p>
                    </div>
                  </div>

                  {/* Section 1: Institution Details */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-indigo-600" />
                      1. Institution Profile & Recognition
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full College / Institution Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          placeholder="e.g. Chathamkulam Group of Institutions, Palakkad"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Short / Display Name
                        </label>
                        <input
                          type="text"
                          value={shortName}
                          onChange={(e) => setShortName(e.target.value)}
                          placeholder="e.g. Chathamkulam Institutions"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Institution Type
                        </label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value as any)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                          <option value="Self-Financing">Self-Financing College</option>
                          <option value="Private Autonomous">Private Autonomous College</option>
                          <option value="Government Aided">Government Aided Institution</option>
                          <option value="Deemed University">Deemed University / University Campus</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          University Affiliation <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={universityAffiliation}
                          onChange={(e) => setUniversityAffiliation(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                          {affiliations.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Accreditation & Approvals
                        </label>
                        <input
                          type="text"
                          value={accreditation}
                          onChange={(e) => setAccreditation(e.target.value)}
                          placeholder="e.g. AICTE Approved | NAAC A | DTE Kerala"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Year Established
                        </label>
                        <input
                          type="number"
                          value={establishedYear}
                          onChange={(e) => setEstablishedYear(Number(e.target.value))}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Official Website
                        </label>
                        <input
                          type="text"
                          value={officialWebsite}
                          onChange={(e) => setOfficialWebsite(e.target.value)}
                          placeholder="https://collegename.edu.in"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Campus Location & Representative */}
                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      2. Campus Location & Authorized Liaison
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Campus City / Town <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Palakkad / Kanjikode"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          District <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                          {districts.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Authorized Officer / Principal Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={representativeName}
                          onChange={(e) => setRepresentativeName(e.target.value)}
                          placeholder="e.g. Dr. Ramesh Menon"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Designation
                        </label>
                        <input
                          type="text"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="Principal / Admissions Director"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Official Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admissions@college.edu.in"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Direct Contact Phone / Mobile <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 94470 12389"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Academic Offerings to List */}
                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      3. Courses Offered & Admissions Capacity
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Select Academic Levels to List on MARGEXA
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'Polytechnic Diploma', label: 'Polytechnic Diploma' },
                          { id: 'Undergraduate', label: "Bachelor's Degree (UG)" },
                          { id: 'Postgraduate', label: "Master's / MBA (PG)" },
                          { id: 'Distance Education', label: 'Distance / Hybrid' },
                        ].map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => toggleLevel(item.id)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${
                              offeredLevels.includes(item.id)
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {offeredLevels.includes(item.id) ? '✓ ' : '+ '}
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Total Annual Student Intake Capacity
                        </label>
                        <input
                          type="number"
                          value={estimatedIntake}
                          onChange={(e) => setEstimatedIntake(Number(e.target.value))}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer mt-4">
                          <input
                            type="checkbox"
                            checked={meritScholarshipOffered}
                            onChange={(e) => setMeritScholarshipOffered(e.target.checked)}
                            className="w-4 h-4 accent-indigo-600 rounded-sm"
                          />
                          <span>Willing to offer merit fee waivers for high-performing MARGEXA students</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Special Instructions or Preferred Courses
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="List any specific flagship programs (e.g. MBA Logistics, Mechanical Diploma, BCA) or seat quotas..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Submission Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit College Registration Application</span>
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* TAB 2: TRACK STATUS */}
          {activeTab === 'track' && (
            <div className="space-y-6">
              <form onSubmit={handleTrackSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchRefId}
                  onChange={(e) => setSearchRefId(e.target.value)}
                  placeholder="Enter Reference ID (e.g. MARGEXA-COL-8942)"
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Status</span>
                </button>
              </form>

              {trackedApp ? (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 uppercase">Ref ID: {trackedApp.id}</span>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">{trackedApp.collegeName}</h4>
                      <p className="text-xs text-slate-500">{trackedApp.city}, {trackedApp.district} • Affiliated to {trackedApp.universityAffiliation}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 self-start sm:self-center ${
                        trackedApp.status === 'Approved & Listed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : trackedApp.status === 'Inspection Scheduled'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {trackedApp.status}
                    </span>
                  </div>

                  {/* 4-Step Institutional Verification Timeline */}
                  <div className="space-y-2 pt-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Onboarding Audit Stages:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                        <div className="font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          1. Application
                        </div>
                        <p className="text-[10px] text-emerald-700 mt-1">Submitted on {trackedApp.submittedAt}</p>
                      </div>

                      <div
                        className={`p-3 rounded-xl border ${
                          trackedApp.status !== 'Pending Review'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1">
                          {trackedApp.status !== 'Pending Review' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                          )}
                          2. AICTE/UGC Check
                        </div>
                        <p className="text-[10px] mt-1">Affiliation & Recognition</p>
                      </div>

                      <div
                        className={`p-3 rounded-xl border ${
                          trackedApp.status === 'Approved & Listed'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : trackedApp.status === 'Inspection Scheduled'
                            ? 'bg-blue-50 border-blue-200 text-blue-900'
                            : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1">
                          {trackedApp.status === 'Approved & Listed' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                          )}
                          3. MoA & Quotas
                        </div>
                        <p className="text-[10px] mt-1">Seat allocation agreement</p>
                      </div>

                      <div
                        className={`p-3 rounded-xl border ${
                          trackedApp.status === 'Approved & Listed'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1">
                          {trackedApp.status === 'Approved & Listed' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Building className="w-3.5 h-3.5" />
                          )}
                          4. Live on MARGEXA
                        </div>
                        <p className="text-[10px] mt-1">Matchmaker integration</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 pt-2 flex items-center justify-between">
                    <span>Officer in Charge: Dr. K. Narayanan (+91 94470 12389)</span>
                    <button
                      onClick={() => {
                        setTrackedApp(null);
                        setSearchRefId('');
                      }}
                      className="text-indigo-600 hover:underline font-semibold cursor-pointer"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs">
                  Enter your Application Reference ID above to monitor the verification and listing status.
                  <div className="mt-2 text-indigo-600 font-medium">
                    Tip: Try searching <strong>MARGEXA-COL-8942</strong> to view a sample verified institution.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-1.5">
            <MargexaLogo size="sm" showTagline={false} />
            <span className="hidden sm:inline">• Institutional Relations Directorate</span>
          </div>
          <span>Palakkad Liaison Office: <strong>+91 94470 12389</strong></span>
        </div>
      </div>
    </div>
  );
};
