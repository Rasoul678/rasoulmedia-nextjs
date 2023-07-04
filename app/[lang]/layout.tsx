import "@styles/globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import TopLoader from "@components/top-loader";
import type { Locale } from "@i18n-config";
import ServerIntlProvider from "@components/intl-provider";
import { getDictionary } from "./dictionaries";
import { iranSans } from "@utils";

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

  const htmlClasses = `${iranSans.variable} font-iransans`;
  const htmlDir = lang === "fa" ? "rtl" : "ltr";

  return (
    <html lang={lang} className={htmlClasses} dir={htmlDir}>
      <body>
        <ServerIntlProvider dict={dict} lang={lang}>
          <TopLoader />
          <Navbar />
          <section>{children}</section>
          <Footer />
        </ServerIntlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
