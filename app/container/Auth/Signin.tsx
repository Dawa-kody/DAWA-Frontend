"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import * as S from "../../styles/login";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ICON } from "@/constants";
import { POST } from "@/api/auth/signin/route";
import { error } from "console";

const JWT_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24시간

export function Signin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [EmailValue, setEmailValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmailPrefix = (prefix: string) =>
    /^[a-zA-Z0-9._-]+$/.test(prefix);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    
    if (value === "" || validateEmailPrefix(value)) {
      setEmailError("");
    } 
    
    else {
      setEmailError("이메일 형식으로 입력해주세요");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    setPasswordError("");
  };

  const handleMissingpassword = () => {
    router.push("/Password");
  };

  const GoSignup = () => {
    router.push("/Signup");
  };

  const onSilentRefresh = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/reissue`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': '69420',
          },
          withCredentials: true,
        }
      );

      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    } 
    
    catch (error) {
      logout();
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/logout`,
        {},
        {
            headers: {
                'ngrok-skip-browser-warning': '69420',
            },
          withCredentials: true,
        }
      );
    } catch (e) {
      console.warn("Logout error:", e);
    }
    router.push("/Signin");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EmailValue || !validateEmailPrefix(EmailValue)) {
      setEmailError("영문, 숫자, ., -, _만 입력할 수 있습니다.");
      return;
    }
    setEmailError("");

    const fullEmail = `${EmailValue}@gsm.hs.kr`;

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: fullEmail,
          password: PasswordValue
        })
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data.error || "로그인 실패");
        return;
      }

      if (res.ok) {
        router.push("/");
      }
    }
    
    catch (error) {
      console.error("요청 실패:", error);
      setPasswordError("이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <S.Container>
      <S.LoginFormSection onSubmit={handleSubmit}>
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
                  style={{ borderColor: emailError ? "red" : undefined }}
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
                  style={
                    passwordError ? { borderColor: "red" } : undefined
                  }
                />
                <S.MissingpasswordText onClick={handleMissingpassword}>
                  비밀번호를 잊으셨나요?
                </S.MissingpasswordText>
                <S.IconWrapper
                  $showPassword={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={24} />
                  ) : (
                    <AiFillEye size={24} />
                  )}
                </S.IconWrapper>
              </S.PasswordInputWrapper>
              {passwordError && (
                <S.PasswordMessage>{passwordError}</S.PasswordMessage>
              )}
              <S.ButtonDiv>
                <S.NextButton type="submit" isActive={EmailValue.trim() !== ""}>
                  <S.NextButtonText isActive={EmailValue.trim() !== ""}>
                    완료
                  </S.NextButtonText>
                </S.NextButton>
              </S.ButtonDiv>
            </S.InputGroup>
          </S.Inputs>
        </S.LoginFormInnerWrapper>
      </S.LoginFormSection>

      <S.RightSection>
        <S.GradientOverlay />
        <S.Img src={`${ICON.SVG_ICON}/Sigin.svg`} />
      </S.RightSection>
    </S.Container>
  );
}
