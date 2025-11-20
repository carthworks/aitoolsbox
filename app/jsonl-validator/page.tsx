'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, FileJson, Download, Upload, Sparkles, Info } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

type ValidationError = {
    line: number;
    error: string;
    severity: 'error' | 'warning';
};

type ValidationResult = {
    isValid: boolean;
    totalLines: number;
    validLines: number;
    errors: ValidationError[];
    format?: 'openai' | 'huggingface' | 'custom' | 'unknown';
};

const EXAMPLE_OPENAI = `{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "What is machine learning?"}, {"role": "assistant", "content": "Machine learning is a subset of AI..."}]}
{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Explain neural networks"}, {"role": "assistant", "content": "Neural networks are computing systems..."}]}`;

const EXAMPLE_HUGGINGFACE = `{"text": "This is a sample training text for language modeling.", "label": 0}
{"text": "Another example of training data with proper formatting.", "label": 1}`;

export default function JSONLValidatorPage() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<ValidationResult | null>(null);
    const [autoFormat, setAutoFormat] = useState(false);

    const validateJSONL = (text: string): ValidationResult => {
        const lines = text.split('\n').filter(line => line.trim());
        const errors: ValidationError[] = [];
        let validLines = 0;
        let detectedFormat: 'openai' | 'huggingface' | 'custom' | 'unknown' = 'unknown';

        const formatCounts = { openai: 0, huggingface: 0, custom: 0 };

        lines.forEach((line, idx) => {
            const lineNum = idx + 1;

            // Check if valid JSON
            try {
                const obj = JSON.parse(line);

                // Detect format
                if (obj.messages && Array.isArray(obj.messages)) {
                    formatCounts.openai++;

                    // Validate OpenAI format
                    const hasValidRoles = obj.messages.every((msg: any) =>
                        msg.role && msg.content &&
                        ['system', 'user', 'assistant', 'function'].includes(msg.role)
                    );

                    if (!hasValidRoles) {
                        errors.push({
                            line: lineNum,
                            error: 'Invalid message format. Each message must have "role" and "content"',
                            severity: 'error'
                        });
                    } else {
                        validLines++;
                    }

                    // Check for system message
                    const hasSystem = obj.messages.some((msg: any) => msg.role === 'system');
                    if (!hasSystem) {
                        errors.push({
                            line: lineNum,
                            error: 'Missing system message (recommended for OpenAI fine-tuning)',
                            severity: 'warning'
                        });
                    }

                } else if (obj.text !== undefined) {
                    formatCounts.huggingface++;
                    validLines++;

                    if (typeof obj.text !== 'string' || obj.text.trim().length === 0) {
                        errors.push({
                            line: lineNum,
                            error: 'Text field is empty or invalid',
                            severity: 'warning'
                        });
                    }
                } else {
                    formatCounts.custom++;
                    validLines++;

                    // Generic validation
                    if (Object.keys(obj).length === 0) {
                        errors.push({
                            line: lineNum,
                            error: 'Empty JSON object',
                            severity: 'warning'
                        });
                    }
                }

            } catch (e) {
                errors.push({
                    line: lineNum,
                    error: `Invalid JSON: ${(e as Error).message}`,
                    severity: 'error'
                });
            }
        });

        // Determine primary format
        if (formatCounts.openai > formatCounts.huggingface && formatCounts.openai > formatCounts.custom) {
            detectedFormat = 'openai';
        } else if (formatCounts.huggingface > formatCounts.openai && formatCounts.huggingface > formatCounts.custom) {
            detectedFormat = 'huggingface';
        } else if (formatCounts.custom > 0) {
            detectedFormat = 'custom';
        }

        return {
            isValid: errors.filter(e => e.severity === 'error').length === 0,
            totalLines: lines.length,
            validLines,
            errors,
            format: detectedFormat
        };
    };

    const handleValidate = () => {
        if (!input.trim()) {
            setResult(null);
            return;
        }

        const validation = validateJSONL(input);
        setResult(validation);
    };

    const handleFormat = () => {
        try {
            const lines = input.split('\n').filter(line => line.trim());
            const formatted = lines.map(line => {
                try {
                    const obj = JSON.parse(line);
                    return JSON.stringify(obj, null, 0); // Compact format
                } catch {
                    return line;
                }
            }).join('\n');

            setInput(formatted);
            handleValidate();
        } catch (e) {
            console.error('Format error:', e);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([input], { type: 'application/jsonl' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dataset-${Date.now()}.jsonl`;
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
            setTimeout(() => handleValidate(), 100);
        };
        reader.readAsText(file);
    };

    const loadExample = (type: 'openai' | 'huggingface') => {
        setInput(type === 'openai' ? EXAMPLE_OPENAI : EXAMPLE_HUGGINGFACE);
        setTimeout(() => handleValidate(), 100);
    };

    const errorCount = result?.errors.filter(e => e.severity === 'error').length || 0;
    const warningCount = result?.errors.filter(e => e.severity === 'warning').length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                            <FileJson className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            JSONL Validator & Formatter
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Validate and format datasets for OpenAI, HuggingFace, and custom fine-tuning
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Editor */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        {/* Controls */}
                        <Card className="p-4 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    onClick={handleValidate}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Validate
                                </Button>

                                <Button
                                    onClick={handleFormat}
                                    variant="outline"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Format
                                </Button>

                                <Button
                                    onClick={handleDownload}
                                    variant="outline"
                                    disabled={!input.trim()}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
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
                                        accept=".jsonl,.json"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>

                                <div className="ml-auto flex gap-2">
                                    <Button
                                        onClick={() => loadExample('openai')}
                                        variant="outline"
                                        size="sm"
                                    >
                                        OpenAI Example
                                    </Button>
                                    <Button
                                        onClick={() => loadExample('huggingface')}
                                        variant="outline"
                                        size="sm"
                                    >
                                        HF Example
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Editor */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-slate-800">JSONL Content</h2>
                                <div className="text-sm text-slate-500">
                                    {input.split('\n').filter(l => l.trim()).length} lines
                                </div>
                            </div>

                            <textarea
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    if (autoFormat) {
                                        setTimeout(() => handleValidate(), 500);
                                    }
                                }}
                                placeholder="Paste your JSONL content here or upload a file..."
                                className="w-full h-96 p-4 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none font-mono text-sm"
                            />

                            <div className="mt-4 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="auto-validate"
                                    checked={autoFormat}
                                    onChange={(e) => setAutoFormat(e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="auto-validate" className="text-sm text-slate-600">
                                    Auto-validate on change
                                </label>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Sidebar - Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Status Card */}
                        {result && (
                            <Card className={`p-6 shadow-xl border-0 ${result.isValid
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                                    : 'bg-gradient-to-br from-red-500 to-rose-600'
                                } text-white`}>
                                <div className="flex items-center gap-3 mb-4">
                                    {result.isValid ? (
                                        <CheckCircle2 className="w-8 h-8" />
                                    ) : (
                                        <XCircle className="w-8 h-8" />
                                    )}
                                    <h3 className="text-2xl font-bold">
                                        {result.isValid ? 'Valid!' : 'Invalid'}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-white/10 backdrop-blur p-3 rounded-lg">
                                        <div className="text-sm opacity-90">Total Lines</div>
                                        <div className="text-3xl font-bold">{result.totalLines}</div>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur p-3 rounded-lg">
                                        <div className="text-sm opacity-90">Valid Lines</div>
                                        <div className="text-3xl font-bold">{result.validLines}</div>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur p-3 rounded-lg">
                                        <div className="text-sm opacity-90">Detected Format</div>
                                        <div className="text-xl font-bold uppercase">{result.format}</div>
                                    </div>

                                    {errorCount > 0 && (
                                        <div className="bg-white/10 backdrop-blur p-3 rounded-lg">
                                            <div className="text-sm opacity-90">Errors</div>
                                            <div className="text-3xl font-bold text-red-200">{errorCount}</div>
                                        </div>
                                    )}

                                    {warningCount > 0 && (
                                        <div className="bg-white/10 backdrop-blur p-3 rounded-lg">
                                            <div className="text-sm opacity-90">Warnings</div>
                                            <div className="text-3xl font-bold text-yellow-200">{warningCount}</div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Errors List */}
                        {result && result.errors.length > 0 && (
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur max-h-96 overflow-y-auto">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Issues Found</h3>
                                <div className="space-y-3">
                                    {result.errors.map((err, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-3 rounded-lg border-l-4 ${err.severity === 'error'
                                                    ? 'bg-red-50 border-red-500'
                                                    : 'bg-yellow-50 border-yellow-500'
                                                }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                {err.severity === 'error' ? (
                                                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                                )}
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm text-slate-800">
                                                        Line {err.line}
                                                    </div>
                                                    <div className="text-sm text-slate-600 mt-1">
                                                        {err.error}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Format Guide */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                            <div className="flex items-center gap-2 mb-4">
                                <Info className="w-5 h-5 text-indigo-600" />
                                <h3 className="text-lg font-semibold text-slate-800">Format Guide</h3>
                            </div>

                            <div className="space-y-4 text-sm text-slate-700">
                                <div>
                                    <div className="font-semibold text-indigo-600 mb-1">OpenAI Format</div>
                                    <code className="text-xs bg-white p-2 rounded block overflow-x-auto">
                                        {`{"messages": [...]}`}
                                    </code>
                                    <div className="text-xs text-slate-600 mt-1">
                                        Each message needs: role, content
                                    </div>
                                </div>

                                <div>
                                    <div className="font-semibold text-purple-600 mb-1">HuggingFace Format</div>
                                    <code className="text-xs bg-white p-2 rounded block overflow-x-auto">
                                        {`{"text": "...", "label": 0}`}
                                    </code>
                                    <div className="text-xs text-slate-600 mt-1">
                                        Common for classification tasks
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-indigo-200">
                                    <div className="font-semibold mb-2">Best Practices</div>
                                    <ul className="text-xs space-y-1 list-disc list-inside text-slate-600">
                                        <li>One JSON object per line</li>
                                        <li>No trailing commas</li>
                                        <li>Consistent field names</li>
                                        <li>Include system messages (OpenAI)</li>
                                        <li>Validate before uploading</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
