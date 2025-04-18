import React from "react";
import { useCalendarStore } from "@/store/useCalendarStore";

const categories = [
  "호흡기계", "소화기계", "순환기계", "정신신경계", "근골격계", "피부피하계",
  "비뇨생식기계", "구강치아계", "이비인후과계", "안과계", "감염병", "상담", "기타", "계"
] as const;

function SubSheet() {
  const statistics = useCalendarStore((state) => state.statistics);

  const renderCategoryRow = (
    type: "일계" | "월계" | "누계",
    gender: "남" | "여"
  ) => {
    
  const rowData = statistics[type][gender];

  return (
    <>
      <td className="border border-gray-300 p-2 bg-white">{gender}</td>
        {categories.map((category) => (
          <td key={category} className="border border-gray-300 p-2 bg-white">
            {rowData[category] ?? 0}
          </td>
        ))}
      </>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border text-black border-gray-300 w-full text-center">
        <thead className="bg-gray-100">
          <tr className="bg-tableheader">
            <th className="border border-gray-300 p-2">종류</th>
            <th className="border border-gray-300 p-2">성별</th>
            {categories.map((category) => (
              <th key={category} className="border border-gray-300 p-2">
                {category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {statistics ? (
            (["일계", "월계", "누계"] as const).map((type) => (
              <React.Fragment key={type}>
                <tr>
                  <td className="border border-gray-300 p-2 bg-white" rowSpan={2}>
                    {type}
                  </td>
                  {renderCategoryRow(type, "남")}
                </tr>
                <tr>{renderCategoryRow(type, "여")}</tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={16} className="p-4 text-center">
                데이터 로딩 중...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubSheet;
