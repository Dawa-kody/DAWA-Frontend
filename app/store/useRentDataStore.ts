// app/store/useRentDaraStore.ts
import { create } from "zustand";
import { RentAdminDatas } from "@/molecules/RentDataAdmin";
import { VisitAdminDatas } from "@/molecules/VisitDataAdmin";
import { RequestRentDatas } from "@/molecules/RequestRentData";

interface Store {
  rentAdminDataList: RentAdminDatas[];
  setRentAdminDataList: (data: RentAdminDatas[]) => void;
  visitAdminDataList: VisitAdminDatas[];
  setVisitAdminDataList: (data: VisitAdminDatas[]) => void;
  requestRentDataList: RequestRentDatas[];
  setRequestRentDataList: (data: RequestRentDatas[]) => void;
}

export const useStore = create<Store>((set) => ({
  rentAdminDataList: [],
  setRentAdminDataList: (data) => set({ rentAdminDataList: data }),
  visitAdminDataList: [],
  setVisitAdminDataList: (data) => set({ visitAdminDataList: data }),
  requestRentDataList: [],
  setRequestRentDataList: (data) => set({ requestRentDataList: data }),
}));
