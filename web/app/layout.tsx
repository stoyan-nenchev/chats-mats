import '@/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col">
          <main className="flex flex-1 p-4">
            {children}
          </main>
      </body>
    </html>
  );
}
