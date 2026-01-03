<div align="center">
  <h1>⚡️ Nexus Protocol</h1>
  <h3>The Operating System for Agentic Commerce</h3>
  
  <p>
    <strong>Autonomous Marketplace</strong> • <strong>x402 Native</strong> • <strong>Zero-Friction Settlement</strong>
  </p>


  ![Status](https://img.shields.io/badge/Status-Hackathon-success?style=for-the-badge)
  ![Network](https://img.shields.io/badge/Network-Base_Sepolia-blue?style=for-the-badge)
  ![Protocol](https://img.shields.io/badge/Protocol-x402_V2-orange?style=for-the-badge)
  
</div>

---
## 🌐 Overview

Nexus Protocol is an operating system for agentic commerce, enabling autonomous AI agents to discover, negotiate, and transact with each other without human intervention. Built on the x402 V2 protocol, Nexus transforms the internet into a machine economy where agents act as independent economic actors.

### Key Features

- **🤖 Autonomous Agent Economy**: Agents possess wallets and make independent economic decisions
- **💰 Micro-payment Infrastructure**: Sub-cent transactions with millisecond settlement times
- **🔒 Cryptographically Secure**: EIP-3009 authorization signatures for trustless payments
- **⚡️ Zero-Friction Commerce**: Automatic price discovery and negotiation
- **🌍 Decentralized Marketplace**: Open network for agent-to-agent services
- **📊 Real-time Analytics**: Complete transaction visibility and monitoring

---

## 🎯 Problem Statement

### Current State: The AI Agent Economic Paralysis

Modern AI agents are cognitively powerful but economically constrained:

```
┌─────────────────────────────────────────────────────────┐
│  Current AI Agent Limitations                           │
├─────────────────────────────────────────────────────────┤
│  ❌ Cannot purchase specialized datasets ($0.05)        │
│  ❌ Cannot hire premium compute resources ($0.10)       │
│  ❌ Cannot compensate other agents for services         │
│  ❌ Require human credit cards for every transaction    │
│  ❌ Cannot participate in open marketplaces             │
│  ❌ No autonomous economic decision-making              │
└─────────────────────────────────────────────────────────┘
```

**The Bottleneck**: Every AI agent advancement is throttled by payment infrastructure designed for humans, not machines.

---

## ✨ Solution

Nexus Protocol introduces **Agentic Commerce** - a complete operating system where AI agents function as autonomous economic actors.

### Core Innovation: The x402 Payment Protocol

```
Traditional API                    Nexus Protocol
─────────────────                  ───────────────
API Key Required      ──────►      Wallet Required
Monthly Subscription  ──────►      Pay-per-Request
Human Authorization   ──────►      Agent Authorization
Static Pricing        ──────►      Dynamic Markets
Centralized Access    ──────►      Decentralized Discovery
```

### Economic Transformation

| Metric | Before Nexus | With Nexus |
|--------|--------------|------------|
| **Transaction Size** | $5+ minimum | $0.01+ micro-payments |
| **Settlement Time** | 2-3 business days | <500ms |
| **Agent Autonomy** | 0% (human required) | 100% autonomous |
| **Market Access** | Centralized APIs | Open marketplace |
| **Cost Structure** | Fixed subscriptions | Usage-based pricing |

---

## 📽 Live Demo

### Demo Flow: Autonomous Research Task

Watch Nexus orchestrate a multi-agent workflow with zero human intervention:

```
User Request: "Research Standard Oil history and create a PDF report"
           ↓
    [Nexus Executive]
           ↓
    Discovery Phase → Scans network for capable agents
           ↓
    ┌──────────────────────────────────────────┐
    │  🔍 Research Node Found                  │
    │  Price: $0.10 USDC                       │
    │  Capability: Historical Research         │
    └──────────────────────────────────────────┘
           ↓
    HTTP 402 Payment Required ← Initial request blocked
           ↓
    [Autonomous Negotiation]
    - Executive signs EIP-3009 authorization
    - Off-chain signature (no gas cost)
    - Cryptographically bound payment
           ↓
    ⛓️ On-Chain Settlement (Base Sepolia)
    - Facilitator validates signature
    - USDC transferred atomically
    - Transaction confirmed in ~2 seconds
           ↓
    📦 Data Delivered → Research complete
           ↓
    ┌──────────────────────────────────────────┐
    │  ✍️ Writer Node Found                    │
    │  Price: $0.05 USDC                       │
    │  Capability: PDF Generation              │
    └──────────────────────────────────────────┘
           ↓
    [Repeat Payment Cycle]
           ↓
    📄 Final Deliverable: Professional PDF Report
    
Total Cost: $0.15 | Total Time: ~8 seconds | Human Interventions: 0
```

---

## 🏗 Architecture

### System Overview

```mermaid
graph TB
    subgraph "Client Layer"
        UI[Web Interface]
        Executive[Executive Agent<br/>Payment Orchestrator]
    end
    
    subgraph "Service Layer"
        Research[Research Node<br/>$0.10/request]
        Writer[Writer Node<br/>$0.05/request]
        Compute[Compute Node<br/>$0.25/request]
        Data[Data Node<br/>$0.08/request]
    end
    
    subgraph "Protocol Layer"
        Facilitator[x402 Facilitator<br/>Settlement Engine]
        Discovery[Service Discovery<br/>Registry]
    end
    
    subgraph "Blockchain Layer"
        Base[Base Sepolia<br/>Settlement Layer]
        USDC[USDC Contract<br/>Payment Token]
    end
    
    UI -->|Task Request| Executive
    Executive -->|Discover Services| Discovery
    Discovery -->|Available Nodes| Executive
    Executive -->|402 Request| Research
    Research -->|Payment Required| Executive
    Executive -->|Signed Auth| Research
    Research -->|Validate & Settle| Facilitator
    Facilitator -->|Execute Transfer| Base
    Base -->|Confirm| Facilitator
    Facilitator -->|Payment Verified| Research
    Research -->|Deliver Data| Executive
    
    Executive -->|Next Task| Writer
    Writer -->|Payment Required| Executive
    Executive -->|Signed Auth| Writer
    Writer -->|Validate & Settle| Facilitator
    
    Base -.->|USDC Operations| USDC
    
    style Executive fill:#00d4ff,stroke:#0099cc,stroke-width:3px
    style Facilitator fill:#ff6b6b,stroke:#cc0000,stroke-width:3px
    style Base fill:#0052ff,stroke:#0039b3,stroke-width:3px
```

### Network Topology

```mermaid
graph LR
    subgraph "Agent Ecosystem"
        E1[Executive 1<br/>Wallet: 0x123...]
        E2[Executive 2<br/>Wallet: 0x456...]
        E3[Executive 3<br/>Wallet: 0x789...]
    end
    
    subgraph "Worker Nodes"
        W1[Research<br/>Price: $0.10]
        W2[Writer<br/>Price: $0.05]
        W3[Compute<br/>Price: $0.25]
        W4[Data<br/>Price: $0.08]
        W5[Analysis<br/>Price: $0.15]
    end
    
    subgraph "Settlement Infrastructure"
        F[Facilitator<br/>Gas Optimizer]
        B[Base Sepolia<br/>L2 Blockchain]
    end
    
    E1 -.->|Discovery| W1
    E1 -.->|Discovery| W2
    E2 -.->|Discovery| W3
    E2 -.->|Discovery| W4
    E3 -.->|Discovery| W5
    
    W1 -->|Settle| F
    W2 -->|Settle| F
    W3 -->|Settle| F
    W4 -->|Settle| F
    W5 -->|Settle| F
    
    F -->|Batch TX| B
    
    style E1 fill:#00d4ff,stroke:#0099cc
    style E2 fill:#00d4ff,stroke:#0099cc
    style E3 fill:#00d4ff,stroke:#0099cc
    style F fill:#ff6b6b,stroke:#cc0000
    style B fill:#0052ff,stroke:#0039b3
```

---

## 🔧 System Components

### 1. Executive Agent (Buyer)

The autonomous client that discovers and hires worker nodes.

**Key Responsibilities:**
- Service discovery and capability matching
- Autonomous payment negotiation
- Cryptographic signature generation
- Task orchestration and workflow management
- Error handling and retry logic

**Technology:**
- Next.js 14 (Frontend)
- Ethers.js v6 (Wallet operations)
- TypeScript (Type safety)

**Code Structure:**
```
apps/executive/
├── app/
│   ├── page.tsx        # Real-time agent activity # Payment history # Workflow UI
├── lib/
│   ├── negotiator.ts        # 402 handler & signer # Wallet abstraction # Service registry client

```

### 2. Worker Nodes (Sellers)

Specialized service providers that charge per request.

**Node Types:**
- **Research Node**: Historical data gathering ($0.10)
- **Writer Node**: Content generation ($0.05)
- **Compute Node**: Heavy processing ($0.25)
- **Data Node**: Dataset access ($0.08)

**Capabilities:**
- Dynamic pricing based on demand
- Payment verification middleware
- Service health monitoring
- Automatic failover

**Code Structure:**
```
apps/worker/
             
├── src/
│   ├── faciliator.ts         
│   └── MerchantExecutor.ts
|   └── server.ts         # Express API server
|   └── x402Types.ts 

```

### 3. x402 Facilitator (Settlement Engine)

The infrastructure layer that settles payments on-chain.

**Key Functions:**
- EIP-3009 signature validation
- Gas optimization (batching)
- Transaction status tracking
- Nonce management
- Fallback providers

---

## 💳 Payment Flow

### Detailed Transaction Sequence

```mermaid
sequenceDiagram
    autonumber
    participant E as 🤖 Executive<br/>(Buyer Agent)
    participant W as 🧪 Worker Node<br/>(Seller Agent)
    participant F as ⚙️ Facilitator<br/>(Settlement)
    participant B as ⛓️ Base Sepolia<br/>(Blockchain)

    Note over E,B: Phase 1: Discovery & Initial Request
    
    E->>W: GET /process<br/>{task: "research"}
    Note over W: Check for payment
    W-->>E: ⛔️ 402 Payment Required<br/>{amount: "100000", asset: "0x...", nonce: "abc123"}
    
    Note over E,B: Phase 2: Off-Chain Authorization
    
    Note over E: Generate EIP-3009 permit
    E->>E: Sign typed data:<br/>- from: executive_wallet<br/>- to: worker_wallet<br/>- amount: 100000<br/>- validAfter: now<br/>- validBefore: now+1hr
    
    Note over E,B: Phase 3: Payment Submission
    
    E->>W: POST /process<br/>{task: "research", payment: {signature, ...}}
    
    Note over W: Validate signature locally
    W->>W: ✓ Signature valid<br/>✓ Amount correct<br/>✓ Not expired
    
    Note over E,B: Phase 4: On-Chain Settlement
    
    W->>F: POST /settle<br/>{signature, from, to, amount}
    F->>F: Verify nonce not used
    F->>B: transferWithAuthorization()<br/>USDC Contract Call
    
    Note over B: Execute atomic transfer<br/>Gas paid by Facilitator
    
    B-->>F: ✅ TX Hash: 0x789...<br/>Block: #12345678
    F-->>W: ✅ Settlement confirmed
    
    Note over E,B: Phase 5: Service Delivery
    
    W->>W: Execute task:<br/>research("Standard Oil")
    W-->>E: 📦 Response Data<br/>{result: {...}, tx: "0x789..."}
    
    Note over E: Task complete<br/>Continue to next agent
    
    rect rgb(200, 255, 200)
        Note over E,B: ✓ Total Time: ~3-5 seconds<br/>✓ Gas Cost: Amortized by Facilitator<br/>✓ Human Interventions: 0
    end
```

### Payment States

```mermaid
stateDiagram-v2
    [*] --> Pending: Request initiated
    Pending --> Authorized: Signature generated
    Authorized --> Validating: Sent to worker
    Validating --> Settling: Worker validates
    Validating --> Rejected: Invalid signature
    Settling --> Confirmed: On-chain success
    Settling --> Failed: Blockchain error
    Confirmed --> [*]: Service delivered
    Rejected --> [*]: Retry or abort
    Failed --> Retry: Transient failure
    Retry --> Settling: Resubmit
    Retry --> [*]: Max retries exceeded
    
    note right of Authorized
        Off-chain operation
        No gas cost
    end note
    
    note right of Settling
        On-chain transaction
        Facilitator pays gas
    end note
```

---

## 💻 Technology Stack

### Frontend Layer
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **State Management**: React Context + Zustand
- **Charts**: Recharts + D3.js

### Backend Layer
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js 4.18
- **Language**: TypeScript 5.3

### Blockchain Layer
- **Network**: Base Sepolia (L2)
- **Wallet**: Ethers.js v6 + Viem
- **Token**: USDC (ERC-20)
- **Standard**: EIP-3009 (Authorization)
- **Provider**: Alchemy/Infura with fallback

### Infrastructure
- **Monorepo**: Turborepo
- **Package Manager**: npm workspaces
- **Testing**: Jest + Vitest

### Protocol
- **Core**: x402 V2 specification
- **Settlement**: Custom facilitator
- **Discovery**: Decentralized registry

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed and configured:

```bash
# Required versions
Node.js >= 18.0.0
npm >= 9.0.0

# Required accounts
✓ Base Sepolia ETH (for gas)
✓ Base Sepolia USDC (for payments)
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourorg/x402-nexus.git
cd x402-nexus

# 2. Install dependencies (uses workspace)
npm install

# 3. Build shared packages
npm run build:packages
```

### Configuration

Create environment files for each component:

**`apps/worker/.env`:**
```bash
# Setup
PORT=3001
SERVICE_TYPE=researcher
PRICE=0.10

# Wallets
PAY_TO_ADDRESS=

# Network
NETWORK=base-sepolia
SETTLEMENT_MODE=facilitator
FACILITATOR_URL=http://localhost:4022

# Infrastructure (For the Facilitator Script to run later)
FACILITATOR_PORT=4022
EVM_PRIVATE_KEY=
FACILITATOR_EVM_NETWORK=base-sepolia
```

**`apps/executive/.env.local`:**
```bash
NEXT_PUBLIC_EXEC_PRIVATE_KEY=ox[pvt_key]
```

### Running the System

Open **four terminal windows** and run each component:

**Terminal 1: Settlement Infrastructure**
```bash
cd apps/wprket
npm run start:facilitator

expected output
> worker@1.0.0 start:facilitator
> tsx src/facilitator.ts

💼 EVM Facilitator account: 0x..
🔗 Registered EVM network: eip155:84532

✅ x402 Facilitator running on http://localhost:4022
📖 Health check: http://localhost:4022/health
🔗 Supported: http://localhost:4022/supported

🌐 Enabled networks:
   ✅ EVM: eip155:84532 (base-sepolia)
   ❌ SVM: Not configured (set SVM_PRIVATE_KEY to enable)
```

**Terminal 2: Research Worker Node**
```bash
cd apps/worker PORT=3001 SERVICE_TYPE=researcher PRICE=0.01 NETWORK=base-sepolia npm run dev

expected output
> worker@1.0.0 dev
> tsx watch src/server.ts


🚀 [Generic] Service Online at port 3001
💎 Network: base-sepolia
💵 Price: $0.01
✅ x402 Resource Server initialized with facilitator

```

**Terminal 3: Writer Worker Node**
```bash
cd apps/worker PORT=3002 WORKER_TYPE=writer PRICE=0.01 NETWORK=base-sepolia npm run dev

expected output
> worker@1.0.0 dev
> tsx watch src/server.ts


🚀 [writer] Service Online at port 3002
💎 Network: base-sepolia
💵 Price: $0.01
✅ x402 Resource Server initialized with facilitator

```

**Terminal 4: Executive Dashboard**
```bash
cd apps/executive
npm run dev

# Expected output:
# ✅ Executive Agent ready
# 🔍 Discovered 2 worker nodes
# 🌐 Dashboard: http://localhost:3000
```

### Verification

Visit `http://localhost:3000` and verify:
- ✅ Worker nodes appear in service registry
- ✅ Wallet balances display correctly
- ✅ Transaction log is empty (pre-activity)

**Run Test Transaction:**
```bash
curl -X POST http://localhost:3000/api/task \
  -H "Content-Type: application/json" \
  -d '{"task": "Research the history of Standard Oil", "maxBudget": "0.50"}'
```

Watch the logs across all terminals to see the autonomous payment flow.

---

## 📚 API Reference

### Executive Agent API

#### `POST /api/task`
Submit a task for autonomous execution.

**Request:**
```json
{
  "task": "string",
  "maxBudget": "string",
  "requiredCapabilities": ["research", "writing"],
  "deadline": "2024-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "taskId": "task_abc123",
  "status": "processing",
  "estimatedCost": "0.15",
  "workersHired": [
    {
      "nodeId": "research_node_1",
      "service": "research",
      "price": "0.10",
      "status": "pending"
    }
  ]
}
```

### Worker Node API

#### `GET /health`
Check node status and pricing.

**Response:**
```json
{
  "status": "healthy",
  "service": "research",
  "priceUSDC": "0.10",
  "capabilities": ["historical_research", "data_synthesis"],
  "availability": "available",
  "queueLength": 3
}
```

#### `GET /process`
Initial request (triggers 402).

**Response (402 Payment Required):**
```http
HTTP/1.1 402 Payment Required
WWW-Authenticate: x402 network="base-sepolia"
Content-Type: application/json

{
  "message": "Payment required",
  "amount": "100000",
  "asset": "0x036CbD53...",
  "recipient": "0x1234...",
  "nonce": "abc123xyz",
  "validUntil": "2024-03-15T11:00:00Z",
  "network": "base-sepolia"
}
```

#### `POST /process`
Execute task with payment.

**Request:**
```json
{
  "task": "Research Standard Oil history",
  "payment": {
    "from": "0xABCD...",
    "to": "0x1234...",
    "amount": "100000",
    "validAfter": "0",
    "validBefore": "1710504000",
    "nonce": "abc123xyz",
    "signature": "0x..."
  }
}
```

**Response:**
```json
{
  "taskId": "task_xyz789",
  "result": {
    "summary": "Standard Oil was...",
    "sources": ["..."],
    "confidence": 0.95
  },
  "settlement": {
    "txHash": "0x789...",
    "block": 12345678
  }
}
```

### Facilitator API

#### `POST /settle`
Settle a payment on-chain.

**Request:**
```json
{
  "from": "0xABCD...",
  "to": "0x1234...",
  "amount": "100000",
  "validAfter": "0",
  "validBefore": "1710504000",
  "nonce": "abc123xyz",
  "signature": "0x...",
  "network": "base-sepolia"
}
```

**Response:**
```json
{
  "status": "confirmed",
  "txHash": "0x789abc...",
  "blockNumber": 12345678,
  "gasUsed": "45000"
}
```

---

## 🔮 Future Roadmap

### Phase 1: Enhanced Discovery (Q2 2024)
- **Dynamic Reputation System**: Agents rate each other after successful transactions
- **Capability Matching**: Advanced filtering based on agent specializations
- **Service Level Agreements**: Automated SLA enforcement and penalties

### Phase 2: Advanced Economics (Q3 2024)
- **Reverse Auctions**: Executives post bounties, lowest bid worker wins
- **Dynamic Pricing**: Real-time price adjustments based on demand/supply
- **Staking Mechanisms**: Workers stake collateral for reputation

### Phase 3: Streaming Payments (Q4 2024)
- **Pay-per-Token**: Real-time payments as LLM tokens are generated
- **Superfluid Integration**: Continuous money streams for long-running tasks
- **Micropayment Channels**: State channels for ultra-low latency

### Phase 4: Cross-Chain Expansion (2025)
- **Multi-chain Support**: Ethereum, Arbitrum, Optimism, Polygon
- **Bridge Integration**: Automatic cross-chain settlement
- **Universal Agent Identity**: Portable reputation across chains

---

## ⚡️ Technical Highlights

### 1. The Negotiator (`negotiator.ts`)
This is the brain of the Executive agent. It catches HTTP 402 errors and automatically signs the required cryptographic authorization.

```typescript
// Detects Paywall
if (error.response.status === 402) {
    const requirements = error.response.data;
    
    // Autonomously Signs Permission
    const signature = await wallet.signTypedData(
        USDC_DOMAIN, 
        EIP3009_TYPES, 
        paymentMessage
    );
    
    // Retries Request with Money Attached
    return retryRequest(url, signature);
}
```

### 2. The Worker Node (`server.ts`)
Dynamic pricing capability. A worker can change its price instantly based on demand, effectively creating a real-time order book for compute.

```typescript
// Payment Guard Middleware
const payment = await executor.verifyPayment(req.body);

if (!payment.isValid) {
    return res.status(402)
       .set('WWW-Authenticate', `x402 network="base-sepolia"`)
       .json(executor.createPaymentRequiredResponse());
}
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

<div align="center">
  <p><strong>Built for the x402 2026 Hackathon</strong></p>
  <p><em>Automating the World's Economy, One Transaction at a Time</em></p>
  
</div>
