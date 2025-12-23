'use client';

import { useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';

export type AIModel = {
    id: string;
    name: string;
    provider: 'OpenAI' | 'Anthropic' | 'Google' | 'Ollama' | 'Mistral';
    contextWindow: number;
    inputCost: number; // per 1M tokens
    outputCost: number; // per 1M tokens
    color: string;
};

export const AI_MODELS: AIModel[] = [
    // OpenAI Models
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        contextWindow: 128000,
        inputCost: 2.50,
        outputCost: 10.00,
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        provider: 'OpenAI',
        contextWindow: 128000,
        inputCost: 0.15,
        outputCost: 0.60,
        color: 'from-green-400 to-teal-500'
    },
    {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'OpenAI',
        contextWindow: 128000,
        inputCost: 10.00,
        outputCost: 30.00,
        color: 'from-purple-500 to-pink-600'
    },
    {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'OpenAI',
        contextWindow: 16385,
        inputCost: 0.50,
        outputCost: 1.50,
        color: 'from-blue-400 to-cyan-500'
    },
    // Anthropic Models
    {
        id: 'claude-3-5-sonnet-20241022',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        contextWindow: 200000,
        inputCost: 3.00,
        outputCost: 15.00,
        color: 'from-orange-500 to-red-600'
    },
    {
        id: 'claude-3-haiku-20240307',
        name: 'Claude 3 Haiku',
        provider: 'Anthropic',
        contextWindow: 200000,
        inputCost: 0.25,
        outputCost: 1.25,
        color: 'from-orange-400 to-amber-500'
    },
    {
        id: 'claude-3-opus-20240229',
        name: 'Claude 3 Opus',
        provider: 'Anthropic',
        contextWindow: 200000,
        inputCost: 15.00,
        outputCost: 75.00,
        color: 'from-red-500 to-rose-600'
    },
    // Google Models
    {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'Google',
        contextWindow: 2000000,
        inputCost: 1.25,
        outputCost: 5.00,
        color: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        provider: 'Google',
        contextWindow: 1000000,
        inputCost: 0.075,
        outputCost: 0.30,
        color: 'from-blue-400 to-cyan-500'
    },
    // Mistral Models
    {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        provider: 'Mistral',
        contextWindow: 128000,
        inputCost: 2.00,
        outputCost: 6.00,
        color: 'from-violet-500 to-purple-600'
    },
    {
        id: 'mistral-small-latest',
        name: 'Mistral Small',
        provider: 'Mistral',
        contextWindow: 32000,
        inputCost: 0.20,
        outputCost: 0.60,
        color: 'from-violet-400 to-purple-500'
    },
];

type ModelSelectorProps = {
    selectedModel: string;
    onModelChange: (modelId: string) => void;
    showCost?: boolean;
    compact?: boolean;
    className?: string;
};

export default function ModelSelector({
    selectedModel,
    onModelChange,
    showCost = true,
    compact = false,
    className = ''
}: ModelSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selected = AI_MODELS.find(m => m.id === selectedModel) || AI_MODELS[0];

    return (
        <div className={`relative ${className}`}>
            {/* Selected Model Display */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between ${compact ? 'p-2' : 'p-3'
                    } bg-white border-2 border-slate-200 rounded-lg hover:border-indigo-400 transition-all`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 bg-gradient-to-r ${selected.color} rounded-lg`}>
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                        <div className="font-semibold text-slate-800">{selected.name}</div>
                        {!compact && (
                            <div className="text-xs text-slate-500">
                                {selected.provider} • {(selected.contextWindow / 1000).toFixed(0)}K context
                            </div>
                        )}
                    </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
                        {AI_MODELS.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => {
                                    onModelChange(model.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full p-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 ${model.id === selectedModel ? 'bg-indigo-50' : ''
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 bg-gradient-to-r ${model.color} rounded-lg`}>
                                            <Zap className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800">{model.name}</div>
                                            <div className="text-xs text-slate-500">
                                                {model.provider} • {(model.contextWindow / 1000).toFixed(0)}K tokens
                                            </div>
                                            {showCost && (
                                                <div className="text-xs text-slate-600 mt-1">
                                                    ${model.inputCost}/1M in • ${model.outputCost}/1M out
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {model.id === selectedModel && (
                                        <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
