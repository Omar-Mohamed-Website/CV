export function formatDateEU(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (/^present$/i.test(trimmed)) return 'Present';

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split('-').map((s) => parseInt(s, 10));
    const date = new Date(Date.UTC(y, m - 1, d));
    // Use en-GB for DD/MM/YYYY
    return new Intl.DateTimeFormat('en-GB').format(date);
  }

  // YYYY-MM -> MM/YYYY
  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    const [y, m] = trimmed.split('-');
    return `${m}/${y}`;
  }

  // YYYY -> YYYY (already EU-friendly)
  if (/^\d{4}$/.test(trimmed)) return trimmed;

  // Fallback: return as-is
  return trimmed;
}
