import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Layout from '@/components/layouts/Layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja';
import { EventsProps } from '@/features/plan/types/plan';
import { getHoliday } from '@/features/plan/functions/holiday';

const Index: NextPage = () => {
  // TODO: 一旦仮データ挿入、予定作成のタイミングで改修
  const [events, setEvents] = useState<EventsProps[]>([
    { title: '午前中のミーティング', start: '2024-03-11T09:00:00', end: '2024-03-11T12:00:00' },
    { title: '午後の作業時間', start: '2024-03-11T13:00:00', end: '2024-03-11T17:00:00' }
  ]);

  useEffect(() => {
    getHoliday(setEvents);
  }, []);

  return (
    <Layout>
      <div className='Container'>
        <FullCalendar
          locale='ja'
          locales={[jaLocale]}
          slotDuration="00:15:00"
          initialView="timeGridWeek"
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          editable={true}
          weekends={true}
          selectable={true}
          nowIndicator={true}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '00:00',
            endTime: '24:00'
          }} 
          headerToolbar={{
            left: 'today prev,next',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth listWeek',
          }}
          events={events}
          eventBackgroundColor={'#FFFFFF'}
          eventBorderColor={'#acaba9'}
          eventTextColor={'#37362f'}
        />
      </div>
    </Layout>
  )
}

export default Index
