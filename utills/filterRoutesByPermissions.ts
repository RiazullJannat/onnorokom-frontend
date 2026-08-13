import { navigationRoute, NavRoute, TRole } from "@/constants/CRM_Navigation";

type TFilterRoutes = {
  routes: NavRoute[];
  role: string;
};

export const filterRoutesByRole = ({
  routes,
  role,
}: TFilterRoutes): NavRoute[] => {
  return routes
    .map((route) => {
      if (route.children?.length) {
        const children = filterRoutesByRole({
          routes: route.children,
          role,
        });

        if (children.length) {
          return {
            ...route,
            children,
          };
        }
      }

      if (!route.roles) return route;

      return route.roles.includes(role as TRole) ? route : null;
    })
    .filter(Boolean) as NavRoute[];
};


const flattenRoutes = (routes: NavRoute[]): NavRoute[] =>
  routes.flatMap((route) => [
    route,
    ...(route.children ? flattenRoutes(route.children) : []),
  ]);

export const isPathAllowedForRole = (pathname: string, role: TRole) => {
  const matchingRoutes = flattenRoutes(navigationRoute).filter(
    (route) =>
      !!route.path &&
      (pathname === route.path || pathname.startsWith(`${route.path}/`)),
  );

  if (!matchingRoutes.length) return true;

  // Most specific (longest) matching path wins, so a restricted parent
  // (e.g. "/dashboard") doesn't shadow an explicitly allowed child
  // (e.g. "/dashboard/courses").
  const mostSpecificRoute = matchingRoutes.sort(
    (a, b) => (b.path?.length ?? 0) - (a.path?.length ?? 0),
  )[0];

  if (!mostSpecificRoute.roles) return true;

  return mostSpecificRoute.roles.includes(role);
};