"use client";
import React, { useState } from "react";
import * as S from "../styles/Search";

function Search() {
  const [StudnetNameData, setStudnetNameData] = useState([
    { id: 1, name: "진건희",class:"Name"},
    { id: 2, name: "박서현",class:"Name"},
    { id: 3, name: "이준건",class:"Name"},
  ]);

  const [searchName, setSearchName] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };
  

  // 입력한 값과 일치하는 이름 필터링
  const filterName = StudnetNameData.filter((monsterinfo) =>
    monsterinfo.name.includes(searchName)
  );

  return (
    <>
      <S.Search
        className="search"
        placeholder="Search"
        onChange={onChange}
        value={searchName}
        src="Search.jpg"
      />
      <ul>
        {filterName.map((name) => (
          <li className="monster" key={name.id}>
            <S.Name>{name.name}</S.Name> 
          </li>
        ))}
      </ul>
    </>
  );
}

export default Search;
