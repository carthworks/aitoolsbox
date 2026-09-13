import React from "react";
import Link from "next/link";
import { FileText, Shield, AlertCircle, Scale, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions - AIToolBox.io",
  description: "Terms of service, acceptable use policy, and disclaimer for AIToolBox.io.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-semibold text-indigo-700 mb-4">
          <Scale className="w-3.5 h-3.5" />
          Legal & Governance
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Terms & Conditions
        </h1>
        <p className="text-sm text-slate-500">
          Last updated: September 13, 2026 • Effective immediately
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <FileText className="w-5 h-5" />
            <h2>1. Acceptance of Terms</h2>
          </div>
          <p>
            By accessing or using <strong className="text-slate-900">AIToolBox.io</strong>, you agree to be bound by these Terms and Conditions and our{" "}
            <Link href="/privacy" className="text-indigo-600 hover:underline font-medium">
              Privacy Policy
            </Link>
            . If you do not agree with any part of these terms, please do not use our services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <Shield className="w-5 h-5" />
            <h2>2. Privacy & Client-Side Architecture</h2>
          </div>
          <p>
            AIToolBox.io is engineered with privacy as a foundational principle. The majority of our calculation, formatting, tokenization, dataset processing, and validation tools execute entirely in your browser (client-side). We do not store, harvest, or transmit your prompts, API payloads, certificates, or dataset files to external servers without your explicit action.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <CheckCircle2 className="w-5 h-5" />
            <h2>3. Acceptable Use Policy</h2>
          </div>
          <p>You agree to use AIToolBox.io strictly for lawful purposes. You shall not:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>Use the tools to generate, distribute, or facilitate harmful, illegal, abusive, or malicious code or content.</li>
            <li>Conduct unauthorized penetration tests or denial-of-service attacks against third-party systems using output generated from this platform.</li>
            <li>Attempt to bypass, disable, or interfere with security controls or rate limits of the website.</li>
            <li>Misrepresent output from automated safety testers as certified compliance without independent evaluation.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-600 font-semibold text-lg">
            <AlertCircle className="w-5 h-5" />
            <h2>4. Disclaimers & Limitation of Liability</h2>
          </div>
          <p>
            All tools and documentation on AIToolBox.io are provided on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis without warranties of any kind, either express or implied.
          </p>
          <p className="text-sm text-slate-600">
            While we strive for precision in all calculations (e.g., token estimations, cost projections, CVE parsing), outputs are intended for developer utility and reference only. Karthikeyan T and AIToolBox.io are not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this site.
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <Scale className="w-5 h-5" />
            <h2>5. Intellectual Property & Open Source</h2>
          </div>
          <p>
            The AIToolBox.io interface and codebase are licensed under the{" "}
            <a
              href="https://github.com/carthworks/aitoolsbox/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline font-medium"
            >
              MIT License
            </a>
            . Third-party brand names, model trademarks (such as OpenAI, Anthropic, Google Gemini, Meta Llama), and logos referenced on the platform belong to their respective copyright holders and are used solely for descriptive and comparative compatibility purposes.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">6. Governing Law & Contact</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable legal principles without regard to conflict of law provisions.
          </p>
          <p className="text-sm text-slate-600">
            Questions regarding these Terms? Visit our{" "}
            <Link href="/contact" className="text-indigo-600 hover:underline font-medium">
              Contact Page
            </Link>{" "}
            or email us at{" "}
            <a href="mailto:tkarthikeyan@gmail.com" className="text-indigo-600 hover:underline font-medium">
              tkarthikeyan@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
