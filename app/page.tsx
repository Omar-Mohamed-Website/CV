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

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content" className="bg-liquid relative">
        <section
          id="hero"
          className="flex min-h-screen items-center justify-center"
        >
          <Hero />
        </section>

        <section id="about" className="py-20">
          <About />
        </section>

        <section id="experience" className="py-20">
          <ExperienceTimeline />
        </section>

        <section id="education" className="py-20">
          <Education />
        </section>

        <section id="skills" className="py-20">
          <Skills />
        </section>

        <section id="certifications" className="py-20">
          <Certifications />
        </section>

        <section id="projects" className="py-20">
          <Projects />
        </section>

        <section id="contact" className="py-20">
          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  );
}
