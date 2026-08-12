import {
  Book,
  BookOpen,
  House,
  LayoutDashboard,
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
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    roles: ["Admin"]
  },
  {
    title: "Courses",
    icon: Book,
    path: "/dashboard/courses",
    roles: ["Admin", "Teacher", "Student"],
  },
  {
    title: "Subjects",
    icon: BookOpen,
    path: "/dashboard/subjects",
    roles: ["Admin"],
  },
  {
    title: "Assignments",
    icon: Users,
    path: "/dashboard/assignments",
    roles: ["Admin", "Teacher", "Student"],
  },
  {
    title: "Annotation",
    icon: PenSquare,
    path: "/dashboard/annotate",
    roles: ["Teacher"],
  },
];