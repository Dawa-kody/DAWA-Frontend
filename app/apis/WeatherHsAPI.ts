let ongoingRequests = 0; // 현재 진행 중인 요청 수
const MAX_CONCURRENT_REQUESTS = 3; // 최대 동시 요청 수

export async function getWeatherData(nx: number, ny: number): Promise<any> {
    const WEATHER_API_KEY = process.env.NEXT_PUBLIC_DAWA_WEATHER_API_KEY;
    const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

    let { baseDate, baseTime } = getLatestAvailableBaseTime();

    async function fetchData(date: string, time: string): Promise<any> {
        // 동시 요청 수 제한
        while (ongoingRequests >= MAX_CONCURRENT_REQUESTS) {
            console.log("요청 제한: 대기 중...");
            await new Promise(resolve => setTimeout(resolve, 500)); // 잠시 대기
        }

        ongoingRequests++; // 요청 시작 시 카운터 증가

        try {
            const params = {
                serviceKey: WEATHER_API_KEY,
                pageNo: '1',
                numOfRows: '1000',
                dataType: 'JSON',
                base_date: date,
                base_time: time,
                nx: nx.toString(),
                ny: ny.toString()
            };

            const queryParams = new URLSearchParams();
            Object.keys(params).forEach(key => {
                const value = params[key as keyof typeof params];
                if (value) queryParams.append(key, value);
            });

            const fullUrl = `${url}?${queryParams.toString()}`;

            const response = await fetch(fullUrl);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();

            if (data.response.header.resultCode === "00") {
                return data.response.body.items.item;
            } else if (data.response.header.resultCode === "03") {
                const { baseDate: newDate, baseTime: newTime } = decreaseOneHour(date, time);
                return fetchData(newDate, newTime);
            } else {
                throw new Error(data.response.header.resultMsg);
            }
        } finally {
            ongoingRequests--; // 요청 완료 시 카운터 감소
        }
    }

    return fetchData(baseDate, baseTime);
}

// base_date, base_time을 1시간 감소시키는 함수
function decreaseOneHour(date: string, time: string): { baseDate: string; baseTime: string } {
    let year = Number(date.slice(0, 4));
    let month = Number(date.slice(4, 6));
    let day = Number(date.slice(6, 8));
    let hour = Number(time.slice(0, 2));

    hour -= 1;
    if (hour < 0) {
        hour = 23;
        const d = new Date(year, month - 1, day);
        d.setDate(d.getDate() - 1);
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
    }

    const baseDate = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
    const baseTime = `${String(hour).padStart(2, '0')}00`;

    return { baseDate, baseTime };
}

function getLatestAvailableBaseTime(): { baseDate: string; baseTime: string } {
    const now = new Date();
    now.setHours(now.getHours() + 9); // 한국 시간

    let baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    let hours = now.getHours() - 1;
    if (hours < 0) {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        baseDate = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
        hours = 23;
    }

    const baseTime = `${String(hours).padStart(2, '0')}00`;

    return { baseDate, baseTime };
}

export function convertToGrid(lat: number, lon: number): { nx: number; ny: number } {
    const RE = 6371.00877; // 지구 반경(km)
    const GRID = 5.0; // 격자 간격(km)
    const SLAT1 = 30.0; // 투영 위도1(degree)
    const SLAT2 = 60.0; // 투영 위도2(degree)
    const OLON = 126.0; // 기준점 경도(degree)
    const OLAT = 38.0; // 기준점 위도(degree)
    const XO = 43; // 기준점 X좌표(GRID)
    const YO = 136; // 기준점 Y좌표(GRID)

    const DEGRAD = Math.PI / 180.0;
    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);

    const ra = Math.tan(Math.PI * 0.25 + (lat) * DEGRAD * 0.5);
    const r = re * sf / Math.pow(ra, sn);
    let theta = lon * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    const nx = Math.floor(r * Math.sin(theta) + XO + 0.5);
    const ny = Math.floor(ro - r * Math.cos(theta) + YO + 0.5);

    return { nx, ny };
}
