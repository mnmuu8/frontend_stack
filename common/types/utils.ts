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

export type FormSubmitButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
};
export type FormCancelButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
