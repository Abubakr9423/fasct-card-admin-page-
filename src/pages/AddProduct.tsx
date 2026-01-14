import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { Input } from "@/components/ui/input"
import {
  ArrowBigUp,
  ChartBarIncreasing,
  Link2,
  Menu,
  PenTool,
  Redo,
  RemoveFormatting,
  Trash,
  Upload,
} from "lucide-react"
import { useAddProductStore } from "@/store/addProductStore"
import { useNavigate } from "react-router-dom"

interface AddProductProps {
  productId?: number // optional, for edit mode
}

const AddProduct = ({ productId }: AddProductProps) => {
  const {
    fetchAttributes,
    submitProduct,
    handleImageUpload,
    removeImage,
    images,
    colors,
    brands,
    subCategories,
    loading,
    setField,
    fetchProductById,
    createColor,
  } = useAddProductStore()

  const [newColor, setNewColor] = useState("")

  const navigaete = useNavigate()

  useEffect(() => {
    fetchAttributes()
    if (productId) fetchProductById(productId)
  }, [fetchAttributes, productId, fetchProductById])

  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      code: "",
      price: 0,
      discountPrice: 0,
      quantity: 0,
      brandId: "",
      subCategoryId: "",
      colorId: null as number | null,
      weight: "",
      size: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      Object.entries(values).forEach(([key, value]) => {
        setField(key as any, value)
      })
      await submitProduct(productId)
      navigaete("/products")
      formik.resetForm()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <main className="px-5 py-5">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            Products / {productId ? "Edit" : "Add new"}
          </h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="px-6 py-2 border border-[#2563EB] text-[#2563EB] rounded-md hover:bg-blue-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#2563EB] text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? "Loading..." : productId ? "Update" : "Save"}
            </button>
          </div>
        </div>

        <section className="flex gap-4">
          {/* LEFT SIDE */}
          <aside className="w-[60%] space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Information</h2>
              <div className="flex gap-2">
                <Input
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  placeholder="Product name"
                />
                <Input
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  placeholder="Code"
                />
              </div>

              {/* DESCRIPTION EDITOR UI */}
              <div className="border rounded-md bg-white">
                <div className="flex items-center gap-4 px-3 py-2 border-b bg-gray-50">
                  <span className="font-medium text-sm">Normal</span>
                  <div className="flex gap-3 text-gray-500">
                    <ArrowBigUp size={18} className="cursor-pointer hover:text-blue-600" />
                    <PenTool size={18} className="cursor-pointer hover:text-blue-600" />
                    <Redo size={18} className="cursor-pointer hover:text-blue-600" />
                    <Link2 size={18} className="cursor-pointer hover:text-blue-600" />
                    <Menu size={18} className="cursor-pointer hover:text-blue-600" />
                    <ChartBarIncreasing size={18} className="cursor-pointer hover:text-blue-600" />
                    <RemoveFormatting size={18} className="cursor-pointer hover:text-blue-600" />
                  </div>
                </div>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Description"
                  className="w-full p-3 h-40 outline-none resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  name="subCategoryId"
                  value={formik.values.subCategoryId}
                  onChange={formik.handleChange}
                  className="border rounded-md w-full px-3 py-2 bg-white"
                >
                  <option value="">Select Category</option>
                  {subCategories.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.subCategoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <select
                  name="brandId"
                  value={formik.values.brandId}
                  onChange={formik.handleChange}
                  className="border rounded-md w-full px-3 py-2 bg-white"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b: any) => (
                    <option key={b.id} value={b.id}>
                      {b.brandName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Inventory & Price</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Regular Price</label>
                  <Input
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Discount Price</label>
                  <Input
                    type="number"
                    name="discountPrice"
                    value={formik.values.discountPrice}
                    onChange={formik.handleChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Stock Quantity</label>
                  <Input
                    type="number"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE */}
          <aside className="w-[40%] space-y-6">
            {/* COLORS */}
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between mb-4 items-center">
                <h3 className="font-semibold">Colour</h3>
                {newColor ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-8 h-8 rounded-full cursor-pointer border-none"
                    />
                    <button
                      type="button"
                      className="text-[#2563EB] text-sm font-bold hover:underline"
                      onClick={async () => {
                        await createColor(newColor)
                        setNewColor("")
                      }}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="text-[#2563EB] text-sm font-medium hover:underline"
                    onClick={() => setNewColor("#000000")}
                  >
                    + Create new
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {colors.map((c: any) => {
                  const selected = formik.values.colorId === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => formik.setFieldValue("colorId", c.id)}
                      className={`w-8 h-8 rounded-full transition-all border border-gray-200
                        ${selected ? "ring-2 ring-blue-500 ring-offset-2 scale-110" : "hover:scale-105"}`}
                      style={{ backgroundColor: c.colorName }}
                      title={c.colorName}
                    />
                  )
                })}
              </div>
            </div>

            {/* IMAGES UPLOAD */}
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-3">Product Images</h3>
              <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50 text-center hover:bg-gray-100 transition-colors">
                <Upload className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  <span className="text-blue-600 font-semibold underline cursor-pointer">
                    Click to upload
                  </span> or drag and drop
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files) handleImageUpload(e.target.files)
                  }}
                />
              </div>

              {/* IMAGE TABLE */}
              {images.length > 0 && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Preview</th>
                        <th className="px-3 py-2 text-left">Name</th>
                        <th className="px-3 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {images.map((img: File, index: number) => (
                        <tr key={index}>
                          <td className="px-3 py-2">
                            <img
                              src={URL.createObjectURL(img)}
                              alt="preview"
                              className="w-10 h-10 object-cover rounded border"
                            />
                          </td>
                          <td className="px-3 py-2 truncate max-w-[100px]">{img.name}</td>
                          <td className="px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </aside>
        </section>
      </main>
    </form>
  )
}

export default AddProduct