'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Lightbulb, Brain, Zap, Code, Sparkles } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

type Term = {
    term: string;
    category: string;
    definition: string;
    example?: string;
    relatedTerms?: string[];
};

const AI_TERMS: Term[] = [
    {
        term: "Transformer",
        category: "Architecture",
        definition: "A neural network architecture that uses self-attention mechanisms to process sequential data. Introduced in the 'Attention is All You Need' paper (2017), it forms the basis of modern LLMs like GPT and BERT.",
        example: "GPT-4 uses a transformer architecture with billions of parameters.",
        relatedTerms: ["Attention", "Self-Attention", "Encoder-Decoder"]
    },
    {
        term: "Fine-Tuning",
        category: "Training",
        definition: "The process of taking a pre-trained model and training it further on a specific dataset to adapt it for a particular task or domain.",
        example: "Fine-tuning GPT-3.5 on customer support conversations to create a specialized chatbot.",
        relatedTerms: ["Transfer Learning", "LoRA", "PEFT"]
    },
    {
        term: "LoRA (Low-Rank Adaptation)",
        category: "Training",
        definition: "A parameter-efficient fine-tuning technique that freezes the original model weights and trains small adapter layers, reducing memory requirements by up to 90%.",
        example: "Training a 7B model with LoRA requires only 12GB VRAM instead of 80GB.",
        relatedTerms: ["QLoRA", "PEFT", "Adapter Layers"]
    },
    {
        term: "Prompt Engineering",
        category: "Usage",
        definition: "The practice of designing and optimizing text prompts to get desired outputs from language models. Includes techniques like few-shot learning, chain-of-thought, and role-playing.",
        example: "Using 'Think step-by-step' to improve reasoning in math problems.",
        relatedTerms: ["Few-Shot Learning", "Chain-of-Thought", "System Prompt"]
    },
    {
        term: "RAG (Retrieval Augmented Generation)",
        category: "Architecture",
        definition: "A technique that combines information retrieval with language generation. The model retrieves relevant documents from a knowledge base before generating a response.",
        example: "A chatbot that searches company docs before answering employee questions.",
        relatedTerms: ["Vector Database", "Embeddings", "Semantic Search"]
    },
    {
        term: "Token",
        category: "Fundamentals",
        definition: "The basic unit of text that a language model processes. Roughly 4 characters or 0.75 words in English. Models have maximum token limits (context windows).",
        example: "The sentence 'Hello world!' is approximately 3 tokens.",
        relatedTerms: ["Tokenization", "Context Window", "BPE"]
    },
    {
        term: "Temperature",
        category: "Parameters",
        definition: "A parameter (0-2) that controls randomness in model outputs. Lower values (0.1-0.5) make outputs more focused and deterministic, higher values (0.8-1.5) make them more creative.",
        example: "Use temperature=0.2 for factual Q&A, temperature=1.0 for creative writing.",
        relatedTerms: ["Top-K", "Top-P", "Sampling"]
    },
    {
        term: "Hallucination",
        category: "Challenges",
        definition: "When a language model generates false or nonsensical information that sounds plausible. A major challenge in deploying LLMs for factual tasks.",
        example: "A model inventing fake citations or making up historical events.",
        relatedTerms: ["Grounding", "Factuality", "RAG"]
    },
    {
        term: "Embeddings",
        category: "Fundamentals",
        definition: "Dense vector representations of text that capture semantic meaning. Similar texts have similar embeddings, enabling semantic search and clustering.",
        example: "Converting 'dog' and 'puppy' into vectors that are close in embedding space.",
        relatedTerms: ["Vector Database", "Semantic Search", "Cosine Similarity"]
    },
    {
        term: "Context Window",
        category: "Fundamentals",
        definition: "The maximum number of tokens a model can process at once (input + output). Modern models range from 4K (GPT-3.5) to 2M (Gemini 1.5 Pro).",
        example: "GPT-4 Turbo has a 128K context window, allowing ~96,000 words of input.",
        relatedTerms: ["Token", "Attention", "Long Context"]
    },
    {
        term: "Few-Shot Learning",
        category: "Usage",
        definition: "Providing a model with a few examples in the prompt to demonstrate the desired task, without fine-tuning.",
        example: "Showing 3 examples of sentiment classification before asking the model to classify new text.",
        relatedTerms: ["Zero-Shot", "In-Context Learning", "Prompt Engineering"]
    },
    {
        term: "Chain-of-Thought (CoT)",
        category: "Usage",
        definition: "A prompting technique where you ask the model to show its reasoning step-by-step, improving performance on complex tasks.",
        example: "Adding 'Let's think step by step' to math word problems.",
        relatedTerms: ["Reasoning", "Prompt Engineering", "Tree of Thoughts"]
    },
    {
        term: "Quantization",
        category: "Optimization",
        definition: "Reducing the precision of model weights (e.g., from 16-bit to 4-bit) to decrease memory usage and increase inference speed, with minimal accuracy loss.",
        example: "QLoRA uses 4-bit quantization to fine-tune 70B models on consumer GPUs.",
        relatedTerms: ["QLoRA", "INT8", "GPTQ"]
    },
    {
        term: "RLHF (Reinforcement Learning from Human Feedback)",
        category: "Training",
        definition: "A training method where human preferences are used to fine-tune models, making them more helpful, harmless, and honest.",
        example: "ChatGPT was trained using RLHF to align with human values.",
        relatedTerms: ["Alignment", "PPO", "Reward Model"]
    },
    {
        term: "System Prompt",
        category: "Usage",
        definition: "The initial instruction that sets the model's behavior, role, and constraints. Not visible to end users but crucial for consistent outputs.",
        example: "'You are a helpful Python tutor. Always explain concepts simply and provide code examples.'",
        relatedTerms: ["Prompt Engineering", "Role-Playing", "Instructions"]
    },
];

