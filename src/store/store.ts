import { axiosRequest, SaveToken } from '@/util/axios';
import { create } from 'zustand';


interface LogState {
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    loginUser: (values: any) => Promise<void>;
}

export interface Product {
    id: number;
    productName: string;
    image: string;
    color: string;
    price: number;
    hasDiscount: boolean;
    discountPrice: number;
    quantity: number;
    productInMyCart: boolean;
    categoryId: number;
    categoryName: string;
    productInfoFromCart: any;
}
interface ProductsData {
    products: Product[];
}

interface ProductFilters {
    productName?: string;
    minPrice?: number;
    maxPrice?: number;
    brandId?: number;
    colorId?: number;
    categoryId?: number;
    subcategoryId?: number;
    pageNumber?: number;
    pageSize?: number;
}

interface ProductState {
    data: ProductsData | null;
    filters: ProductFilters;
    setFilters: (filters: Partial<ProductFilters>) => void;
    fetchProducts: () => Promise<void>;
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

<<<<<<< HEAD
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
=======

export const useProductStore = create<ProductState>((set, get) => ({
    data: null,
    filters: { pageNumber: 1, pageSize: 10 },

    setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    fetchProducts: async () => {
        try {
            const { filters } = get();
            const response = await axiosRequest.get<{ data: ProductsData }>("/Product/get-products", { params: filters });
            set({ data: response.data.data });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    },
}));
>>>>>>> f99cf6a6cf8aeceee195f2de1fc6d179c5faa64c
