const mapping: Record<string, string> = {
  companies: 'company',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
