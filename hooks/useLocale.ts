import { usePathname } from "next/navigation";

export const useLocale = () => {
  const pathName = usePathname();

  if (!pathName) return;
  const segments = pathName.split("/");
  return segments[1];
};
