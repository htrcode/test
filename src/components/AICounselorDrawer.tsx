import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';
import { MargexaIcon } from './MargexaLogo';
import { Send, Sparkles, X, User, RefreshCw, HelpCircle, ShieldCheck } from 'lucide-react';
import { generateDomainExpertReply } from '../data/advisorKnowledge';

interface AICounselorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: { college: string; program: string } | null;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AICounselorDrawer: React.FC<AICounselorDrawerProps> = ({
  isOpen,
  onClose,
  initialContext,
}) => {
  const { student } = useAuth();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen) {
      if (initialContext) {
        const welcomeText = `Namaskaram **${student.name}**! I see you're evaluating **${initialContext.program}** at **${initialContext.college}**.

With your academic score of **${student.percentage}%** and budget of **₹${student.budget.toLocaleString('en-IN')}/yr**, you have solid admission eligibility and qualify for institutional fee waivers.

How can I help you with this program? (e.g. syllabus, placement track record, hostel facilities, or fee concessions)`;
        setMessages([
          {
            id: 'init-ctx',
            sender: 'assistant',
            text: welcomeText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else if (messages.length === 0) {
        const defaultText = `Namaskaram **${student.name}**! Welcome to **MARGEXA AI Academic Advisory**.

I am trained on official Kerala higher education admissions, cutoffs, syllabus structures, and our flagship partner **Chathamkulam Group of Institutions (Palakkad)**.

Based on your profile:
* **Academic Score:** ${student.percentage}% (${student.qualification})
* **Annual Budget:** ₹${student.budget.toLocaleString('en-IN')}/year
* **Study Mode:** ${student.preferredMode}
* **Merit Waiver Eligibility:** **Up to 40% Tuition Fee Waiver**

How can I guide your admission journey today?`;
        setMessages([
          {
            id: 'init-default',
            sender: 'assistant',
            text: defaultText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    }
  }, [isOpen, initialContext, student]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const sendMessage = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userPrompt,
          query: userPrompt,
          profile: student,
          studentProfile: student,
          currentCollegeContext: initialContext,
        }),
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'Thank you for your inquiry. Please connect with our admissions desk at +91 94470 12389.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const richReply = generateDomainExpertReply(userPrompt, student);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: richReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Tell me about the ₹349/month VIP Mentorship plan',
    'Which Kerala state scholarships and E-Grantz schemes can I apply for?',
    'Tell me about Chathamkulam Business School MBA options',
    'Can I join B.Tech 2nd year after polytechnic diploma (LET)?',
    'Distance vs Regular Degree: which is valid for Kerala PSC?',
    'BCA vs B.Tech: Which is better for software jobs?',
    'What are the hostel, food, and bus facilities at Chathamkulam?',
    'What courses fit my exact budget and marks?',
    'How can Career Guidance Centers partner with MARGEXA?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header with Official Logo Icon */}
        <div className="bg-[#0b2447] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center text-white shadow-xs border border-white/15">
              <MargexaIcon className="w-full h-full" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold font-heading text-white">
                  MARGEXA AI Counselor
                </h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                </span>
              </div>
              <p className="text-[11px] text-teal-200/90 font-medium">
                Grounded Kerala & Chathamkulam Admissions Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="Close Counselor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Context Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-700 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>
              Candidate: <strong className="text-slate-900">{student.name}</strong> ({student.percentage}%)
            </span>
          </div>
          <div className="text-slate-500">
            Budget: ₹{(student.budget / 1000).toFixed(0)}k/yr • {student.preferredMode}
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-left">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#0b2447] text-white flex items-center justify-center shrink-0 mt-0.5 p-1">
                  <MargexaIcon className="w-full h-full" />
                </div>
              )}

              <div
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0b2447] text-white rounded-tr-xs shadow-xs'
                    : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-2xs'
                }`}
              >
                {msg.sender === 'user' ? (
                  <div className="font-normal whitespace-pre-wrap">{msg.text}</div>
                ) : (
                  <div className="prose-xs space-y-2 text-slate-800 leading-relaxed [&>h3]:text-sm [&>h3]:font-bold [&>h3]:text-[#0b2447] [&>h3]:mt-2 [&>h3]:mb-1 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1 [&>p]:mb-2 [&>strong]:text-slate-900 [&>strong]:font-semibold">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                )}
                <div
                  className={`text-[9px] mt-2 text-right ${
                    msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  {student.name.charAt(0)}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center text-xs text-slate-600">
              <div className="w-7 h-7 rounded-lg bg-[#0b2447] text-white flex items-center justify-center shrink-0 p-1">
                <MargexaIcon className="w-full h-full" />
              </div>
              <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                <span>AI Counselor is analyzing Chathamkulam & Kerala admission records...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Inquiries */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-teal-600" />
              Suggested Inquiries:
            </span>
            <span className="text-[10px] text-slate-400">Click to ask</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                disabled={loading}
                className="text-[11px] bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 hover:border-teal-300 px-2.5 py-1 rounded-lg transition text-left cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about colleges, cutoffs, Kerala scholarships, MBA..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0b2447] focus:bg-white transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-[#0b2447] hover:bg-[#19376d] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-teal-300" />
            </button>
          </form>
          <p className="text-[10px] text-slate-400 mt-1.5 text-center">
            Admissions Hotline: <strong className="text-slate-600">+91 94470 12389</strong> (Palakkad Liaison)
          </p>
        </div>
      </div>
    </div>
  );
};
