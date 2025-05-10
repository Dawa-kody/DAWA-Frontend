import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import axios from "axios";
import * as S from "../styles/login";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [EmailValue, setEmailValue] = useState<string>("");
    const [PasswordValue, setPasswordValue] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    // 1. 앱이 로드될 때 refresh token이 있으면 자동 로그인 시도
    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            onSilentRefresh();
        }
    }, []);

    // 이메일 앞부분(영문, 숫자, -, _, .)만 허용
    function validateEmailPrefix(prefix: string): boolean {
        return /^[a-zA-Z0-9._-]+$/.test(prefix);
    }

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setEmailValue(value);
        if (value === "" || validateEmailPrefix(value)) {
            setEmailError("");
        } else {
            setEmailError("이메일 형식으로 입력해주세요");
        }
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPasswordValue(e.target.value);
        setPasswordError(""); // 입력시 에러 초기화
    }

    function handleMissingpassword() {
        router.push("/Password");
    }

    function GoSignup() {
        router.push("/Signup1");
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // 이메일 앞부분 검사
        if (!EmailValue || !validateEmailPrefix(EmailValue)) {
            setEmailError("영문, 숫자, ., -, _만 입력할 수 있습니다.");
            return;
        }
        setEmailError("");

        const fullEmail = `${EmailValue}@gsm.hs.kr`;
        const dto = {
            email: fullEmail,
            password: PasswordValue,
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/signin`,
                dto,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69240",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                const { accessToken, refreshToken, role } = response.data;

                localStorage.setItem("accessToken", accessToken);  //accessToken token 
                localStorage.setItem("refreshToken", refreshToken);  //refresh token
                localStorage.setItem("role", role);
                // accessToken 만료 시각도 저장
                localStorage.setItem("accessTokenExpiry", (Date.now() + JWT_EXPIRY_TIME).toString());

                // 자동 토큰 갱신 예약
                setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);

                router.push("/");
            }
        } catch (error) {
            setPasswordError("비밀번호가 틀렸습니다.");
        }
    };

    // 토큰 갱신
    const onSilentRefresh = async () => {
        const refreshToken = localStorage.getItem("refreshToken");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/reissue`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Refresh-Token": `Bearer ${refreshToken}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                const { accessToken, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
            }
        } catch (error) {
            logout();
        }
    };

    // 로그아웃 함수
    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        router.push("/Login");
    }

    return (
        <S.Container>
                <S.LoginFormSection>
                    <S.LoginFormInnerWrapper>

                        <S.TopTexts>
                          <S.HelloBlock>
                            <S.HelloText>반가워요!</S.HelloText>
                            <S.RowWrapper>
                                <S.SubText>다와가 처음이라면?</S.SubText>
                                <S.GoSignup onClick={GoSignup}>회원가입하기</S.GoSignup>
                            </S.RowWrapper>
                          </S.HelloBlock>
                          <S.Title>로그인</S.Title>
                        </S.TopTexts>

                        <S.Inputs>
                            <S.InputGroup>
                                <S.InputLabel>이메일</S.InputLabel>
                                <S.EmailInputWrapper>
                                    <S.EmailInput
                                        placeholder="이메일 입력"
                                        value={EmailValue}
                                        type="text"
                                        onChange={handleEmailChange}
                                        required
                                        style={{ borderColor: emailError ? 'red' : undefined }}
                                    />
                                    <S.EmailText>@gsm.hs.kr</S.EmailText>
                                </S.EmailInputWrapper>

                                {emailError && (
                                    <S.ErrorMessage>{emailError}</S.ErrorMessage>
                                )}
                            </S.InputGroup>


                            <S.InputGroup>
                                <S.InputLabel>비밀번호</S.InputLabel>
                                <S.PasswordInputWrapper>
                                    <S.PasswordInput
                                        placeholder="비밀번호"
                                        value={PasswordValue}
                                        type={showPassword ? "text" : "password"}
                                        onChange={handlePasswordChange}
                                        required
                                        style={passwordError ? { borderColor: 'red' } : {}}
                                    />
                                    <S.MissingpasswordText onClick={handleMissingpassword}>비밀번호를 잊으셨나요?</S.MissingpasswordText>
                                    <S.IconWrapper $showPassword={showPassword} onClick={() => setShowPassword(!showPassword)}>  {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}</S.IconWrapper>
                                </S.PasswordInputWrapper>

                                {passwordError && (
                                    <S.PasswordMessage>{passwordError}</S.PasswordMessage>
                                )}

                                <S.ButtonDiv>
                                    <S.NextButton onClick={handleSubmit} isActive={EmailValue.trim() !== ""}>
                                        <S.NextButtonText isActive={EmailValue.trim() !== ""}>완료</S.NextButtonText>
                                    </S.NextButton>
                                </S.ButtonDiv>
                            </S.InputGroup>

                        </S.Inputs>
                    </S.LoginFormInnerWrapper>
                </S.LoginFormSection>

                <S.RightSection>
                    <S.GradientOverlay />
                    <S.Img src={'/Sigin.svg'} />
                </S.RightSection>

        </S.Container>
    );
}

export default Login;
