'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { profile } from '../data/profile';

import ResumeDownload from './ResumeDownload';
import SocialIcon from './SocialIcon';

const Hero = () => {
  // Fallback avatar if public/avatar.jpg is missing
  const [imgSrc, setImgSrc] = React.useState(profile.avatar);
  const fallbackSvg = React.useMemo(() => {
    const initials = profile.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('');
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='384' height='384' viewBox='0 0 384 384'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#7AB8BF'/>
          <stop offset='100%' stop-color='#025159'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dy='.1em' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='144' font-weight='700' fill='white'>${initials}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);
  return (
    <div className="container-responsive">
      <div className="flex flex-col items-center justify-between gap-12 py-12 lg:flex-row">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-4 text-lg font-medium text-primary-600 dark:text-primary-100"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-6 text-4xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 md:text-5xl lg:text-6xl"
          >
            {profile.name}
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-6 text-xl font-semibold text-primary-700 dark:text-primary-100 md:text-2xl"
          >
            {profile.title}
          </motion.h2>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-8 flex items-center justify-center text-neutral-700 dark:text-neutral-300 lg:justify-start"
          >
            <svg
              className="mr-2 h-5 w-5"
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
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-700 dark:text-neutral-300"
          >
            {profile.summary}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <ResumeDownload variant="hero" />

            <motion.a
              href="#contact"
              className="btn btn-lg btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
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
                <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Get In Touch</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-8 flex items-center justify-center space-x-6 lg:justify-start"
          >
            {profile.social.telegram && (
              <motion.a
                href={profile.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1 text-neutral-600 transition-colors duration-200 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-neutral-400 dark:hover:text-primary-100"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Telegram channel"
              >
                <SocialIcon name="telegram" className="h-6 w-6" />
              </motion.a>
            )}
            {profile.social.linkedin && (
              <motion.a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1 text-neutral-600 transition-colors duration-200 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-neutral-400 dark:hover:text-primary-100"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn profile"
              >
                <SocialIcon name="linkedin" className="h-6 w-6" />
              </motion.a>
            )}

            {profile.social.github && (
              <motion.div
                className="rounded-md p-1 text-neutral-600 transition-colors duration-200 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-100"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
                role="img"
              >
                <SocialIcon name="github" className="h-6 w-6" />
              </motion.div>
            )}

            {/* Twitter removed by request */}

            {profile.social.email && (
              <motion.a
                href={`mailto:${profile.social.email}`}
                className="rounded-md p-1 text-neutral-600 transition-colors duration-200 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-neutral-400 dark:hover:text-primary-100"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send email"
              >
                <SocialIcon name="email" className="h-6 w-6" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-shrink-0"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-80 w-80 md:h-96 md:w-96"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 opacity-20 blur-xl"></div>
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-2xl dark:border-neutral-700">
              <Image
                src={imgSrc}
                alt={`${profile.name} - ${profile.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 320px, 384px"
                priority
                onError={() => setImgSrc(fallbackSvg)}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="mt-16 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer text-neutral-400 transition-colors duration-200 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-100"
          onClick={() =>
            document
              .getElementById('about')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          role="button"
          tabIndex={0}
          aria-label="Scroll to about section"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              document
                .getElementById('about')
                ?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
