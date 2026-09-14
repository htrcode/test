import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Award,
  Building,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Mail,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'general' | 'chathamkulam' | 'scholarships' | 'distance' | 'partners';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'chathamkulam',
    question: 'Can I join B.Tech 2nd year directly after a Polytechnic Diploma at Chathamkulam?',
    answer:
      'Yes! AICTE and the Directorate of Technical Education (DTE Kerala) provide a direct Lateral Entry pathway. Diploma graduates who complete their 3-year diploma in Computer, Mechanical, or Civil Engineering from Chathamkulam Polytechnic College can take the Kerala Lateral Entry Test (LET) and gain direct admission into the 2nd year (3rd semester) of B.Tech across all KTU-affiliated government and private engineering colleges in Kerala. Plus Two Science (PCM) students can also join directly into the 2nd year of the diploma.',
  },
  {
    id: 'faq-2',
    category: 'scholarships',
    question: 'How do I qualify for Chathamkulam Institutional Merit Fee Waivers?',
    answer:
      'Merit fee waivers are awarded automatically based on your qualifying examination score:\n• Super Merit (90%+ marks): Flat 50% Tuition Fee Waiver across all semesters (e.g. CBS MBA tuition reduces from ₹1,20,000 to ₹60,000/yr; Polytechnic reduces to ₹19,000/yr).\n• Distinction Merit (80% - 89% marks): 40% Tuition Fee Waiver.\n• First Class Merit (75% - 79% marks): 25% Tuition Fee Waiver.\n• Women in Higher Ed Grant: Additional ₹10,000 annual concession for single girl children.\nYou can lock in your scholarship instantly via MARGEXA by submitting your application.',
  },
  {
    id: 'faq-3',
    category: 'distance',
    question: 'Are Distance Education degrees valid for Kerala PSC, UPSC, and government examinations?',
    answer:
      'Yes, absolutely! Degrees awarded through Open & Distance Learning (ODL) from UGC-DEB recognized universities (such as Sree Narayanaguru Open University - SGOU Kerala, and Calicut University School of Distance Education) are legally recognized as equivalent to regular degrees by the Government of Kerala and the Kerala Public Service Commission (KPSC) under Government Order G.O.(P) No. 44/2019/H.Edn. They are fully eligible for Kerala Administrative Service (KAS), Secretariat Assistant, Bank PO, and UPSC Civil Services.',
  },
  {
    id: 'faq-4',
    category: 'partners',
    question: 'How does the MARGEXA Partner Network work for Career Guidance Centers and Consultancies?',
    answer:
      'Educational consultancies, coaching centers, and individual career advisors can enroll as certified MARGEXA partners. Partners receive authorized admission quotas, white-label counseling tools, priority document processing, and direct per-admission commissions:\n• Silver Counselor: Direct admission commission of ₹5,000 per student.\n• Gold Certified Center: Monthly subscription of ₹19,999/mo with ₹10,000 commission per admission.\n• Platinum Master Franchise: Monthly subscription of ₹49,999/mo with ₹15,000 commission per admission and exclusive district territorial rights.',
  },
  {
    id: 'faq-5',
    category: 'partners',
    question: 'Are consultancy partnership plans billed monthly or yearly?',
    answer:
      'All MARGEXA partner plans are billed on a MONTHLY basis, not yearly! This ensures maximum flexibility for your career guidance academy without burdensome multi-year contracts or large upfront capital locks. You can upgrade, pause, or renew your partnership on a month-to-month schedule.',
  },
  {
    id: 'faq-6',
    category: 'general',
    question: 'Is MARGEXA free for students, or are there hidden admission charges?',
    answer:
      'MARGEXA is 100% FREE for students and parents! You can take our AI compatibility assessment, compare course fees, check scholarship eligibility, apply for institutional seats, and download your verified Provisional Offer Letter without paying a single rupee. All tuition fees and hostel deposits are paid directly to the respective college accounts.',
  },
  {
    id: 'faq-vip-mentorship',
    category: 'general',
    question: 'Can students take 1-on-1 VIP Mentorship, and what is the fee?',
    answer:
      'Yes! Students can take a 1-on-1 VIP Academic Mentorship session for just ₹349 (special student rate, 65% off regular ₹999). This includes a private 30-minute live video session with veteran academic deans, KTU/Calicut University advisors, and corporate recruiters. Your mentor analyzes your academic marks, guides you through college shortlisting, checks your Chathamkulam merit scholarship eligibility, and delivers a customized admission roadmap.',
  },
  {
    id: 'faq-7',
    category: 'chathamkulam',
    question: 'What specializations are available at Chathamkulam Business School (CBS) for MBA?',
    answer:
      'Chathamkulam Business School (Palakkad), approved by AICTE and affiliated with the University of Calicut, offers dual specializations in high-demand fields: Logistics & Supply Chain Management, Finance, Marketing, Human Resource Management, and Business Analytics/Systems. CBS has strong corporate placement tie-ups across Ernakulam, Bengaluru, and the UAE, with an average placement package of ₹4.8 LPA to ₹8.5 LPA.',
  },
  {
    id: 'faq-8',
    category: 'chathamkulam',
    question: 'What are the hostel, dining, and transportation facilities at Chathamkulam Knowledge City?',
    answer:
      'Chathamkulam Knowledge City provides modern on-campus amenities:\n• Separate, secure hostel blocks for boys and girls with 24/7 security and warden oversight.\n• Hygienic Kerala & multi-cuisine cafeteria providing nutritious vegetarian and non-vegetarian meals.\n• College bus network connecting major railway stations and towns across Palakkad, Kozhinjampara, Chittur, Alathur, and Coimbatore border.\n• High-speed Wi-Fi, computer labs, library, and sports grounds.',
  },
  {
    id: 'faq-9',
    category: 'general',
    question: 'How quickly will I receive my Provisional Allotment Offer Letter?',
    answer:
      'When you apply through MARGEXA, our direct institutional integration verifies your eligibility and generates your official Provisional Allotment Letter within 10 minutes. The letter contains your locked tuition fee, merit scholarship code, and date for physical certificate submission at the campus.',
  },
  {
    id: 'faq-10',
    category: 'general',
    question: 'How can I get in touch with MARGEXA support if I need admission help?',
    answer:
      'You can reach our dedicated central support desk anytime by emailing support@margexa.com or submitting a message via our Contact Us desk. Our admissions officers review and respond promptly to all queries.',
  },
];

