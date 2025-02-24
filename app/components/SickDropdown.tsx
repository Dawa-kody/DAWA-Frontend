'use client';
import React, { useState, useEffect, useRef } from "react";
import * as S from "../styles/SickDropdown";

interface DropdownProps {
  data: string[];
  onChange: (sickCategory: string) => void; // onChange 속성 추가
}

const Dropdown: React.FC<DropdownProps> = ({ data = [], onChange }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState<string>(data[0] || "초기값");
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value") || "";
    setCurrentValue(value);
    onChange(value); // onChange 호출
    setShowOptions(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <S.SelectBox onClick={handleDropdownClick} ref={selectRef}>
      <S.Label>{currentValue}</S.Label>
      <S.SelectOptions show={showOptions}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <S.Option key={index} data-value={item} onClick={handleOnChangeSelectValue}>
              {item}
            </S.Option>
          ))
        ) : (
          <S.Option data-value="없음" onClick={(e) => e.stopPropagation()}>
            데이터 없음
          </S.Option>
        )}
      </S.SelectOptions>
    </S.SelectBox>
  );
};

export default Dropdown;

