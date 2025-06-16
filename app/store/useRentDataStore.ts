// app/store/useRentDataStore.ts
import { create } from "zustand";
import { RentAdminDatas, VisitAdminDatas, RequestRentDatas, RentDatas, VisitDatas } from "@/components/@Molecules";

interface Store {
  // 관리자용 데이터
  rentAdminDataList: RentAdminDatas[];
  setRentAdminDataList: (data: RentAdminDatas[]) => void;
  visitAdminDataList: VisitAdminDatas[];
  setVisitAdminDataList: (data: VisitAdminDatas[]) => void;
  requestRentDataList: RequestRentDatas[];
  setRequestRentDataList: (data: RequestRentDatas[]) => void;

  // 일반 사용자용 데이터
  rentDataList: RentDatas[]; // RentDatas 타입으로 변경
  setRentDataList: (data: RentDatas[]) => void;
  visitDataList: VisitDatas[];
  setVisitDataList: (data: VisitDatas[]) => void; // 누락된 setter 추가
}

export const useStore = create<Store>((set) => ({
  // 관리자 데이터 초기화
  rentAdminDataList: [],
  setRentAdminDataList: (data) => set({ rentAdminDataList: data }),
  visitAdminDataList: [],
  setVisitAdminDataList: (data) => set({ visitAdminDataList: data }), // 오타 수정
  requestRentDataList: [],
  setRequestRentDataList: (data) => set({ requestRentDataList: data }),

  // 일반 사용자 데이터 초기화
  rentDataList: [],
  setRentDataList: (data) => set({ rentDataList: data }),
  visitDataList: [],
  setVisitDataList: (data) => set({ visitDataList: data }), // 누락된 setter 추가
}));
