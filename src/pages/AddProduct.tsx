import { Input } from "@/components/ui/input"

const AddProduct = () => {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products / Add new</h1>
        <div className="flex gap-1">
          <button className="px-6 py-2 bg-white border-[#2563EB] border text-[#2563EB] rounded-sm">Cancel</button>
          <button className="px-6 py-2 bg-[#2563EB] border text-white rounded-sm">Save</button>
        </div>
      </div>
      <section className="flex items-start gap-3">
        <aside className="w-[60%] border">
          <h1 className="text-2xl font-semibold">Information</h1>
          <div className="flex items-center  gap-1">
            <Input className="w-200" placeholder="Product name" type="text" />
            <Input className="w-60" placeholder="Code" type="text" />
          </div>
        </aside>
        <aside className=" w-[40%] px-3">
          <div className="rounded-sm ">
            <div className="flex items-center justify-between gap-1">
              <h1>Colour:</h1>
              <h1>Create new</h1>
            </div>
            <div className="flex justify-between">
              <div className="bg-black rounded-full w-8 h-8"></div>
              <div className="bg-black rounded-full w-8 h-8"></div>
              <div className="bg-black rounded-full w-8 h-8"></div>
              <div className="bg-black rounded-full w-8 h-8"></div>
              <div className="bg-black rounded-full w-8 h-8"></div>
              <div className="bg-black rounded-full w-8 h-8"></div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default AddProduct