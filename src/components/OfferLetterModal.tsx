import React from 'react';
import { Application } from '../types';
import { MargexaLogo } from './MargexaLogo';
import {
  X,
  Printer,
  GraduationCap,
  Building,
  CheckCircle2,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

interface OfferLetterModalProps {
  application: Application | null;
  onClose: () => void;
}

export const OfferLetterModal: React.FC<OfferLetterModalProps> = ({
  application,
  onClose,
}) => {
  if (!application) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[95vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Provisional Admission Letter</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 sm:p-10 overflow-y-auto text-left space-y-6 bg-white text-slate-800 font-sans printable-offer-letter">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex items-start justify-between">
            <div className="space-y-1">
              <MargexaLogo size="sm" showTagline={true} />
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                Liaison Office: Palakkad & Kochi, Kerala, India • Ref: MARGEXA/ADM/2026/{application.id}
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase rounded-md">
                PROVISIONAL ALLOTMENT
              </span>
              <p className="text-xs text-slate-500 mt-1">Date: {application.appliedDate}</p>
            </div>
          </div>

          {/* Salutation */}
          <div className="space-y-1 text-xs">
            <p className="font-bold text-slate-900">TO CANDIDATE:</p>
            <p className="text-sm font-bold text-slate-900">{application.studentName}</p>
            <p className="text-slate-600">Application Reference ID: <strong className="text-slate-900">{application.id}</strong></p>
            <p className="text-slate-600">Allotment Round: <strong>Regular Phase 1 (Academic Year 2026-2027)</strong></p>
          </div>

          {/* Letter Content */}
          <div className="space-y-3 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
            <p>
              Dear <strong>{application.studentName}</strong>,
            </p>
            <p>
              Congratulations! We are delighted to formally notify you that based upon your verified academic records and MARGEXA qualification scrutiny, you have been provisionally granted an institutional seat in:
            </p>

            {/* Program Allotment Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                    Allotted Program
                  </span>
                  <span className="text-sm font-bold text-indigo-950">
                    {application.programName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                    Admitting College / Institution
                  </span>
                  <span className="text-sm font-bold text-indigo-950">
                    {application.collegeName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                    Approved Study Mode
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    Regular Classroom / Campus Mode
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                    Assigned Senior Counselor
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    {application.counselorAssigned} ({application.counselorContact})
                  </span>
                </div>
              </div>
            </div>

            <p>
              This allotment is recognized under direct institutional intake and scholarship quota. If you are eligible for the <strong>Chathamkulam Institutional Merit Grant</strong> or <strong>Kerala State Scholarship</strong>, the applicable fee waiver of up to 40% will be adjusted during campus reporting.
            </p>

            <div className="space-y-1.5 pt-2">
              <p className="font-bold text-slate-900 text-xs">
                MANDATORY REPORTING & DOCUMENTATION:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px]">
                <li>Original and 2 self-attested copies of 10th / SSLC Marks Certificate</li>
                <li>Plus Two / Higher Secondary / Polytechnic Marks Card and Transfer Certificate (TC)</li>
                <li>Conduct Certificate from last attended institution</li>
                <li>4 recent passport-size photographs</li>
                <li>Valid government photo ID proof (Aadhaar / Voter ID)</li>
              </ul>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="border-t border-slate-200 pt-6 flex items-end justify-between">
            <div className="space-y-1 text-left">
              <div className="w-16 h-16 rounded-full border-2 border-indigo-900/30 flex items-center justify-center text-[9px] font-bold text-indigo-900/60 uppercase tracking-tight text-center leading-tight">
                MARGEXA
                <br />
                VERIFIED
                <br />
                SEAL
              </div>
              <p className="text-[10px] text-slate-400 pt-1">
                Digitally authenticated document
              </p>
            </div>

            <div className="text-right space-y-1">
              <div className="font-serif italic text-base text-slate-900 font-bold">
                Dr. M. K. Narayanan
              </div>
              <div className="text-[11px] font-bold text-slate-800">
                Registrar & Convener of Admissions
              </div>
              <div className="text-[10px] text-slate-500">
                MARGEXA Central Admissions Committee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
