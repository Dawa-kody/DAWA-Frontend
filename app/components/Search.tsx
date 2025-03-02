import React, { useState, useEffect } from "react";
import * as S from "../styles/Search"; // 스타일 컴포넌트 import
import axios from "axios"; // axios import

// 학생 데이터 타입 정의
interface Student {
  id: number; 
  name: string; 
}
// 학생 기록 데이터 타입 정의
interface StudentRecord {
  date: string; 
  classId: number; 
  sickCategory: string; 
  treatment: string; 
}

function Search() {
  const [studentNameData, setStudentNameData] = useState<Student[]>([]); // 학생 이름 데이터 저장
  const [searchName, setSearchName] = useState(""); // 검색어 저장
  const [searchTable, setSearchTable] = useState(false); // 검색 결과 표시 여부
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>([]); // 선택된 학생의 기록 저장

  // 검색어 변경 시 호출되는 함수
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value); // 입력값 업데이트
  };

  // 학생 데이터 가져오기
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/questionnaire/search`);
        setStudentNameData(response.data); 
      } catch (error) {
        console.error("학생 데이터 가져오기 실패", error); 
      }
    };

    fetchStudentData(); 
  }, []);

  // 학생 이름 검색 필터
  const filterName = studentNameData.filter((studentInfo) =>
    studentInfo.name.includes(searchName) // 검색어 포함 여부 확인
  );

  // 검색어 및 필터링된 이름 변경 시 검색 결과 표시 여부 업데이트
  useEffect(() => {
    setSearchTable(searchName.length > 0 && filterName.length > 0);
  }, [searchName, filterName]);

  // 학생 이름 클릭 시 상세 기록 가져오기
  const handleStudentClick = async (name: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/${name}`); 
      setStudentRecords(response.data);
    } catch (error) {
      console.error("학생 상세 정보 가져오기 실패", error); 
    }
  };

  return (
    <>
      <S.Search
        className="search"
        placeholder="Search"
        onChange={onChange} 
        value={searchName} 
      />
      {searchTable && (
        <S.CardContainer>
          {filterName.map((student) => (
            <S.StudentCard key={student.id} onClick={() => handleStudentClick(student.name)}>
              <S.StudentName>{student.name}</S.StudentName>
            </S.StudentCard>
          ))}
        </S.CardContainer>
      )}

      {studentRecords.length > 0 && (
        <S.DetailsContainer>
          {studentRecords.map((record, index) => (
            <S.RecordCard key={index}>
              <S.RecordDate>최근 문진 날짜: {record.date}</S.RecordDate>
              <S.RecordClassId>{record.classId} {record.sickCategory}</S.RecordClassId>
              <S.RecordTreatment>처치: {record.treatment}</S.RecordTreatment>
            </S.RecordCard>
          ))}
        </S.DetailsContainer>
      )}
    </>
  );
}

export default Search;
