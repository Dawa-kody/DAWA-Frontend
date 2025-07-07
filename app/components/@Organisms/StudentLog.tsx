import React, { useState } from "react";
import * as S from "../../styles/StudentLog";
import axios from "axios";

type StudentSearchResult = {
  userId: string;
  userName: string;
  schoolNumber: string;
};

type StudentRecord = {
  yearMonthDay: string;
  schoolNumber: string;
  disease: string;
  content: string;
};

export function StudentLog() {
  const [username, setUsername] = useState("");
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [searchResults, setSearchResults] = useState<StudentSearchResult[]>([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/api/questionnaire/search?userName=${username}`,
        {},
        { headers: { "ngrok-skip-browser-warning": "69420" } }
      );

      if (!response.data.length) {
        alert("해당 학생을 찾을 수 없습니다.");
        setRecords([]);
        setSearchResults([]);
        return;
      }

      // 동명이인이 있는 경우
      if (response.data.length > 1) {
        setSearchResults(response.data);
        return;
      }

      const { userId, userName } = response.data[0];
      setDisplayName(userName);
      fetchStudentRecords(userId);
    } catch (err) {
      console.error("요청 실패:", err);
    }
  };

  const fetchStudentRecords = async (userId: string) => {
    const numericUserId = Number(userId);
    const recordResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/api/questionnaire/studentRecord/${numericUserId}`,
      { headers: { "ngrok-skip-browser-warning": "69420" } }
    );
    setRecords(recordResponse.data);
    setSearchResults([]); // 동명이인 목록 초기화
  };

  const handleSelectStudent = (student: StudentSearchResult) => {
    setDisplayName(student.userName);
    fetchStudentRecords(student.userId);
  };

  return (
    <S.Wrapper>
      <S.TopBar>
        <S.Title>학생 문진 기록 확인</S.Title>
        <S.SearchContainer>
          <S.SearchInput
            placeholder="학생 이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <S.SearchButton onClick={handleSubmit}>🔍</S.SearchButton>
        </S.SearchContainer>
      </S.TopBar>

      {searchResults.length > 1 ? (
        <>
          <S.ResultLabel>검색 결과:</S.ResultLabel>
          <S.ResultList>
            {searchResults.map((student) => (
              <S.ResultCard key={student.userId} onClick={() => handleSelectStudent(student)}>
                <div>
                  <strong>{student.schoolNumber}</strong> {student.userName}
                </div>
              </S.ResultCard>
            ))}
          </S.ResultList>
        </>
      ) : (
        <>
          <S.SelectedStudent>
            {displayName ? `${displayName} 학생` : "학생 이름을 입력하세요"}
          </S.SelectedStudent>
          <S.StyledTable>
            <S.Thead>
              <S.Tr>
                <S.Th>날짜</S.Th>
                <S.Th>학번</S.Th>
                <S.Th>병명</S.Th>
                <S.Th>처치</S.Th>
              </S.Tr>
            </S.Thead>
            <tbody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <S.Tr key={index}>
                    <S.Td>{record.yearMonthDay}</S.Td>
                    <S.Td>{record.schoolNumber}</S.Td>
                    <S.Td>{record.disease}</S.Td>
                    <S.Td>{record.content}</S.Td>
                  </S.Tr>
                ))
              ) : (
                <S.Tr>
                  <S.Td colSpan={4} style={{ textAlign: "center", color:"black"}}>
                    기록이 없습니다.
                  </S.Td>
                </S.Tr>
              )}
            </tbody>
          </S.StyledTable>
        </>
      )}
    </S.Wrapper>
  );
}