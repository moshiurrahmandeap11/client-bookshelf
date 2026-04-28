"use client";

import Footer from "../components/sharedComponents/Footer/Footer";
import Header from "../components/sharedComponents/Header/Header";
import Chatbot from "../components/userViewComponents/Chatbot/Chatbot";


export default function UserViewLayout({ children }) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header>
          <Header />
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
        

        <Chatbot />
      </body>
    </html>
  );
}