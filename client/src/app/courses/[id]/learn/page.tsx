'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  Code,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Save,
  Download,
  Timer,
  Terminal,
  Target,
  Shield,
  Zap,
  CheckCircle2,
  Lock,
  Menu,
  X,
  Info,
  ExternalLink,
  Cpu,
  Copy,
  Check
} from 'lucide-react';
import { mockLesson } from './mockLesson';
import { cn } from '@/lib/utils';
import CyberCard from '@/components/common/CyberCard';
import CyberButton from '@/components/common/CyberButton';
import { toast } from 'react-hot-toast';

export default function LearningModulePage() {
  const router = useRouter();
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(mockLesson.duration);
  const [activeTab, setActiveTab] = useState('content');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentTime < duration) {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / duration) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ':' + secs.toString().padStart(2, '0');
  };

  const handleBackToCourse = () => {
    router.push(`/courses/${params.id}`);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setProgress(100);
    toast.success('Module successfully mastered!', {
      style: {
        background: '#0a0f16',
        color: '#fff',
        border: '1px solid #22c55e',
      },
      icon: '🏆',
    });
  };

  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Code copied to extraction buffer');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePrevLesson = () => {
    toast('Accessing previous lesson data...', { icon: '🔄' });
    // In a real app: router.push(`/courses/${params.id}/learn?lesson=${prevId}`)
  };

  const handleNextLesson = () => {
    if (!isCompleted) {
      toast.error('Validation required. Please mark as mastered first.', {
        style: { background: '#0a0f16', color: '#ef4444', border: '1px solid #ef4444' }
      });
      return;
    }
    toast.success('Initializing next module sequence...');
    // In a real app: router.push(`/courses/${params.id}/learn?lesson=${nextId}`)
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl px-4 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-4">
              <Button
            onClick={handleBackToCourse}
            variant="ghost" 
                size="sm"
            className="hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Exit Terminal</span>
              </Button>
          <div className="h-6 w-px bg-white/10 hidden sm:block" />
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-bold text-white truncate max-w-[200px] md:max-w-md">
              {mockLesson.title}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
               <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Session</span>
               </div>
               <span className="text-white/20 text-[10px]">•</span>
               <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Module 01 / Lesson 01</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden lg:flex flex-col items-end min-w-[120px]">
             <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Progress</span>
                <span className="text-[10px] font-black text-red-400">{Math.round(progress)}%</span>
             </div>
             <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-red-500 to-purple-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                />
                </div>
              </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowNotes(!showNotes)}
              className={cn(
                "h-9 px-3 border-white/10 transition-all",
                showNotes ? "bg-red-500/10 border-red-500/50 text-red-400" : "bg-white/5 text-gray-400"
              )}
            >
              <FileText className="w-4 h-4" />
              <span className="ml-2 hidden md:inline">Notes</span>
            </Button>
                  <Button
                    size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className="h-9 px-3 bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Course Sidebar (Left) */}
        <aside className={cn(
          "absolute inset-y-0 left-0 z-40 w-80 bg-black/60 backdrop-blur-2xl border-r border-white/5 transition-transform duration-300 transform lg:relative lg:translate-x-0",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
             <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Course Content</h2>
             <Button variant="ghost" size="icon" className="h-6 w-6 lg:hidden" onClick={() => setShowSidebar(false)}>
                <X className="w-4 h-4" />
                  </Button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-8rem)] custom-scrollbar">
             <div className="p-2 space-y-1">
                {/* Section Header */}
                <div className="px-3 py-4">
                   <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Section 01</p>
                   <h3 className="text-sm font-bold text-white">Foundations of Hacking</h3>
                </div>
                
                {/* Lesson Items */}
                {[1, 2, 3, 4, 5].map((idx) => (
                   <button
                     type="button"
                     key={idx}
                     className={cn(
                       "w-full flex items-center gap-3 p-3 rounded-xl transition-all group text-left",
                       idx === 1 ? "bg-red-500/10 border border-red-500/20" : "hover:bg-white/5 border border-transparent"
                     )}
                   >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all",
                        idx === 1 
                          ? "bg-red-500 border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                          : "bg-white/5 border-white/5 text-gray-500 group-hover:text-white group-hover:border-white/20"
                      )}>
                         {idx === 1 ? <Play className="w-4 h-4 fill-white" /> : idx < 1 ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5 opacity-50" />}
                      </div>
                      <div className="min-w-0">
                         <p className={cn(
                           "text-xs font-bold truncate",
                           idx === 1 ? "text-white" : "text-gray-400 group-hover:text-white"
                         )}>
                            {idx === 1 ? mockLesson.title : `Module Lesson 0${idx}`}
                         </p>
                         <p className="text-[10px] text-gray-500 font-medium flex items-center gap-2 mt-0.5 uppercase tracking-tighter">
                            <Clock className="w-3 h-3" /> 18:45
                         </p>
                      </div>
                   </button>
                ))}
             </div>
          </div>
        </aside>

        {/* Main Content Area (Center) */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#0a0f16]">
          {/* Video Player Section */}
          <div className="w-full relative group">
            <div className="aspect-video max-h-[65vh] mx-auto w-full bg-black flex items-center justify-center relative overflow-hidden shadow-2xl">
               {/* Background scanning effect */}
               <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                  <motion.div 
                    animate={{ y: ['0%', '100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,1)]" 
                  />
               </div>

               {/* Mock Video UI */}
               <div className="relative text-center z-10 p-12">
                  <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-red-500/50 transition-all duration-500 cursor-pointer" onClick={togglePlay}>
                     {isPlaying ? (
                       <Pause className="w-10 h-10 text-white fill-white" />
                     ) : (
                       <Play className="w-10 h-10 text-white fill-white ml-1" />
                     )}
                  </div>
                  <h3 className="text-xl font-black tracking-tighter uppercase mb-2">Establishing Secure Link...</h3>
                  <p className="text-gray-500 text-sm font-mono max-w-sm mx-auto">
                     Video stream placeholder. Content is encrypted using AES-256 standard protocols.
                  </p>
                  </div>
                  
               {/* Video Overlay Controls */}
               <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex flex-col gap-4">
                     <div className="relative group/progress h-1 flex items-center">
                        <div className="absolute inset-0 bg-white/10 rounded-full" />
                        <motion.div 
                          className="absolute inset-y-0 left-0 bg-red-500 rounded-full"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        >
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                        </motion.div>
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <button type="button" aria-label={isPlaying ? 'Pause' : 'Play'} title={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay} className="text-white hover:text-red-500 transition-colors">
                              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                           </button>
                           <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                              <span className="text-white font-bold">{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                           </div>
                           <div className="h-4 w-px bg-white/10 mx-2" />
                           <button type="button" aria-label="Volume" title="Volume" className="text-white hover:text-red-500 transition-colors">
                              <Volume2 className="w-5 h-5" />
                           </button>
                        </div>
                        <div className="flex items-center gap-4">
                           <Badge variant="outline" className="border-white/10 text-[10px] text-gray-400">1080p HD</Badge>
                           <button type="button" aria-label="Fullscreen" title="Fullscreen" className="text-white hover:text-red-500 transition-colors">
                              <Maximize className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Bottom Tabs Section */}
          <div className="flex-1 flex flex-col min-h-0 bg-[#05070a]/50">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="bg-black/40 border-b border-white/5">
                <TabsList className="h-14 bg-transparent gap-8 px-6 rounded-none justify-start w-full">
                  {['content', 'code', 'quiz', 'resources'].map((tab) => (
                    <TabsTrigger 
                      key={tab} 
                      value={tab} 
                      className="h-full bg-transparent border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent data-[state=active]:text-red-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-none transition-all px-0"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="max-w-4xl mx-auto pb-20">
                  <TabsContent value="content" className="mt-0 outline-none">
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="space-y-8 pb-10"
                    >
                      {/* Mission Status Header */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4"
                      >
                         <div className="md:col-span-3 bg-[#0a0f16] border border-white/5 p-6 rounded-3xl relative overflow-hidden group/header">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                               <Target size={150} className="text-red-500" />
                            </div>
                            <div className="flex items-center gap-5 relative z-10">
                               <div className="relative">
                                  <div className="absolute -inset-1 bg-red-500/20 rounded-2xl blur-sm animate-pulse" />
                                  <div className="relative p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                                     <Shield className="w-8 h-8" />
                                  </div>
                               </div>
                               <div>
                                  <div className="flex items-center gap-3 mb-1">
                                     <Badge className="bg-red-500 text-white border-0 text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 animate-pulse">Classified</Badge>
                                     <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">SEC-OPS // HP-{params.id}-INTEL</span>
                                  </div>
                                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white">Mission: {mockLesson.title}</h2>
                               </div>
                            </div>
                         </div>
                         <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-3xl flex flex-col justify-center items-center text-center">
                            <p className="text-[10px] font-black text-red-500/50 uppercase tracking-[0.2em] mb-1">Extraction Time</p>
                            <div className="text-3xl font-mono font-black text-red-500 tracking-tighter">
                               {formatTime(currentTime)}
                            </div>
                            <div className="flex gap-1 mt-2">
                               {[1, 2, 3, 4, 5].map(i => (
                                  <div key={i} className={cn("w-3 h-1 rounded-full", i <= 3 ? "bg-red-500" : "bg-white/10")} />
                               ))}
                            </div>
                         </div>
                      </motion.div>

                      {/* Main Intelligence Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                         {/* Left Column: Briefing & Target */}
                         <div className="lg:col-span-8 space-y-8">
                            {/* Operational Briefing */}
                            <motion.section variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                               <div className="flex items-center gap-3 mb-4">
                                  <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
                                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Operational Briefing</h3>
                               </div>
                               <div className="bg-[#0a0f16]/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '20px 24px' }} />
                                  <div className="relative z-10 space-y-4 text-gray-400 leading-relaxed">
                                     <p className="text-lg">
                                        Agent, your primary directive is the <span className="text-white font-bold underline decoration-red-500/50 underline-offset-4">neutralization of systemic vulnerabilities</span> through authorized penetration protocols.
                                     </p>
                                     <p>
                                        This module initializes your interface with the <span className="text-red-400 font-bold italic">White-Hat Tactical Framework</span>. You will learn to navigate complex security architectures, identify misconfigurations, and execute precise extractions without leaving a footprint.
                                     </p>
                                  </div>
                               </div>
                            </motion.section>

                            {/* Tactical Methodology */}
                            <motion.section variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                               <div className="flex items-center gap-3 mb-6">
                                  <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Tactical Methodology</h3>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {[
                                    { step: '01', title: 'Reconnaissance', tools: ['Nmap', 'Shodan'], desc: 'Intelligence gathering via passive and active network analysis.' },
                                    { step: '02', title: 'Weaponization', tools: ['Metasploit', 'Burp'], desc: 'Coupling remote access trojans with exploits into payloads.' },
                                    { step: '03', title: 'Exploitation', tools: ['Empire', 'Cobalt'], desc: 'Executing tactical code to gain a foothold in the target system.' },
                                    { step: '04', title: 'Extraction', tools: ['Exfil', 'SCP'], desc: 'Secure removal of classified data to command servers.' },
                                  ].map((m, i) => (
                                    <div key={i} className="group p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-red-500/5 hover:border-red-500/30 transition-all duration-500 relative overflow-hidden">
                                       <div className="absolute -right-2 -bottom-2 text-[60px] font-black text-white/5 group-hover:text-red-500/10 transition-colors pointer-events-none leading-none select-none">{m.step}</div>
                                       <div className="relative z-10">
                                          <div className="flex justify-between items-start mb-4">
                                             <span className="text-[10px] font-black text-red-500/50 group-hover:text-red-500 transition-colors uppercase tracking-[0.2em]">Phase {m.step}</span>
                                             <div className="flex gap-1">
                                                {m.tools.map(t => (
                                                   <Badge key={t} className="bg-white/5 hover:bg-white/10 text-[8px] border-white/10 text-gray-400 group-hover:text-white transition-colors">{t}</Badge>
                                                ))}
                                             </div>
                                          </div>
                                          <h4 className="text-base font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">{m.title}</h4>
                                          <p className="text-xs text-gray-500 leading-relaxed pr-8">{m.desc}</p>
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </motion.section>
                         </div>

                         {/* Right Column: Target Analysis & Directives */}
                         <div className="lg:col-span-4 space-y-8">
                            {/* Target Analysis Card */}
                            <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                               <div className="bg-[#0a0f16] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                                  <div className="absolute top-0 right-0 p-4">
                                     <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                  </div>
                                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6">Target Analysis</h3>
                                  <div className="space-y-6">
                                     <div className="flex items-center justify-between">
                                        <div className="text-xs font-bold text-white/70 uppercase">Security Rating</div>
                                        <div className="text-xs font-black text-red-500 font-mono">CRITICAL [9.8]</div>
                                     </div>
                                     <div className="grid grid-cols-5 gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                           <div key={i} className={cn("h-1.5 rounded-full", i <= 4 ? "bg-red-500" : "bg-white/10")} />
                                        ))}
                                     </div>
                                     <div className="pt-4 border-t border-white/5 space-y-3">
                                        <div className="flex justify-between text-[10px]">
                                           <span className="text-gray-500 uppercase font-bold">Architecture:</span>
                                           <span className="text-white font-mono">x86_64 / Linux</span>
                                        </div>
                                        <div className="flex justify-between text-[10px]">
                                           <span className="text-gray-500 uppercase font-bold">Network:</span>
                                           <span className="text-white font-mono">10.0.42.1/24</span>
                                        </div>
                                        <div className="flex justify-between text-[10px]">
                                           <span className="text-gray-500 uppercase font-bold">Defense:</span>
                                           <span className="text-red-400 font-bold">ACTIVE_FIREWALL</span>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </motion.div>

                            {/* Core Directives */}
                            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}>
                               <div className="bg-gradient-to-br from-red-500/10 via-purple-600/5 to-transparent border border-red-500/20 rounded-3xl p-6">
                                  <div className="flex items-center gap-2 mb-6">
                                     <Zap className="w-4 h-4 text-red-500" />
                                     <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Core Directives</h3>
                                  </div>
                                  <ul className="space-y-5">
                                     {[
                                       { title: 'Full Authorization', status: 'Verified', icon: CheckCircle2, color: 'text-green-400' },
                                       { title: 'Strict Scope Control', status: 'Active', icon: Shield, color: 'text-blue-400' },
                                       { title: 'Data Encryption', status: 'Required', icon: Lock, color: 'text-red-400' },
                                       { title: 'Briefing Extraction', status: 'Pending', icon: FileText, color: 'text-purple-400' },
                                     ].map((item, i) => (
                                       <li key={i} className="flex items-center justify-between group">
                                          <div className="flex items-center gap-3">
                                             <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-500/30 transition-colors">
                                                <item.icon className={cn("w-4 h-4", item.color)} />
                                             </div>
                                             <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{item.title}</span>
                                          </div>
                                          <span className="text-[8px] font-black uppercase text-gray-600 tracking-widest">{item.status}</span>
                                       </li>
                                     ))}
                                   </ul>
                               </div>
                            </motion.div>
                         </div>
                      </div>

                      {/* Tactical Data Stream Footer */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                        className="bg-black/40 border border-white/5 rounded-2xl p-4 overflow-hidden relative"
                      >
                         <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
                         <div className="flex flex-wrap gap-x-12 gap-y-4 items-center justify-center relative z-10">
                            {[
                               { label: 'Uplink', value: 'ESTABLISHED', color: 'text-green-500' },
                               { label: 'Protocol', value: 'SSL/TLS 1.3' },
                               { label: 'Latency', value: '42ms', color: 'text-blue-400' },
                               { label: 'Encryption', value: 'AES-256-GCM' },
                               { label: 'Buffer', value: 'READY', color: 'text-purple-400' }
                            ].map((spec, i) => (
                               <div key={i} className="flex items-center gap-2">
                                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{spec.label}:</span>
                                  <span className={cn("text-[9px] font-black uppercase font-mono", spec.color || "text-white/70")}>{spec.value}</span>
                               </div>
                            ))}
                         </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="code" className="mt-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      {mockLesson.codeExamples.map((example, index) => (
                        <div key={index} className="group">
                          <div className="flex items-center justify-between mb-3 px-2">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                   <Cpu className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                   <h3 className="text-sm font-black uppercase tracking-widest text-white">{example.title}</h3>
                                   <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] font-mono text-purple-400 uppercase">{example.language}</span>
                                      <span className="text-white/10 text-[10px]">•</span>
                                      <span className="text-[10px] font-mono text-gray-500 uppercase">Buffer: Extracted</span>
                                   </div>
                                </div>
                             </div>
                             <div className="flex gap-2">
                                <button
                                  type="button"
                                  aria-label="Copy code"
                                  title="Copy to buffer"
                                  onClick={() => handleCopyToClipboard(example.code, index)}
                                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group/copy relative"
                                >
                                   {copiedIndex === index ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400 group-hover/copy:text-white" />}
                                </button>
                                <button type="button" aria-label="Run code" title="Run code" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group/run">
                                   <Terminal className="w-4 h-4 text-red-400 group-hover/run:scale-110 transition-transform" />
                                </button>
                             </div>
                          </div>

                          <div className="relative rounded-2xl bg-[#05070a] border border-white/5 shadow-2xl overflow-hidden group-hover:border-purple-500/30 transition-all duration-500">
                             {/* Terminal Header */}
                             <div className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4">
                                <div className="flex gap-1.5">
                                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                                </div>
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">root@hp-terminal: ~/{example.title.toLowerCase().replace(/ /g, '_')}</div>
                                <div className="w-10" />
                             </div>

                             <div className="flex">
                                {/* Line Numbers */}
                                <div className="w-12 bg-black/20 border-r border-white/5 py-6 flex flex-col items-center text-[10px] font-mono text-white/10 select-none">
                                   {example.code.split('\n').map((_, i) => (
                                      <span key={i} className="leading-relaxed">{i + 1}</span>
                                   ))}
                                </div>

                                {/* Code Content */}
                                <div className="flex-1 p-6 overflow-x-auto custom-scrollbar">
                                   <pre className="text-sm font-mono leading-relaxed">
                                      <code className="text-gray-300">
                                         {example.code.split('\n').map((line, i) => {
                                            // Very simple manual highlighting for Python keywords
                                            const highlighted = line
                                               .replace(/\b(import|from|def|return|if|else|elif|try|except|for|in|as|while|print)\b/g, '<span class="text-red-400">$1</span>')
                                               .replace(/\b(True|False|None)\b/g, '<span class="text-purple-400">$1</span>')
                                               .replace(/("(.*?)")/g, '<span class="text-green-400">$1</span>')
                                               .replace(/# (.*)/g, '<span class="text-gray-500 italic"># $1</span>');

                                            return (
                                               <div key={i} dangerouslySetInnerHTML={{ __html: highlighted || ' ' }} />
                                            );
                                         })}
                                      </code>
                                   </pre>
                                </div>
                             </div>

                             {/* Bottom Glow */}
                             <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="quiz" className="mt-0 outline-none">
                    <div className="py-12 flex flex-col items-center text-center">
                       <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                          <Shield className="w-8 h-8 text-red-500" />
                       </div>
                       <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-white">Validation Protocol</h3>
                       <p className="text-gray-500 text-sm max-w-sm mb-8">
                          Complete the lesson objectives to unlock the interactive verification module.
                       </p>
                       <CyberButton variant="primary" glow size="lg">
                          Initialize Quiz
                       </CyberButton>
                      </div>
                </TabsContent>

                  <TabsContent value="resources" className="mt-0 outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { title: 'Extraction Logs', desc: 'Complete session transcripts in PDF format.', icon: FileText, color: 'text-red-400' },
                         { title: 'Tactical Scripts', desc: 'Python automation tools for this module.', icon: Terminal, color: 'text-purple-400' },
                         { title: 'Intel Briefing', desc: 'Presentation slides and deep-dive notes.', icon: Info, color: 'text-blue-400' },
                         { title: 'External Archives', desc: 'Community research and documentation.', icon: ExternalLink, color: 'text-green-400' },
                       ].map((item, i) => (
                         <button type="button" key={i} className="flex items-start gap-4 p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-3xl transition-all text-left group">
                            <div className={cn("p-3 rounded-2xl bg-black/40 border border-white/5 group-hover:scale-110 transition-transform", item.color)}>
                               <item.icon size={20} />
                            </div>
                            <div>
                               <h4 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-red-400 transition-colors">{item.title}</h4>
                               <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                            </div>
                         </button>
                       ))}
                          </div>
                  </TabsContent>
                        </div>
                      </div>
              </Tabs>
          </div>

          {/* Footer Navigation */}
          <footer className="h-20 bg-black/60 backdrop-blur-2xl border-t border-white/5 px-6 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
                <Button 
                  onClick={handlePrevLesson}
                  variant="outline" 
                  className="h-11 border-white/10 bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest px-6 rounded-xl transition-all active:scale-95 inline-flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                  <span>Previous</span>
                </Button>
             </div>

             <div className="flex items-center gap-4">
                {isCompleted ? (
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl animate-in zoom-in duration-300">
                     <CheckCircle2 className="w-4 h-4 text-green-500" />
                     <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">Lesson Mastered</span>
                  </div>
                ) : (
                  <Button 
                    onClick={handleComplete}
                    className="h-11 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500 text-gray-400 hover:text-red-400 text-[10px] font-black uppercase tracking-[0.2em] px-6 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-95"
                  >
                    Mark as Mastered
                  </Button>
                )}
                
                <CyberButton 
                  onClick={handleNextLesson}
                  variant="primary" 
                  glow 
                  className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    Next Module
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </span>
                </CyberButton>
             </div>
          </footer>
        </main>

        {/* Notes Sidebar (Right) */}
          <AnimatePresence>
            {showNotes && (
            <motion.aside
                initial={{ width: 0, opacity: 0 }}
              animate={{ width: 350, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              className="border-l border-white/5 bg-black/40 backdrop-blur-2xl z-40 shrink-0"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                   <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Field Notes</h3>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Session Local Archive</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5" onClick={() => setShowNotes(false)}>
                   <X className="w-4 h-4" />
                </Button>
                </div>
                
              <div className="p-6 flex flex-col h-[calc(100vh-10rem)]">
                <div className="relative flex-1 group">
                   <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500/20 to-purple-600/20 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                  <Textarea
                     placeholder="Capture mission critical intelligence here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                     className="relative h-full w-full bg-black/40 border-white/10 text-gray-300 placeholder:text-gray-600 rounded-2xl resize-none focus:border-red-500/50 focus:ring-0 p-6 text-sm font-mono leading-relaxed"
                  />
                </div>
                  
                <div className="mt-6 space-y-3">
                  <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-lg shadow-red-500/20">
                      <Save className="w-4 h-4 mr-2" />
                    Commit to Database
                    </Button>
                  <Button variant="outline" className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all">
                    <Download className="w-4 h-4 mr-2" />
                    Export Briefing
                    </Button>
                  </div>
                </div>
            </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
  );
} 
