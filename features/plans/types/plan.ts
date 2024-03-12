export type SetEvents =  React.Dispatch<React.SetStateAction<EventsProps[]>>;

export interface HolidayProps{
  localName: string,
  date: string,
}

export interface EventsProps {
  title: string,
  start: string,
  end: string
}
