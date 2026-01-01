import { axiosRequest, SaveToken } from '@/util/axios';
import { create } from 'zustand';


interface LogState {
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    loginUser: (values: any) => Promise<void>;
}


export const useBeras = create<LogState>((set) => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    loginUser: async (values) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosRequest.post("/Account/login", values);
            const token = response.data.data;
            SaveToken(token);
            set({
                user: response.data.user || null,
                token,
                loading: false,
                error: null,
            });
        } catch (err: any) {
            let message = err.response?.data?.message || err.message || "Unexpected error";
            set({ loading: false, error: message });
        }
    },
}));

interface SubCategory {
    id: number;
    subCategoryName: string;
}

interface CategoryState {
    isCategoria: SubCategory[];
    loading: boolean;
    getCategory: () => Promise<void>;
}

export const useCategory = create<CategoryState>((set) => ({
    isCategoria: [],
    loading: false,
    getCategory: async () => {
        set({ loading: true });
        try {
            const { data } = await axiosRequest.get("/SubCategory/get-sub-category");
            set({ isCategoria: data.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));