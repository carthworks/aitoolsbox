'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Search, FileText, TrendingUp } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

type BiasType = 'gender' | 'racial' | 'cultural' | 'age' | 'religious';

type BiasResult = {
    type: BiasType;
    severity: 'low' | 'medium' | 'high';
    instances: {
        text: string;
        reason: string;
        position: number;
    }[];
    score: number;
};

const BIAS_PATTERNS = {
    gender: {
        keywords: ['he', 'she', 'him', 'her', 'his', 'hers', 'man', 'woman', 'male', 'female', 'boy', 'girl', 'gentleman', 'lady'],
        stereotypes: [
            { pattern: /\b(women|girls?)\s+(are|tend to be|usually)\s+(emotional|sensitive|nurturing)/gi, reason: 'Gender stereotype about emotions' },
            { pattern: /\b(men|boys?)\s+(are|tend to be|usually)\s+(strong|aggressive|logical)/gi, reason: 'Gender stereotype about traits' },
            { pattern: /\b(female|woman)\s+(doctor|engineer|pilot|ceo)/gi, reason: 'Unnecessary gender qualifier for profession' },
            { pattern: /\b(male|man)\s+(nurse|teacher|secretary)/gi, reason: 'Unnecessary gender qualifier for profession' },
        ],
    },
    racial: {
        keywords: ['black', 'white', 'asian', 'hispanic', 'latino', 'african', 'caucasian', 'race', 'ethnic'],
        stereotypes: [
            { pattern: /\b(black|african)\s+(people|person)\s+(are|tend to be)/gi, reason: 'Racial generalization' },
            { pattern: /\b(asian)\s+(people|person)\s+(are|tend to be)\s+(smart|good at math)/gi, reason: 'Racial stereotype' },
            { pattern: /\b(white|caucasian)\s+(privilege|supremacy)/gi, reason: 'Potentially sensitive racial topic' },
        ],
    },
    cultural: {
        keywords: ['culture', 'tradition', 'customs', 'heritage', 'immigrant', 'foreign', 'native'],
        stereotypes: [
            { pattern: /\b(immigrants?|foreigners?)\s+(are|tend to be)\s+(taking|stealing)/gi, reason: 'Negative immigrant stereotype' },
            { pattern: /\b(third world|developing)\s+(country|nation)\s+(people|citizens)/gi, reason: 'Potentially condescending cultural reference' },
        ],
    },
    age: {
        keywords: ['old', 'young', 'elderly', 'senior', 'millennial', 'boomer', 'gen z', 'teenager'],
        stereotypes: [
            { pattern: /\b(millennials?|gen z)\s+(are|tend to be)\s+(lazy|entitled|snowflakes?)/gi, reason: 'Age-based stereotype' },
            { pattern: /\b(boomers?|elderly|seniors?)\s+(are|tend to be)\s+(out of touch|slow|confused)/gi, reason: 'Ageist stereotype' },
            { pattern: /\btoo old (to|for)/gi, reason: 'Age discrimination' },
        ],
    },
    religious: {
        keywords: ['muslim', 'christian', 'jewish', 'hindu', 'buddhist', 'atheist', 'religion', 'faith'],
        stereotypes: [
            { pattern: /\b(muslims?|islam)\s+(are|tend to be)\s+(terrorists?|extremists?)/gi, reason: 'Religious stereotype/prejudice' },
            { pattern: /\b(christians?|jews?|hindus?)\s+(are|tend to be|always)/gi, reason: 'Religious generalization' },
        ],
    },
};

const SAMPLE_TEXTS = {
    biased: `The female doctor was surprisingly competent at her job. Women tend to be more emotional and less logical than men, which is why most CEOs are male. Asian students are naturally good at math. Millennials are lazy and entitled, while boomers are out of touch with technology.`,
    neutral: `The doctor was competent at their job. People have different strengths and weaknesses regardless of their background. Students excel in various subjects based on their interests and effort. Different generations bring unique perspectives and experiences to the workplace.`,
};

