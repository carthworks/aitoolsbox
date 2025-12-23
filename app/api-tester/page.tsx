'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Zap, Clock, DollarSign, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';
import ModelSelector, { AI_MODELS, AIModel } from '@/components/shared/ModelSelector';
import CostDisplay from '@/components/shared/CostDisplay';
import LoadingState from '@/components/shared/LoadingState';

type APIResponse = {
    modelId: string;
    response: string;
    inputTokens: number;
    outputTokens: number;
    latency: number;
    timestamp: number;
    error?: string;
};

type ComparisonMode = 'single' | 'compare';

export default function APITesterPage() {
    const [prompt, setPrompt] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant.');
    const [selectedModel, setSelectedModel] = useState('gpt-4o');
    const [compareModels, setCompareModels] = useState<string[]>(['gpt-4o', 'claude-3-5-sonnet-20241022']);
    const [mode, setMode] = useState<ComparisonMode>('single');

    const [temperature, setTemperature] = useState(0.7);
    const [maxTokens, setMaxTokens] = useState(1000);
    const [topP, setTopP] = useState(1.0);

    const [responses, setResponses] = useState<APIResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const handleSend = async () => {
        if (!prompt.trim()) {
            alert('Please enter a prompt');
            return;
        }

        setIsLoading(true);
        setResponses([]);

        const modelsToTest = mode === 'single' ? [selectedModel] : compareModels;

        try {
            // Simulate API calls (replace with real API calls)
            const results = await Promise.all(
                modelsToTest.map(async (modelId) => {
                    const startTime = Date.now();

                    // Simulate API delay
                    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

                    const model = AI_MODELS.find(m => m.id === modelId);
                    const inputTokens = Math.ceil(prompt.length / 4);
                    const outputTokens = Math.ceil(maxTokens * (0.5 + Math.random() * 0.5));

                    // Simulate response
                    const mockResponse: APIResponse = {
                        modelId,
                        response: `This is a simulated response from ${model?.name}.\n\nTo enable real API calls:\n1. Add your API keys to .env.local\n2. Implement the /api/llm endpoint\n3. The UI is ready to display real responses!\n\nYour prompt was: "${prompt}"`,
                        inputTokens,
                        outputTokens,
                        latency: Date.now() - startTime,
                        timestamp: Date.now()
                    };

                    return mockResponse;
                })
            );

            setResponses(results);
        } catch (error) {
            console.error('Error calling API:', error);
            setResponses([{
                modelId: selectedModel,
                response: '',
                inputTokens: 0,
                outputTokens: 0,
                latency: 0,
                timestamp: Date.now(),
                error: 'Failed to call API. Please check your configuration.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const addCompareModel = () => {
        if (compareModels.length < 4) {
            const availableModels = AI_MODELS.filter(m => !compareModels.includes(m.id));
            if (availableModels.length > 0) {
                setCompareModels([...compareModels, availableModels[0].id]);
            }
        }
    };

    const removeCompareModel = (index: number) => {
        if (compareModels.length > 2) {
            setCompareModels(compareModels.filter((_, i) => i !== index));
        }
    };

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
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            LLM API Tester
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Test and compare responses from multiple AI models side-by-side
                    </p>
                </motion.div>

                {/* Mode Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <Card className="p-4 shadow-xl border-0 bg-white/80 backdrop-blur">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-700">Mode:</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setMode('single')}
                                    className={`px-4 py-2 rounded-lg transition-all ${mode === 'single'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    Single Model
                                </button>
                                <button
                                    onClick={() => setMode('compare')}
                                    className={`px-4 py-2 rounded-lg transition-all ${mode === 'compare'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    Compare Models
                                </button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Panel - Input & Settings */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Prompt Input */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-600" />
                                Your Prompt
                            </h2>

                            {/* System Prompt */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    System Prompt (Optional)
                                </label>
                                <textarea
                                    value={systemPrompt}
                                    onChange={(e) => setSystemPrompt(e.target.value)}
                                    placeholder="Set the AI's behavior and role..."
                                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                                    rows={2}
                                />
                            </div>

                            {/* User Prompt */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    User Prompt
                                </label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Enter your prompt here... (e.g., 'Explain quantum computing in simple terms')"
                                    className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none font-mono text-sm"
                                    rows={6}
                                />
                                <div className="text-xs text-slate-500 mt-1">
                                    ~{Math.ceil(prompt.length / 4)} tokens
                                </div>
                            </div>

                            {/* Parameters */}
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Temperature: {temperature}
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={temperature}
                                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="text-xs text-slate-500 mt-1">
                                        {temperature < 0.5 ? 'Focused' : temperature < 1 ? 'Balanced' : 'Creative'}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Max Tokens: {maxTokens}
                                    </label>
                                    <input
                                        type="range"
                                        min="100"
                                        max="4000"
                                        step="100"
                                        value={maxTokens}
                                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Top P: {topP}
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={topP}
                                        onChange={(e) => setTopP(parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Send Button */}
                            <Button
                                onClick={handleSend}
                                disabled={isLoading || !prompt.trim()}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <LoadingState variant="dots" size="sm" className="text-white" />
                                        Generating...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Send className="w-5 h-5" />
                                        {mode === 'single' ? 'Send Prompt' : `Compare ${compareModels.length} Models`}
                                    </span>
                                )}
                            </Button>
                        </Card>

                        {/* Responses */}
                        {responses.length > 0 && (
                            <div className="space-y-4">
                                {responses.map((resp, idx) => {
                                    const model = AI_MODELS.find(m => m.id === resp.modelId);
                                    return (
                                        <motion.div
                                            key={`${resp.modelId}-${idx}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                                                {/* Model Header */}
                                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 bg-gradient-to-r ${model?.color} rounded-lg`}>
                                                            <Zap className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-800">{model?.name}</div>
                                                            <div className="text-xs text-slate-500">{model?.provider}</div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopy(resp.response, resp.modelId)}
                                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                                        title="Copy response"
                                                    >
                                                        {copied === resp.modelId ? (
                                                            <Check className="w-4 h-4 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-slate-400" />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Stats */}
                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div className="bg-slate-50 p-3 rounded-lg">
                                                        <div className="flex items-center gap-2 text-slate-600 text-xs mb-1">
                                                            <Clock className="w-3 h-3" />
                                                            Latency
                                                        </div>
                                                        <div className="text-lg font-bold text-slate-800">
                                                            {(resp.latency / 1000).toFixed(2)}s
                                                        </div>
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded-lg">
                                                        <div className="flex items-center gap-2 text-slate-600 text-xs mb-1">
                                                            <Zap className="w-3 h-3" />
                                                            Tokens
                                                        </div>
                                                        <div className="text-lg font-bold text-slate-800">
                                                            {resp.outputTokens.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded-lg">
                                                        <div className="flex items-center gap-2 text-slate-600 text-xs mb-1">
                                                            <DollarSign className="w-3 h-3" />
                                                            Cost
                                                        </div>
                                                        <div className="text-lg font-bold text-slate-800">
                                                            ${((resp.inputTokens / 1_000_000) * (model?.inputCost || 0) +
                                                                (resp.outputTokens / 1_000_000) * (model?.outputCost || 0)).toFixed(6)}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Response */}
                                                {resp.error ? (
                                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                                        <div className="text-sm text-red-800">{resp.error}</div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                        <div className="text-sm text-slate-800 whitespace-pre-wrap font-mono">
                                                            {resp.response}
                                                        </div>
                                                    </div>
                                                )}
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}

                        {isLoading && (
                            <Card className="p-12 shadow-xl border-0 bg-white/80 backdrop-blur">
                                <LoadingState variant="thinking" message="Generating responses" size="lg" />
                            </Card>
                        )}
                    </div>

                    {/* Right Panel - Model Selection & Info */}
                    <div className="space-y-6">
                        {mode === 'single' ? (
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Model</h3>
                                <ModelSelector
                                    selectedModel={selectedModel}
                                    onModelChange={setSelectedModel}
                                    showCost={true}
                                />
                            </Card>
                        ) : (
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-slate-800">Compare Models</h3>
                                    {compareModels.length < 4 && (
                                        <button
                                            onClick={addCompareModel}
                                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                        >
                                            + Add Model
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    {compareModels.map((modelId, idx) => (
                                        <div key={idx} className="relative">
                                            <ModelSelector
                                                selectedModel={modelId}
                                                onModelChange={(newId) => {
                                                    const updated = [...compareModels];
                                                    updated[idx] = newId;
                                                    setCompareModels(updated);
                                                }}
                                                showCost={false}
                                                compact={true}
                                            />
                                            {compareModels.length > 2 && (
                                                <button
                                                    onClick={() => removeCompareModel(idx)}
                                                    className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Cost Estimate */}
                        {responses.length > 0 && (
                            <CostDisplay
                                inputTokens={responses.reduce((sum, r) => sum + r.inputTokens, 0)}
                                outputTokens={responses.reduce((sum, r) => sum + r.outputTokens, 0)}
                                inputCostPerMillion={AI_MODELS.find(m => m.id === (mode === 'single' ? selectedModel : compareModels[0]))?.inputCost || 0}
                                outputCostPerMillion={AI_MODELS.find(m => m.id === (mode === 'single' ? selectedModel : compareModels[0]))?.outputCost || 0}
                                modelName={mode === 'compare' ? 'Average' : undefined}
                                showBreakdown={true}
                            />
                        )}

                        {/* Info Card */}
                        <Card className="p-4 shadow-lg border-0 bg-amber-50">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800">
                                    <strong>Demo Mode:</strong> This is showing simulated responses. To enable real API calls:
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Add API keys to .env.local</li>
                                        <li>Implement /api/llm endpoint</li>
                                        <li>Install SDK packages</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
