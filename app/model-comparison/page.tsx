'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Check, X, DollarSign, Zap, Brain, Globe } from 'lucide-react';
import { Card } from '@/components/components/ui/card';

type Model = {
    name: string;
    provider: string;
    contextWindow: string;
    inputCost: string;
    outputCost: string;
    speed: 'Fast' | 'Medium' | 'Slow';
    multimodal: boolean;
    openSource: boolean;
    apiAvailable: boolean;
    bestFor: string[];
    color: string;
};

const MODELS: Model[] = [
    {
        name: "GPT-4o",
        provider: "OpenAI",
        contextWindow: "128K",
        inputCost: "$2.50/1M",
        outputCost: "$10.00/1M",
        speed: "Fast",
        multimodal: true,
        openSource: false,
        apiAvailable: true,
        bestFor: ["Complex reasoning", "Multimodal tasks", "Production apps"],
        color: "from-green-500 to-emerald-600"
    },
    {
        name: "GPT-4o-mini",
        provider: "OpenAI",
        contextWindow: "128K",
        inputCost: "$0.15/1M",
        outputCost: "$0.60/1M",
        speed: "Fast",
        multimodal: true,
        openSource: false,
        apiAvailable: true,
        bestFor: ["Cost-effective", "High-volume tasks", "Chatbots"],
        color: "from-green-400 to-teal-500"
    },
    {
        name: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        contextWindow: "200K",
        inputCost: "$3.00/1M",
        outputCost: "$15.00/1M",
        speed: "Fast",
        multimodal: true,
        openSource: false,
        apiAvailable: true,
        bestFor: ["Long context", "Code generation", "Analysis"],
        color: "from-orange-500 to-red-600"
    },
    {
        name: "Claude 3 Haiku",
        provider: "Anthropic",
        contextWindow: "200K",
        inputCost: "$0.25/1M",
        outputCost: "$1.25/1M",
        speed: "Fast",
        multimodal: true,
        openSource: false,
        apiAvailable: true,
        bestFor: ["Fast responses", "Budget-friendly", "Simple tasks"],
        color: "from-orange-400 to-amber-500"
    },
    {
        name: "Gemini 1.5 Pro",
        provider: "Google",
        contextWindow: "2M",
        inputCost: "$1.25/1M",
        outputCost: "$5.00/1M",
        speed: "Medium",
        multimodal: true,
        openSource: false,
        apiAvailable: true,
        bestFor: ["Massive context", "Document analysis", "Video understanding"],
        color: "from-blue-500 to-indigo-600"
    },
    {
        name: "Gemini 1.5 Flash",
        provider: "Google",
        contextWindow: "1M",
        inputCost: "$0.075/1M",
        outputCost: "$0.30/1M",
        speed: "Fast",
        multimodal: true,
        openSource: false,
        apiAvailable: true,
        bestFor: ["Ultra-fast", "Cheapest option", "High throughput"],
        color: "from-blue-400 to-cyan-500"
    },
    {
        name: "Llama 3.1 70B",
        provider: "Meta",
        contextWindow: "128K",
        inputCost: "Free (self-host)",
        outputCost: "Free (self-host)",
        speed: "Medium",
        multimodal: false,
        openSource: true,
        apiAvailable: true,
        bestFor: ["Self-hosting", "Privacy", "Customization"],
        color: "from-purple-500 to-pink-600"
    },
    {
        name: "Llama 3.1 8B",
        provider: "Meta",
        contextWindow: "128K",
        inputCost: "Free (self-host)",
        outputCost: "Free (self-host)",
        speed: "Fast",
        multimodal: false,
        openSource: true,
        apiAvailable: true,
        bestFor: ["Local deployment", "Edge devices", "Learning"],
        color: "from-purple-400 to-fuchsia-500"
    },
    {
        name: "Mistral Large",
        provider: "Mistral AI",
        contextWindow: "128K",
        inputCost: "$2.00/1M",
        outputCost: "$6.00/1M",
        speed: "Fast",
        multimodal: false,
        openSource: false,
        apiAvailable: true,
        bestFor: ["European compliance", "Multilingual", "Code"],
        color: "from-indigo-500 to-purple-600"
    },
    {
        name: "Mixtral 8x7B",
        provider: "Mistral AI",
        contextWindow: "32K",
        inputCost: "Free (self-host)",
        outputCost: "Free (self-host)",
        speed: "Fast",
        multimodal: false,
        openSource: true,
        apiAvailable: true,
        bestFor: ["Open source", "Mixture of Experts", "Cost-effective"],
        color: "from-indigo-400 to-blue-500"
    },
];

