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
                <div id="container" className=" w-full h-full overflow-hidden flex m-0">
                
                  <div id="leftSection" className="w-[100vw] h-[100vh] bg-white overflow-hidden relative flex flex-1 flex-col z-[1]">
                    
                    <div id="topText" className="pl-[5vw] pt-[10vh] flex flex-col z-[10]">
                      <span id="helloText" className="font-[700] font-[pretendard] text-[2rem] text-black">어서오세요!</span>
                      <div id="firstContainer" className="flex flex-row gap-[0.2rem]">
                        <span id="subText" className=" text-[0.75rem] font-[300] font-[pretendard] text-black">이미 계정이 있다면?</span>
                        <span id="goLogin" onClick={GoLogin} className=" text-[0.75rem] font-[300] font-[pretendard] text-primaryPurple cursor-pointer">로그인하기</span>
                      </div>
                    </div>
                    <span id="title" className="mt-[5vh] ml-[5vw] font-[700] font-[pretendard] text-[2rem] text-black">회원가입</span>
                    <div id="inputContainer" className=" mt-[3vh] w-full flex justify-center items-center">
                      <div id="emailInputDiv" className="flex flex-col gap-2 w-[30vw]">
                        <span id="emailText" className="text-black text-[0.8rem] font-[500] font-[pretendard]">이메일</span>
                        <div>
                          <input id="emailInput" placeholder="이메일 입력" className="w-[20em] h-[2.5rem] rounded-[8px] p-[1rem] inline-flex border-none bg-[#F2F4F7] text-black"/>
                          <span>@gsm.hs.kr</span>
                        </div>
                        
                      </div>

                    </div>
                  </div>
                  <div id="rightSection" className="relative flex flex-1 justify-center items-center">
                    <div id="blur" className="m-0 z-[1] w-full h-full bg-[radial-gradient(circle, rgba(105, 72, 237, 0.3) 0%, #6948ED 100%)]" />
                    <img id="img" src={'/Sigin.svg'} alt="img" className="w-full h-full object-cover z-[-1]"/>
                  </div>
                </div>
  );
}

export default Signup1;
