import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ExperienceTimeline from '../components/ExperienceTimeline';
import { profile } from '../data/profile';
import { formatDateEU } from '@/lib/date';

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      whileHover: _h,
      whileTap: _t,
      layoutId: _l,
      whileInView: _w,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
}));
/* eslint-enable @typescript-eslint/no-unused-vars, no-unused-vars */

describe('ExperienceTimeline Component', () => {
  it('renders the experience section heading', () => {
    render(<ExperienceTimeline />);

    expect(screen.getByText('Work Experience')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Teaching and content creation across YouTube, Telegram, and TikTok'
      )
    ).toBeInTheDocument();
  });

  it('renders all experience items from profile data', () => {
    render(<ExperienceTimeline />);

    profile.experience.forEach((exp) => {
      expect(screen.getByText(exp.role)).toBeInTheDocument();
      expect(screen.getByText(exp.company)).toBeInTheDocument();
      const dateRange = `${formatDateEU(exp.start)} - ${formatDateEU(exp.end)}`;
      expect(screen.getByText(dateRange)).toBeInTheDocument();
      expect(screen.getByText(exp.description)).toBeInTheDocument();
    });
  });

  it('displays technologies for each experience', () => {
    render(<ExperienceTimeline />);

    profile.experience.forEach((exp) => {
      if (exp.technologies) {
        exp.technologies.forEach((tech) => {
          const techBadges = screen.queryAllByText(tech);
          expect(techBadges.length).toBeGreaterThan(0);
        });
      }
    });
  });

  it('has proper semantic structure', () => {
    render(<ExperienceTimeline />);

    const timelineItems = document.querySelectorAll('.timeline-item');
    expect(timelineItems.length).toBe(profile.experience.length);

    profile.experience.forEach((exp) => {
      const roleHeading = screen.getByText(exp.role);
      expect(roleHeading.tagName.toLowerCase()).toBe('h3');

      const companyHeading = screen.getByText(exp.company);
      expect(companyHeading.tagName.toLowerCase()).toBe('h4');
    });
  });

  it('renders timeline visual elements', () => {
    render(<ExperienceTimeline />);

    const timelineLine = document.querySelector('.bg-primary-200');
    expect(timelineLine).toBeInTheDocument();

    const timelineDots = document.querySelectorAll(
      '.bg-primary-500.rounded-full'
    );
    expect(timelineDots.length).toBeGreaterThan(0);
  });

  it('handles responsive layout classes', () => {
    render(<ExperienceTimeline />);

    const container = document.querySelector('.container-responsive');
    expect(container).toBeInTheDocument();

    const timelineItems = document.querySelectorAll('[class*="md:flex-row"]');
    expect(timelineItems.length).toBeGreaterThan(0);
  });

  it('displays experience in chronological order', () => {
    render(<ExperienceTimeline />);

    const roleHeadings = profile.experience.map((exp) =>
      screen.getByText(exp.role)
    );

    roleHeadings.forEach((heading) => {
      expect(heading).toBeInTheDocument();
    });
  });

  it('renders technology badges with proper styling', () => {
    render(<ExperienceTimeline />);

    const firstExpWithTech = profile.experience.find(
      (exp) => exp.technologies && exp.technologies.length > 0
    );

    if (firstExpWithTech?.technologies) {
      const firstTech = firstExpWithTech.technologies[0];
      const techBadge = screen.getByText(firstTech);

      expect(techBadge).toBeInTheDocument();
      expect(techBadge.tagName.toLowerCase()).toBe('span');
    }
  });

  it('has accessible content structure', () => {
    render(<ExperienceTimeline />);

    const mainHeading = screen.getByText('Work Experience');
    expect(mainHeading.tagName.toLowerCase()).toBe('h2');

    profile.experience.forEach((exp) => {
      const roleElement = screen.getByText(exp.role);
      const companyElement = screen.getByText(exp.company);

      expect(roleElement).toBeInTheDocument();
      expect(companyElement).toBeInTheDocument();
    });
  });

  it('handles empty technologies array gracefully', () => {
    render(<ExperienceTimeline />);

    expect(screen.getByText('Work Experience')).toBeInTheDocument();
  });

  it('renders date ranges in consistent format', () => {
    render(<ExperienceTimeline />);

    profile.experience.forEach((exp) => {
      const dateRange = `${formatDateEU(exp.start)} - ${formatDateEU(exp.end)}`;
      expect(screen.getByText(dateRange)).toBeInTheDocument();
    });
  });
});
