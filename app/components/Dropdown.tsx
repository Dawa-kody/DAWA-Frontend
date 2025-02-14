import React, { useState, useEffect, useRef } from "react";
import * as S from "../styles/Dropdown";

interface DropdownProps {
  data: string[];
}

export const Dropdown: React.FC<DropdownProps> = ({ data = [] }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState<string>(data[0] || "초기값");
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // 드롭다운 값 변경 처리 함수
  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value") || "";
    setCurrentValue(value);  // 클릭한 값을 currentValue로 설정
    setShowOptions(false);  // 드롭다운 닫기
  };

  useEffect(() => {
    // Dropdown 바깥쪽 클릭 시 옵션 닫기
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

  // 드롭다운 상자를 클릭하면 드롭다운 열리기
  const handleDropdownClick = () => {
    setShowOptions((prev) => !prev);  // showOptions 상태 토글
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
