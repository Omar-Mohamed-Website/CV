import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  it('renders theme toggle and cycles through theme modes smartly', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggles = screen.getAllByTestId('theme-toggle');
    expect(toggles.length).toBeGreaterThan(0);

    const toggleButton = toggles[0];
    expect(toggleButton).toBeInTheDocument();

    expect(toggleButton).toHaveAttribute(
      'aria-label',
      'Current theme: Auto (system). Click to cycle themes.'
    );

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute(
      'aria-label',
      'Current theme: Dark mode. Click to cycle themes.'
    );

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute(
      'aria-label',
      'Current theme: Auto (system). Click to cycle themes.'
    );
  });
});
