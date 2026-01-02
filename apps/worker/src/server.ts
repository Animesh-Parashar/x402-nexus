import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MerchantExecutor } from './MerchantExecutor';
import { OpenAI } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// CONFIG
const NETWORK = process.env.NETWORK || 'base-sepolia';
const PRICE_USD = process.env.PRICE || '0.10'; // $0.10
const SERVICE_TYPE = process.env.SERVICE_TYPE || 'researcher';

// X402 EXECUTOR
// X402 EXECUTOR
// Fixed: Passed as a single Configuration Object to match V2 signature
const executor = new MerchantExecutor({
    address: process.env.PAY_TO_ADDRESS!, 
    network: NETWORK, 
    settlementMode: (process.env.SETTLEMENT_MODE as any) || 'facilitator',
    facilitatorUrl: process.env.FACILITATOR_URL,
    privateKey: process.env.PRIVATE_KEY
});

// MOCK AI SERVICE (Simulates the work)
async function doWork(prompt: string) {
    // If you have an OpenAI Key, uncomment this. Otherwise use the mock below.
    /*
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: `You are a ${SERVICE_TYPE}.` }, { role: "user", content: prompt }]
    });
    return response.choices[0].message.content;
    */
   
    // MOCK RESPONSE FOR SPEED
    if (SERVICE_TYPE === 'researcher') return `[RESEARCH-DATA]: Deep dive analysis on ${prompt}. Validated sources.`;
    if (SERVICE_TYPE === 'writer') return `[DRAFT-CONTENT]: Creative summary of ${prompt} written in high-quality prose.`;
    return "Unknown service";
}

// THE PAID ENDPOINT
app.post('/process', async (req, res) => {
    try {
        console.log(`[${SERVICE_TYPE.toUpperCase()}] Request received...`);
        
        // 1. Check for x402 payment
        const paymentResult = await executor.validatePayment(req);
        
        // 2. If no payment, throw 402 with Invoice
        if (paymentResult.status === 'payment_required') {
            console.log(`-> Demanding Payment: ${paymentResult.paymentRequest.price}`);
            return res.status(402)
                .set('WWW-Authenticate', `x402 ${paymentResult.paymentRequest.header}`)
                .json(paymentResult.paymentRequest);
        }

        // 3. If paid, do the work
        console.log(`-> Payment Verified! processing...`);
        const { prompt } = req.body;
        const result = await doWork(prompt);
        
        return res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`${SERVICE_TYPE} running on port ${PORT} | Price: $${PRICE_USD}`));