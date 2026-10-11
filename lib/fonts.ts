import { Archivo, JetBrains_Mono, Readex_Pro } from "next/font/google";

/** Latin display + body. The width axis gives the condensed poster voice for headlines. */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Arabic UI face. Only preloaded on Arabic routes (see layout). */
export const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-readex",
  display: "swap",
  preload: false,
});
