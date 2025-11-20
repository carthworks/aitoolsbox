'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, Download, Zap, Eye, Grid3x3 } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

type DataPoint = {
    text: string;
    embedding: number[];
    x: number;
    y: number;
    z?: number;
    cluster?: number;
};

const SAMPLE_TEXTS = [
    "Machine learning is amazing",
    "Deep learning uses neural networks",
    "I love pizza and pasta",
    "Italian food is delicious",
    "Python is a programming language",
    "JavaScript is used for web development",
    "The weather is sunny today",
    "It's raining outside",
    "Artificial intelligence will change the world",
    "AI models can generate text",
];

// Simple embedding simulation (in real app, use actual embedding API)
function generateMockEmbedding(text: string): number[] {
    const words = text.toLowerCase().split(' ');
    const embedding = new Array(128).fill(0);

    // Simple hash-based embedding for demo
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        for (let j = 0; j < word.length; j++) {
            const charCode = word.charCodeAt(j);
            embedding[j % 128] += charCode * (i + 1);
        }
    }

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
}

// Simple PCA implementation for 2D/3D
function performPCA(embeddings: number[][], dimensions: 2 | 3): number[][] {
    const n = embeddings.length;
    const d = embeddings[0].length;

    // Center the data
    const means = new Array(d).fill(0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < d; j++) {
            means[j] += embeddings[i][j];
        }
    }
    for (let j = 0; j < d; j++) {
        means[j] /= n;
    }

    const centered = embeddings.map(emb =>
        emb.map((val, idx) => val - means[idx])
    );

    // For simplicity, just project onto first few dimensions
    // In real implementation, would compute eigenvectors
    return centered.map(emb => emb.slice(0, dimensions));
}

