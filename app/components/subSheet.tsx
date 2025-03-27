import React from "react";

function SubSheet() {
  return (
    <table className="table-auto border-collapse border text-black   border-gray-300 w-full text-center">
      <thead className="bg-gray-100">
        <tr className="bg-tableheader">
          <th className="border border-gray-300 p-2">종류</th>
          <th className="border border-gray-300 p-2">성별</th>
          <th className="border border-gray-300 p-2">호흡기계</th>
          <th className="border border-gray-300 p-2">소화기계</th>
          <th className="border border-gray-300 p-2">순환기계</th>
          <th className="border border-gray-300 p-2">정신신경계</th>
          <th className="border border-gray-300 p-2">근골격계</th>
          <th className="border border-gray-300 p-2">피부피하계</th>
          <th className="border border-gray-300 p-2">비뇨생식기계</th>
          <th className="border border-gray-300 p-2">구강치아계</th>
          <th className="border border-gray-300 p-2">이비인후과계</th>
          <th className="border border-gray-300 p-2">안과계</th>
          <th className="border border-gray-300 p-2">감염병</th>
          <th className="border border-gray-300 p-2">상담</th>
          <th className="border border-gray-300 p-2">기타</th>
          <th className="border border-gray-300 p-2">계</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 p-2 bg-white" rowSpan={2}>일계</td>
          <td className="border border-gray-300 p-2 bg-white">남</td>
          {Array(14).fill(0).map((value, index) => (<td key={index} className="border border-gray-300 p-2 bg-white">{value}</td>))}
        </tr>
        <tr>
          <td className="border border-gray-300 p-2 bg-white">여</td>
          {Array(14).fill(0).map((value, index) => (<td key={index} className="border border-gray-300 p-2 bg-white">{value}</td>))}
        </tr>
        <tr>
          <td className="border border-gray-300 p-2 bg-white" rowSpan={2}>월계</td>
          <td className="border border-gray-300 p-2 bg-white">남</td>
          {Array(14).fill(0).map((value, index) => (<td key={index} className="border border-gray-300 p-2 bg-white">{value}</td>))}
        </tr>
        <tr>
          <td className="border border-gray-300 p-2 bg-white">여</td>
          {Array(14).fill(0).map((value, index) => (<td key={index} className="border border-gray-300 p-2 bg-white">{value}</td>))}
        </tr>
        <tr>
          <td className="border border-gray-300 p-2 bg-white" rowSpan={2}>누계</td>
          <td className="border border-gray-300 p-2 bg-white">남</td>
          {Array(14).fill(0).map((value, index) => (<td key={index} className="border border-gray-300 p-2 bg-white">{value}</td>))}
        </tr>
        <tr>
          <td className="border border-gray-300 p-2 bg-white">여</td>
          {Array(14).fill(0).map((value, index) => (<td key={index} className="border border-gray-300 p-2 bg-white">{value}</td>))}
        </tr>
      </tbody>
    </table>
  );
}

export default SubSheet;
