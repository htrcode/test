import React, { useState } from 'react';
import {
  Mail,
  PhoneCall,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Building,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';

interface ContactViewProps {
  onOpenAICounselor?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenAICounselor }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Admission & Course Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    name: string;
    email: string;
    subject: string;
    date: string;
  } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const primarySupportMail = 'support@margexa.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(primarySupportMail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedTicket = {
        ticketId: `MGX-TICK-${Math.floor(10000 + Math.random() * 90000)}`,
        name,
        email,
        subject,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setSubmittedTicket(generatedTicket);
      setIsSubmitting(false);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Top Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#0b2447] to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <LifeBuoy className="w-3.5 h-3.5 text-emerald-300" />
            <span>24/7 Admissions & Student Support Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            Get in Touch with MARGEXA
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether you are a student exploring collegiate options, a parent reviewing Chathamkulam merit fee concessions, or an educational consultancy seeking partner collaboration, our academic support officers are ready to assist.
          </p>

          {/* Prominent Support Mail Callout */}
          <div className="bg-white/10 p-4 sm:p-5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
                <Mail className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Official Support & Admissions Email
                </span>
                <div className="text-lg sm:text-xl font-black font-mono text-white">
                  {primarySupportMail}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-white/15"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${primarySupportMail}`}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Channels & Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Columns (5 cols): Contact Directory & Offices */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Support Channels */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-5">
            <h3 className="text-lg font-bold font-heading text-slate-950 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span>Direct Support Channels</span>
            </h3>

            <div className="space-y-4 text-xs">
              {/* Email channel */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Primary Support Desk:</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Active
                  </span>
                </div>
                <a
                  href="mailto:support@margexa.com"
                  className="font-mono text-sm font-bold text-indigo-600 hover:text-indigo-700 block transition"
                >
                  support@margexa.com
                </a>
                <p className="text-slate-500 text-[11px]">
                  General inquiries, application verification, and admissions liaison.
                </p>
              </div>

              {/* Alternate institutional mail */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="font-bold text-slate-800">Institutional Admissions Desk:</span>
                <a
                  href="mailto:admissions@margexa.edu.in"
                  className="font-mono text-xs font-bold text-indigo-600 hover:text-indigo-700 block transition"
                >
                  admissions@margexa.edu.in
                </a>
                <p className="text-slate-500 text-[11px]">
                  Chathamkulam Business School & Kerala partner colleges admissions.
                </p>
              </div>
            </div>
          </div>

          {/* Operating Hours Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Clock className="w-4 h-4" />
              <span>Admissions Desk Operational Hours</span>
            </div>
            <div className="text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Monday – Friday:</span>
                <strong className="text-white">9:00 AM – 7:30 PM</strong>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <strong className="text-white">9:30 AM – 5:00 PM</strong>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <strong className="text-amber-400">Online AI Advisor Available 24/7</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Interactive Contact & Ticket Submission Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-1">
                <MessageSquare className="w-3.5 h-3.5" />
                Submit an Official Inquiry
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-950">
                Send a Message to Admissions Support
              </h2>
              <p className="text-xs text-slate-500">
                Inquiries are routed directly to <strong className="text-indigo-600">support@margexa.com</strong> and reviewed by our counselor desk within 2 business hours.
              </p>
            </div>

            {submittedTicket ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-950 font-heading">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1">
                    Your inquiry ticket has been dispatched to <strong>support@margexa.com</strong>.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Ticket Reference ID:</span>
                    <strong className="font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                      {submittedTicket.ticketId}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Sender:</span>
                    <strong className="text-slate-900">{submittedTicket.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Email Address:</span>
                    <strong className="text-slate-900">{submittedTicket.email}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Inquiry Type:</span>
                    <strong className="text-slate-900">{submittedTicket.subject}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Logged At:</span>
                    <strong className="text-slate-700">{submittedTicket.date}</strong>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setSubmittedTicket(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <a
                    href="mailto:support@margexa.com"
                    className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Email support@margexa.com</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Menon / Deepa Nair"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98470 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Inquiry Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
                    >
                      <option value="Admission & Course Inquiry">Admission & Course Inquiry</option>
                      <option value="Chathamkulam Business School (MBA)">Chathamkulam Business School (MBA)</option>
                      <option value="Polytechnic Diploma & Lateral Entry (LET)">Polytechnic Diploma & Lateral Entry (LET)</option>
                      <option value="Kerala Scholarships & Financial Aid">Kerala Scholarships & Financial Aid</option>
                      <option value="Career Guidance Center Partner Network (Monthly Plans)">
                        Career Center Partner Network (Monthly Plans)
                      </option>
                      <option value="Distance Education Degree (PSC Validity)">
                        Distance Education Degree (PSC Validity)
                      </option>
                      <option value="College Institutional Desk Registration">
                        College Institutional Desk Registration
                      </option>
                      <option value="Other Assistance">Other Assistance</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Message / Academic Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your current marks, target degree/diploma, budget preference, or any questions for our counseling team..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your academic data is protected. Routing to support@margexa.com</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending to support@margexa.com...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
