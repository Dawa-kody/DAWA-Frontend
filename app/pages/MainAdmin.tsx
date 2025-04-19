'use client';

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";

import Nav from "../organisms/Nav";
import VisitDataAdmin from "../molecules/VisitDataAdmin";
import RentDataAdmin from "../molecules/RentDataAdmin";
import RentModal from "@/organisms/RentModalAdmin";
import { VisitAdminDatas } from "../molecules/VisitDataAdmin";
import { RentAdminDatas } from "../molecules/RentDataAdmin";
import { RequestRentDatas } from "@/molecules/RequestRentData";
import RequestRentData from "@/molecules/RequestRentData";

function MainAdmin() {
    const [Admin, setAdmin] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const [rentModalOpen, setRentModalOpen] = useState(false);
    
    const [TActive, setTActive] = useState(false); // 선생님 부재중, 출근중 상태
    const [BActive, setBActive] = useState(true); // 침대 현황 상태
    const [requestBarOpen, setRequestBarOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const [RequestRentDataList, setRequestRentDataList] = useState<RequestRentDatas[]>([]);
    const [visitAdminDataList, setVisitAdminDataList] = useState<VisitAdminDatas[]>([]);
    const [rentAdminDataList, setRentAdminDataList] = useState<RentAdminDatas[]>([]);
    const [bedStatus, setBedStatus] = useState<{ bed1: boolean; bed2: boolean }>({
        bed1: true,
        bed2: true,
    });


    useEffect(() => {
      const access = window.localStorage.getItem("access"); // 문자열 키 사용
      setToken(access);
    }, []); // useEffect

    useEffect(() => {
      const storedRole = window.localStorage.getItem("role"); // 문자열 키 사용
      if (storedRole === "ROLE_TEACHER") {
        setAdmin(true);
      }
    }, []); // useEffect
    

    const closeRequestBar = () => {
      setIsClosing(true); // 닫힘 애니메이션 실행
      setTimeout(() => {
          setRequestBarOpen(false); // 애니메이션 후 제거
          setIsClosing(false);
      }, 400); // 애니메이션 지속 시간 (0.4초)
    };

  useEffect(() => {
    async function fetchVisitAdminData() {
      try {
        const response = await axios.get<VisitAdminDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/visit/allRecord`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
              withCredentials: true,
          },
          }
        );
        setVisitAdminDataList(response.data);
      } catch (error) {
        console.error("모든 방문 기록 데이터를 불러오는 중 에러 발생:", error);
      }
    }
    fetchVisitAdminData();
  }, [token]);

  useEffect(() => {
    async function fetchAdminRentData() {
      try {
        const response = await axios.get<RentAdminDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/allRental`, {
            headers: { Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
            withCredentials: true,
          },
          }
        );
        setRentAdminDataList(response.data);
      } catch (error) {
        console.error("모든 대여 기록 데이터를 불러오는 중 에러 발생:", error);
      }
    }
    fetchAdminRentData();
  }, [token]);

  useEffect(() => {
    async function fetchAdminRequestRentData() {
      try {
        const response = await axios.get<RequestRentDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/rentalAccept`, {
            headers: { Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
            withCredentials: true,
          },
          }
        );
        setRequestRentDataList(response.data);

        if (response.status === 200){
          
        }
      } catch (error) {
        console.error("모든 대여 신청 데이터를 불러오는 중 에러 발생:", error);
      }
    }
    fetchAdminRequestRentData();
  }, [token]);

  const handleRemoveRequest = (rentalId: string) => {
    setRequestRentDataList((prevList) => prevList.filter((item) => item.rentalId !== rentalId));
  };

  function rentModalClick() {
    setRentModalOpen(true);
  }

  useEffect(() => {
    async function fetchBedStatus() {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/bed`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'ngrok-skip-browser-warning': '69420',
                        withCredentials: true,
                    },
                }
            );
            setBedStatus(response.data);
        } catch (error) {
            console.error("침대 상태를 불러오는 중 에러 발생:", error);
        }
    }
    fetchBedStatus();
  }, [token]);

  const toggleBed = async (gender: "M" | "W") => {
    if (!Admin) {
      console.error("권한이 없습니다.");
      return;
    }
    try {
      const newBedStatus = { ...bedStatus, [gender === "M" ? "bed1" : "bed2"]: !bedStatus[gender === "M" ? "bed1" : "bed2"] };
      setBedStatus(newBedStatus);
      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/bed`,
        newBedStatus,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
            withCredentials: true 
          },
        }
      );
    } catch (error) {
      console.error("침대 상태를 업데이트하는 중 에러 발생:", error);
    }
  };

  return (
    <>
    {rentModalOpen && (
      <RentModal onClose={() => setRentModalOpen(false)} />
    )}

    <S.Container>
        <Nav />
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
            {rentAdminDataList.map(({ rentalId, ...rent }) => (
                <RentDataAdmin key={rentalId} rentalId={rentalId} {...rent} />
            ))}
            </S.RentDataCards>
            <S.RentActiveBtnContainer>
                <S.RentActiveBtn onClick={rentModalClick}>대여 기록 추가하기</S.RentActiveBtn>
                <S.RentActiveBtn onClick={() => setRequestBarOpen(true)}>
                    대여 신청 확인하기
                </S.RentActiveBtn>
            </S.RentActiveBtnContainer>

            {requestBarOpen && (
                <S.requestbar className={isClosing ? "closing" : ""}>
                    <S.requestbarbtn src="./X.svg" onClick={closeRequestBar} />
                    <S.requestTitle onClick={() => setRentModalOpen(true)}>학생들의 대여 신청</S.requestTitle>
                    <S.RequestRentDataCards>
                    {RequestRentDataList.map(({ rentalId, ...rentData }) => (
                      <RequestRentData
                        key={rentalId}
                        rentalId={rentalId}
                        {...rentData}
                        onRemove={handleRemoveRequest}
                      />
                ))}

                    </S.RequestRentDataCards>
                </S.requestbar>
            )}
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
)
}

export default MainAdmin