import React, { useState, ChangeEvent, MouseEvent } from "react";
import axios from "axios";
import * as S from "../../styles/login";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const JWT_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24시간

export function Signin() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [EmailValue, setEmailValue] = useState<string>("");
    const [PasswordValue, setPasswordValue] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

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
        setPasswordError("");
    }

    function handleMissingpassword() {
        router.push("/Password");
    }

    function GoSignup() {
        router.push("/Signup1");
    }

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

    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        router.push("/Login");
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!EmailValue || !validateEmailPrefix(EmailValue)) {
            setEmailError("영문, 숫자, ., -, _만 입력할 수 있습니다.");
            return;
        }
        setEmailError("");

        const fullEmail = `${EmailValue}@gsm.hs.kr`;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/signin`,
                {
                    email: fullEmail,
                    password: PasswordValue,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            const { accessToken, refreshToken, role } = response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("role", role);
            localStorage.setItem("accessTokenExpiry", (Date.now() + JWT_EXPIRY_TIME).toString());

            setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);

            router.push("/");
        } catch (error) {
            console.error('Login error:', error);
            setPasswordError("이메일 또는 비밀번호를 확인해주세요.");
        }
    };

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
                            {emailError && <S.ErrorMessage>{emailError}</S.ErrorMessage>}
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
                                <S.IconWrapper $showPassword={showPassword} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                                </S.IconWrapper>
                            </S.PasswordInputWrapper>
                            {passwordError && <S.PasswordMessage>{passwordError}</S.PasswordMessage>}

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
