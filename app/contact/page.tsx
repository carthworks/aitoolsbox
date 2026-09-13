'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, MessageSquare, Send, CheckCircle2, Clock, Globe, Shield } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Client-side simulation / mailto link fallback
    const mailtoUrl = `mailto:tkarthikeyan@gmail.com?subject=${encodeURIComponent(
      `[AIToolBox.io Contact] ${formData.subject || 'Inquiry'}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-slate-800">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-semibold text-indigo-700">
          <MessageSquare className="w-3.5 h-3.5" />
          Direct Developer Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Contact & Support
        </h1>
        <p className="text-base text-slate-600">
          Have feedback, feature suggestions, bug reports, or partnership ideas? We respond promptly.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              Communication Channels
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <div className="text-slate-500 font-medium mb-1">Direct Email</div>
                <a
                  href="mailto:tkarthikeyan@gmail.com"
                  className="font-semibold text-indigo-600 hover:underline flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  tkarthikeyan@gmail.com
                </a>
              </div>

              <div>
                <div className="text-slate-500 font-medium mb-1">Response SLA</div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Within 24 hours (Mon - Fri)
                </div>
              </div>

              <div>
                <div className="text-slate-500 font-medium mb-1">Open Source Issues</div>
                <a
                  href="https://github.com/carthworks/aitoolsbox/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-indigo-600 hover:underline flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Issue Tracker
                </a>
              </div>

              <div>
                <div className="text-slate-500 font-medium mb-1">Developer Profile</div>
                <a
                  href="https://www.linkedin.com/in/carthworks"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-indigo-600 hover:underline flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  linkedin.com/in/carthworks
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              Zero telemetry data sold or shared.
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Send a Message</h2>
            <p className="text-sm text-slate-600 mb-6">
              Fill out the form below to reach the engineering team directly.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Message Draft Prepared!</h3>
                <p className="text-sm text-emerald-700">
                  Your email client has opened with your message. If it didn&apos;t open automatically, send directly to{' '}
                  <a href="mailto:tkarthikeyan@gmail.com" className="font-semibold underline">
                    tkarthikeyan@gmail.com
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-emerald-800 font-medium hover:underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Subject / Topic
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Feature Request / Bug Report / Feedback"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Describe your question, request, or feedback..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y"
                  />
                </div>

                <p className="text-xs text-slate-500">
                  By submitting, you agree to our{' '}
                  <a href="/privacy" className="text-indigo-600 hover:underline">
                    Privacy Policy
                  </a>
                  . No marketing spam or data resale guaranteed.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
