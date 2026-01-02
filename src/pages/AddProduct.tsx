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

  // Fetch brands, categories, colors
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
    enableReinitialize: true, // important to pre-fill when editing
    onSubmit: async (values) => {
      Object.entries(values).forEach(([key, value]) => {
        setField(key as any, value)
      })
      await submitProduct(productId)
      formik.resetForm()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <main className="px-5">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            Products / {productId ? "Edit" : "Add new"}
          </h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={formik.resetForm}
              className="px-6 py-2 border border-[#2563EB] text-[#2563EB] rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#2563EB] text-white rounded-md"
            >
              {productId ? "Update" : "Save"}
            </button>
          </div>
        </div>

        <section className="flex gap-4">
          {/* LEFT SIDE */}
          <aside className="w-[60%] space-y-4">
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

            {/* DESCRIPTION */}
            <div className="border rounded-md">
              <div className="flex items-center gap-5 px-3 py-2 border-b">
                <span className="font-medium">Normal</span>
                <ArrowBigUp size={18} />
                <PenTool size={18} />
                <Redo size={18} />
                <Link2 size={18} />
                <Menu size={18} />
                <ChartBarIncreasing size={18} />
                <RemoveFormatting size={18} />
              </div>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Description"
                className="w-full p-3 h-40 outline-none"
              />
            </div>

            {/* CATEGORY & BRAND */}
            <div className="flex gap-2">
              <select
                name="subCategoryId"
                value={formik.values.subCategoryId}
                onChange={formik.handleChange}
                className="border rounded-md w-full px-3 py-2"
              >
                <option value="">Categories</option>
                {subCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.subCategoryName}
                  </option>
                ))}
              </select>

              <select
                name="brandId"
                value={formik.values.brandId}
                onChange={formik.handleChange}
                className="border rounded-md w-full px-3 py-2"
              >
                <option value="">Brands</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brandName}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICE */}
            <div>
              <h3 className="font-semibold mb-2">Price</h3>
              <div className="flex gap-2">
                <Input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  placeholder="Product price"
                />
                <Input
                  type="number"
                  name="discountPrice"
                  value={formik.values.discountPrice}
                  onChange={formik.handleChange}
                  placeholder="Discount"
                />
                <Input
                  type="number"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  placeholder="Count"
                />
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE */}
          <aside className="w-[40%] space-y-4">
            {/* COLORS */}
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between mb-3 items-center">
                <h3 className="font-semibold">Colour:</h3>

                {/* Create New Color */}
                {newColor ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                    <button
                      type="button"
                      className="text-[#2563EB] text-sm font-medium"
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
                    className="text-[#2563EB] text-sm font-medium"
                    onClick={() => setNewColor("#000000")}
                  >
                    ✓ Create new
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {colors.map((c) => {
                  const selected = formik.values.colorId === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => formik.setFieldValue("colorId", c.id)}
                      className={`w-8 h-8 rounded-full transition-all
                        ${selected ? "ring-2 ring-[#2563EB] ring-offset-2" : ""}`}
                      style={{ backgroundColor: c.colorName }}
                    />
                  )
                })}
              </div>
            </div>

            {/* IMAGES */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Images</h3>

              <div className="relative border border-dashed rounded-lg p-10 bg-gray-50 text-center">
                <Upload className="mx-auto mb-3" />
                <span className="underline cursor-pointer">
                  Click to upload
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
              </div>
            </div>

            {/* IMAGE LIST */}
            {images.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 text-sm">
                    <tr>
                      <th className="px-4 py-2">Image</th>
                      <th className="px-4 py-2">File name</th>
                      <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((img, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">
                          <img
                            src={URL.createObjectURL(img)}
                            className="w-12 h-12 object-cover rounded-md border"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm">{img.name}</td>
                        <td className="px-4 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </aside>
        </section>
      </main>
    </form>
  )
}

export default AddProduct
