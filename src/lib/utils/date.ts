export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
  }).format(date);
}

export function formatYear(year: number): string {
  return `${year}`;
}
