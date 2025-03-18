import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, addDays, isToday, isSameDay, getDay, subDays } from "date-fns";
import { ko } from "date-fns/locale";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // 📌 처음 상태에서 오늘 날짜 선택

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const renderDays = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const startDayIndex = getDay(startDate);
    const totalDays = endDate.getDate();
  
    let days = [];
  
    // 📌 전달 날짜 (이번 달 시작 요일 전에 표시)
    const prevMonthEndDate = subDays(startDate, startDayIndex);
    for (let i = 0; i < startDayIndex; i++) {
      const prevDate = addDays(prevMonthEndDate, i);
      days.push(
        <div key={`prev-${i}`} className="w-12 h-10 flex items-center justify-center text-gray-400">
          {format(prevDate, "d")}
        </div>
      );
    }
  
    // 📌 이번 달 날짜 추가
    let day = startDate;
    while (day <= endDate) {
      const isSelected = selectedDate && isSameDay(day, selectedDate);
      const isCurrentDay = isToday(day); // 📌 오늘 날짜 확인
      
      days.push(
        <div key={day.toString()} className="w-12 h-10 flex items-center justify-center">
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-md cursor-pointer text-sm
              ${isCurrentDay ? "bg-blue-500 text-white" : ""}
              ${isSelected ? "bg-purple-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setSelectedDate(day)}
          >
            {format(day, "d")}
          </div>
        </div>
      );
  
      day = addDays(day, 1);
    }
  
    return days;
  };  

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth}>&lt;</button>
        <h2 className="text-lg font-bold">{format(currentMonth, "yyyy년 MM월", { locale: ko })}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      
      {/* 📌 요일 부분을 flex로 감싸고 가운데 정렬 */}
      <div className="grid grid-cols-7 gap-y-0.5 text-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={index}
            className={`w-12 flex justify-center font-medium ${day === "일" ? "text-red-500" : day === "토" ? "text-blue-500" : "text-gray-600"}`}
          >
            {day}
          </div>
        ))}
        
        {/* 날짜들 출력 */}
        {renderDays()}
      </div>

      {selectedDate && (
        <p className="mt-2 text-center font-semibold">
          선택한 날짜: {format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })}
        </p>
      )}
    </div>
  );
};

export default Calendar;
