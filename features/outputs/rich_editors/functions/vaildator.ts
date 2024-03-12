export const validateFileSize = (file: File, maxSize: number) => {
  if (file.size >= maxSize) {
    alert('10MB以上の画像は挿入できません');
    return false;
  }
  return true;
};

export const validateImageCount = (uploadedImagesCount: number, maxImages: number) => {
  if (uploadedImagesCount >= maxImages) {
    alert('4枚以上は挿入できません')
    return false;
  }
  return true;
};
