import axios from "axios";
import { SetEvents, HolidayProps } from "../types/plan";

export const getHoliday = (setEvents: SetEvents) => {
  axios.get('https://date.nager.at/Api/v2/PublicHolidays/2024/JP')
    .then(response => {
      const holidayEvents = response.data.map((holiday: HolidayProps) => ({
        title: holiday.localName,
        start: holiday.date,
        color: 'green',
        textColor: 'white',
      }));
      setEvents(prevEvents => [...prevEvents, ...holidayEvents]);
    })
    .catch(error => console.error('Fetching holidays failed', error));
}
