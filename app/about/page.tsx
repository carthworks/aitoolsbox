"use client";

import Section from "@/components/Section";
import { Brain, Zap, Sparkles, Users, Code, Rocket } from "lucide-react";

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
                  <h3 className="font-semibold text-slate-800 mb-1">Dataset Tools</h3>
                  <p className="text-sm text-slate-600">
                    Token Counter, JSONL Validator, RAG Chunking Visualizer, Dataset Cleaner
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-1">Model Training</h3>
                  <p className="text-sm text-slate-600">
                    Fine-Tune Config Generator (LoRA, QLoRA, PEFT, OpenAI, Axolotl)
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-1">Prompt Engineering</h3>
                  <p className="text-sm text-slate-600">
                    Template Builder, A/B Testing, Persona Simulator
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-1">AI Agents & RAG</h3>
                  <p className="text-sm text-slate-600">
                    Agent Flow Visualizer, RAG Builder, Tool Use Simulator
                  </p>
                </div>
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
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    linkedin.com/in/carthworks
                  </a>
                  <a
                    href="https://github.com/carthworks"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
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
