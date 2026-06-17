import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, BarChart3, Settings, Database, UploadCloud, CheckCircle2 } from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  // Metric Counters
  const [messagesSent, setMessagesSent] = useState(128452);
  const [activeCalls, setActiveCalls] = useState(18);
  const [costSaved, setCostSaved] = useState(54829.40);
  
  // Builder States
  const [persona, setPersona] = useState('sales');
  const [voice, setVoice] = useState('us-sarah');
  const [creativity, setCreativity] = useState(0.7);
  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  // Tick metrics to make them feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      // Messages sent ticks up
      const messageInc = Math.floor(Math.random() * 3) + 1;
      setMessagesSent(prev => prev + messageInc);
      
      // Cost saved ticks up accordingly
      setCostSaved(prev => prev + (messageInc * 0.42));
      
      // Active calls fluctuate slightly
      setActiveCalls(prev => {
        const delta = Math.random() > 0.55 ? 1 : -1;
        const nextVal = prev + delta;
        return nextVal > 5 && nextVal < 35 ? nextVal : prev;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleDocUpload = (docName: string) => {
    setUploadedDoc(docName);
    setDeployed(false); // Reset deploy state when changes are made
  };

  const handleDeploy = () => {
    if (deploying) return;
    setDeploying(true);
    setDeployed(false);

    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
    }, 2000);
  };

  return (
    <section id="dashboard" style={{ padding: '6rem 0', background: 'rgba(13, 17, 39, 0.2)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge">
            <ShieldCheck size={12} /> Enterprise Control Room
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.2rem' }}>
            Manage Agents in <span className="gradient-accent">Real-Time</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            VoxFlow provides a unified, glassmorphic control dashboard. Track key call metrics and update agent knowledge instantly.
          </p>
        </div>

        {/* 1. Metric Indicators Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Card 1 */}
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '0.8rem' }}>
              <BarChart3 size={24} />
            </div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Conversations Handled
            </h4>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
              {messagesSent.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.3rem', fontWeight: 600 }}>
              ↑ 12% increase this week
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: 'var(--secondary)', marginBottom: '0.8rem' }}>
              <Users size={24} />
            </div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Live Calls
            </h4>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {activeCalls}
              <span className="pulse-indicator" />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Through local gateways
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: '#10b981', marginBottom: '0.8rem' }}>
              <Database size={24} />
            </div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Estimated Cost Saved
            </h4>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
              ${costSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.3rem', fontWeight: 600 }}>
              Calculated at $1.85/hr human avg.
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: 'var(--accent)', marginBottom: '0.8rem' }}>
              <Settings size={24} />
            </div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Average CSAT Score
            </h4>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
              98.4%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
              Based on 4,200 post-call ratings
            </div>
          </div>
        </div>

        {/* 2. Interactive Agent Builder Mockup */}
        <div className="grid-2" style={{ alignItems: 'stretch' }}>
          
          {/* Builder Controls */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings style={{ color: 'var(--primary)' }} /> Configure Agent Persona
              </h3>

              {/* Persona Select */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  ROLE / CORE RESPONSIBILITY
                </label>
                <select 
                  value={persona} 
                  onChange={e => { setPersona(e.target.value); setDeployed(false); }}
                  className="form-input"
                >
                  <option value="sales">Sales Representative (Conversational & Persuasive)</option>
                  <option value="support">Technical Support Specialist (Structured & Patient)</option>
                  <option value="recruiting">HR Recruiter (Friendly, Interview & Qualify)</option>
                </select>
              </div>

              {/* Voice Accent Select */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  VOICE MODEL & SYNTHESIZER
                </label>
                <select 
                  value={voice} 
                  onChange={e => { setVoice(e.target.value); setDeployed(false); }}
                  className="form-input"
                >
                  <option value="us-sarah">Sarah (US English - Warm Executive)</option>
                  <option value="uk-claire">Claire (UK English - Crisp Corporate)</option>
                  <option value="es-mateo">Mateo (Spanish - Fluent Conversational)</option>
                </select>
              </div>

              {/* Creativity / Temperature Slider */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <span>CREATIVITY / TEMP</span>
                  <span style={{ color: 'var(--secondary)' }}>{creativity}</span>
                </div>
                <input 
                  type="range" 
                  min="0.2" 
                  max="1.0" 
                  step="0.1" 
                  value={creativity} 
                  onChange={e => { setCreativity(parseFloat(e.target.value)); setDeployed(false); }}
                  style={{
                    width: '100%',
                    accentColor: 'var(--secondary)',
                    background: 'rgba(255,255,255,0.1)',
                    height: '6px',
                    borderRadius: '3px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Knowledge Ingestion Mock */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                  INGEST KNOWLEDGE BASE
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <button 
                    className={`kb-btn ${uploadedDoc === 'faq.pdf' ? 'active' : ''}`}
                    onClick={() => handleDocUpload('faq.pdf')}
                  >
                    <UploadCloud size={14} /> FAQ.pdf
                  </button>
                  <button 
                    className={`kb-btn ${uploadedDoc === 'handbook.docx' ? 'active' : ''}`}
                    onClick={() => handleDocUpload('handbook.docx')}
                  >
                    <UploadCloud size={14} /> Q&A.docx
                  </button>
                  <button 
                    className={`kb-btn ${uploadedDoc === 'sitemap' ? 'active' : ''}`}
                    onClick={() => handleDocUpload('sitemap')}
                  >
                    <UploadCloud size={14} /> Website URL
                  </button>
                </div>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleDeploy}
              disabled={deploying}
              style={{ width: '100%', borderRadius: '10px', display: 'flex', justifyContent: 'center' }}
            >
              {deploying ? 'Deploying to Webhook...' : 'Save & Hot-Deploy Agent'}
            </button>
          </div>

          {/* Builder Sandbox Output Terminal */}
          <div className="glass-panel" style={{ padding: '2.5rem', background: '#070a13', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                System Console Output
              </span>

              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: '#cbd5e1',
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}>
                <div><span style={{ color: 'var(--secondary)' }}>[system]</span> Initializing sandbox compiler...</div>
                <div><span style={{ color: 'var(--secondary)' }}>[system]</span> Selected persona: <span style={{ color: 'var(--primary)' }}>{persona}</span></div>
                <div><span style={{ color: 'var(--secondary)' }}>[system]</span> Selected synthesizer: <span style={{ color: 'var(--primary)' }}>{voice}</span></div>
                <div><span style={{ color: 'var(--secondary)' }}>[system]</span> Temperature setting: <span style={{ color: 'var(--primary)' }}>{creativity}</span></div>
                
                {uploadedDoc ? (
                  <div style={{ color: '#10b981' }}>
                    ✔ Ingested source document: {uploadedDoc} successfully vectorised into ChromaDB.
                  </div>
                ) : (
                  <div style={{ color: '#eab308' }}>
                    ⚠ Warning: No custom knowledge source is selected. Running on base system prompt instructions.
                  </div>
                )}

                {deploying && (
                  <div style={{ color: 'var(--secondary)', display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <span className="dot-typing" style={{ background: 'var(--secondary)' }} /> Connecting server webhook endpoints...
                  </div>
                )}

                {deployed && (
                  <div style={{ 
                    padding: '1rem', 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    border: '1px solid rgba(16, 185, 129, 0.2)', 
                    borderRadius: '8px', 
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'start',
                    gap: '10px',
                    marginTop: '1rem'
                  }}>
                    <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Hot-Deployment Completed!</strong>
                      Agent live on Twilio Gateway & WhatsApp Cloud Webhook under session #VX-482. Ready to receive events.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '2rem' }}>
              Note: Changes take effect globally in under 2 seconds without requiring server restarts.
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .pulse-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          box-shadow: 0 0 8px #10b981;
          animation: pulseGlow 1.5s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 1; }
        }
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 0.65rem 1rem;
          color: var(--text-primary);
          outline: none;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          transition: var(--transition-smooth);
        }
        .form-input:focus {
          border-color: var(--primary);
          background: rgba(255,255,255,0.07);
        }
        .kb-btn {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          alignItems: center;
          justifyContent: center;
          gap: 5px;
          transition: var(--transition-smooth);
        }
        .kb-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
          color: var(--text-primary);
        }
        .kb-btn.active {
          background: rgba(6, 182, 212, 0.12);
          border-color: var(--secondary);
          color: var(--secondary);
        }
      `}</style>
    </section>
  );
};
