import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Phone, Send, CheckCheck, Play, Square, Volume2 } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

interface CallStep {
  timeOffset: number;
  speaker: 'agent' | 'user';
  text: string;
}

const WHATSAPP_SCENARIOS = {
  support: [
    { sender: 'user', text: 'Hey, my order #1029 has not arrived yet.', delay: 500 },
    { sender: 'agent', text: 'Hi there! I can help you with that. Let me look up order #1029 in our system. One moment... 🔍', delay: 1500 },
    { sender: 'agent', text: 'It looks like your order is currently at the local sorting facility and is scheduled for delivery tomorrow by 3:00 PM. Would you like me to send you the direct tracking link?', delay: 1800 },
    { sender: 'user', text: 'Send me the tracking link please.', delay: 1000 },
    { sender: 'agent', text: 'Here is your tracking link: voxflow.io/track/1029 📦. I have also subscribed your number to real-time status updates.', delay: 1400 },
    { sender: 'user', text: 'No, that\'s all. Thanks!', delay: 1000 },
    { sender: 'agent', text: 'You\'re welcome! Have a wonderful day ahead. 😊', delay: 800 }
  ] as const,
  leads: [
    { sender: 'user', text: 'Hi, I saw the listing for 452 Maple Avenue and wanted details.', delay: 500 },
    { sender: 'agent', text: 'Hi! Thanks for reaching out. 452 Maple Avenue is a gorgeous 3-bedroom, 2.5-bath home priced at $425,000. It features a newly renovated kitchen and a spacious backyard. 🏡\n\nWould you like to schedule a virtual tour or view the full image gallery?', delay: 1800 },
    { sender: 'user', text: 'I\'d like to book a virtual tour for this Friday afternoon.', delay: 1200 },
    { sender: 'agent', text: 'Perfect! I have slots open this Friday at 2:00 PM, 3:30 PM, and 5:00 PM. Which one works best for you?', delay: 1400 },
    { sender: 'user', text: '3:30 PM works.', delay: 900 },
    { sender: 'agent', text: 'Awesome! I\'ve booked you in for Friday at 3:30 PM. I\'ve sent a calendar invite to your email. I\'ll also send you a reminder here 30 minutes before we start. 📅', delay: 1500 }
  ] as const,
  multilingual: [
    { sender: 'user', text: 'Hola, ¿tienen soporte en español para configurar la cuenta?', delay: 600 },
    { sender: 'agent', text: '¡Hola! Claro que sí, puedo ayudarte completamente en español. 🇪🇸 ¿Qué tipo de cuenta estás intentando configurar hoy?', delay: 1500 },
    { sender: 'user', text: 'Quiero la cuenta de Negocios y conectar mi base de datos.', delay: 1100 },
    { sender: 'agent', text: 'Excelente elección. La cuenta de Negocios incluye integraciones de bases de datos nativas (Postgres, HubSpot). ¿Prefieres que te envíe la guía paso a paso o te gustaría agendar una llamada breve con un ingeniero?', delay: 1800 },
    { sender: 'user', text: 'Envíame la guía primero.', delay: 800 },
    { sender: 'agent', text: 'Perfecto, aquí tienes el enlace directo a la documentación de integración: voxflow.io/docs/db-setup 📘. Avísame si tienes alguna duda durante el proceso.', delay: 1500 }
  ] as const
};

