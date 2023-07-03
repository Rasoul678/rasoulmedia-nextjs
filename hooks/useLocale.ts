import { Locale } from "@i18n-config";
import { usePathname } from "next/navigation";

export const useLocale = (): Locale => {
  const pathName = usePathname();

  if (!pathName) return "en";
  const segments = pathName.split("/") as Locale[];
  return segments[1];
};
