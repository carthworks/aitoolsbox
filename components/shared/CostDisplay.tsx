'use client';

import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/components/ui/card';

type CostDisplayProps = {
    inputTokens: number;
    outputTokens: number;
    inputCostPerMillion: number;
    outputCostPerMillion: number;
    modelName?: string;
    showBreakdown?: boolean;
    className?: string;
};

export default function CostDisplay({
    inputTokens,
    outputTokens,
    inputCostPerMillion,
    outputCostPerMillion,
    modelName,
    showBreakdown = true,
    className = ''
}: CostDisplayProps) {
    const inputCost = (inputTokens / 1_000_000) * inputCostPerMillion;
    const outputCost = (outputTokens / 1_000_000) * outputCostPerMillion;
    const totalCost = inputCost + outputCost;

    const formatCost = (cost: number) => {
        if (cost < 0.000001) return '$0.000000';
        if (cost < 0.01) return `$${cost.toFixed(6)}`;
        if (cost < 1) return `$${cost.toFixed(4)}`;
        return `$${cost.toFixed(2)}`;
    };

    return (
        <Card className={`p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Cost Estimate</h3>
                {modelName && <span className="text-sm opacity-75">({modelName})</span>}
            </div>

            {showBreakdown && (
                <div className="space-y-3 mb-4">
                    {/* Input Cost */}
                    <div className="bg-white/10 backdrop-blur p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm opacity-90 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Input Cost
                            </div>
                            <div className="text-lg font-bold">{formatCost(inputCost)}</div>
                        </div>
                        <div className="text-xs opacity-75">
                            {inputTokens.toLocaleString()} tokens × ${inputCostPerMillion}/1M
                        </div>
                    </div>

                    {/* Output Cost */}
                    <div className="bg-white/10 backdrop-blur p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm opacity-90 flex items-center gap-2">
                                <TrendingDown className="w-4 h-4" />
                                Output Cost
                            </div>
                            <div className="text-lg font-bold">{formatCost(outputCost)}</div>
                        </div>
                        <div className="text-xs opacity-75">
                            {outputTokens.toLocaleString()} tokens × ${outputCostPerMillion}/1M
                        </div>
                    </div>
                </div>
            )}

            {/* Total Cost */}
            <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm opacity-90">Total Cost</div>
                    <div className="text-3xl font-bold">{formatCost(totalCost)}</div>
                </div>
                <div className="text-xs opacity-75 mt-1 text-right">
                    {(inputTokens + outputTokens).toLocaleString()} total tokens
                </div>
            </div>

            {/* Cost per 1K requests estimate */}
            {totalCost > 0 && (
                <div className="mt-4 p-3 bg-white/10 backdrop-blur rounded-lg">
                    <div className="text-xs opacity-90 mb-1">Estimated cost for 1,000 requests:</div>
                    <div className="text-xl font-bold">{formatCost(totalCost * 1000)}</div>
                </div>
            )}
        </Card>
    );
}