const CATEGORIES = ["All", "Fundamentals", "Architecture", "Training", "Usage", "Parameters", "Challenges", "Optimization"];

export default function AIGlossaryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

    const filteredTerms = AI_TERMS.filter(term => {
        const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
            term.definition.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            AI & LLM Glossary
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Learn essential AI terminology with clear definitions and practical examples
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search terms or definitions..."
                                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {CATEGORIES.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${selectedCategory === category
                                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-slate-600">
                            Showing {filteredTerms.length} of {AI_TERMS.length} terms
                        </div>
                    </Card>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Terms List */}
                    <div className="lg:col-span-2 space-y-4 max-h-[800px] overflow-y-auto pr-2">
                        <AnimatePresence mode="popLayout">
                            {filteredTerms.map((term, idx) => (
                                <motion.div
                                    key={term.term}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Card
                                        onClick={() => setSelectedTerm(term)}
                                        className={`p-6 cursor-pointer transition-all hover:shadow-xl ${selectedTerm?.term === term.term
                                                ? 'border-2 border-violet-500 bg-violet-50'
                                                : 'border border-slate-200 bg-white/80 backdrop-blur hover:border-violet-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 mb-1">
                                                    {term.term}
                                                </h3>
                                                <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">
                                                    {term.category}
                                                </span>
                                            </div>
                                            <Lightbulb className="w-6 h-6 text-violet-600 flex-shrink-0" />
                                        </div>

                                        <p className="text-slate-700 leading-relaxed">
                                            {term.definition}
                                        </p>

                                        {term.example && (
                                            <div className="mt-3 p-3 bg-slate-50 rounded-lg border-l-4 border-violet-500">
                                                <div className="text-xs text-slate-500 mb-1 font-semibold">Example:</div>
                                                <div className="text-sm text-slate-700 italic">"{term.example}"</div>
                                            </div>
                                        )}
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredTerms.length === 0 && (
                            <div className="text-center py-12">
                                <Brain className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500">No terms found. Try a different search.</p>
                            </div>
                        )}
                    </div>

                    {/* Selected Term Detail */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        {selectedTerm ? (
                            <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <Sparkles className="w-6 h-6" />
                                    <h3 className="text-2xl font-bold">{selectedTerm.term}</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                        <div className="text-sm opacity-90 mb-2">Category</div>
                                        <div className="text-lg font-semibold">{selectedTerm.category}</div>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                        <div className="text-sm opacity-90 mb-2">Definition</div>
                                        <div className="leading-relaxed">{selectedTerm.definition}</div>
                                    </div>

                                    {selectedTerm.example && (
                                        <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                            <div className="text-sm opacity-90 mb-2">Example</div>
                                            <div className="italic">"{selectedTerm.example}"</div>
                                        </div>
                                    )}

                                    {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                                        <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                            <div className="text-sm opacity-90 mb-2">Related Terms</div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTerm.relatedTerms.map((related) => (
                                                    <button
                                                        key={related}
                                                        onClick={() => {
                                                            const term = AI_TERMS.find(t => t.term === related);
                                                            if (term) setSelectedTerm(term);
                                                        }}
                                                        className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-colors"
                                                    >
                                                        {related}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ) : (
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur text-center">
                                <Brain className="w-16 h-16 text-violet-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                    Select a Term
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Click on any term to see detailed information and related concepts
                                </p>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 grid md:grid-cols-4 gap-4"
                >
                    {CATEGORIES.slice(1).map((category, idx) => {
                        const count = AI_TERMS.filter(t => t.category === category).length;
                        const colors = [
                            'from-blue-500 to-indigo-600',
                            'from-purple-500 to-pink-600',
                            'from-green-500 to-emerald-600',
                            'from-orange-500 to-red-600',
                            'from-cyan-500 to-teal-600',
                            'from-yellow-500 to-amber-600',
                            'from-violet-500 to-purple-600',
                        ];
                        return (
                            <Card
                                key={category}
                                className={`p-4 shadow-lg border-0 bg-gradient-to-br ${colors[idx % colors.length]} text-white cursor-pointer hover:scale-105 transition-transform`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <div className="text-sm opacity-90 mb-1">{category}</div>
                                <div className="text-3xl font-bold">{count}</div>
                                <div className="text-xs opacity-75 mt-1">terms</div>
                            </Card>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
