'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Download, Copy, Check, Zap, Cpu, Brain, Code } from 'lucide-react';
import { Card } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';

type ConfigType = 'lora' | 'peft' | 'qlora' | 'openai' | 'axolotl';

type ConfigTemplate = {
    type: ConfigType;
    name: string;
    description: string;
    icon: any;
    color: string;
};

const TEMPLATES: ConfigTemplate[] = [
    {
        type: 'lora',
        name: 'LoRA',
        description: 'Low-Rank Adaptation for efficient fine-tuning',
        icon: Zap,
        color: 'from-yellow-500 to-orange-600',
    },
    {
        type: 'qlora',
        name: 'QLoRA',
        description: 'Quantized LoRA for memory-efficient training',
        icon: Cpu,
        color: 'from-purple-500 to-pink-600',
    },
    {
        type: 'peft',
        name: 'PEFT',
        description: 'Parameter-Efficient Fine-Tuning with HuggingFace',
        icon: Brain,
        color: 'from-blue-500 to-indigo-600',
    },
    {
        type: 'openai',
        name: 'OpenAI',
        description: 'OpenAI fine-tuning configuration',
        icon: Settings,
        color: 'from-green-500 to-emerald-600',
    },
    {
        type: 'axolotl',
        name: 'Axolotl',
        description: 'Axolotl training framework configuration',
        icon: Code,
        color: 'from-cyan-500 to-teal-600',
    },
];

