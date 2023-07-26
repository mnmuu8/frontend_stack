import dayjs from 'dayjs';

export const formatDate = (dateString: string) => {
  const formattedDate = dayjs(dateString).format('YYYY年MM月DD日');
  return formattedDate;
};