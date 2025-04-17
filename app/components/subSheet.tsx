import React, { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "호흡기계", "소화기계", "순환기계", "정신신경계", "근골격계", "피부피하계",
  "비뇨생식기계", "구강치아계", "이비인후과계", "안과계", "감염병", "상담", "기타", "계"
];

function SubSheet() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios.get("${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/questionnaire/date")
      .then((res) => setData(res.data.groupedStatistics))
      .catch((err) => console.error("데이터 로딩 오류:", err));
  }, []);

  // 각 카테고리의 값을 출력하는 함수
  const renderCategoryRow = (type: string, gender: "남" | "여") => {
    const rowData = data?.[type]?.[gender] || {};
    return (
      <>
        <td className="border border-gray-300 p-2 bg-white">{gender}</td>
        {categories.map((category, idx) => (
          <td key={idx} className="border border-gray-300 p-2 bg-white">
            {rowData[category] ?? 0}
          </td>
        ))}
      </>
    );
  };

  return (
    <table className="table-auto border-collapse border text-black border-gray-300 w-full text-center">
      <thead className="bg-gray-100">
        <tr className="bg-tableheader">
          <th className="border border-gray-300 p-2">종류</th>
          <th className="border border-gray-300 p-2">성별</th>
          {categories.map((category, idx) => (
            <th key={idx} className="border border-gray-300 p-2">{category}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {["일계", "월계", "누계"].map((type, idx) => (
          <React.Fragment key={idx}>
            <tr>
              <td className="border border-gray-300 p-2 bg-white" rowSpan={2}>{type}</td>
              {renderCategoryRow(type, "남")}
            </tr>
            <tr>{renderCategoryRow(type, "여")}</tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default SubSheet;
