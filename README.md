# ☢️ Carnitrix-ai
AI-Powered Code Evolution & Risk Intelligence Engine

Carnitrix-ai is a CLI tool that acts as a security guard and code doctor for your projects. It scans your codebase, identifies issues before they become bugs, predicts potential failure points, and can even autonomously fix code using AI.

## 🎯 Features
### 🔍 Project Scanning
Complexity analysis
Security vulnerability detection
Code smell identification
Git volatility scoring
### 🛡️ Security Audit
Detects:

Hardcoded API keys and passwords
SQL injection risks
XSS vulnerabilities
Buffer overflow patterns
Command injection risks
Unsafe eval usage
### 🔮 Failure Forecasting
Uses Git history to predict:

Files most likely to break
High-risk areas based on edit frequency
Complexity growth trends
### 🤖 AI Code Repair
Automatic refactoring suggestions
Security improvements
Complexity reduction
Code smell fixes
### 📊 Risk Scoring
Calculates a comprehensive risk score (0–100) based on:

Complexity (23%)
Security (0%)
Git Volatility (0%)
Code Smells (0%)
Note: Risk score weights are currently placeholder values and will be refined in future updates.

## 🚀 Quick Start
### Installation

### Clone the repository
git clone https://github.com/rehanqureshi-1786/carnitrix-ai.git
cd carnitrix-ai

### Install dependencies
npm install

### Build the project
npm run build

### CLI Commands
Command	Description
scan	Analyze entire project for issues
review	Check latest Git commit for problems
trend <file>	Show how a file has changed over time
forecast	Predict where bugs might happen next
security	Run full security audit
exploit-sim <file>	Simulate exploit vectors (safe)
fix <file>	AI-powered code repair (requires API key)
demo	Run automated hackathon demonstration

### First Run (Demo Mode)
### Run the automated hackathon demo
npm start demo

### Or with cinematic animations
npm start demo --cinematic

Demo includes:

Autonomous Integrity Scan – Comprehensive code analysis
Exploit Vector Simulation – Safe vulnerability demonstration
Predictive Failure Analysis – Git-based forecasting
AI-Guided Defensive Measures – AI integration showcase
## Usage Example
### Scan and save results to a markdown report
npm start scan --output project_report.md

### Run AI-powered code repair
npm start fix src/your-file.ts

## 🤖 AI Features (Optional)
To use AI-powered code repair:

Get your API key from Google AI Studio
Create a .env file in the project root:
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

(Alternatively, use GOOGLE_API_KEY)
Run the AI repair:
npm start fix src/your-file.ts

## 🎬 Hackathon Demo Mode
The demo mode showcases all features in an automated sequence:

npm start demo

Features demonstrated:

Autonomous Integrity Scan
Exploit Vector Simulation
Predictive Failure Analysis
AI-Guided Defensive Measures
## 🛠️ Development
### Build TypeScript
npm run build

### Run in development mode
npm run dev

### Start the CLI
npm start

## 📁 Project Structure

carnitrix-ai/

├── src/

│   ├── ai/             # AI integration (Gemini)

│   ├── cli/            # CLI commands and demo

│   ├── core/           # Core scanning and analysis

│   ├── git/            # Git history analysis

│   ├── risk/           # Risk scoring and forecasting

│   ├── security/       # Security auditing

│   └── utils/          # Visuals, animations, reports

├── assets/             # Demo files

├── dist/               # Compiled JavaScript

└── package.json

## 📝 License
MIT

## 🙏 Acknowledgments
Built with:

TypeScript
Google Gemini AI for code repair
Commander.js for CLI
Chalk and @clack/prompts for beautiful terminal UI 
Made with ☢️ for the GitHub Copilot CLI Hackathon

TypeScript
Google Gemini AI for code repair
Commander.js for CLI
Chalk and @clack/prompts for beautiful terminal UI 
Made with ☢️ for the GitHub Copilot CLI Hackathon
