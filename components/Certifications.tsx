'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { profile } from '../data/profile';
import { formatDateEU } from '@/lib/date';

const Certifications = () => {
  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="section-heading">Certifications</h2>
        <p className="section-subheading">
          Competitions and recognitions demonstrating commitment and growth
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...profile.certifications]
          .sort((a, b) => {
            const toTime = (d?: string) => {
              if (!d) return 0;
              const parts = d.split('-');
              const y = parseInt(parts[0], 10);
              const m = parts[1] ? parseInt(parts[1], 10) - 1 : 11;
              const day = parts[2] ? parseInt(parts[2], 10) : 28;
              return new Date(y, m, day).getTime();
            };
            return toTime(b.date) - toTime(a.date);
          })
          .map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="card flex h-full flex-col"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <svg
                      className="h-6 w-6 text-primary-600 dark:text-primary-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-semibold leading-tight text-neutral-900 dark:text-neutral-100 sm:text-lg">
                      {cert.name}
                    </h3>
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-200">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Issued:{' '}
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {formatDateEU(cert.date)}
                    </span>
                  </span>
                  {cert.expiryDate && (
                    <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-300">
                      Expires:{' '}
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {formatDateEU(cert.expiryDate)}
                      </span>
                    </span>
                  )}
                </div>

                {cert.url && (
                  <div className="mt-auto">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm rounded-md font-medium text-primary-600 transition-colors duration-200 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-primary-100 dark:hover:text-primary-50"
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
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Verify Credential</span>
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="glass-strong inline-block p-6">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-primary-600 dark:text-primary-100">
                {profile.certifications.length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">
                Active Certifications
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-primary-600 dark:text-primary-100">
                {
                  new Set(profile.certifications.map((cert) => cert.issuer))
                    .size
                }
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">
                Certifying Bodies
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-primary-600 dark:text-primary-100">
                {new Date().getFullYear() - 2023}+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">
                Years Certified
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Certifications;
