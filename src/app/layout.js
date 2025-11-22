import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "Knotentials | Premium Wedding Planner",
  description: "Plan your perfect wedding with Knotentials.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="weddingTheme">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <NextTopLoader
          color="#002366"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #002366,0 0 5px #002366"
        />
        {children}
      </body>
    </html>
  );
}
