'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { profile } from '../data/profile';

const About = () => {
  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="section-heading">About Me</h2>
        <div className="card mx-auto max-w-4xl p-6 sm:p-8">
          <p className="section-subheading">{profile.summary}</p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h3 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Background
              </h3>
              <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                Currently pursuing high school education at Martyr Colonel Ahmed
                Jaber Nassar Secondary School in Mielec, Poland. Originally from
                Egypt, I combine my passion for English education with content
                creation to help students learn effectively. Through YouTube,
                Telegram, and TikTok, I've built a community of learners focused
                on making English accessible and enjoyable for beginners.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h3 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Focus Areas
              </h3>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start">
                  <span className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500"></span>
                  English Teaching & Tutoring for Beginners
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500"></span>
                  Educational Content Creation & Video Production
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500"></span>
                  Community Building & Student Engagement
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500"></span>
                  Chess Strategy & Academic Support
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
