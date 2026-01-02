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

interface Category {
    id: number;
    categoryName: string;
    categoryImage: string;
    subCategories: any[];
}

interface CategoryState {
    isCategoria: Category[];
    loading: boolean;
    getCategory: () => Promise<void>;
    addCategory: (formdata: FormData) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
    editCategory: (formdata: FormData) => Promise<void>;
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

export const useCategory = create<CategoryState>((set, get) => ({
    isCategoria: [],
    loading: false,

    getCategory: async () => {
        set({ loading: true });
        try {
            const { data } = await axiosRequest.get("/Category/get-categories");
            set({ isCategoria: data.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },

    deleteCategory: async (id: number) => {
        try {
            await axiosRequest.delete(`Category/delete-category?id=${id}`);
            get().getCategory();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    },

    addCategory: async (formdata: FormData) => {
        try {
            await axiosRequest.post("Category/add-category", formdata);
            get().getCategory();
        } catch (error) {
            console.error("Error adding:", error);
        }
    },

    editCategory: async (formdata: FormData) => {
        try {
            await axiosRequest.put("Category/update-category", formdata);
            get().getCategory();
        } catch (error) {
            console.error("Error updating:", error);
        }
    }
}));

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


interface ProductStatedele {
    products: any[];
    deleteProduct: (id: number) => Promise<void>;
}



export const useDeleteProducts = create<ProductStatedele>((set, get) => ({
    products: [],

    deleteProduct: async (id: number) => {
        try {
            await axiosRequest.delete(`/Product/delete-product?id=${id}`);

            set({
                products: get().products.filter((p) => p.id !== id),
            });
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    },
}));






export const useProfileStore = create((set, get) => ({
    data: null,

    fetchPrfile: async () => {
        try {
            const response = await axiosRequest.get(
                "https://store-api.softclub.tj/UserProfile/get-user-profiles"
            );
            set({ data: response.data.data });
        } catch (error) {
            console.error("Failed to fetch profiles:", error);
        }
    },

    deleteprofile: async (id: number) => {
        try {
            await axiosRequest.delete(`/UserProfile/delete-user?id=${id}`);
            await get().fetchPrfile();
        } catch (error) {
            console.error("Failed to delete profile:", error);
        }
    },
    editProfile: async (edited: object) => {
        try {
            await axiosRequest.put(`/UserProfile/update-user-profile`, edited)
            await get().fetchPrfile();
        } catch (error) {
            console.error(error);

        }
    }
}));