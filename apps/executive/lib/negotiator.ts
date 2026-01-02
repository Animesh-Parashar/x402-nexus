// apps/executive/lib/negotiator.ts
import { ethers } from 'ethers';
import axios from 'axios';

const PRIVATE_KEY = process.env.NEXT_PUBLIC_EXEC_PRIVATE_KEY!;

// Constants for Base Sepolia USDC
const USDC_CONFIG = {
    name: 'USDC', // Must match the token's EIP712 name exactly
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

async function signPayment(requirements: any) {
    if (!PRIVATE_KEY) throw new Error("Wallet Private Key missing");
    
    // 1. Setup Wallet
    // Note: We use a random provider just to instantiate the wallet, 
    // strictly strictly for signing (offline operation)
    const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // 2. Prepare Payment Params
    const from = wallet.address;
    const to = requirements.payTo;
    const value = requirements.amount; // already in atomic units (e.g. 100000)
    const validAfter = 0;
    const validBefore = Math.floor(Date.now() / 1000) + 3600; // 1 hour expiration
    const nonce = ethers.hexlify(ethers.randomBytes(32));

    const message = {
        from,
        to,
        value,
        validAfter,
        validBefore,
        nonce
    };

    // 3. Construct EIP-712 Domain
    // Important: We override the name/version to match specific USDC implementations 
    // if the requirements.extra info is missing or generic.
    const domain = {
        name: requirements.extra?.name || USDC_CONFIG.name,
        version: requirements.extra?.version || USDC_CONFIG.version,
        chainId: USDC_CONFIG.chainId,
        verifyingContract: requirements.asset || USDC_CONFIG.verifyingContract
    };

    // 4. Sign
    const signature = await wallet.signTypedData(domain, TYPES, message);

    // 5. Package for x402 Server
    return {
        payload: {
            authorization: message,
            signature: signature
        },
        accepted: requirements // Return the requirements we accepted
    };
}

export async function fetchWithBribery(url: string, originalBody: any, logCallback: (msg: string) => void) {
    try {
        logCallback(`[NETWORK] 📡 Calling ${url} ...`);
        
        // 1. First Attempt (Will Fail)
        const res = await axios.post(url, originalBody, { validateStatus: () => true });

        // 2. Handle Success (Free API?)
        if (res.status === 200) {
            return res.data;
        }

        // 3. Handle 402 Payment Required
        if (res.status === 402) {
            const reqs = res.data; // The server returns JSON with payment requirements
            const price = (parseInt(reqs.amount) / 1000000).toFixed(2);
            
            logCallback(`[HTTP 402] 🛑 PAYMENT REQUIRED: $${price} USDC`);
            logCallback(`[WALLET] 🤖 Generating EIP-712 Permit Signature...`);
            
            // Artificial delay for dramatic effect in video
            await new Promise(r => setTimeout(r, 1000));
            
            // 4. SIGN
            const paymentProof = await signPayment(reqs);
            logCallback(`[WALLET] ✍️ Signature Generated!`);

            // 5. RETRY (Send proof + Original Body)
            // Protocol v2: Merge payment proof into body or headers.
            // Based on Starter Kit, we send proof in body.
            const payladWithProof = {
                ...originalBody,
                ...paymentProof // spreads "payload" and "accepted" top-level
            };

            logCallback(`[NETWORK] 🔄 Retrying with Payment Proof...`);
            const retryRes = await axios.post(url, payladWithProof);
            
            logCallback(`[CHAIN] ✅ Settlement Initiated by Facilitator.`);
            return retryRes.data;
        }

        throw new Error(`Unexpected Status: ${res.status}`);

    } catch (error: any) {
        logCallback(`[ERROR] 💥 ${error.response?.data?.error || error.message}`);
        console.error(error);
        return { result: "Failed" };
    }
}