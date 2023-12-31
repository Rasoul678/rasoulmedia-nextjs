import "@styles/globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import TopLoader from "@components/top-loader";
import type { Locale } from "@i18n-config";
import ServerIntlProvider from "@components/intl-provider";
import { getDictionary } from "./dictionaries";
import { iranSans } from "@utils";
import SessionProvider from "@components/provider/Provider";
import RQProvider from "@utils/react-query/provider";
import type { Session } from "next-auth";

export const metadata = {
  title: "Rasoul Media | Next.js",
  description: "My portfolio website",
};

interface IProps {
  children: React.ReactNode;
  params: { lang: Locale };
  session: Session | null;
}

const RootLayout: React.FC<IProps> = async (props) => {
  const {
    children,
    params: { lang },
    session,
  } = props;

  const dict = await getDictionary(lang);

  const htmlClasses = `${iranSans.variable} font-iransans`;
  const htmlDir = lang === "fa" ? "rtl" : "ltr";

  return (
    <html lang={lang} className={htmlClasses} dir={htmlDir}>
      <body>
        <RQProvider>
          <SessionProvider session={session}>
            <ServerIntlProvider dict={dict} lang={lang}>
              <TopLoader />
              <Navbar />
              <div className="main">
                <div className="gradient" />
              </div>
              <main>{children}</main>
              <Footer />
            </ServerIntlProvider>
          </SessionProvider>
        </RQProvider>
      </body>
    </html>
  );
};

export default RootLayout;
