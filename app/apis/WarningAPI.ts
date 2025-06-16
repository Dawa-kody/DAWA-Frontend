// WarningAPI.ts
let lastRequestTime = 0;
const DEBOUNCE_DELAY = 3000;

export interface WarningItem {
  code: string;
  area: string;
  date: string;
  command: string;
  content: string;
  type: string;
}

const WARNING_TYPES = {
  HEAT: { code: '11', name: '폭염' },
  COLD: { code: '12', name: '한파' },
  WIND: { code: '15', name: '강풍' },
  TYPHOON: { code: '9', name: '태풍' },
  DUST: { code: '13', name: '황사' },
  WAVE: { code: '18', name: '풍랑' }
};

export async function getWeatherWarnings(): Promise<WarningItem[]> {
  const API_KEY = process.env.NEXT_PUBLIC_DAWA_WEATHER_API_KEY;
  const url = 'https://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnList';

  const now = new Date();
  const searchDate = now.toISOString().slice(0, 10).replace(/-/g, '');
  const searchHour = String(now.getHours()).padStart(2, '0');

  const params = {
    serviceKey: API_KEY,
    pageNo: '1',
    numOfRows: '100',
    dataType: 'JSON',
    stnId: '108',
    fromTmFc: `${searchDate}${searchHour}00`,
    toTmFc: `${searchDate}${searchHour}00`
  };

  const currentTime = Date.now();
  if (currentTime - lastRequestTime < DEBOUNCE_DELAY) {
    await new Promise(resolve => setTimeout(resolve, DEBOUNCE_DELAY - (currentTime - lastRequestTime)));
  }
  lastRequestTime = Date.now();

  try {
    const queryParams = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)] as [string, string])
    );

    const response = await fetch(`${url}?${queryParams.toString()}`);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();

    if (data.response.header.resultCode === '00' && data.response.body.items.item) {
      return data.response.body.items.item.map((item: any) => {
        const detectedType = Object.entries(WARNING_TYPES).find(
          ([_, { code }]) => code === item.wrnCd
        )?.[0] || 'ETC';

        return {
          code: item.wrnCd,
          area: item.area,
          date: item.tmFc,
          command: item.command,
          content: `${item.other} (${item.phenomena})`,
          type: detectedType
        };
      });
    }
    return [];
  } catch (error) {
    console.error('기상특보 조회 실패:', error);
    return [];
  }
}
