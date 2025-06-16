import { create } from 'zustand';
import axios from 'axios';

interface Medicine {
  id: number;
  name: string;
  count: number;
  body_system: string | null;
  type: string;
}

type NewMedicine = Omit<Medicine, 'id'>;

interface MedicalStore {
    medicines: Medicine[];
    fetchMedicines: () => Promise<void>;
    addMedicine: (newMedicine: NewMedicine) => Promise<void>;
    updateMedicine: (updatedMedicine: Medicine) => Promise<void>;
  }

export const useMedicalStore = create<MedicalStore>((set) => ({
  medicines: [],

  fetchMedicines: async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/medicine/get`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      set({ medicines: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error('약 정보 불러오기 실패', err);
      set({ medicines: [] });
    }
  },

  // 추가된 메서드들
  addMedicine: async (newMedicine) => {
    const tempId = Date.now();
  
    // 1. 낙관적 업데이트
    set((state) => ({
      medicines: [{ ...newMedicine, id: tempId }, ...state.medicines]
    }));
  
    try {
      // 2. API 요청 (URL 추가)
      const res = await axios.post<Medicine>(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/medicine/insert`,
        {
          medicineName: newMedicine.name,
          medicineType: newMedicine.type,
          medicineCount: newMedicine.count
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
          }
        }
      );
  
      // 3. 실제 ID로 교체
      set((state) => ({
        medicines: state.medicines.map(med => 
          med.id === tempId ? res.data : med
        )
      }));
    } catch (err) {
      // 4. 롤백
      set((state) => ({
        medicines: state.medicines.filter(med => med.id !== tempId)
      }));
      throw err;
    }
  },  

  updateMedicine: async (updatedMedicine) => {
    set((state) => ({
      medicines: state.medicines.map(med =>
        med.id === updatedMedicine.id ? updatedMedicine : med
      )
    }));

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/medicine/update`,
        {
          medicineId: updatedMedicine.id,
          medicineName: updatedMedicine.name,
          medicineType: updatedMedicine.type,
          medicineCount: updatedMedicine.count
        }
      );
    } catch (err) {
      set((state) => ({
        medicines: state.medicines.map(med =>
          med.id === updatedMedicine.id ? med : med
        )
      }));
      throw err;
    }
  }
}));

export default useMedicalStore;
