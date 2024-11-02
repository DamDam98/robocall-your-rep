import { UserFormData } from "@/types";
import { create } from "zustand";

interface Representative {
  name: string;
  party: string;
  state: string;
  district: string;
  phone: string;
  office: string;
  link: string;
}

interface AppState {
  representatives: Representative[];
  userInfo: UserFormData;
  isLoading: boolean;
  error: string;
  setRepresentatives: (reps: Representative[]) => void;
  setUserInfo: (info: UserFormData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  reset: () => void;
}

const initialUserInfo: UserFormData = {
  fullName: "",
  zipCode: "",
  age: "",
  gender: "",
  profession: "",
  income: "",
  homeOwnershipStatus: "",
  passionateIssues: [],
  message: "",
};

export const useStore = create<AppState>((set) => ({
  representatives: [],
  userInfo: initialUserInfo,
  isLoading: false,
  error: "",

  setRepresentatives: (reps) => set({ representatives: reps }),
  setUserInfo: (info) => set({ userInfo: info }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      representatives: [],
      userInfo: initialUserInfo,
      isLoading: false,
      error: "",
    }),
}));
