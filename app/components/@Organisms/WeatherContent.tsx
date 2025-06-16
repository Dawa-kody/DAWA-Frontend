import React, { useEffect, useState } from "react";
import { WeatherField } from "../@Molecules";
import { getWeatherData } from "@/apis/WeatherHsAPI";
import { getDustData } from "@/apis/DustAPI";
import { WarningItem, getWeatherWarnings } from '@/apis//WarningAPI';

export function WeatherContent() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [pm10, setPm10] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string | null>(null);
  const [activeWarnings, setActiveWarnings] = useState<WarningItem[]>([]);

  const warningStyles = {
    HEAT: { bg: 'bg-[#D23B3B]', text: '폭염주의보' },
    COLD: { bg: 'bg-[#3B82D2]', text: '한파주의보' },
    WIND: { bg: 'bg-[#5A5A5A]', text: '강풍주의보' },
    TYPHOON: { bg: 'bg-[#8B00FF]', text: '태풍주의보' },
    DUST: { bg: 'bg-[#D2A53B]', text: '황사주의보' },
    WAVE: { bg: 'bg-[#3BD2C5]', text: '풍랑주의보' },
    ETC: { bg: 'bg-[#808080]', text: '기상특보' }
  };

  const WARNING_MESSAGES = {
    HEAT: "열사병 조심하세요, 물을 많이 드세요!",
    COLD: "한파 대비로 보온에 신경쓰세요!",
    WIND: "비닐 등 날아갈 수 있는 물건 정리해주세요!",
    TYPHOON: "실외 활동을 자제해주세요!",
    DUST: "마스크 착용을 권장합니다!",
    WAVE: "해변가 접근을 자제해주세요!",
    ETC: "기상 특보 발효 중입니다. 주의해주세요!"
  };

  const dustColors = {
    좋음: 'text-blue-500',
    보통: 'text-emerald-500',
    나쁨: 'text-amber-500',
    '매우 나쁨': 'text-red-500'
  };

  const getDustGrade = (pm10: number | null): string => {
    if (pm10 === null) return "--";
    
    if (pm10 <= 30) return "좋음";
    if (pm10 <= 80) return "보통";
    if (pm10 <= 150) return "나쁨";
    return "매우 나쁨";
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nx = 54;
        const ny = 127;

        const [warningData, weatherData, dustData] = await Promise.all([
          getWeatherWarnings(),
          getWeatherData(nx, ny),
          getDustData('광주')
        ]);

        setActiveWarnings(warningData);

        if (warningData.length > 0) {
            const primaryWarning = warningData[0];
            const warningType = primaryWarning.type as keyof typeof WARNING_MESSAGES;
            
            setWarnings(
              `${warningStyles[warningType]?.text || primaryWarning.content.split('(')[0]}: ${
                primaryWarning.area
              } - ${WARNING_MESSAGES[warningType] || WARNING_MESSAGES.ETC}`
            );
          }

        if (warningData.length > 0) {
            console.log('기상특보 데이터 수신:', warningData);
          } else {
            console.log('주의보 없음: 현재 발효 중인 특보 없음');
          }

        if (weatherData && Array.isArray(weatherData)) {
          const temperatureData = weatherData.find((item: any) => item.category === "T1H");
          const humidityData = weatherData.find((item: any) => item.category === "REH");
          setTemperature(temperatureData?.obsrValue ? parseFloat(temperatureData.obsrValue) : null);
          setHumidity(humidityData?.obsrValue ? parseFloat(humidityData.obsrValue) : null);
        }

        if (dustData && dustData.length > 0) {
          setPm10(dustData[0].pm10 || null);
        }
      }
      
      catch (error) {
        console.error("데이터 요청 실패:", error);
      }
    };
    fetchData();
  }, []);

  return (
        <div className="w-[34vw] h-full rounded-[10px] bg-[#F9FAFB] text-black flex flex-col justify-between p-[2rem] ml-[1vw]">
            <div id="top" className="flex justify-between items-start">
                <div className="text-[2rem] font-bold font-[pretendard] mt-[-1rem]">
                    {temperature !== null ? `${temperature}°` : "--"}
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex flex-row gap-[1rem] flex-wrap max-w-[200px] justify-end">
                        {activeWarnings.length > 0 ? (
                            activeWarnings.slice(0, 3).map((warning, index) => (
                                <div 
                                    key={`${warning.code}-${index}`}
                                    className={`w-auto min-w-[5.875rem] h-[1.9375rem] px-2 rounded-[0.5rem] ${
                                        warningStyles[warning.type as keyof typeof warningStyles]?.bg || 
                                        warningStyles.ETC.bg
                                    } text-white flex items-center justify-center font-[pretendard] text-sm`}
                                >
                                    {warningStyles[warning.type as keyof typeof warningStyles]?.text || 
                                    warning.content.split('(')[0]}
                                </div>
                        ))
                            ) : (
                            <p className="text-[1.25rem] font-regualr font-[pretendard]">
                                {new Date().toLocaleDateString("ko-KR", {
                                    month: "long",
                                    day: "numeric",
                                    weekday: "short"
                                })}
                            </p>
                        )}
                    </div>

                <img
                    className="w-[7rem] h-[7rem] mt-[0.5rem]"
                    src="/WeatherSun.svg"
                    alt="날씨 아이콘"
                />
                </div>
            </div>

            <div id="middle" className="flex gap-[2rem] mt-[-2.25rem]">
                <WeatherField
                title="습도"
                svg="/Waterdrop.svg"
                percent={humidity !== null ? `${humidity}%` : "--"}
                />
                <WeatherField
                title="미세먼지"
                svg="/Dustdrop.svg"
                percent={
                    pm10 ? (
                        <span>
                            {pm10}㎍/m³
                                <span className={`ml-2 ${dustColors[getDustGrade(Number(pm10)) as keyof typeof dustColors]}`}>
                                {getDustGrade(Number(pm10))}
                            </span>
                        </span>
                    ) : "--"
                }
                />
            </div>

            <button
                id="bottom"
                className="w-[31.9375rem] h-[10rem] rounded-[0.5rem] bg-slategray text-left text-[1.25rem] px-[1rem] flex items-center gap-[1rem] mt-[1rem]"
            >
                <div className="w-full flex flex-row gap-[1rem] items-center">
                    <img src="/PlusMessage.svg" className="w-[1.6rem] h-[1.6rem]" />
                    <span className="text-[1.25rem] font-[pretendard]">
                        {warnings || "건강 항상 조심하세요"}
                    </span>
                </div>
            </button>
        </div>
  );
}
