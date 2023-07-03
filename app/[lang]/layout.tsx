import "@styles/globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import TopLoader from "@components/top-loader";
import type { Locale } from "@i18n-config";
import ServerIntlProvider from "@components/intl-provider/ServerIntlProvider";
import { Dictionaries, getDictionary } from "./dictionaries";

export const metadata = {
  title: "Rasoul Media | Next.js",
  description: "My portfolio website",
};

interface IProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

const RootLayout: React.FC<IProps> = async (props) => {
  const {
    children,
    params: { lang },
  } = props;

  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <ServerIntlProvider dict={dict}>
          <TopLoader />
          <Navbar lang={lang} />
          <section>{children}</section>
          <Footer />
        </ServerIntlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
