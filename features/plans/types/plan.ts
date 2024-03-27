export type SetEvents =  React.Dispatch<React.SetStateAction<EventsProps[]>>;

export interface HolidayProps {
  localName: string,
  date: string,
}

export interface EventsProps {
  title: string,
  description: string,
  skill: string,
  start: string,
  end: string,
}

export type FormDrawerProps = {
  planInfo: EventsProps;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
