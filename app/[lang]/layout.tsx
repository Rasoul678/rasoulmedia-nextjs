import "@styles/globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import TopLoader from "@components/top-loader";
import type { Locale } from "../../i18n-config";

export const metadata = {
  title: "Rasoul Media | Next.js",
  description: "My portfolio website",
};

interface IProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

const RootLayout: React.FC<IProps> = (props) => {
  const {
    children,
    params: { lang },
  } = props;

  return (
    <html lang={lang}>
      <body>
        <TopLoader />
        <Navbar lang={lang} />
        <section>{children}</section>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
