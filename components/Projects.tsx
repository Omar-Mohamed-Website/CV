'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { profile } from '../data/profile';
import SocialIcon from './SocialIcon';

const Projects = () => {
  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="section-heading">Featured Projects</h2>
        <p className="section-subheading">
          Educational content and community projects focused on learning English
        </p>
      </motion.div>

      <div className="projects-grid grid gap-8 md:grid-cols-2">
        {profile.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="card flex h-full flex-col overflow-hidden"
            >
              {/* Project image */}
              {project.image && (
                <div className="relative -m-6 mb-6 h-52 overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}

              <div className="flex flex-1 flex-col">
                {/* Project title */}
                <h3 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {project.name}
                </h3>

                {/* Project description */}
                <p className="mb-4 flex-1 leading-relaxed text-neutral-700 dark:text-neutral-200">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project links */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-slate-700">
                  <div className="flex space-x-4">
                    {project.repo && (
                      <motion.a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm rounded-md font-medium text-neutral-600 transition-colors duration-200 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-neutral-200 dark:hover:text-primary-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <SocialIcon name="github" className="h-4 w-4" />
                        <span>Code</span>
                      </motion.a>
                    )}

                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm rounded-md font-medium text-primary-600 transition-colors duration-200 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-primary-100 dark:hover:text-primary-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>

                  {/* Project status indicator */}
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-neutral-600 dark:text-neutral-300">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* View more projects link */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <motion.a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SocialIcon name="github" className="h-4 w-4" />
          <span>View More Projects on GitHub</span>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Projects;
