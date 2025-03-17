'use client';

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Nav from "../components/Nav";
import VisitModal from "../components/VisitModal";
import RentModal from "../components/RentModal";
import VisitDataAdmin from "../components/VisitDataAdmin";
import RentDataAdmin from "../components/RentDataAdmin";
import { VisitAdminDatas } from "../components/VisitDataAdmin";
import { RentAdminDatas } from "../components/RentDataAdmin";

interface DecodedToken {
    role: string;
    nexp?: number;
}

function MainAdmin() {
    const [visitModalOpen, setVisitModalOpen] = useState(false);
    const [rentModalOpen, setRentModalOpen] = useState(false);
    const [Admin, setAdmin] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    
    const [TActive, setTActive] = useState(false); // 선생님 부재중, 출근중 상태
    const [BActive, setBActive] = useState(true); // 침대 현황 상태
    

    const [visitAdminDataList, setVisitAdminDataList] = useState<VisitAdminDatas[]>([]);
    const [rentAdminDataList, setRentAdminDataList] = useState<RentAdminDatas[]>([]);
    const [bedStatus, setBedStatus] = useState<{ bed1: boolean; bed2: boolean }>({
        bed1: true,
        bed2: true,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("access");
            if (storedToken) {
                setToken(storedToken);
                }
            }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setAdmin(decodedToken.role === "ROLE_TEACHER");
      } catch (error) {
        console.error("토큰 에러:", error);
        setAdmin(false);
      }
    }
  }, [token]);

  useEffect(() => {
    async function fetchVisitAdminData() {
      try {
        const response = await axios.get<VisitAdminDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/visit/allRecord`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
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
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/allRental`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
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
            {Admin ? (
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