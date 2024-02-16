import React, { FC } from 'react'
import { PostImageModalProps } from '../../types/editor'

const PostImageModal: FC<PostImageModalProps> = ({setModalOpen, setZoomed, zoomed, selectedImageUrl}) => {
  return (
    <div 
      className='flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black z-[9999]'
      onClick={() => setModalOpen(false)}
    >
      <img
        src={selectedImageUrl}
        onClick={() => setZoomed(!zoomed)}
        style={{ width: zoomed ? '50%' : '30%' }}
        className='post-img border h-auto cursor-zoom-in'
      />
    </div>
  )
}

export default PostImageModal
