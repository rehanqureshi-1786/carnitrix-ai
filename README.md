# ☢️ Carnitrix-ai

**AI-Powered Code Evolution & Risk Intelligence Engine**

Carnitrix-ai is a CLI tool that acts like a security guard and code doctor for your projects. It scans your codebase, finds problems before they become bugs, predicts where failures might happen, and can even fix code using AI.

## 🎯 What Does It Do?

Think of Carnitrix-ai as your code's personal bodyguard. It:

- 🔍 **Scans** your entire project for complexity, security issues, and code smells
- 🛡️ **Detects** security vulnerabilities (buffer overflows, SQL injection, XSS, etc.)
- 🔮 **Predicts** where bugs might happen next based on Git history
- 🤖 **Fixes** code automatically using Google's Gemini AI
- 📊 **Tracks** how your code evolves over time
- 🎬 **Demos** everything in a cinematic mode perfect for hackathons

## 🚀 Quick Start

### Installation

# Clone the repository
git clone https://github.com/rehanqureshi-1786/carnitrix-ai.git
cd carnitrix-ai

# Install dependencies
npm install

# Build the project
npm run build### First Run (Demo Mode)
ash
# Run the automated hackathon demo
npm start demo

# Or with cinematic animations
npm start demo --cinematic## 📖 Usage

### Basic Commands

# Scan your entire project
npm start scan

# Review your latest Git changes
npm start review

# Check a specific file's evolution over time
npm start trend src/cli.ts

# Predict where bugs might happen
npm start forecast

# Run a security audit
npm start security

# Simulate exploit vectors on a file (safe, non-destructive)
npm start exploit-sim assets/vulnerable_demo.cpp

# Fix a file using AI (requires API key)
npm start fix src/some-file.ts### Generate Reports

# Scan and save results to a markdown file
npm start scan --output project_report.md## 🤖 AI Features (Optional)

To use the AI-powered code fixing feature, you'll need a Google Gemini API key:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the project root:
   
