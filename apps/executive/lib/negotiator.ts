// apps/executive/lib/negotiator.ts
import { ethers } from 'ethers';
import axios from 'axios';

const PRIVATE_KEY = process.env.NEXT_PUBLIC_EXEC_PRIVATE_KEY!;

// Base Sepolia USDC Address
// Check logic uses "payTo", "asset" from server response, but these defaults help 
const USDC_CONFIG = {
    name: 'USDC',
    version: '2',
    chainId: 84532,
    verifyingContract: '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
};

const TYPES = {
    TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' },
    ],
};

async function signPayment(requirementsWrapper: any) {
    if (!PRIVATE_KEY) throw new Error("Wallet Private Key missing in .env.local");

    // FIX 1: Access the actual requirements inside the 'accepts' array
    const req = requirementsWrapper.accepts ? requirementsWrapper.accepts[0] : requirementsWrapper;
    
    // OFFLINE WALLET (Fixes ENS Error) - No provider needed just to sign bytes
    const wallet = new ethers.Wallet(PRIVATE_KEY);

    const from = wallet.address;
    const to = req.payTo; // This was failing before because req was wrong level
    const value = req.amount; 
    
    // Valid for 1 hour
    const validAfter = 0;
    const validBefore = Math.floor(Date.now() / 1000) + 3600; 
    const nonce = ethers.hexlify(ethers.randomBytes(32));

    const message = {
        from,
        to,
        value,
        validAfter,
        validBefore,
        nonce
    };

    const domain = {
        name: req.extra?.name || USDC_CONFIG.name,
        version: req.extra?.version || USDC_CONFIG.version,
        chainId: USDC_CONFIG.chainId, // Ensure this matches Base Sepolia
        verifyingContract: req.asset || USDC_CONFIG.verifyingContract
    };

    console.log("[SIGNER] Signing offline for contract:", domain.verifyingContract);

    const signature = await wallet.signTypedData(domain, TYPES, message);

    // Structure for Protocol V2
    return {
        payload: {
            authorization: message,
            signature: signature
        },
        accepted: req // Echo back what we accepted
    };
}

export async function fetchWithBribery(url: string, originalBody: any, logCallback: (msg: string) => void) {
    try {
        logCallback(`[NETWORK] 📡 Calling ${url} ...`);
        
        // 1. Initial Attempt
        const res = await axios.post(url, originalBody, { validateStatus: () => true });

        // 2. Success (Already paid/Free)
        if (res.status === 200) {
            return res.data;
        }

        // 3. 402 Caught
        if (res.status === 402) {
            // FIX 2: Safely parse amount
            const reqs = res.data; 
            // reqs is { x402Version: 2, accepts: [...] }
            
            const requirement = reqs.accepts[0];
            const amountAtomic = parseInt(requirement.amount || "0");
            const price = (amountAtomic / 1000000).toFixed(2);
            
            logCallback(`[HTTP 402] 🛑 PAYMENT REQUIRED: $${price} USDC`);
            
            await new Promise(r => setTimeout(r, 800)); // Cinematic pause

            logCallback(`[WALLET] 🤖 Signing EIP-3009 Permit...`);
            
            // 4. SIGN
            const paymentPayload = await signPayment(reqs);
            logCallback(`[WALLET] ✍️ Signature Generated!`);
            
            // 5. RETRY with Payload
            // Merge original body logic
            const retryBody = {
                ...originalBody,
                ...paymentPayload
            };

            logCallback(`[NETWORK] 🔄 Sending Authorized Request...`);
            const retryRes = await axios.post(url, retryBody);
            
            logCallback(`[CHAIN] ✅ Facilitator verified & broadcast transaction!`);
            return retryRes.data;
        }

        throw new Error(`Unexpected Status: ${res.status}`);

    } catch (error: any) {
        logCallback(`[ERROR] 💥 ${error.response?.data?.error || error.message}`);
        console.error(error);
        return { result: "Failed" };
    }
}