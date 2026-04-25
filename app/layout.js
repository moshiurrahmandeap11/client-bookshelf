import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import MetadataProvider from "./components/MetadataProvider/MetadataProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BookShelf",
  description: "Discover and read thousands of books online. Your ultimate digital library for reading, reviewing, and sharing books.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MetadataProvider>
          <AuthProvider>{children}</AuthProvider>
        </MetadataProvider>
      </body>
    </html>
  );
}