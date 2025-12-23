# AI & LLM Handy Tools 🤖

A comprehensive collection of AI and LLM tools built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

### **Live Tools:**
- ✅ **API Tester** - Test AI APIs (OpenAI, Anthropic, Google, etc.)
- ✅ **AI Glossary** - 54+ AI/LLM terms with definitions
- ✅ **Content Moderation** - Analyze text for harmful content
- ✅ **Prompt Template Builder** - Create reusable prompt templates

### **Coming Soon:**
- 🔜 PII Detector
- 🔜 Token Counter & Cost Estimator
- 🔜 Model Comparison Viewer
- 🔜 JSONL Converter
- 🔜 And 60+ more tools!

---

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Package Manager:** npm

---

## 🛠️ Installation

### **Prerequisites:**
- Node.js 18.x or higher
- npm or yarn

### **Clone & Install:**
```bash
git clone https://github.com/yourusername/aitoolbox.git
cd aitoolbox
npm install
```

### **Run Development Server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
AIToolBox.io/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── api-tester/                 # API Tester tool
│   ├── ai-glossary/                # AI Glossary
│   ├── content-moderation/         # Content Moderation
│   ├── prompt-template/            # Prompt Template Builder
│   └── ... (60+ more tools)
├── components/
│   ├── shared/                     # Shared components
│   └── components/ui/              # UI components
├── public/                         # Static assets
├── vercel.json                     # Vercel configuration
└── README.md                       # This file
```

---

## 🚀 Deployment

### **Deploy to Vercel (Recommended):**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/aitoolbox)

**Or manually:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 📊 Build

### **Production Build:**
```bash
npm run build
```

### **Build Stats:**
- **Total Pages:** 73
- **Build Time:** ~60 seconds
- **Bundle Size:** Optimized
- **First Load JS:** ~105 KB

---

## 🎨 Features Highlights

### **1. API Tester**
- Test multiple AI providers
- Real-time streaming responses
- Cost estimation
- Export results

### **2. AI Glossary**
- 54+ AI/LLM terms
- Search functionality
- Category filtering
- Detailed definitions

### **3. Content Moderation**
- 6 moderation categories
- Severity indicators
- Export reports
- Demo mode (keyword-based)

### **4. Prompt Template Builder**
- 5 preset templates
- Variable system
- Preview mode
- Export as JSON

---

## 🛡️ Edge Cases Fixed

- ✅ No hydration errors
- ✅ Client-side APIs properly handled
- ✅ TypeScript strict mode
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

---

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Workflow:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Lucide for beautiful icons
- Tailwind CSS for utility-first styling
- Vercel for hosting

---

## 📞 Support

- **Documentation:** [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
- **Issues:** [GitHub Issues](https://github.com/yourusername/aitoolbox/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/aitoolbox/discussions)

---

## 🗺️ Roadmap

### **Q1 2025:**
- [ ] Add 10 more tools
- [ ] Implement API integrations
- [ ] Add user authentication
- [ ] Mobile app (React Native)

### **Q2 2025:**
- [ ] AI model fine-tuning tools
- [ ] Dataset management
- [ ] Collaboration features
- [ ] Analytics dashboard

---

## ⭐ Star History

If you find this project useful, please consider giving it a star!

---

**Built with ❤️ by [Your Name]**

**Live Demo:** [https://aitoolbox.vercel.app](https://aitoolbox.vercel.app)
