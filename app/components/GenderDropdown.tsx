'use client';
import React, { useState, useEffect, useRef } from "react";
import * as S from "../styles/GenderDropdown";

interface DropdownProps {
  data: string[];
  onChange: (gender: "남성" | "여성") => void;
  value: "" | "남성" | "여성";
}


const Dropdown: React.FC<DropdownProps> = ({ data = [], onChange }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState<"남성" | "여성" | "">(data[0] as "남성" | "여성" || "");
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value") as "남성" | "여성" || "";
    setCurrentValue(value);
    if (value === "남성" || value === "여성") {
      onChange(value);
    }
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
      <S.Label>{currentValue || "초기값"}</S.Label>
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
