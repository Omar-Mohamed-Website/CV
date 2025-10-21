import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  it('cycles smartly: auto -> opposite of system -> auto', () => {
    render(<ThemeToggle />);
    const btn = screen.getByTestId('theme-toggle');

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
