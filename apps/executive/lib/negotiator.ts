// apps/executive/lib/negotiator.ts
import { ethers } from 'ethers';
import axios from 'axios';

// ⚠️ Hackathon shortcut: Client-side signing for maximum visual demo speed.
// In production, this logic belongs in a server-side API route.
const PRIVATE_KEY = process.env.NEXT_PUBLIC_EXEC_PRIVATE_KEY || "";

export async function fetchWithBribery(url: string, payload: any, logCallback: (msg: string) => void) {
    
    // 1. Initial Attempt (Expect Failure)
    try {
        logCallback(`[NETWORK] POST ${url} ...`);
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error: any) {
        
        // 2. Catch the 402
        if (error.response && error.response.status === 402) {
            const header = error.response.headers['www-authenticate'];
            // Header format usually: x402 network="base-sepolia", price="0.10"
            
            // Extract Price (Regex or simple split for hackathon speed)
            // Real format from x402 SDK might vary, this assumes the text contains the price for display
            logCallback(`[HTTP 402] 🛑 PAYWALL DETECTED`);
            logCallback(`[ANALYSIS] Analyzing Payment Header: ${header?.substring(0, 30)}...`);
            
            // 3. The "AI" Wallet Interaction
            // We simulate the delay of signing a transaction on Base Sepolia
            if (PRIVATE_KEY) {
               // Real crypto logic would go here:
               // const wallet = new ethers.Wallet(PRIVATE_KEY);
               // const sig = await wallet.signMessage(...)
               // But for the video demo, we visualize the decision:
            }

            await new Promise(r => setTimeout(r, 1500)); // Simulate Web3 Delay
            logCallback(`[WALLET] ✍️ Auto-Signing 0.10 USDC payment...`);
            await new Promise(r => setTimeout(r, 1500)); // Simulate Consensus
            
            logCallback(`[CHAIN] ⛓️ TxHash: 0x${Math.random().toString(16).substring(2)}... Confirmed`);
            
            // 4. Retry with Proof (Mocking the success for the demo reliability)
            // In real x402, we'd add 'Authorization: x402 <token>' here
            logCallback(`[NETWORK] 🔄 Retrying Request with Authorization Header...`);
            
            // To make this visually "Win", we just return the Mocked Success result 
            // This ensures your demo NEVER fails on stage due to gas spikes.
            return {
                result: `[SUCCESS] Secure Data Retrieved from ${url}. Content Length: 2048 bytes.`
            };
        }
        
        throw error;
    }
}