const CALL_STEPS: CallStep[] = [
  { timeOffset: 0, speaker: 'agent', text: 'Hello, thanks for calling Apex Tech! This is Sarah, your AI coordinator. How can I help you today?' },
  { timeOffset: 5, speaker: 'user', text: 'Hi, I need to reschedule my consultation call for next Tuesday.' },
  { timeOffset: 9, speaker: 'agent', text: 'No problem at all! Let me check the schedule for next Tuesday, June 23rd. I have availability in the morning at 10:00 AM, or in the afternoon at 2:00 PM. Which of those fits your schedule?' },
  { timeOffset: 15, speaker: 'user', text: 'Let\'s do 10:00 AM.' },
  { timeOffset: 18, speaker: 'agent', text: 'Got it. I\'ve updated your consultation slot to Tuesday at 10:00 AM. A confirmation email has been sent. Is there anything else I can help you with?' },
  { timeOffset: 23, speaker: 'user', text: 'Perfect, thank you!' },
  { timeOffset: 25, speaker: 'agent', text: 'You\'re very welcome! Have a fantastic day. Goodbye!' }
];

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'calling'>('whatsapp');
  
  // WhatsApp States
  const [activeScenario, setActiveScenario] = useState<keyof typeof WHATSAPP_SCENARIOS>('support');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [scenarioStep, setScenarioStep] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Call States
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'ringing' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [callTranscript, setCallTranscript] = useState<CallStep[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<'agent' | 'user' | 'silent'>('silent');
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // --- WhatsApp Logics ---
  useEffect(() => {
    // Reset WhatsApp simulation on scenario change
    setChatMessages([]);
    setIsTyping(false);
    setScenarioStep(0);
  }, [activeScenario, activeTab]);

  useEffect(() => {
    if (activeTab !== 'whatsapp') return;
    const scenario = WHATSAPP_SCENARIOS[activeScenario];
    if (scenarioStep >= scenario.length) return;

    const currentMsg = scenario[scenarioStep];
    
    const timer = setTimeout(() => {
      if (currentMsg.sender === 'user') {
        // User messages appear instantly
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatMessages(prev => [...prev, { sender: 'user', text: currentMsg.text, time: timeStr }]);
        setScenarioStep(prev => prev + 1);
      } else {
        // Agent messages show typing indicator first
        setIsTyping(true);
        const typingTimer = setTimeout(() => {
          setIsTyping(false);
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setChatMessages(prev => [...prev, { sender: 'agent', text: currentMsg.text, time: timeStr }]);
          setScenarioStep(prev => prev + 1);
        }, currentMsg.delay);
        return () => clearTimeout(typingTimer);
      }
    }, scenarioStep === 0 ? 1000 : 1200);

    return () => clearTimeout(timer);
  }, [scenarioStep, activeScenario, activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const restartWhatsApp = () => {
    setChatMessages([]);
    setIsTyping(false);
    setScenarioStep(0);
  };

  // --- Calling Logics ---
  useEffect(() => {
    if (activeTab !== 'calling') {
      stopCall();
    }
  }, [activeTab]);

  // Handle call timer and transcripts
  useEffect(() => {
    let interval: any;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => {
          const nextDur = prev + 1;
          
          // Check if there's a script line for this timeOffset
          const currentStep = CALL_STEPS.find(s => s.timeOffset === nextDur);
          if (currentStep) {
            setCallTranscript(t => [...t, currentStep]);
            setCurrentSpeaker(currentStep.speaker);
          }
          
          // Determine speaker state adjustments
          const activeSpeaking = CALL_STEPS.find(s => nextDur >= s.timeOffset && nextDur < s.timeOffset + 3.5);
          if (activeSpeaking) {
            setCurrentSpeaker(activeSpeaking.speaker);
          } else {
            setCurrentSpeaker('silent');
          }

          // Call ends
          if (nextDur >= 28) {
            setCallState('ended');
            setCurrentSpeaker('silent');
            clearInterval(interval);
          }

          return nextDur;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [callTranscript]);

  const startCall = () => {
    setCallState('connecting');
    setCallDuration(0);
    setCallTranscript([]);
    setCurrentSpeaker('silent');

    setTimeout(() => {
      setCallState('ringing');
      setTimeout(() => {
        setCallState('connected');
        // Push initial greeting
        const initial = CALL_STEPS[0];
        setCallTranscript([initial]);
        setCurrentSpeaker('agent');
      }, 2000);
    }, 1500);
  };

  const stopCall = () => {
    setCallState('idle');
    setCallDuration(0);
    setCallTranscript([]);
    setCurrentSpeaker('silent');
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="playground" className="playground-section" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge">
            <Volume2 size={12} /> Interactive Sandbox
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.2rem' }}>
            Experience the <span className="gradient-accent">Agent Playground</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Interact with our pre-built modules below. Toggle between the WhatsApp chat bot or standard outbound voice agent call interfaces.
          </p>
        </div>

        {/* Tabs Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <button 
            className={`btn ${activeTab === 'whatsapp' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('whatsapp')}
            style={{ borderRadius: '12px', padding: '0.6rem 1.5rem' }}
          >
            <MessageSquare size={18} /> WhatsApp Agent
          </button>
          <button 
            className={`btn ${activeTab === 'calling' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('calling')}
            style={{ borderRadius: '12px', padding: '0.6rem 1.5rem' }}
          >
            <Phone size={18} /> Outbound Voice Agent
          </button>
        </div>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          
          {/* LEFT SIDE: Control Dashboard & Explanations */}
          <div className="glass-panel" style={{ padding: '2.5rem', height: '100%' }}>
            {activeTab === 'whatsapp' ? (
              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare style={{ color: '#25D366' }} /> WhatsApp Flow AI
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  Automate incoming leads, customer support, and sales funnels natively via WhatsApp. Our agents ingest custom knowledge sources to respond instantly with absolute accuracy.
                </p>

                {/* Scenario Selectors */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    SELECT SIMULATION SCENARIO:
                  </label>
                  
                  <button 
                    className={`scenario-btn ${activeScenario === 'support' ? 'active' : ''}`}
                    onClick={() => setActiveScenario('support')}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600 }}>📦 Order Support & Returns</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Looks up shipping databases and processes logic.</div>
                    </div>
                  </button>

                  <button 
                    className={`scenario-btn ${activeScenario === 'leads' ? 'active' : ''}`}
                    onClick={() => setActiveScenario('leads')}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600 }}>🏡 Real Estate Consultation</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Captures home details, books live tours.</div>
                    </div>
                  </button>

                  <button 
                    className={`scenario-btn ${activeScenario === 'multilingual' ? 'active' : ''}`}
                    onClick={() => setActiveScenario('multilingual')}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600 }}>🇪🇸 Multi-lingual Integration</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Seamlessly switches languages (Spanish demo).</div>
                    </div>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-secondary" onClick={restartWhatsApp} style={{ borderRadius: '8px' }}>
                    Restart Simulation
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone style={{ color: 'var(--secondary)' }} /> Voice Agent Sarah
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  VoxFlow AI call agents sound completely human. Operating with ultra-low latency (&lt;800ms response time) and intelligent active-listening features to answer questions, handle bookings, or qualify clients.
                </p>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-glass)', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>How it handles calls:</h4>
                  <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <li>🎙️ <strong>Natural Intonation:</strong> Dynamic breaths, fillers ("uh-huh"), and custom pitch controls.</li>
                    <li>⚡ <strong>Interruption Handling:</strong> Stops talking immediately if the user cuts in.</li>
                    <li>💾 <strong>Realtime Integrations:</strong> Fetches customer CRM data mid-sentence.</li>
                  </ul>
                </div>

                {callState === 'idle' || callState === 'ended' ? (
                  <button className="btn btn-primary" onClick={startCall} style={{ width: '100%', borderRadius: '10px' }}>
                    <Play size={16} /> Initiate AI Voice Call
                  </button>
                ) : (
                  <button className="btn" onClick={stopCall} style={{ width: '100%', borderRadius: '10px', background: '#ef4444', color: '#fff' }}>
                    <Square size={16} /> Hang Up Call
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Interactive Visual Mockups */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            
            {/* WHATSAPP MOCKUP */}
            {activeTab === 'whatsapp' && (
              <div className="mockup-phone glass-panel" style={{
                width: '340px',
                height: '560px',
                borderRadius: '36px',
                border: '8px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: '#0b141a', // WhatsApp Dark background
                position: 'relative'
              }}>
                {/* Phone Header notch */}
                <div style={{
                  height: '24px',
                  background: '#070a0e',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <div style={{ width: '100px', height: '14px', background: '#1e293b', borderRadius: '0 0 10px 10px' }} />
                </div>

                {/* WhatsApp Chat Header */}
                <div style={{
                  background: '#1f2c34',
                  padding: '10px 15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}>
                    V
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#e9edef' }}>VoxFlow AI</h4>
                    <span style={{ fontSize: '0.7rem', color: '#8696a0', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#25D366' }} />
                      Online
                    </span>
                  </div>
                </div>

                {/* Message Log */}
                <div className="custom-scrollbar" style={{
                  flex: 1,
                  padding: '15px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  backgroundImage: 'radial-gradient(#1f2c34 1px, transparent 0)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: 'center'
                }}>
                  {chatMessages.length === 0 && !isTyping && (
                    <div style={{ color: '#8696a0', fontSize: '0.8rem', textAlign: 'center', marginTop: '2rem', padding: '1rem' }}>
                      Loading simulation scripts...
                    </div>
                  )}
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        background: msg.sender === 'user' ? '#005c4b' : '#202c33',
                        color: '#e9edef',
                        padding: '8px 12px',
                        borderRadius: msg.sender === 'user' ? '12px 0px 12px 12px' : '0px 12px 12px 12px',
                        maxWidth: '85%',
                        fontSize: '0.85rem',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      <div>{msg.text}</div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        fontSize: '0.65rem',
                        color: '#8696a0',
                        marginTop: '4px',
                        gap: '2px'
                      }}>
                        {msg.time}
                        {msg.sender === 'user' && <CheckCheck size={12} style={{ color: '#53bdeb' }} />}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div style={{
                      alignSelf: 'flex-start',
                      background: '#202c33',
                      color: '#e9edef',
                      padding: '8px 15px',
                      borderRadius: '0px 12px 12px 12px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span className="dot-typing" />
                      <span className="dot-typing" style={{ animationDelay: '0.2s' }} />
                      <span className="dot-typing" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Footer Input Bar */}
                <div style={{
                  padding: '10px 12px',
                  background: '#1f2c34',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    flex: 1,
                    background: '#2a3942',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    color: '#8696a0'
                  }}>
                    Type a message...
                  </div>
                  <button style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#00a884',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* CALLING MOCKUP */}
            {activeTab === 'calling' && (
              <div className="mockup-phone glass-panel" style={{
                width: '340px',
                height: '560px',
                borderRadius: '36px',
                border: '8px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: '#090d16',
                position: 'relative'
              }}>
                {/* Phone Header notch */}
                <div style={{
                  height: '24px',
                  background: '#070a0e',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <div style={{ width: '100px', height: '14px', background: '#1e293b', borderRadius: '0 0 10px 10px' }} />
                </div>

                {/* Call Panel Content */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '2rem 1.5rem',
                  color: '#fff'
                }}>
                  {/* Active Info */}
                  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <div style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, var(--primary) 0%, var(--secondary) 100%)',
                      margin: '0 auto 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      fontWeight: 600,
                      boxShadow: callState === 'connected' ? '0 0 25px rgba(6, 182, 212, 0.4)' : 'none',
                      animation: callState === 'connected' ? 'pulse 2s infinite' : 'none'
                    }}>
                      S
                    </div>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Sarah AI Agent</h3>
                    <p style={{ 
                      fontSize: '0.85rem', 
                      color: callState === 'connected' ? '#06b6d4' : 'var(--text-secondary)',
                      marginTop: '0.2rem',
                      fontWeight: 500
                    }}>
                      {callState === 'idle' && 'READY'}
                      {callState === 'connecting' && 'CONNECTING...'}
                      {callState === 'ringing' && 'RINGING...'}
                      {callState === 'connected' && `LIVE CALL (${formatDuration(callDuration)})`}
                      {callState === 'ended' && 'CALL ENDED'}
                    </p>
                  </div>

                  {/* Waveform Visualization */}
                  <div style={{
                    width: '100%',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    margin: '1.5rem 0'
                  }}>
                    {Array.from({ length: 16 }).map((_, idx) => {
                      let scaling = 'scaleY(0.15)';
                      let color = 'rgba(255, 255, 255, 0.2)';
                      
                      if (callState === 'connected') {
                        if (currentSpeaker === 'agent') {
                          scaling = 'scaleY(1)';
                          color = 'var(--primary)';
                        } else if (currentSpeaker === 'user') {
                          scaling = 'scaleY(0.7)';
                          color = 'var(--secondary)';
                        } else {
                          scaling = 'scaleY(0.2)';
                          color = 'rgba(255, 255, 255, 0.4)';
                        }
                      }
                      
                      return (
                        <div 
                          key={idx}
                          className="wave-bar"
                          style={{
                            width: '4px',
                            height: '100%',
                            backgroundColor: color,
                            borderRadius: '2px',
                            transform: scaling,
                            transformOrigin: 'center',
                            transition: 'transform 0.15s ease-in-out, background-color 0.15s ease-in-out',
                            animation: callState === 'connected' && currentSpeaker !== 'silent'
                              ? `wave 0.8s ease-in-out infinite alternate` 
                              : 'none',
                            animationDelay: `${idx * 0.05}s`
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Scrolling Call Transcripts */}
                  <div className="custom-scrollbar" style={{
                    width: '100%',
                    height: '140px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '10px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {callTranscript.length === 0 ? (
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--text-muted)', 
                        textAlign: 'center', 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        {callState === 'idle' ? 'Start call to display transcript.' : 'Dialing...'}
                      </div>
                    ) : (
                      callTranscript.map((t, idx) => (
                        <div key={idx} style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                          <span style={{ 
                            fontWeight: 'bold', 
                            color: t.speaker === 'agent' ? 'var(--primary)' : 'var(--secondary)',
                            marginRight: '5px'
                          }}>
                            {t.speaker === 'agent' ? 'Sarah (AI):' : 'You:'}
                          </span>
                          <span style={{ color: '#cbd5e1' }}>{t.text}</span>
                        </div>
                      ))
                    )}
                    <div ref={transcriptEndRef} />
                  </div>

                  {/* Hang-Up/Call Button */}
                  <div style={{ marginTop: '1rem' }}>
                    {callState === 'idle' || callState === 'ended' ? (
                      <button 
                        onClick={startCall}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: '#10b981',
                          border: 'none',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                        }}
                      >
                        <Phone size={24} />
                      </button>
                    ) : (
                      <button 
                        onClick={stopCall}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: '#ef4444',
                          border: 'none',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                        }}
                      >
                        <Phone size={24} style={{ transform: 'rotate(135deg)' }} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Styled JSX for Playground Animations & Button Details */}
      <style>{`
        .scenario-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .scenario-btn:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .scenario-btn.active {
          background: rgba(139, 92, 246, 0.15);
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.1);
        }
        .dot-typing {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #8696a0;
          display: inline-block;
          animation: dotPulse 1.2s infinite ease-in-out;
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(0.6); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(6, 182, 212, 0); }
          100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
        }
      `}</style>
    </section>
  );
};
