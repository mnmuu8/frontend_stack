import dayjs from 'dayjs';

const DEFAULT_DATE_FORMAT = 'YYYY年MM月DD日';
export const formatDate = (targetDate: string, dateFormat: string = DEFAULT_DATE_FORMAT) => {
  const formattedDate = dayjs(targetDate).format(dateFormat);
  return formattedDate;
};