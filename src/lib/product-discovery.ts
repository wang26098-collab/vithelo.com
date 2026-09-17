export function selectFormatProducts<Item extends { formatSlug: string }>(
  items: readonly Item[],
  format: string,
): Item[] {
  return items.filter((item) => item.formatSlug === format);
}
