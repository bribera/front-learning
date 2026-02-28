"use client"; // Obligatoire pour utiliser usePathname

import { usePathname } from "next/navigation";
import Footer from "../components/landing/Footer";
import Navbar from "@/src/components/Navbar"

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Ajoutez ici les routes où vous voulez CACHER le Navbar et le Footer
  const excludedRoutes = ["/login", "/register", "/admin", "/meeting"];
  
  // Vérifie si la route actuelle est dans la liste des exclusions
  const showLayout = !excludedRoutes.includes(pathname);

  return (
    <>
      {showLayout && <Navbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {showLayout && <Footer />}
    </>
  );
}
