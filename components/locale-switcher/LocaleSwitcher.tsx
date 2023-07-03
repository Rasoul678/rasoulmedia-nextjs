"use client";

import { usePathname } from "next/navigation";
import { i18n } from "@i18n-config";
import { useRouter } from "next/navigation";
import { useLocale } from "@hooks/useLocale";
import { Dictionaries } from "@utils/enums";

export const LocaleSwitcher = () => {
  const pathName = usePathname();
  const router = useRouter();
  const lang = useLocale();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleSelectChange = (e: SelectEvent) => {
    const path = redirectedPathName(e.target.value);
    router.push(path);
  };

  return (
    <div>
      <select onChange={handleSelectChange} className="lang-select">
        {i18n.locales.map((locale) => {
          return (
            <option
              selected={locale === lang}
              className="lang-select-option"
              key={locale}
              value={locale}
            >
              {Dictionaries[locale]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