export default function BiasDetectorPage() {
    const [text, setText] = useState('');
    const [results, setResults] = useState<BiasResult[]>([]);
    const [analyzing, setAnalyzing] = useState(false);
    const [overallScore, setOverallScore] = useState(0);

    const analyzeText = () => {
        if (!text.trim()) return;

        setAnalyzing(true);
        setTimeout(() => {
            const biasResults: BiasResult[] = [];

            Object.entries(BIAS_PATTERNS).forEach(([type, config]) => {
                const instances: BiasResult['instances'] = [];
                let score = 0;

                // Check for stereotypes
                config.stereotypes.forEach(({ pattern, reason }) => {
                    const matches = text.matchAll(pattern);
                    for (const match of matches) {
                        instances.push({
                            text: match[0],
                            reason,
                            position: match.index || 0,
                        });
                        score += 30;
                    }
                });

                // Check for keyword density
                const words = text.toLowerCase().split(/\s+/);
                const keywordCount = words.filter(word =>
                    config.keywords.some(keyword => word.includes(keyword))
                ).length;

                const density = (keywordCount / words.length) * 100;
                if (density > 5) {
                    score += density * 2;
                    instances.push({
                        text: `${keywordCount} ${type}-related keywords`,
                        reason: `High density of ${type}-related terms (${density.toFixed(1)}%)`,
                        position: 0,
                    });
                }

                if (instances.length > 0) {
                    const severity: BiasResult['severity'] =
                        score > 60 ? 'high' : score > 30 ? 'medium' : 'low';

                    biasResults.push({
                        type: type as BiasType,
                        severity,
                        instances,
                        score: Math.min(score, 100),
                    });
                }
            });

            // Calculate overall score
            const totalScore = biasResults.reduce((sum, r) => sum + r.score, 0);
            const avgScore = biasResults.length > 0 ? totalScore / biasResults.length : 0;

            setResults(biasResults);
            setOverallScore(avgScore);
            setAnalyzing(false);
        }, 500);
    };

    const loadSample = (type: 'biased' | 'neutral') => {
        setText(SAMPLE_TEXTS[type]);
        setResults([]);
    };

    const getSeverityColor = (severity: BiasResult['severity']) => {
        switch (severity) {
            case 'high': return 'from-red-500 to-orange-600';
            case 'medium': return 'from-yellow-500 to-orange-500';
            case 'low': return 'from-blue-500 to-cyan-500';
        }
    };

    const getOverallStatus = () => {
        if (overallScore > 60) return { text: 'High Bias Detected', color: 'text-red-600', icon: AlertTriangle };
        if (overallScore > 30) return { text: 'Moderate Bias Detected', color: 'text-yellow-600', icon: AlertTriangle };
        return { text: 'Low Bias Detected', color: 'text-green-600', icon: Shield };
    };

    const status = getOverallStatus();
    const StatusIcon = status.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Bias Detector
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Identify gender, racial, cultural, age, and religious bias in text
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Input Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-slate-800">Text to Analyze</h2>
                                <div className="flex gap-2">
                                    <Button onClick={() => loadSample('biased')} variant="outline" size="sm">
                                        Load Biased Sample
                                    </Button>
                                    <Button onClick={() => loadSample('neutral')} variant="outline" size="sm">
                                        Load Neutral Sample
                                    </Button>
                                </div>
                            </div>

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste or type text to analyze for potential bias..."
                                className="w-full h-64 p-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                            />

                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-slate-600">
                                    {text.split(/\s+/).filter(w => w).length} words
                                </div>
                                <Button
                                    onClick={analyzeText}
                                    disabled={!text.trim() || analyzing}
                                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    {analyzing ? 'Analyzing...' : 'Analyze Bias'}
                                </Button>
                            </div>
                        </Card>

                        {/* Results */}
                        {results.length > 0 && (
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-slate-800">Analysis Results</h2>
                                    <div className={`flex items-center gap-2 ${status.color} font-semibold`}>
                                        <StatusIcon className="w-5 h-5" />
                                        {status.text}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {results.map((result) => (
                                        <div
                                            key={result.type}
                                            className="p-4 border-2 border-slate-200 rounded-lg"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-semibold text-slate-800 capitalize">
                                                        {result.type} Bias
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getSeverityColor(result.severity)}`}>
                                                        {result.severity.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="text-2xl font-bold text-slate-700">
                                                    {result.score.toFixed(0)}%
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                {result.instances.map((instance, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="p-3 bg-slate-50 rounded-lg border-l-4 border-orange-500"
                                                    >
                                                        <div className="font-mono text-sm text-slate-800 mb-1">
                                                            "{instance.text}"
                                                        </div>
                                                        <div className="text-xs text-slate-600">
                                                            <AlertTriangle className="w-3 h-3 inline mr-1" />
                                                            {instance.reason}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {results.length === 0 && text && !analyzing && (
                            <Card className="p-12 shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 text-center">
                                <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-green-800 mb-2">
                                    No Significant Bias Detected
                                </h3>
                                <p className="text-green-700">
                                    The text appears to be relatively neutral and inclusive.
                                </p>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Overall Score */}
                        {results.length > 0 && (
                            <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-orange-500 to-red-600 text-white">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Overall Bias Score
                                </h3>
                                <div className="text-center">
                                    <div className="text-6xl font-bold mb-2">
                                        {overallScore.toFixed(0)}
                                    </div>
                                    <div className="text-sm opacity-90">out of 100</div>

                                    <div className="mt-6 bg-white/20 rounded-full h-4 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${overallScore}%` }}
                                            className="h-full bg-white"
                                        />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Bias Categories */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Bias Categories</h3>
                            <div className="space-y-3">
                                {Object.keys(BIAS_PATTERNS).map((type) => {
                                    const result = results.find(r => r.type === type);
                                    return (
                                        <div
                                            key={type}
                                            className={`p-3 rounded-lg border-2 ${result
                                                    ? 'border-orange-500 bg-orange-50'
                                                    : 'border-slate-200 bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-slate-700 capitalize">
                                                    {type}
                                                </span>
                                                {result && (
                                                    <span className="text-sm font-semibold text-orange-600">
                                                        {result.instances.length} issue{result.instances.length !== 1 ? 's' : ''}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Guidelines */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-slate-50 to-slate-100">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                <FileText className="w-5 h-5 inline mr-2" />
                                Best Practices
                            </h3>
                            <div className="space-y-3 text-sm text-slate-700">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <strong>Use inclusive language:</strong> Avoid unnecessary gender, race, or age qualifiers
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <strong>Avoid stereotypes:</strong> Don't make generalizations about groups of people
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <strong>Be specific:</strong> Focus on individual characteristics, not group assumptions
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <strong>Review context:</strong> Consider cultural sensitivity and audience
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Disclaimer */}
                        <Card className="p-4 shadow-xl border-0 bg-blue-50 border-l-4 border-blue-500">
                            <p className="text-xs text-blue-800">
                                <strong>Note:</strong> This tool uses pattern matching and may not catch all forms of bias.
                                It should be used as a starting point for review, not as a definitive judgment.
                                Human review is essential for nuanced bias detection.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
