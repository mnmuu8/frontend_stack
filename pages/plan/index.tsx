import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja';
import { EventClickArg } from '@fullcalendar/core';

import Layout from '@/components/layouts/Layout'
import FormDrawer from '@/components/ui-parts/FormDrawer';
import { EventsProps } from '@/features/plans/types/plan';
import { getHoliday } from '@/features/plans/functions/holiday';
import { initialPlanData } from '@/features/plans/constants/plan';

const Index: NextPage = () => {
  // TODO: 一旦仮データ挿入、予定作成のタイミングで改修
  const [events, setEvents] = useState<EventsProps[]>([
    {
      title: '午前中のミーティング',
      start: '2024-03-26T09:00',
      end: '2024-03-26T12:00',
      description: 'このミーティングではプロジェクトの進行状況を確認します。このミーティングではプロジェクトの進行状況を確認します。このミーティングではプロジェクトの進行状況を確認します。',
      skill: 'プログラミング'
    },
    {
      title: '午後の作業時間',
      start: '2024-03-26T13:00',
      end: '2024-03-26T17:00',
      description: 'このミーティングではプロジェクトの進行状況を確認します。このミーティングではプロジェクトの進行状況を確認します。このミーティングではプロジェクトの進行状況を確認します。',
      skill: '読書'
    }
  ]);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [planInfo, setPlanInfo] = useState<EventsProps>(initialPlanData)

  useEffect(() => {
    getHoliday(setEvents);
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const startTime = clickInfo.event.start && clickInfo.event.start.toLocaleString() || new Date().toLocaleString();
    const endTime = clickInfo.event.end && clickInfo.event.end.toLocaleString() || new Date().toLocaleString();

    setDrawerOpen(true)
    setPlanInfo({
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      skill: clickInfo.event.extendedProps.skill,
      start: startTime,
      end: endTime,
    })
  };

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
          eventClick={handleEventClick}
          eventBackgroundColor={'#FFFFFF'}
          eventBorderColor={'#acaba9'}
          eventTextColor={'#37362f'}
        />
      </div>
      <FormDrawer drawerOpen={drawerOpen} planInfo={planInfo} setDrawerOpen={setDrawerOpen} />
    </Layout>
  )
}

export default Index
