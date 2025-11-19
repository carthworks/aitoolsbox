# AI & LLM Handy Tools

Practical utilities for AI engineers, researchers, and prompt engineers. A comprehensive toolkit built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Prompt Engineering**: Templates, A/B testing, context trimming, and leakage detection.
- **Model Training & Evaluation**: Dataset cleaning, fine-tune config generation, and training cost estimation.
- **Dataset Tools**: Text labeling, JSONL conversion, embedding visualization, and bias detection.
- **MLOps & Inference**: API testing, latency checking, and streaming output visualization.
- **Safety & Alignment**: Jailbreak testing, toxicity classification, and hallucination checking.
- **AI Agents & Workflows**: Agent flow visualization, RAG building, and tool use simulation.
- **Security & Utilities**: Cryptography, network analysis, and threat intelligence tools.

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/carthworks/aitoolsbox.git
cd aitoolsbox-io

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Tools

### Prompt Engineering
- **Prompt Template Builder**: Create reusable structured prompts (system + user + examples).
- **Prompt A/B Tester**: Compare model responses across prompt variations.
- **Context Trimmer**: Automatically shorten context to stay under token limits.
- **Prompt Leakage Detector**: Detect system prompt exposure or overfitting.
- **Persona Simulator**: Emulate model behavior under various personas.

### Model Training & Evaluation
- **Dataset Cleaner**: Remove duplicates, bad tokens, or offensive samples.
- **Fine-Tune Config Generator**: Generate LoRA, PEFT, or RLHF JSON config templates.
- **Training Cost Estimator**: Estimate GPU hours and token cost for training.
- **Model Comparison Viewer**: Compare outputs from multiple LLMs side-by-side.
- **Evaluation Benchmark Suite**: Evaluate accuracy, coherence, toxicity, and bias.

### Dataset Tools
- **Text Dataset Labeler**: Manual or semi-auto text classification tool.
- **Text → JSONL Converter**: Prepare datasets for OpenAI / HuggingFace training.
- **Embedding Visualizer**: Plot sentence embeddings in 2D/3D using PCA/UMAP.
- **Bias Detector**: Identify gender, racial, or cultural bias in text.
- **Token Counter**: Estimate token usage and costs before training.

### MLOps & Inference
- **API Tester**: Send test prompts to OpenAI, Ollama, Anthropic, Mistral, etc.
- **Latency Checker**: Compare response times across models or regions.
- **Streaming Output Visualizer**: Watch token-by-token generation in real time.
- **Inference Log Analyzer**: Track drift, anomalies, and token usage metrics.
- **Model Deployment Tracker**: Monitor and version deployed models.

### Safety & Alignment
- **Jailbreak Tester**: Evaluate prompt-injection and system override attempts.
- **Toxicity Classifier**: Detect harmful or biased language in model outputs.
- **Hallucination Checker**: Compare generated output with factual references.
- **Alignment Score Tracker**: Rate model safety, honesty, and relevance.

### AI Agents & Workflows
- **Agent Flow Visualizer**: Visualize task-chains and tool-use flows.
- **Task Memory Tester**: Evaluate how well an agent retains prior context.
- **RAG Builder**: Connect documents → embeddings → LLM for retrieval QA.
- **Tool Use Simulator**: Simulate agent reasoning and tool calls.

### Security & Utilities
- **Cryptography**: Hash calculators, JWT decoders, password utilities.
- **Network Analysis**: DNS lookups, SSL checks, port scanning.
- **Threat Intelligence**: IOC extraction, CVE lookups, threat intel checks.

## Configuration

### Environment Variables

Create a `.env.local` file for API integrations:

```bash
# Optional: VirusTotal API key for threat intel
VT_API_KEY=your_virustotal_api_key

# Optional: AbuseIPDB API key for IP reputation
ABUSEIPDB_KEY=your_abuseipdb_api_key

# Optional: OpenAI API Key for AI tools
OPENAI_API_KEY=your_openai_api_key
```

## Project Structure

```
aitoolsbox-io/
 app/
    api/                 # API routes
    components/          # Reusable components
    public/              # Static assets
    ...                  # Tool pages
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build Docker image
docker build -t aitoolsbox .

# Run container
docker run -p 3000:3000 aitoolsbox
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/carthworks/aitoolsbox/issues)
- **Email**: tkarthikeyan@gmail.com

---

**Built with ❤️ for the AI community**