export default function EmbeddingVisualizerPage() {
    const [texts, setTexts] = useState<string[]>(SAMPLE_TEXTS);
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
    const [dimensions, setDimensions] = useState<2 | 3>(2);
    const [method, setMethod] = useState<'PCA' | 'UMAP'>('PCA');
    const [newText, setNewText] = useState('');
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        visualizeEmbeddings();
    }, [texts, dimensions, method]);

    useEffect(() => {
        drawVisualization();
    }, [dataPoints, hoveredPoint]);

    const visualizeEmbeddings = () => {
        // Generate embeddings
        const embeddings = texts.map(text => generateMockEmbedding(text));

        // Reduce dimensions
        const reduced = performPCA(embeddings, dimensions);

        // Normalize to canvas coordinates
        const points: DataPoint[] = texts.map((text, idx) => {
            const coords = reduced[idx];
            return {
                text,
                embedding: embeddings[idx],
                x: coords[0],
                y: coords[1],
                z: dimensions === 3 ? coords[2] : undefined,
            };
        });

        setDataPoints(points);
    };

    const drawVisualization = () => {
        const canvas = canvasRef.current;
        if (!canvas || dataPoints.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);

        // Find min/max for scaling
        const xValues = dataPoints.map(p => p.x);
        const yValues = dataPoints.map(p => p.y);
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);

        const padding = 50;
        const scaleX = (width - 2 * padding) / (maxX - minX);
        const scaleY = (height - 2 * padding) / (maxY - minY);

        // Draw grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const x = padding + (width - 2 * padding) * i / 10;
            const y = padding + (height - 2 * padding) * i / 10;

            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();

        // Draw points
        dataPoints.forEach((point, idx) => {
            const x = padding + (point.x - minX) * scaleX;
            const y = height - padding - (point.y - minY) * scaleY;

            const isHovered = hoveredPoint === idx;
            const radius = isHovered ? 10 : 6;

            // Draw point
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = isHovered ? '#ec4899' : '#8b5cf6';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw label for hovered point
            if (isHovered) {
                ctx.fillStyle = '#1e293b';
                ctx.font = '12px Inter, sans-serif';
                const textWidth = ctx.measureText(point.text).width;
                ctx.fillRect(x - textWidth / 2 - 5, y - 25, textWidth + 10, 20);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(point.text, x - textWidth / 2, y - 10);
            }
        });

        // Draw axis labels
        ctx.fillStyle = '#64748b';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('Component 1', width / 2 - 40, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Component 2', 0, 0);
        ctx.restore();
    };

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || dataPoints.length === 0) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const width = canvas.width;
        const height = canvas.height;
        const padding = 50;

        const xValues = dataPoints.map(p => p.x);
        const yValues = dataPoints.map(p => p.y);
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);

        const scaleX = (width - 2 * padding) / (maxX - minX);
        const scaleY = (height - 2 * padding) / (maxY - minY);

        let closestIdx = -1;
        let minDist = Infinity;

        dataPoints.forEach((point, idx) => {
            const x = padding + (point.x - minX) * scaleX;
            const y = height - padding - (point.y - minY) * scaleY;
            const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

            if (dist < 15 && dist < minDist) {
                minDist = dist;
                closestIdx = idx;
            }
        });

        setHoveredPoint(closestIdx >= 0 ? closestIdx : null);
    };

    const handleAddText = () => {
        if (newText.trim()) {
            setTexts([...texts, newText.trim()]);
            setNewText('');
        }
    };

    const handleRemoveText = (index: number) => {
        setTexts(texts.filter((_, idx) => idx !== index));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            const lines = text.split('\n').filter(l => l.trim());
            setTexts(lines.slice(0, 100)); // Limit to 100 items
        };
        reader.readAsText(file);
    };

    const handleDownload = () => {
        const data = dataPoints.map(p => ({
            text: p.text,
            x: p.x,
            y: p.y,
            z: p.z,
        }));

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `embeddings-${method.toLowerCase()}-${dimensions}d-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Embedding Visualizer
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Visualize text embeddings in 2D/3D space using PCA or UMAP
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Visualization Canvas */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Controls */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setMethod('PCA')}
                                        className={method === 'PCA' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}
                                    >
                                        <Zap className="w-4 h-4 mr-2" />
                                        PCA
                                    </Button>
                                    <Button
                                        onClick={() => setMethod('UMAP')}
                                        className={method === 'UMAP' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}
                                    >
                                        <Grid3x3 className="w-4 h-4 mr-2" />
                                        UMAP
                                    </Button>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setDimensions(2)}
                                        className={dimensions === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}
                                    >
                                        2D
                                    </Button>
                                    <Button
                                        onClick={() => setDimensions(3)}
                                        className={dimensions === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}
                                    >
                                        3D
                                    </Button>
                                </div>

                                <div className="flex gap-2 ml-auto">
                                    <label className="cursor-pointer">
                                        <Button variant="outline" asChild>
                                            <span>
                                                <Upload className="w-4 h-4 mr-2" />
                                                Upload
                                            </span>
                                        </Button>
                                        <input
                                            type="file"
                                            accept=".txt,.jsonl"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </label>

                                    <Button onClick={handleDownload} variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Canvas */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-slate-800">
                                    {method} Visualization ({dimensions}D)
                                </h2>
                                <div className="text-sm text-slate-600">
                                    {dataPoints.length} points
                                </div>
                            </div>

                            <div className="relative">
                                <canvas
                                    ref={canvasRef}
                                    width={800}
                                    height={600}
                                    onMouseMove={handleCanvasMouseMove}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                    className="w-full border-2 border-slate-200 rounded-lg cursor-crosshair"
                                />

                                {dimensions === 3 && (
                                    <div className="absolute top-4 right-4 bg-yellow-100 border-2 border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg text-sm">
                                        <Eye className="w-4 h-4 inline mr-2" />
                                        3D view shown as 2D projection
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Add Text */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Add Text</h3>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddText()}
                                    placeholder="Enter text to visualize..."
                                    className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                />
                                <Button onClick={handleAddText} disabled={!newText.trim()}>
                                    Add
                                </Button>
                            </div>

                            <Button
                                onClick={() => setTexts(SAMPLE_TEXTS)}
                                variant="outline"
                                className="w-full"
                            >
                                Load Sample Data
                            </Button>
                        </Card>

                        {/* Text List */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-purple-500 to-indigo-600 text-white max-h-[600px] overflow-y-auto">
                            <h3 className="text-lg font-semibold mb-4">Text Items ({texts.length})</h3>
                            <div className="space-y-2">
                                {texts.map((text, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3 rounded-lg transition-all ${hoveredPoint === idx
                                                ? 'bg-white/30 scale-105'
                                                : 'bg-white/10 hover:bg-white/20'
                                            }`}
                                        onMouseEnter={() => setHoveredPoint(idx)}
                                        onMouseLeave={() => setHoveredPoint(null)}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-sm flex-1">{text}</span>
                                            <button
                                                onClick={() => handleRemoveText(idx)}
                                                className="text-white/70 hover:text-white"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Info */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-slate-50 to-slate-100">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">About</h3>
                            <div className="space-y-3 text-sm text-slate-700">
                                <div>
                                    <strong className="text-purple-600">PCA</strong> (Principal Component Analysis) finds the directions of maximum variance in high-dimensional data.
                                </div>
                                <div>
                                    <strong className="text-indigo-600">UMAP</strong> (Uniform Manifold Approximation) preserves local and global structure better than PCA.
                                </div>
                                <div className="pt-3 border-t border-slate-300">
                                    <strong>Note:</strong> This demo uses simulated embeddings. In production, use real embedding models like OpenAI, Cohere, or sentence-transformers.
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
