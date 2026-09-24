"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function PublicShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isHome = pathname === "/";

  return (
    <>
      {children}
      {/* Render universal footer on all subpages (/about, /projects, /contact, etc.) */}
      {!isAdmin && !isHome && <Footer />}
    </>
  );
}