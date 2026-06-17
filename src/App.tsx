import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Database, 
  Globe, 
  Bot, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers,
  Mail,
  Lock
} from 'lucide-react';
import { InteractivePlayground } from './components/InteractivePlayground';
import { DashboardPreview } from './components/DashboardPreview';

function App() {
  // Pricing Frequency: monthly or yearly
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  // Contact Form States
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'both',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormState({
        name: '',
        email: '',
        phone: '',
        interest: 'both',
        message: ''
      });
    }, 1500);
  };

  // Pricing values helper
  const getPrice = (basePrice: number) => {
    if (billingCycle === 'yearly') {
      // 20% discount
      return Math.round(basePrice * 0.8);
    }
    return basePrice;
  };

  return (
    <>
      {/* Background visual graphics */}
      <div className="bg-grid" />
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />

      {/* 1. Glassmorphic Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(7, 9, 19, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-glass)',
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#fff'
            }}>
              V
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              VoxFlow<span style={{ color: 'var(--secondary)' }}>.ai</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#playground" className="nav-link">Sandbox</a>
            <a href="#dashboard" className="nav-link">Dashboard</a>
            <a href="#timeline" className="nav-link">How It Works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </nav>

          {/* Action CTA */}
          <div>
            <a href="#contact" className="btn btn-outline-cyan" style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}>
              Book Consultation
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section style={{ padding: '8rem 0 6rem 0', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Badge */}
          <span className="badge animate-float" style={{ marginBottom: '1.5rem' }}>
            <Sparkles size={14} style={{ color: 'var(--secondary)' }} /> Next-Generation AI Calling & Chat
          </span>

          {/* Title */}
          <h1 className="gradient-text" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            maxWidth: '900px', 
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            fontWeight: 800
          }}>
            Deploy Human-Like <span className="gradient-accent">Voice & WhatsApp</span> Agents 24/7
          </h1>

          {/* Subtitle */}
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', 
            maxWidth: '680px', 
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            Say goodbye to clunky flowcharts. VoxFlow deploys ultra-realistic AI voice agents and automated WhatsApp flows that integrate natively with your inventory, calendar, and CRM.
          </p>

          {/* Call to Actions */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
            <a href="#playground" className="btn btn-primary">
              Launch Sandbox Playground <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Talk to an AI Architect
            </a>
          </div>

          {/* Mini-stats Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            width: '100%',
            maxWidth: '800px',
            borderTop: '1px solid var(--border-glass)',
            paddingTop: '2.5rem',
            marginTop: '1.5rem'
          }}>
            <div>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
                &lt; 800ms
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Ultra-Low Voice Latency
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
                95%
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Cost Reduction vs Support Hubs
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
                50+
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Fluent Dialect Translations
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Interactive Playground (WhatsApp & Call Simulators) */}
      <InteractivePlayground />

      {/* 4. Features Grid Section */}
      <section id="features" style={{ padding: '6rem 0', position: 'relative' }}>
        <div className="container">
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span className="badge">
              <Cpu size={12} /> Robust Capabilities
            </span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.2rem' }}>
              Engineered for <span className="gradient-accent">Scale & Realism</span>
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              We build agents that don't just speak—they think, run database queries, and perform actual business tasks.
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {/* Feature 1 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div className="icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)' }}>
                <Phone size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: '1.2rem 0 0.8rem 0' }}>Ultra-Realistic Voice Synthesis</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Human-like tone inflection, backchanneling sounds ("uh-huh", "right"), and speech pauses customized to your brand's unique identity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div className="icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary)' }}>
                <MessageSquare size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: '1.2rem 0 0.8rem 0' }}>Smart WhatsApp Flow Engine</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Rich template buttons, interactive lists, PDF invoice delivery, and calendar scheduling widgets sent straight to the user's pocket.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div className="icon-wrapper" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--accent)' }}>
                <Database size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: '1.2rem 0 0.8rem 0' }}>Instant CRM & DB Integrations</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Synchronize customer responses directly with HubSpot, Salesforce, or your custom PostgreSQL backends using secured webhook headers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div className="icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Globe size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: '1.2rem 0 0.8rem 0' }}>Dynamic Multilingual Fluidity</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Our agents detect speaking or writing patterns and switch dialects mid-sentence. Support for over 50+ languages natively.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div className="icon-wrapper" style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
                <Bot size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: '1.2rem 0 0.8rem 0' }}>Infinite Context Retrieval</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Upload entire company handbooks, support wikis, or PDF catalog menus. The agent reads and retrieves data vectors in milliseconds.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div className="icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: '1.2rem 0 0.8rem 0' }}>Sub-Second Warm Handoff</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Need human escalation? The agent triggers an immediate hot-transfer line to your support desk along with full call transcripts.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Dashboard Metrics Control Room Section */}
      <DashboardPreview />

      {/* 6. Timeline section: How It Works */}
      <section id="timeline" style={{ padding: '6rem 0' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="badge">
              <Layers size={12} /> Execution Flow
            </span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.2rem' }}>
              Go Live in <span className="gradient-accent">Four Simple Steps</span>
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              From initial database indexing to outbound customer campaigns in under 48 hours.
            </p>
          </div>

          <div className="timeline-container">
            {/* Step 1 */}
            <div className="timeline-item">
              <div className="timeline-badge">1</div>
              <div className="timeline-content glass-panel">
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Connect Data & Guidelines</h4>
                <p>Upload your Q&As, support docs, or point the system to your active database API. Define exact bounds on what the agent should and shouldn't talk about.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="timeline-item">
              <div className="timeline-badge">2</div>
              <div className="timeline-content glass-panel">
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Tune Tone & Accent Synthesizer</h4>
                <p>Select from our library of 50+ pre-trained professional voices, or clone your brand spokesperson's voice model directly from a 30-second audio sample.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="timeline-item">
              <div className="timeline-badge">3</div>
              <div className="timeline-content glass-panel">
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Hot-Deploy Webhooks</h4>
                <p>Connect our WhatsApp Cloud API gateway to your WhatsApp Business number. Or claim a phone number (SIP trunking / Twilio gateway) in any global country prefix.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="timeline-item">
              <div className="timeline-badge">4</div>
              <div className="timeline-content glass-panel">
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#10b981' }}>Observe, Optimize & Hand-off</h4>
                <p>Review metrics on your unified dashboard. View full conversations, check sentiment scores, and configure rules for human agent hand-offs.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing" style={{ padding: '6rem 0', background: 'rgba(13, 17, 39, 0.15)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
        <div className="container">
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="badge">
              <Lock size={12} /> Transparent Pricing
            </span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.2rem' }}>
              Choose Your <span className="gradient-accent">Growth Velocity</span>
            </h2>
            
            {/* Toggle Billing */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-glass)',
              borderRadius: '9999px',
              padding: '0.3rem 0.5rem',
              marginTop: '1.5rem'
            }}>
              <button 
                onClick={() => setBillingCycle('monthly')}
                style={{
                  background: billingCycle === 'monthly' ? 'var(--primary)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                style={{
                  background: billingCycle === 'yearly' ? 'var(--primary)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                Yearly <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginLeft: '3px' }}>(20% Off)</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch'
          }}>
            {/* Starter Plan */}
            <div className="glass-panel pricing-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Starter</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>For growing startups launching their first agent.</p>
                
                <div style={{ margin: '2rem 0 1.5rem 0' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                    ${getPrice(49)}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {billingCycle === 'monthly' ? '/month' : '/month, billed yearly'}
                  </span>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-glass)', marginBottom: '1.5rem' }} />

                <ul className="pricing-list">
                  <li><CheckCircle2 size={16} /> 1 Active AI Agent (WhatsApp or Voice)</li>
                  <li><CheckCircle2 size={16} /> 500 Outbound Call Minutes / month</li>
                  <li><CheckCircle2 size={16} /> 10,000 WhatsApp Events / month</li>
                  <li><CheckCircle2 size={16} /> Standard Knowledge Ingest (PDF only)</li>
                  <li><CheckCircle2 size={16} /> 24-hour Sync Latency</li>
                </ul>
              </div>

              <a href="#contact" className="btn btn-secondary" style={{ marginTop: '2rem', width: '100%', borderRadius: '10px' }}>
                Deploy Starter
              </a>
            </div>

            {/* Growth Plan (Popular) */}
            <div className="glass-panel pricing-card popular" style={{ 
              padding: '2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative',
              borderColor: 'var(--primary)',
              background: 'rgba(139, 92, 246, 0.08)'
            }}>
              <div className="popular-badge">POPULAR</div>
              
              <div>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Growth</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Omnichannel voice + WhatsApp coordination.</p>
                
                <div style={{ margin: '2rem 0 1.5rem 0' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                    ${getPrice(199)}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {billingCycle === 'monthly' ? '/month' : '/month, billed yearly'}
                  </span>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-glass)', marginBottom: '1.5rem' }} />

                <ul className="pricing-list">
                  <li><CheckCircle2 size={16} style={{ color: 'var(--secondary)' }} /> 3 Active AI Agents</li>
                  <li><CheckCircle2 size={16} style={{ color: 'var(--secondary)' }} /> 3,000 Outbound Call Minutes / month</li>
                  <li><CheckCircle2 size={16} style={{ color: 'var(--secondary)' }} /> Unlimited WhatsApp Events</li>
                  <li><CheckCircle2 size={16} style={{ color: 'var(--secondary)' }} /> Ingest Websites, APIs, and PDFs</li>
                  <li><CheckCircle2 size={16} style={{ color: 'var(--secondary)' }} /> CRM Auto-Sync (HubSpot, Zapier)</li>
                  <li><CheckCircle2 size={16} style={{ color: 'var(--secondary)' }} /> &lt; 900ms Response Latency</li>
                </ul>
              </div>

              <a href="#contact" className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', borderRadius: '10px' }}>
                Launch Growth Tier
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-panel pricing-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Enterprise</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>High volumes, custom voices, and custom code integrations.</p>
                
                <div style={{ margin: '2rem 0 1.5rem 0' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                    Custom
                  </span>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-glass)', marginBottom: '1.5rem' }} />

                <ul className="pricing-list">
                  <li><CheckCircle2 size={16} /> Unlimited Dedicated AI Agents</li>
                  <li><CheckCircle2 size={16} /> Custom Telephony trunks (SIP Gateway)</li>
                  <li><CheckCircle2 size={16} /> Proprietary fine-tuned LLM personas</li>
                  <li><CheckCircle2 size={16} /> Custom Voice Clones & audio modeling</li>
                  <li><CheckCircle2 size={16} /> Dedicated Server Cluster (GDPR/HIPAA)</li>
                  <li><CheckCircle2 size={16} /> SLA support contract & dedicated engineers</li>
                </ul>
              </div>

              <a href="#contact" className="btn btn-secondary" style={{ marginTop: '2rem', width: '100%', borderRadius: '10px' }}>
                Contact Enterprise Sales
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Booking Consultation Contact Form */}
      <section id="contact" style={{ padding: '7rem 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge">
              <Mail size={12} /> Contact Expert
            </span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
              Connect with an <span className="gradient-accent">AI Engineer</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Let's design your agent workflows. Book a brief conversation with one of our AI solutions architects.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '3rem', position: 'relative' }}>
            {formStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.8rem' }}>Demo Booking Received!</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  Thank you! An AI consultant will review your specifications and email you scheduling times within 15 minutes.
                </p>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setFormStatus('idle')}
                  style={{ borderRadius: '8px' }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      FULL NAME *
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe" 
                      className="form-input" 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com" 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      PHONE NUMBER (OPTIONAL)
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000" 
                      className="form-input" 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      INTEREST AREA
                    </label>
                    <select 
                      name="interest"
                      value={formState.interest}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="voice">Outbound / Inbound Call Agents</option>
                      <option value="whatsapp">WhatsApp Interactive Flows</option>
                      <option value="both">Both Voice + WhatsApp integration</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    DESCRIBE YOUR WORKFLOW GOAL
                  </label>
                  <textarea 
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="We want to automate outbound confirmation calls for patients, and follow up via WhatsApp with directions..."
                    className="form-input" 
                    style={{ resize: 'none' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={formStatus === 'submitting'}
                  style={{ width: '100%', borderRadius: '10px', display: 'flex', justifyContent: 'center' }}
                >
                  {formStatus === 'submitting' ? 'Booking consultation...' : 'Securely Book Consultation'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 9. Footer */}
      <footer style={{
        background: '#04060c',
        borderTop: '1px solid var(--border-glass)',
        padding: '5rem 0 3rem 0',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            {/* Left Block */}
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: '#fff',
                  fontSize: '0.9rem'
                }}>
                  V
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
                  VoxFlow.ai
                </span>
              </div>
              <p style={{ maxWidth: '280px', fontSize: '0.85rem' }}>
                Deploying high-performance conversational calling and message agents for modern businesses globally.
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1.2rem' }}>Product</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><a href="#features" className="footer-link">Voice Agent</a></li>
                <li><a href="#features" className="footer-link">WhatsApp Bot</a></li>
                <li><a href="#playground" className="footer-link">Sandbox</a></li>
                <li><a href="#pricing" className="footer-link">Billing Tiers</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1.2rem' }}>Resources</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><a href="#docs" className="footer-link">Documentation</a></li>
                <li><a href="#api" className="footer-link">API Reference</a></li>
                <li><a href="#github" className="footer-link">GitHub Repository</a></li>
                <li><a href="#status" className="footer-link">System Status</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1.2rem' }}>Security</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><a href="#gdpr" className="footer-link">GDPR Compliance</a></li>
                <li><a href="#hipaa" className="footer-link">HIPAA Addendum</a></li>
                <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="#terms" className="footer-link">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-glass)', marginBottom: '2rem' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>
              © 2026 VoxFlow AI Inc. All rights reserved.
            </div>
            <div>
              Powered by Twilio, WhatsApp Cloud API & Antigravity Synthesizers.
            </div>
          </div>
        </div>
      </footer>

      {/* Styled JSX for Navlinks, Footers, and Timelines */}
      <style>{`
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: var(--transition-smooth);
        }
        .nav-link:hover {
          color: var(--secondary);
        }
        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        
        /* Timeline styling */
        .timeline-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 15px;
          bottom: 15px;
          width: 2px;
          background: linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent), #10b981);
        }
        .timeline-item {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
          position: relative;
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-badge {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #0f172a;
          border: 2px solid var(--border-glass);
          color: #fff;
          display: flex;
          align-items: center;
          justifyContent: center;
          font-weight: 800;
          font-family: var(--font-display);
          z-index: 2;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          transition: var(--transition-smooth);
        }
        .timeline-item:hover .timeline-badge {
          border-color: var(--secondary);
          box-shadow: 0 0 15px var(--secondary-glow);
          transform: scale(1.1);
        }
        .timeline-content {
          padding: 1.5rem 2rem;
          flex-grow: 1;
        }
        
        /* Pricing Cards */
        .pricing-card {
          transition: var(--transition-smooth);
        }
        .pricing-card.popular {
          transform: scale(1.03);
        }
        @media (max-width: 900px) {
          .pricing-card.popular {
            transform: scale(1);
          }
        }
        .popular-badge {
          position: absolute;
          top: 0;
          right: 2rem;
          transform: translateY(-50%);
          background: var(--primary);
          color: #fff;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 10px rgba(139, 92, 246, 0.4);
        }
        .pricing-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          font-size: 0.9rem;
          color: #cbd5e1;
        }
        .pricing-list li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .pricing-list li svg {
          flex-shrink: 0;
          color: var(--text-muted);
        }
        
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition-smooth);
        }
        .footer-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </>
  );
}

export default App;
