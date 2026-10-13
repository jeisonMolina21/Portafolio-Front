/** @jsxImportSource react */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, FileDown } from 'lucide-react';
import { api, IMAGE_BASE_URL } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  matchedRole?: string;
  cvLinks?: {
    fullstack: string;
    automation: string;
    helpdesk: string;
  };
}

export const AIAssistantWidget = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! Soy el Asistente Virtual de Jeison Molina. Pregúntame sobre sus 3 perfiles: Fullstack, Automatización o Soporte TI.',
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (customQuery?: string) => {
    const queryText = customQuery || input;
    if (!queryText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customQuery) setInput('');
    setIsLoading(true);

    try {
      const res = await api.post('ai-assistant', { query: queryText });
      const data = res?.data || res;
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data?.answer || 'Jeison integra 3 roles: Fullstack Developer, Automatización RPA y Soporte TI.',
        matchedRole: data?.matchedRole,
        cvLinks: data?.cvLinks || {
          fullstack: `${IMAGE_BASE_URL}/api/cv/download?role=fullstack&lang=${lang}`,
          automation: `${IMAGE_BASE_URL}/api/cv/download?role=automation&lang=${lang}`,
          helpdesk: `${IMAGE_BASE_URL}/api/cv/download?role=helpdesk&lang=${lang}`
        }
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Jeison Molina es Ingeniero de Sistemas con experiencia en Desarrollo Fullstack (React/Node.js), Automatización con Python/n8n y Soporte TI / Helpdesk.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Experiencia en Fullstack",
    "Automatización y Python",
    "Soporte TI y Helpdesk"
  ];

  return (
    <div className="ai-widget-wrapper">
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="ai-widget-toggle-btn"
          >
            <Sparkles size={16} className="animate-spin-slow" />
            <span>Asistente IA</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Assistant Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="ai-widget-modal"
          >
            {/* Header */}
            <div className="ai-widget-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'rgba(153, 27, 27, 0.3)',
                  border: '1px solid rgba(220, 38, 38, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff4d4d'
                }}>
                  <Bot size={18} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: 800, margin: 0 }}>Jeison AI Assistant</h4>
                  <span style={{ color: '#888888', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Multi-role Consultant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#888888',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '8px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="ai-widget-prompts">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="ai-prompt-chip"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="ai-widget-body">
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    background: m.sender === 'user' ? 'rgba(153, 27, 27, 0.8)' : 'rgba(255, 255, 255, 0.06)',
                    color: '#ffffff',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    border: m.sender === 'user' ? '1px solid rgba(220, 38, 38, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    {m.text}
                  </div>

                  {/* CV Downloads if returned */}
                  {m.cvLinks && m.sender === 'bot' && (
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <a
                        href={m.cvLinks.fullstack}
                        download
                        style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#00f3ff',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid rgba(0,243,255,0.3)'
                        }}
                      >
                        <FileDown size={10} /> Fullstack CV
                      </a>
                      <a
                        href={m.cvLinks.automation}
                        download
                        style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#34d399',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid rgba(52,211,153,0.3)'
                        }}
                      >
                        <FileDown size={10} /> RPA CV
                      </a>
                      <a
                        href={m.cvLinks.helpdesk}
                        download
                        style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#60a5fa',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid rgba(96,165,250,0.3)'
                        }}
                      >
                        <FileDown size={10} /> Helpdesk CV
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', width: 'fit-content' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4d4d', animation: 'ping 1s infinite' }} />
                  <span style={{ fontSize: '11px', color: '#888888' }}>Pensando respuesta...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="ai-widget-footer">
              <input
                type="text"
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="ai-widget-input"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="ai-widget-send-btn"
                style={{ opacity: isLoading || !input.trim() ? 0.5 : 1 }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistantWidget;
