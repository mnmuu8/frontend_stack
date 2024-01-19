import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';

export type ChildrenProps = {
  children: ReactNode;
};
export type LayoutProps = ChildrenProps;

export type ImageWrapperProps = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export type sidebarMenus = {
  id: string;
  label: string;
  value: string;
  icon: React.JSX.Element;
};
