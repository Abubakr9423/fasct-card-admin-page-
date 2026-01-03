import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFormik } from "formik"
import { Input } from "@/components/ui/input"
import { Trash, Upload } from "lucide-react"
import { useAddProductStore } from "@/store/addProductStore"

const EditProduct = () => {
  const { id } = useParams<{ id: string }>()

  const {
    fetchAttributes,
    fetchProductById,
    submitProduct,
    handleImageUpload,
    removeImage,
    images,
    colors,
    brands,
    subCategories,
    setField,
    loading,
    productName,
    description,
    code,
    price,
    discountPrice,
    quantity,
    brandId,
    subCategoryId,
    colorId,
  } = useAddProductStore()
  // console.log(code);

  useEffect(() => {
    fetchAttributes()
    if (id) fetchProductById(Number(id))
  }, [id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName,
      description,
      code: code + Date.now(),
      price,
      discountPrice,
      quantity,
      brandId,
      subCategoryId,
      colorId,
    },
    onSubmit: async (values) => {
      Object.entries(values).forEach(([key, value]) => {
        setField(key as any, value)
      })
      if (id) {
        await submitProduct(Number(id))
      } else {
        await submitProduct()
      }
    }

  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <main className="p-5">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Products / Edit</h1>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#2563EB] text-white rounded-md"
            >
              Update
            </button>
          </div>
        </div>

        <section className="flex gap-4">
          <aside className="w-[60%] space-y-4">
            <Input
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
              placeholder="Product name"
            />

            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="border rounded-md w-full p-3 h-40"
              placeholder="Description"
            />

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

            <div className="flex gap-2">
              <Input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder="Price"
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
                placeholder="Quantity"
              />
            </div>
          </aside>

          <aside className="w-[40%] space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Colour</h3>
              <div className="flex gap-4">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() =>
                      formik.setFieldValue("colorId", c.id)
                    }
                    className={`w-8 h-8 rounded-full
                      ${formik.values.colorId === c.id
                        ? "ring-2 ring-[#2563EB] ring-offset-2"
                        : ""}
                    `}
                    style={{ backgroundColor: c.colorName }}
                  />
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Images</h3>
              <div className="relative border-dashed border rounded-lg p-8 text-center">
                <Upload className="mx-auto mb-2" />
                <span className="underline cursor-pointer">
                  Click to upload
                </span>
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 opacity-0"
                  onChange={(e) =>
                    handleImageUpload(e.target.files)
                  }
                />
              </div>
            </div>

            {images.length > 0 && (
              <div className="border rounded-lg">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 border-t"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <span className="text-sm">{img.name}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </section>
      </main>
    </form>
  )
}

export default EditProduct
