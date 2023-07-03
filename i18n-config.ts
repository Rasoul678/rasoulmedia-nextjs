export const i18n = {
  defaultLocale: "en",
  locales: ["nl", "fr", "fa", "es", "en", "hi"],
} as const;

export type Locale = typeof i18n["locales"][number];
