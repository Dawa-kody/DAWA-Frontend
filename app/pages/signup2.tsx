import React, { useState } from "react";
import * as S from '../styles/signup2';
import { useRouter } from "next/navigation";
import axios from "axios";

function Signup2(){
    const [NameValue, SetNameValue] = useState("");
    const [NumberValue, SetNumberValue] = useState("");
    const [GenderValue, SetGenderValue] = useState("");
    const router = useRouter();

    function handleNameChange(e : React.ChangeEvent<HTMLInputElement>){
        SetNameValue(e.target.value);
    }

    function handleNumberChange(e : React.ChangeEvent<HTMLInputElement>){
        SetNumberValue(e.target.value);
    }

    function handleGenderMenChange(){
        SetGenderValue("Men");
    }

    function handleGenderWomenChange(){
        SetGenderValue("Women");
    }

    function GoLogin(){
        router.push("/Login");
    }

    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        localStorage.setItem("Name", NameValue);
        localStorage.setItem("Number", NumberValue);
        localStorage.setItem("Gender", GenderValue);

        const Email = window.localStorage.getItem("Email");
        const Password = window.localStorage.getItem("Password");
        const dto = {
            email: Email,
            password: Password,
            name: NameValue,
            schoolNumber: NumberValue,
            gender: GenderValue,
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/signup`, dto, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
                
            );
            if (response.status === 200) {
                window.localStorage.clear();
                router.push("/Login");
            }
        } catch (error) {
            console.log("회원가입 실패:", error);
        }
    };

    return(
        <S.Container>
            <S.LeftSection>
                    <S.HelloText>어서오세요!</S.HelloText>
                    <S.SubText>이미 계정이 있다면?</S.SubText>
                    <S.GoLogin onClick={GoLogin}>로그인하기</S.GoLogin>

                    <S.Title>회원가입</S.Title>
                
                    <S.Inputs>
                        <S.InputGroup>
                            <S.InputLabel>이름</S.InputLabel>
                            <S.StyledInput
                                value={NameValue}
                                placeholder="이름"
                                type="text"
                                onChange={handleNameChange}
                                required />
                        </S.InputGroup>

                        <S.InputGroup>
                            <S.InputLabel>학번</S.InputLabel>
                            <S.StyledInput
                                value={NumberValue}
                                placeholder="학번"
                                type="text"
                                onChange={handleNumberChange}
                                required />
                        </S.InputGroup>

                        <S.ButtonGroup>
                            <S.InputLabel>성별</S.InputLabel>
                            <S.Buttons>
                                    <S.MenButton isSelected={GenderValue === "Men"} onClick={handleGenderMenChange}>남자</S.MenButton>
                                    <S.WomenButton isSelected={GenderValue === "Women"} onClick={handleGenderWomenChange}>여자</S.WomenButton>
                            </S.Buttons>
                        </S.ButtonGroup>

                        <S.Pages>
                            <S.Count1page />
                            <S.Count2page />
                        </S.Pages>

                        <S.ButtonDiv>
                            <S.NextButton onClick={handleSubmit} type="submit">확인</S.NextButton>
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

export default Signup2;
