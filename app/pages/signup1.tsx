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
    router.push("/signup2");
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
                <div id="container" className=" w-full h-full overflow-hidden flex m-0">
                
                  <div id="leftSection" className="w-[100vw] bg-white overflow-hidden relative flex flex-1 flex-col z-[1]">
                    
                    <div id="topText" className="pl-[5vw] pt-[4vh] flex flex-col z-[10]">
                      <span id="helloText" className="font-[700] font-[pretendard] text-[2rem] text-black">어서오세요!</span>
                      <div id="firstContainer" className="flex flex-row gap-[0.2rem]">
                        <span id="subText" className=" text-[0.9rem] font-[300] font-[pretendard] text-black">이미 계정이 있다면?</span>
                        <span id="goLogin" onClick={GoLogin} className=" text-[0.9rem] font-[300] font-[pretendard] text-primaryPurple cursor-pointer">로그인하기</span>
                      </div>
                    </div>
                    <span id="title" className="mt-[5vh] ml-[5vw] font-[700] font-[pretendard] text-[2rem] text-black">회원가입</span>
                    
                    {/*회원가입 정보 입력*/}
                    <div id="inputContainer" className=" mt-[2vh] w-full flex flex-col justify-center items-center gap-4">
                      
                      {/*이메일 입력*/}
                      <div id="emailInputDiv" className="flex flex-col gap-2 w-[30vw]">
                        <span id="emailText" className="text-black text-[0.8rem] font-[500] font-[pretendard]">이메일</span>
                        <input id="emailInput" placeholder="@gsm.hs.kr" onChange={handleEmailChange} required className="w-[30em] h-[2.5rem] rounded-[8px] p-[1rem] inline-flex border-none outline-none bg-[#F2F4F7] text-black"/>
                      </div>

                      {/*이메일 인증*/}
                      <div id="emailAccept" className="flex flex-col gap-2 w-[30vw]">
                        <span id="emailAcceptText" className="text-black text-[0.8rem] font-[500] font-[pretendard]">이메일 인증</span>
                        <div className="flex flex-row w-full">
                          <input id="emailAcceptInput" placeholder="인증번호 입력" onChange={handleChangeCode} required className="w-[25rem] h-[2.5rem] rounded-l-[8px] rounded-r-none p-[1rem] border-none outline-none bg-[#F2F4F7] text-black"/>
                          <button onClick={handleEmailSubmit} className="w-[7rem] h-[2.5rem] rounded-r-[8px] rounded-l-none p-[1rem] border-none outline-none bg-primaryPurple text-white whitespace-nowrap flex items-center justify-center">인증번호 받기</button>
                        </div>
                      </div>

                      {/*비밀번호 입력, 확인란*/}
                      <div id="password" className="flex flex-col w-[30vw] gap-4">
                        <span id="passwordText" className="text-black text-[0.8rem] font-[500] font-[pretendard]">비밀번호</span>
                        <input id="passwordInput" placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~10자)" required className="w-[30em] h-[2.5rem] rounded-[8px] p-[1rem] inline-flex border-none outline-none bg-[#F2F4F7] text-black"/>
                        <input id="passwordCheck" placeholder="비밀번호 확인" required className="w-[30em] h-[2.5rem] rounded-[8px] p-[1rem] inline-flex border-none outline-none bg-[#F2F4F7] text-black"/>
                      </div>

                      {/*signup1, 2 구분분*/}
                      <div id="pageNumber" className="mt-8 flex flex-row gap-[0.5rem]">
                        <div className="w-[1rem] h-[1rem] rounded-full bg-primaryPurple" />
                        <div className="w-[1rem] h-[1rem] rounded-full bg-[#D9D6FE]" />
                      </div>

                      {/*이전 & 다음 버튼*/}
                      <div id="nextButton" className="mt-8 flex flex-row w-[30vw] justify-between">
                        <button className="w-[4vw] h-[2rem] rounded-[10px] justify-center items-center bg-[#E4E7EC] text-[#98A2B3] font-[700] font-[pretendard] text-[1rem]">이전</button>
                        <button onClick={GoNextPage} className="w-[4vw] h-[2rem] rounded-[10px] justify-center items-center bg-[#F2F4F7] text-[#98A2B3] font-[700] font-[pretendard] text-[1rem]">다음</button>
                      </div>

                    </div>
                  </div>
                  {/*오른쪽 보건실 배경*/}
                  <div id="rightSection" className="relativge flex flex-1 justify-center items-center overflow-hidden">
                    <div id="blur" className="m-0 z-[1] w-full h-full bg-[radial-gradient(circle, rgba(105, 72, 237, 0.3) 0%, #6948ED 100%)]" />
                    <img id="img" src={'/Sigin.svg'} alt="img" className="w-full h-full object-cover z-[-1]"/>
                  </div>
                </div>
  );
}

export default Signup1;
