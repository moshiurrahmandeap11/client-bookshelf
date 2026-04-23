import Footer from "../components/sharedComponents/Footer/Footer";
import Header from "../components/sharedComponents/Header/Header";

export default function UserViewLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header>
            <Header />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
        </body>
    </html>
  );
}
