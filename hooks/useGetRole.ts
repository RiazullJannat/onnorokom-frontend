"use client";

import { useUser } from "@/provider/AuthProvider";

export const useGetRole = () => {
  const { user, isLoading } = useUser();

  return {
    role: user?.role || "",
    isLoading,
  };
};
