'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Download } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeEditorProps = {
    value: string;
    onChange: (value: string) => void;
    language?: string;
    placeholder?: string;
    minHeight?: string;
    maxHeight?: string;
    showLineNumbers?: boolean;
    readOnly?: boolean;
    className?: string;
};

export default function CodeEditor({
    value,
    onChange,
    language = 'json',
    placeholder = 'Enter your code here...',
    minHeight = '200px',
    maxHeight = '600px',
    showLineNumbers = true,
    readOnly = false,
    className = ''
}: CodeEditorProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code.${language}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`relative border-2 border-slate-200 rounded-lg overflow-hidden ${className}`}>
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
                <div className="flex items-center gap-2 text-slate-300">
                    <Code2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{language.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-300 hover:text-white"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-300 hover:text-white"
                        title="Download file"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            {readOnly ? (
                <div style={{ minHeight, maxHeight }} className="overflow-auto">
                    <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        showLineNumbers={showLineNumbers}
                        customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            background: '#1e1e1e',
                            fontSize: '14px',
                            minHeight,
                        }}
                    >
                        {value || placeholder}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 bg-slate-900 text-slate-100 font-mono text-sm focus:outline-none resize-none"
                    style={{ minHeight, maxHeight }}
                    spellCheck={false}
                />
            )}

            {/* Character Count */}
            <div className="bg-slate-800 px-4 py-1 border-t border-slate-700 text-xs text-slate-400">
                {value.length.toLocaleString()} characters • {value.split('\n').length} lines
            </div>
        </div>
    );
}
