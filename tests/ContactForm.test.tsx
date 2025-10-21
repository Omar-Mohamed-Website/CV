import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import ContactForm from '../components/ContactForm';

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
    button: ({
      children,
      whileHover: _h,
      whileTap: _t,
      layoutId: _l,
      whileInView: _w,
      ...props
    }: any) => <button {...props}>{children}</button>,
    a: ({
      children,
      whileHover: _h,
      whileTap: _t,
      layoutId: _l,
      whileInView: _w,
      ...props
    }: any) => <a {...props}>{children}</a>,
  },
}));
/* eslint-enable @typescript-eslint/no-unused-vars, no-unused-vars */

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: vi.fn((name) => ({ name })),
    handleSubmit: vi.fn((fn) => (e: Event) => {
      e.preventDefault();
      fn({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      });
    }),
    formState: { errors: {} },
    reset: vi.fn(),
  }),
}));

global.fetch = vi.fn();

describe('ContactForm Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Thank you for your message!',
      }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the contact form with all required fields', () => {
    render(<ContactForm />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /unavailable/i })
    ).toBeInTheDocument();
  });

  it('renders contact information section', () => {
    render(<ContactForm />);

    expect(screen.getByText("Let's Start a Conversation")).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Response Time')).toBeInTheDocument();
  });

  it('includes honeypot field for spam protection', () => {
    render(<ContactForm />);

    const honeypotField = document.querySelector(
      'input[style*="display: none"]'
    );
    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField).toHaveAttribute('tabindex', '-1');
    expect(honeypotField).toHaveAttribute('autocomplete', 'off');
  });

  it('has proper form validation attributes', () => {
    render(<ContactForm />);

    const nameField = screen.getByLabelText(/name/i);
    const emailField = screen.getByLabelText(/email/i);
    const messageField = screen.getByLabelText(/message/i);

    expect(nameField).toHaveAttribute('type', 'text');
    expect(emailField).toHaveAttribute('type', 'email');
    expect(messageField.tagName.toLowerCase()).toBe('textarea');
  });

  it('shows overlay and disables form when temporarily unavailable', () => {
    render(<ContactForm />);

    expect(screen.getByText(/temporarily unavailable\./i)).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/message/i)).toBeDisabled();

    const submitButton = screen.getByRole('button', { name: /unavailable/i });
    expect(submitButton).toBeDisabled();
  });

  it('does not submit while locked', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { name: /unavailable/i });
    await user.click(submitButton);
    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  it('has accessible form labels and error messages', () => {
    render(<ContactForm />);

    const nameField = screen.getByLabelText(/name/i);
    const emailField = screen.getByLabelText(/email/i);
    const messageField = screen.getByLabelText(/message/i);

    expect(nameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(messageField).toBeInTheDocument();

    expect(screen.getByText(/name \*/i)).toBeInTheDocument();
    expect(screen.getByText(/email \*/i)).toBeInTheDocument();
    expect(screen.getByText(/message \*/i)).toBeInTheDocument();
  });

  it('includes social media links', () => {
    render(<ContactForm />);

    expect(screen.getByText('Connect on Social Media')).toBeInTheDocument();

    const linkedInLink = screen.getByLabelText('LinkedIn');
    const githubLink = screen.getByLabelText('GitHub');

    expect(linkedInLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  });

  it('marks inputs as disabled when unavailable', () => {
    render(<ContactForm />);

    const nameField = screen.getByLabelText(/name/i);
    const emailField = screen.getByLabelText(/email/i);
    const messageField = screen.getByLabelText(/message/i);

    expect(nameField).toBeDisabled();
    expect(emailField).toBeDisabled();
    expect(messageField).toBeDisabled();
  });
});
