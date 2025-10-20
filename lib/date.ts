export function formatDateEU(dateString: string): string {
  if (!dateString) return '';

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  }

  if (/^\d{4}-\d{2}$/.test(dateString)) {
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
  }

  if (/^\d{4}$/.test(dateString)) {
    return dateString;
  }

  return dateString;
}
