'use client';

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import VisitModal from "../components/VisitModal";
import RentModal from "../components/RentModal";
import VisitData from "../components/VisitData";
import RentData from "../components/RentData";

import { VisitDatas } from "../components/VisitData";
import { RentDatas } from "../components/RentData";

// JWT 디코딩 결과를 위한 타입 정의
interface DecodedToken {
  role: string; // JWT에 포함된 'role' 속성
  exp?: number; // 만료 시간 (선택적)
}

function Main() {
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [TActive, setTActive] = useState(false); // 선생님 부재중, 출근중 상태
  const [BActive, setBActive] = useState(true); // 침대 현황 상태
  const [visitDataList, setVisitDataList] = useState<VisitDatas[]>([]); // 방문 기록 데이터
  const [rentDataList, setRentDataList] = useState<RentDatas[]>([]); // 대여 기록 데이터
  const token = localStorage.getItem('access');

  useEffect(() => {
    // 토큰 디코딩 및 역할 확인
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token); // 반환 타입 지정
        const userRole = decodedToken.role; // 역할 추출
        console.log("유저 권한:", userRole);
        setAdmin(userRole === "ROLE_TEACHER"); // 역할에 따라 Admin 상태 설정
      } 
      
      catch (error) {
        console.error("토큰 에러:", error);
      }
    } 
    
    else {
      console.error("토큰 값을 찾지 못했습니다.");
    }
  }, [token]);

  useEffect(() => {
    async function fetchVisitData() {
      try {
        const response = await axios.get<VisitDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/visit`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        );

        console.log(response.data);

        if (Array.isArray(response.data)) {
          setVisitDataList(response.data);
        } else {
          setVisitDataList([]);
        }
      } catch (error) {
        console.error("방문 기록 데이터를 불러오는 중 에러 발생:", error);
      }
    }
    fetchVisitData();
  }, []);

  useEffect(() => {
    async function fetchRentData() {
      try {
        const response = await axios.get<RentDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/cocGet`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        );

        console.log(response.data);

        if (Array.isArray(response.data)) {
          setRentDataList(response.data);
        } else {
          setRentDataList([]);
        }
      } catch (error) {
        console.error("대여 기록 데이터를 불러오는 중 에러 발생:", error);
      }
    }
    fetchRentData();
  }, []);

  function visitModalClick() {
    setVisitModalOpen(true);
  }

  function rentModalClick() {
    setRentModalOpen(true);
  }

  function TeacherActive() {
    setTActive(true);
  }

  function BedActive() {
    setBActive(false);
  }

  return (
    <>
      <>
        {visitModalOpen && (
          <VisitModal onClose={() => setVisitModalOpen(false)} />
        )}

        {rentModalOpen && (
          <RentModal onClose={() => setRentModalOpen(false)} />
        )}
      </>

      {Admin ? (
        <>
          <S.Container>
            <S.TeacherSection>
              <S.TeacherIconDiv>
                <S.TeacherIcon src={"/people.svg"} />
              </S.TeacherIconDiv>

              {TActive ? (
                <S.TeacherState Active={true}>선생님 출근중</S.TeacherState>
              ) : (
                <S.TeacherState Active={false}>선생님 부재중</S.TeacherState>
              )}
            </S.TeacherSection>

            <S.WriteBox>
              <S.WriteCard onClick={visitModalClick}>방문기록 작성</S.WriteCard>
              <S.WriteCard onClick={rentModalClick}>물품 대여</S.WriteCard>
            </S.WriteBox>

            <S.RentDiv>
              <S.RentTitle>대여기록</S.RentTitle>
              {rentDataList.length > 0 ? (
                rentDataList.map(({ id, ...rent }) => (
                  <RentData key={id} {...rent} />
                ))
              ) : (
                <S.RentNonActiveSpan>
                  대여한 기록이 존재하지 않습니다.
                </S.RentNonActiveSpan>
              )}
            </S.RentDiv>

            <S.VisitDiv>
              <S.VisitTitle>방문기록</S.VisitTitle>
              {visitDataList.length > 0 ? (
                visitDataList.map(({ id, ...visit }) => (
                  <VisitData key={id} {...visit} />
                ))
              ) : (
                <S.VisitNonActiveSpan>
                  방문한 기록이 존재하지 않습니다.
                </S.VisitNonActiveSpan>
              )}
            </S.VisitDiv>

            <S.BedDiv>
              <S.BedTitle>침대 현황</S.BedTitle>
              {BActive ? (
                <>
                  <S.BedMenNonActiveDiv Active={true}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {BActive && (
                      <S.BedIsFree>침대 사용 가능</S.BedIsFree>
                    )}
                  </S.BedMenNonActiveDiv>

                  <S.BedWomenNonActiveDiv Active={true}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {BActive && (
                      <S.BedIsFree>침대 사용 가능</S.BedIsFree>
                    )}
                  </S.BedWomenNonActiveDiv>
                </>
              ) : (
                <>
                  <S.BedMenNonActiveDiv Active={false}>
                    <S.BedIcon src={"/Bed.svg"} />
                  </S.BedMenNonActiveDiv>

                  <S.BedWomenNonActiveDiv Active={false}>
                    <S.BedIcon src={"/Bed.svg"} />
                  </S.BedWomenNonActiveDiv>
                </>
              )}
            </S.BedDiv>
          </S.Container>
        </>
      ) : (
        <>
          <S.Container>
            <S.TeacherSection>
              <S.TeacherIconDiv>
                <S.TeacherIcon src={"/people.svg"} />
              </S.TeacherIconDiv>

              {TActive ? (
                <S.TeacherState Active={true}>선생님 출근중</S.TeacherState>
              ) : (
                <S.TeacherState Active={false}>선생님 부재중</S.TeacherState>
              )}
            </S.TeacherSection>
          </S.Container>
        </>
      )}
    </>
  );
}

export default Main;
