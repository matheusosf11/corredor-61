import type { ReactNode } from "react";

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
  external?: boolean;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export type CardNavProps = {
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function CardNav(props: CardNavProps): ReactNode;
