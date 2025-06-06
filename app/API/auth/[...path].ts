import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

interface ApiResponse {
  error?: string;
  details?: string;
  status?: number;
  data?: any;
}

interface ApiRequest {
  path: string;
  method: string;
  headers: Record<string, string>;
  body: any;
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '';
  
  try {
    // 요청 로깅
    console.log('API Request:', {
      path: `auth/${path}`,
      method: 'POST',
      headers: Object.fromEntries(request.headers.entries()),
      body: await request.json()
    });

    const response = await axios.post(`https://api.gsm-dawa.com/api/auth/${path}`, request.body, {
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(
          Array.from(request.headers.entries())
            .filter(([key]) => key !== 'content-length')
        ),
      },
    });

    // 응답 로깅
    console.log('API Response:', {
      path: `auth/${path}`,
      status: response.status,
      data: response.data
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('API Error:', {
      path: `auth/${path}`,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        error: 'Failed to proxy request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: error instanceof AxiosError ? error.response?.status || 500 : 500 }
    );
  }
}