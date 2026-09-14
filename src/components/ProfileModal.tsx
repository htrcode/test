import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { QualificationType, StudyMode } from '../types';
import {
  X,
  User,
  GraduationCap,
  Percent,
  IndianRupee,
  Compass,
  MapPin,
  Building,
  Save,
  CheckCircle2
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { student, updateProfile, isProfileModalOpen, setIsProfileModalOpen } = useAuth();

  const [formData, setFormData] = useState({
    name: student.name,
    phone: student.phone,
    qualification: student.qualification,
    stream: student.stream,
    percentage: student.percentage,
    budget: student.budget,
    preferredMode: student.preferredMode,
    interest: student.interest,
    preferredDistrict: student.preferredDistrict,
    entranceExam: student.entranceExam,
  });

  const [savedToast, setSavedToast] = useState(false);

  if (!isProfileModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      setIsProfileModalOpen(false);
    }, 600);
  };

  const qualifications: QualificationType[] = [
    '10th Standard',
    '12th / Higher Secondary (Plus Two)',
    'Polytechnic Diploma',
    'Undergraduate Degree (UG)',
    'Postgraduate Degree (PG)',
  ];

  const studyModes: StudyMode[] = ['Offline', 'Distance', 'Hybrid'];

  const districts = [
    'Palakkad',
    'Ernakulam',
    'Kozhikode',
    'Kollam',
    'Malappuram',
    'Thiruvananthapuram',
    'Thrissur',
    'All Kerala',
  ];

  const interests = [
    'Management & Business',
    'Computer Science & IT',
    'Engineering & Polytechnic',
    'Commerce & Banking',
    'Arts, Media & Humanities',
    'All Disciplines',
  ];

  const budgetPresets = [
    { label: 'Under ₹50k (Govt / SDE)', value: 45000 },
    { label: '₹50k - ₹1.5L (Aided & Private)', value: 120000 },
    { label: '₹1.5L - ₹2.5L (Professional)', value: 200000 },
    { label: '₹2.5L+ (Premier MBA/B.Tech)', value: 300000 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                Your Academic & Preference Profile
              </h3>
              <p className="text-xs text-indigo-200">
                Updating your profile automatically recalculates college compatibility & scholarship chances.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-left flex-1">
          {savedToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Profile updated successfully! Recalculating AI college matches...
            </div>
          )}

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Real Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98471 23456"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Academic Qualifications & Marks */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Past Qualification & Academic Standing
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Highest Completed Qualification
                </label>
                <select
                  value={formData.qualification}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      qualification: e.target.value as QualificationType,
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  {qualifications.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Major Stream / Subjects
                </label>
                <input
                  type="text"
                  value={formData.stream}
                  onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                  placeholder="e.g. Commerce with Computer, Science PCM"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Percentage Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-indigo-600" />
                  Aggregate Score / Percentage
                </label>
                <span className="text-sm font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  {formData.percentage}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="1"
                value={formData.percentage}
                onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Pass (40%)</span>
                <span>First Class (60%)</span>
                <span>Distinction (75%)</span>
                <span>High Merit (90%+)</span>
              </div>
            </div>
          </div>

          {/* Budget & Mode Preferences */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              Budget for Studies & Preferred Mode
            </h4>

            {/* Annual Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Target Annual Course Fee Budget
                </label>
                <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  ₹{formData.budget.toLocaleString('en-IN')} / year
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="350000"
                step="5000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              {/* Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2">
                {budgetPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget: preset.value })}
                    className={`px-2 py-1 text-[11px] rounded-lg border text-center transition font-medium ${
                      formData.budget === preset.value
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Study Mode Radio Pills */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Preferred Mode of Learning
              </label>
              <div className="grid grid-cols-3 gap-2">
                {studyModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredMode: mode })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition ${
                      formData.preferredMode === mode
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="capitalize">{mode}</span>
                    <span
                      className={`text-[9px] font-normal ${
                        formData.preferredMode === mode ? 'text-indigo-100' : 'text-slate-400'
                      }`}
                    >
                      {mode === 'Offline'
                        ? 'Regular Campus'
                        : mode === 'Distance'
                        ? 'Self-Paced / Online'
                        : 'Blended Schedule'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interests & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                Target Academic Discipline
              </label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                {interests.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                Preferred Campus District (Kerala)
              </label>
              <select
                value={formData.preferredDistrict}
                onChange={(e) => setFormData({ ...formData, preferredDistrict: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Entrance Exam */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-indigo-600" />
              Entrance Exam Appearance (Optional)
            </label>
            <input
              type="text"
              value={formData.entranceExam}
              onChange={(e) => setFormData({ ...formData, entranceExam: e.target.value })}
              placeholder="e.g. KEAM Rank, KMAT Kerala, CMAT, or Direct Board Merit"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Footer Save */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Profile & Update Matches
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
