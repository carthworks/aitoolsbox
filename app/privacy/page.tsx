// File: app/privacy/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, ServerOff, Cpu, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700 mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Zero-Retention Privacy Guarantee
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">
          Last updated: September 13, 2026 • Effective immediately
        </p>
      </div>

      {/* Intro Box */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <p className="text-base text-slate-800 leading-relaxed font-medium">
          At <strong className="text-indigo-950">AIToolBox.io</strong>, your privacy and code confidentiality are fundamental design principles. This suite is built for AI engineers, researchers, students, and prompt engineers with a strictly <span className="text-indigo-700 underline">client-side first architecture</span>.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <Cpu className="w-5 h-5" />
            <h2>1. Client-Side Execution & Data Minimization</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
            <li>
              <strong>Prompt & Token Tools:</strong> Token counters, prompt templates, prompt injection analyzers, JSONL dataset cleaners, and RAG chunkers run 100% locally in your browser memory via WebAssembly and JavaScript.
            </li>
            <li>
              <strong>No Account Required:</strong> No user registration, password creation, or credit card submission is required to use any of our tools.
            </li>
            <li>
              <strong>No Prompt Harvesting:</strong> We never log, store, sell, or train models on prompts, datasets, or inputs pasted into our tools.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <ServerOff className="w-5 h-5" />
            <h2>2. Third-Party APIs & External Services</h2>
          </div>
          <p className="text-sm text-slate-600">
            Certain diagnostic tools (such as live CVE feed lookup, WHOIS query, or user-initiated external API testing) require communicating with external endpoints. In these cases:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li>Requests only occur when you explicitly trigger the action (e.g. clicking &ldquo;Fetch&rdquo; or &ldquo;Test&rdquo;).</li>
            <li>API keys provided by you in the API Tester tool are held exclusively in browser memory/session and are never stored on our servers.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <EyeOff className="w-5 h-5" />
            <h2>3. Cookies & Telemetry</h2>
          </div>
          <p className="text-sm text-slate-600">
            We prioritize zero tracking:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li>We do not set advertising, behavioral profiling, or cross-site tracking cookies.</li>
            <li>Local storage is solely used for user experience enhancements (such as theme preferences or saved prompt templates locally in your browser).</li>
            <li>Anonymous performance and speed insights are aggregated via Vercel Speed Insights without capturing any personal information or query content.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <Lock className="w-5 h-5" />
            <h2>4. Security & Encryption</h2>
          </div>
          <p className="text-sm text-slate-600">
            All traffic is encrypted in transit using industry-standard TLS 1.3 / HTTPS. We enforce strict Content Security Policies (CSP) and modern web sandboxing standards to safeguard against XSS and external script injection.
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <Mail className="w-5 h-5" />
            <h2>5. Contact & Privacy Inquiries</h2>
          </div>
          <p className="text-sm text-slate-600">
            If you have questions, feedback, or verification requests concerning our privacy architecture, reach out directly:
          </p>
          <div className="text-sm font-medium text-slate-800 pt-1">
            Email:{" "}
            <a href="mailto:tkarthikeyan@gmail.com" className="text-indigo-600 hover:underline">
              tkarthikeyan@gmail.com
            </a>{" "}
            • Or visit our{" "}
            <Link href="/contact" className="text-indigo-600 hover:underline">
              Contact Page
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
