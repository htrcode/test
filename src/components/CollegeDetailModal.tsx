import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { College, Program } from '../types';
import {
  X,
  MapPin,
  ExternalLink,
  PhoneCall,
  Download,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Building,
  Award,
  BookOpen,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  Zap,
  Users,
  Wifi,
  Bus,
  Coffee,
  FileText
} from 'lucide-react';

interface CollegeDetailModalProps {
  college: College | null;
  onClose: () => void;
  onOpenAICounselor: (context?: { college: string; program: string }) => void;
}

export const CollegeDetailModal: React.FC<CollegeDetailModalProps> = ({
  college,
  onClose,
  onOpenAICounselor,
}) => {
  const { applyToProgram, applications } = useAuth();

  // Tab State inside modal
  const [activeTab, setActiveTab] = useState<'programs' | 'overview' | 'gallery' | 'scholarships'>('programs');
  const [programFilter, setProgramFilter] = useState<'All' | 'Diploma' | 'Undergraduate' | 'Postgraduate'>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [brochureDownloaded, setBrochureDownloaded] = useState<boolean>(false);

  if (!college) return null;

  // Build photo gallery fallback array
  const gallery = (college.galleryImages && college.galleryImages.length > 0)
    ? college.galleryImages
    : [
        college.heroImage,
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      ];

  const photoLabels = [
    'Campus Main Building & Entrance',
    'Smart Classrooms & Lecture Theatres',
    'Advanced Computer & Tech Laboratories',
    'Central Digital Library & Research Center',
    'Engineering & Applied Science Workshops',
    'Student Hostels & Recreational Facilities',
  ];

  const isApplied = (programId: string) => {
    return applications.some(
      (app) => app.collegeId === college.id && app.programId === programId
    );
  };

  const handleApply = (program: Program) => {
    applyToProgram(college, program);
    setToastMessage(`Application submitted for ${program.name}! Check your Applications tab.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadBrochure = () => {
    setBrochureDownloaded(true);
    setToastMessage(`Downloading official prospectus & fee structure for ${college.shortName}...`);
    setTimeout(() => {
      setToastMessage(null);
      setBrochureDownloaded(false);
    }, 3000);
  };

  const filteredPrograms = college.programs.filter((p) => {
    if (programFilter === 'All') return true;
    return p.level === programFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-60 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold border border-slate-700 animate-slideDown">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header & Hero */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-7 shrink-0">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer z-20"
            title="Close College Details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pr-10 md:pr-0">
            {/* College Identity */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shrink-0 shadow-md border border-white/20 overflow-hidden flex items-center justify-center">
                <img
                  src={college.logo}
                  alt={college.name}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    {college.type}
                  </span>
                  <span className="text-xs text-slate-300">
                    Est. {college.established}
                  </span>
                  <span className="text-slate-500">•</span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{college.rating}</span>
                    <span className="text-slate-400 font-normal">({college.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight">
                  {college.name}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1 text-indigo-300">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    {college.location.city}, {college.location.district}, {college.location.state}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-300 font-medium">
                    {college.accreditation}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <a
                  href={college.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official Website</span>
                </a>

                <button
                  onClick={handleDownloadBrochure}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Brochure</span>
                </button>
              </div>

              <a
                href="tel:+919447012389"
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-medium transition flex items-center gap-1.5 border border-white/10"
              >
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                <span>Admissions Desk: +91 94470 12389</span>
              </a>
            </div>
          </div>

          {/* Special Chathamkulam Spotlight Banner if applicable */}
          {college.chathamkulamFlag && (
            <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-600/30 to-emerald-500/20 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0">
                  ★
                </div>
                <div>
                  <span className="font-bold text-amber-300">Featured Partner: Chathamkulam Group of Institutions</span>
                  <p className="text-slate-300 text-[11px]">
                    Guaranteed merit quota, AICTE-approved MBA, BBA, B.Com, BCA, and 3-Year Polytechnic Engineering Diplomas with up to 50% tuition waiver!
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenAICounselor({ college: college.name, program: 'Chathamkulam Admissions & Merit Waiver' })}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] whitespace-nowrap transition cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Sparkles className="w-3 h-3" />
                <span>Calculate My Fee Waiver</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-7 py-2.5 flex items-center justify-between overflow-x-auto gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'programs'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Programs & Admissions ({college.programs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Campus Photos & Facilities ({gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>About Institution & Faculty</span>
            </button>

            <button
              onClick={() => setActiveTab('scholarships')}
              className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'scholarships'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Scholarships & Aid</span>
            </button>
          </div>

          <button
            onClick={() => onOpenAICounselor({ college: college.name, program: 'General Counseling' })}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Review</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* TAB 1: PROGRAMS & ADMISSIONS */}
          {activeTab === 'programs' && (
            <div className="space-y-5">
              {/* Program Level Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
                  <span className="text-slate-500 mr-1 hidden sm:inline">Filter:</span>
                  {(['All', 'Diploma', 'Undergraduate', 'Postgraduate'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setProgramFilter(lvl)}
                      className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                        programFilter === lvl
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                      }`}
                    >
                      {lvl === 'All' ? 'All Courses' : lvl === 'Diploma' ? 'Polytechnic Diploma' : lvl === 'Undergraduate' ? "Bachelor's (UG)" : "Master's (PG)"}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Free Application Processing via MARGEXA</span>
                </div>
              </div>

              {/* Course Cards Grid */}
              <div className="space-y-4">
                {filteredPrograms.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl">
                    No programs found for the selected level filter.
                  </div>
                ) : (
                  filteredPrograms.map((program) => {
                    const applied = isApplied(program.id);

                    return (
                      <div
                        key={program.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 tracking-wider">
                              {program.level}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-50 text-blue-700">
                              {program.mode}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">{program.duration}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-600 font-medium">{program.seats} Total Seats</span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-950 font-heading">
                            {program.name}
                          </h3>

                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700">
                            <strong>Minimum Eligibility:</strong> {program.eligibility} (Min. aggregate {program.minPercentage}%)
                          </div>

                          {/* Highlights pills */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {program.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 text-[11px] bg-indigo-50 text-indigo-700 rounded-md font-medium"
                              >
                                ✓ {h}
                              </span>
                            ))}
                          </div>

                          {/* Career prospects */}
                          {program.careerProspects && program.careerProspects.length > 0 && (
                            <div className="text-[11px] text-slate-500 pt-1">
                              <strong>Career Roles:</strong> {program.careerProspects.join(', ')}
                            </div>
                          )}
                        </div>

                        {/* Fee Breakdown and CTA */}
                        <div className="md:text-right shrink-0 space-y-3 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-5 md:w-56">
                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Standard Tuition Fee</div>
                            <div className="text-2xl font-black text-slate-900 flex md:justify-end items-center font-heading">
                              <IndianRupee className="w-4 h-4 text-slate-700" />
                              {program.annualFee.toLocaleString('en-IN')}
                              <span className="text-xs text-slate-500 font-normal ml-1">/year</span>
                            </div>
                            <div className="text-[11px] text-emerald-600 font-medium">
                              Merit waivers applicable
                            </div>
                          </div>

                          {applied ? (
                            <div className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Application Active
                            </div>
                          ) : (
                            <button
                              onClick={() => handleApply(program)}
                              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>One-Click Free Apply</span>
                            </button>
                          )}

                          <button
                            onClick={() => onOpenAICounselor({ college: college.name, program: program.name })}
                            className="w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            <span>Check Fit & Cutoff</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CAMPUS PHOTOS & GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Main Active Photo Viewer */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-video max-h-[420px] shadow-lg border border-slate-200 group">
                <img
                  src={gallery[selectedPhotoIndex]}
                  alt={`${college.name} - ${photoLabels[selectedPhotoIndex] || 'Campus Facility'}`}
                  className="w-full h-full object-cover transition duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 flex flex-col justify-between p-4 sm:p-6 text-white pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold tracking-wide uppercase border border-white/20">
                      {photoLabels[selectedPhotoIndex] || 'Campus Infrastructure'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono">
                      {selectedPhotoIndex + 1} / {gallery.length} Photos
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold font-heading text-white">
                      {photoLabels[selectedPhotoIndex] || 'Campus Infrastructure & Learning Spaces'}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {college.name} • {college.location.city}, {college.location.district}
                    </p>
                  </div>
                </div>

                {/* Left/Right Controls */}
                <button
                  onClick={() => setSelectedPhotoIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition cursor-pointer z-10"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setSelectedPhotoIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition cursor-pointer z-10"
                  title="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbnails Row */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Campus Photo Gallery ({gallery.length} Views)
                  </h4>
                  <span className="text-[11px] text-indigo-600 font-semibold">
                    Click any thumbnail to preview
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative rounded-xl overflow-hidden aspect-video border-2 transition cursor-pointer group ${
                        selectedPhotoIndex === idx
                          ? 'border-indigo-600 ring-2 ring-indigo-500/30 shadow-md scale-105'
                          : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-[9px] text-white p-0.5 text-center truncate">
                        {idx === 0 ? 'Campus' : idx === 1 ? 'Classrooms' : idx === 2 ? 'Labs' : idx === 3 ? 'Library' : idx === 4 ? 'Workshop' : 'Hostels'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Campus Amenities Showcase */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Campus Facilities & Student Life
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                    <Wifi className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>High-Speed Wi-Fi</strong>
                      <p className="text-[11px] text-slate-500">Campus-wide fiber optic network across academic & hostel blocks.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                    <Coffee className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Separate Hostels & Mess</strong>
                      <p className="text-[11px] text-slate-500">Nutritious Kerala & North Indian meals with 24/7 security.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                    <Bus className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Campus Transportation</strong>
                      <p className="text-[11px] text-slate-500">Fleet of college buses covering Palakkad, Ottapalam & town centers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Digital & Reference Library</strong>
                      <p className="text-[11px] text-slate-500">Over 25,000+ volumes, IEEE e-journals & DELNET subscriptions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                    <Building className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>High-Tech Laboratories</strong>
                      <p className="text-[11px] text-slate-500">Modern mechanical, civil, computer & electronics lab machinery.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                    <Users className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Active Placement Cell</strong>
                      <p className="text-[11px] text-slate-500">Pre-placement grooming, soft-skills training and campus drives.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OVERVIEW & FACULTY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Institutional Background & Vision
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {college.description}
                </p>
              </div>

              {/* Tagline Box */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-950 font-heading">Mission Statement</div>
                  <p className="text-xs text-indigo-800 italic">"{college.tagline}"</p>
                </div>
              </div>

              {/* Accreditations & Key Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Institutional Strengths
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {college.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distance Education Info if supported */}
              {college.distanceEducationAvailable && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-blue-900 font-heading">
                      Distance Education & Working Professional Support
                    </h5>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      This institution supports approved distance learning, weekend classes, and hybrid modes with UGC recognition. Ideal for employed students and candidates seeking flexible study pacing.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SCHOLARSHIPS & AID */}
          {activeTab === 'scholarships' && (
            <div className="space-y-5">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-50/40 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-900">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h4 className="text-sm font-bold font-heading">
                    {college.name} Merit & Concession Programs
                  </h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  MARGEXA applicants enjoy direct institutional fee concessions evaluated automatically upon score verification:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase text-amber-600">Tier 1: High Distinction</div>
                    <div className="text-xl font-extrabold text-slate-900">50% Waiver</div>
                    <p className="text-[11px] text-slate-500">Students with 90%+ in Plus Two or Degree exams.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase text-amber-600">Tier 2: Merit Quota</div>
                    <div className="text-xl font-extrabold text-slate-900">40% Waiver</div>
                    <p className="text-[11px] text-slate-500">Students with 80% - 89.9% in relevant entrance or qualifying boards.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase text-amber-600">Special Category</div>
                    <div className="text-xl font-extrabold text-slate-900">₹10,000 Off</div>
                    <p className="text-[11px] text-slate-500">Girl students, sports distinction holders & rural outreach wards.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenAICounselor({ college: college.name, program: 'Scholarship Eligibility Calculation' })}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Calculate My Specific Waiver with AI Advisor</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 sm:px-7 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Admissions Desk: <strong>+91 94470 12389</strong> (Palakkad & Kochi)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                setActiveTab('programs');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              View All {college.programs.length} Programs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
