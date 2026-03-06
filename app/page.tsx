"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Target, 
  Eye, 
  Zap, 
  Download, 
  MousePointer2,
  X,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Palette,
  Info,
  AlertTriangle,
  Settings,
  Monitor,
  Mail,
  MessageSquare,
  HelpCircle,
  Send,
  User,
  AtSign,
  ChevronDown
} from 'lucide-react';

const App = () => {
  // Define a union type for modalContent to resolve TS errors
  const [modalContent, setModalContent] = useState<'terms' | 'privacy' | 'howto' | 'faq' | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [formStatus, setFormStatus] = useState<{type: 'idle' | 'loading' | 'success' | 'error', message?: string}>({type: 'idle'});
  const currentYear = new Date().getFullYear();

  const ROTATION_SPEED = 20000; // Increased to 20 seconds per feature
  const UPDATE_INTERVAL = 10; // smooth logic update

  // Re-ordered features to strictly follow left-to-right, top-to-bottom grid flow
  const features = [
    {
      title: "Legit Engine",
      description: "Humanized smoothing for unmatchable replay safety. Our algorithm mimics organic mouse movement patterns to bypass behavioral analysis.",
      icon: Target,
      tag: "PRECISION"
    },
    {
      title: "Neural ESP",
      description: "High-performance world rendering with occlusion awareness. View critical data through walls with zero frame-time impact.",
      icon: Eye,
      tag: "VISION"
    },
    {
      title: "Skin Changer",
      description: "Unlock any weapon finish, knife, or glove locally. Features a real-time inventory simulator with StatTrak and sticker support.",
      icon: Palette,
      tag: "VISUALS"
    },
    {
      title: "Perfect RCS",
      description: "Customizable recoil control for every weapon. Master the spray patterns of every rifle without manual compensation.",
      icon: MousePointer2,
      tag: "CONTROL"
    },
    {
      title: "Bypass Tech",
      description: "Proprietary security layer for account longevity. Continuous signature randomization ensures persistent undetected status.",
      icon: Shield,
      tag: "SECURITY"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveFeature((current) => (current + 1) % features.length);
          return 0;
        }
        return prev + (100 / (ROTATION_SPEED / UPDATE_INTERVAL));
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(timer);
  }, [features.length]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/Eracheat-v1.0.3.zip';
    link.download = 'Eracheat-v1.0.3.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
    setProgress(0);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
    setProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({type: 'loading'});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      category: formData.get('category') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status, 'ok:', response.ok);

      if (response.ok) {
        setFormStatus({type: 'success', message: 'Message sent successfully!'});
      } else {
        setFormStatus({type: 'error', message: 'Failed to send message. Please try again.'});
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setFormStatus({type: 'error', message: 'An error occurred. Please try again.'});
    }
  };

  const legalDocs = {
    terms: {
      title: "Terms of Service",
      content: (
        <div className="space-y-8 text-slate-300">
          <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
            <h3 className="text-red-500 font-black uppercase tracking-tighter text-lg mb-2">Notice of Binding Arbitration & Liability Waiver</h3>
            <p className="text-[11px] leading-relaxed text-slate-400 uppercase font-medium">
              THIS AGREEMENT CONTAINS PROVISIONS THAT GOVERN HOW CLAIMS YOU AND ERACHEAT HAVE AGAINST EACH OTHER CAN BE BROUGHT. THESE PROVISIONS WILL, WITH LIMITED EXCEPTION, REQUIRE YOU TO SUBMIT CLAIMS YOU HAVE AGAINST ERACHEAT TO BINDING AND FINAL ARBITRATION.
            </p>
          </div>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">1. Acceptance of Terms</h4>
            <p className="text-sm leading-relaxed">
              By accessing, downloading, or executing the EraCheat software ("the Software"), you signify your irrevocable consent to these Terms of Service. If you do not agree to these terms, you are prohibited from using the Software and must delete all associated files immediately. Your continued use constitutes a legally binding contract between you and EraCheat.
            </p>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">2. Limitation of Liability & Indemnification</h4>
            <p className="text-sm leading-relaxed italic underline decoration-blue-500/30">
              ERACHEAT, ITS DEVELOPERS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.
            </p>
            <p className="text-sm leading-relaxed">
              This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses. You specifically acknowledge that EraCheat is not reliable for any repercussions regarding your Steam account, Valve Anti-Cheat (VAC) status, or any other third-party gaming platform. You agree to indemnify and hold harmless EraCheat from any claims, including legal fees, arising from your use or misuse of the Software.
            </p>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">3. Risk of Service Interruption & Account Termination</h4>
            <p className="text-sm leading-relaxed">
              You understand that the Software interacts with third-party applications. These third parties may update their security protocols at any time. EraCheat provides no warranty of constant uptime or permanent undetectability. You acknowledge that:
            </p>
            <ul className="list-disc pl-5 text-xs space-y-2 text-slate-400">
              <li>Utilization of the Software carries an inherent risk of account suspension, permanent banning, or loss of digital assets.</li>
              <li>Virtual items (skins, knives, stickers) associated with your account are your responsibility. We are not liable for the financial or emotional value of lost digital property.</li>
              <li>Service can be terminated at any time without prior notice for maintenance or security updates.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">4. Intellectual Property & License Restrictions</h4>
            <p className="text-sm leading-relaxed">
              EraCheat grants you a personal, non-exclusive, non-transferable, limited license to use the Software. You may not:
            </p>
            <ul className="list-disc pl-5 text-xs space-y-2 text-slate-400">
              <li>Modify, decompile, reverse engineer, or attempt to extract the source code of the Software.</li>
              <li>Distribute, sell, or lease the Software to any third party.</li>
              <li>Bypass or circumvent Hardware ID (HWID) locks or authentication protocols.</li>
              <li>Utilize the Software for any commercial purpose without explicit written consent.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">5. Disclaimer of Warranties</h4>
            <p className="text-sm leading-relaxed">
              THE SOFTWARE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. ERACHEAT EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>
        </div>
      )
    },
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-8 text-slate-300">
          <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <h3 className="text-blue-500 font-black uppercase tracking-tighter text-lg mb-2">Zero-Retention Data Integrity Protocol</h3>
            <p className="text-[11px] leading-relaxed text-slate-400 uppercase font-medium">
              ERACHEAT EMPLOYS RIGOROUS NON-IDENTIFIABLE TELEMETRY STANDARDS TO ENSURE USER ANONYMITY. WE DO NOT STORE, SELL, OR TRANSMIT PERSONALLY IDENTIFIABLE INFORMATION (PII) TO ANY EXTERNAL AUTHORITIES OR ENTITIES.
            </p>
          </div>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">1. Scope of Data Processing</h4>
            <p className="text-sm leading-relaxed">
              This Privacy Policy governs the collection, processing, and storage of technical data by the EraCheat software suite. EraCheat operates under a strict principle of data minimization. We do not solicit, store, or process Personally Identifiable Information (PII) such as legal names, residential addresses, billing information, or contact details.
            </p>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">2. Technical Telemetry and Hardware Identification</h4>
            <p className="text-sm leading-relaxed italic underline decoration-blue-500/30">
              SYSTEM SERIALS ARE AGGREGATED AND PASSED THROUGH A ONE-WAY SHA-256 CRYPTOGRAPHIC HASH FUNCTION.
            </p>
            <p className="text-sm leading-relaxed">
              To facilitate license verification and prevent unauthorized redistribution of our proprietary algorithms, the Software utilizes an automated Hardware Identification (HWID) protocol. Original serial numbers are never transmitted to our infrastructure.
            </p>
            <ul className="list-disc pl-5 text-xs space-y-2 text-slate-400">
              <li><strong>Network Validation:</strong> Public IP addresses are temporarily processed to mitigate DDoS attempts and purged every 24 hours.</li>
              <li><strong>Environment Monitoring:</strong> We monitor active system processes solely for the protection of Intellectual Property against reverse engineering.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">3. Localized Storage and Configuration</h4>
            <p className="text-sm leading-relaxed">
              User-defined configurations, visual settings, and temporary session keys are stored locally on the host machine. EraCheat employs military-grade encryption for these local assets. We do not synchronize these localized settings to our cloud infrastructure, maintaining your settings exclusively on your local hardware.
            </p>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">4. Information Security and Third-Party Disclosure</h4>
            <p className="text-sm leading-relaxed">
              EraCheat does not engage in the sale, trade, or transfer of system telemetry to external entities. Data processed by our backend infrastructure is stored on high-security, offshore servers with restricted administrative access. In the event of a legal inquiry, EraCheat maintains a policy of non-retention.
            </p>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3">5. Data Retention Policy</h4>
            <p className="text-sm leading-relaxed">
              Inactive hardware signatures and associated technical logs are subject to a standard 180-day retention cycle. Upon the expiration of a 180-day period of inactivity, all records associated with the Hardware ID are purged from our systems permanently.
            </p>
          </section>
        </div>
      )
    },
    howto: {
      title: "Deployment Guide",
      content: (
        <div className="space-y-8 text-slate-300">

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" /> 1. Neutralize Security Interference
            </h4>
            <p className="text-sm leading-relaxed">
              Modern anti-virus suites utilize heuristic signatures that erroneously flag our proprietary memory injection techniques. To bypass these false positives, you <strong>must</strong> navigate to <span className="text-blue-400 font-mono">Windows Security {'>'} Virus & threat protection {'>'} Manage settings</span> and toggle <span className="text-red-400">Real-time protection to OFF</span>. 
            </p>
            <p className="text-xs text-slate-500 bg-black/40 p-3 border-l border-white/10 italic">
              Note: This is mandatory for EraCheat to seat properly within the system memory stack without being quarantined by OS-level protection.
            </p>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-blue-500" /> 2. Synchronize Game Environment
            </h4>
            <p className="text-sm leading-relaxed">
              Launch Counter-Strike via the official Steam client. Our Neural ESP and world-rendering modules require direct access to the DirectX buffer. Ensure your Video Settings are set to <strong>Windowed Fullscreen</strong>. 
            </p>
            <p className="text-xs text-slate-400">
              Wait until you are fully loaded into the main menu dashboard before moving to the execution phase. This ensures all memory offsets are correctly initialized by the game engine.
            </p>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-500" /> 3. Elevated Execution & Injection
            </h4>
            <p className="text-sm leading-relaxed">
              Locate <span className="text-blue-400 font-mono">Eracheat.exe</span> in your downloads. Right-click and select <span className="text-white underline">Run as Administrator</span>. This elevation is required to allow the software to perform cross-process memory operations. 
            </p>
            <div className="flex gap-4 p-4 bg-blue-600/5 border border-blue-500/20 rounded">
              <div className="flex-1">
                <p className="text-xs leading-relaxed text-slate-300">
                  Once you see the <span className="text-green-500 font-bold">"INJECTION SUCCESSFUL"</span> status, the software is fully integrated into the game process.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] border-l-2 border-blue-600 pl-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-500" /> 4. Real-Time Configuration
            </h4>
            <p className="text-sm leading-relaxed">
              Switch back to your game window. Strike the <span className="bg-white/10 px-2 py-0.5 rounded text-white font-mono">INSERT</span> key to invoke the EraCheat Control Center. From this interface, you can toggle Legit Smoothing, ESP Visuals, and Skin IDs.
            </p>
            <div className="p-4 bg-red-600/10 border border-red-500/20 rounded">
                <p className="text-xs text-white font-bold mb-1">PRO-TIP: REPLAY SAFETY</p>
                <p className="text-[11px] text-slate-400">Keep your smoothing values above 1.5 to ensure your movements remain undetectable to Overwatch and behavioral analysis systems. Dominance is worthless if you are caught; use our tools wisely.</p>
            </div>
          </section>

          <div className="pt-4 flex flex-col items-center gap-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">All steps completed?</p>
            <button 
              onClick={handleDownload}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-sm tracking-tighter transition-all flex items-center justify-center gap-3 rounded-sm shadow-xl"
            >
              INITIALIZE DOWNLOAD <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    },
    faq: {
      title: "Common Inquiries",
      content: (
        <div className="space-y-6 text-slate-300">
          <div className="group border-b border-white/5 pb-4">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" /> Will I get banned?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Only if you start spinning like a helicopter in a pro league qualifier. Our humanized smoothing is so realistic that even your mom will think you've just been practicing. Use "Legit Mode" and you're safer than a turtle in a tank.
            </p>
          </div>
          <div className="group border-b border-white/5 pb-4">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" /> Why does my PC say this is a virus?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Because Windows is jealous of your new skill set. Standard AV software flags memory injection as "suspicious" because it doesn't want you to be too powerful. We promise we aren't mining bitcoin on your fridge.
            </p>
          </div>
          <div className="group border-b border-white/5 pb-4">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" /> Can I use this in Premier?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Absolutely. We've seen users climb from Silver 1 to Global Elite in a single weekend. Just try to lose a round occasionally so it doesn't look *too* suspicious when you have 100% headshot accuracy.
            </p>
          </div>
          <div className="group border-b border-white/5 pb-4">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" /> Is it really free?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The first hit is always free. We're confident you'll love the feeling of being a literal gaming god so much that you'll tell all your friends (please don't tell the admins though).
            </p>
          </div>
        </div>
      )
    }
  };

  const IconComponent = features[activeFeature].icon;

  return (
    <div className="min-h-screen bg-[#07080a] text-white font-sans selection:bg-blue-500/30 p-4 md:p-8 flex flex-col relative overflow-hidden">
      
      {/* SCANLINE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>

      {/* DYNAMIC BACKGROUND */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full -z-10"></div>

      {/* HEADER / NAVIGATION */}
      <header className="flex justify-between items-center max-w-7xl mx-auto w-full mb-12 relative z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowContact(false)}>
          <span className="text-2xl font-black tracking-tighter italic uppercase">ERA<span className="text-blue-500">CHEAT</span></span>
        </div>
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => setShowContact(!showContact)}
            className={`flex items-center gap-2 text-sm font-black transition-all uppercase tracking-tighter italic px-6 py-2 border rounded-none group ${
              showContact 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'text-white border-white/10 hover:border-blue-500 hover:text-blue-500 bg-transparent'
            }`}
          >
            {showContact ? (
              <>BACK</>
            ) : (
              <>
                CONTACT SUPPORT
              </>
            )}
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto w-full flex-grow flex flex-col relative z-10 mb-16">
        
        {!showContact ? (
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch h-full">
            {/* LEFT COLUMN: HERO AREA */}
            <div className="lg:w-1/2 flex flex-col justify-center pt-8 text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                BECOME THE <br />
                <span className="text-blue-600 relative inline-block">
                  GLOBAL ELITE
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600/30"></div>
                </span>
              </h2>

              <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12 border-l-2 border-white/5 pl-6 italic">
                Stop losing to silver scrubs. Get the #1 undetected cheat for Counter-Strike. See through walls, hit every headshot, and rank up instantly with our humanized legit settings.
              </p>

              <div className="flex flex-col items-center lg:items-start gap-4 mb-8">
                <button 
                  onClick={handleDownload}
                  className="group relative w-full sm:w-72 overflow-hidden bg-blue-600 px-8 py-5 rounded-sm font-black text-lg uppercase tracking-wider transition-all active:scale-95 shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    DOWNLOAD<Download className="w-5 h-5" />
                  </span>
                </button>
                <button 
                  onClick={() => setModalContent('howto')}
                  className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors uppercase font-black text-xs tracking-widest pl-2 group"
                >
                  <span className="relative flex items-center gap-2">
                    <Info className="w-4 h-4 group-hover:animate-pulse" /> How to install?
                  </span>
                </button>
              </div>

              {/* ESP PREVIEW IMAGE */}
              <div id="hero-image" className="relative max-w-lg mx-auto lg:mx-0 group">
                <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="/esp.png" 
                  alt="Counter-Strike 2 Neural ESP Cheat Interface Preview" 
                  className="relative rounded-lg border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  title="CS2 Neural ESP Feature Showcase"
                />
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Visual Rendering Engine
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FEATURES */}
            <div className="lg:w-1/2 w-full flex flex-col justify-center -translate-y-8">
              <div className="flex flex-col gap-6 items-center">
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-tr-[50px] rounded-bl-[50px] relative overflow-hidden group w-full max-w-xl text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 -rotate-45 translate-x-12 -translate-y-12"></div>
                  <h3 className="text-3xl font-black uppercase italic mb-4 tracking-tighter">
                    {features[activeFeature].title} <span className="text-blue-500">Module</span>
                  </h3>
                  <p className="text-slate-500 text-base mb-2 max-w-md mx-auto leading-relaxed">{features[activeFeature].description}</p>
                </div>

                <div className="relative h-[450px] w-full max-w-xl bg-white/[0.02] border border-white/5 rounded-sm p-12 flex flex-col items-center justify-center text-center overflow-hidden group transition-all duration-500 hover:border-blue-500/30">
                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] scale-[5] rotate-12 transition-transform duration-700 group-hover:rotate-0">
                    <IconComponent />
                  </div>

                  <button 
                    onClick={prevFeature}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-slate-500 hover:text-blue-500 hover:bg-white/5 rounded-full transition-all z-20 active:scale-90"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </button>
                  <button 
                    onClick={nextFeature}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-slate-500 hover:text-blue-500 hover:bg-white/5 rounded-full transition-all z-20 active:scale-90"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </button>

                  <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-500" key={activeFeature}>
                    <div className="p-8 bg-blue-600/10 text-blue-500 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.15)] mb-4">
                      <IconComponent className="w-16 h-16" />
                    </div>
                    <div className="space-y-4">
                      <div className="text-xs font-black text-blue-500 tracking-[0.6em] uppercase opacity-70">
                        {features[activeFeature].tag}
                      </div>
                      <h4 className="text-5xl font-black uppercase tracking-tighter italic">
                        {features[activeFeature].title}
                      </h4>
                    </div>
                  </div>

                  <div className="absolute bottom-10 flex gap-4 z-20">
                    {features.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveFeature(idx);
                          setProgress(0);
                        }}
                        className={`h-2 transition-all duration-300 rounded-full ${
                          activeFeature === idx ? 'w-12 bg-blue-500' : 'w-3 bg-white/10 hover:bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* CONTACT SUPPORT VIEW */
          <div className="flex-grow flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-full max-w-2xl bg-white/[0.02] border border-white/5 p-12 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 -rotate-45 translate-x-32 -translate-y-32"></div>
              
              <div className="mb-10 space-y-2 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-blue-600"></div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter">Support</h2>
                </div>
              </div>

              <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* NAME FIELD */}
                  <div className="group space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
                      <User className="w-3 h-3" /> Identification
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="name"
                        placeholder="OPERATIVE NAME"
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-xs font-bold tracking-widest text-white placeholder:text-slate-700 outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.02] transition-all rounded-sm"
                      />
                    </div>
                  </div>

                  {/* EMAIL FIELD */}
                  <div className="group space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
                      <AtSign className="w-3 h-3" /> Digital Address
                    </label>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        placeholder="email@example.com"
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-xs font-bold tracking-widest text-white placeholder:text-slate-700 outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.02] transition-all rounded-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* CATEGORY FIELD */}
                <div className="group space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
                    <Settings className="w-3 h-3" /> Inquiry Classification
                  </label>
                  <div className="relative">
                    <select name="category" className="w-full appearance-none bg-white/[0.03] border border-white/10 p-4 text-xs font-black tracking-tighter italic uppercase text-white outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.04] transition-all rounded-sm cursor-pointer hover:bg-white/[0.05]">
                      <option className="bg-[#07080a] text-white" value="bug">BUG REPORT [HEURISTIC ERROR]</option>
                      <option className="bg-[#07080a] text-white" value="software">SOFTWARE ISSUE [CORE MISMATCH]</option>
                      <option className="bg-[#07080a] text-white" value="general">GENERAL QUESTION [INTEL REQUEST]</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* MESSAGE FIELD */}
                <div className="group space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
                    <Terminal className="w-3 h-3" />  Message
                  </label>
                  <textarea 
                    rows={4}
                    name="message"
                    placeholder="DESCRIBE THE SITUATION..."
                    className="w-full bg-white/[0.03] border border-white/10 p-4 text-xs font-bold tracking-widest text-white placeholder:text-slate-700 outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.02] transition-all rounded-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-sm tracking-[0.3em] transition-all flex items-center justify-center gap-4 rounded-sm shadow-xl group active:scale-[0.98]"
                >
                  {formStatus.type === 'loading' ? 'SENDING...' : 'SEND'} <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {formStatus.type !== 'idle' && (
                  <div className={`mt-4 p-4 rounded ${formStatus.type === 'success' ? 'bg-green-500/10 text-green-400' : formStatus.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {formStatus.message}
                  </div>
                )}

              </form>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto max-w-7xl mx-auto w-full pt-12 pb-4 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 relative z-10">
        <div className="flex gap-10">
          <button 
            onClick={() => setModalContent('terms')}
            className="group flex flex-col items-start gap-1"
          >
            <span className="text-[10px] font-black text-slate-500 group-hover:text-white transition-colors uppercase tracking-[0.2em]">Agreement</span>
            <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">Terms of Service</span>
          </button>
          <button 
            onClick={() => setModalContent('privacy')}
            className="group flex flex-col items-start gap-1"
          >
            <span className="text-[10px] font-black text-slate-500 group-hover:text-white transition-colors uppercase tracking-[0.2em]">Confidentiality</span>
            <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">Privacy Policy</span>
          </button>
          <button 
            onClick={() => setModalContent('faq')}
            className="group flex flex-col items-start gap-1"
          >
            <span className="text-[10px] font-black text-slate-500 group-hover:text-white transition-colors uppercase tracking-[0.2em]">Resources</span>
            <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
              Common FAQ <HelpCircle className="w-3 h-3" />
            </span>
          </button>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1">Authenticated via Secure Cloud</p>
          <p className="text-[10px] font-bold text-slate-400">© {currentYear} ERACHEAT RESEARCH GROUP</p>
        </div>
      </footer>

      {/* LEGAL / HOW-TO / FAQ MODAL */}
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setModalContent(null)}
          ></div>
          <div className="relative w-full max-w-3xl bg-[#0d0e12] border border-white/10 rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-blue-600"></div>
                <h2 className="text-xl font-black uppercase tracking-tighter italic">
                  {modalContent === 'howto' ? 'Installation' : modalContent === 'faq' ? 'Intel' : 'Legal'} <span className="text-blue-500">{modalContent === 'howto' ? 'Manual' : modalContent === 'faq' ? 'Database' : 'Manifesto'}</span>
                </h2>
              </div>
              <button 
                onClick={() => setModalContent(null)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            <div className="p-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
              <div className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em] mb-4">
                Document ID: {modalContent.toUpperCase()}-001
              </div>
              {legalDocs[modalContent].content}
            </div>
            <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-end">
              <button 
                onClick={() => setModalContent(null)}
                className="bg-blue-600 text-white px-10 py-3 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg"
              >
                {modalContent === 'howto' ? 'Got it' : modalContent === 'faq' ? 'Return to HQ' : 'Accept & Dismiss'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2563eb;
        }
        select option {
          background-color: #07080a;
          color: white;
          padding: 10px;
        }
        select:focus {
          border-color: rgba(37, 99, 235, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;