export default function ModelComparisonPage() {
    const [selectedModels, setSelectedModels] = useState<string[]>([MODELS[0].name, MODELS[2].name]);
    const [filterOpenSource, setFilterOpenSource] = useState<boolean | null>(null);
    const [filterMultimodal, setFilterMultimodal] = useState<boolean | null>(null);

    const toggleModel = (modelName: string) => {
        if (selectedModels.includes(modelName)) {
            setSelectedModels(selectedModels.filter(m => m !== modelName));
        } else if (selectedModels.length < 4) {
            setSelectedModels([...selectedModels, modelName]);
        }
    };

    const filteredModels = MODELS.filter(model => {
        if (filterOpenSource !== null && model.openSource !== filterOpenSource) return false;
        if (filterMultimodal !== null && model.multimodal !== filterMultimodal) return false;
        return true;
    });

    const comparisonModels = MODELS.filter(m => selectedModels.includes(m.name));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg">
                            <GitCompare className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            LLM Model Comparison
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Compare popular language models by cost, context window, speed, and capabilities
                    </p>
                </motion.div>

                {/* Filters */}
                <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur mb-8">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="text-sm font-semibold text-slate-700">Filters:</div>

                        <button
                            onClick={() => setFilterOpenSource(filterOpenSource === true ? null : true)}
                            className={`px-4 py-2 rounded-lg transition-all ${filterOpenSource === true
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            Open Source Only
                        </button>

                        <button
                            onClick={() => setFilterMultimodal(filterMultimodal === true ? null : true)}
                            className={`px-4 py-2 rounded-lg transition-all ${filterMultimodal === true
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            Multimodal Only
                        </button>

                        <button
                            onClick={() => {
                                setFilterOpenSource(null);
                                setFilterMultimodal(null);
                            }}
                            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all ml-auto"
                        >
                            Clear Filters
                        </button>

                        <div className="text-sm text-slate-600">
                            Selected: {selectedModels.length}/4 models
                        </div>
                    </div>
                </Card>

                {/* Model Selection Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {filteredModels.map((model) => {
                        const isSelected = selectedModels.includes(model.name);
                        return (
                            <Card
                                key={model.name}
                                onClick={() => toggleModel(model.name)}
                                className={`p-4 cursor-pointer transition-all ${isSelected
                                        ? `border-2 border-transparent bg-gradient-to-br ${model.color} text-white shadow-xl scale-105`
                                        : 'border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                            {model.name}
                                        </h3>
                                        <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                                            {model.provider}
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <Check className="w-5 h-5 flex-shrink-0" />
                                    )}
                                </div>

                                <div className={`text-xs space-y-1 ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
                                    <div>Context: {model.contextWindow}</div>
                                    <div className="flex gap-2">
                                        {model.openSource && <span className="px-2 py-0.5 bg-white/20 rounded-full">Open</span>}
                                        {model.multimodal && <span className="px-2 py-0.5 bg-white/20 rounded-full">MM</span>}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Comparison Table */}
                {comparisonModels.length > 0 && (
                    <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur overflow-x-auto">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Side-by-Side Comparison</h2>

                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-200">
                                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Feature</th>
                                    {comparisonModels.map((model) => (
                                        <th key={model.name} className="text-left py-4 px-4">
                                            <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-br ${model.color} text-white font-bold`}>
                                                {model.name}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="py-4 px-4 font-medium text-slate-700">Provider</td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4 text-slate-600">{model.provider}</td>
                                    ))}
                                </tr>

                                <tr className="bg-slate-50">
                                    <td className="py-4 px-4 font-medium text-slate-700 flex items-center gap-2">
                                        <Brain className="w-4 h-4" />
                                        Context Window
                                    </td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4">
                                            <span className="font-bold text-indigo-600">{model.contextWindow}</span>
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td className="py-4 px-4 font-medium text-slate-700 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Input Cost
                                    </td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4 text-green-600 font-semibold">
                                            {model.inputCost}
                                        </td>
                                    ))}
                                </tr>

                                <tr className="bg-slate-50">
                                    <td className="py-4 px-4 font-medium text-slate-700 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Output Cost
                                    </td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4 text-green-600 font-semibold">
                                            {model.outputCost}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td className="py-4 px-4 font-medium text-slate-700 flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Speed
                                    </td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${model.speed === 'Fast' ? 'bg-green-100 text-green-700' :
                                                    model.speed === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {model.speed}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                <tr className="bg-slate-50">
                                    <td className="py-4 px-4 font-medium text-slate-700">Multimodal</td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4">
                                            {model.multimodal ? (
                                                <Check className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <X className="w-5 h-5 text-slate-300" />
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td className="py-4 px-4 font-medium text-slate-700">Open Source</td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4">
                                            {model.openSource ? (
                                                <Check className="w-5 h-5 text-purple-600" />
                                            ) : (
                                                <X className="w-5 h-5 text-slate-300" />
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                <tr className="bg-slate-50">
                                    <td className="py-4 px-4 font-medium text-slate-700 flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        API Available
                                    </td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4">
                                            {model.apiAvailable ? (
                                                <Check className="w-5 h-5 text-blue-600" />
                                            ) : (
                                                <X className="w-5 h-5 text-slate-300" />
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td className="py-4 px-4 font-medium text-slate-700">Best For</td>
                                    {comparisonModels.map((model) => (
                                        <td key={model.name} className="py-4 px-4">
                                            <div className="flex flex-wrap gap-1">
                                                {model.bestFor.map((use) => (
                                                    <span key={use} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                                                        {use}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                )}

                {comparisonModels.length === 0 && (
                    <Card className="p-12 shadow-xl border-0 bg-white/80 backdrop-blur text-center">
                        <GitCompare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            Select Models to Compare
                        </h3>
                        <p className="text-slate-600">
                            Click on model cards above to add them to the comparison (max 4)
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
