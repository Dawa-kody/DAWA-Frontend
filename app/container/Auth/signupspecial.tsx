import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from '../../styles/signupspecial';
import axios from "axios";

export function Signupspecial() {
  const router = useRouter();

  // localStorage에서 email, password 읽기
  const email = typeof window !== "undefined" ? localStorage.getItem("Email") : "";
  const password = typeof window !== "undefined" ? localStorage.getItem("Password") : "";

  // 하나만 선택 가능하도록 상태 관리
  const [selected, setSelected] = useState<null | 'allergy' | 'disease' | 'medication' | 'gita'>(null);

  // 입력 상태
  const [allergyInput, setAllergyInput] = useState('');
  const [diseaseInput, setDiseaseInput] = useState('');
  const [medicationInput, setMedicationInput] = useState('');
  const [gitaInput, setGitaInput] = useState('');

  // 이동 함수
  const GoLogin = () => router.push("/Login");
  const Gotobefore = () => router.back();

  // 완료 버튼 클릭
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일 또는 비밀번호 정보가 없습니다. 이전 단계부터 다시 진행해 주세요.");
      return;
    }

    // 선택이 없으면 모두 빈 값으로
    const dto = {
      email,
      password,
      healthIssues: {
        allergyImmune: selected === 'allergy' ? allergyInput : '',
        chronicMedication: selected === 'disease' ? diseaseInput : '',
        emergencyPossible: selected === 'medication' ? medicationInput : '',
        etc: selected === 'gita' ? gitaInput : ''
      }
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/auth/signup`,
        dto,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        router.push("/MainAdmin");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
      } else {
        alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
      console.error("post 에러생김", error);
    }
  };

  return (
    <S.Container>
      <S.LeftSection>
        <S.TopTexts>
          <S.HelloBlock>
            <S.HelloText>어서오세요!</S.HelloText>
            <S.RowWrapper>
              <S.SubText>이미 계정이 있다면?</S.SubText>
              <S.GoLogin onClick={GoLogin}>로그인하기</S.GoLogin>
            </S.RowWrapper>
          </S.HelloBlock>
          <S.Title>회원가입 - 특이사항 선택</S.Title>
          <S.SpecialText>본인의 특이사항을 선택해주세요</S.SpecialText>
        </S.TopTexts>

        <S.DiseaseTextWrapper>
          {/* 알레르기 */}
          <S.AllergyItem>
            <S.CheckboxRow>
              <S.AllergyCheckbox
                checked={selected === 'allergy'}
                onClick={() => setSelected(selected === 'allergy' ? null : 'allergy')}
              >
                {selected === 'allergy' && <img src="/check_small.svg" alt="체크" />}
              </S.AllergyCheckbox>
              <S.DiseaseText>알레르기 및 면역 관련 질환</S.DiseaseText>
            </S.CheckboxRow>
            {selected === 'allergy' && (
              <S.AllergyExtra>
                <S.AllergyLabel>음식, 약물, 꽃가루 등 알레르기 내용을 적어주세요</S.AllergyLabel>
                <S.AllergyInput
                  placeholder="알레르기 관련 설명을 적어주세요."
                  value={allergyInput}
                  onChange={e => setAllergyInput(e.target.value)}
                />
              </S.AllergyExtra>
            )}
          </S.AllergyItem>

          {/* 만성 질환 */}
          <S.DiseaseItem>
            <S.CheckboxRow>
              <S.DiseaseCheckbox
                checked={selected === 'disease'}
                onClick={() => setSelected(selected === 'disease' ? null : 'disease')}
              >
                {selected === 'disease' && <img src="/check_small.svg" alt="체크" />}
              </S.DiseaseCheckbox>
              <S.DiseaseText>만성 질환 및 약물 관리 필요</S.DiseaseText>
            </S.CheckboxRow>
            {selected === 'disease' && (
              <S.DiseaseExtra>
                <S.AllergyLabel>천식, 당뇨, 심장질환 및 복용약 등</S.AllergyLabel>
                <S.DiseaseInput
                  placeholder="만성 질환 및 약물 관리 내용을 적어주세요"
                  value={diseaseInput}
                  onChange={e => setDiseaseInput(e.target.value)}
                />
              </S.DiseaseExtra>
            )}
          </S.DiseaseItem>

          {/* 응급 상황 */}
          <S.MedicationItem>
            <S.CheckboxRow>
              <S.MedicationCheckbox
                checked={selected === 'medication'}
                onClick={() => setSelected(selected === 'medication' ? null : 'medication')}
              >
                {selected === 'medication' && <img src="/check_small.svg" alt="체크" />}
              </S.MedicationCheckbox>
              <S.DiseaseText>응급 상황 발생 가능 질환</S.DiseaseText>
            </S.CheckboxRow>
            {selected === 'medication' && (
              <S.MedicationExtra>
                <S.AllergyLabel>뇌전증, 감염병 이력, 정신건강 관련 사항</S.AllergyLabel>
                <S.MedicationInput
                  placeholder="응급 상황 질환 설명을 적어주세요"
                  value={medicationInput}
                  onChange={e => setMedicationInput(e.target.value)}
                />
              </S.MedicationExtra>
            )}
          </S.MedicationItem>

          {/* 기타 */}
          <S.GitaItem>
            <S.CheckboxRow>
              <S.GitaCheckbox
                checked={selected === 'gita'}
                onClick={() => setSelected(selected === 'gita' ? null : 'gita')}
              >
                {selected === 'gita' && <img src="/check_small.svg" alt="체크" />}
              </S.GitaCheckbox>
              <S.DiseaseText>기타</S.DiseaseText>
            </S.CheckboxRow>
            {selected === 'gita' && (
              <S.GitaExtra>
                <S.AllergyLabel>기타 만성질환 또는 건강 관리 필요 사항</S.AllergyLabel>
                <S.GitaInput
                  placeholder="기타 특이사항을 입력해주세요"
                  value={gitaInput}
                  onChange={e => setGitaInput(e.target.value)}
                />
              </S.GitaExtra>
            )}
          </S.GitaItem>
        </S.DiseaseTextWrapper>

        <S.Divs>
          <S.Pages>
            <S.Count1page />
            <S.Count2page />
          </S.Pages>

          <S.ButtonDiv>
            <S.BeforeButton onClick={Gotobefore}>이전</S.BeforeButton>
            <S.NextButton onClick={handleSubmit}>
              {selected ? '완료' : '특이사항 없음'}
            </S.NextButton>
          </S.ButtonDiv>
        </S.Divs>
      </S.LeftSection>

      <S.RightSection>
        <S.GradientOverlay />
        <S.Img src={'/Sigin.svg'} />
      </S.RightSection>
    </S.Container>
  );
}