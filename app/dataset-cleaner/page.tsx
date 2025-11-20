'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle, CheckCircle2, Download, Upload, Filter, Sparkles, TrendingUp } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

type CleaningRule = {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    count: number;
};

type DatasetStats = {
    total: number;
    duplicates: number;
    tooShort: number;
    tooLong: number;
    offensive: number;
    emptyLines: number;
    invalidJson: number;
    cleaned: number;
};

const OFFENSIVE_PATTERNS = [
    /\b(fuck|shit|damn|hell|ass|bitch)\b/gi,
    /\b(offensive|inappropriate|nsfw)\b/gi,
];

const SAMPLE_DATASET = `{"text": "Machine learning is a subset of artificial intelligence.", "label": 0}
{"text": "Deep learning uses neural networks with multiple layers.", "label": 0}
{"text": "Machine learning is a subset of artificial intelligence.", "label": 0}
{"text": "AI", "label": 1}
{"text": "Natural language processing enables computers to understand human language and perform tasks like translation and sentiment analysis.", "label": 0}
{"text": "", "label": 0}
{"text": "This is some offensive shit content that should be removed.", "label": 1}
{"text": "Transformers revolutionized NLP by introducing attention mechanisms.", "label": 0}
invalid json line here
{"text": "GPT models are trained on massive amounts of text data.", "label": 0}`;

