import { Input } from "@/components/ui/input"
import { ArrowBigUp, ChartBarIncreasing, Link2, Menu, PenTool, Redo, RemoveFormatting, Trash, Upload } from "lucide-react"
import img5 from '../assets/div.MuiBox-root (2).png'

const AddProduct = () => {
  return (
    <main className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products / Add new</h1>
        <div className="flex gap-1">
          <button className="px-6 py-2 bg-white border-[#2563EB] border text-[#2563EB] rounded-sm">Cancel</button>
          <button className="px-6 py-2 bg-[#2563EB] border text-white rounded-sm">Save</button>
        </div>
      </div>
      <section className="flex items-start gap-3 my-3">
        <aside className="w-[60%] ">
          <h1 className="text-2xl font-semibold">Information</h1>
          <div className="flex items-center  gap-1">
            <Input className="w-200" placeholder="Product name" type="text" />
            <Input className="w-60" placeholder="Code" type="text" />
          </div>
          <div className="border my-2 rounded-sm font-semibold">
            <div className="flex gap-20  px-2 py-2 items-center">
              <p>Normal</p>
              <div className="flex gap-5">
                <ArrowBigUp className="cursor-pointer" />
                <PenTool className="cursor-pointer" />
                <Redo className="cursor-pointer" />
                <Link2 className="cursor-pointer" />
                <Menu className="cursor-pointer" />
                <ChartBarIncreasing className="cursor-pointer" />
                <RemoveFormatting className="cursor-pointer" />
              </div>
            </div>
            <input className="border w-full pt-2 pb-30 pl-3" placeholder="Description" type="text" />
          </div>
          <div className="flex items-center gap-2.5">
            <select className="border w-full rounded-sm py-2 px-3 font-semibold" name="" id="">
              <option value="">Categories</option>
            </select>
            <select className="border w-full rounded-sm py-2 px-3 font-semibold" name="" id="">
              <option value="">Brands</option>
            </select>
          </div>
          <div className="my-2">
            <h1 className="px-1 my-2 font-semibold">Price</h1>
            <div className="flex justify-between gap-2">
              <Input className="py-2" placeholder="Product price" type="number" />
              <Input className="py-2" placeholder="Discount" type="number" />
              <Input className="py-2" placeholder="Count" type="number" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2">
            <input className="w-4 h-4" type="checkbox" />
            <label htmlFor="">Add tax for this product</label>
          </div>
          <div className="flex justify-between gap-1 px-2 my-3 border rounded-sm p-3 items-center">
            <div>
              <h1 className="font-bold text-[18px]">Different Options</h1>
              <p>This product has multiple options</p>
            </div>
            <input className="w-4 h-4" type="checkbox" />
          </div>
          <div className="px-2 my-3 ">
            <h1 className="font-semibold my-2">Options</h1>
            <div className="grid grid-cols-2 gap-2">
              <input className="border w-full rounded-sm py-2 px-3 font-semibold" type="text" placeholder="Size" />
              <div className="border w-full rounded-sm py-2 px-3 font-semibold flex justify-between" >
                <button className="bg-[#E6E9F4] px-3 py-1 rounded-sm text-[#7E84A3] flex gap-3  cursor-pointer"><span>S</span> <span>✕</span></button>
                <button className="bg-[#E6E9F4] px-3 py-1 rounded-sm text-[#7E84A3] flex gap-3  cursor-pointer"><span>M</span> <span>✕</span></button>
                <button className="bg-[#E6E9F4] px-3 py-1 rounded-sm text-[#7E84A3] flex gap-3 cursor-pointer"><span>L</span> <span>✕</span></button>
                <button className="bg-[#E6E9F4] px-3 py-1 rounded-sm text-[#7E84A3] flex gap-3 cursor-pointer"><span>XL</span> <span>✕</span></button>
              </div>
              <input className="border w-full rounded-sm py-2 px-3 font-semibold" type="text" placeholder="Size" />
              <div className="border w-full rounded-sm py-2 px-3 font-semibold flex justify-between" >
                <button className="bg-[#E6E9F4] px-3 py-1 rounded-sm text-[#7E84A3] flex gap-3 cursor-pointer"><span>10</span> <span>✕</span></button>
                <button className="bg-[#E6E9F4] px-3 py-1 rounded-sm text-[#7E84A3] flex gap-3 cursor-pointer"><span>20</span> <span>✕</span></button>
                <button className="bg-[#E6E9F4] px-3 py-1 rounded-sm text-[#7E84A3] flex gap-3 cursor-pointer"><span>30</span> <span>✕</span></button>
                <button className="bg-[#E6E9F4] px-3 py-1 rounded-sm text-[#7E84A3] flex gap-3 cursor-pointer"><span>40</span> <span>✕</span></button>
              </div>
              <input className="border w-full rounded-sm py-2 px-3 font-semibold" type="text" placeholder="Option 2" />
              <input className="border w-full rounded-sm py-2 px-3 font-semibold" type="text" placeholder="Value" />
            </div>
            <button className='hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-sm px-4 py-2 my-2 cursor-pointer transition-colors duration-300'>+ Add more</button>
          </div>
        </aside>
        <aside className=" w-[40%] px-3">
          <div className="rounded-sm  border p-3">
            <div className="flex items-center justify-between gap-1">
              <h1 className="font-semibold">Colour:</h1>
              <h1 className="font-semibold text-[#2563EB]">✓ Create new</h1>
            </div>
            <div className="flex justify-between my-2">
              <div className="bg-black rounded-full w-8 h-8 focus:border-blue-600 focus:border-3 "></div>
              <div className="bg-[#E07575] rounded-full w-8 h-8"></div>
              <div className="bg-[#6366F1] rounded-full w-8 h-8"></div>
              <div className="bg-[#FFB71A] rounded-full w-8 h-8"></div>
              <div className="bg-[#06A561] rounded-full w-8 h-8"></div>
              <div className="bg-[#41434D] rounded-full w-8 h-8"></div>
            </div>
          </div>
          <div className="rounded-sm  border p-3 my-2">
            <div>
              <h1 className="font-semibold">Tags</h1>
            </div>
            <div className="flex gap-2  my-2">
              <input className="w-[65%] border rounded-sm shadow-sm px-3" placeholder="Tags name" type="text" />
              <button className="border-[#2563EB] border px-3 py-1 rounded-sm text-[#2563EB]">✓</button>
            </div>
            <div className="my-3 flex gap-2 flex-wrap">
              <span className="bg-[#E6E9F4] text-[#5A607F] p-2 rounded-sm cursor-pointer">T-Shirt ✕</span>
              <span className="bg-[#E6E9F4] text-[#5A607F] p-2 rounded-sm cursor-pointer">Summer Collection ✕</span>
              <span className="bg-[#E6E9F4] text-[#5A607F] p-2 rounded-sm cursor-pointer">Men Clothes ✕</span>
            </div>
          </div>
          <div className="rounded-sm  border p-3 my-2">
            <div>
              <h1 className="font-semibold">Images</h1>
            </div>
            <div className="relative group my-2">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-600 mb-3" />
                <p className="text-sm text-gray-700 text-center">
                  {/* {formik.values.CategoryImage ? (
                    <span className="text-blue-600 font-medium">{formik.values.CategoryImage.name}</span> */}
                  {/* // ) : ( */}
                  <span className="font-semibold underline cursor-pointer">Click to upload</span>
                  {/* // )} */}
                </p>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-900 text-sm">Image</th>
                    <th className="px-6 py-4 font-semibold text-gray-900 text-sm">File name</th>
                    <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="h-12 w-12 overflow-hidden rounded-md border border-gray-100">
                        <img
                          src={img5}
                          alt="Category"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      Healthcare_Erbology.png
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="h-12 w-12 overflow-hidden rounded-md border border-gray-100">
                        <img
                          src={img5}
                          alt="Category"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      Healthcare_Erbology.png
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="h-12 w-12 overflow-hidden rounded-md border border-gray-100">
                        <img
                          src={img5}
                          alt="Category"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      Healthcare_Erbology.png
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default AddProduct