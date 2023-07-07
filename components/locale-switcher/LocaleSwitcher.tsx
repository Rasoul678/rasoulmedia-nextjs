"use client";

import { usePathname } from "next/navigation";
import { i18n } from "@i18n-config";
import { useRouter } from "next/navigation";
import { useLocale } from "@hooks/useLocale";
import { LocaleToLangMapper } from "@utils";
import { useContext } from "react";
import { IntlContext } from "@components/intl-provider";

export const LocaleSwitcher = () => {
  const pathName = usePathname();
  const router = useRouter();
  const lang = useLocale();
  const intl = useContext(IntlContext);


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
    <div className="flex">
      <select
        defaultValue={lang}
        onChange={handleSelectChange}
        className="lang-select"
      >
        {i18n.locales.map((locale) => {
          return (
            <option className="lang-select-option" key={locale} value={locale}>
              {intl?.dict.lang[locale]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
