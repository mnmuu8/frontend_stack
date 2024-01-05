import Image from 'next/image';
import { ImageWrapperProps } from '@/common/types/utils';

const ImageWrapper = ({ src, alt, width, height, className }: ImageWrapperProps) => {
  return <Image src={src} alt={alt} width={width} height={height} className={className} />;
};

export default ImageWrapper;
