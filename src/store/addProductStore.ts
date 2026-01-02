import { create } from 'zustand';
import { axiosRequest } from '@/util/axios';

interface Color {
    id: number;
    colorName: string;
}

interface SubCategory {
    id: number;
    subCategoryName: string;
}

interface Brand {
    id: number;
    brandName: string;
}

interface AddProductState {
    // Form Fields
    productName: string;
    description: string;
    code: string;
    price: number;
    discountPrice: number;
    quantity: number;
    weight: string;
    size: string;
    brandId: number | string; // keeping flexible for placeholder
    colorId: number | null;
    subCategoryId: number | string; // keeping flexible for select
    images: File[];

    // Data Lists
    colors: Color[];
    subCategories: SubCategory[];
    brands: Brand[];

    // UI State
    loading: boolean;
    error: string | null;
    success: boolean;

    // Actions
    fetchAttributes: () => Promise<void>;
    setField: (field: keyof AddProductState, value: any) => void;
    handleImageUpload: (files: FileList | null) => void;
    removeImage: (index: number) => void;
    submitProduct: () => Promise<void>;
    resetForm: () => void;
}

export const useAddProductStore = create<AddProductState>((set, get) => ({
    // Initial State
    productName: '',
    description: '',
    code: '',
    price: 0,
    discountPrice: 0,
    quantity: 0,
    weight: '',
    size: '',
    brandId: '', // Default empty
    colorId: null,
    subCategoryId: '', // Default empty
    images: [],

    colors: [],
    subCategories: [],
    brands: [],

    loading: false,
    error: null,
    success: false,

    fetchAttributes: async () => {
        set({ loading: true, error: null });
        try {
            const [colorsRes, subCatsRes, brandsRes] = await Promise.all([
                axiosRequest.get('/Color/get-colors'),
                axiosRequest.get('/SubCategory/get-sub-category'),
                axiosRequest.get('/Brand/get-brands'),
            ]);

            set({
                colors: colorsRes.data.data,
                subCategories: subCatsRes.data.data,
                brands: brandsRes.data.data,
                loading: false,
            });
        } catch (error: any) {
            console.error('Failed to fetch attributes:', error);
            set({
                loading: false,
                error: error.message || 'Failed to fetch attributes'
            });
        }
    },

    setField: (field, value) => {
        set((state) => ({ ...state, [field]: value }));
    },

    handleImageUpload: (files) => {
        if (files) {
            set((state) => ({
                images: [...state.images, ...Array.from(files)],
            }));
        }
    },

    removeImage: (index) => {
        set((state) => ({
            images: state.images.filter((_, i) => i !== index),
        }));
    },

    resetForm: () => {
        set({
            productName: '',
            description: '',
            code: '',
            price: 0,
            discountPrice: 0,
            quantity: 0,
            weight: '',
            size: '',
            brandId: '',
            colorId: null,
            subCategoryId: '',
            images: [],
            success: false,
            error: null,
        });
    },

    submitProduct: async () => {
        const state = get();
        set({ loading: true, error: null, success: false });

        try {
            const formData = new FormData();

            // Text fields
            formData.append('ProductName', state.productName || '');
            formData.append('Description', state.description || '');
            formData.append('Code', state.code || '');
            formData.append('Weight', state.weight || '');
            formData.append('Size', state.size || '');

            // Numeric fields - Strict parsing
            const price = parseFloat(state.price.toString());
            const discountPrice = parseFloat(state.discountPrice.toString());
            const quantity = parseInt(state.quantity.toString());

            // Only append if it's a valid number (NaN check)
            if (!isNaN(price)) formData.append('Price', price.toString());
            if (!isNaN(discountPrice)) formData.append('DiscountPrice', discountPrice.toString());
            if (!isNaN(quantity)) formData.append('Quantity', quantity.toString());

            // IDs - Strict INT32 parsing
            // BrandId
            const brandId = parseInt(state.brandId.toString());
            if (!isNaN(brandId) && brandId > 0) {
                formData.append('BrandId', brandId.toString());
            }

            // SubCategoryId
            const subCatId = parseInt(state.subCategoryId.toString());
            if (!isNaN(subCatId) && subCatId > 0) {
                formData.append('SubCategoryId', subCatId.toString());
            }

            
            // ColorId
            if (state.colorId) {
                const colorId = parseInt(state.colorId.toString());
                if (!isNaN(colorId) && colorId > 0) {
                    formData.append('ColorId', colorId.toString());
                }
            }

            // Boolean
            const hasDiscount = discountPrice > 0;
            formData.append('HasDiscount', hasDiscount.toString());

            // Images
            if (state.images && state.images.length > 0) {
                state.images.forEach((file) => {
                    formData.append('Images', file);
                });
            }

            // Debug Logging
            console.log('Submitting Product FormData:');
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            await axiosRequest.post('/Product/add-product', formData);

            set({ loading: false, success: true });
            get().resetForm();

        } catch (error: any) {
            console.error('Failed to submit product:', error);
            set({
                loading: false,
                error: error.response?.data?.message || error.message || 'Failed to submit product'
            });
        }
    },
}));
