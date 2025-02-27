import React, { useState, useEffect } from "react";
import * as S from "../styles/Search";
import axios from "axios";


interface Student {
  id: number;
  name: string;
}


function Search() {
  const [studentNameData, setStudentNameData] = useState<Student[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchTable, setSearchTable] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  // API에서 학생 데이터 가져오기
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/students");
        setStudentNameData(response.data);
      } catch (error) {
        console.error("table 데이터 가져오기 실패", error);
      }
    };

    fetchStudentData();
  }, []);

  // 입력한 값과 일치하는 이름 필터링
  const filterName = studentNameData.filter((studentInfo) =>
    studentInfo.name.includes(searchName)
  );

  // 검색어가 입력되었을 때 테이블 표시
  useEffect(() => {
    setSearchTable(searchName.length > 0 && filterName.length > 0);
  }, [searchName, filterName]);


  return (
    <>
      <S.Search
        className="search"
        placeholder="Search"
        onChange={onChange}
        value={searchName}
      />
      
      {searchTable && (
        <S.Table>
          <thead>
            <tr>
              <S.DateTh scope="col">날짜</S.DateTh>
              <S.ClassTh scope="col">학번</S.ClassTh>
              <S.SickTh scope="col">병명</S.SickTh>
              <S.HandleTh as="th" scope="col">처치</S.HandleTh>
            </tr>
          </thead>
          <ul>
            {filterName.map((name) => (
              <li key={name.id}>
                <S.Name>{name.name}</S.Name>
              </li>
            ))}
          </ul>
        </S.Table>
      )}
    </>
  );
}

export default Search;
