// apps/executive/app/page.tsx
"use client";
import { useState, useRef, useEffect } from 'react';
import { fetchWithBribery } from '../lib/negotiator';

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const executeMission = async () => {
    setIsProcessing(true);
    setLogs([]);
    
    try {
        addLog("------------------------------------------------");
        addLog("SYSTEM INITIALIZED. PROTOCOL: X402");
        addLog("TASK: Market Analysis for 'Standard Oil'");
        addLog("------------------------------------------------");
        await new Promise(r => setTimeout(r, 800));

        addLog("[PLANNER] 🤖 Task too large for single agent.");
        addLog("[PLANNER] 📉 Splitting task into sub-contracts...");
        await new Promise(r => setTimeout(r, 800));

        // CALL WORKER 1 (RESEARCHER)
        addLog("------------------------------------------------");
        addLog("[STEP 1] Contracting Research Agent...");
        const res1 = await fetchWithBribery("http://localhost:3001/process", { prompt: "Standard Oil" }, addLog);
        addLog(`[DATA] 📥 Payload received: ${res1.result}`);
        
        await new Promise(r => setTimeout(r, 800));

        // CALL WORKER 2 (WRITER)
        addLog("------------------------------------------------");
        addLog("[STEP 2] Contracting Writer Agent...");
        const res2 = await fetchWithBribery("http://localhost:3002/process", { prompt: "Summary" }, addLog);
        addLog(`[DATA] 📥 Payload received: ${res2.result}`);
        
        addLog("------------------------------------------------");
        addLog("✅ MISSION COMPLETE. PDF GENERATED.");
        addLog("TOTAL COST: $0.15 USDC");

    } catch (e: any) {
        addLog(`❌ FATAL ERROR: ${e.message}`);
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-green-500 font-mono p-4 md:p-12">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex border-b border-green-800 pb-4 mb-10">
        <h1 className="text-4xl font-bold tracking-tighter shadow-green-500">NEXUS EXECUTIVE</h1>
        <div className="flex items-center space-x-4">
           <span className="animate-pulse">● LIVE</span>
           <span>NET: BASE SEPOLIA</span>
        </div>
      </div>

      <div className="relative w-full max-w-4xl h-[500px] bg-[#0a0a0a] border border-green-900 rounded-md shadow-2xl overflow-hidden p-6 font-mono text-sm md:text-base leading-relaxed">
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] opacity-20"></div>
        
        <div className="h-full overflow-y-auto pr-2 space-y-1">
            {logs.length === 0 && (
                <div className="flex items-center justify-center h-full text-green-900 animate-pulse">
                    AWAITING INSTRUCTIONS...
                </div>
            )}
            {logs.map((log, i) => (
              <div key={i} className={`break-words ${log.includes("402") ? "text-red-500 font-bold" : ""} ${log.includes("TX") ? "text-yellow-400" : ""}`}>
                  <span className="opacity-50 mr-2">
                    {new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})} 
                  </span>
                  {log}
              </div>
            ))}
            <div ref={logEndRef} />
        </div>
      </div>

      <button 
        onClick={executeMission} 
        disabled={isProcessing}
        className={`mt-10 px-10 py-5 bg-green-700 text-black font-black text-xl hover:bg-green-500 rounded uppercase tracking-widest transition-all hover:scale-105 shadow-lg shadow-green-900/50 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isProcessing ? "NEGOTIATING..." : "EXECUTE SUPPLY CHAIN"}
      </button>

      <div className="fixed bottom-4 right-4 text-xs text-green-900">
        POWERED BY x402 PROTOCOL
      </div>
    </main>
  );
}