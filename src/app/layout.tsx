import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import Chatbot from '@/components/shared/Chatbot';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { AppContextProvider } from '@/context/AppContext';
import { interTight } from '@/utils/font';
import { generateMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import './globals.css';

// Suppress hydration warnings for remaining animation libraries
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = function (...args: any[]) {
    const firstArg = args[0];
    const errorString = typeof firstArg === 'string' ? firstArg : String(firstArg);

    // Filter out expected hydration warnings from animation components
    if (
      errorString.includes('Hydration failed') ||
      errorString.includes('Warning: Did not expect server HTML to contain') ||
      errorString.includes('hydration') ||
      errorString.includes('Hydration')
    ) {
      // Log to console that hydration warning was suppressed (useful for debugging)
      // comment out the line below in production if you prefer silent suppression
      // originalError.call(console, '[Animation Library] Hydration warning suppressed');
      return;
    }
    originalError.apply(console, args as any);
  };
}

export const metadata: Metadata = {
  ...generateMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interTight.variable} antialiased`}>
        <AppContextProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Suspense>
              <SmoothScrollProvider>
                {children}
                <Chatbot />
              </SmoothScrollProvider>
            </Suspense>
          </ThemeProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
