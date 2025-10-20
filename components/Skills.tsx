'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { profile } from '../data/profile';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  const skillsByCategory = profile.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof profile.skills>
  );

  const categories = Object.keys(skillsByCategory);

  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="section-heading">Skills & Expertise</h2>
        <p className="section-subheading">
          Technical proficiencies across cybersecurity, development, and systems
          administration
        </p>
      </motion.div>

      <div className="skills-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: categoryIndex * 0.1 },
            }}
            onViewportEnter={() => setIsVisible(true)}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="mb-6 border-b border-neutral-100 pb-3 text-lg font-semibold text-neutral-900 dark:border-slate-700 dark:text-neutral-100">
              {category}
            </h3>

            <div className="space-y-4">
              {skillsByCategory[category].map((skill, skillIndex) => (
                <div key={skill.name} className="skill-item">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      {skill.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-300">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      animate={
                        isVisible ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1.5,
                        delay: categoryIndex * 0.1 + skillIndex * 0.1,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skills summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="card text-center">
            <div className="mb-2 text-2xl font-bold text-primary-600 dark:text-primary-100">
              {profile.skills.length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              Technical Skills
            </div>
          </div>

          <div className="card text-center">
            <div className="mb-2 text-2xl font-bold text-primary-600 dark:text-primary-100">
              {categories.length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              Skill Categories
            </div>
          </div>

          <div className="card text-center">
            <div className="mb-2 text-2xl font-bold text-primary-600 dark:text-primary-100">
              {Math.round(
                profile.skills.reduce((sum, skill) => sum + skill.level, 0) /
                  profile.skills.length
              )}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              Avg. Proficiency
            </div>
          </div>

          <div className="card text-center">
            <div className="mb-2 text-2xl font-bold text-primary-600 dark:text-primary-100">
              {profile.experience.length}+
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              Years Experience
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
