'use client'
import React from 'react';
import ReduxProvider from "./components/ReduxProvider";
import "./styles/globals.css";
import {Inter} from 'next/font/google'
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "GH Academy",
  description: "GH Academy is a Learning Management platform for students to level-up their careers!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{
        scrollBehavior: "smooth",
      }}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
