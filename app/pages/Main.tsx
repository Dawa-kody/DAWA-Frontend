'use client';

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Nav from "../components/Nav";

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
  const [token, setToken] = useState<string | null>(null);

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

  const JWT_EXPIRY_TIME = 24 * 3600 * 100

  const onSilentRefresh = async (access: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}`,
        { access: access },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { access, refresh } = response.data;

        localStorage.setItem("access", JSON.stringify(access));
        localStorage.setItem("refresh", JSON.stringify(refresh));

        setTimeout(() => onSilentRefresh(access), JWT_EXPIRY_TIME - 60000);
      }
    } catch (error: any) {
      console.error("Error while refreshing token:", error);
    }
  };
  
  useEffect(() => {
    // 클라이언트 사이드에서만 localStorage에 접근
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem('access');
      if (storedToken) {
        setToken(storedToken); // 값이 존재하면 상태 업데이트
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const userRole = decodedToken?.role || "UNKNOWN";
        console.log("유저 권한:", userRole);
        setAdmin(userRole === "ROLE_TEACHER");
      } catch (error) {
        console.error("토큰 에러:", error);
        setAdmin(false); // 기본값 설정
      }
    } else {
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

        console.log(response.data);

        if (Array.isArray(response.data)) {
          setVisitAdminDataList(response.data);
        } else {
          setVisitAdminDataList([]);
        }
      } catch (error) {
        console.error("모든 학생 방문 기록 데이터를 불러오는 중 에러 발생:", error);
      }
    }
    fetchVisitAdminData();
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
  }, [token]);

  useEffect(() => {
    async function fetchAdminRentData() {
      try {
        const response = await axios.get<RentAdminDatas[]>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/allRental`,
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
          setRentAdminDataList(response.data);
        } else {
          setRentAdminDataList([]);
        }
      } catch (error) {
        console.error("모든 학생 대여 기록 데이터를 불러오는 중 에러 발생:", error);
      }
    }
    fetchAdminRentData();
  }, [token]);

  useEffect(() => {
    // 침대 상태를 서버에서 가져옴
    async function fetchBedStatus() {
      try {
        const response = await axios.get<{ bed1: boolean; bed2: boolean }>(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/bed`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
            withCredentials: true,
          },
        });

        setBedStatus(response.data); // 서버에서 받아온 침대 상태를 설정
      } catch (error) {
        console.error("침대 상태를 가져오는 중 에러 발생:", error);
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
          withCredentials: true,
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
            'ngrok-skip-browser-warning': '69420',
            withCredentials: true,
          },
        });

        setBedStatus(response.data);  // 서버로부터 받은 침대 상태로 업데이트
      } catch (error) {
        console.error('침대 상태를 불러오는 중 에러 발생:', error);
      }
    };

    fetchBedStatus();
    }, [token]);  // 컴포넌트가 마운트될 때 한 번만 실행
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
