'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { profile } from '../data/profile';

import ResumeDownload from './ResumeDownload';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        'hero',
        'about',
        'experience',
        'education',
        'skills',
        'certifications',
        'projects',
        'contact',
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-white/40 dark:border-primary-400/20'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="container-responsive py-3"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <button
              onClick={() => scrollToSection('hero')}
              className="text-lg font-semibold tracking-tight text-neutral-900 transition-colors duration-200 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-0 dark:text-white dark:hover:text-primary-200"
              aria-label="Go to top of page"
            >
              {profile.name.split(' ')[0]} {profile.name.split(' ')[1]}
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-0 ${
                  activeSection === item.id
                    ? 'text-primary-600 dark:text-primary-200'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-lg bg-primary-50/50 dark:bg-primary-900/30"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
              </motion.button>
            ))}

            <div className="ml-2 flex items-center gap-2 border-l border-neutral-200 pl-3 dark:border-slate-700">
              <ThemeToggle />
              <ResumeDownload variant="header" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu
              navigationItems={navigationItems}
              activeSection={activeSection}
              onItemClick={scrollToSection}
            />
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

const MobileMenu = ({
  navigationItems,
  activeSection,
  onItemClick,
}: {
  navigationItems: Array<{ id: string; label: string }>;
  activeSection: string;
  onItemClick: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragX, setDragX] = useState(0);
  const canPortal =
    typeof window !== 'undefined' && typeof document !== 'undefined';

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleItemClick = (id: string) => {
    onItemClick(id);
    setIsOpen(false);
  };

  useEffect(() => {
    // Lock body scroll when menu is open for mobile stability
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
    // No-op cleanup when closed to satisfy return type
    return () => {};
  }, [isOpen]);

  // Edge swipe to open menu (swipe from right edge when closed)
  useEffect(() => {
    if (isOpen || !canPortal) return;

    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      // Only trigger if starting near right edge (within 20px)
      if (window.innerWidth - startX > 20) {
        startX = 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startX) return;
      const touch = e.touches[0];
      const deltaX = startX - touch.clientX;

      // If swiping left from edge significantly (>50px), open menu
      if (deltaX > 50) {
        setIsOpen(true);
        startX = 0;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen, canPortal]);
  return (
    <>
      <button
        onClick={toggleMenu}
        className="rounded-lg p-2 text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400/50 dark:text-neutral-200 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu via portal to escape transformed ancestors */}
      {isOpen &&
        canPortal &&
        createPortal(
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/35 backdrop-blur-sm md:hidden"
              onClick={toggleMenu}
            />

            {/* Panel */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                // Close menu if dragged right more than 100px or velocity > 500
                if (info.offset.x > 100 || info.velocity.x > 500) {
                  setIsOpen(false);
                  setDragX(0);
                } else {
                  setDragX(0);
                }
              }}
              onDrag={(e, info) => {
                setDragX(info.offset.x);
              }}
              initial={{ x: '100%' }}
              animate={{ x: dragX > 0 ? dragX : 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass-strong fixed right-0 top-0 z-[100] h-dvh w-72 touch-pan-y overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] md:hidden"
              style={{ cursor: dragX > 0 ? 'grabbing' : 'grab' }}
            >
              <div className="flex h-full flex-col p-6">
                <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-slate-800">
                  <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    Menu
                  </h2>
                  <button
                    onClick={toggleMenu}
                    className="rounded-lg p-1.5 text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-400/50 dark:text-neutral-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    aria-label="Close menu"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <nav
                  className="flex-1 space-y-1 overflow-y-auto"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400/50 ${
                        activeSection === item.id
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-200'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-slate-800/70 dark:hover:text-white'
                      }`}
                      aria-current={
                        activeSection === item.id ? 'page' : undefined
                      }
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="space-y-3 border-t border-neutral-200 pt-4 dark:border-slate-800">
                  <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2.5 dark:bg-slate-800/70">
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>
                  <ResumeDownload variant="mobile" />
                </div>
              </div>
            </motion.div>
          </>,
          document.body
        )}
    </>
  );
};

export default Header;
