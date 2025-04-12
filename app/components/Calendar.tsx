import { useState } from "react";
import axios from "axios";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  addDays, isToday, isSameDay, getDay, subDays 
} from "date-fns";
import { ko } from "date-fns/locale";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [data, setData] = useState<any>(null);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const fetchDateData = async (date: Date) => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/questionnaire/date`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        withCredentials: true,
        params: { date: formattedDate },
      });

      console.log("API 응답:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    fetchDateData(date);
  };

  const renderDays = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const startDayIndex = getDay(startDate);

    let days = [];

    const prevMonthEndDate = subDays(startDate, startDayIndex);
    for (let i = 0; i < startDayIndex; i++) {
      const prevDate = addDays(prevMonthEndDate, i);
      days.push(
        <div key={`prev-${i}`} className="w-12 h-10 flex items-center justify-center text-gray-400">
          {format(prevDate, "d")}
        </div>
      );
    }

    let day = startDate;
    while (day <= endDate) {
      const currentDay = new Date(day);
      const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
      const isCurrentDay = isToday(currentDay);
      const dayOfWeek = getDay(currentDay);

      const textColor =
        dayOfWeek === 0 ? "text-red-500" : dayOfWeek === 6 ? "text-blue-500" : "text-gray-600";

      days.push(
        <div key={day.toString()} className={`w-12 h-10 flex items-center justify-center ${textColor}`}>
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-md cursor-pointer text-sm
              ${isSelected ? "bg-purple-500 text-white" : ""}
              ${isCurrentDay && !isSelected ? "bg-blue-500 text-white" : ""}
              ${!isSelected && !isCurrentDay ? "hover:bg-gray-200" : ""}`}
            onClick={() => handleDateClick(currentDay)}
          >
            {format(currentDay, "d")}
          </div>
        </div>
      );

      day = addDays(day, 1);
    }

    return days;
  };

  return (
    <div className="w-[450px] h-[330px] absolute left-[1190px] top-[200px] bg-white rounded-[10px] flex">
      <div className="w-full h-96 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <button className="px-16" onClick={prevMonth}>&lt;</button>
          <h2 className="text-lg font-bold">{format(currentMonth, "yyyy년 MM월")}</h2>
          <button className="px-16" onClick={nextMonth}>&gt;</button>
        </div>

        <div className="grid grid-cols-7 gap-y-0.5 text-center border-b pb-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
            <div
              key={index}
              className={`w-12 flex justify-center font-medium ${
                day === "일" ? "text-red-500" : day === "토" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-0.5 text-center">
          {renderDays()}
        </div>

        {selectedDate && (
          <p className="mt-2 text-center font-semibold">
            {format(selectedDate, "yyyy년 MM월 dd일")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
