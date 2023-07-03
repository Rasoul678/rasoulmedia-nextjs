export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fa", "nl", "fr", "es", "hi"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
