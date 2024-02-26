'use client'

export type ScreenSize = "S" | "M" | "L";
export const ScreenSize: { [k: string]: ScreenSize } = {
  S: "S",
  M: "M",
  L: "L",
};
export function getScreenSize(): ScreenSize {
  const w = window.innerWidth;
  if (w < 700) return "S";
  else return "L";
}

export function isMobile() {
  if (typeof window === "undefined") return false;
  const agent = navigator.userAgent;
  if (
    agent.match(
      /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
    ) != null ||
    agent.match(/LG|SAMSUNG|Samsung/) != null
  ) {
    return true;
  } else {
    return false;
  }
}

export function useResponsive() {
  return { getScreenSize, isMobile };
}