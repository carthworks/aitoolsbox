'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, FileText, Copy, Download, Settings, Info, Layers, Zap } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

type Chunk = {
    id: number;
    text: string;
    startIndex: number;
    endIndex: number;
    tokenCount: number;
    overlapWith?: number[];
};

const SAMPLE_TEXT = `Artificial Intelligence (AI) has revolutionized the way we interact with technology. Machine learning, a subset of AI, enables computers to learn from data without being explicitly programmed. Deep learning, which uses neural networks with multiple layers, has achieved remarkable success in image recognition, natural language processing, and game playing.

Large Language Models (LLMs) like GPT-4 and Claude represent a significant breakthrough in AI. These models are trained on vast amounts of text data and can generate human-like responses, answer questions, and even write code. The transformer architecture, introduced in 2017, has been fundamental to their success.

Retrieval Augmented Generation (RAG) is a technique that combines the power of LLMs with external knowledge bases. By retrieving relevant information from a database and providing it as context to the model, RAG systems can produce more accurate and up-to-date responses. This approach is particularly useful for domain-specific applications where the model needs access to specialized knowledge.`;

export default function RAGChunkingPage() {
    const [text, setText] = useState(SAMPLE_TEXT);
    const [chunkSize, setChunkSize] = useState(512);
    const [overlap, setOverlap] = useState(50);
    const [chunks, setChunks] = useState<Chunk[]>([]);
    const [selectedChunk, setSelectedChunk] = useState<number | null>(null);
    const [splitter, setSplitter] = useState<'token' | 'sentence' | 'paragraph'>('token');

    useEffect(() => {
        generateChunks();
    }, [text, chunkSize, overlap, splitter]);

    const estimateTokens = (text: string): number => {
        return Math.ceil(text.length / 4);
    };

    const generateChunks = () => {
        if (!text.trim()) {
            setChunks([]);
            return;
        }

        const newChunks: Chunk[] = [];
        let currentIndex = 0;
        let chunkId = 0;

        if (splitter === 'paragraph') {
            // Split by paragraphs
            const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
            paragraphs.forEach((para, idx) => {
                const tokens = estimateTokens(para);
                newChunks.push({
                    id: idx,
                    text: para.trim(),
                    startIndex: text.indexOf(para),
                    endIndex: text.indexOf(para) + para.length,
                    tokenCount: tokens,
                    overlapWith: []
                });
            });
        } else if (splitter === 'sentence') {
            // Split by sentences
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            let currentChunk = '';
            let chunkStart = 0;

            sentences.forEach((sentence, idx) => {
                const potentialChunk = currentChunk + sentence;
                const tokens = estimateTokens(potentialChunk);

                if (tokens > chunkSize && currentChunk) {
                    // Save current chunk
                    newChunks.push({
                        id: chunkId++,
                        text: currentChunk.trim(),
                        startIndex: chunkStart,
                        endIndex: chunkStart + currentChunk.length,
                        tokenCount: estimateTokens(currentChunk),
                        overlapWith: []
                    });
                    currentChunk = sentence;
                    chunkStart = text.indexOf(sentence, chunkStart);
                } else {
                    currentChunk = potentialChunk;
                }
            });

            if (currentChunk.trim()) {
                newChunks.push({
                    id: chunkId++,
                    text: currentChunk.trim(),
                    startIndex: chunkStart,
                    endIndex: chunkStart + currentChunk.length,
                    tokenCount: estimateTokens(currentChunk),
                    overlapWith: []
                });
            }
        } else {
            // Token-based splitting with overlap
            const words = text.split(/\s+/);
            const wordsPerChunk = Math.floor(chunkSize / 4); // Approximate
            const overlapWords = Math.floor(overlap / 4);

            while (currentIndex < words.length) {
                const chunkWords = words.slice(currentIndex, currentIndex + wordsPerChunk);
                const chunkText = chunkWords.join(' ');
                const startPos = text.indexOf(chunkWords[0], currentIndex > 0 ? chunks[chunks.length - 1]?.endIndex || 0 : 0);

                newChunks.push({
                    id: chunkId++,
                    text: chunkText,
                    startIndex: startPos,
                    endIndex: startPos + chunkText.length,
                    tokenCount: estimateTokens(chunkText),
                    overlapWith: currentIndex > 0 ? [chunkId - 2] : []
                });

                currentIndex += wordsPerChunk - overlapWords;

                if (currentIndex >= words.length) break;
            }
        }

        setChunks(newChunks);
    };

    const copyChunk = (chunk: Chunk) => {
        navigator.clipboard.writeText(chunk.text);
    };

    const downloadChunks = () => {
        const content = chunks.map((c, idx) =>
            `=== Chunk ${idx + 1} (${c.tokenCount} tokens) ===\n${c.text}\n`
        ).join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chunks-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getChunkColor = (index: number) => {
        const colors = [
            'from-blue-400 to-indigo-500',
            'from-purple-400 to-pink-500',
            'from-green-400 to-emerald-500',
            'from-orange-400 to-red-500',
            'from-cyan-400 to-teal-500',
            'from-yellow-400 to-amber-500',
        ];
        return colors[index % colors.length];
    };

    const totalTokens = chunks.reduce((sum, c) => sum + c.tokenCount, 0);
    const avgTokensPerChunk = chunks.length > 0 ? Math.round(totalTokens / chunks.length) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                            <Scissors className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            RAG Chunking Visualizer
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Visualize how your documents will be split for Retrieval Augmented Generation
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Settings Panel */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center gap-2 mb-4">
                                <Settings className="w-5 h-5 text-cyan-600" />
                                <h2 className="text-xl font-semibold text-slate-800">Chunking Settings</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Chunk Size (tokens)
                                    </label>
                                    <input
                                        type="range"
                                        min="128"
                                        max="2048"
                                        step="128"
                                        value={chunkSize}
                                        onChange={(e) => setChunkSize(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="text-center mt-2 text-2xl font-bold text-cyan-600">
                                        {chunkSize}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Overlap (tokens)
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="512"
                                        step="50"
                                        value={overlap}
                                        onChange={(e) => setOverlap(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="text-center mt-2 text-2xl font-bold text-purple-600">
                                        {overlap}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Split Strategy
                                    </label>
                                    <select
                                        value={splitter}
                                        onChange={(e) => setSplitter(e.target.value as any)}
                                        className="w-full p-2 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                                    >
                                        <option value="token">Token-based</option>
                                        <option value="sentence">Sentence-based</option>
                                        <option value="paragraph">Paragraph-based</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                                <Button
                                    onClick={downloadChunks}
                                    variant="outline"
                                    disabled={chunks.length === 0}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Chunks
                                </Button>

                                <Button
                                    onClick={() => setText(SAMPLE_TEXT)}
                                    variant="outline"
                                >
                                    Load Sample
                                </Button>
                            </div>
                        </Card>

                        {/* Input Text */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-cyan-600" />
                                    <h2 className="text-xl font-semibold text-slate-800">Source Document</h2>
                                </div>
                                <div className="text-sm text-slate-500">
                                    {estimateTokens(text)} tokens
                                </div>
                            </div>

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste your document here to see how it will be chunked..."
                                className="w-full h-64 p-4 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all resize-none"
                            />
                        </Card>

                        {/* Chunks Visualization */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="w-5 h-5 text-cyan-600" />
                                <h2 className="text-xl font-semibold text-slate-800">Chunks Preview</h2>
                                <span className="ml-auto text-sm text-slate-500">
                                    {chunks.length} chunks generated
                                </span>
                            </div>

                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                <AnimatePresence>
                                    {chunks.map((chunk, idx) => (
                                        <motion.div
                                            key={chunk.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ delay: idx * 0.05 }}
                                            onClick={() => setSelectedChunk(chunk.id)}
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedChunk === chunk.id
                                                    ? 'border-cyan-500 bg-cyan-50'
                                                    : 'border-slate-200 bg-white hover:border-cyan-300'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getChunkColor(idx)} flex items-center justify-center text-white font-bold text-sm`}>
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-800">
                                                            Chunk {idx + 1}
                                                        </div>
                                                        <div className="text-xs text-slate-500">
                                                            {chunk.tokenCount} tokens
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        copyChunk(chunk);
                                                    }}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                </Button>
                                            </div>

                                            <div className="text-sm text-slate-700 line-clamp-3">
                                                {chunk.text}
                                            </div>

                                            {chunk.overlapWith && chunk.overlapWith.length > 0 && (
                                                <div className="mt-2 text-xs text-purple-600 flex items-center gap-1">
                                                    <Zap className="w-3 h-3" />
                                                    Overlaps with chunk {chunk.overlapWith.map(id => id + 1).join(', ')}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar - Stats */}
                    <div className="space-y-6">
                        {/* Statistics */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5" />
                                Chunking Statistics
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Total Chunks</div>
                                    <div className="text-4xl font-bold">{chunks.length}</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Total Tokens</div>
                                    <div className="text-4xl font-bold">{totalTokens.toLocaleString()}</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Avg Tokens/Chunk</div>
                                    <div className="text-4xl font-bold">{avgTokensPerChunk}</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                    <div className="text-sm opacity-90 mb-1">Overlap Percentage</div>
                                    <div className="text-4xl font-bold">
                                        {chunkSize > 0 ? Math.round((overlap / chunkSize) * 100) : 0}%
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Selected Chunk Detail */}
                        {selectedChunk !== null && chunks[selectedChunk] && (
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                    Chunk {selectedChunk + 1} Details
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div>
                                        <div className="text-slate-600 mb-1">Token Count</div>
                                        <div className="font-semibold text-lg text-cyan-600">
                                            {chunks[selectedChunk].tokenCount}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-slate-600 mb-1">Character Count</div>
                                        <div className="font-semibold text-lg">
                                            {chunks[selectedChunk].text.length}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-slate-600 mb-1">Position</div>
                                        <div className="font-semibold">
                                            {chunks[selectedChunk].startIndex} - {chunks[selectedChunk].endIndex}
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t">
                                        <div className="text-slate-600 mb-2">Full Text</div>
                                        <div className="bg-slate-50 p-3 rounded-lg text-xs max-h-48 overflow-y-auto">
                                            {chunks[selectedChunk].text}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Info Card */}
                        <Card className="p-4 shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50">
                            <div className="flex gap-3">
                                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800">
                                    <strong>Chunking Tips:</strong>
                                    <ul className="mt-2 space-y-1 list-disc list-inside">
                                        <li>Use 512-1024 tokens for most RAG systems</li>
                                        <li>Add 10-20% overlap to preserve context</li>
                                        <li>Sentence splitting works well for Q&A</li>
                                        <li>Paragraph splitting for structured docs</li>
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
