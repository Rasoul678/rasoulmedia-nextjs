import "server-only";
import type { Locale } from "@i18n-config";

const dictionaries = {
  en: () =>
    import("@assets/dictionaries/en/en.json").then((module) => module.default),
  nl: () =>
    import("@assets/dictionaries/nl/nl.json").then((module) => module.default),
  es: () =>
    import("@assets/dictionaries/es/es.json").then((module) => module.default),
  fr: () =>
    import("@assets/dictionaries/fr/fr.json").then((module) => module.default),
  fa: () =>
    import("@assets/dictionaries/fa/fa.json").then((module) => module.default),
  hi: () =>
    import("@assets/dictionaries/hi/hi.json").then((module) => module.default),
};

export type Dictionaries = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
