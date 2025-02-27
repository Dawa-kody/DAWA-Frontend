'use client';
import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '../styles/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  onDateSelect?: (date: string) => void; // 날짜 선택 시 호출될 함수 추가
}

// 서버 사이드 렌더링 방지
const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false });

const getTileClassName = ({ date }: { date: Date }) => {
  const day = date.getDay(); // 0: 일요일, 6: 토요일

  if (day === 0) return 'sunday'; // 일요일 (빨강)
  if (day === 6) return 'saturday'; // 토요일 (파랑)
  return '';
};

const Calendar = ({ onDateSelect }: CalendarProps) => {
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChangeCalendar = useCallback((value: Value) => {
    setCalendarValue(value);
  }, []);

  const handleDateClick = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date.toISOString().split('T')[0]); // 날짜를 'YYYY-MM-DD' 형식으로 전달
    }
    setCalendarValue(date); 

  if (!mounted) {
    return null;
  }
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
        tileClassName={getTileClassName}
        onClickDay={handleDateClick} // 날짜 클릭 시 handleDateClick 호출
      />
    </>
  );
};

export default Calendar;
