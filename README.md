# NeuroWeave

![Status](https://img.shields.io/badge/Status-Self--Evolving-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**The Self-Evolving Agentic Experience Platform (AXP)**

NeuroWeave is a modular ecosystem designed to orchestrate multi-agent swarms, render agentic UI streams, and maintain system integrity through self-healing mechanisms. It goes beyond static applications by creating a dynamic, living system that learns and adapts.

---

## 🏗 Architecture

The platform is designed as a modular monorepo, with clear separation of concerns between orchestration, presentation, quality assurance, and context management.

```mermaid
graph TD
    User((User))
    UI[Gemini-UI<br/>(Next.js)]
    Weaver[Weaver Engine<br/>(LangGraph)]
    Drift[Drift-Guard<br/>(Self-Healing)]
    Context[Context-Bridge<br/>(Memory & MCP)]

    User <-->|Interacts| UI
    UI <-->|Streams UI| Weaver
    Weaver <-->|Manages State| Context
    Drift -->|Monitors| UI
    Drift -->|Reports| Weaver
```

---

## 🧩 Core Modules

The system is composed of four primary engines:

### 1. **Module A: The Weaver** (`/engines/weaver`)
- **Role**: Intelligent Orchestration & Business Logic
- **Tech Stack**: Python, LangGraph, FastAPI
- **Responsibility**: Manages agent swarms using a "Supervisor-Worker" topology. Ideally handles complex decision-making and orchestrates the flow of information between other modules.

### 2. **Module B: Gemini-UI** (`/apps/gemini-ui`)
- **Role**: Presentation Layer & Interaction
- **Tech Stack**: Next.js 16, React Server Components, TailwindCSS
- **Responsibility**: Renders Generative UI (A2UI) streams into a pixel-perfect, responsive interface. It serves as the primary touchpoint for users.

### 3. **Module C: Drift-Guard** (`/engines/drift-guard`)
- **Role**: Quality Assurance & Self-Healing
- **Tech Stack**: Python, Playwright/Selenium, Computer Vision
- **Responsibility**: Monitors the UI for visual drift and accessibility compliance. It acts as an automated QA engineer that can detect and report interface anomalies.

### 4. **Module D: Context-Bridge** (`/engines/context-bridge`)
- **Role**: Memory, Context & Integration
- **Tech Stack**: Python, Model Context Protocol (MCP), pgvector
- **Responsibility**: Connects the agentic brain to external data sources (GitHub, Figma, Linear) and manages long-term memory via vector embeddings.

---

## 🚀 Getting Started

Follow these instructions to set up the NeuroWeave ecosystem locally.

### Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)
- **Docker** (Optional, for containerized deployment)

### Installation & Running

The project is structured as a monorepo. You will need to set up each module individually for local development.

#### 1. Gemini-UI (Frontend)
```bash
cd apps/gemini-ui
npm install
npm run dev
# Access the UI at http://localhost:3000
```

#### 2. Weaver Engine (Orchestration)
```bash
cd engines/weaver
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python main.py
```

#### 3. Drift-Guard (QA)
```bash
cd engines/drift-guard
python -m venv venv
# Activate venv
pip install -r requirements.txt
python main.py
```

#### 4. Context-Bridge (Memory)
```bash
cd engines/context-bridge
python -m venv venv
# Activate venv
pip install -r requirements.txt
python main.py
```

---

## ⚙️ Configuration

Each module typically requires its own environment variables.
- Look for `.env.example` files in each directory.
- Copy them to `.env` and fill in the required API keys (e.g., OpenAI, Anthropic, Database URLs).

Example:
```bash
cp engines/weaver/.env.example engines/weaver/.env
```

---

## 🗺 Roadmap

- [ ] **Unified CLI**: A single command-line tool to start all services.
- [ ] **Docker Compose**: Containerize all services for one-click startup.
- [ ] **Enhanced Memory**: Deeper integration with vector databases for context retention.
- [ ] **Visual Builder**: A drag-and-drop interface for constructing agent workflows.

---

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
