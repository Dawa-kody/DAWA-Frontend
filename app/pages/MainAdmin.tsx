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

    const [TActive, setTActive] = useState(false); // 선생님 부재중, 출근중 상태...     const [BActive, setBActive] = useState(true); // 침대 현황 상태
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
    // Fetch data initially
    fetchAdminRentData();
    fetchAdminRequestRentData();

    // Set up interval to refetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchAdminRentData();
      fetchAdminRequestRentData();
    }, 5000); // Adjust the interval as needed (e.g., 5000 for 5 seconds)

    // Clean up the interval when the component unmounts
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
      <div
        id="Container"
        className="w-full h-full flex flex-col overflow-hidden pt-[2.44rem] pl-[2.1875rem] pr-[2.1875rem]"
      >
        <div id="topdiv" className="flex flex-row w-full h-full gap-[2rem]">
          <div id="topPosition" className="flex flex-row gap-[1rem]">
            <div className="flex flex-col">
              {/* 선생님 현황 */}
              <div className="w-[22.4375rem] h-[6.1875rem] flex items-center bg-white rounded-[0.58988rem] pl-[1.5rem] gap-[4.56rem]">
                <div className="w-[4rem] h-[4rem] bg-dawapurple rounded-[0.3125rem] flex justify-center items-center">
                  <img className="w-[2.5rem] h-[2.5rem]" src={"/people.svg"} />
                </div>
                {TActive ? (
                  <span className="text-[1.5625rem] font-[700] text-dawapurple">선생님 출근중</span>
                ) : (
                  <span className="text-[1.625rem] font-[700] text-[#98A2B3]">선생님 부재중</span>
                )}
              </div>

              {/* 문진표 작성 */}
              <div className="w-[22.4375rem] h-[10.375rem] flex gap-4 mt-[1.69rem] flex-col">
                <div className="w-full h-full bg-white rounded-[8px] flex-col flex">
                  <p className="font-[pretendard] font-bold text-[2rem] pt-[1rem] pl-[1.2rem]">문진표 작성</p>
                  <div className="w-full h-full flex flex-col items-center relative top-[40px]">
                    <button className="w-[20.5rem] h-[2.8125rem] bg-dawapurple text-white font-[pretendard] rounded-[0.63rem]">
                      문진표 작성
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[80rem] h-[18.25rem] flex flex-col bg-white rounded-[0.625rem] px-[2.38rem] pt-[2.06rem] gap-[0.625rem] relative">
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
              <div
                className="w-[210px] h-[46px] flex items-center justify-center font-semibold text-[16px] bg-[#D9D6FE] rounded-[6px] cursor-pointer"
                onClick={rentModalClick}
              >
                대여 기록 추가하기
              </div>
                <div
                  className="w-[210px] h-[46px] flex items-center justify-center font-pretendard font-semibold text-[16px] bg-[#D9D6FE] rounded-[6px] cursor-pointer"
                  onClick={() => setRequestBarOpen(true)}
                >
                  대여 신청 확인하기
                </div>
              </div>

              {requestBarOpen && (
                <div
                  className={`
                    absolute mt-[-2rem] right-0 w-[80%] h-full bg-[#D9D6FE] rounded-[10px]
                    ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}
                  `}
                >
                  <img
                    src="./X.svg"
                    className="w-[26px] h-[26px] absolute top-[15px] right-[15px] cursor-pointer"
                    onClick={closeRequestBar}
                  />
                  <span
                    className="font-pretendard font-bold text-[26px] relative top-[20px] left-[25px] cursor-pointer"
                  >
                    학생들의 대여 신청
                  </span>

                  <div
                    className="relative max-w-[1260px] top-[50px] left-[35px] grid grid-flow-col auto-cols-[178px] overflow-scroll scrollbar-hide"
                  >
                    {requestRentDataList.map(({ rentalId, ...rentData }) => (
                      <RequestRentData
                        key={rentalId}
                        rentalId={rentalId}
                        {...rentData}
                        onRemove={handleRemoveRequest}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full mt-[2.38rem] flex gap-[2rem]">
          <div className="w-[78.25rem] h-[26.375rem] bg-white rounded-[0.625rem] pl-[2.38rem] pt-[2.06rem] relative flex flex-col gap-[2rem]">
            {/* 방문기록 타이틀 */}
            <div className="text-left">
              <span className="text-[2.1875rem] font-[700] text-black whitespace-nowrap">학생들의 가장 최근 방문기록</span>
            </div>

            {/* 방문 기록이 없는 경우 */}
            {visitAdminDataList.length === 0 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-[1.5rem] font-[700] text-[#98A2B3]">
                  방문한 기록이 존재하지 않습니다.
                </span>
              </div>
            )}

            {/* 방문 기록 카드 리스트 (가로 스크롤) */}
            <div className="w-full h-[18rem] flex flex-row gap-[1.5rem] overflow-scroll scrollbar-hide pr-[2.38rem]">
              {visitAdminDataList.map(({ id, ...visit }) => (
                <VisitDataAdmin key={id} {...visit} />
              ))}
            </div>
          </div>

          <div className="w-[23.4375rem] h-[26.375rem] rounded-[0.9375rem] pl-[1.56rem] pr-[1.56rem] bg-white flex flex-col items-center relative">
            <div className="w-full pt-[1.06rem]">
              <span className="text-black font-[700] text-[1.875rem]">침대 현황</span>
            </div>

            {/* 1번 침대 + 토글 */}
            <div className="flex flex-col items-center mt-[1rem]">
              <div
                className={`w-[20rem] h-[7.75rem] rounded-[0.9375rem] flex flex-col items-center justify-center gap-[0.94rem] ${
                  bedStatus.bed1 ? "bg-[#7CD4FD]" : "bg-[#F2F4F7]"
                }`}
              >
                <img className="w-[9.5rem] h-[3.75rem]" src={"/Bed.svg"} alt="Bed Icon" />
                <span className="text-[1.25rem] font-bold text-white">
                  {bedStatus.bed1 ? "침대 사용 가능" : "침대 사용 중"}
                </span>
              </div>

              {/* 1번 토글 */}
              <div
                className="mt-[0.5rem] ml-[17rem] cursor-pointer w-[2.5rem] h-[1.25rem] rounded-full bg-gray-300 relative"
                onClick={() => toggleBed("M")}
              >
                <div
                  className={`w-[1.125rem] h-[1.125rem] rounded-full bg-white absolute top-[0.0625rem] transition-all duration-300 ${
                    bedStatus.bed1 ? "translate-x-[1.25rem]" : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            {/* 2번 침대 + 토글 */}
            <div className="flex flex-col items-center mt-[1rem]">
              <div
                className={`w-[20rem] h-[7.75rem] rounded-[0.9375rem] flex flex-col items-center justify-center gap-[0.94rem] ${
                  bedStatus.bed2 ? "bg-[#FEA3B4]" : "bg-[#F2F4F7]"
                }`}
              >
                <img className="w-[9.5rem] h-[3.75rem]" src={"/Bed.svg"} alt="Bed Icon" />
                <span className="text-[1.25rem] font-bold text-white">
                  {bedStatus.bed2 ? "침대 사용 가능" : "침대 사용 중"}
                </span>
              </div>

              {/* 2번 토글 */}
              <div
                className="mt-[0.5rem] ml-[17rem] cursor-pointer w-[2.5rem] h-[1.25rem] rounded-full bg-gray-300 relative"
                onClick={() => toggleBed("W")}
              >
                <div
                  className={`w-[1.125rem] h-[1.125rem] rounded-full bg-white absolute top-[0.0625rem] transition-all duration-300 ${
                    bedStatus.bed2 ? "translate-x-[1.25rem]" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainAdmin
