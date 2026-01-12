import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck,
  Activity,
  Clock,
  Terminal,
  ChevronRight,
  AlertTriangle,
  Database,
  Cpu,
  Server,
  Wifi,
  HardDrive
} from 'lucide-react';
import { useVisitors, useBooks } from '../hooks';

/**
 * ConsolePage - High-Security Command Center (Stealth Mode)
 * 
 * A modern DevOps-style terminal with professional Cloud Shell aesthetic
 * Access controlled via global keyboard shortcut (Ctrl+Shift+X)
 * No authentication layer - shortcut IS the secret
 */

// ============================================
// MOCK DATA
// ============================================
const MOCK_ERROR_LOGS = [
  { timestamp: '2026-01-11 08:23:15', level: 'WARN', service: 'api-gateway', message: 'Rate limit threshold reached for /api/v1/search' },
  { timestamp: '2026-01-11 09:45:02', level: 'ERROR', service: 'db-connector', message: 'Connection pool exhausted, retrying...' },
  { timestamp: '2026-01-11 10:12:44', level: 'WARN', service: 'auth-service', message: 'Failed login attempt from IP 192.168.1.105' },
  { timestamp: '2026-01-11 11:30:18', level: 'INFO', service: 'scheduler', message: 'Daily backup completed successfully' },
  { timestamp: '2026-01-11 14:05:33', level: 'ERROR', service: 'cache-layer', message: 'Redis connection timeout, falling back to DB' },
];

// Initial terminal output
const getInitialOutput = () => [
  { type: 'system', text: '╔══════════════════════════════════════════════════════════════╗' },
  { type: 'system', text: '║  LIBRARY SYSTEM COMMAND CENTER v2.0                          ║' },
  { type: 'system', text: '║  Secure Administrative Terminal [STEALTH MODE]               ║' },
  { type: 'system', text: '╚══════════════════════════════════════════════════════════════╝' },
  { type: 'success', text: 'Root access granted. Session initialized.' },
  { type: 'info', text: 'Type "help" for available commands.' },
  { type: 'divider' },
];

