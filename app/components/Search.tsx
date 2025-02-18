"use client";
import React, { useState } from "react";
import * as S from "../styles/Search";
import axios from "axios";

function Search() {
  const [StudnetNameData, setStudnetNameData] = useState([
    { id: 1, name: "진건희", class: "Name" },
    { id: 2, name: "박서현", class: "Name" },
    { id: 3, name: "이준건", class: "Name" },
  ]);

  const [searchName, setSearchName] = useState("");
  const [searchTable, setsearchTable] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  // 입력한 값과 일치하는 이름 필터링
  const filterName = StudnetNameData.filter((Stundetinfo) =>
    Stundetinfo.name.includes(searchName)
  );

  // 검색어가 입력되었을 때 테이블 표시
  React.useEffect(() => {
    if (searchName && filterName.length > 0) { 
      setsearchTable(true);
    } else {
      setsearchTable(false);
    }
  }, [searchName, filterName]);

  return (
    <>
      <S.Search
        className="search"
        placeholder="Search"
        onChange={onChange}
        value={searchName}
        src="Search.jpg"
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
              <li  key={name.id}>
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
