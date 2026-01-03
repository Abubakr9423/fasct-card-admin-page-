import { create } from "zustand"
import { axiosRequest } from "@/util/axios"

/* ================= TYPES ================= */

export interface Color {
    id: number
    colorName: string // hex or name
}

export interface Brand {
    id: number
    brandName: string
}

export interface SubCategory {
    id: number
    subCategoryName: string
}

interface ProductState {
    // FORM
    productName: string
    description: string
    code: string
    price: number
    discountPrice: number
    quantity: number
    weight: string
    size: string
    brandId: number | string
    subCategoryId: number | string
    colorId: number | null
    images: File[]

    // DATA
    colors: Color[]
    brands: Brand[]
    subCategories: SubCategory[]

    // UI
    loading: boolean
    error: string | null
    success: boolean

    // ACTIONS
    fetchAttributes: () => Promise<void>
    fetchProductById: (id: number) => Promise<void>
    createColor: (colorName: string) => Promise<void>

    setField: (key: keyof ProductState, value: any) => void
    handleImageUpload: (files: FileList | null) => void
    removeImage: (index: number) => void

    submitProduct: (id?: number) => Promise<void>
    resetForm: () => void
}

/* ================= STORE ================= */

export const useAddProductStore = create<ProductState>((set, get) => ({
    // INITIAL STATE
    productName: "",
    description: "",
    code: "",
    price: 0,
    discountPrice: 0,
    quantity: 0,
    weight: "",
    size: "",
    brandId: "",
    subCategoryId: "",
    colorId: null,
    images: [],

    colors: [],
    brands: [],
    subCategories: [],

    loading: false,
    error: null,
    success: false,

    /* ---------- FETCH DROPDOWNS ---------- */
    fetchAttributes: async () => {
        set({ loading: true })
        try {
            const [c, b, s] = await Promise.all([
                axiosRequest.get("/Color/get-colors"),
                axiosRequest.get("/Brand/get-brands"),
                axiosRequest.get("/SubCategory/get-sub-category"),
            ])

            set({
                colors: c.data.data,
                brands: b.data.data,
                subCategories: s.data.data,
                loading: false,
            })
        } catch (e: any) {
            set({ loading: false, error: e.message })
        }
    },

    /* ---------- FETCH PRODUCT (EDIT) ---------- */
    fetchProductById: async (id) => {
        set({ loading: true })
        try {
            const res = await axiosRequest.get(`Product/get-product-by-id?id=${id}`)
            const p = res.data.data

            set({
                productName: p.productName,
                description: p.description,
                code: p.code,
                price: p.price,
                discountPrice: p.discountPrice,
                quantity: p.quantity,
                brandId: p.brandId,
                subCategoryId: p.subCategoryId,
                colorId: p.colorId,
                weight: p.weight,
                size: p.size,
                images: [],
                loading: false,
            })
        } catch (e: any) {
            set({ loading: false, error: e.message })
        }
    },

    /* ---------- CREATE COLOR ---------- */
    createColor: async (colorName) => {
        await axiosRequest.post("/Color/create", { colorName })
        const res = await axiosRequest.get("/Color/get-colors")
        set({ colors: res.data.data })
    },

    /* ---------- HELPERS ---------- */
    setField: (key, value) => set({ [key]: value } as any),

    handleImageUpload: (files) => {
        if (!files) return
        set((s) => ({ images: [...s.images, ...Array.from(files)] }))
    },

    removeImage: (index) =>
        set((s) => ({
            images: s.images.filter((_, i) => i !== index),
        })),

    /* ---------- SUBMIT (CREATE + EDIT) ---------- */
    submitProduct: async (id) => {
        const s = get()
        set({ loading: true, error: null })

        try {
            const fd = new FormData()

            fd.append("ProductName", s.productName)
            fd.append("Description", s.description)
            fd.append("Code", s.code)
            fd.append("Weight", s.weight)
            fd.append("Size", s.size)
            fd.append("Price", s.price.toString())
            fd.append("DiscountPrice", s.discountPrice.toString())
            fd.append("Quantity", s.quantity.toString())

            if (s.brandId) fd.append("BrandId", s.brandId.toString())
            if (s.subCategoryId) fd.append("SubCategoryId", s.subCategoryId.toString())
            if (s.colorId) fd.append("ColorId", s.colorId.toString())

            fd.append("HasDiscount", (s.discountPrice > 0).toString())

            s.images.forEach((img) => fd.append("Images", img))

            if (id) {
                const params = new URLSearchParams({
                    Id: String(id),
                    BrandId: String(s.brandId),
                    ColorId: String(s.colorId || ""),
                    SubCategoryId: String(s.subCategoryId),
                });

                const fd = new FormData();
                fd.append("ProductName", s.productName);
                fd.append("Description", s.description);
                fd.append("Code", s.code);
                fd.append("Price", String(s.price));
                fd.append("DiscountPrice", String(s.discountPrice));
                fd.append("Quantity", String(s.quantity));
                fd.append("HasDiscount", (s.discountPrice > 0).toString());
                s.images.forEach(img => fd.append("Images", img));

                await axiosRequest.put(
                    `https://store-api.softclub.tj/Product/update-product?${params.toString()}`,
                    fd
                );

            } else {
                await axiosRequest.post("/Product/add-product", fd)
            }

            set({ loading: false, success: true })
            get().resetForm()
        } catch (e: any) {
            set({ loading: false, error: e.message })
        }
    },

    /* ---------- RESET ---------- */
    resetForm: () =>
        set({
            productName: "",
            description: "",
            code: "",
            price: 0,
            discountPrice: 0,
            quantity: 0,
            weight: "",
            size: "",
            brandId: "",
            subCategoryId: "",
            colorId: null,
            images: [],
            success: false,
            error: null,
        }),
}))
