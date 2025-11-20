'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, FileText, Zap, Copy, Check, Info } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

// Model pricing (per 1M tokens)
const MODEL_PRICING = {
    'GPT-4o': { input: 2.50, output: 10.00, color: 'from-green-500 to-emerald-600' },
    'GPT-4o-mini': { input: 0.15, output: 0.60, color: 'from-green-400 to-teal-500' },
    'GPT-4 Turbo': { input: 10.00, output: 30.00, color: 'from-purple-500 to-pink-600' },
    'Claude 3.5 Sonnet': { input: 3.00, output: 15.00, color: 'from-orange-500 to-red-600' },
    'Claude 3 Haiku': { input: 0.25, output: 1.25, color: 'from-orange-400 to-amber-500' },
    'Gemini 1.5 Pro': { input: 1.25, output: 5.00, color: 'from-blue-500 to-indigo-600' },
    'Gemini 1.5 Flash': { input: 0.075, output: 0.30, color: 'from-blue-400 to-cyan-500' },
};

type ModelName = keyof typeof MODEL_PRICING;

export default function TokenCounterPage() {
    const [text, setText] = useState('');
    const [selectedModel, setSelectedModel] = useState<ModelName>('GPT-4o');
    const [tokenCount, setTokenCount] = useState(0);
    const [copied, setCopied] = useState(false);

    // Approximate token counting (4 chars ≈ 1 token for English text)
    useEffect(() => {
        const approximateTokens = Math.ceil(text.length / 4);
        setTokenCount(approximateTokens);
    }, [text]);

    const calculateCost = (tokens: number, type: 'input' | 'output') => {
        const pricing = MODEL_PRICING[selectedModel][type];
        return ((tokens / 1_000_000) * pricing).toFixed(6);
    };

    const copyToClipboard = () => {
        const summary = `
Token Count: ${tokenCount.toLocaleString()}
Model: ${selectedModel}
Input Cost: $${calculateCost(tokenCount, 'input')}
Output Cost: $${calculateCost(tokenCount, 'output')}
Character Count: ${text.length.toLocaleString()}
Word Count: ${text.split(/\s+/).filter(Boolean).length.toLocaleString()}
    `.trim();

        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCount = text.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                            <Calculator className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Token Counter & Cost Calculator
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Real-time token counting and cost estimation for popular AI models
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Input Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-indigo-600" />
                                    Input Text
                                </h2>
                                <Button
                                    onClick={copyToClipboard}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy Stats
                                        </>
                                    )}
                                </Button>
                            </div>

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste your text here to count tokens and estimate costs..."
                                className="w-full h-96 p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none font-mono text-sm"
                            />

                            {/* Quick Stats Bar */}
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                                    <div className="text-sm text-slate-600 mb-1">Characters</div>
                                    <div className="text-2xl font-bold text-indigo-600">
                                        {charCount.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                                    <div className="text-sm text-slate-600 mb-1">Words</div>
                                    <div className="text-2xl font-bold text-purple-600">
                                        {wordCount.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg">
                                    <div className="text-sm text-slate-600 mb-1">Tokens (est.)</div>
                                    <div className="text-2xl font-bold text-emerald-600">
                                        {tokenCount.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Sidebar - Model Selection & Cost */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Model Selector */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-600" />
                                Select Model
                            </h3>
                            <div className="space-y-2">
                                {(Object.keys(MODEL_PRICING) as ModelName[]).map((model) => (
                                    <button
                                        key={model}
                                        onClick={() => setSelectedModel(model)}
                                        className={`w-full text-left p-3 rounded-lg transition-all ${selectedModel === model
                                                ? `bg-gradient-to-r ${MODEL_PRICING[model].color} text-white shadow-lg scale-105`
                                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                                            }`}
                                    >
                                        <div className="font-medium">{model}</div>
                                        <div className={`text-xs mt-1 ${selectedModel === model ? 'text-white/80' : 'text-slate-500'}`}>
                                            In: ${MODEL_PRICING[model].input}/1M · Out: ${MODEL_PRICING[model].output}/1M
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Cost Breakdown */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <DollarSign className="w-5 h-5" />
                                Cost Estimate
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Input Cost</div>
                                    <div className="text-3xl font-bold">
                                        ${calculateCost(tokenCount, 'input')}
                                    </div>
                                    <div className="text-xs opacity-75 mt-1">
                                        {tokenCount.toLocaleString()} tokens × ${MODEL_PRICING[selectedModel].input}/1M
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Output Cost (same length)</div>
                                    <div className="text-3xl font-bold">
                                        ${calculateCost(tokenCount, 'output')}
                                    </div>
                                    <div className="text-xs opacity-75 mt-1">
                                        {tokenCount.toLocaleString()} tokens × ${MODEL_PRICING[selectedModel].output}/1M
                                    </div>
                                </div>

                                <div className="border-t border-white/20 pt-4">
                                    <div className="text-sm opacity-90 mb-1">Total Round-Trip Cost</div>
                                    <div className="text-4xl font-bold">
                                        ${(parseFloat(calculateCost(tokenCount, 'input')) + parseFloat(calculateCost(tokenCount, 'output'))).toFixed(6)}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Info Card */}
                        <Card className="p-4 shadow-lg border-0 bg-amber-50">
                            <div className="flex gap-3">
                                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800">
                                    <strong>Note:</strong> Token counts are approximated using the 4-char rule.
                                    For exact counts, use the model's official tokenizer (e.g., tiktoken for OpenAI).
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Context Window Reference */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Context Window Limits</h3>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[
                                { model: 'GPT-4o', limit: '128K', percentage: (tokenCount / 128000) * 100 },
                                { model: 'GPT-4 Turbo', limit: '128K', percentage: (tokenCount / 128000) * 100 },
                                { model: 'Claude 3.5 Sonnet', limit: '200K', percentage: (tokenCount / 200000) * 100 },
                                { model: 'Gemini 1.5 Pro', limit: '2M', percentage: (tokenCount / 2000000) * 100 },
                            ].map((item) => (
                                <div key={item.model} className="bg-slate-50 p-4 rounded-lg">
                                    <div className="font-medium text-slate-800 mb-2">{item.model}</div>
                                    <div className="text-2xl font-bold text-indigo-600 mb-2">{item.limit}</div>
                                    <div className="w-full bg-slate-200 rounded-full h-2 mb-1">
                                        <div
                                            className={`h-2 rounded-full transition-all ${item.percentage > 90 ? 'bg-red-500' : item.percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${Math.min(item.percentage, 100)}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-slate-600">
                                        {item.percentage.toFixed(1)}% used
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
