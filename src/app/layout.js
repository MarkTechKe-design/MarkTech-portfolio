import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/PublicShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://marktech.ke"),
  title: "Oduor Mark — Systems Architect, Full-Stack Engineer & IT Specialist",
  description: "Official engineering portfolio of Oduor Mark (Mark Tech). Specializing in enterprise full-stack web applications, clinical healthcare informatics (MarkCare HMS), campus IT administration (JOOUST), and digital marketing operations (Powerstar Supermarkets).",
  keywords: [
    "Oduor Mark",
    "Mark Tech",
    "Software Engineer Kenya",
    "Systems Architect Kenya",
    "Healthcare Informatics",
    "MarkCare HMS Core",
    "EduFlow",
    "JOOUST ICT Technician",
    "Powerstar Supermarkets",
    "Next.js Developer",
    "Laravel Developer",
    "Siaya Polytechnic",
    "KMTC Nursing",
    "University of the People Computer Science"
  ],
  authors: [{ name: "Oduor Mark", url: "https://marktech.ke" }],
  openGraph: {
    title: "Oduor Mark — Systems Architect & IT Operations Lead",
    description: "Enterprise software engineering, clinical informatics, and mission-critical IT infrastructure.",
    url: "https://marktech.ke",
    siteName: "Mark Tech",
    images: [
      {
        url: "/photo/about.webp",
        width: 1200,
        height: 630,
        alt: "Oduor Mark - Systems Architect",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oduor Mark — Systems Architect & IT Operations Lead",
    description: "Enterprise software engineering, clinical informatics, and mission-critical IT infrastructure.",
    images: ["/photo/about.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="antialiased bg-[#080808] text-white selection:bg-[#ff6b1a] selection:text-black">
        <PublicShell>
          {children}
        </PublicShell>
      </body>
    </html>
  );
}