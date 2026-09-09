export type ProductDiscoveryFilters<Format extends string = string, Direction extends string = string> = {
  format: Format | "all";
  healthDirections: Direction[];
};

export function filterProductDiscovery<
  Item extends { formatSlug: string; healthDirections: readonly string[] },
>(items: readonly Item[], filters: ProductDiscoveryFilters): Item[] {
  return items.filter((item) => {
    const matchesFormat = filters.format === "all" || item.formatSlug === filters.format;
    const matchesDirections = filters.healthDirections.length === 0 || filters.healthDirections.some((direction) =>
      item.healthDirections.includes(direction),
    );
    return matchesFormat && matchesDirections;
  });
}
