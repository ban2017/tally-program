export function formatCurrency(value) {
  const parsed = Number(value) || 0;
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 2,
  }).format(parsed);
}

export function formatDate(value) {
  if (!value) return 'N/A';
  try {
    return new Date(value).toLocaleDateString('en-GB');
  } catch {
    return value;
  }
}
