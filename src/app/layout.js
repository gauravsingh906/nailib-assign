// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Script from "next/script";

// Load fonts with display: swap for better performance
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Enhanced metadata for better SEO
export const metadata = {
  metadataBase: new URL("https://www.nailib.com"), // Replace with your actual domain
  title: {
    default: "NailIB | IB Exam Preparation Tools & Resources",
    template: "%s | NailIB",
  },
  description: "Premium IB exam preparation tools, resources, and study materials built by top IB graduates to help students excel in their International Baccalaureate exams.",
  keywords: ["IB", "International Baccalaureate", "IB exam prep", "IB resources", "IB study guide", "IB past papers"],
  authors: [{ name: "NailIB Education Technologies" }],
  creator: "NailIB Education Technologies",
  publisher: "NailIB Education Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nailib.com",
    siteName: "NailIB",
    title: "NailIB | IB Exam Preparation Tools & Resources",
    description: "Premium IB exam preparation tools, resources, and study materials built by top IB graduates.",
    images: [
      {
        url: "/images/og-image.jpg", // Create and add this image to your public folder
        width: 1200,
        height: 630,
        alt: "NailIB - IB Exam Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NailIB | IB Exam Preparation Tools & Resources",
    description: "Premium IB exam preparation tools, resources, and study materials built by top IB graduates.",
    images: ["/images/twitter-image.jpg"], // Create and add this image to your public folder
    creator: "@nailib",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" href="https://cdn.nailib.com/_next/static/media/logo-small.5691114d.svg?w=256&q=75" sizes="any" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-[IntegralCF] min-h-screen flex flex-col">
        {/* Structured data for better search results */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "NailIB",
              "url": "https://www.nailib.com",
              "logo": "https://cdn.nailib.com/_next/static/media/logo-small.5691114d.svg?w=256&q=75",
              "description": "Premium IB exam preparation tools, resources, and study materials."
            })
          }}
        />
        
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
        {/* Add analytics */}
   
      </body>
    </html>
  );
}