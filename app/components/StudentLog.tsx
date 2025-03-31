import React from "react";

const StudentLog = () => {
  return (
    <div className="w-[450px] h-[330px] absolute left-[1190px] top-[400px] bg-[#F8FAFC] rounded-[10px] shadow-md">
      <h1 className="absolute left-[30px] top-[30px] text-2xl font-bold text-gray-800">
        학생 문진 기록 확인
      </h1>

      <div className="absolute left-[260px] top-[22px] flex items-center">
        <input
          maxLength={4}
          className="w-[170px] h-[45px] bg-[#F0EDFE] rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <img
          className="w-[20px] h-[20px] ml-[-30px] cursor-pointer"
          src="Search.svg"
          alt="검색"
        />
      </div>

      {/* 검색 결과 태그 */}
      <div className="absolute left-[30px] top-[80px] bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
        진건희 학생
      </div>

      {/* 테이블 */}
      <table className="w-full h-[200px] absolute top-[120px] border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#F0EDFE]">
            <th className="p-3 border border-gray-300 text-left text-sm font-medium text-gray-600">
              날짜
            </th>
            <th className="p-3 border border-gray-300 text-left text-sm font-medium text-gray-600">
              학번
            </th>
            <th className="p-3 border border-gray-300 text-left text-sm font-medium text-gray-600">
              병명
            </th>
            <th className="p-3 border border-gray-300 text-left text-sm font-medium text-gray-600">
              처치
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 첫 번째 행 */}
          <tr className="hover:bg-gray-50">
            <td className="p-3 border border-gray-300 text-sm text-gray-700">2024.12.30</td>
            <td className="p-3 border border-gray-300 text-sm text-gray-700">1-1 7번</td>
            <td className="p-3 border border-gray-300 text-sm text-gray-700">감기</td>
            <td className="p-3 flex items-center gap-x-2 border border-gray-300 text-sm text-gray-700">
              빠꾸
            </td>
          </tr>

          {/* 빈 행 추가 */}
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentLog;
