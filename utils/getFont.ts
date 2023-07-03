import localFont from "next/font/local";

export const iranSans = localFont({
  src: [
    {
      path: "../public/fonts/IranSans/ttf/IRANSansWeb.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/IranSans/ttf/IRANSansWeb_Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-iransans",
});
