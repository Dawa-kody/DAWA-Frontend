import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { sidoName } = req.query;
    const apiKey = process.env.NEXT_PUBLIC_DAWA_WEATHER_API_KEY;

    const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${apiKey}&sidoName=${sidoName}&pageNo=1&numOfRows=100&dataTerm=DAILY&ver=1.3&returnType=JSON`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error: any) {
        console.error("API 라우트 오류:", error);
        res.status(500).json({ error: error.message || "API 호출 실패" });
    }
}
