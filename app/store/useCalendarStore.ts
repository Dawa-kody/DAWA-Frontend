import { create } from 'zustand';
import axios from 'axios';
import { format } from 'date-fns';

interface ApiResponse {
  questionnaires: SheetData[];
  groupedStatistics: {
    누계: { 남: Record<string, number>; 여: Record<string, number> };
    월계: { 남: Record<string, number>; 여: Record<string, number> };
    일계: { 남: Record<string, number>; 여: Record<string, number> };
  };
}

interface SheetState {
  questionnaires: SheetData[];
  dailyData: SheetData[];
  currentData: SheetData[];
  statistics: ApiResponse['groupedStatistics'];
  selectedDate: Date | null;
  fetchCurrentData: () => Promise<void>;
  fetchDailyData: (date: Date) => Promise<void>;
  setSelectedDate: (date: Date) => void;
  mergeData: () => void;
  initialize: () => Promise<void>;
}

export interface SheetData {
  serialNumber: number;
  userName: string;
  schoolNumber: string;
  gender: string;
  division: string;
  disease: string;
  treatment: string;
  quantity: number;
  medication1: string;
  quantity1: number;
  medication2: string;
  quantity2: number;
  notes: string;
}

export const useCalendarStore = create<SheetState>((set, get) => ({
  questionnaires: [],
  dailyData: [],
  currentData: [],
  statistics: {
    누계: { 남: {}, 여: {} },
    월계: { 남: {}, 여: {} },
    일계: { 남: {}, 여: {} }
  },
  selectedDate: null,

  mergeData: () => {
    const { dailyData, currentData } = get();
    const uniqueData = [...new Map(
      [...dailyData, ...currentData].map(item => [item.serialNumber, item])
    ).values()];
    set({ questionnaires: uniqueData });
  },

  fetchCurrentData: async () => {
    try {      
      const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/questionnaire/date`, {
        headers: {
          'ngrok-skip-browser-warning': '69240',
          'Content-Type': 'application/json'
        }
      });
      
      set({ 
        currentData: response.data.questionnaires || [],
        questionnaires: response.data.questionnaires || [],
        statistics: response.data.groupedStatistics || {
          누계: { 남: {}, 여: {} },
          월계: { 남: {}, 여: {} },
          일계: { 남: {}, 여: {} }
        }
      });
    }
    
    catch (error) {
      console.error('현재 데이터 조회 오류:', error);
      set({ currentData: [] });
    }
  },

  fetchDailyData: async (date) => {
    try {
      const yearMonthDayParam = format(date, 'yyyy.MM.dd');
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/questionnaire/date?yearMonthDay=${yearMonthDayParam}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69240',
            'Content-Type': 'application/json'
          }
        }
      );
      
      set({ 
        dailyData: response.data.questionnaires || [],
        questionnaires: response.data.questionnaires || [],
        statistics: response.data.groupedStatistics || {
          누계: { 남: {}, 여: {} },
          월계: { 남: {}, 여: {} },
          일계: { 남: {}, 여: {} }
        }
      });
    }
    
    catch (error) {
      console.error('일별 데이터 조회 오류:', error);
      set({ dailyData: [] });
    }
  },

  setSelectedDate: (date) => set({ selectedDate: date }),

  initialize: async () => {
    const today = new Date();
    set({ selectedDate: today });
    await get().fetchCurrentData();
    await get().fetchDailyData(today);
    get().mergeData();
  },
}));
