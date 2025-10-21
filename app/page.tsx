'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import PerformanceOptimizer from '../components/PerformanceOptimizer';
import { usePullToTop } from '../hooks/useTouchGestures';

// Lazy load components that are below the fold
const About = dynamic(() => import('../components/About'), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const ExperienceTimeline = dynamic(() => import('../components/ExperienceTimeline'), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Education = dynamic(() => import('../components/Education'), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Skills = dynamic(() => import('../components/Skills'), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Certifications = dynamic(() => import('../components/Certifications'), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Projects = dynamic(() => import('../components/Projects'), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Footer = dynamic(() => import('../components/Footer'));

export default function HomePage() {
  // Enable pull-to-top gesture for mobile
  usePullToTop();

  return (
    <>
      <PerformanceOptimizer />
      <Header />

      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section
          id="hero"
          className="flex min-h-screen items-center justify-center"
        >
          <Hero />
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <About />
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <ExperienceTimeline />
        </section>

        {/* Education Section */}
        <section id="education" className="py-20">
          <Education />
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <Skills />
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20">
          <Certifications />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <Projects />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  );
}
