// app/pages/mainAdmin.tsx
'use client';

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";
import { useStore } from "@/store/useRentDataStore"; // 경로는 알맞게 조정

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

    const [TActive, setTActive] = useState(false); // 선생님 부재중, 출근중 상태...
    const [BActive, setBActive] = useState(true); // 침대 현황 상태
    const [requestBarOpen, setRequestBarOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [bedStatus, setBedStatus] = useState<{ bed1: boolean; bed2: boolean }>({
        bed1: true,
        bed2: true,
    });

    const {
      rentAdminDataList,
      setRentAdminDataList,
      visitAdminDataList,
      setVisitAdminDataList,
      requestRentDataList,
      setRequestRentDataList,
    } = useStore();


    useEffect(() => {
      const access = window.localStorage.getItem("accessToken"); // 문자열 키 사용
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
    fetchAdminRentData();
    fetchAdminRequestRentData();

    const intervalId = setInterval(() => {
      fetchAdminRentData();
      fetchAdminRequestRentData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [token, setRentAdminDataList, setRequestRentDataList]);

  const handleRemoveRequest = (rentalId: string) => {
    setRequestRentDataList(
      requestRentDataList.filter((item) => item.rentalId !== rentalId)
    );
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

      <Nav />
      <div id="Container" className="w-full h-full flex flex-col overflow-hidden gap-[2rem] pt-[2rem] pl-[2rem] pr-[1rem]">
        
        <div id="topdiv" className="flex w-full h-full">
          
          <div id="topleft" className="w-[20rem] h-[12rem] flex flex-col gap-[2rem]">
            {/* 선생님 현황 */}
            <div className="w-full h-[6rem] flex items-center bg-white rounded-[0.58988rem] pl-[1.5rem] gap-[7rem]">
              <div className="w-[3rem] h-[3rem] bg-primaryPurple rounded-[0.3125rem] flex justify-center items-center">
                <img className="w-[2rem] h-[2rem]" src={"/people.svg"} />
              </div>
              {TActive ? (
                <span className="text-[1.2rem] font-[700] text-primaryPurple">선생님 출근중</span>
              ) : (
                <span className="text-[1.2em] font-[700] text-[#98A2B3]">선생님 부재중</span>
              )}
            </div>
            {/* 문진표 작성 */}
            <div className="w-full h-[6rem] bg-primaryPurple rounded-[0.58988rem] flex items-center justify-center cursor-pointer">
              <span className="text-[1.5rem] text-white font-[700] font-pretendard">
                문진표 작성
              </span>
            </div>
          </div>
          {/* 공지사항 */}
          {/* 캘린더*/}
        </div> {/* top div 끝나는 지점 */}

        <div id="contentDiv" className="w-full flex flex-row gap-[2rem]">

          <div className="w-[90rem] h-[21rem] flex flex-col bg-white rounded-[0.625rem] px-[2.38rem] pt-[2.06rem] gap-[0.625rem] relative">

            {/* 제목: 왼쪽 상단 */}
            <div className="text-left">
              <span className="font-[700] text-[2rem] text-black">학생들의 가장 최근 대여</span>
            </div>
            {/* 렌트 기록이 없는 경우 */}
            {rentAdminDataList.length === 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="font-[700] text-[1.5rem] text-[#98A2B3] text-center">
                대여한 기록이 존재하지 않습니다.
              </span>
            </div>
            )}

            {/* 카드 항목들 */}
            <div className="w-full h-[18rem] flex flex-row flex-wrap gap-[0.625rem] mt-[1rem] overflow-scroll scrollbar-hide">
              {rentAdminDataList.map(({ rentalId, ...rent }) => (
                <RentDataAdmin key={rentalId} rentalId={rentalId} {...rent} />
              ))}
            </div>

            <div className="absolute top-[15px] right-[20px] flex items-center justify-center gap-[10px]">
              <div className="w-[210px] h-[46px] flex items-center justify-center font-semibold text-[16px] bg-[#D9D6FE] rounded-[6px] cursor-pointer"
              onClick={rentModalClick}>
                대여 기록 추가하기
              </div>
              <div className="w-[210px] h-[46px] flex items-center justify-center font-pretendard font-semibold text-[16px] bg-[#D9D6FE] rounded-[6px] cursor-pointer"
              onClick={() => setRequestBarOpen(true)}>
                대여 신청 확인하기
              </div>
            </div>

              {requestBarOpen && (
                <div className={`
                    absolute mt-[-2rem] right-0 w-[80%] h-full bg-[#D9D6FE] rounded-[10px]
                    ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}
                  `}>
                  <img src="./X.svg"
                    className="w-[26px] h-[26px] absolute top-[15px] right-[15px] cursor-pointer"
                    onClick={closeRequestBar}/>
                  <span className="font-pretendard font-bold text-[26px] relative top-[20px] left-[25px] cursor-pointer">
                    학생들의 대여 신청
                  </span>

                  <div className="relative max-w-[1260px] top-[50px] left-[35px] grid grid-flow-col auto-cols-[178px] overflow-scroll scrollbar-hide">
                    {requestRentDataList.map(({ rentalId, ...rentData }) => (
                      <RequestRentData
                        key={rentalId}
                        rentalId={rentalId}
                        {...rentData}
                        onRemove={handleRemoveRequest}/>))}
                  </div>
                </div>
              )}
            </div>

          <div className="w-[22rem] h-[21rem] rounded-[0.9375rem] pl-[1.56rem] pr-[1.56rem] bg-white flex flex-col items-center relative">
            <div className="w-full pt-[1.06rem]">
              <span className="text-black font-[700] text-[1.5rem]">침대 현황</span>
            </div>

            {/* 1번 침대 + 토글 */}
            <div className="flex flex-col items-center mt-[0.5rem]">
              <div
                className={`w-[19rem] h-[6.5rem] rounded-[0.9375rem] flex flex-col items-center justify-center gap-[0.94rem] ${
                  bedStatus.bed1 ? "bg-[#7CD4FD]" : "bg-[#F2F4F7]"
                }`}
                >
                <img className="w-[9rem] h-[3rem]" src={"/Bed.svg"} alt="Bed Icon" />
                <span className="text-[1.25rem] font-bold text-white">
                  {bedStatus.bed1 ? "침대 사용 가능" : "침대 사용 중"}
                </span>
              </div>

              {/* 1번 토글 */}
              <div className="mt-[0.3rem] ml-[17rem] cursor-pointer w-[2.5rem] h-[1.25rem] rounded-full bg-gray-300 relative"onClick={() => toggleBed("M")}>
                <div className={`w-[1.125rem] h-[1.125rem] rounded-full bg-white absolute top-[0.0625rem] transition-all duration-300 ${
                  bedStatus.bed1 ? "translate-x-[1.25rem]" : "translate-x-0"}`}/>
              </div>
            </div>

            {/* 2번 침대 + 토글 */}
            <div className="flex flex-col items-center mt-[0.2rem]">
              <div className={`w-[19rem] h-[6.5rem] rounded-[0.9375rem] flex flex-col items-center justify-center gap-[0.94rem] ${
                bedStatus.bed2 ? "bg-[#FEA3B4]" : "bg-[#F2F4F7]"}`}>
                <img className="w-[9rem] h-[3rem]" src={"/Bed.svg"} alt="Bed Icon" />
                <span className="text-[1.25rem] font-bold text-white">
                  {bedStatus.bed2 ? "침대 사용 가능" : "침대 사용 중"}
                </span>
              </div>

              {/* 2번 토글 */}
              <div className="mt-[0.3rem] ml-[17rem] cursor-pointer w-[2.5rem] h-[1.25rem] rounded-full bg-gray-300 relative" onClick={() => toggleBed("W")}>
                <div className={`w-[1.125rem] h-[1.125rem] rounded-full bg-white absolute top-[0.0625rem] transition-all duration-300 ${
                  bedStatus.bed2 ? "translate-x-[1.25rem]" : "translate-x-0"}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainAdmin
