import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { siteConfig } from "@/constants/site";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const dynamicMetadata: Metadata = {};
  if (params["valid-id"]) {
    // get profile
    dynamicMetadata.title = `user ${params["valid-id"]}| ${siteConfig.title}`;
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: dynamicMetadata.title || siteConfig.title,
    description: siteConfig.description,
    robots: { index: true, follow: true },
    // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
    // ! copy to /favicon folder
    icons: {
      icon: "/favicon/favicon.ico",
      shortcut: "/favicon/favicon-16x16.png",
      apple: "/favicon/apple-touch-icon.png",
    },
    manifest: `/favicon/site.webmanifest`,
    openGraph: {
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.title,
      images: [`${siteConfig.url}/images/og.jpg`],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${siteConfig.url}/images/og.jpg`],
      // creator: '@th_clarence',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
