'use client';
import '../styles/Calendar.css';
import React, { useState, useCallback, useEffect } from 'react';
import Calendar from 'react-calendar';
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
      {/* 언어를 "ko-KR"로 설정하여 한국어 날짜 표기 강제 적용 */}
      <Calendar onChange={onChangeCalendar} value={calendarValue} locale="ko-KR" formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}/>
    </div>
  );
};

export default CalendarSelect;


