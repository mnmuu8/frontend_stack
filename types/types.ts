import { ReactNode } from "react"

export type LayoutProps = {
  children: ReactNode
}

export type ImageWrapperProps = {
  src: string
  alt: string
  width: number
  height: number
  className: string
}

export type sidebarMenus = {
  id: string;
  label: string;
  value: string;
}