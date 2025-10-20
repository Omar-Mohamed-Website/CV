'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { profile } from '../data/profile';
import SocialIcon from './SocialIcon';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

const ContactForm = () => {
  // Maintenance/temporary lock flag for the entire contact section
  const isLocked = true;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    if (isLocked) {
      // Prevent submitting while the contact section is temporarily unavailable
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ID
        ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
        : `/api/contact`; // Fallback to API route if deployed on Vercel

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(
          result.message ||
            "Thank you for your message! I'll get back to you soon."
        );
        reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(
          result.error || 'Something went wrong. Please try again.'
        );
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage(
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="section-heading">Get In Touch</h2>
        <p className="section-subheading">
          Questions about English lessons, collaborations, or content? Let’s
          connect.
        </p>
      </motion.div>

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="card p-5 sm:p-6"
          >
            <h3 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
              Let&apos;s Start a Conversation
            </h3>
            <p className="mb-8 leading-relaxed text-neutral-700 dark:text-neutral-300">
              Whether you’re looking for English tutoring, have a learning idea
              in mind, or just want to connect, I’d love to hear from you. I’m
              always open to opportunities and collaborations in education and
              content creation.
            </p>

            <div className="contact-info space-y-6">
              <div className="flex items-start">
                <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-100/20">
                  <svg
                    className="h-6 w-6 text-primary-600 dark:text-primary-100"
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
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
                    Email
                  </h4>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-primary-600 transition-colors duration-200 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-50"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-100/20">
                  <svg
                    className="h-6 w-6 text-primary-600 dark:text-primary-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
                    Location
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {profile.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-100/20">
                  <svg
                    className="h-6 w-6 text-primary-600 dark:text-primary-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
                    Response Time
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-700">
              <h4 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100">
                Connect on Social Media
              </h4>
              <div className="flex space-x-4">
                {profile.social.telegram && (
                  <a
                    href={profile.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-primary-100/20 dark:hover:text-primary-100"
                    aria-label="Telegram"
                  >
                    <SocialIcon name="telegram" className="h-5 w-5" />
                  </a>
                )}
                {profile.social.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-primary-100/20 dark:hover:text-primary-100"
                    aria-label="LinkedIn"
                  >
                    <SocialIcon name="linkedin" className="h-5 w-5" />
                  </a>
                )}

                {profile.social.github && (
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-primary-100/20 dark:hover:text-primary-100"
                    aria-label="GitHub"
                  >
                    <SocialIcon name="github" className="h-5 w-5" />
                  </a>
                )}

                {/* Twitter removed by request */}

                {profile.social.youtube && (
                  <a
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-primary-100/20 dark:hover:text-primary-100"
                    aria-label="YouTube"
                  >
                    <SocialIcon name="youtube" className="h-5 w-5" />
                  </a>
                )}

                {profile.social.instagram && (
                  <a
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-primary-100/20 dark:hover:text-primary-100"
                    aria-label="Instagram"
                  >
                    <SocialIcon name="instagram" className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="card relative p-6"
          >
            {/* Shade overlay and warning box - scoped ONLY to the form card */}
            {isLocked && (
              <>
                <div
                  className="pointer-events-none absolute inset-0 z-20 rounded-xl bg-black/50 backdrop-blur-[1px]"
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                  <div className="mx-auto w-max rounded-lg border border-yellow-300 bg-yellow-50/95 px-4 py-3 text-yellow-900 shadow-xl dark:border-yellow-700 dark:bg-yellow-900/90 dark:text-yellow-100">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-2 h-8 w-8">
                        <Image
                          src={`${process.env.NODE_ENV === 'production' ? '/Omar-Mohamed' : ''}/warning-icon.png`}
                          alt="Warning"
                          fill
                          className="object-contain"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-sm font-semibold">
                        Temporarily Unavailable.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="contact-form space-y-6"
            >
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 ${
                    errors.name ? 'border-red-300' : 'border-neutral-300'
                  } ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  disabled={isLocked}
                  placeholder="Your full name"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 ${
                    errors.email ? 'border-red-300' : 'border-neutral-300'
                  } ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  disabled={isLocked}
                  placeholder="your.email@example.com"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters',
                    },
                  })}
                  className={`resize-vertical w-full rounded-lg border px-4 py-3 transition-colors duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 ${
                    errors.message ? 'border-red-300' : 'border-neutral-300'
                  } ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                  disabled={isLocked}
                  placeholder="Tell me about your project, opportunity, or just say hello!"
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot field (hidden) */}
              <input
                type="text"
                {...register('honeypot')}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isLocked}
                className={`btn btn-lg btn-primary w-full ${
                  isSubmitting || isLocked
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:scale-105'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>{isLocked ? 'Unavailable' : 'Send Message'}</span>
                  </div>
                )}
              </motion.button>

              {/* Submit status message */}
              {!isLocked && submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg p-4 ${
                    submitStatus === 'success'
                      ? 'border border-green-200 bg-green-50 text-green-800'
                      : 'border border-red-200 bg-red-50 text-red-800'
                  }`}
                  role="alert"
                >
                  <div className="flex items-start">
                    <svg
                      className={`mr-2 mt-0.5 h-5 w-5 flex-shrink-0 ${
                        submitStatus === 'success'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {submitStatus === 'success' ? (
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      )}
                    </svg>
                    <p>{submitMessage}</p>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
