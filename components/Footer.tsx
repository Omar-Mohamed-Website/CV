'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { profile } from '../data/profile';
import SocialIcon from './SocialIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 py-16 text-white">
      <div className="container-responsive">
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {/* Brand and description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-xl font-bold">
              {profile.name.split(' ')[0]} {profile.name.split(' ')[1]}
            </h3>
            <p className="mb-6 leading-relaxed text-neutral-300">
              English Teacher and Content Creator focused on simplifying complex
              concepts and building supportive learning communities. Always
              learning, always teaching.
            </p>
            <div className="flex items-center text-sm text-neutral-400">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {profile.location}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-3">
              {[
                { label: 'About', href: '#about' },
                { label: 'Experience', href: '#experience' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="-mx-2 block rounded-md px-2 py-1 text-neutral-300 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(link.href.substring(1))
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Connect section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-lg font-semibold dark:text-neutral-100">
              Let&apos;s Connect
            </h4>
            <p className="mb-4 text-neutral-300 dark:text-neutral-200">
              Let&apos;s connect and build something amazing together.
            </p>

            {/* Social media links */}
            <div className="mb-6 flex space-x-4">
              {profile.social.linkedin && (
                <motion.a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-neutral-200 transition-all duration-200 hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <SocialIcon name="linkedin" className="h-5 w-5" />
                </motion.a>
              )}

              {profile.social.telegram && (
                <motion.a
                  href={profile.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-neutral-200 transition-all duration-200 hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Telegram"
                >
                  <SocialIcon name="telegram" className="h-5 w-5" />
                </motion.a>
              )}

              {profile.social.github && (
                <motion.a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-neutral-200 transition-all duration-200 hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <SocialIcon name="github" className="h-5 w-5" />
                </motion.a>
              )}

              {/* Twitter removed by request */}

              <motion.a
                href={`mailto:${profile.email}`}
                className="btn btn-sm rounded-md bg-slate-800 text-neutral-200 transition-all duration-200 hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Email</span>
              </motion.a>
            </div>

            {/* Email for direct contact */}
            <a
              href={`mailto:${profile.email}`}
              className="-mx-2 inline-flex items-center rounded-md px-2 py-1 text-sm text-primary-800 transition-colors duration-200 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-neutral-900 dark:text-primary-200 dark:hover:text-primary-100"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {profile.email}
            </a>
          </motion.div>
        </div>

        {/* Copyright Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 pt-8"
        >
          <div className="mb-6 rounded-lg bg-slate-900/70 p-6">
            <h4 className="mb-3 text-sm font-semibold text-neutral-200">
              © {currentYear} {profile.name}. All rights reserved.
            </h4>
            <p className="mb-3 text-xs leading-relaxed text-neutral-400">
              All content on this website, including text, images, graphics, and
              code, is protected by copyright and other intellectual property
              laws. You may view and print pages for personal, non-commercial
              use only. Any other use, reproduction, or distribution requires
              prior written permission from the copyright owner.
            </p>
            <p className="text-xs text-neutral-400">
              For permissions or copyright concerns, please contact:{' '}
              <a
                href={`mailto:${profile.email}`}
                className="text-primary-200 transition-colors duration-200 hover:text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                {profile.email}
              </a>
            </p>
          </div>

          {/* Bottom section */}
          <div className="flex items-center justify-center md:justify-end">
            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center rounded-md px-3 py-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              aria-label="Scroll to top"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              Back to top
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
