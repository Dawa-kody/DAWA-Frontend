'use client';

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import VisitModal from "../components/VisitModal";
import RentModal from "../components/RentModal";
import VisitData from "../components/VisitData";
import RentData from "../components/RentData";
import VisitDataAdmin from "../components/VisitDataAdmin";
import RentDataAdmin from "../components/RentDataAdmin";

import { VisitDatas } from "../components/VisitData";
import { VisitAdminDatas } from "../components/VisitDataAdmin";
import { RentDatas } from "../components/RentData";
import { RentAdminDatas } from "../components/RentDataAdmin";

// JWT 디코딩 결과를 위한 타입 정의
interface DecodedToken {
  role: string; // JWT에 포함된 'role' 속성
  exp?: number; // 만료 시간 (선택적)
}

function Main() {
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [MToggle, SetMToggle] = useState(false);
  const [WToggle, SetWToggle] = useState(false);
  const [TActive, setTActive] = useState(false); // 선생님 부재중, 출근중 상태
  const [BActive, setBActive] = useState(true); // 침대 현황 상태
  const [visitDataList, setVisitDataList] = useState<VisitDatas[]>([]); // 방문 기록 데이터
  const [visitAdminDataList, setVisitAdminDataList] = useState<VisitAdminDatas[]>([]);
  const [rentDataList, setRentDataList] = useState<RentDatas[]>([]); // 대여 기록 데이터
  const [rentAdminDataList, setRentAdminDataList] = useState<RentAdminDatas[]>([]);
  const [bedStatus, setBedStatus] = useState<{ bed1: boolean; bed2: boolean }>({
    bed1: true,
    bed2: true,
  }); // 침대 상태 관리
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
    async function fetchVisitAdminData() {
      try {
        const response = await axios.get<VisitAdminDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/visit/allRecord`,
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
        console.error("모든 학생 방문 기록 데이터를 불러오는 중 에러 발생:", error);
      }
    }
    fetchVisitAdminData();
  }, []);

  useEffect(() => {
    async function fetchRentData() {
      try {
        const response = await axios.get<RentDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental`,
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

  useEffect(() => {
    async function fetchAdminRentData() {
      try {
        const response = await axios.get<RentAdminDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/allRecord`,
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
    fetchAdminRentData();
  }, []);

  useEffect(() => {
    // 침대 상태를 서버에서 가져옴
    async function fetchBedStatus() {
      try {
        const response = await axios.get<{ bed1: boolean; bed2: boolean }>(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/bed`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        });

        setBedStatus(response.data); // 서버에서 받아온 침대 상태를 설정
      } catch (error) {
        console.error("침대 상태를 가져오는 중 에러 발생:", error);
      }
    }
    fetchBedStatus();
  }, []);

  const toggleBed = async (gender: "M" | "W") => {
    if (!Admin) {
      console.error("권한이 없습니다.");
      return;
    }

    try {
      // 침대 상태 토글 후 서버로 POST 요청
      const newBedStatus = { ...bedStatus };
      if (gender === "M") {
        newBedStatus.bed1 = !bedStatus.bed1;
      } else if (gender === "W") {
        newBedStatus.bed2 = !bedStatus.bed2;
      }

      setBedStatus(newBedStatus); // UI에서 상태 업데이트

      // 서버로 상태 업데이트
      await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/bed`, newBedStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
    } catch (error) {
      console.error("침대 상태를 업데이트하는 중 에러 발생:", error);
    }
  };

  const StudentBedStatus = () => {
  const [bedStatus, setBedStatus] = useState({
    bed1: false,
    bed2: false,
  });

  useEffect(() => {
    const fetchBedStatus = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/bed`, {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 토큰
          },
        });

        setBedStatus(response.data);  // 서버로부터 받은 침대 상태로 업데이트
      } catch (error) {
        console.error('침대 상태를 불러오는 중 에러 발생:', error);
      }
    };

    fetchBedStatus();
    }, []);  // 컴포넌트가 마운트될 때 한 번만 실행
  }
  

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

  function MToggleing() {
    if (!Admin) {
      console.error("권한이 없습니다.");
      return;
    }
    SetMToggle((prevMToggle) => !prevMToggle); // 이전 상태를 반영하여 업데이트
  }
  
  function WToggleing() {
    if (!Admin) {
      console.error("권한이 없습니다.");
      return;
    }
    SetWToggle((prevWToggle) => !prevWToggle); // 이전 상태를 반영하여 업데이트
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

            <S.WriteListContainer>
                <S.WriteTitle>문진표 작성</S.WriteTitle>
                <S.WriteButton>문진표 작성</S.WriteButton>
            </S.WriteListContainer>

            <S.RentDiv>
                <S.RentTitle>학생들의 가장 최근 대여</S.RentTitle>
                
                {rentAdminDataList.length === 0 && (
                    <S.RentNonActiveSpan>대여한 기록이 존재하지 않습니다.</S.RentNonActiveSpan>
                )}

                <S.RentDataCards>
                    {rentAdminDataList.map(({ id, ...rent }) => (
                    <RentDataAdmin key={id} {...rent} />
                    ))}
                </S.RentDataCards>
            </S.RentDiv>

            <S.VisitDiv>
                <S.VisitTitle>학생들의 가장 최근 방문기록</S.VisitTitle>
                
                {visitAdminDataList.length === 0 && (
                    <S.VisitNonActiveSpan>방문한 기록이 존재하지 않습니다.</S.VisitNonActiveSpan>
                )}
                
                <S.VisitDataCards>
                    {visitAdminDataList.map(({ id, ...visit }) => (
                    <VisitDataAdmin key={id} {...visit} />
                    ))}
                </S.VisitDataCards>
            </S.VisitDiv>

            <S.BedDiv>
              <S.BedTitle>침대 사용 여부</S.BedTitle>
              {BActive ? (
                <>
                  <S.AdminBedMenNonActiveDiv Active={bedStatus.bed1}>
                    <S.BedIcon src={"/Bed.svg"} />
                      {bedStatus.bed1 ? <S.BedIsFree>침대 사용 가능</S.BedIsFree> : <S.BedIsFree>침대 사용 중</S.BedIsFree>}
                    </S.AdminBedMenNonActiveDiv>

                  <S.ManToggleContainer onClick={() => toggleBed("M")}>
                    <S.ManToggleCircle Active={bedStatus.bed1} />
                  </S.ManToggleContainer>

                  <S.AdminBedWomenNonActiveDiv Active={bedStatus.bed2}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {bedStatus.bed2 ? <S.BedIsFree>침대 사용 가능</S.BedIsFree> : <S.BedIsFree>침대 사용 중</S.BedIsFree>}
                  </S.AdminBedWomenNonActiveDiv>

                  <S.WomanToggleContainer onClick={() => toggleBed("W")}>
                    <S.WomanToggleCircle Active={bedStatus.bed2} />
                  </S.WomanToggleContainer>
                </>
              ) : (
                <>
                <S.BedMenNonActiveDiv Active={bedStatus.bed1}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {bedStatus.bed1 ? <S.BedIsFree>침대 사용 가능</S.BedIsFree> : <S.BedIsFree>침대 사용 중</S.BedIsFree>}

                  </S.BedMenNonActiveDiv>

                  <S.BedWomenNonActiveDiv Active={bedStatus.bed2}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {bedStatus.bed2 ? <S.BedIsFree>침대 사용 가능</S.BedIsFree> : <S.BedIsFree>침대 사용 중</S.BedIsFree>}
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

            <S.WriteBox>
              <S.WriteCard onClick={visitModalClick}>방문기록 작성</S.WriteCard>
              <S.WriteCard onClick={rentModalClick}>물품 대여</S.WriteCard>
            </S.WriteBox>

            <S.RentDiv>
                <S.RentTitle>대여기록</S.RentTitle>
                
                {rentDataList.length === 0 && (
                    <S.RentNonActiveSpan>대여한 기록이 존재하지 않습니다.</S.RentNonActiveSpan>
                )}

                <S.RentDataCards>
                    {rentDataList.map(({ id, ...rent }) => (
                    <RentData key={id} {...rent} />
                    ))}
                </S.RentDataCards>
            </S.RentDiv>

            <S.VisitDiv>
                <S.VisitTitle>방문기록</S.VisitTitle>
                
                {visitDataList.length === 0 && (
                    <S.VisitNonActiveSpan>방문한 기록이 존재하지 않습니다.</S.VisitNonActiveSpan>
                )}
                
                <S.VisitDataCards>
                    {visitDataList.map(({ id, ...visit }) => (
                    <VisitData key={id} {...visit} />
                    ))}
                </S.VisitDataCards>
            </S.VisitDiv>


            <S.BedDiv>
              <S.BedTitle>침대 현황</S.BedTitle>
              {BActive ? (
                <>
                  <S.AdminBedMenNonActiveDiv Active={bedStatus.bed1}>
                    <S.BedIcon src={"/Bed.svg"} />
                  </S.AdminBedMenNonActiveDiv>

                  <S.AdminBedWomenNonActiveDiv Active={bedStatus.bed2}>
                    <S.BedIcon src={"/Bed.svg"} />
                  </S.AdminBedWomenNonActiveDiv>
                </>
              ) : (
                <>
                  <S.AdminBedMenNonActiveDiv Active={bedStatus.bed1}>
                    <S.BedIcon src={"/Bed.svg"} />
                  </S.AdminBedMenNonActiveDiv>

                  <S.AdminBedWomenNonActiveDiv Active={bedStatus.bed2}>
                    <S.BedIcon src={"/Bed.svg"} />
                  </S.AdminBedWomenNonActiveDiv>
                </>
              )}
            </S.BedDiv>
          </S.Container>
        </>
      )}
    </>
  );
}

export default Main;
