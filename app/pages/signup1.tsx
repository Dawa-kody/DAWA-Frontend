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

  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 여부
  const [isCodeVerified, setIsCodeVerified] = useState(false); // 인증번호 검증 성공 여부
  const [codeError, setCodeError] = useState(""); // 인증번호 오류 메시지

  const router = useRouter();

  // 인증번호 타이머 컴포넌트
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

  // 인증번호 요청
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

  // 인증번호 검증
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

  // 이메일, 비밀번호, 인증번호 입력 핸들러
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    SetEmailValue(e.target.value);
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

  // 다음 페이지(비밀번호 일치 확인)
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
          {/* 이메일 입력 */}
          <S.InputGroup>
            <S.EmailText>이메일</S.EmailText>
            <S.EmailInput
              value={EmailValue}
              placeholder="이메일 입력"
              type="text"
              onChange={handleEmailChange}
              required
            />
            <S.EmailTextE> @gsm.hs.kr </S.EmailTextE>
          </S.InputGroup>

          {/* 인증번호 입력/확인 */}
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
            {/* 에러 메시지를 입력창 바로 아래, 버튼 위에 표시 */}
            {codeError && (
              <S.ErrorMessage>{codeError}</S.ErrorMessage>
            )}
            {!isCodeSent ? (
              <S.EmailInputButton onClick={handleEmailSubmit}>  인증번호 요청</S.EmailInputButton>
            ) : !isCodeVerified ? (
              <S.EmailInputButton onClick={handleCodeVerify}>  인증번호 확인</S.EmailInputButton>
            ) : (
              <span style={{ color: "#6948ED", marginLeft: "-5px", marginTop:"20px" }}>인증 완료</span>
            )}
            {isCodeSent && !isCodeVerified && (
              <S.EmailSentInfo>
                <S.Text>
                  인증번호가 요청되었습니다. (유효시간: <AuthTimer key={timerKey} initialTime={180} />)
                </S.Text>
              </S.EmailSentInfo>
            )}
          </S.InputGroup>
          
          {/* 비밀번호 입력란은 항상 보이게 */}
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
              <S.IconWrapper onClick={() => setShowPasswordRe(!showPasswordRe)}>
                {showPasswordRe ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
              </S.IconWrapper>
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
