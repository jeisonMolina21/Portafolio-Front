/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, Layers, Play, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

interface CyberTerminalProps {
  role: 'fullstack' | 'automation' | 'helpdesk';
  accentColor: string;
}

export const CyberTerminal = ({ role, accentColor }: CyberTerminalProps) => {
  const [activeTab, setActiveTab] = useState<'code' | 'arch' | 'metrics'>('code');
  const [typedLineIndex, setTypedLineIndex] = useState(0);

  const codeSnippets = {
    fullstack: [
      `// Initialize Digital Pass API Service`,
      `import { NextApiRequest, NextApiResponse } from 'next';`,
      `import { dbPool } from '@/lib/database';`,
      ``,
      `export default async function handler(req: NextApiRequest, res: NextApiResponse) {`,
      `  const { userId, role } = req.body;`,
      `  const [pass] = await dbPool.query('SELECT * FROM digital_passes WHERE user_id = $1', [userId]);`,
      `  return res.status(200).json({ status: 'active', passData: pass[0] });`,
      `}`
    ],
    automation: [
      `# Proyecto Kairós: Biometric Ingestion & ETL Pipeline`,
      `import pandas as pd`,
      `from zkteco_api import ZKAccessControl`,
      ``,
      `def run_biometric_sync():`,
      `    logs = ZKAccessControl.fetch_attendance_logs(date='today')`,
      `    cleaned_df = pd.DataFrame(logs).drop_duplicates(subset=['user_id', 'timestamp'])`,
      `    cleaned_df.to_sql('biometric_logs', con=db_engine, if_exists='append')`,
      `    print("✅ 12 Días de trabajo manual ahorrados exitosamente")`
    ],
    helpdesk: [
      `# IT Service Management - Active Directory & M365 Orchestrator`,
      `Import-Module ActiveDirectory`,
      `Import-Module Microsoft.Graph.Users`,
      ``,
      `function Sync-HelpdeskTicket {`,
      `  param ([string]$TicketId, [string]$UserPrincipalName)`,
      `  Set-MgUser -UserId $UserPrincipalName -AccountEnabled $true`,
      `  Write-Host "✅ Ticket $TicketId resuelto. SLA 100% alcanzado."`,
      `}`
    ]
  };

  const lines = codeSnippets[role];

  useEffect(() => {
    setTypedLineIndex(0);
    const interval = setInterval(() => {
      setTypedLineIndex(prev => (prev < lines.length ? prev + 1 : lines.length));
    }, 200);
    return () => clearInterval(interval);
  }, [role]);

  return (
    <div 
      className="cyber-terminal-container cyber-hud-border"
      style={{
        boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 30px ${accentColor}33`,
        border: `1px solid ${accentColor}44`
      }}
    >
      {/* Header Bar */}
      <div className="cyber-terminal-header">
        <div className="cyber-terminal-dots">
          <div className="cyber-dot cyber-dot-red" />
          <div className="cyber-dot cyber-dot-yellow" />
          <div className="cyber-dot cyber-dot-green" />
          <span className="cyber-terminal-title" style={{ color: accentColor }}>
            CYBER-HUD // v2.6.0
          </span>
        </div>

        {/* Tab Controls */}
        <div className="cyber-terminal-tabs">
          <button
            onClick={() => setActiveTab('code')}
            className="cyber-tab-btn"
            style={{
              background: activeTab === 'code' ? `${accentColor}33` : 'transparent',
              color: activeTab === 'code' ? '#ffffff' : '#888888',
              border: activeTab === 'code' ? `1px solid ${accentColor}66` : '1px solid transparent'
            }}
          >
            <Terminal size={10} /> Terminal
          </button>

          <button
            onClick={() => setActiveTab('arch')}
            className="cyber-tab-btn"
            style={{
              background: activeTab === 'arch' ? `${accentColor}33` : 'transparent',
              color: activeTab === 'arch' ? '#ffffff' : '#888888',
              border: activeTab === 'arch' ? `1px solid ${accentColor}66` : '1px solid transparent'
            }}
          >
            <Layers size={10} /> Arquitectura
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className="cyber-tab-btn"
            style={{
              background: activeTab === 'metrics' ? `${accentColor}33` : 'transparent',
              color: activeTab === 'metrics' ? '#ffffff' : '#888888',
              border: activeTab === 'metrics' ? `1px solid ${accentColor}66` : '1px solid transparent'
            }}
          >
            <Activity size={10} /> Métricas
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="cyber-terminal-body">
        <AnimatePresence mode="wait">
          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cyber-code-block"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: accentColor, fontWeight: 700 }}>
                <Play size={12} className="animate-pulse" />
                <span>Ejecución en Tiempo Real [{role.toUpperCase()}_ENGINE]</span>
              </div>
              {lines.slice(0, typedLineIndex).map((line, idx) => (
                <div key={idx} style={{ whiteSpace: 'pre-wrap', color: line.startsWith('//') || line.startsWith('#') ? '#64748b' : line.includes('function') || line.includes('def') ? accentColor : '#cbd5e1' }}>
                  <span style={{ color: '#475569', width: '24px', display: 'inline-block', selectUser: 'none' }}>{idx + 1}</span>
                  {line}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'arch' && (
            <motion.div
              key="arch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: accentColor }}>
                Diagrama Híbrido de Flujo de Datos
              </div>
              <div className="cyber-arch-card">
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>1. Ingesta de Datos</div>
                <Zap size={14} style={{ color: accentColor }} />
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>API REST / Biometría</div>
              </div>
              <div className="cyber-arch-card">
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>2. Orquestación</div>
                <ShieldCheck size={14} style={{ color: accentColor }} />
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Python / n8n / Node.js</div>
              </div>
              <div className="cyber-arch-card">
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>3. Destino Final</div>
                <CheckCircle size={14} style={{ color: accentColor }} />
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>PostgreSQL / Azure AD / App UI</div>
              </div>
            </motion.div>
          )}

          {activeTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
            >
              <div className="cyber-metric-card">
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Procesamiento</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: accentColor, marginTop: '4px' }}>50K+</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>Registros Diarios</div>
              </div>

              <div className="cyber-metric-card">
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tiempo Ahorrado</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>12 Días</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>Manuales / Mes</div>
              </div>

              <div className="cyber-metric-card" style={{ gridColumn: 'span 2' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Disponibilidad & Uptime</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: accentColor, marginTop: '4px' }}>99.9% Disponibilidad</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>Arquitectura Serverless en Aiven & Vercel</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Status Line */}
      <div className="cyber-terminal-footer">
        <span>STATUS: ONLINE</span>
        <span style={{ color: accentColor }}>ROLE: {role.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default CyberTerminal;
