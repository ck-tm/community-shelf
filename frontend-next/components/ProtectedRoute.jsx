"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else if (requireAdmin && !isAdmin) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, isAdmin, requireAdmin, router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-teal-700 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return children;
}
