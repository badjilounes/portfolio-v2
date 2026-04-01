import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lounes Badji - Portfolio',
  description: 'Lead Front-End Developer & Full Stack Engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
