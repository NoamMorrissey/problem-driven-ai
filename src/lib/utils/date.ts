/**
 * Format a date string or Date object to a human-readable format
 * @param date - ISO string or Date object
 * @returns Formatted date string (e.g., "Mar 6, 2026")
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return dateObj.toLocaleDateString("en-US", options);
}

/**
 * Format a date string or Date object to include time
 * @param date - ISO string or Date object
 * @returns Formatted date and time string (e.g., "Mar 6, 2026 at 2:30 PM")
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return dateObj.toLocaleDateString("en-US", options);
}
