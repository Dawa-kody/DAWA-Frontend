import React, { useState, useEffect, useRef } from "react";
import Nav from "@/organisms/Nav";
import FilterTag from "@/molecules/FilterTag";
import { Usercard } from "@/molecules/Usercard";
import axios from "axios";
import * as XLSX from "xlsx";

type UserType = {
  name: string;
  gender: "MAN" | "WOMAN";
  schoolNumber: string;
  email: string;
};

function getAdmissionYearSuffix(grade: number): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  return String(currentYear - (grade - 1)).slice(-2);
}

// genderList 배열을 Map<"이름:학번", "MAN"|"WOMAN">으로 변환
function buildGenderMap(
  genderList: { studentId: string; gender: "MAN" | "WOMAN"; name: string }[]
): Map<string, "MAN" | "WOMAN"> {
  const map = new Map<string, "MAN" | "WOMAN">();
  genderList.forEach(({ studentId, gender, name }) => {
    const key = `${name}:${studentId}`;
    map.set(key, gender);
  });
  return map;
}

// 학년 시트 파싱
async function parseStudentSheet(
  sheet: XLSX.WorkSheet,
  grade: number,
  genderMap: Map<string, "MAN" | "WOMAN">,
  emailSet: Set<string>,
  errorLog: string[]
): Promise<UserType[]> {
  const studentData: UserType[] = [];
  const admissionYear = getAdmissionYearSuffix(grade);

  for (let classNum = 1; classNum <= 4; classNum++) {
    for (let studentNum = 1; studentNum <= 18; studentNum++) {
      const row = studentNum + 1;
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: classNum });
      const cell = sheet[cellAddress];

      if (!cell?.v) continue;

      const name = cell.v.toString().trim();
      const schoolNumber = `${grade}${classNum}${String(studentNum).padStart(2, "0")}`;
      const key = `${name}:${schoolNumber}`;
      const gender = genderMap.get(key) || "MAN";

      const email = `s${admissionYear}${String((classNum - 1) * 18 + studentNum).padStart(3, "0")}@gsm.hs.kr`;

      if (emailSet.has(email)) {
        errorLog.push(`중복된 이메일: ${email}`);
        continue;
      }
      emailSet.add(email);

      studentData.push({
        name,
        gender,
        schoolNumber,
        email,
      });
    }
  }

  return studentData;
}

function StudentList() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userList, setUserList] = useState<UserType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectTags = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1. 엑셀 파일을 form-data로 백엔드에 전송하여 genderList 배열 받기
      const formData = new FormData();
      formData.append("file", file);

      const genderResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/excel/change`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const genderList: { studentId: string; gender: "MAN" | "WOMAN"; name: string }[] = genderResponse.data;
      console.log("[excel/change] genderList:", genderList);

      // 2. genderList를 Map<"이름:학번", "MAN"|"WOMAN">으로 변환
      const genderMap = buildGenderMap(genderList);

      // 3. 엑셀 파싱
      const fileBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(fileBuffer, { cellStyles: true });

      const grades = [
        { sheetName: "1학년", grade: 1 },
        { sheetName: "2학년", grade: 2 },
        { sheetName: "3학년", grade: 3 },
      ];

      const emailSet = new Set<string>();
      const errorLog: string[] = [];

      const allStudentData = await Promise.all(
        grades.map(async ({ sheetName, grade }) => {
          const sheet = workbook.Sheets[sheetName];
          return sheet ? await parseStudentSheet(sheet, grade, genderMap, emailSet, errorLog) : [];
        })
      );

      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/batch`,
        allStudentData.flat()
      );

      alert("업로드 성공!");
      fetchUserList();
    }
    
    catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 실패!");
    }
  };

  const fetchUserList = async () => {
    let url = `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/users`;
    const queryParams: string[] = [];

    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        tag === "선생님"
          ? queryParams.push("classes=35")
          : queryParams.push(`classes=${tag.replace("-", "")}`);
      });
    }

    if (nameFilter.trim() !== "") {
      queryParams.push(`name=${encodeURIComponent(nameFilter.trim())}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    try {
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69240" },
      });

      setUserList(
        response.data.map((user: any) => ({
          ...user,
          gender: user.gender === "MAN" ? "남자" : "여자",
        }))
      );
    } catch (err) {
      console.error("유저 데이터 가져오기 실패", err);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [selectedTags, nameFilter]);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Nav />
      <div className="w-[100rem] ml-[4.06rem] mt-[2.94rem] flex flex-row justify-between font-[pretendard]">
        <p className="text-[3.125rem] font-bold">학생 명렬표 페이지</p>
        <div className="flex flex-row gap-[1.56rem]">
          <button className="bg-subPurple h-[3.5rem] text-[1.25rem] inline-block px-[2.19rem] rounded-[0.3125rem] font-medium">
            선생님 파일 업로드
          </button>
          <label
            htmlFor="fileUpload"
            className="bg-subPurple h-[3.5rem] text-[1.25rem] inline-flex justify-center items-center px-[2.19rem] rounded-[0.3125rem] font-medium cursor-pointer"
          >
            학생 파일 업로드
          </label>
          <input
            id="fileUpload"
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="mt-10 ml-[4.06rem] w-[100rem]">
        <div className="p-6 border rounded-lg shadow-md bg-white relative">
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="학생 이름을 입력해주세요"
            className="w-full text-[1.125rem] font-medium text-gray-800 mb-2 px-3 py-2 focus:outline-none rounded"
          />
          <div className="w-full h-[1px] bg-gray-300 mb-4" />
          <FilterTag onSelectTags={handleSelectTags} />
        </div>
      </div>

      <div
        className="w-[100rem] ml-[4.06rem] grid grid-cols-4 gap-x-[2.5rem] gap-y-[1.2rem] mt-[2.94rem] overflow-y-auto scrollbar-hide pb-[30px]"
        style={{ height: "70vh" }}
      >
        {userList.map((user, index) => (
          <Usercard
            key={index}
            name={user.name}
            gender={user.gender}
            schoolNumber={user.schoolNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentList;
