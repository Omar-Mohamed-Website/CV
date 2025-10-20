'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { profile } from '../data/profile';
import { formatDateEU } from '@/lib/date';

const Education = () => {
  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="section-heading">Education</h2>
        <p className="section-subheading">
          Academic journey and foundational learning
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {profile.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="card flex h-full w-full flex-col"
            >
              {/* Header with consistent layout */}
              <div className="mb-4 flex flex-col gap-3">
                <h3 className="text-xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
                  {edu.degree}
                </h3>
                <h4 className="text-base font-medium text-primary-600 dark:text-primary-200">
                  {edu.school}
                </h4>
                <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary-50 px-3 py-1.5 dark:bg-primary-900/30">
                  <svg
                    className="h-4 w-4 text-primary-600 dark:text-primary-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-primary-700 dark:text-primary-200">
                    {formatDateEU(edu.start)} - {formatDateEU(edu.end)}
                  </span>
                </div>
              </div>

              {edu.gpa && (
                <div className="mb-3">
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                    GPA:{' '}
                    <span className="text-neutral-900 dark:text-neutral-100">
                      {edu.gpa}
                    </span>
                  </span>
                </div>
              )}

              {edu.description && (
                <p className="flex-1 leading-relaxed text-neutral-700 dark:text-neutral-200">
                  {edu.description}
                </p>
              )}

              {/* Academic achievement indicator */}
              <div className="mt-auto border-t border-neutral-100 pt-4 dark:border-slate-700">
                <div className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  <svg
                    className="mr-2 h-4 w-4 text-primary-500 dark:text-primary-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {edu.start === '2023'
                    ? 'Currently Enrolled'
                    : 'Graduated with Distinction'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
