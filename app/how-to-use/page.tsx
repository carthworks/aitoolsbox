"use client";

import { BookOpen, Play, Zap, CheckCircle, ArrowRight, Lightbulb, Code, Sparkles, Shield } from "lucide-react";

export default function HowToUsePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Hero */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                            <BookOpen className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        How to Use AI ToolBox
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Get started with our AI tools in minutes. Follow these simple guides to make the most of each tool.
                    </p>
                </section>

                {/* Quick Start */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-8 shadow-xl text-white">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-6 h-6" />
                        <h2 className="text-2xl font-bold">Quick Start Guide</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                            <div className="text-3xl font-bold mb-2">1</div>
                            <h3 className="font-semibold mb-2">Browse Tools</h3>
                            <p className="text-sm opacity-90">
                                Explore our homepage to find the perfect tool for your AI workflow
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                            <div className="text-3xl font-bold mb-2">2</div>
                            <h3 className="font-semibold mb-2">Click & Use</h3>
                            <p className="text-sm opacity-90">
                                Click "Open" on any tool to start using it immediately—no signup required
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                            <div className="text-3xl font-bold mb-2">3</div>
                            <h3 className="font-semibold mb-2">Export Results</h3>
                            <p className="text-sm opacity-90">
                                Copy, download, or save your results for use in your projects
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tool Guides */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-slate-800 text-center">Tool-Specific Guides</h2>

                    {/* API Tester */}
                    <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Code className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">API Tester</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 1: Select Provider</p>
                                    <p className="text-sm text-slate-600">Choose from OpenAI, Anthropic, Google, or other AI providers</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 2: Enter API Key</p>
                                    <p className="text-sm text-slate-600">Paste your API key (stored locally, never sent to our servers)</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 3: Configure Request</p>
                                    <p className="text-sm text-slate-600">Select model, set parameters (temperature, max tokens, etc.)</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 4: Send Request</p>
                                    <p className="text-sm text-slate-600">Click "Send Request" and watch the real-time streaming response</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Moderation */}
                    <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg">
                                <Sparkles className="w-6 h-6 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Content Moderation Tool</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 1: Paste Text</p>
                                    <p className="text-sm text-slate-600">Enter the text you want to analyze for harmful content</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 2: Analyze</p>
                                    <p className="text-sm text-slate-600">Click "Analyze Content" to scan for 6 categories of harmful content</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 3: Review Results</p>
                                    <p className="text-sm text-slate-600">Check severity scores (Safe/Low/Medium/High) for each category</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 4: Export Report</p>
                                    <p className="text-sm text-slate-600">Copy or download the moderation report for your records</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prompt Template Builder */}
                    <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <BookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Prompt Template Builder</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 1: Choose Template</p>
                                    <p className="text-sm text-slate-600">Select a preset template or create a new one from scratch</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 2: Add Messages</p>
                                    <p className="text-sm text-slate-600">Add System, User, and Assistant messages with variables like {'{{name}}'}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 3: Fill Variables</p>
                                    <p className="text-sm text-slate-600">Enter values for your variables and preview the final prompt</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 4: Export as JSON</p>
                                    <p className="text-sm text-slate-600">Copy or download your template as JSON for reuse</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Jailbreak Attack Tester */}
                    <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Shield className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Jailbreak Attack Tester</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 1: Select Attack Template</p>
                                    <p className="text-sm text-slate-600">Choose from common jailbreak techniques like 'DAN', 'Developer Mode', or 'Encoding'</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 2: Configure Attack</p>
                                    <p className="text-sm text-slate-600">Enter your target 'harmful' query and customize the injection payload manually if needed</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 3: Run Simulation or API</p>
                                    <p className="text-sm text-slate-600">Choose 'Local Simulation' for free educational tests or 'External API' to test against real models (requires API key)</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 4: Analyze & Export</p>
                                    <p className="text-sm text-slate-600">Review the pass/fail result, read defense tips, and export a detailed JSON report</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Glossary */}
                    <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <BookOpen className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">AI Glossary</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 1: Search Terms</p>
                                    <p className="text-sm text-slate-600">Use the search bar to find specific AI/LLM terms</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 2: Filter by Category</p>
                                    <p className="text-sm text-slate-600">Click category buttons to filter terms (Models, Training, etc.)</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-slate-800">Step 3: Read Definitions</p>
                                    <p className="text-sm text-slate-600">Click any term to expand and read detailed explanations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips & Best Practices */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 shadow-xl border-2 border-amber-200">
                    <div className="flex items-center gap-3 mb-6">
                        <Lightbulb className="w-6 h-6 text-amber-600" />
                        <h2 className="text-2xl font-bold text-slate-800">Tips & Best Practices</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-amber-600" />
                                Privacy & Security
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>• All tools run client-side—your data never leaves your browser</li>
                                <li>• API keys are stored locally and never sent to our servers</li>
                                <li>• Clear your browser data to remove stored API keys</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-amber-600" />
                                Performance Tips
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Use modern browsers (Chrome, Firefox, Edge) for best performance</li>
                                <li>• Large datasets may take longer to process</li>
                                <li>• Export results frequently to avoid losing work</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-amber-600" />
                                Getting Help
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Check the AI Glossary for term definitions</li>
                                <li>• Visit our GitHub for documentation and examples</li>
                                <li>• Email us at tkarthikeyan@gmail.com for support</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-amber-600" />
                                Contributing
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Report bugs on our GitHub Issues page</li>
                                <li>• Suggest new tools or features</li>
                                <li>• Contribute code via pull requests</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-8 shadow-xl border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-2">Do I need to create an account?</h3>
                            <p className="text-sm text-slate-600">
                                No! All tools are free to use without any signup or registration. Just visit the homepage and start using any tool immediately.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-2">Are my API keys safe?</h3>
                            <p className="text-sm text-slate-600">
                                Yes. API keys are stored only in your browser's local storage and are never sent to our servers. All API calls go directly from your browser to the AI provider.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-2">Can I use these tools offline?</h3>
                            <p className="text-sm text-slate-600">
                                Most tools work offline once loaded, except those that require API calls (like the API Tester). Tools like the AI Glossary and Prompt Template Builder work fully offline.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-2">How do I report a bug or request a feature?</h3>
                            <p className="text-sm text-slate-600">
                                Visit our GitHub repository and create an issue, or email us at tkarthikeyan@gmail.com with your feedback.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-2">Is this project open source?</h3>
                            <p className="text-sm text-slate-600">
                                Yes! The entire codebase is available on GitHub under an open-source license. Feel free to fork, contribute, or learn from the code.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-8 shadow-xl text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Explore our growing collection of AI tools and boost your productivity today!
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
                    >
                        <Play className="w-5 h-5" />
                        Browse All Tools
                    </a>
                </div>
            </div>
        </div>
    );
}
