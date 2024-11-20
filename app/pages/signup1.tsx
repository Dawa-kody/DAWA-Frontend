import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from '../styles/signup1';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Signup1(){
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRe, setShowPasswordRe] = useState(false);
    const [EmailValue, SetEmailValue] = useState("");
    const [PasswordValue, SetPasswordValue] = useState("");
    const [PasswordReValue, SetPasswordReValue] = useState("");
    const router = useRouter();

    function GoNextPage(){
        localStorage.setItem("Email", EmailValue);
        localStorage.setItem("Password", PasswordValue);
        if(PasswordValue != PasswordReValue){
            alert("비밀번호가 일치하지 않습니다.");
        }

        else{
            router.push("/Signup2");
        }

    }

    function handleEmailChange(e : React.ChangeEvent<HTMLInputElement>){
        SetEmailValue(e.target.value);
    }

    function handlePasswordChange(e : React.ChangeEvent<HTMLInputElement>){
        SetPasswordValue(e.target.value);
    }

    function handlePasswordReChange(e : React.ChangeEvent<HTMLInputElement>){
        SetPasswordReValue(e.target.value);
    }

    function GoLogin(){
        router.push("/Login");
    }

    return(
        <S.Container>
            <S.LeftSection>
                    <S.HelloText>어서오세요!</S.HelloText>
                    <S.SubText>이미 계정이 있다면?</S.SubText>
                    <S.GoLogin onClick={GoLogin}>로그인하기</S.GoLogin>

                    <S.Title>회원가입</S.Title>

                    <S.Inputs>
                        <S.InputGroup>
                            <S.InputLabel>이메일</S.InputLabel>
                            <S.StyledInput
                            value={EmailValue}
                            placeholder="이메일"
                            type="email"
                            onChange={handleEmailChange}
                            required />
                        </S.InputGroup>

                        <S.InputGroup>  
                            <S.InputLabel>비밀번호</S.InputLabel>
                            <S.StyledInput
                            value={PasswordValue}
                            placeholder="비밀번호"
                            type={showPassword ? "text" : "password"}
                            onChange={handlePasswordChange}
                            required />

                            <S.IconWrapper onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                            </S.IconWrapper>
                        </S.InputGroup>

                        <S.InputGroup>
                            <S.InputLabel>비밀번호 확인</S.InputLabel>
                            <S.StyledInput
                                value={PasswordReValue}
                                placeholder="비밀번호 확인"
                                type={showPasswordRe ? "text" : "password"}
                                onChange={handlePasswordReChange}
                                required />

                            <S.IconWrapper onClick={() => setShowPasswordRe(!showPasswordRe)}>
                                {showPasswordRe ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                            </S.IconWrapper>
                        </S.InputGroup>

                        <S.Pages>
                            <S.Count1page />
                            <S.Count2page />
                        </S.Pages>

                        <S.ButtonDiv>
                            <S.NextButton onClick={GoNextPage}>다음</S.NextButton>
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

export default Signup1;
