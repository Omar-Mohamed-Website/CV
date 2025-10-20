'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ResumeDownloadProps {
  variant?: 'header' | 'hero' | 'mobile';
}

const ResumeDownload = ({ variant = 'hero' }: ResumeDownloadProps) => {
  const handleDownload = () => {
    const basePath =
      process.env.NODE_ENV === 'production' ? '/Omar-Mohamed' : '';
    window.open(`${basePath}/Omar_Mohamed_CV.pdf`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const baseClasses =
    'btn rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2';

  const variantClasses = {
    header: 'btn-sm bg-primary-500 text-white hover:bg-primary-600',
    hero: 'btn-lg bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl',
    mobile: 'w-full bg-primary-500 text-white hover:bg-primary-600',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <div
      className={`flex gap-2 ${variant === 'mobile' ? 'flex-col' : 'flex-row'}`}
    >
      <motion.button
        onClick={handleDownload}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Download CV as PDF"
        data-testid={`resume-download-${variant}`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Download CV</span>
      </motion.button>

      {variant === 'hero' && (
        <motion.button
          onClick={handlePrint}
          className="btn btn-lg btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Print this page"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Print CV</span>
        </motion.button>
      )}
    </div>
  );
};

export default ResumeDownload;
