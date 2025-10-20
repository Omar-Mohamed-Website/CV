'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { profile } from '../data/profile';
import { formatDateEU } from '@/lib/date';

const ExperienceTimeline = () => {
  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="section-heading">Work Experience</h2>
        <p className="section-subheading">
          Teaching and content creation across YouTube, Telegram, and TikTok
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-8 top-0 w-0.5 transform bg-primary-200 dark:bg-primary-100/20 md:left-1/2 md:-translate-x-px"></div>

        {[...profile.experience]
          .sort(
            (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
          )
          .map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-16 flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 z-10 h-4 w-4 -translate-x-1/2 transform rounded-full border-4 border-white bg-primary-500 shadow-lg dark:border-neutral-900 md:left-1/2"></div>

              {/* Content */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? 'pl-20 md:pl-0 md:pr-8' : 'pl-20 md:pl-8'
                }`}
              >
                {' '}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="card timeline-item"
                >
                  {/* Header with improved layout */}
                  <div className="mb-4 flex flex-col gap-3">
                    <h3 className="text-xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
                      {exp.role}
                    </h3>
                    <h4 className="text-base font-medium text-primary-600 dark:text-primary-200">
                      {exp.company}
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
                        {formatDateEU(exp.start)} - {formatDateEU(exp.end)}
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {exp.description}
                  </p>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
