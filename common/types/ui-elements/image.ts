import { StaticImageData } from 'next/image';

export type ImageWrapperProps = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  className?: string;
};
