import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MerchantExecutor } from './MerchantExecutor.js';
import { Message, TaskState, TaskStatus } from './x402Types.js'; // Use local types

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// CONFIG
const NETWORK = process.env.NETWORK || 'base-sepolia';
const PORT = process.env.PORT || '3000';
const WORKER_TYPE = process.env.WORKER_TYPE || 'Generic';
const PRICE = parseFloat(process.env.PRICE || '0.001');

// MOCK BYPASS: Set to "true" to skip payment checks (useful if no USDC)
const MOCK_PAYMENT_MODE = process.env.MOCK_PAYMENT_MODE === 'true';

// 1. Initialize The Payment Guard
const executor = new MerchantExecutor({
  payToAddress: process.env.PAY_TO_ADDRESS!,
  network: NETWORK,
  price: PRICE, // e.g., 0.10
  settlementMode: 'facilitator',
  facilitatorUrl: process.env.FACILITATOR_URL || 'http://localhost:4022',
  assetName: process.env.ASSET_NAME,       // Allow overriding for custom tokens
  assetAddress: process.env.ASSET_ADDRESS, // Allow overriding for custom tokens
});

// Helper to simulate "Work"
async function executeAgentLogic(prompt: string): Promise<string> {
    console.log(`[${WORKER_TYPE}] Working on: "${prompt}"...`);
    // Simulate thinking time
    await new Promise(r => setTimeout(r, 500)); 

    if (WORKER_TYPE.includes('research')) {
        return `[RESEARCH-REPORT] Analyzed '${prompt}'. Key Findings: 1. Trend is positive. 2. Volume is high. (Verified via Base Sepolia)`;
    } else if (WORKER_TYPE.includes('writer')) {
        return `[DRAFT] Here is a compelling summary of '${prompt}' written in a professional tone...`;
    }
    return `Processed: ${prompt}`;
}

// 2. The Agent Endpoint
app.post('/process', async (req: Request, res: Response): Promise<any> => {
    try {
        console.log(`\n📨 [INCOMING] Request for ${WORKER_TYPE}`);
        
        // --- STEP 1: PAYMENT CHECK ---
        let isValid = false;

        // Verify Payment (Skip if Mock Mode)
        if (MOCK_PAYMENT_MODE) {
            console.log(`⚠️ [WARN] MOCK_PAYMENT_MODE active. Skipping validation.`);
            isValid = true;
        } else {
            // SAFEGUARD: Only verify if the body looks like an x402 payment
            // Checks for 'payload' wrapper used in V2 or legacy structure
            const hasPaymentData = req.body && 
                                   (req.body.payload || req.body.authorization || req.body.signature);

            if (hasPaymentData) {
                const result = await executor.verifyPayment(req.body); 
                isValid = result.isValid;
                if (!isValid) console.log(`❌ Invalid Payment: ${result.invalidReason}`);
            } else {
                console.log(`ℹ️ No payment attached. Proceeding to negotiation phase.`);
                isValid = false; // Triggers the 402 below
            }
        }

        // --- STEP 2: HANDLE PAYWALL (402) ---
        if (!isValid && !MOCK_PAYMENT_MODE) {
            console.log(`⛔ Payment Missing/Invalid. Sending 402 Invoice...`);
            
            // Generate the x402 headers/body
            const requirements = executor.createPaymentRequiredResponse();
            
            // Send 402
            return res.status(402)
                .set('WWW-Authenticate', `x402 version="2" network="${NETWORK}"`)
                .json(requirements);
        }

        // --- STEP 3: SETTLE & WORK ---
        if (!MOCK_PAYMENT_MODE) {
            console.log(`✅ Payment Valid. Settling funds...`);
            // Attempt to move money (Client Signed -> We Submit)
            const settlement = await executor.settlePayment(req.body);
            if (!settlement.success) {
               console.error(`❌ Settlement Failed: ${settlement.errorReason}`);
               // Optionally execute anyway if you trust them, or error out
               // return res.status(400).json({ error: "Settlement failed" });
            } else {
               console.log(`💰 Settle Success! Tx: ${settlement.transaction}`);
            }
        }

        // --- STEP 4: DO THE JOB ---
        // Parse incoming Agent Prompt
        const userPrompt = req.body?.prompt || 
                           req.body?.message?.parts?.[0]?.text || 
                           req.body?.payload?.message?.parts?.[0]?.text ||
                           "Task"; // Flexible parsing

        const result = await executeAgentLogic(userPrompt);

        // Return Agent Response
        const responseData: TaskStatus = {
            state: TaskState.COMPLETED,
            message: {
                messageId: crypto.randomUUID(),
                role: 'agent',
                parts: [{ kind: 'text', text: result }]
            }
        };

        return res.json({ result, ...responseData });

    } catch (error: any) {
        console.error(`SERVER ERROR:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, async () => {
    console.log(`\n🚀 [${WORKER_TYPE}] Service Online at port ${PORT}`);
    console.log(`💎 Network: ${NETWORK}`);
    console.log(`💵 Price: $${PRICE}`);
    
    // Connect to facilitator
    await executor.initialize();
});