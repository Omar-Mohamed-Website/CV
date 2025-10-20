import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  it('cycles smartly: auto -> opposite of system -> auto', () => {
    render(<ThemeToggle />);
    const btn = screen.getByTestId('theme-toggle');

    // Initial state: auto mode (system preference mocked to light)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click 1: auto -> dark (since system is light, skip light and go to dark)
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Click 2: dark -> auto (back to system preference)
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
