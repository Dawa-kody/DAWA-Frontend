import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import * as S from '../styles/password';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from "axios";

function Password() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordRe, setShowNewPasswordRe] = useState(false);
    const [codeValue, setCodeValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState("");
    const [NewPwValue, setNewPwValue] = useState("");
    const [NewRePwValue, setNewRePwValue] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [timerKey, setTimerKey] = useState(0);
    const [codeError, setCodeError] = useState("");

    const router = useRouter();

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
            setEmailError("이메일을 입력해주세요");
        }
    }

    function AuthTimer({ onExpire }: { initialTime?: number; onExpire: () => void }) {
        const [timeLeft, setTimeLeft] = useState<number>(() => {
            // 인증번호 만료 시각을 localStorage에서 읽음
            const endTime = localStorage.getItem("auth_end_time");
            if (endTime) {
                const diff = Math.floor((parseInt(endTime) - Date.now()) / 1000);
                return diff > 0 ? diff : 0;
            }
            return 180; // 기본값 3분
        });
    
        useEffect(() => {
            if (timeLeft <= 0) {
                localStorage.removeItem("auth_end_time");
                onExpire();
                return;
            }
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        localStorage.removeItem("auth_end_time");
                        onExpire();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }, [timeLeft, onExpire]);
    
        // 남은 시간 포맷
        const formatTime = (seconds: number) => {
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };
    
        return <span>{formatTime(timeLeft)}</span>;
    }
    
    const handleEmailSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // ... (이메일 유효성 검사 등)
        try {
            const fullEmail = `${emailValue}@gsm.hs.kr`;
            await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/password/change/email/send`,
                { email: fullEmail },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            // 인증번호 만료시각을 localStorage에 저장 (현재 시각 + 180초)
            const endTime = Date.now() + 180 * 1000;
            localStorage.setItem("auth_end_time", endTime.toString());
            setIsCodeSent(true);
            setTimerKey(prev => prev + 1);
            setCodeError("");
        } catch (error) {
            setCodeError("인증번호 요청에 실패했습니다.");
        }
    };
    

    // 타이머 만료 시 처리
    const handleTimerExpire = () => {
        setIsCodeSent(false);
        setCodeError("인증번호가 만료되었습니다. 다시 요청해주세요.");
    };

    // 완료(비밀번호 변경) 버튼 클릭 시: 인증번호 검증 + 비밀번호 변경
    const handleSubmit = async (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setCodeError("");

        if (emailValue === "" || !validateEmailPrefix(emailValue)) {
            setEmailError("이메일을 입력해주세요");
            return;
        }

        if (!isCodeSent) {
            setCodeError("먼저 인증번호를 요청해주세요.");
            return;
        }

        if (!codeValue) {
            setCodeError("인증번호를 입력해주세요.");
            return;
        }

        if (NewPwValue !== NewRePwValue) {
            setCodeError("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!NewPwValue) {
            setCodeError("새 비밀번호를 입력해주세요.");
            return;
        }

        const fullEmail = `${emailValue}@gsm.hs.kr`;
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/password/change/email/verify`,
                {
                    email: fullEmail,
                    code: codeValue,
                    password: NewPwValue
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                router.push("/Login");
            }
        } 
        
        catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
                console.log(fullEmail)
                console.log(codeValue)
                console.log(NewPwValue)
            }

            else {
                setCodeError("알 수 없는 오류가 발생했습니다.");
            }
        }
    };


    function Gotobefore() {
        router.back();
      }
    
      return (
        <S.Container>
            <S.LeftSection>
                <S.Title>비밀번호 변경</S.Title>
                <S.Inputs>
                    <S.InputGroup>
                        <S.InputLabel>이메일</S.InputLabel>
                        <S.FlexRow>
                            <S.FormStyledInput
                              placeholder="이메일 입력"
                              type="text"
                              value={emailValue}
                              onChange={handleEmailChange}
                              required
                            />
                            <S.EmailText>@gsm.hs.kr</S.EmailText>
                        </S.FlexRow>
                          {emailError && <S.ErrorMessage>{emailError}</S.ErrorMessage>}
                    </S.InputGroup>

                    <S.InputGroup>
                       <S.InputLabel>이메일 인증</S.InputLabel>
                       <S.FlexRowWide>
                         <S.FormEmailInput
                           placeholder="인증번호 입력"
                           type="text"
                           value={codeValue}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setCodeValue(e.target.value)}
                           required
                           disabled={!isCodeSent}
                            />
                         <S.Button
                           onClick={handleEmailSubmit}
                           disabled={!validateEmailPrefix(emailValue)}
                            >
                           {isCodeSent ? '인증번호 재요청' : '인증번호 요청'}
                         </S.Button>
                       </S.FlexRowWide>
                       {isCodeSent && (
                         <S.TimerInfo>
                           <S.AccessText>
                             인증번호가 전송되었습니다. (유효시간: 
                             <S.RedTimerText>
                               <AuthTimer
                                 key={timerKey}
                                     initialTime={180}
                                     onExpire={handleTimerExpire}
                                   />
                             </S.RedTimerText>
                            )
                            </S.AccessText>
                         </S.TimerInfo>
                           )}
                           {codeError && <S.ErrorMessage>{codeError}</S.ErrorMessage>}
                     </S.InputGroup>
                  
                     <S.PasswordGroup>
                      <S.InputLabel>새 비밀번호</S.InputLabel>
                      <S.PasswordInputWrapper>
                        <S.FlexRowWide>
                          <S.StyledInput
                            placeholder="새 비밀번호 (8~16자, 영문/숫자/특수문자 조합)"
                            type={showNewPassword ? "text" : "password"}
                            value={NewPwValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPwValue(e.target.value)}
                            required
                          />
                          <S.IconWrapper onClick={() => setShowNewPassword((prev) => !prev)}>
                            {showNewPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                          </S.IconWrapper>
                        </S.FlexRowWide>
                      </S.PasswordInputWrapper>
                  
                      <S.PasswordInputWrapper>
                        <S.FlexRowWide>
                          <S.StyledInput
                            placeholder="비밀번호 확인"
                            type={showNewPasswordRe ? "text" : "password"}
                            value={NewRePwValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewRePwValue(e.target.value)}
                            required
                          />
                          <S.IconWrapper onClick={() => setShowNewPasswordRe((prev) => !prev)}>
                            {showNewPasswordRe ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                          </S.IconWrapper>
                        </S.FlexRowWide>
                      </S.PasswordInputWrapper>
                    </S.PasswordGroup>

                    <S.ButtonDiv>
                        <S.NextButton 
                            onClick={handleSubmit}
                            isActive={!!emailValue && !!codeValue && !!NewPwValue}
                            >
                            <S.NextbuttonText isActive={!!emailValue && !!codeValue && !!NewPwValue}>완료</S.NextbuttonText>
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

export default Password;