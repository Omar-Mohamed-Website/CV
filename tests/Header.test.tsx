import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Header from '../components/Header';

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, whileHover: _h, whileTap: _t, layoutId: _l, whileInView: _w, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, whileHover: _h, whileTap: _t, layoutId: _l, whileInView: _w, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, whileHover: _h, whileTap: _t, layoutId: _l, whileInView: _w, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}));
/* eslint-enable @typescript-eslint/no-unused-vars, no-unused-vars */

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(document, 'getElementById', {
  value: vi.fn().mockReturnValue({
    offsetTop: 100,
    getBoundingClientRect: () => ({
      top: 50,
      bottom: 150,
    }),
  }),
  writable: true,
});

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  it('renders the header with navigation items', () => {
    render(<Header />);

    expect(screen.getByText('Omar Mohamed')).toBeInTheDocument();

    const homeButtons = screen.getAllByText('Home');
    expect(homeButtons.length).toBeGreaterThan(0);

    const aboutButtons = screen.getAllByText('About');
    expect(aboutButtons.length).toBeGreaterThan(0);

    const educationButtons = screen.getAllByText('Education');
    expect(educationButtons.length).toBeGreaterThan(0);

    const skillsButtons = screen.getAllByText('Skills');
    expect(skillsButtons.length).toBeGreaterThan(0);

    const certificationsButtons = screen.getAllByText('Certifications');
    expect(certificationsButtons.length).toBeGreaterThan(0);

    const projectsButtons = screen.getAllByText('Projects');
    expect(projectsButtons.length).toBeGreaterThan(0);

    const contactButtons = screen.getAllByText('Contact');
    expect(contactButtons.length).toBeGreaterThan(0);
  });

  it('renders resume download component', () => {
    render(<Header />);

    const downloadButtons = screen.getAllByLabelText('Download CV as PDF');
    expect(downloadButtons.length).toBeGreaterThan(0);
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();

    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu');
    expect(mobileMenuButton).toBeInTheDocument();
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls scrollToSection when navigation items are clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const aboutButtons = screen.getAllByText('About');
    await user.click(aboutButtons[0]);

    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('handles mobile menu toggle', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu');

    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');

    await act(async () => {
      await user.click(mobileMenuButton);
    });
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');

    const closeButton = screen.getByLabelText('Close menu');
    await act(async () => {
      await user.click(closeButton);
    });

    await waitFor(() => {
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('applies scroll-based styling when scrolled', async () => {
    render(<Header />);

    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    });

    fireEvent.scroll(window);

    await waitFor(() => {
      const header = screen.getByRole('banner');
      expect(header.className).toContain('glass');
    });
  });

  it('updates active section based on scroll position', async () => {
    render(<Header />);

    vi.mocked(document.getElementById).mockReturnValue({
      offsetTop: 100,
      getBoundingClientRect: () => ({
        top: 50,
        bottom: 150,
      }),
    } as any);

    fireEvent.scroll(window);

    await waitFor(() => {
      const homeButtons = screen.getAllByText('Home');
      expect(homeButtons[0]).toHaveAttribute('aria-current', 'page');
    });
  });

  it('handles keyboard navigation properly', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(window.scrollTo).toHaveBeenCalled();
  });
});
