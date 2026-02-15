# ☢️ Carnitrix-ai

**AI-Powered Code Evolution & Risk Intelligence Engine**

Carnitrix-ai is a CLI tool that acts like a security guard and code doctor for your projects. It scans your codebase, finds problems before they become bugs, predicts where failures might happen, and can even fix code using AI.

## 🎯 What Does It Do?

Think of Carnitrix-ai as your code's personal bodyguard. It:

- 🔍 **Scans** your entire project for complexity, security issues, and code smells
- 🛡️ **Detects** security vulnerabilities (buffer overflows, SQL injection, XSS, etc.)
- 🔮 **Predicts** where bugs might happen next based on Git history
- 🤖 **Fixes** code automatically using GitHub Copilot CLI or Google Gemini AI
- 📊 **Tracks** how your code evolves over time
- 🎬 **Demos** everything in a cinematic mode perfect for hackathons

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/rehanqureshi-1786/carnitrix-ai.git
cd carnitrix-ai

# Install dependencies
npm install

# Build the project
npm run build
```

### First Run (Demo Mode)

```bash
# Run the automated hackathon demo
npm start demo

# Or with cinematic animations
npm start demo --cinematic
```

## 🛠️ Built with GitHub Copilot CLI

This project **uses GitHub Copilot CLI** as its primary AI engine for code fixing. The `fix` command leverages Copilot CLI to analyze and refactor code.

**How it works:**
- The `fix` command uses `gh copilot` to analyze code
- Copilot CLI provides AI-powered code refactoring suggestions
- Falls back to Google Gemini if Copilot CLI is not available

**Try it:**
```bash
npm start fix src/your-file.ts
```

This demonstrates how GitHub Copilot CLI can be integrated into CLI tools to provide AI-powered features.

## 📖 Usage

### Basic Commands

```bash
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

# Fix a file using AI (uses GitHub Copilot CLI or Gemini)
npm start fix src/some-file.ts
```

### Generate Reports

```bash
# Scan and save results to a markdown file
npm start scan --output project_report.md
```

This will create a comprehensive markdown report with:
- Project statistics
- Risk breakdown
- Security findings
- Failure forecasts
- Recommendations

## 🤖 AI Features

Carnitrix-ai supports multiple AI providers:

### GitHub Copilot CLI (Primary)
The tool automatically uses GitHub Copilot CLI if available. No configuration needed!

### Google Gemini (Fallback)
If GitHub Copilot CLI is not available, you can use Google Gemini:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the project root:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```
   Or alternatively:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

3. Now you can use the `fix` command:
   ```bash
   npm start fix src/your-file.ts
   ```

**Note:** The AI features are optional. All other features work without any AI provider!

The AI fix feature will:
- Analyze your code for complexity, security risks, and code smells
- Provide refactored code that is safer and more efficient
- Keep the same logic but improve the structure
- Create a backup (.bak file) before making changes

## 🎬 Hackathon Demo Mode

The demo mode showcases all features in an automated sequence:

```bash
npm start demo
```

This will:
1. Run a full project scan
2. Simulate exploit vectors on vulnerable code
3. Predict potential failure points
4. Show AI integration status (GitHub Copilot CLI or Gemini)

Perfect for impressing judges! 🏆

The demo includes:
- **Autonomous Integrity Scan** - Comprehensive code analysis
- **Exploit Vector Simulation** - Safe vulnerability demonstration
- **Predictive Failure Analysis** - Git-based forecasting
- **AI-Guided Defensive Measures** - AI integration showcase

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `scan` | Analyze entire project for issues |
| `review` | Check latest Git commit for problems |
| `trend <file>` | Show how a file has changed over time |
| `forecast` | Predict where bugs might happen next |
| `security` | Run security audit |
| `exploit-sim <file>` | Simulate exploit vectors (safe) |
| `fix <file>` | AI-powered code repair (uses GitHub Copilot CLI) |
| `demo` | Run automated hackathon demonstration |

## 🎨 Features

### 🔍 Project Scanning
- Complexity analysis
- Security vulnerability detection
- Code smell identification
- Git volatility scoring

### 🛡️ Security Audit
Detects:
- Hardcoded API keys and passwords
- SQL injection risks
- XSS vulnerabilities
- Buffer overflow patterns
- Command injection risks
- Unsafe eval usage

### 🔮 Failure Forecasting
Uses Git history to predict:
- Which files are most likely to break
- High-risk areas based on edit frequency
- Complexity growth trends

### 🤖 AI Code Repair
- Automatic refactoring suggestions
- Security improvements
- Complexity reduction
- Code smell fixes

### 📊 Risk Scoring
Calculates a comprehensive risk score (0-100) based on:
- Complexity (23%)
- Security (0%)
- Git Volatility (0%)
- Code Smells (0%)

## 🛠️ Development

```bash
# Build TypeScript
npm run build

# Run in development mode
npm run dev

# Start the CLI
npm start
```

## 📁 Project Structure

```
carnitrix-ai/
├── src/
│   ├── ai/              # AI integration (GitHub Copilot CLI & Gemini)
│   ├── cli/             # CLI commands and demo
│   ├── core/            # Core scanning and analysis
│   ├── git/             # Git history analysis
│   ├── risk/            # Risk scoring and forecasting
│   ├── security/        # Security auditing
│   └── utils/           # Visuals, animations, reports
├── assets/              # Demo files
├── dist/               # Compiled JavaScript
└── package.json
```

## 🎯 Hackathon Submission

This project was built for the **GitHub Copilot CLI Hackathon**.

**Key Highlights:**
- ✅ Full CLI tool with multiple commands
- ✅ **GitHub Copilot CLI integration** (primary AI engine)
- ✅ Security vulnerability detection
- ✅ Predictive failure analysis
- ✅ Beautiful terminal UI with animations
- ✅ Automated demo mode for presentations

## 📝 License

MIT

## 🙏 Acknowledgments

- Built with TypeScript
- Uses **GitHub Copilot CLI** for code repair
- Powered by Commander.js for CLI
- Beautiful terminal UI with Chalk and @clack/prompts

---

**Made with ☢️ for the GitHub Copilot CLI Hackathon**
