import { FC } from "react";
import { Inter } from "next/font/google";
import './globals.css';
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-full")}>
        <div className="flex h-full">
          <main className="flex-1 p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
