'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

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
    return null; // 서버에서 렌더링하지 않도록 처리
  }


  return (
    <div>
      <Calendar onChange={onChangeCalendar} 
      value={calendarValue} 
      locale="ko-KR" 
      formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })} 
      calendarType="gregory" 
      view="month"
      prev2Label={null}y
      next2Label={null} 
      showNeighboringMonth={false}
      />
    </div>
  );
};

export default CalendarSelect;


