import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navigation from './Navigation';
import WhatsAppButton from './WhatsAppButton';

const ReactApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageProvider>
      <Navigation />
      {children}
      <WhatsAppButton />
    </LanguageProvider>
  );
};

export default ReactApp;
