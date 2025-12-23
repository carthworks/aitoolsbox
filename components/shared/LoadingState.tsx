'use client';

import { Loader2, Sparkles, Zap } from 'lucide-react';

type LoadingStateProps = {
    variant?: 'spinner' | 'dots' | 'pulse' | 'thinking';
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
};

export default function LoadingState({
    variant = 'spinner',
    message = 'Loading...',
    size = 'md',
    className = ''
}: LoadingStateProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    if (variant === 'spinner') {
        return (
            <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
                <Loader2 className={`${sizeClasses[size]} animate-spin text-indigo-600`} />
                {message && <p className={`${textSizeClasses[size]} text-slate-600`}>{message}</p>}
            </div>
        );
    }

    if (variant === 'dots') {
        return (
            <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
                <div className="flex gap-2">
                    <div className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-indigo-600 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
                    <div className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-indigo-600 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                    <div className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-indigo-600 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
                </div>
                {message && <p className={`${textSizeClasses[size]} text-slate-600`}>{message}</p>}
            </div>
        );
    }

    if (variant === 'pulse') {
        return (
            <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
                <div className={`${sizeClasses[size]} bg-indigo-600 rounded-full animate-pulse`} />
                {message && <p className={`${textSizeClasses[size]} text-slate-600 animate-pulse`}>{message}</p>}
            </div>
        );
    }

    if (variant === 'thinking') {
        return (
            <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
                <div className="relative">
                    <Sparkles className={`${sizeClasses[size]} text-indigo-600 animate-pulse`} />
                    <Zap className={`${sizeClasses[size]} text-purple-600 absolute top-0 left-0 animate-ping`} />
                </div>
                {message && (
                    <p className={`${textSizeClasses[size]} text-slate-600 flex items-center gap-2`}>
                        {message}
                        <span className="flex gap-1">
                            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                        </span>
                    </p>
                )}
            </div>
        );
    }

    return null;
}

// Skeleton loader for cards
export function SkeletonCard({ className = '' }: { className?: string }) {
    return (
        <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
                <div className="h-8 bg-slate-200 rounded w-1/4" />
            </div>
        </div>
    );
}

// Skeleton loader for text
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
    return (
        <div className={`animate-pulse space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-3 bg-slate-200 rounded"
                    style={{ width: i === lines - 1 ? '75%' : '100%' }}
                />
            ))}
        </div>
    );
}
