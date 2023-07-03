import "@styles/globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import TopLoader from "@components/top-loader";

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
        <TopLoader />
        <Navbar />
        <section>{children}</section>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
