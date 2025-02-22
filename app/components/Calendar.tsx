'use client';
import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '../styles/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// 서버 사이드 렌더링 방지
const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false });

const getTileClassName = ({ date }: { date: Date }) => {
  const day = date.getDay(); // 0: 일요일, 6: 토요일

  if (day === 0) return 'sunday'; // 일요일 (빨강)
  if (day === 6) return 'saturday'; // 토요일 (파랑)
  return '';
};

const CalendarSelect = () => {
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChangeCalendar = useCallback((value: Value) => {
    setCalendarValue(value);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
    <DynamicCalendar
    onChange={onChangeCalendar}
    value={calendarValue}
    locale="ko-KR"
    calendarType="gregory"
    view="month"
    prev2Label={null}
    next2Label={null}
    showNeighboringMonth={false}
    formatMonthYear={(locale, date) =>
      new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(date)
    }
    formatDay={(locale, date) => date.getDate().toString()}
    tileClassName={getTileClassName} // 클래스 추
    />
    </>
  );
};

export default CalendarSelect;