export default function DatasetCleanerPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState<DatasetStats>({
        total: 0,
        duplicates: 0,
        tooShort: 0,
        tooLong: 0,
        offensive: 0,
        emptyLines: 0,
        invalidJson: 0,
        cleaned: 0,
    });

    const [rules, setRules] = useState<CleaningRule[]>([
        { id: 'duplicates', name: 'Remove Duplicates', description: 'Remove exact duplicate lines', enabled: true, count: 0 },
        { id: 'empty', name: 'Remove Empty Lines', description: 'Remove lines with empty text fields', enabled: true, count: 0 },
        { id: 'short', name: 'Remove Too Short', description: 'Remove text shorter than minimum length', enabled: true, count: 0 },
        { id: 'long', name: 'Remove Too Long', description: 'Remove text longer than maximum length', enabled: true, count: 0 },
        { id: 'offensive', name: 'Remove Offensive Content', description: 'Filter out potentially offensive language', enabled: true, count: 0 },
        { id: 'invalid', name: 'Remove Invalid JSON', description: 'Remove lines that are not valid JSON', enabled: true, count: 0 },
    ]);

    const [minLength, setMinLength] = useState(10);
    const [maxLength, setMaxLength] = useState(1000);

    const toggleRule = (id: string) => {
        setRules(rules.map(rule =>
            rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
        ));
    };

    const cleanDataset = () => {
        if (!input.trim()) {
            setOutput('');
            return;
        }

        const lines = input.split('\n');
        const newStats: DatasetStats = {
            total: lines.length,
            duplicates: 0,
            tooShort: 0,
            tooLong: 0,
            offensive: 0,
            emptyLines: 0,
            invalidJson: 0,
            cleaned: 0,
        };

        const seen = new Set<string>();
        const cleaned: string[] = [];
        const updatedRules = [...rules];

        lines.forEach((line) => {
            if (!line.trim()) {
                newStats.emptyLines++;
                if (rules.find(r => r.id === 'empty')?.enabled) return;
            }

            // Check for invalid JSON
            let obj: any;
            try {
                obj = JSON.parse(line);
            } catch {
                newStats.invalidJson++;
                if (rules.find(r => r.id === 'invalid')?.enabled) return;
                cleaned.push(line);
                return;
            }

            const text = obj.text || '';

            // Check duplicates
            const lineKey = JSON.stringify(obj);
            if (seen.has(lineKey)) {
                newStats.duplicates++;
                if (rules.find(r => r.id === 'duplicates')?.enabled) return;
            }
            seen.add(lineKey);

            // Check empty text
            if (!text.trim()) {
                newStats.emptyLines++;
                if (rules.find(r => r.id === 'empty')?.enabled) return;
            }

            // Check length
            if (text.length < minLength) {
                newStats.tooShort++;
                if (rules.find(r => r.id === 'short')?.enabled) return;
            }

            if (text.length > maxLength) {
                newStats.tooLong++;
                if (rules.find(r => r.id === 'long')?.enabled) return;
            }

            // Check offensive content
            const hasOffensive = OFFENSIVE_PATTERNS.some(pattern => pattern.test(text));
            if (hasOffensive) {
                newStats.offensive++;
                if (rules.find(r => r.id === 'offensive')?.enabled) return;
            }

            cleaned.push(line);
        });

        newStats.cleaned = cleaned.length;

        // Update rule counts
        updatedRules.forEach(rule => {
            switch (rule.id) {
                case 'duplicates': rule.count = newStats.duplicates; break;
                case 'empty': rule.count = newStats.emptyLines; break;
                case 'short': rule.count = newStats.tooShort; break;
                case 'long': rule.count = newStats.tooLong; break;
                case 'offensive': rule.count = newStats.offensive; break;
                case 'invalid': rule.count = newStats.invalidJson; break;
            }
        });

        setRules(updatedRules);
        setStats(newStats);
        setOutput(cleaned.join('\n'));
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'application/jsonl' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cleaned-dataset-${Date.now()}.jsonl`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setInput(text);
        };
        reader.readAsText(file);
    };

    const loadSample = () => {
        setInput(SAMPLE_DATASET);
    };

    const retentionRate = stats.total > 0 ? ((stats.cleaned / stats.total) * 100).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Dataset Cleaner
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Remove duplicates, filter offensive content, and prepare clean datasets for fine-tuning
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Controls */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex flex-wrap gap-3 items-center">
                                <Button
                                    onClick={cleanDataset}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Clean Dataset
                                </Button>

                                <Button
                                    onClick={handleDownload}
                                    variant="outline"
                                    disabled={!output}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Cleaned
                                </Button>

                                <label className="cursor-pointer">
                                    <Button variant="outline" asChild>
                                        <span>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload File
                                        </span>
                                    </Button>
                                    <input
                                        type="file"
                                        accept=".jsonl,.json,.txt"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>

                                <Button onClick={loadSample} variant="outline" size="sm" className="ml-auto">
                                    Load Sample
                                </Button>
                            </div>
                        </Card>

                        {/* Input/Output Split View */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Input */}
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-slate-800">Input Dataset</h2>
                                    <div className="text-sm text-slate-500">
                                        {input.split('\n').filter(l => l.trim()).length} lines
                                    </div>
                                </div>

                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Paste your JSONL dataset here..."
                                    className="w-full h-96 p-4 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none font-mono text-sm"
                                />
                            </Card>

                            {/* Output */}
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-slate-800">Cleaned Dataset</h2>
                                    <div className="text-sm text-emerald-600 font-semibold">
                                        {output.split('\n').filter(l => l.trim()).length} lines
                                    </div>
                                </div>

                                <textarea
                                    value={output}
                                    readOnly
                                    placeholder="Cleaned dataset will appear here..."
                                    className="w-full h-96 p-4 border-2 border-emerald-200 bg-emerald-50/30 rounded-xl resize-none font-mono text-sm"
                                />
                            </Card>
                        </div>

                        {/* Length Settings */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Length Filters</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Minimum Length (characters)
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={minLength}
                                        onChange={(e) => setMinLength(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="text-center mt-2 text-2xl font-bold text-green-600">
                                        {minLength}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Maximum Length (characters)
                                    </label>
                                    <input
                                        type="range"
                                        min="100"
                                        max="5000"
                                        step="100"
                                        value={maxLength}
                                        onChange={(e) => setMaxLength(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="text-center mt-2 text-2xl font-bold text-emerald-600">
                                        {maxLength}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Statistics */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Cleaning Statistics
                            </h3>

                            <div className="space-y-3">
                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Total Lines</div>
                                    <div className="text-4xl font-bold">{stats.total}</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Cleaned Lines</div>
                                    <div className="text-4xl font-bold text-emerald-200">{stats.cleaned}</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Retention Rate</div>
                                    <div className="text-4xl font-bold">{retentionRate}%</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Removed</div>
                                    <div className="text-4xl font-bold text-red-200">
                                        {stats.total - stats.cleaned}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Cleaning Rules */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Filter className="w-5 h-5 text-green-600" />
                                Cleaning Rules
                            </h3>

                            <div className="space-y-3">
                                {rules.map((rule) => (
                                    <div
                                        key={rule.id}
                                        className={`p-3 rounded-lg border-2 transition-all ${rule.enabled
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-slate-200 bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={rule.enabled}
                                                    onChange={() => toggleRule(rule.id)}
                                                    className="rounded"
                                                />
                                                <div>
                                                    <div className="font-medium text-sm text-slate-800">
                                                        {rule.name}
                                                    </div>
                                                    <div className="text-xs text-slate-600">
                                                        {rule.description}
                                                    </div>
                                                </div>
                                            </div>

                                            {rule.count > 0 && (
                                                <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                                    {rule.count}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Issue Breakdown */}
                        {stats.total > 0 && (
                            <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-amber-50 to-orange-50">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Issues Found</h3>
                                <div className="space-y-2 text-sm">
                                    {stats.duplicates > 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Duplicates</span>
                                            <span className="font-bold text-red-600">{stats.duplicates}</span>
                                        </div>
                                    )}
                                    {stats.emptyLines > 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Empty Lines</span>
                                            <span className="font-bold text-red-600">{stats.emptyLines}</span>
                                        </div>
                                    )}
                                    {stats.tooShort > 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Too Short</span>
                                            <span className="font-bold text-orange-600">{stats.tooShort}</span>
                                        </div>
                                    )}
                                    {stats.tooLong > 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Too Long</span>
                                            <span className="font-bold text-orange-600">{stats.tooLong}</span>
                                        </div>
                                    )}
                                    {stats.offensive > 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Offensive Content</span>
                                            <span className="font-bold text-red-600">{stats.offensive}</span>
                                        </div>
                                    )}
                                    {stats.invalidJson > 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700">Invalid JSON</span>
                                            <span className="font-bold text-red-600">{stats.invalidJson}</span>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
