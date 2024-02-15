import React, { FC } from 'react'
import { PostImageModalProps } from '../../types/editor'

const PostImageModal: FC<PostImageModalProps> = ({setIsModalOpen, setIsZoomed, isZoomed, selectedImageUrl}) => {
  return (
    <div 
      className='flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black z-[9999]'
      onClick={() => setIsModalOpen(false)}
    >
      <img
        src={selectedImageUrl}
        onClick={() => setIsZoomed(!isZoomed)}
        style={{ width: isZoomed ? '50%' : '30%' }}
        className='post-img border h-auto cursor-zoom-in'
      />
    </div>
  )
}

export default PostImageModal