// ============================================
// MAIN CONSOLE COMPONENT
// ============================================
function ConsolePage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(getInitialOutput());
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [uptime] = useState(() => Math.floor(Math.random() * 1000) + 100);
  const [sessionTime, setSessionTime] = useState(0);

  const { visitors } = useVisitors();
  const { books } = useBooks();

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => setSessionTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus input on click
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Format session time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Math engine - safely evaluate expressions
  const evaluateMath = (expr) => {
    try {
      // Only allow safe characters for math
      const sanitized = expr.replace(/[^0-9+\-*/.() ]/g, '');
      if (!sanitized) return null;
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${sanitized}`)();
      return typeof result === 'number' && isFinite(result) ? result : null;
    } catch {
      return null;
    }
  };

  // Command parser
  const executeCommand = useCallback(async (cmd) => {
    const rawCommand = cmd.trim();
    const command = rawCommand.toLowerCase();
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    // Add command to history
    if (rawCommand) {
      setHistory(prev => [...prev, rawCommand]);
    }
    setHistoryIndex(-1);

    // Add command to output
    setOutput(prev => [...prev, { type: 'input', text: rawCommand, time: timestamp }]);

    // Empty command
    if (!command) {
      setInput('');
      return;
    }

    setIsProcessing(true);

    // ==================== HELP ====================
    if (command === 'help') {
      setOutput(prev => [...prev, 
        { type: 'header', text: 'AVAILABLE COMMANDS' },
        { type: 'code', text: '  help                  Show this help message' },
        { type: 'code', text: '  clear                 Clear terminal screen' },
        { type: 'code', text: '  whoami                Display current user' },
        { type: 'code', text: '  status                Show system status' },
        { type: 'divider' },
        { type: 'subheader', text: 'DATA COMMANDS' },
        { type: 'code', text: '  fetch visitors        Retrieve visitor data (JSON)' },
        { type: 'code', text: '  fetch books           Retrieve book catalog (JSON)' },
        { type: 'divider' },
        { type: 'subheader', text: 'DIAGNOSTIC COMMANDS' },
        { type: 'code', text: '  diagnostics           Run full system health check' },
        { type: 'code', text: '  logs                  View recent error logs' },
        { type: 'divider' },
        { type: 'subheader', text: 'UTILITIES' },
        { type: 'code', text: '  calc <expression>     Calculate math (e.g., calc 10 * 5)' },
        { type: 'divider' },
      ]);
    } 
    // ==================== CLEAR ====================
    else if (command === 'clear') {
      setOutput([
        { type: 'info', text: 'Terminal cleared.' },
        { type: 'divider' },
      ]);
    }
    // ==================== WHOAMI ====================
    else if (command === 'whoami') {
      setOutput(prev => [...prev, 
        { type: 'response', text: 'root (Super Administrator)' },
        { type: 'code', text: '  Access Level: FULL (Stealth Mode)' },
        { type: 'code', text: '  Permissions:  READ, WRITE, EXECUTE, ADMIN' },
        { type: 'divider' },
      ]);
    }
    // ==================== STATUS ====================
    else if (command === 'status') {
      setOutput(prev => [...prev, 
        { type: 'header', text: 'SYSTEM STATUS' },
        { type: 'code', text: `  Uptime:        ${uptime} hours` },
        { type: 'code', text: `  Session:       ${formatTime(sessionTime)}` },
        { type: 'code', text: '  Connection:    SECURE (TLS 1.3)' },
        { type: 'code', text: '  Database:      OPERATIONAL' },
        { type: 'code', text: '  API Gateway:   HEALTHY' },
        { type: 'code', text: '  Cache Layer:   ACTIVE' },
        { type: 'divider' },
      ]);
    }
    // ==================== FETCH VISITORS ====================
    else if (command === 'fetch visitors') {
      const data = visitors?.slice(0, 5) || [];
      setOutput(prev => [...prev, 
        { type: 'info', text: `Query executed. ${data.length} records retrieved.` },
        { type: 'json', text: JSON.stringify(data, null, 2) },
        { type: 'divider' },
      ]);
    }
    // ==================== FETCH BOOKS ====================
    else if (command === 'fetch books') {
      const data = books?.slice(0, 5) || [];
      setOutput(prev => [...prev, 
        { type: 'info', text: `Query executed. ${data.length} records retrieved.` },
        { type: 'json', text: JSON.stringify(data, null, 2) },
        { type: 'divider' },
      ]);
    }
    // ==================== DIAGNOSTICS ====================
    else if (command === 'diagnostics') {
      const steps = [
        { icon: Wifi, text: 'Checking network connectivity...', status: 'OK' },
        { icon: Database, text: 'Verifying database integrity...', status: 'OK' },
        { icon: Server, text: 'Scanning API endpoints...', status: 'OK' },
        { icon: HardDrive, text: 'Analyzing storage capacity...', status: 'OK' },
        { icon: Cpu, text: 'Running security audit...', status: 'OK' },
        { icon: Activity, text: 'Compiling diagnostic report...', status: 'COMPLETE' },
      ];
      
      setOutput(prev => [...prev, { type: 'header', text: 'SYSTEM DIAGNOSTICS' }]);
      
      for (let i = 0; i < steps.length; i++) {
        await new Promise(r => setTimeout(r, 500));
        setOutput(prev => [...prev, { 
          type: 'progress', 
          text: `[${i + 1}/${steps.length}] ${steps[i].text}`,
          status: steps[i].status
        }]);
      }
      
      await new Promise(r => setTimeout(r, 300));
      setOutput(prev => [...prev, 
        { type: 'success', text: 'All systems operational. No issues detected.' },
        { type: 'divider' },
      ]);
    }
    // ==================== LOGS ====================
    else if (command === 'logs') {
      setOutput(prev => [...prev, 
        { type: 'header', text: 'RECENT SYSTEM LOGS' },
        ...MOCK_ERROR_LOGS.map(log => ({
          type: 'log',
          level: log.level,
          timestamp: log.timestamp,
          service: log.service,
          message: log.message
        })),
        { type: 'divider' },
      ]);
    }
    // ==================== CALC ====================
    else if (command.startsWith('calc ')) {
      const expression = rawCommand.substring(5).trim();
      const result = evaluateMath(expression);
      
      if (result !== null) {
        setOutput(prev => [...prev, 
          { type: 'response', text: `${expression} = ${result}` },
          { type: 'divider' },
        ]);
      } else {
        setOutput(prev => [...prev, 
          { type: 'error', text: `Invalid expression: "${expression}"` },
          { type: 'divider' },
        ]);
      }
    }
    // ==================== UNKNOWN COMMAND ====================
    else {
      setOutput(prev => [...prev, 
        { type: 'error', text: `Command not found: "${rawCommand}"` },
        { type: 'warning', text: 'Type "help" to see available commands.' },
        { type: 'divider' },
      ]);
    }

    setIsProcessing(false);
    setInput('');
  }, [visitors, books, uptime, sessionTime]);

  // Handle key events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Render output line
  const renderLine = (line, index) => {
    const baseClass = 'font-mono text-sm leading-relaxed';
    
    switch (line.type) {
      case 'system':
        return <div key={index} className={`${baseClass} text-slate-500`}>{line.text}</div>;
      case 'input':
        return (
          <div key={index} className={`${baseClass} text-slate-300`}>
            <span className="text-slate-500">[{line.time}] </span>
            <span className="text-indigo-400">root@library-system</span>
            <span className="text-slate-500">:</span>
            <span className="text-cyan-400">~</span>
            <span className="text-slate-500">$ </span>
            <span className="text-slate-200">{line.text}</span>
          </div>
        );
      case 'header':
        return (
          <div key={index} className={`${baseClass} text-indigo-400 font-semibold mt-2`}>
            ── {line.text} ──
          </div>
        );
      case 'subheader':
        return (
          <div key={index} className={`${baseClass} text-slate-400 font-medium`}>
            {line.text}:
          </div>
        );
      case 'response':
        return <div key={index} className={`${baseClass} text-slate-200`}>{line.text}</div>;
      case 'code':
        return <div key={index} className={`${baseClass} text-slate-400`}>{line.text}</div>;
      case 'json':
        return (
          <pre key={index} className={`${baseClass} text-cyan-400 whitespace-pre-wrap overflow-x-auto bg-slate-900/50 rounded-lg p-3 my-2`}>
            {line.text}
          </pre>
        );
      case 'info':
        return (
          <div key={index} className={`${baseClass} text-cyan-400 flex items-center gap-2`}>
            <ChevronRight className="w-3 h-3" />
            {line.text}
          </div>
        );
      case 'progress':
        return (
          <div key={index} className={`${baseClass} text-amber-400`}>
            {line.text} <span className="text-emerald-400">[{line.status}]</span>
          </div>
        );
      case 'success':
        return (
          <div key={index} className={`${baseClass} text-emerald-400 font-medium flex items-center gap-2`}>
            <ShieldCheck className="w-4 h-4" />
            {line.text}
          </div>
        );
      case 'warning':
        return (
          <div key={index} className={`${baseClass} text-amber-400 flex items-center gap-2`}>
            <AlertTriangle className="w-3 h-3" />
            {line.text}
          </div>
        );
      case 'error':
        return <div key={index} className={`${baseClass} text-rose-400`}>{line.text}</div>;
      case 'log':
        const levelColors = {
          'ERROR': 'text-rose-400',
          'WARN': 'text-amber-400',
          'INFO': 'text-cyan-400'
        };
        return (
          <div key={index} className={`${baseClass} text-slate-400`}>
            <span className="text-slate-500">{line.timestamp}</span>
            {' '}
            <span className={`${levelColors[line.level] || 'text-slate-400'} font-medium`}>[{line.level}]</span>
            {' '}
            <span className="text-indigo-400">{line.service}</span>
            {' '}
            <span className="text-slate-300">{line.message}</span>
          </div>
        );
      case 'divider':
        return <div key={index} className="h-3" />;
      default:
        return <div key={index} className={baseClass}>{line.text}</div>;
    }
  };

  return (
    <div 
      className="h-full bg-slate-950 text-slate-200 font-mono flex flex-col rounded-2xl overflow-hidden relative"
      onClick={handleContainerClick}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-slate-400">library-system-console</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              STEALTH
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-500">ROOT ACCESS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>SESSION: {formatTime(sessionTime)}</span>
          </div>
        </div>
      </div>

      {/* Main Output Area */}
      <div 
        ref={outputRef}
        className="flex-1 p-4 overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)' }}
      >
        {output.map((line, i) => renderLine(line, i))}
        
        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-3 h-3 border-2 border-slate-600 border-t-indigo-400 rounded-full"
            />
            Processing...
          </div>
        )}
      </div>

      {/* Input Line */}
      <div className="px-4 py-3 bg-slate-900 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 text-sm">root@library-system</span>
          <span className="text-slate-500 text-sm">:</span>
          <span className="text-cyan-400 text-sm">~</span>
          <span className="text-slate-500 text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="flex-1 bg-transparent text-slate-200 text-sm outline-none caret-indigo-400
                     disabled:opacity-50 placeholder-slate-600"
            placeholder="Enter command..."
            autoFocus
            spellCheck={false}
          />
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
            className="w-2 h-4 bg-indigo-400 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default ConsolePage;
