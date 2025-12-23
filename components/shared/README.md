# Shared Components

Reusable UI components for AI ToolBox tools.

## Components

### ModelSelector

A dropdown component for selecting AI models with pricing and context window information.

**Usage:**
```tsx
import ModelSelector, { AI_MODELS } from '@/components/shared/ModelSelector';

const [selectedModel, setSelectedModel] = useState('gpt-4o');

<ModelSelector
  selectedModel={selectedModel}
  onModelChange={setSelectedModel}
  showCost={true}
  compact={false}
/>
```

**Props:**
- `selectedModel`: string - Currently selected model ID
- `onModelChange`: (modelId: string) => void - Callback when model changes
- `showCost?`: boolean - Show pricing info (default: true)
- `compact?`: boolean - Compact mode (default: false)
- `className?`: string - Additional CSS classes

**Available Models:**
- OpenAI: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo
- Anthropic: Claude 3.5 Sonnet, Claude 3 Haiku, Claude 3 Opus
- Google: Gemini 1.5 Pro, Gemini 1.5 Flash
- Mistral: Mistral Large, Mistral Small

---

### CostDisplay

Displays token usage and cost estimates for AI model usage.

**Usage:**
```tsx
import CostDisplay from '@/components/shared/CostDisplay';

<CostDisplay
  inputTokens={1000}
  outputTokens={500}
  inputCostPerMillion={2.50}
  outputCostPerMillion={10.00}
  modelName="GPT-4o"
  showBreakdown={true}
/>
```

**Props:**
- `inputTokens`: number - Number of input tokens
- `outputTokens`: number - Number of output tokens
- `inputCostPerMillion`: number - Cost per 1M input tokens
- `outputCostPerMillion`: number - Cost per 1M output tokens
- `modelName?`: string - Model name to display
- `showBreakdown?`: boolean - Show detailed breakdown (default: true)
- `className?`: string - Additional CSS classes

---

### CodeEditor

A code editor with syntax highlighting, copy, and download functionality.

**Usage:**
```tsx
import CodeEditor from '@/components/shared/CodeEditor';

const [code, setCode] = useState('');

<CodeEditor
  value={code}
  onChange={setCode}
  language="json"
  placeholder="Enter your code..."
  showLineNumbers={true}
  readOnly={false}
/>
```

**Props:**
- `value`: string - Current code value
- `onChange`: (value: string) => void - Callback when code changes
- `language?`: string - Programming language (default: 'json')
- `placeholder?`: string - Placeholder text
- `minHeight?`: string - Minimum height (default: '200px')
- `maxHeight?`: string - Maximum height (default: '600px')
- `showLineNumbers?`: boolean - Show line numbers (default: true)
- `readOnly?`: boolean - Read-only mode (default: false)
- `className?`: string - Additional CSS classes

**Supported Languages:**
- json, javascript, typescript, python, java, go, rust, sql, html, css, markdown, etc.

---

### LoadingState

Loading indicators with multiple variants.

**Usage:**
```tsx
import LoadingState, { SkeletonCard, SkeletonText } from '@/components/shared/LoadingState';

// Spinner
<LoadingState variant="spinner" message="Loading..." size="md" />

// Dots
<LoadingState variant="dots" message="Processing..." size="lg" />

// Pulse
<LoadingState variant="pulse" message="Fetching data..." size="sm" />

// Thinking (for AI)
<LoadingState variant="thinking" message="Generating response" size="md" />

// Skeleton loaders
<SkeletonCard />
<SkeletonText lines={3} />
```

**LoadingState Props:**
- `variant?`: 'spinner' | 'dots' | 'pulse' | 'thinking' (default: 'spinner')
- `message?`: string - Loading message
- `size?`: 'sm' | 'md' | 'lg' (default: 'md')
- `className?`: string - Additional CSS classes

**SkeletonCard Props:**
- `className?`: string - Additional CSS classes

**SkeletonText Props:**
- `lines?`: number - Number of lines (default: 3)
- `className?`: string - Additional CSS classes

---

## Best Practices

1. **Consistency**: Use these shared components across all tools for a consistent UX
2. **Customization**: Use the `className` prop to add tool-specific styling
3. **Accessibility**: All components include proper ARIA labels and keyboard navigation
4. **Performance**: Components are optimized with React.memo and useCallback where appropriate

## Adding New Shared Components

When creating a new shared component:

1. Create the file in `/components/shared/`
2. Export the component as default
3. Include TypeScript types for all props
4. Add documentation to this README
5. Use Tailwind CSS for styling
6. Include accessibility features (ARIA labels, keyboard nav)
7. Make it reusable and configurable via props

## Examples

See these tools for usage examples:
- `/app/api-tester/page.tsx` - Uses ModelSelector, CostDisplay, LoadingState
- `/app/token-counter/page.tsx` - Uses CostDisplay
- `/app/ai-glossary/page.tsx` - Uses LoadingState

## Dependencies

- `react-syntax-highlighter` - For CodeEditor syntax highlighting
- `framer-motion` - For animations (optional, used in some tools)
- `lucide-react` - For icons
