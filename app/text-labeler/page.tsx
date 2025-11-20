'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Upload, Download, SkipForward, Undo2, CheckCircle2, Save, Trash2, Filter } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

type DataItem = {
    id: number;
    text: string;
    label?: string;
    confidence?: number;
    timestamp?: number;
};

type LabelConfig = {
    name: string;
    color: string;
    hotkey: string;
};

const DEFAULT_LABELS: LabelConfig[] = [
    { name: 'Positive', color: 'bg-green-500', hotkey: '1' },
    { name: 'Negative', color: 'bg-red-500', hotkey: '2' },
    { name: 'Neutral', color: 'bg-gray-500', hotkey: '3' },
];

const SAMPLE_DATA = [
    { id: 1, text: "This product exceeded my expectations! The quality is outstanding and delivery was fast." },
    { id: 2, text: "Terrible experience. The item arrived damaged and customer service was unhelpful." },
    { id: 3, text: "It's okay. Nothing special but does the job. Average quality for the price." },
    { id: 4, text: "Absolutely love it! Best purchase I've made this year. Highly recommend!" },
    { id: 5, text: "Disappointed with the quality. Not worth the money at all." },
];

export default function TextLabelerPage() {
    const [dataset, setDataset] = useState<DataItem[]>(SAMPLE_DATA);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [labels, setLabels] = useState<LabelConfig[]>(DEFAULT_LABELS);
    const [customLabelInput, setCustomLabelInput] = useState('');
    const [filterLabel, setFilterLabel] = useState<string | null>(null);
    const [history, setHistory] = useState<number[]>([]);

    const currentItem = dataset[currentIndex];
    const labeledCount = dataset.filter(item => item.label).length;
    const progress = (labeledCount / dataset.length) * 100;

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Number keys for labels
            const label = labels.find(l => l.hotkey === e.key);
            if (label) {
                handleLabel(label.name);
                return;
            }

            // Navigation
            if (e.key === 'ArrowRight' || e.key === 's') {
                handleSkip();
            } else if (e.key === 'ArrowLeft' || e.key === 'u') {
                handleUndo();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentIndex, labels, dataset]);

    const handleLabel = (labelName: string) => {
        const updatedDataset = [...dataset];
        updatedDataset[currentIndex] = {
            ...updatedDataset[currentIndex],
            label: labelName,
            timestamp: Date.now(),
        };
        setDataset(updatedDataset);
        setHistory([...history, currentIndex]);

        // Auto-advance to next unlabeled item
        const nextUnlabeled = updatedDataset.findIndex((item, idx) => idx > currentIndex && !item.label);
        if (nextUnlabeled !== -1) {
            setCurrentIndex(nextUnlabeled);
        } else if (currentIndex < dataset.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSkip = () => {
        if (currentIndex < dataset.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const lastIndex = history[history.length - 1];
            const updatedDataset = [...dataset];
            updatedDataset[lastIndex] = {
                ...updatedDataset[lastIndex],
                label: undefined,
                timestamp: undefined,
            };
            setDataset(updatedDataset);
            setHistory(history.slice(0, -1));
            setCurrentIndex(lastIndex);
        }
    };

    const handleAddLabel = () => {
        if (customLabelInput.trim()) {
            const newLabel: LabelConfig = {
                name: customLabelInput.trim(),
                color: `bg-${['blue', 'purple', 'pink', 'yellow', 'indigo', 'cyan'][labels.length % 6]}-500`,
                hotkey: String(labels.length + 1),
            };
            setLabels([...labels, newLabel]);
            setCustomLabelInput('');
        }
    };

    const handleRemoveLabel = (labelName: string) => {
        setLabels(labels.filter(l => l.name !== labelName));
        // Remove this label from all items
        const updatedDataset = dataset.map(item =>
            item.label === labelName ? { ...item, label: undefined } : item
        );
        setDataset(updatedDataset);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                const lines = text.split('\n').filter(l => l.trim());
                const newDataset: DataItem[] = lines.map((line, idx) => {
                    try {
                        const parsed = JSON.parse(line);
                        return {
                            id: idx + 1,
                            text: parsed.text || line,
                            label: parsed.label,
                        };
                    } catch {
                        return { id: idx + 1, text: line };
                    }
                });
                setDataset(newDataset);
                setCurrentIndex(0);
                setHistory([]);
            } catch (error) {
                alert('Error reading file. Please upload a valid JSONL or text file.');
            }
        };
        reader.readAsText(file);
    };

    const handleDownload = () => {
        const jsonl = dataset.map(item => JSON.stringify({
            text: item.text,
            label: item.label || null,
            timestamp: item.timestamp,
        })).join('\n');

        const blob = new Blob([jsonl], { type: 'application/jsonl' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `labeled-dataset-${Date.now()}.jsonl`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredDataset = filterLabel
        ? dataset.filter(item => item.label === filterLabel)
        : dataset;

    const labelStats = labels.map(label => ({
        ...label,
        count: dataset.filter(item => item.label === label.name).length,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg">
                            <Tag className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                            Text Dataset Labeler
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Efficiently label text data for classification tasks with keyboard shortcuts
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Labeling Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Progress */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-semibold text-slate-700">
                                    Progress: {labeledCount} / {dataset.length}
                                </div>
                                <div className="text-sm text-slate-600">
                                    {currentIndex + 1} of {dataset.length}
                                </div>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gradient-to-r from-pink-500 to-rose-600"
                                />
                            </div>
                        </Card>

                        {/* Current Text */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-slate-800">
                                            Item #{currentItem?.id}
                                        </h2>
                                        {currentItem?.label && (
                                            <span className={`px-4 py-2 rounded-full text-white font-semibold ${labels.find(l => l.name === currentItem.label)?.color || 'bg-gray-500'
                                                }`}>
                                                {currentItem.label}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-6 bg-slate-50 rounded-xl border-2 border-slate-200 min-h-[200px] flex items-center">
                                        <p className="text-lg text-slate-800 leading-relaxed">
                                            {currentItem?.text}
                                        </p>
                                    </div>

                                    {/* Label Buttons */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                                        {labels.map((label) => (
                                            <Button
                                                key={label.name}
                                                onClick={() => handleLabel(label.name)}
                                                className={`${label.color} hover:opacity-90 text-white py-6 text-lg font-semibold transition-all hover:scale-105`}
                                            >
                                                <span className="mr-2 px-2 py-1 bg-white/20 rounded text-sm">
                                                    {label.hotkey}
                                                </span>
                                                {label.name}
                                            </Button>
                                        ))}
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex gap-3 mt-6">
                                        <Button
                                            onClick={handleUndo}
                                            disabled={history.length === 0}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            <Undo2 className="w-4 h-4 mr-2" />
                                            Undo (U)
                                        </Button>
                                        <Button
                                            onClick={handleSkip}
                                            disabled={currentIndex >= dataset.length - 1}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            <SkipForward className="w-4 h-4 mr-2" />
                                            Skip (S)
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Dataset Controls</h3>
                            <div className="flex flex-wrap gap-3">
                                <label className="cursor-pointer">
                                    <Button variant="outline" asChild>
                                        <span>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload Dataset
                                        </span>
                                    </Button>
                                    <input
                                        type="file"
                                        accept=".jsonl,.json,.txt"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>

                                <Button
                                    onClick={handleDownload}
                                    variant="outline"
                                    disabled={labeledCount === 0}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Labels ({labeledCount})
                                </Button>

                                <Button
                                    onClick={() => {
                                        setDataset(SAMPLE_DATA);
                                        setCurrentIndex(0);
                                        setHistory([]);
                                    }}
                                    variant="outline"
                                >
                                    Load Sample Data
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Label Statistics */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                Label Statistics
                            </h3>
                            <div className="space-y-3">
                                {labelStats.map((label) => (
                                    <div key={label.name} className="bg-white/10 backdrop-blur p-3 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold">{label.name}</span>
                                            <span className="text-2xl font-bold">{label.count}</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-2">
                                            <div
                                                className="bg-white h-full rounded-full"
                                                style={{ width: `${(label.count / dataset.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Manage Labels */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Manage Labels</h3>

                            <div className="space-y-3 mb-4">
                                {labels.map((label) => (
                                    <div
                                        key={label.name}
                                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full ${label.color}`} />
                                            <span className="font-medium text-slate-700">{label.name}</span>
                                            <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded">
                                                Key: {label.hotkey}
                                            </span>
                                        </div>
                                        {labels.length > 2 && (
                                            <button
                                                onClick={() => handleRemoveLabel(label.name)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={customLabelInput}
                                    onChange={(e) => setCustomLabelInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddLabel()}
                                    placeholder="Add custom label..."
                                    className="flex-1 p-2 border-2 border-slate-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                                />
                                <Button onClick={handleAddLabel} disabled={!customLabelInput.trim()}>
                                    <Save className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>

                        {/* Keyboard Shortcuts */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-slate-50 to-slate-100">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Keyboard Shortcuts</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Label items</span>
                                    <kbd className="px-2 py-1 bg-white rounded border border-slate-300 font-mono">
                                        1-{labels.length}
                                    </kbd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Skip</span>
                                    <kbd className="px-2 py-1 bg-white rounded border border-slate-300 font-mono">
                                        S or →
                                    </kbd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Undo</span>
                                    <kbd className="px-2 py-1 bg-white rounded border border-slate-300 font-mono">
                                        U or ←
                                    </kbd>
                                </div>
                            </div>
                        </Card>

                        {/* Filter */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                Filter View
                            </h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setFilterLabel(null)}
                                    className={`w-full p-2 rounded-lg text-left transition-colors ${filterLabel === null ? 'bg-pink-100 text-pink-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    All Items ({dataset.length})
                                </button>
                                {labels.map((label) => (
                                    <button
                                        key={label.name}
                                        onClick={() => setFilterLabel(label.name)}
                                        className={`w-full p-2 rounded-lg text-left transition-colors ${filterLabel === label.name ? 'bg-pink-100 text-pink-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                            }`}
                                    >
                                        {label.name} ({labelStats.find(l => l.name === label.name)?.count || 0})
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
