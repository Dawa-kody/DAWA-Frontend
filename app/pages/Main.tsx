'use client';

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";
import { useStore } from "@/store/useRentDataStore";
import { useRouter } from "next/navigation";

import Nav from "../organisms/Nav";
import VisitModal from "../organisms/VisitModal";
import RentModal from "../organisms/RentModal";
import VisitData from "../molecules/VisitData";
import RentData from "../molecules/RentData";

import { VisitDatas } from "../molecules/VisitData";
import { RentDatas } from "../molecules/RentData";

// JWT 디코딩 결과를 위한 타입 정의
interface DecodedToken {
  role: string; // JWT에 포함된 'role' 속성
  exp?: number; // 만료 시간 (선택적)
}


function Main() {
  const router = useRouter();
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [TActive, setTActive] = useState(false); // 선생님 부재중, 출근중 상태
  const [BActive, setBActive] = useState(true); // 침대 현황 상태

  const { rentDataList, setRentDataList, visitDataList, setVisitDataList } = useStore();
  const [bedStatus, setBedStatus] = useState<{ bed1: boolean; bed2: boolean }>({
    bed1: true,
    bed2: true,
  }); // 침대 상태 관리

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_TEACHER") {
      router.push("/MainAdmin");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchVisitData() {
      try {
        const response = await axios.get<VisitDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/visit`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
              withCredentials: true,
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
  }, [token]);

  useEffect(() => {
    async function fetchRentData() {
      try {
        const response = await axios.get<RentDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420',
              withCredentials: true,
            },
          }
        );
        if (Array.isArray(response.data)) {
          setRentDataList(response.data);
        } else {
          setRentDataList([]);
        }
      } catch (error) {
        console.error("대여 기록 데이터를 불러오는 중 에러 발생:", error);
      }
    }
  
    fetchRentData(); // 최초 1회
  
    const intervalId = setInterval(fetchRentData, 5000); // 5초마다 갱신
  
    return () => clearInterval(intervalId); // 언마운트 시 인터벌 제거
  }, [token, setRentDataList]);

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

  function visitModalClick() {
    setVisitModalOpen(true);
  }

  function rentModalClick() {
    setRentModalOpen(true);
  }

  return (
    <>
      {visitModalOpen && (
        <VisitModal onClose={() => setVisitModalOpen(false)} />
      )}
      {rentModalOpen && (
        <RentModal onClose={() => setRentModalOpen(false)} />
      )}

      <Nav />
      <div id="Container" className="w-full h-full flex flex-col overflow-hidden pt-[2.44rem] pl-[2.1875rem] pr-[2.1875rem]">
        <div id="topdiv" className="flex w-full h-full gap-[2rem]">
          <div>
            <div className=" w-[22.4375rem] h-[6.1875rem] flex items-center bg-white rounded-[0.58988rem] pl-[1.5rem] gap-[4.56rem]">
              <div className=" w-[4rem] h-[4rem] bg-dawapurple rounded-[0.3125rem] flex justify-center items-center">
                <img className=" w-[2.5rem] h-[2.5rem]" src={"/people.svg"} />
              </div>
              {TActive ? (
                <span className="text-[1.5625rem] font-[700] text-dawapurple">선생님 출근중</span>
              ) : (
                <span className="text-[1.625rem] font-[700] text-[#98A2B3]">선생님 부재중</span>
              )}
            </div>

            <div className=" w-[22.4375rem] h-[10.375rem] flex gap-4 mt-[1.69rem] flex-row">
              <div className=" w-[11.1875rem] h-[12.375rem] flex items-center justify-center text-white bg-dawapurple rounded-[0.58988rem] text-[1.5rem] font-[700]"
                onClick={visitModalClick}>방문기록 작성</div>
              <div className=" w-[11.1875rem] h-[12.375rem] flex items-center justify-center text-white bg-dawapurple rounded-[0.58988rem] text-[1.5rem] font-[700]"
                onClick={rentModalClick}>물품 대여</div>
            </div>
          </div>
          
            <div className="w-[90.25rem] h-[20.25rem] flex flex-col bg-white rounded-[0.625rem] px-[2.38rem] pt-[2.06rem] gap-[0.625rem] relative">
              {/* 제목: 왼쪽 상단 */}
              <div className="text-left">
                <span className="font-[700] text-[2rem] text-black">대여기록</span>
              </div>

              {/* 렌트 기록이 없는 경우 */}
              {rentDataList.length === 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="font-[700] text-[1.5rem] text-[#98A2B3] text-center">
                    대여한 기록이 존재하지 않습니다.
                  </span>
                </div>
              )}
              <div className="w-[18.66331rem] h-[18rem] flex mt-[1rem] overflow-scroll scrollbar-hide">
                {rentDataList.map(({ id, ...visit }) => (
                  <RentData key={id} {...visit} />
                ))}
              </div>
            </div>

        </div>

        <div className="w-full mt-[2.38rem] flex gap-[2rem]">
          <div className="w-[90.25rem] h-[23.375rem] flex  gap-[2rem] pl-[2.38rem] pt-[2.06rem] bg-white rounded-[0.625rem] relative">
            <div className="text-left">
              <span className="text-[2.1875rem] font-[700] text-black">방문기록</span>
            </div>
            {/* 방문 기록이 없는 경우 */}
            {visitDataList.length === 0 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-[1.5rem] font-[700] text-[#98A2B3]">방문한 기록이 존재하지 않습니다.</span>
              </div>
            )}
            <div className="w-[18.66331rem] h-[18rem] flex flex-row gap-[1.5rem]">
              {visitDataList.map(({ id, ...visit }) => (
                <VisitData key={id} {...visit} />
              ))}
            </div>
          </div>

          <div className="w-[23.4375rem] h-[23.375rem] rounded-[0.9375rem] pl-[1.56rem] pr-[1.56rem] bg-white flex flex-col items-center relative">
            <div className="w-full pt-[1.06rem]">
              <span className="text-black font-[700] text-[1.875rem]">침대 현황</span>
            </div>

            <div className={`w-[20rem] h-[7.75rem] rounded-[0.9375rem] mt-[1rem] flex flex-col items-center justify-center gap-[0.94rem] ${bedStatus.bed1 ? 'bg-[#7CD4FD]' : 'bg-[#F2F4F7]'}`}>
              <img className="w-[9.5rem] h-[3.75rem]" src={"/Bed.svg"} />
              {bedStatus.bed1 ? <span className="text-[1.25rem] font-bold text-white">침대 사용 가능</span> : <span className="text-[1.25rem] font-bold text-white">침대 사용 중</span>}
            </div>

            <div className={`w-[20rem] h-[7.75rem] rounded-[0.9375rem] mt-[1.87rem] flex flex-col items-center justify-center gap-[0.94rem] ${bedStatus.bed2 ? 'bg-[#FEA3B4]' : 'bg-[#F2F4F7]'}`}>
              <img className="w-[9.5rem] h-[3.75rem]" src={"/Bed.svg"} />
              {bedStatus.bed2 ? <span className="text-[1.25rem] font-bold text-white">침대 사용 가능</span> : <span className="text-[1.25rem] font-bold text-white">침대 사용 중</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
