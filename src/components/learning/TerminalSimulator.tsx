'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Terminal, ArrowRight } from 'lucide-react';

const mockCommands: Record<string, string> = {
  help: 'Available commands: help, whoami, nmap, clear',
  whoami: 'student@hackersparadise',
  nmap: 'Starting Nmap 7.80\nNmap scan report for 192.168.1.1\nHost is up (0.0005s latency).\nNot shown: 997 closed ports\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http\n443/tcp open  https',
  clear: '',
};

export default function TerminalSimulator() {
  const [history, setHistory] = useState<string[]>(['Type "help" to see available commands.']);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    if (cmd.trim() === '') return;
    if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setHistory(prev => [
        ...prev,
        `> ${cmd}`,
        mockCommands[cmd] ?? `Command not found: ${cmd}`
      ]);
      setIsProcessing(false);
    }, 500);
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-primary" />
          <span>Terminal Simulation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-black/90 rounded-lg border border-white/10 p-4 h-64 overflow-y-auto font-mono text-green-400 text-sm">
          {history.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          <div ref={scrollRef} />
        </div>
        <form onSubmit={handleInput} className="flex items-center mt-2 space-x-2">
          <span className="text-green-400 font-mono">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm"
            disabled={isProcessing}
            autoFocus
            aria-label="Terminal command input"
          />
          <Button type="submit" size="sm" className="cyber-button" disabled={isProcessing}>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 