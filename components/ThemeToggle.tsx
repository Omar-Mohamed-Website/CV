'use client';

import React, { useEffect, useState } from 'react';

type ThemeMode = 'auto' | 'light' | 'dark';

const THEME_KEY = 'theme-mode';

function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  const t = window.localStorage.getItem(THEME_KEY);
  return t === 'auto' || t === 'light' || t === 'dark' ? t : null;
}

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(mode: ThemeMode) {
  const isDark = mode === 'dark' || (mode === 'auto' && getSystemPrefersDark());
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export default function ThemeToggle() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize theme - always start with auto (system default)
    const stored = getStoredTheme();
    const initial: ThemeMode = stored ?? 'auto';
    setThemeMode(initial);
    applyTheme(initial);
    setMounted(true);

    // Listen for system theme changes when in auto mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (getStoredTheme() === 'auto') {
        applyTheme('auto');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const cycleTheme = () => {
    const systemPrefersDark = getSystemPrefersDark();

    // Smart cycling logic:
    // If system is light: auto → dark → auto (skip light since it's same as auto)
    // If system is dark: auto → light → auto (skip dark since it's same as auto)
    let next: ThemeMode;

    if (themeMode === 'auto') {
      // From auto, go to the opposite of system preference
      next = systemPrefersDark ? 'light' : 'dark';
    } else {
      // From explicit theme, go back to auto
      next = 'auto';
    }

    setThemeMode(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      // ignore storage errors (private mode, etc.)
    }
  };

  // Determine current effective theme for icon display
  const effectiveIsDark = mounted
    ? themeMode === 'dark' || (themeMode === 'auto' && getSystemPrefersDark())
    : false;

  const getIcon = () => {
    if (themeMode === 'auto') {
      // Auto icon (computer/monitor)
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (themeMode === 'light' || !effectiveIsDark) {
      // Sun icon
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 15a5 5 0 100-10 5 5 0 000 10zM10 1a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm9-6a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm11.657-6.657a1 1 0 010 1.414L15.95 5.464a1 1 0 01-1.414-1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM6.464 15.95a1 1 0 01-1.414 0l-.707-.707A1 1 0 015.757 13.83l.707.707a1 1 0 010 1.414zm10.193 0a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM5.757 5.464A1 1 0 014.343 4.05l.707-.707A1 1 0 016.464 4.757l-.707.707z" />
        </svg>
      );
    } else {
      // Moon icon
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      );
    }
  };

  const getLabel = () => {
    if (themeMode === 'auto') return 'Auto (system)';
    if (themeMode === 'light') return 'Light mode';
    return 'Dark mode';
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Current theme: ${getLabel()}. Click to cycle themes.`}
      className="inline-flex items-center justify-center rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-primary-100 dark:focus:ring-offset-neutral-900"
      data-testid="theme-toggle"
      title={getLabel()}
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </button>
  );
}
