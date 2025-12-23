"use client";

import { Brain, Zap, Sparkles, Users, Code, Rocket, Mail, MessageSquare, Github, Linkedin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            About AI & LLM Handy Tools
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A comprehensive toolkit designed for AI engineers, researchers, and prompt engineers.
            Build, test, and optimize your AI workflows with practical, privacy-focused utilities.
          </p>
        </section>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission */}
            <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-800">Our Mission</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                We believe that AI development tools should be accessible, fast, and privacy-focused.
                Our platform provides essential utilities that AI engineers and researchers use daily—from
                token counting and cost estimation to dataset cleaning and fine-tuning configuration.
                Everything runs client-side, ensuring your data stays private.
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-slate-800">Key Features</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    🔒 Privacy First
                  </h3>
                  <p className="text-sm text-slate-600">
                    All processing happens client-side. Your prompts, datasets, and configurations
                    never leave your browser.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    ⚡ Fast & Efficient
                  </h3>
                  <p className="text-sm text-slate-600">
                    Optimized for speed with real-time validation, instant feedback, and
                    minimal dependencies.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    🎓 Educational
                  </h3>
                  <p className="text-sm text-slate-600">
                    Perfect for students learning AI/ML concepts, with clear explanations
                    and best practices built-in.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    🚀 Production-Ready
                  </h3>
                  <p className="text-sm text-slate-600">
                    Used by AI engineers and researchers in production workflows, from
                    dataset preparation to model deployment.
                  </p>
                </div>
              </div>
            </div>

            {/* Tools Overview */}
            <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-slate-800">Available Tools</h2>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-1">Prompt Engineering</h3>
                  <p className="text-sm text-slate-600">
                    Template Builder, A/B Testing, Content Moderation
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-1">Model Training</h3>
                  <p className="text-sm text-slate-600">
                    Fine-Tune Config Generator, Dataset Cleaner, Training Cost Estimator
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-1">AI Safety & Security</h3>
                  <p className="text-sm text-slate-600">
                    Content Moderation, PII Detector, Prompt Injection Detector
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-1">Dataset Tools</h3>
                  <p className="text-sm text-slate-600">
                    Token Counter, JSONL Validator, RAG Chunking Visualizer
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 shadow-xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Get in Touch</h2>
              </div>
              <p className="leading-relaxed mb-6">
                Have questions, feedback, or collaboration ideas? We'd love to hear from you!
                Reach out through any of the channels below.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="mailto:tkarthikeyan@gmail.com"
                  className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <div>
                    <div className="text-sm opacity-80">Email</div>
                    <div className="font-semibold">tkarthikeyan@gmail.com</div>
                  </div>
                </a>
                <a
                  href="https://github.com/carthworks"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <div>
                    <div className="text-sm opacity-80">GitHub</div>
                    <div className="font-semibold">@carthworks</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Open Source */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 shadow-xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Open Source & Community-Driven</h2>
              </div>
              <p className="leading-relaxed mb-4">
                This project is open source and built with transparency. We welcome contributions,
                bug reports, and feature requests from the AI community. The codebase is available
                on GitHub for learning, auditing, and collaboration.
              </p>
              <a
                href="https://github.com/carthworks/aitoolsbox"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                <Code className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>

          {/* Right Column (Author Info Card) */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-100 border-2 border-indigo-200 rounded-xl p-6 shadow-xl sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-800">Author Info</h2>
              </div>
              <div className="space-y-4 text-slate-700">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Name</p>
                  <p className="font-semibold text-lg">Karthikeyan T</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <a
                    href="mailto:tkarthikeyan@gmail.com"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    tkarthikeyan@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">About</p>
                  <p className="text-sm leading-relaxed">
                    Passionate AI engineer and developer creating privacy-friendly,
                    open-source tools for AI researchers, prompt engineers, and ML practitioners.
                    Focused on making AI development more accessible and efficient.
                  </p>
                </div>
                <div className="pt-4 border-t border-indigo-200 space-y-3">
                  <a
                    href="https://www.linkedin.com/in/carthworks"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
                  >
                    <Linkedin className="w-4 h-4" />
                    linkedin.com/in/carthworks
                  </a>
                  <a
                    href="https://github.com/carthworks"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    github.com/carthworks
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
