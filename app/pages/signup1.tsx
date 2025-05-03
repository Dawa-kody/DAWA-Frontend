import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as S from '../styles/signup1';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from "axios";

function Signup1() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRe, setShowPasswordRe] = useState(false);
  const [EmailValue, SetEmailValue] = useState("");
  const [codeValue, SetCodeValue] = useState("");
  const [PasswordValue, SetPasswordValue] = useState("");
  const [PasswordReValue, SetPasswordReValue] = useState("");
  const [timerKey, setTimerKey] = useState(0);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [emailError, setEmailError] = useState("");

  const router = useRouter();

  interface AuthTimerProps {
    initialTime?: number;
    onExpire?: () => void;
  }

  const AuthTimer: React.FC<AuthTimerProps> = ({ initialTime = 180, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
      if (timeLeft <= 0) {
        onExpire?.();
        return;
      }
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, [timeLeft, onExpire]);

    const formatTime = (seconds: number) => {
      const m = String(Math.floor(seconds / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      return `${m}:${s}`;
    };

    return <span>{formatTime(timeLeft)}</span>;
  };

  const handleEmailSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/email/send`,
        { email: `${EmailValue}@gsm.hs.kr` },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      setIsCodeSent(true);
      setIsCodeVerified(false);
      setTimerKey(prev => prev + 1);
      setCodeError("");
    } catch (error) {
      setCodeError("인증번호 요청에 실패했습니다.");
    }
  };

  const handleCodeVerify = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/email/verify`,
        { email: `${EmailValue}@gsm.hs.kr`, code: codeValue },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      setIsCodeVerified(true);
      setCodeError("");
    } catch (error) {
      setCodeError("인증번호가 올바르지 않습니다.");
    }
  };

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    SetEmailValue(value);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(value)) {
      setEmailError("이메일 형식으로 입력해주세요");
    } else {
      setEmailError("");
    }
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    SetPasswordValue(e.target.value);
  }
  function handlePasswordReChange(e: React.ChangeEvent<HTMLInputElement>) {
    SetPasswordReValue(e.target.value);
  }
  function handleChangeCode(e: React.ChangeEvent<HTMLInputElement>) {
    SetCodeValue(e.target.value);
  }

  function GoLogin() {
    router.push("/Login");
  }
  function Gotobefore() {
    router.back();
  }

  function GoNextPage() {
    if (PasswordValue !== PasswordReValue) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    localStorage.setItem("Email", `${EmailValue}@gsm.hs.kr`);
    localStorage.setItem("Password", PasswordValue);
    router.push("/Signupspecial");
  }

  return (
    <S.Container>
      <S.LeftSection>
        <S.HelloText>어서오세요!</S.HelloText>
        <S.SubText>이미 계정이 있다면?</S.SubText>
        <S.GoLogin onClick={GoLogin}>로그인하기</S.GoLogin>
        <S.Title>회원가입</S.Title>
        <S.Inputs>
          <S.InputGroup>
            <S.EmailText>이메일</S.EmailText>
            <S.EmailInput
              value={EmailValue}
              placeholder="이메일 입력"
              type="text"
              onChange={handleEmailChange}
              required
            />
            <S.EmailTextE>@gsm.hs.kr</S.EmailTextE>
          </S.InputGroup>

          <S.InputGroup>
            <S.EmailAcess>이메일 인증</S.EmailAcess>
            <S.FormEmailInput
              placeholder="인증 번호 입력"
              type="text"
              value={codeValue}
              onChange={handleChangeCode}
              required
              disabled={!isCodeSent || isCodeVerified}
            />
            {codeError && (
              <S.ErrorMessage>{codeError}</S.ErrorMessage>
            )}
            {!isCodeSent ? (
              <S.EmailInputButton onClick={handleEmailSubmit}>
                인증번호 요청
              </S.EmailInputButton>
            ) : !isCodeVerified ? (
              <S.EmailInputButton onClick={handleCodeVerify}>
                인증번호 확인
              </S.EmailInputButton>
            ) : (
              <span style={{ color: "#6948ED", marginLeft: "-5px", marginTop: "20px" }}>
                인증 완료
              </span>
            )}
            {isCodeSent && !isCodeVerified && (
              <S.EmailSentInfo>
                <S.Text>
                  인증번호가 요청되었습니다. (유효시간: <AuthTimer key={timerKey} initialTime={180} />)
                </S.Text>
              </S.EmailSentInfo>
            )}
          </S.InputGroup>

          <S.Password>
            <S.InputLabel>비밀번호</S.InputLabel>
            <S.PaaswordInput
              value={PasswordValue}
              placeholder="비밀번호 입력(문자,숫자,특수문자 포함 8~1자)"
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              required
            />
            <S.IconWrapper onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
            </S.IconWrapper>
            <S.InputGroup>
              <S.InputLabel>비밀번호 확인</S.InputLabel>
              <S.PaaswordCheckInput
                value={PasswordReValue}
                placeholder="비밀번호 확인"
                type={showPasswordRe ? "text" : "password"}
                onChange={handlePasswordReChange}
                required
              />
              <S.IconWrapper2 onClick={() => setShowPasswordRe(!showPasswordRe)}>
                {showPasswordRe ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
              </S.IconWrapper2>
            </S.InputGroup>
          </S.Password>

          <S.Pages>
            <S.Count1page />
            <S.Count2page />
          </S.Pages>

          <S.ButtonDiv>
            <S.NextButton
              isActive={EmailValue.trim() !== "" && isCodeVerified}
              onClick={GoNextPage}
            >
              다음
            </S.NextButton>
            <S.BeforeButton onClick={Gotobefore}>이전</S.BeforeButton>
          </S.ButtonDiv>
        </S.Inputs>
      </S.LeftSection>
      <S.RightSection>
        <S.GradientOverlay />
        <S.Img src={'/Sigin.svg'} />
      </S.RightSection>
    </S.Container>
  );
}

export default Signup1;
