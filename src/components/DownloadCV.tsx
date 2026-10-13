/** @jsxImportSource react */
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGE_BASE_URL } from '../utils/api';

interface Props {
  data: any;
}

const DownloadCV = ({ data }: Props) => {
  const { lang } = useLanguage();

  const handleDownload = () => {
    const url = `${IMAGE_BASE_URL}/api/cv/download?role=fullstack&lang=${lang}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      onClick={handleDownload}
      className="px-10 py-4 bg-transparent border-2 border-primary/30 hover:border-primary text-text-main font-bold rounded-2xl transition-all flex items-center gap-2 group"
      aria-label={lang === 'es' ? 'Descargar CV ATS' : 'Download ATS CV'}
    >
      <FileText size={20} className="text-primary group-hover:scale-110 transition-transform" />
      {lang === 'es' ? 'Descargar CV ATS' : 'Download ATS CV'}
    </button>
  );
};

export default DownloadCV;
