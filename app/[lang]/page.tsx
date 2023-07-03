import { getDictionary } from "./dictionaries";
import type { Locale } from "@i18n-config";

interface IProps {
  params: { lang: Locale };
}

const Home: React.FC<IProps> = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-4xl">Rasoul Media with Next.js</div>
      <div>{dict.me}</div>
    </main>
  );
};

export default Home;