export default function FineTuneConfigPage() {
    const [selectedType, setSelectedType] = useState<ConfigType>('lora');
    const [copied, setCopied] = useState(false);

    // Common parameters
    const [modelName, setModelName] = useState('meta-llama/Llama-2-7b-hf');
    const [learningRate, setLearningRate] = useState(2e-4);
    const [batchSize, setBatchSize] = useState(4);
    const [epochs, setEpochs] = useState(3);
    const [maxSeqLength, setMaxSeqLength] = useState(512);

    // LoRA specific
    const [loraR, setLoraR] = useState(8);
    const [loraAlpha, setLoraAlpha] = useState(16);
    const [loraDropout, setLoraDropout] = useState(0.05);

    // QLoRA specific
    const [quantizationBits, setQuantizationBits] = useState(4);

    // OpenAI specific
    const [openaiModel, setOpenaiModel] = useState('gpt-3.5-turbo');
    const [nEpochs, setNEpochs] = useState(3);

    const generateConfig = (): string => {
        switch (selectedType) {
            case 'lora':
                return JSON.stringify({
                    model_name_or_path: modelName,
                    task_type: "CAUSAL_LM",
                    lora_config: {
                        r: loraR,
                        lora_alpha: loraAlpha,
                        lora_dropout: loraDropout,
                        target_modules: ["q_proj", "v_proj", "k_proj", "o_proj"],
                        bias: "none",
                        task_type: "CAUSAL_LM"
                    },
                    training_arguments: {
                        output_dir: "./lora-output",
                        num_train_epochs: epochs,
                        per_device_train_batch_size: batchSize,
                        gradient_accumulation_steps: 4,
                        learning_rate: learningRate,
                        fp16: true,
                        logging_steps: 10,
                        save_strategy: "epoch",
                        optim: "adamw_torch",
                        warmup_ratio: 0.03,
                        lr_scheduler_type: "cosine",
                        max_seq_length: maxSeqLength
                    }
                }, null, 2);

            case 'qlora':
                return JSON.stringify({
                    model_name_or_path: modelName,
                    task_type: "CAUSAL_LM",
                    bnb_config: {
                        load_in_4bit: true,
                        bnb_4bit_quant_type: "nf4",
                        bnb_4bit_compute_dtype: "float16",
                        bnb_4bit_use_double_quant: true
                    },
                    lora_config: {
                        r: loraR,
                        lora_alpha: loraAlpha,
                        lora_dropout: loraDropout,
                        target_modules: ["q_proj", "v_proj", "k_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
                        bias: "none",
                        task_type: "CAUSAL_LM"
                    },
                    training_arguments: {
                        output_dir: "./qlora-output",
                        num_train_epochs: epochs,
                        per_device_train_batch_size: batchSize,
                        gradient_accumulation_steps: 4,
                        learning_rate: learningRate,
                        fp16: false,
                        bf16: true,
                        logging_steps: 10,
                        save_strategy: "epoch",
                        optim: "paged_adamw_32bit",
                        warmup_ratio: 0.03,
                        lr_scheduler_type: "cosine",
                        max_seq_length: maxSeqLength,
                        gradient_checkpointing: true
                    }
                }, null, 2);

            case 'peft':
                return JSON.stringify({
                    model_name_or_path: modelName,
                    peft_type: "LORA",
                    task_type: "CAUSAL_LM",
                    inference_mode: false,
                    r: loraR,
                    lora_alpha: loraAlpha,
                    lora_dropout: loraDropout,
                    target_modules: ["q_proj", "v_proj"],
                    fan_in_fan_out: false,
                    bias: "none",
                    modules_to_save: null,
                    init_lora_weights: true,
                    training_config: {
                        output_dir: "./peft-output",
                        learning_rate: learningRate,
                        num_train_epochs: epochs,
                        per_device_train_batch_size: batchSize,
                        gradient_accumulation_steps: 4,
                        warmup_steps: 100,
                        logging_steps: 10,
                        save_steps: 500,
                        fp16: true,
                        push_to_hub: false
                    }
                }, null, 2);

            case 'openai':
                return JSON.stringify({
                    model: openaiModel,
                    training_file: "file-abc123",
                    validation_file: "file-def456",
                    hyperparameters: {
                        n_epochs: nEpochs,
                        batch_size: batchSize,
                        learning_rate_multiplier: learningRate * 1000
                    },
                    suffix: "custom-model-name"
                }, null, 2);

            case 'axolotl':
                return `base_model: ${modelName}
model_type: LlamaForCausalLM
tokenizer_type: LlamaTokenizer

load_in_8bit: false
load_in_4bit: true
strict: false

datasets:
  - path: your-dataset.jsonl
    type: alpaca

dataset_prepared_path:
val_set_size: 0.05
output_dir: ./axolotl-output

adapter: lora
lora_r: ${loraR}
lora_alpha: ${loraAlpha}
lora_dropout: ${loraDropout}
lora_target_modules:
  - q_proj
  - v_proj
  - k_proj
  - o_proj

sequence_len: ${maxSeqLength}
sample_packing: true
pad_to_sequence_len: true

wandb_project:
wandb_entity:
wandb_watch:
wandb_name:
wandb_log_model:

gradient_accumulation_steps: 4
micro_batch_size: ${batchSize}
num_epochs: ${epochs}
optimizer: adamw_bnb_8bit
lr_scheduler: cosine
learning_rate: ${learningRate}

train_on_inputs: false
group_by_length: false
bf16: true
fp16: false
tf32: false

gradient_checkpointing: true
early_stopping_patience:
resume_from_checkpoint:
local_rank:

logging_steps: 1
xformers_attention:
flash_attention: true

warmup_steps: 10
evals_per_epoch: 4
eval_table_size:
saves_per_epoch: 1
debug:
deepspeed:
weight_decay: 0.0
fsdp:
fsdp_config:
special_tokens:
  bos_token: "<s>"
  eos_token: "</s>"
  unk_token: "<unk>"`;

            default:
                return '{}';
        }
    };

    const config = generateConfig();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(config);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadConfig = () => {
        const extension = selectedType === 'axolotl' ? 'yml' : 'json';
        const blob = new Blob([config], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedType}-config-${Date.now()}.${extension}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const selectedTemplate = TEMPLATES.find(t => t.type === selectedType)!;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                            <Settings className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Fine-Tune Config Generator
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Generate production-ready configurations for LoRA, QLoRA, PEFT, and more
                    </p>
                </motion.div>

                {/* Template Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Select Training Method</h2>
                        <div className="grid md:grid-cols-5 gap-4">
                            {TEMPLATES.map((template) => {
                                const Icon = template.icon;
                                const isSelected = selectedType === template.type;
                                return (
                                    <button
                                        key={template.type}
                                        onClick={() => setSelectedType(template.type)}
                                        className={`p-4 rounded-xl border-2 transition-all ${isSelected
                                                ? `border-transparent bg-gradient-to-br ${template.color} text-white shadow-lg scale-105`
                                                : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-700'
                                            }`}
                                    >
                                        <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                                        <div className="font-semibold mb-1">{template.name}</div>
                                        <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                                            {template.description}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Parameters */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Common Parameters */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Training Parameters</h3>

                            <div className="space-y-4">
                                {selectedType !== 'openai' && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Base Model
                                        </label>
                                        <input
                                            type="text"
                                            value={modelName}
                                            onChange={(e) => setModelName(e.target.value)}
                                            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                            placeholder="meta-llama/Llama-2-7b-hf"
                                        />
                                    </div>
                                )}

                                {selectedType === 'openai' && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            OpenAI Model
                                        </label>
                                        <select
                                            value={openaiModel}
                                            onChange={(e) => setOpenaiModel(e.target.value)}
                                            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                        >
                                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                            <option value="gpt-4o-mini-2024-07-18">GPT-4o Mini</option>
                                            <option value="davinci-002">Davinci-002</option>
                                            <option value="babbage-002">Babbage-002</option>
                                        </select>
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Learning Rate: {learningRate.toExponential(1)}
                                        </label>
                                        <input
                                            type="range"
                                            min="-5"
                                            max="-3"
                                            step="0.1"
                                            value={Math.log10(learningRate)}
                                            onChange={(e) => setLearningRate(Math.pow(10, Number(e.target.value)))}
                                            className="w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Batch Size: {batchSize}
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="32"
                                            value={batchSize}
                                            onChange={(e) => setBatchSize(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Epochs: {epochs}
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={epochs}
                                            onChange={(e) => setEpochs(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>

                                    {selectedType !== 'openai' && (
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Max Sequence Length: {maxSeqLength}
                                            </label>
                                            <input
                                                type="range"
                                                min="128"
                                                max="4096"
                                                step="128"
                                                value={maxSeqLength}
                                                onChange={(e) => setMaxSeqLength(Number(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* LoRA/QLoRA/PEFT Specific */}
                        {(selectedType === 'lora' || selectedType === 'qlora' || selectedType === 'peft' || selectedType === 'axolotl') && (
                            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">LoRA Configuration</h3>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            LoRA Rank (r): {loraR}
                                        </label>
                                        <input
                                            type="range"
                                            min="4"
                                            max="64"
                                            step="4"
                                            value={loraR}
                                            onChange={(e) => setLoraR(Number(e.target.value))}
                                            className="w-full"
                                        />
                                        <div className="text-xs text-slate-500 mt-1">
                                            Higher = more parameters
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            LoRA Alpha: {loraAlpha}
                                        </label>
                                        <input
                                            type="range"
                                            min="8"
                                            max="128"
                                            step="8"
                                            value={loraAlpha}
                                            onChange={(e) => setLoraAlpha(Number(e.target.value))}
                                            className="w-full"
                                        />
                                        <div className="text-xs text-slate-500 mt-1">
                                            Scaling factor (usually 2×r)
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Dropout: {loraDropout.toFixed(2)}
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="0.3"
                                            step="0.05"
                                            value={loraDropout}
                                            onChange={(e) => setLoraDropout(Number(e.target.value))}
                                            className="w-full"
                                        />
                                        <div className="text-xs text-slate-500 mt-1">
                                            Regularization
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Config Output */}
                        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-800">Generated Configuration</h3>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={copyToClipboard}
                                        variant="outline"
                                        size="sm"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={downloadConfig}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </div>
                            </div>

                            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                                {config}
                            </pre>
                        </Card>
                    </div>

                    {/* Sidebar - Info */}
                    <div className="space-y-6">
                        {/* Current Template Info */}
                        <Card className={`p-6 shadow-xl border-0 bg-gradient-to-br ${selectedTemplate.color} text-white`}>
                            <div className="flex items-center gap-3 mb-4">
                                <selectedTemplate.icon className="w-8 h-8" />
                                <h3 className="text-2xl font-bold">{selectedTemplate.name}</h3>
                            </div>
                            <p className="text-white/90 mb-4">{selectedTemplate.description}</p>

                            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                                <div className="text-sm opacity-90 mb-2">Best For:</div>
                                <ul className="text-sm space-y-1">
                                    {selectedType === 'lora' && (
                                        <>
                                            <li>• Consumer GPUs (8-16GB)</li>
                                            <li>• Fast iteration cycles</li>
                                            <li>• Task-specific adaptation</li>
                                        </>
                                    )}
                                    {selectedType === 'qlora' && (
                                        <>
                                            <li>• Limited VRAM (4-8GB)</li>
                                            <li>• Large models (7B-70B)</li>
                                            <li>• Memory-constrained setups</li>
                                        </>
                                    )}
                                    {selectedType === 'peft' && (
                                        <>
                                            <li>• HuggingFace ecosystem</li>
                                            <li>• Multiple adapter methods</li>
                                            <li>• Research & experimentation</li>
                                        </>
                                    )}
                                    {selectedType === 'openai' && (
                                        <>
                                            <li>• GPT-3.5/4 fine-tuning</li>
                                            <li>• Managed infrastructure</li>
                                            <li>• Production deployments</li>
                                        </>
                                    )}
                                    {selectedType === 'axolotl' && (
                                        <>
                                            <li>• Advanced training features</li>
                                            <li>• Multi-GPU setups</li>
                                            <li>• Custom datasets</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </Card>

                        {/* Quick Tips */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Tips</h3>
                            <div className="space-y-3 text-sm text-slate-700">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <strong>LoRA Rank:</strong> Start with r=8 for most tasks. Increase to 16-32 for complex adaptations.
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <strong>Learning Rate:</strong> 2e-4 to 5e-4 works well for most LoRA training.
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-pink-600 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <strong>Batch Size:</strong> Use gradient accumulation if your GPU can't fit larger batches.
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                                    <div>
                                        <strong>Epochs:</strong> 3-5 epochs usually sufficient. Monitor validation loss to avoid overfitting.
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Estimated Resources */}
                        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-amber-50 to-orange-50">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Estimated VRAM</h3>
                            <div className="space-y-3">
                                {selectedType === 'lora' && (
                                    <div className="text-sm text-slate-700">
                                        <div className="font-semibold mb-2">7B Model:</div>
                                        <div className="bg-white p-3 rounded-lg">
                                            ~12-16GB VRAM required
                                        </div>
                                    </div>
                                )}
                                {selectedType === 'qlora' && (
                                    <div className="text-sm text-slate-700">
                                        <div className="font-semibold mb-2">7B Model (4-bit):</div>
                                        <div className="bg-white p-3 rounded-lg">
                                            ~6-8GB VRAM required
                                        </div>
                                    </div>
                                )}
                                {selectedType === 'peft' && (
                                    <div className="text-sm text-slate-700">
                                        <div className="font-semibold mb-2">Varies by method:</div>
                                        <div className="bg-white p-3 rounded-lg">
                                            LoRA: 12-16GB<br />
                                            Prefix Tuning: 8-12GB
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
