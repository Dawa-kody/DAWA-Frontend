"use client";
import * as S from "../styles/Search";
import React, { useState } from "react";

function Monsters() {
  // 직접 설정한 이름 목록
  const [monstersData, setMonstersData] = useState([
    { id: 1, name: "진건희", email: "jkh@example.com" ,class:"Name"},
    { id: 2, name: "박서현", email: "psh@example.com" ,class:"Name"},
    { id: 3, name: "이준건", email: "ljg@example.com" ,class:"Name"},
  ]);

  const [searchMonster, setSearchMonster] = useState("");

  const onChange = (e) => {
    setSearchMonster(e.target.value);
  };

  // 입력한 값과 일치하는 이름 필터링
  const filterMonster = monstersData.filter((monsterinfo) =>
    monsterinfo.name.includes(searchMonster)
  );

  return (
    <>
      <S.Search
        className="search"
        placeholder="Search"
        onChange={onChange}
        value={searchMonster}
      />
      <ul>
        {filterMonster.map((monster) => (
          <li className="monster" key={monster.id}>
            <S.Name>{monster.name}</S.Name> 
            <S.Name>{monster.email}</S.Name>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Monsters;
