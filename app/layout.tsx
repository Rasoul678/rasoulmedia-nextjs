import "./globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";

export const metadata = {
  title: "Rasoul Media | Next.js",
  description: "My portfolio website",
};

interface IProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
