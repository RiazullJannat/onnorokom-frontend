import {
  Activity,
  House,
  LucideIcon,
  PenSquare,
  Users,
} from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  roles?: TRole[];
  children?: NavRoute[];
  group?: string;
}

export type TRole = "Admin" | "Teacher" | "Student";

export const navigationRoute: NavRoute[] = [
  {
    title: "Home",
    icon: House,
    path: "/",
  },
  {
    title: "User Management",
    icon: Users,
    path: "/dashboard/admin/users",
    roles: ["Admin"],
  },
  {
    title: "Annotation",
    icon: PenSquare,
    path: "/dashboard/annotate",
    roles: ["Teacher"],
  },
  {
    title: "Activity Log",
    icon: Activity,
    path: "/dashboard/activity-log",
    roles: ["Admin"],
  },
];