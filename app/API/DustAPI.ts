let lastRequestTime = 0;
const DEBOUNCE_DELAY = 2000;

export async function getDustData(sidoName: string): Promise<any> {
    const DUST_API_KEY = process.env.NEXT_PUBLIC_DAWA_WEATHER_API_KEY;
    const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';

    const params = {
        serviceKey: DUST_API_KEY,
        sidoName: sidoName,
        pageNo: '1',
        numOfRows: '100',
        dataTerm: 'DAILY',
        ver: '1.3',
        returnType: 'JSON'
    };

    const queryParams = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)]));
    const fullUrl = `${url}?${queryParams.toString()}`;

    async function fetchDataWithRetry(retries: number = 5, delay: number = 5000): Promise<any> {
        const currentTime = new Date().getTime();
        if (currentTime - lastRequestTime < DEBOUNCE_DELAY) {
            console.log("재시도 대기 중...");
            await new Promise(resolve => setTimeout(resolve, DEBOUNCE_DELAY));
            return fetchDataWithRetry(retries, delay); // 재시도
        }

        lastRequestTime = currentTime;

        try {
            const response = await fetch(fullUrl);

            if (!response.ok) {
                throw new Error(`HTTP 오류: ${response.status}`);
            }

            const data = await response.json();

            if (data?.response?.header?.resultCode === "00") {
                const items = data.response.body.items;
                if (items && items.length > 0) {
                    return items.map((item: any) => ({
                        stationName: item.stationName || "데이터 없음",
                        pm10: item.pm10Value || "데이터 없음",
                        pm25: item.pm25Value || "데이터 없음",
                        no2: item.no2 || "데이터 없음",
                        so2: item.so2 || "데이터 없음",
                        co: item.co || "데이터 없음",
                        o3: item.o3 || "데이터 없음",
                        dataTime: item.dataTime || "데이터 없음"
                    }));
                } else {
                    throw new Error("현재 데이터가 없습니다.");
                }
            } else if (data?.response?.header?.resultCode === "22") {
                if (retries > 0) {
                    console.warn('서비스 요청 제한 초과, 재시도 중...');
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return fetchDataWithRetry(retries - 1, delay);
                } else {
                    throw new Error('서비스 요청 제한 초과');
                }
            } else {
                throw new Error(data.response?.header?.resultMsg || '알 수 없는 오류');
            }
        } catch (error: any) {
            console.error("요청 실패:", error);
            if (retries > 0) {
              await new Promise(resolve => setTimeout(resolve, delay));
              return fetchDataWithRetry(retries - 1, delay * 2); //지연 시간 배가
            }
            throw error;
          }
    }

    return fetchDataWithRetry();
}

function getLatestAvailableBaseTime(): { baseDate: string; baseTime: string } {
    const now = new Date();
    now.setHours(now.getHours() + 9);

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 15) {
        hours -= 1;
    }

    if (hours < 0) {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        hours = 23;
    }

    const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = `${String(hours).padStart(2, '0')}00`;

    return { baseDate, baseTime };
}
