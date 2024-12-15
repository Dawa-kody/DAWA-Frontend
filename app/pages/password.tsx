import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from '../styles/password'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from "axios";

function Password(){
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordRe, setShowNewPasswordRe] = useState(false);
    const [codeValue, SetCodeValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [NewPwValue, SetNewPwValue] = useState("");
    const [NewRePwValue, SetNewRePwValue] = useState("");
    const [Error, SetError] = useState(false);

    const router = useRouter();

    function handleChangeNewPW(e : React.ChangeEvent<HTMLInputElement>){
        SetNewPwValue(e.target.value);
    }

    function handleChangeNewRePw(e : React.ChangeEvent<HTMLInputElement>){
        SetNewRePwValue(e.target.value);
    }

    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>){
        setEmailValue(e.target.value);
    }

    function handleChangeCode(e: React.ChangeEvent<HTMLInputElement>){
        SetCodeValue(e.target.value);
    }

    const handleEmailSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        const email = emailValue;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/mailsend`, email, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
                
            );
            
        } catch (error) {
            console.log("인증번호 요청 실패:", error);
        }
    }


    const handleSubmit = async (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault;
        const dto = {
            email: emailValue,
            password: NewPwValue,
            code: codeValue
        };

        if(NewPwValue != NewRePwValue){
            alert("비밀번호가 일치하지 않습니다.");
        }
        
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/pwchange`, dto, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
                
            );
            
            if (response.status === 200) {
                router.push("/Login");
            }
            
        } catch (error) {
            console.log("비밀번호 변경 실패:", error);
            SetError(true);
        }
    }

    return(
        <S.Container>
            <S.LeftSection>
                <S.Title>비밀번호 변경</S.Title>

                <S.Inputs>
                    <S.InputGroup>
                        <S.InputLabel>이메일</S.InputLabel>
                        <S.EmailInput>
                            <S.FormStyledInput
                                placeholder="이메일"
                                type="email"
                                value={emailValue}
                                onChange={handleChangeEmail}
                                required
                            />
                            <S.EmailInputButton onClick={handleEmailSubmit}>발송</S.EmailInputButton>
                        </S.EmailInput>
                    </S.InputGroup>

                    <S.InputGroup>
                        <S.InputLabel>인증번호</S.InputLabel>
                        <S.StyledInput
                            placeholder="인증번호"
                            type="text"
                            value={codeValue}
                            onChange={handleChangeCode}
                            required
                        />
                    </S.InputGroup>

                    <S.InputGroup>
                        <S.InputLabel>새 비밀번호</S.InputLabel>
                        <S.StyledInput
                            placeholder="새 비밀번호"
                            type={showNewPassword ? "text" : "password"}
                            value={NewPwValue}
                            onChange={handleChangeNewPW}
                            required
                        />
                        
                        <S.IconWrapper onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                        </S.IconWrapper>

                        <S.StyledInput
                            placeholder="새 비밀번호 확인"
                            type={showNewPasswordRe ? "text" : "password"}
                            value={NewRePwValue}
                            onChange={handleChangeNewRePw}
                            required
                        />
                        
                        <S.IconWrapper2 onClick={() => setShowNewPasswordRe(!showNewPasswordRe)}>
                            {showNewPasswordRe ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                        </S.IconWrapper2>

                        {Error && (
                            <S.ReportMessage>인증번호가 틀리거나 비밀번호가 일치하지 않습니다.</S.ReportMessage>
                        )}
                    </S.InputGroup>

                    <S.ButtonGap />

                    <S.ButtonDiv>
                        <S.NextButton onClick={handleSubmit}>확인</S.NextButton>
                    </S.ButtonDiv>
                </S.Inputs>
            </S.LeftSection>

            <S.RightSection>
                <S.GradientOverlay />
                <S.Img src={'/mokoko.png'} />
            </S.RightSection>
        </S.Container>
    );
}

export default Password;