// app/pages/mainAdmin.tsx
'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "@/store/useRentDataStore"; // 경로는 알맞게 조정
import { useRouter } from "next/navigation";

import Nav from "../organisms/Nav";
import RentDataAdmin from "../molecules/RentDataAdmin";
import RentModal from "@/organisms/RentModalAdmin";
import { VisitAdminDatas } from "../molecules/VisitDataAdmin";
import { RentAdminDatas } from "../molecules/RentDataAdmin";
import { RequestRentDatas } from "@/molecules/RequestRentData";
import RequestRentData from "@/molecules/RequestRentData";
import NoticeModal from "@/organisms/NoticeModal";
import Weather from "@/organisms/WeatherContent";
import NoticeWrite from "@/organisms/noticeWrite";

interface noticeDTO {
  id: number;
  title: string;
  yearMonthDay: string;
}

function MainAdmin() {
    const router = useRouter();
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
    
    const [noticeList, setNoticeList] = useState<noticeDTO[]>([]);
    const [selectedNotice, setSelectedNotice] = useState<noticeDTO | null>(null);
    const [writeNotice, setWriteNotice] = useState<boolean>(false);

    const {
      rentAdminDataList,
      setRentAdminDataList,
      setVisitAdminDataList,
      requestRentDataList,
      setRequestRentDataList,
    } = useStore();
    
    const goWrite = () => router.push("/Writepage")

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
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
          setToken(storedToken);
        }
      }
    }, []);
  
    useEffect(() => {
      async function fetchNotice() {
        try {
          const response = await axios.get<noticeDTO[]>(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/notice`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420',
                withCredentials: true,
              },
            }
          );
    
          if (Array.isArray(response.data)) {
            setNoticeList(response.data);
    
            const firstNoticeId = response.data[0]?.id; // 첫 번째 공지사항의 id
            if (firstNoticeId) {
              const detailRes = await axios.get<noticeDTO>(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/notice/${firstNoticeId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': '69420',
                    withCredentials: true,
                  },
                }
              );
              console.log("상세 공지사항:", detailRes.data);
            }
          } else {
            setNoticeList([]);
          }
        } catch (error) {
          console.error("공지사항 데이터를 불러오는 중 에러 발생:", error);
        }
      }
    
      if (token) {
        fetchNotice();
      }
    }, [token]);

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
    };
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
  }

  return (
    <>
      {rentModalOpen === true && (
        <>
          <RentModal onClose={()=> setRentModalOpen(false)} />
        </>
      )}

      {selectedNotice !== null && (
        <>
          <NoticeModal
            id={selectedNotice.id}
            onClose={() => setSelectedNotice(null)}
          />
        </>
      )}
      
      {writeNotice && (
        <>
          <NoticeWrite onClose={() => setWriteNotice(false)}/>
        </>
      )}

      <Nav />
      <div id="Container" className="w-full h-[90vh] flex flex-col overflow-hidden pt-[2rem] gap-[2rem] px-[2vw]">
        
        <div id="topdiv" className="flex w-full h-[30vh] gap-[2vw]">
          <div id="topleft" className="w-[20vw] h-full flex flex-col gap-[2rem] justify-between">
            {/* 선생님 현황 */}
            <div className="w-full h-[10vh] flex items-center justify-between bg-white rounded-[0.58988rem] px-[1.5rem]">
              <div className="w-[2.5rem] h-[2.5rem] bg-primaryPurple rounded-[0.3125rem] flex justify-center items-center">
                <img className="w-[1.5rem] h-[1.5rem]" src={"/people.svg"} />
              </div>
              <div>
              {TActive ? (
                <span className="text-[1rem] font-[700] text-primaryPurple">선생님 출근중</span>
              ) : (
                <span className="text-[1em] font-[700] text-[#98A2B3]">선생님 부재중</span>
              )}
              </div>
            </div>
            {/* 문진표 작성 */}
            <div className="w-full h-[16vh] bg-primaryPurple rounded-[0.58988rem] flex items-center justify-center cursor-pointer"
            onClick={goWrite}>
              <span className="text-[1.5rem] text-white font-[700] font-pretendard">
                문진표 작성
              </span>
            </div>
          </div>
          {/* 공지사항 */}
          <div id="notice" className="w-[60vw] flex flex-col bg-white">
            <div id="title" className="w-full pl-[1rem] pr-[1rem] pt-[0.75rem] flex flex-row justify-between ">
              <span className=" text-black text-[1.5rem] font-[700]">공지사항</span>
              <button className="w-[10rem] h-[2.5rem] bg-subPurple text-black font-[500] text-[1rem] rounded-[0.3125rem]" onClick={() => setWriteNotice(true)}>공지사항 작성</button>
            </div> 
            <div id="noticeroll" className="w-full h-[8rem] overflow-y-auto scrollbar-hide px-4 py-2"> 
              {noticeList.length === 0 ? (
                <span className="text-[#98A2B3]">공지사항이 없습니다.</span>
              ) : (
                noticeList.map((notice, idx) => (
                  <button key={idx} className="w-full text-left mb-2 p-2 flex flex-row justify-between rounded bg-noticeGray hover:bg-gray-100 transition" onClick={() => setSelectedNotice(notice)}>
                    <div id="noticeTitle" className="font-bold text-black text-[1rem]">{notice.title}</div>
                    <div className=" flex gap-[2rem]">
                        <span className="text-noticeText text-[0.75rem]">보건선생님</span>
                        <span className="text-noticeText text-[0.75rem]">{new Date(notice.yearMonthDay).toLocaleDateString()}</span>
                      </div>
                  </button>
                ))
              )}
            </div>
            </div>
          {/* 캘린더*/}
          <Weather />
          </div> {/* topdiv 끝나는 지점점 */}

        <div id="contentDiv" className="w-full h-[48vh] flex justify-between">

          <div className="w-[75vw] h-full flex flex-col bg-white rounded-[0.625rem] px-[2.38rem] pt-[2.06rem] gap-[0.625rem] relative">

            {/* 제목: 왼쪽 상단 */}
            <div className="text-left">
              <span className="font-[700] text-[2rem] text-black">학생들의 가장 최근 대여</span>
            </div>

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

          <div className="w-[20vw] h-full rounded-[0.9375rem] pl-[1.56rem] pr-[1.56rem] bg-white flex flex-col items-center justify-center relative gap-[1rem]">
            <div className="w-full pt-[1.06rem] absolute top-[1vh] left-[1vw]">
              <span className="text-black font-[700] text-[1.5rem]">침대 현황</span>
            </div>

            {/* 1번 침대 + 토글 */}
            <div className="flex flex-col items-center mt-[5rem]">
              <div
                className={`w-[18vw] h-[6.5rem] rounded-[0.9375rem] flex flex-col items-center justify-center gap-[0.94rem] ${
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
              <div className={`w-[18vw] h-[6.5rem] rounded-[0.9375rem] flex flex-col items-center justify-center gap-[0.94rem] ${
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
