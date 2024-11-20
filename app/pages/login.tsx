import React, { useState } from "react";
import axios from "axios";
import * as S from "../styles/login"
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';;

function Login(){
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [EmailValue, SetEmailValue] = useState("");
    const [PasswordValue, SetPasswordValue] = useState("");

    const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

    function handleEmailChange(e : React.ChangeEvent<HTMLInputElement>){
        SetEmailValue(e.target.value);
    }

    function handlePasswordChange(e : React.ChangeEvent<HTMLInputElement>){
        SetPasswordValue(e.target.value);
    }

    function GoSignup(){
        router.push("/Signup1");
    }

    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        const dto = {
            email: EmailValue,
            password: PasswordValue,
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/signin`, dto, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                const { access, refresh } = response.data;

                localStorage.setItem("access_token", response.data);
                localStorage.setItem("refresh_token", response.data);

                setTimeout(() => onSilentRefresh(access), JWT_EXPIRY_TIME - 60000);
                router.push("/");
            }
        } catch (error) {
            console.log("로그인 실패:", error);
        }
    };

    // 토큰 갱신
    const onSilentRefresh = async (accessToken: string) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}`,
            { access_token: accessToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
    
          if (response.status === 200) {
            const { access, refresh } = response.data;
    
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
    
            setTimeout(() => onSilentRefresh(access), JWT_EXPIRY_TIME - 60000);
          }
        } catch (error: any) {
          console.error("Error while refreshing token:", error);
        }
      };

    return(
        <S.Container>
            <S.LeftSection>
                <S.HelloText>반가워요!</S.HelloText>
                <S.SubText>다와가 처음이라면?</S.SubText>
                <S.GoSignup onClick={GoSignup}>회원가입하기</S.GoSignup>

                <S.Title>로그인</S.Title>

                <S.Inputs>
                    <S.InputGroup>
                        <S.InputLabel>이메일</S.InputLabel>
                        <S.StyledInput
                            placeholder="이메일"
                            value={EmailValue}
                            type="email"
                            onChange={handleEmailChange}
                            required />
                    </S.InputGroup>

                    <S.InputGroup>
                        <S.InputLabel>비밀번호</S.InputLabel>
                        <S.StyledInput
                            placeholder="비밀번호"
                            value={PasswordValue}
                            type={showPassword ? "text" : "password"}
                            onChange={handlePasswordChange}
                            required />
                        <S.IconWrapper onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                            </S.IconWrapper>
                    </S.InputGroup>

                    <S.ButtonDiv>
                        <S.NextButton onClick={handleSubmit}>확인</S.NextButton>
                    </S.ButtonDiv>
                </S.Inputs>
            </S.LeftSection>

            <S.RightSection>
                <S.GradientOverlay />
                <S.Img src={"/mokoko.png"} />
            </S.RightSection>
        </S.Container>
    );
}

export default Login;