'use client';

import { useState } from 'react';
import {
    Shield,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Copy,
    Check,
    Download,
    Sparkles,
    Info,
    TrendingUp
} from 'lucide-react';
import LoadingState from '@/components/shared/LoadingState';

type ModerationCategory = {
    name: string;
    score: number;
    severity: 'safe' | 'low' | 'medium' | 'high';
    description: string;
};

type ModerationResult = {
    overallScore: number;
    overallSeverity: 'safe' | 'low' | 'medium' | 'high';
    categories: ModerationCategory[];
    flagged: boolean;
    timestamp: number;
};

export default function ContentModerationPage() {
    const [text, setText] = useState('');
    const [result, setResult] = useState<ModerationResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [copied, setCopied] = useState(false);

    const analyzeContent = async () => {
        if (!text.trim()) {
            alert('Please enter some text to analyze');
            return;
        }

        setIsAnalyzing(true);
        setResult(null);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const simulatedResult: ModerationResult = {
            overallScore: calculateOverallScore(text),
            overallSeverity: calculateSeverity(text),
            categories: [
                {
                    name: 'Hate Speech',
                    score: detectHateSpeech(text),
                    severity: getSeverity(detectHateSpeech(text)),
                    description: 'Content that promotes hatred or discrimination'
                },
                {
                    name: 'Violence',
                    score: detectViolence(text),
                    severity: getSeverity(detectViolence(text)),
                    description: 'Content depicting or promoting violence'
                },
                {
                    name: 'Sexual Content',
                    score: detectSexualContent(text),
                    severity: getSeverity(detectSexualContent(text)),
                    description: 'Sexually explicit or suggestive content'
                },
                {
                    name: 'Harassment',
                    score: detectHarassment(text),
                    severity: getSeverity(detectHarassment(text)),
                    description: 'Content that harasses or bullies individuals'
                },
                {
                    name: 'Self-Harm',
                    score: detectSelfHarm(text),
                    severity: getSeverity(detectSelfHarm(text)),
                    description: 'Content promoting self-harm or suicide'
                },
                {
                    name: 'Profanity',
                    score: detectProfanity(text),
                    severity: getSeverity(detectProfanity(text)),
                    description: 'Use of offensive or vulgar language'
                }
            ],
            flagged: calculateOverallScore(text) > 0.5,
            timestamp: Date.now()
        };

        setResult(simulatedResult);
        setIsAnalyzing(false);
    };

    const detectHateSpeech = (text: string): number => {
        const keywords = ['hate', 'racist', 'discrimination', 'bigot'];
        const lowerText = text.toLowerCase();
        const matches = keywords.filter(k => lowerText.includes(k)).length;
        return Math.min(matches * 0.3, 1);
    };

    const detectViolence = (text: string): number => {
        const keywords = ['kill', 'murder', 'attack', 'violence', 'weapon', 'hurt'];
        const lowerText = text.toLowerCase();
        const matches = keywords.filter(k => lowerText.includes(k)).length;
        return Math.min(matches * 0.25, 1);
    };

    const detectSexualContent = (text: string): number => {
        const keywords = ['sexual', 'explicit', 'nude', 'porn'];
        const lowerText = text.toLowerCase();
        const matches = keywords.filter(k => lowerText.includes(k)).length;
        return Math.min(matches * 0.3, 1);
    };

    const detectHarassment = (text: string): number => {
        const keywords = ['bully', 'harass', 'threaten', 'intimidate'];
        const lowerText = text.toLowerCase();
        const matches = keywords.filter(k => lowerText.includes(k)).length;
        return Math.min(matches * 0.3, 1);
    };

    const detectSelfHarm = (text: string): number => {
        const keywords = ['suicide', 'self-harm', 'cut myself', 'end my life'];
        const lowerText = text.toLowerCase();
        const matches = keywords.filter(k => lowerText.includes(k)).length;
        return Math.min(matches * 0.4, 1);
    };

    const detectProfanity = (text: string): number => {
        const keywords = ['damn', 'hell', 'crap', 'stupid', 'idiot'];
        const lowerText = text.toLowerCase();
        const matches = keywords.filter(k => lowerText.includes(k)).length;
        return Math.min(matches * 0.2, 1);
    };

    const calculateOverallScore = (text: string): number => {
        const scores = [
            detectHateSpeech(text),
            detectViolence(text),
            detectSexualContent(text),
            detectHarassment(text),
            detectSelfHarm(text),
            detectProfanity(text)
        ];
        return Math.max(...scores);
    };

    const calculateSeverity = (text: string): 'safe' | 'low' | 'medium' | 'high' => {
        const score = calculateOverallScore(text);
        return getSeverity(score);
    };

    const getSeverity = (score: number): 'safe' | 'low' | 'medium' | 'high' => {
        if (score < 0.2) return 'safe';
        if (score < 0.5) return 'low';
        if (score < 0.8) return 'medium';
        return 'high';
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'safe': return 'text-green-600 bg-green-50 border-green-200';
            case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'high': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'safe': return <CheckCircle className="w-5 h-5" />;
            case 'low': return <Info className="w-5 h-5" />;
            case 'medium': return <AlertTriangle className="w-5 h-5" />;
            case 'high': return <XCircle className="w-5 h-5" />;
            default: return <Info className="w-5 h-5" />;
        }
    };

    const handleCopy = async () => {
        if (!result) return;

        const reportText = `Content Moderation Report
Generated: ${new Date(result.timestamp).toLocaleString()}

Overall Score: ${(result.overallScore * 100).toFixed(1)}%
Overall Severity: ${result.overallSeverity.toUpperCase()}
Flagged: ${result.flagged ? 'YES' : 'NO'}

Category Breakdown:
${result.categories.map(cat =>
            `- ${cat.name}: ${(cat.score * 100).toFixed(1)}% (${cat.severity.toUpperCase()})`
        ).join('\n')}

Original Text:
${text}`;

        try {
            await navigator.clipboard.writeText(reportText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownload = () => {
        if (!result) return;

        const reportText = `Content Moderation Report
Generated: ${new Date(result.timestamp).toLocaleString()}

Overall Score: ${(result.overallScore * 100).toFixed(1)}%
Overall Severity: ${result.overallSeverity.toUpperCase()}
Flagged: ${result.flagged ? 'YES' : 'NO'}

Category Breakdown:
${result.categories.map(cat =>
            `- ${cat.name}: ${(cat.score * 100).toFixed(1)}% (${cat.severity.toUpperCase()})
  ${cat.description}`
        ).join('\n\n')}

Original Text:
${text}`;

        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `moderation-report-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-red-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                            Content Moderation Tool
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Analyze text for harmful, toxic, or inappropriate content with AI-powered moderation
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Panel - Input */}
                    <div className="space-y-6">
                        <div className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur rounded-lg">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-rose-600" />
                                Text to Analyze
                            </h2>

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter text to check for harmful or inappropriate content...

Examples:
- User comments
- Chat messages
- Social media posts
- User-generated content"
                                className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all resize-none font-mono text-sm"
                                rows={12}
                            />

                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-slate-500">
                                    {text.length} characters • {text.split(/\s+/).filter(w => w).length} words
                                </div>
                                <button
                                    onClick={analyzeContent}
                                    disabled={isAnalyzing || !text.trim()}
                                    className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isAnalyzing ? (
                                        <span className="flex items-center gap-2">
                                            <LoadingState variant="dots" size="sm" />
                                            Analyzing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            Analyze Content
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="p-4 shadow-lg border-0 bg-blue-50 rounded-lg">
                            <div className="flex gap-3">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                    <strong>Demo Mode:</strong> This tool uses keyword-based detection for demonstration.
                                    For production use, integrate with:
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>OpenAI Moderation API</li>
                                        <li>Google Perspective API</li>
                                        <li>Azure Content Safety</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Results */}
                    <div className="space-y-6">
                        {isAnalyzing && (
                            <div className="p-12 shadow-xl border-0 bg-white/80 backdrop-blur rounded-lg">
                                <LoadingState variant="thinking" message="Analyzing content for safety" size="lg" />
                            </div>
                        )}

                        {result && !isAnalyzing && (
                            <>
                                {/* Overall Result */}
                                <div className={`p-6 shadow-xl border-2 rounded-lg ${getSeverityColor(result.overallSeverity)}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {getSeverityIcon(result.overallSeverity)}
                                            <div>
                                                <h3 className="text-lg font-semibold">Overall Assessment</h3>
                                                <p className="text-sm opacity-75">
                                                    {result.flagged ? 'Content flagged for review' : 'Content appears safe'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold">
                                                {(result.overallScore * 100).toFixed(0)}%
                                            </div>
                                            <div className="text-xs uppercase font-semibold">
                                                {result.overallSeverity}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className="flex-1 px-3 py-2 bg-white/50 hover:bg-white/80 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Copied!' : 'Copy Report'}
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="flex-1 px-3 py-2 bg-white/50 hover:bg-white/80 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                    </div>
                                </div>

                                {/* Category Breakdown */}
                                <div className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur rounded-lg">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-rose-600" />
                                        Category Breakdown
                                    </h3>

                                    <div className="space-y-3">
                                        {result.categories.map((category) => (
                                            <div
                                                key={category.name}
                                                className={`p-4 rounded-lg border-2 ${getSeverityColor(category.severity)}`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        {getSeverityIcon(category.severity)}
                                                        <span className="font-semibold">{category.name}</span>
                                                    </div>
                                                    <span className="text-lg font-bold">
                                                        {(category.score * 100).toFixed(0)}%
                                                    </span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="w-full bg-white/50 rounded-full h-2 mb-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-500 ${category.severity === 'safe' ? 'bg-green-500' :
                                                            category.severity === 'low' ? 'bg-yellow-500' :
                                                                category.severity === 'medium' ? 'bg-orange-500' :
                                                                    'bg-red-500'
                                                            }`}
                                                        style={{ width: `${category.score * 100}%` }}
                                                    />
                                                </div>

                                                <p className="text-xs opacity-75">{category.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="p-6 shadow-xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                                        Recommendations
                                    </h3>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        {result.flagged ? (
                                            <>
                                                <li className="flex items-start gap-2">
                                                    <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <span>Review this content before publishing</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <span>Consider implementing additional filters</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <span>Monitor user behavior patterns</span>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>Content appears safe for publication</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>Continue monitoring for quality assurance</span>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}

                        {!result && !isAnalyzing && (
                            <div className="p-12 shadow-xl border-0 bg-white/80 backdrop-blur text-center rounded-lg">
                                <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500">
                                    Enter text and click "Analyze Content" to get started
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
