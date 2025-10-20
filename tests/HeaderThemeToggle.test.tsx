import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/Header';

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
vi.mock('framer-motion', () => ({
  motion: {
    header: ({
      children,
      whileHover: _h,
      whileTap: _t,
      layoutId: _l,
      whileInView: _w,
      ...props
    }: any) => <header {...props}>{children}</header>,
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
  },
}));
/* eslint-enable @typescript-eslint/no-unused-vars, no-unused-vars */

describe('Header Theme Toggle', () => {
  it('renders theme toggle and cycles through theme modes smartly', () => {
    render(<Header />);
    const toggles = screen.getAllByTestId('theme-toggle');
    expect(toggles.length).toBeGreaterThan(0);
    const toggle = toggles[0];

    // Initial state: auto mode (system preference mocked to light)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click 1: auto -> dark (since system is light, skip light and go to dark)
    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Click 2: dark -> auto (back to system default)
    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
