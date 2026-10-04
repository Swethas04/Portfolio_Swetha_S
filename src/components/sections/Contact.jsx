import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { hero, missingItems } from '../../data/portfolio';
import { Mail, Phone, Github, Linkedin, Send, AlertCircle, CheckCircle, Copy, Check, ExternalLink, Loader2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'fallback'
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(hero.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(form.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Hello Swetha,\n\n${form.message}\n\nBest regards,\n${form.name}\nEmail: ${form.email}`
    );
    return `mailto:${hero.email}?subject=${subject}&body=${body}`;
  };

  const getGmailUrl = () => {
    const subject = encodeURIComponent(form.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Hello Swetha,\n\n${form.message}\n\nBest regards,\n${form.name}\nEmail: ${form.email}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${hero.email}&su=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    try {
      // Send directly via Formspree public endpoint (standard free submission)
      const response = await fetch(`https://formspree.io/f/${encodeURIComponent(hero.email)}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'New Contact from Portfolio',
          message: form.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        // Direct submission fallback options
        setStatus('fallback');
      }
    } catch {
      setStatus('fallback');
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Get In Touch</p>
            <h2 className="section-title">Contact & Connect</h2>
            <div className="section-divider mx-auto" />
            <p className="section-subtitle text-center mx-auto">
              Open to internships, software developer opportunities, and collaborations. Let's get in touch!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Direct info cards */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg mb-4">Direct Channels</h3>
                <div className="space-y-3">
                  {/* Email with copy button */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 group">
                    <a href={`mailto:${hero.email}`} className="flex items-center gap-3.5 flex-1 truncate">
                      <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-600/30 flex items-center justify-center shadow-sm shrink-0">
                        <Mail size={18} className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="truncate">
                        <p className="text-[11px] text-slate-500 font-mono">Email</p>
                        <p className="text-slate-900 dark:text-white text-sm font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{hero.email}</p>
                      </div>
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 transition-all shadow-sm shrink-0 ml-2"
                      title="Copy email address"
                      aria-label="Copy email address"
                    >
                      {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Phone */}
                  <a href={`tel:${hero.phone}`} className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
                    <div className="w-11 h-11 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-600/30 flex items-center justify-center shadow-sm shrink-0">
                      <Phone size={18} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-mono">Phone</p>
                      <p className="text-slate-900 dark:text-white text-sm font-semibold">{hero.phone}</p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a href={hero.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-600/30 flex items-center justify-center shadow-sm shrink-0">
                      <Linkedin size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="truncate">
                      <p className="text-[11px] text-slate-500 font-mono">LinkedIn</p>
                      <p className="text-slate-900 dark:text-white text-sm font-semibold group-hover:text-blue-600 transition-colors truncate">{hero.linkedin.replace('https://', '')}</p>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a href={hero.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
                    <div className="w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300/80 dark:border-white/10 flex items-center justify-center shadow-sm shrink-0">
                      <Github size={18} className="text-slate-800 dark:text-slate-200" />
                    </div>
                    <div className="truncate">
                      <p className="text-[11px] text-slate-500 font-mono">GitHub</p>
                      <p className="text-slate-900 dark:text-white text-sm font-semibold group-hover:text-indigo-600 transition-colors truncate">{hero.github.replace('https://', '')}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Quick Info & Availability Card */}
              <div className="card">
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-3.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Availability & Location
                </h3>
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-500 font-mono">Status:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Open to Opportunities</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-500 font-mono">Location:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Tamil Nadu, India</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-500 font-mono">Work Mode:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Remote / Hybrid / On-site</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-500 font-mono">Response Time:</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Within 24 Hours</span>
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive Message Form */}
          <ScrollReveal direction="right">
            <div className="card">
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg mb-5">Send a Direct Message</h3>
              
              {status === 'success' ? (
                <div className="flex flex-col items-center py-10 text-center animate-fadeIn">
                  <CheckCircle size={48} className="text-emerald-500 mb-3 animate-bounce" />
                  <p className="text-slate-900 dark:text-white font-display font-bold text-xl mb-1">Message Sent Successfully!</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs max-w-sm mb-6">
                    Thank you for reaching out, {form.name}. I'll review your note and respond to <span className="font-mono text-indigo-600 font-semibold">{form.email}</span> shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setForm({ name: '', email: '', subject: '', message: '' });
                      setStatus('idle');
                    }} 
                    className="btn-outline text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : status === 'fallback' ? (
                <div className="flex flex-col items-center py-8 text-center animate-fadeIn space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-600/30 flex items-center justify-center">
                    <Mail size={24} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">Choose How to Send</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 max-w-sm">
                      Select your preferred service to deliver your message directly to <strong className="text-slate-800 dark:text-slate-200">{hero.email}</strong> with your note pre-filled:
                    </p>
                  </div>

                  <div className="w-full space-y-2.5 pt-2 max-w-sm">
                    {/* Open in Gmail Web */}
                    <a
                      href={getGmailUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2 text-xs py-3"
                    >
                      <ExternalLink size={14} />
                      Open & Send in Gmail (Browser)
                    </a>

                    {/* Open in Default Email Client */}
                    <a
                      href={getMailtoUrl()}
                      className="btn-outline w-full flex items-center justify-center gap-2 text-xs py-3"
                    >
                      <Mail size={14} />
                      Open in Default Mail App (Outlook/Apple)
                    </a>

                    {/* Copy text option */}
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full py-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition-colors font-medium"
                    >
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      {copied ? 'Copied swethasenthilkumar.000@gmail.com!' : 'Or copy email address to clipboard'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-xs text-indigo-600 dark:text-indigo-400 underline pt-2"
                  >
                    ← Edit message details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-white/10 transition-colors shadow-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-white/10 transition-colors shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Internship / Full-time Role / Collaboration"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-white/10 transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hi Swetha, I came across your portfolio and would like to connect regarding..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-white/10 transition-colors resize-none shadow-sm"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'sending' || !form.name || !form.email || !form.message}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-xs py-3 font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Delivering Message…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-200 dark:border-white/5 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">
          © {new Date().getFullYear()} Swetha S · Designed & Built with React, Vite & Tailwind CSS
        </p>
      </div>
    </section>
  );
}
