"use client";
import { useState, useRef, useEffect } from 'react';
import { fetchWithBribery } from '../lib/negotiator';

// --- CONFIG ---
const AGENT_MARKETPLACE = [
  { id: '1', name: 'RESEARCH-NODE-ALPHA', url: 'http://localhost:3001/process', price: '0.10', ticker: 'RES', type: 'INTEL', status: 'IDLE', port: 3001 },
  { id: '2', name: 'SYNAPSE-WRITER-V4',  url: 'http://localhost:3002/process', price: '0.05', ticker: 'WRT', type: 'GEN-TXT', status: 'IDLE', port: 3002 },
  { id: '3', name: 'PIXEL-FOUNDRY-GPU',  url: '#', price: '0.25', ticker: 'GPU', type: 'RENDER', status: 'OFFLINE', port: 3003 },
  { id: '4', name: 'SENTINEL-AUDIT',     url: '#', price: '0.50', ticker: 'SEC', type: 'SECURITY', status: 'OFFLINE', port: 3004 },
];

export default function Home() {
  const [logs, setLogs] = useState<{msg: string, ts: string, type: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agents, setAgents] = useState(AGENT_MARKETPLACE);
  const logEndRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(1245.50); // Fake ticker

  // Scroll to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg: string) => {
    let type = 'info';
    if (msg.includes("402") || msg.includes("PAYMENT")) type = 'alert';
    if (msg.includes("TxHash") || msg.includes("Settlement")) { type = 'success'; setVolume(v => v + 0.15); } 
    if (msg.includes("NETWORK")) type = 'warn';

    setLogs(prev => [...prev, {
      msg: msg.toUpperCase(), 
      ts: new Date().toLocaleTimeString('en-US', { hour12: false }) + '.' + Math.floor(Math.random() * 999),
      type
    }]);
  };

  const setAgentStatus = (port: number, status: string) => {
    setAgents(prev => prev.map(a => a.port === port ? { ...a, status } : a));
  };

  const executeMission = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setLogs([]);
    setAgents(AGENT_MARKETPLACE); // Reset UI

    try {
        addLog(">> INIT_SEQUENCE: SWARM_DISPATCH");
        addLog(">> TARGET: STANDARD_OIL_MARKET_ANALYSIS");
        
        // --- RESEARCHER ---
        setAgentStatus(3001, 'LOCKED');
        const researcher = agents.find(a => a.port === 3001)!;
        await new Promise(r => setTimeout(r, 600));

        await fetchWithBribery(researcher.url, { prompt: "Standard Oil" }, (msg) => {
             addLog(msg);
             if (msg.includes("402")) setAgentStatus(3001, 'NEGOTIATING'); 
             if (msg.includes("TxHash")) setAgentStatus(3001, 'WORKING'); 
        });
        
        setAgentStatus(3001, 'COMPLETE');
        addLog(">> PACKET_RECEIVED: [INTEL_DATA]");

        // --- WRITER ---
        await new Promise(r => setTimeout(r, 500));
        
        setAgentStatus(3002, 'LOCKED');
        const writer = agents.find(a => a.port === 3002)!;
        
        await fetchWithBribery(writer.url, { prompt: "Summary" }, (msg) => {
            addLog(msg);
            if (msg.includes("402")) setAgentStatus(3002, 'NEGOTIATING');
            if (msg.includes("TxHash")) setAgentStatus(3002, 'WORKING');
       });

        setAgentStatus(3002, 'COMPLETE');
        addLog(">> ARTIFACT_COMPILED: FINAL_REPORT.PDF");
        addLog(">> MISSION_STATUS: SUCCESS");

    } catch (e: any) {
        addLog(`!! FATAL: ${e.message}`);
        setAgents(prev => prev.map(a => a.status !== 'OFFLINE' ? ({...a, status: 'ERROR'}) : a));
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono selection:bg-cyan-500 selection:text-black relative overflow-hidden flex flex-col p-6">
      
      {/* 1. BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_2px,transparent_2px),linear-gradient(90deg,rgba(18,16,16,0)_2px,transparent_2px)] bg-[length:30px_30px] opacity-20 pointer-events-none border-[#1a1a1a]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(0,255,240,0.1),transparent_70%)] pointer-events-none"></div>
      
      {/* 2. HUD HEADER */}
      <header className="flex justify-between items-end border-b border-white/10 pb-6 mb-8 z-10">
        <div>
           <div className="text-[10px] tracking-[0.2em] text-cyan-400 mb-1 animate-pulse">PROTOCOL V2 // CONNECTED</div>
           <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-500">
             Nexus<span className="text-cyan-400">.OS</span>
           </h1>
        </div>
        
        <div className="flex gap-8 text-right">
             <div>
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">Network</div>
                <div className="text-sm font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">BASE SEPOLIA</div>
             </div>
             <div>
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">24h Vol</div>
                <div className="text-sm font-bold text-white">${volume.toFixed(2)} <span className="text-[10px] text-gray-600">USDC</span></div>
             </div>
        </div>
      </header>

      {/* 3. MARKETPLACE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 z-10 flex-grow">
         {agents.map((agent) => (
            <div key={agent.id} 
                className={`
                    relative group border transition-all duration-300 backdrop-blur-md p-5 flex flex-col h-[220px]
                    hover:scale-[1.02]
                    ${agent.status === 'OFFLINE' ? 'border-gray-800 bg-black/40 opacity-40' : 'bg-white/5'}
                    ${agent.status === 'IDLE' ? 'border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''}
                    ${agent.status === 'NEGOTIATING' ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.2)]' : ''}
                    ${agent.status === 'LOCKED' ? 'border-red-500 bg-red-900/10 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : ''}
                    ${agent.status === 'WORKING' ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_30px_rgba(34,211,238,0.3)]' : ''}
                    ${agent.status === 'COMPLETE' ? 'border-emerald-500 bg-emerald-900/10' : ''}
                `}
            >   
                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-current opacity-50"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-current opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-current opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-current opacity-50"></div>

                <div className="flex justify-between items-start mb-4">
                     <span className={`text-[10px] border px-1.5 py-0.5 rounded tracking-widest uppercase
                        ${agent.status === 'OFFLINE' ? 'border-gray-700 text-gray-600' : 'border-white/20 text-gray-300'}
                     `}>{agent.ticker}</span>
                     <span className={`w-2 h-2 rounded-full animate-pulse
                        ${agent.status === 'OFFLINE' ? 'bg-gray-800' : ''}
                        ${agent.status === 'IDLE' ? 'bg-white' : ''}
                        ${agent.status === 'NEGOTIATING' || agent.status === 'LOCKED' ? 'bg-orange-500' : ''}
                        ${agent.status === 'WORKING' ? 'bg-cyan-400' : ''}
                        ${agent.status === 'COMPLETE' ? 'bg-emerald-500' : ''}
                     `}></span>
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-bold uppercase tracking-tight truncate text-gray-200 group-hover:text-white">{agent.name}</h2>
                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{agent.type} MODULE</div>
                </div>

                {/* Price Display */}
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
                    <div>
                        <div className="text-[10px] text-gray-500 mb-0.5">COST / REQUEST</div>
                        <div className="text-lg font-bold font-mono tracking-tighter">
                            <span className="text-cyan-400">$</span>{agent.price}
                        </div>
                    </div>
                    {/* Status Badge */}
                    <div className="text-[10px] font-bold tracking-widest uppercase">
                         {agent.status === 'NEGOTIATING' && <span className="text-orange-400 animate-pulse">402 AUTH...</span>}
                         {agent.status === 'LOCKED' && <span className="text-red-500">PAYWALL</span>}
                         {agent.status === 'WORKING' && <span className="text-cyan-400">MINING TX</span>}
                         {agent.status === 'COMPLETE' && <span className="text-emerald-400">DELIVERED</span>}
                         {agent.status === 'IDLE' && <span className="text-gray-600">READY</span>}
                         {agent.status === 'OFFLINE' && <span className="text-red-900">DISCONNECTED</span>}
                    </div>
                </div>
            </div>
         ))}
      </div>

      {/* 4. EXECUTION CONTROLS (TERMINAL + BUTTON) */}
      <div className="relative border border-white/10 bg-black/80 rounded backdrop-blur-sm z-20 flex flex-col md:flex-row h-[320px] overflow-hidden shadow-2xl">
          
          {/* TERMINAL */}
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1 scrollbar-hide">
              {logs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                        <div className="text-4xl mb-2 text-cyan-900">⧉</div>
                        <div>AWAITING ORCHESTRATION</div>
                  </div>
              )}
              {logs.map((l, i) => (
                  <div key={i} className="flex gap-4 border-l-2 border-transparent pl-2 hover:bg-white/5">
                      <span className="text-gray-600 select-none w-20 text-right">{l.ts}</span>
                      <span className={`break-all tracking-wide
                          ${l.type === 'alert' ? 'text-orange-400 shadow-orange-500/50 text-shadow-sm' : ''}
                          ${l.type === 'success' ? 'text-emerald-400' : ''}
                          ${l.type === 'warn' ? 'text-yellow-200' : ''}
                          ${l.type === 'info' ? 'text-cyan-100/80' : ''}
                      `}>
                          {l.msg}
                      </span>
                  </div>
              ))}
              <div ref={logEndRef}></div>
          </div>

          {/* ACTION PANEL */}
          <div className="w-full md:w-[300px] bg-white/5 border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col justify-center items-center relative">
               <div className="absolute inset-0 bg-cyan-500/5 animate-pulse pointer-events-none"></div>
               
               <div className="mb-6 w-full space-y-2">
                   <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                       <span>Total Nodes</span>
                       <span className="text-white">4</span>
                   </div>
                   <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                       <span>Protocol</span>
                       <span className="text-cyan-400">X402/HTTP</span>
                   </div>
                   <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                       <span>Wallet</span>
                       <span className="text-emerald-400 truncate w-20">0x...AB23</span>
                   </div>
               </div>

               <button 
                  onClick={executeMission}
                  disabled={isProcessing}
                  className={`
                     relative w-full h-14 uppercase tracking-[0.2em] font-bold text-sm overflow-hidden transition-all
                     before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] before:animate-[shine_1s_infinite]
                     ${isProcessing 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                        : 'bg-cyan-600 text-black hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] border border-cyan-400'
                     }
                  `}
               >
                   {isProcessing ? "NEGOTIATING..." : "INITIATE SEQUENCE"}
               </button>
          </div>
      </div>

    </main>
  );
}