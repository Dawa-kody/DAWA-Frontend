import axios from "axios";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

type SigninDTO = {
    email: string,
    password: string
}

export async function POST(request: Request) {
  const body: SigninDTO = await request.json();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/api/auth/signin`,
      body
    );

    const accessTokenExpired = new Date(`${response.data.accessTokenExpiredAt}`);
    const refreshTokenExpired = new Date(`${response.data.refreshTokenExpiredAt}`);

    const res = NextResponse.json({ message: "success" });

    res.cookies.set("accessToken", response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: accessTokenExpired,
      sameSite: "strict",
    });

    res.cookies.set("refreshToken", response.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: refreshTokenExpired,
      sameSite: "strict",
    });

    if(response.data.role) {
        res.cookies.set("Role", response.data.role, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
    }

    return res;
  } 
  
  catch (error) {
    const axiosError = error as AxiosError<{ reason: string }>;
    const status = axiosError.response?.status || 500;
    const message = axiosError.response?.data?.reason || "Signin failed";

    return NextResponse.json({ error: message }, { status });
  }
}
