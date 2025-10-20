'use client';

import React from 'react';

import About from '../components/About';
import Certifications from '../components/Certifications';
import ContactForm from '../components/ContactForm';
import Education from '../components/Education';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import { usePullToTop } from '../hooks/useTouchGestures';

export default function HomePage() {
  // Enable pull-to-top gesture for mobile
  usePullToTop();

  return (
    <>
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
