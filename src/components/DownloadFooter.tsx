/** @jsxImportSource react */
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGE_BASE_URL } from '../utils/api';

interface Props {
  data: any;
}

const DownloadFooter = ({ data }: Props) => {
  const { lang } = useLanguage();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${IMAGE_BASE_URL}/api/cv/download?role=fullstack&lang=${lang}`;
    window.open(url, '_blank');
  };

  return (
    <a 
      href="#" 
      onClick={handleDownload}
      className="footer-nav-link font-black text-primary hover:text-primary-bright transition-colors"
    >
      {lang === 'es' ? 'Descargar CV ATS' : 'Download ATS CV'}
    </a>
  );
};

export default DownloadFooter;