interface FAQViewProps {
  onNavigateToMatchmaker: () => void;
  onNavigateToContact: () => void;
  onNavigateToPartners: () => void;
}

export const FAQView: React.FC<FAQViewProps> = ({
  onNavigateToMatchmaker,
  onNavigateToContact,
  onNavigateToPartners,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? '' : id);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span>Knowledge Base & Answers</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-950">
          Frequently Asked Questions
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Clear, authentic answers regarding Chathamkulam Group of Institutions, merit fee waivers, Kerala PSC degree validity, and our monthly partner consultancy plans.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords: LET, MBA, scholarship, hostel, monthly plan, PSC..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-xs sm:text-sm text-slate-900"
          />
        </div>
      </section>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'chathamkulam', label: 'Chathamkulam Campus' },
          { id: 'scholarships', label: 'Merit Grants & Waivers' },
          { id: 'distance', label: 'Distance vs Regular (PSC)' },
          { id: 'partners', label: 'Consultancy Partner Plans' },
          { id: 'general', label: 'General & Support' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
            <p className="text-xs text-slate-500">No questions matched your search query "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition cursor-pointer"
                >
                  <div className="font-bold text-sm sm:text-base text-slate-900 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 bg-slate-50/40">
                    {faq.answer.split('\n').map((line, lIdx) => (
                      <p key={lIdx} className={line.startsWith('•') ? 'pl-2 text-slate-800' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50/40 rounded-3xl border border-indigo-200 p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-600/20">
          <Mail className="w-6 h-6 text-amber-300" />
        </div>
        <div className="space-y-1 max-w-md mx-auto">
          <h3 className="text-xl font-bold font-heading text-slate-950">
            Still Have an Unanswered Question?
          </h3>
          <p className="text-xs text-slate-600">
            Write directly to our senior academic help desk at <strong className="text-indigo-700">support@margexa.com</strong> or speak with an admissions officer.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateToContact}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open Contact Us Desk</span>
          </button>

          <a
            href="mailto:support@margexa.com"
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            <span>Email support@margexa.com</span>
          </a>
        </div>
      </section>
    </div>
  );
};
