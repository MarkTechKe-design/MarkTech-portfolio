import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/PublicShell";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

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
  metadataBase: new URL("https://marktech-portfolio.vercel.app"),
  title: "Oduor Mark — Systems Architect, Full-Stack Engineer, IT Specialist & Digital Lead",
  description: "Official engineering portfolio and operational dossier of Oduor Mark (Mark Tech). Specializing in enterprise full-stack web platforms, clinical healthcare informatics (MarkCare HMS Core), campus IT infrastructure & administration, and e-commerce digital marketing management.",
  keywords: [
    "Oduor Mark",
    "Mark Tech",
    "Full-Stack Developer Kenya",
    "Software Engineer Kenya",
    "Next.js Developer Nairobi",
    "Laravel Full Stack Developer",
    "IT Technician Kenya",
    "Systems Administrator ICT JOOUST",
    "Social Media Manager Kenya",
    "E-commerce Digital Marketing Manager",
    "Developer Portfolio Samples",
    "Modern Web Architecture Portfolio",
    "Clinical Healthcare Informatics",
    "MarkCare HMS Core",
    "EduFlow Academic Suite",
    "PWA Developer Kenya",
    "Siaya National Polytechnic",
    "University of the People Computer Science"
  ],
  authors: [{ name: "Oduor Mark", url: "https://marktech-portfolio.vercel.app" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oduor Mark — Systems Architect & IT Operations Lead",
    description: "Enterprise software engineering, clinical informatics, and mission-critical IT infrastructure.",
    url: "https://marktech-portfolio.vercel.app",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://marktech-portfolio.vercel.app/#person",
      "name": "Oduor Mark",
      "alternateName": "Mark Tech",
      "url": "https://marktech-portfolio.vercel.app",
      "image": "https://marktech-portfolio.vercel.app/photo/about.webp",
      "jobTitle": [
        "Systems Architect",
        "Full-Stack Software Engineer",
        "IT Operations Lead",
        "Social Media & Digital Operations Manager"
      ],
      "knowsAbout": [
        "Web Application Development",
        "Next.js & React",
        "Laravel & PHP",
        "Enterprise IT Infrastructure",
        "Healthcare Informatics (EHR/HMS)",
        "Progressive Web Apps (PWA)",
        "E-Commerce Catalog & Social Media Management"
      ],
      "sameAs": [
        "https://github.com/MarkTechKe-design",
        "https://x.com/MarkTechKe"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://marktech-portfolio.vercel.app/#service",
      "name": "Mark Tech Systems Engineering & IT Services",
      "url": "https://marktech-portfolio.vercel.app",
      "provider": {
        "@id": "https://marktech-portfolio.vercel.app/#person"
      },
      "description": "Enterprise software engineering, IT administration, custom web platform development, and social media brand management.",
      "areaServed": "KE",
      "serviceType": [
        "Software Engineering",
        "Full-Stack Web Development",
        "IT Administration and Technical Support",
        "Digital Marketing and Social Media Management"
      ]
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#080808] text-white selection:bg-[#ff6b1a] selection:text-black">
        <PublicShell>
          {children}
        </PublicShell>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}