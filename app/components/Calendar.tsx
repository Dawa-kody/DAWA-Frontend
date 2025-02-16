'use client';
import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '../styles/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// 서버 사이드 렌더링 방지
const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false });

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
    <div>
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
      />
    </div>
  );
};

export default CalendarSelect;
