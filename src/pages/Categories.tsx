import { Input } from '@/components/ui/input'
import { useCategory } from '@/store/store';
import { FileCheckCorner, Pencil, Search, Trash, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useFormik } from 'formik';

interface FormValues {
  id: number | null;
  CategoryName: string;
  CategoryImage: File | null;
}

const Categories = () => {
  const { isCategoria, getCategory, addCategory, deleteCategory, editCategory } = useCategory();
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getCategory();
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      id: null,
      CategoryName: '',
      CategoryImage: null
    },
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("CategoryName", values.CategoryName);
      if (values.CategoryImage) {
        formdata.append("CategoryImage", values.CategoryImage);
      }

      if (values.id) {
        formdata.append("Id", values.id.toString());
        await editCategory(formdata);
      } else {
        await addCategory(formdata);
      }

      formik.resetForm();
      setIsModalOpen(false);
    }
  });

  const handleEdit = (category: any) => {
    formik.setValues({
      id: category.id,
      CategoryName: category.categoryName,
      CategoryImage: null
    });
    setIsModalOpen(true);
  };

  return (
    <main>
      <section className='md:px-5 bg-gray-50 w-full min-h-screen'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-5'>
            <h1 className='bg-[#DBEAFE] text-[#1D4ED8] rounded-sm px-4 py-2 cursor-pointer'>Categories</h1>
            <h1 className='hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-sm px-4 py-2 cursor-pointer transition-colors duration-300'>Brands</h1>
            <h1 className='hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-sm px-4 py-2 cursor-pointer transition-colors duration-300'>Banners</h1>
          </div>
          <Dialog open={isModalOpen} onOpenChange={(val) => {
            setIsModalOpen(val);
            if (!val) formik.resetForm();
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsModalOpen(true)} className='bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5'>Add new</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#111827]">
                  {formik.values.id ? "Edit category" : "Add category"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-6 py-4">
                  <Input
                    name="CategoryName"
                    value={formik.values.CategoryName}
                    onChange={formik.handleChange}
                    placeholder="Category name"
                    className="h-12 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="relative group">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                      <Upload className="w-6 h-6 text-gray-600 mb-3" />
                      <p className="text-sm text-gray-700 text-center">
                        {formik.values.CategoryImage ? (
                          <span className="text-blue-600 font-medium">{formik.values.CategoryImage.name}</span>
                        ) : (
                          <span className="font-semibold underline cursor-pointer">Click to upload</span>
                        )}
                      </p>
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.currentTarget.files && e.currentTarget.files[0]) {
                            formik.setFieldValue("CategoryImage", e.currentTarget.files[0]);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter className="flex gap-3 sm:justify-end">
                  <DialogClose asChild>
                    <Button variant="outline" className="px-8 border-gray-300 text-gray-600 h-11">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-10 h-11">
                    {formik.values.id ? "Save Changes" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className='flex items-center gap-2 my-3 relative'>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-80'
            placeholder='Search'
          />
          <Search className='relative right-10 text-gray-400' size={18} />
        </div>

        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
          {isCategoria && isCategoria.length > 0 ? (
            isCategoria
              .filter((e: any) => e.categoryName?.toLowerCase().includes(search.toLowerCase()))
              .map((e: any) => (
                <div key={e.id} className='border hover:bg-[#DBEAFE] transition-all duration-300 rounded-lg py-5 px-3 flex items-start justify-between shadow-sm bg-white'>
                  <div className='flex flex-col gap-3 overflow-hidden'>
                    {e.categoryImage ? (
                      <img src={`https://store-api.softclub.tj/images/${e.categoryImage}`} alt="" className="w-20 h-20 object-cover rounded-md" />
                    ) : (
                      <FileCheckCorner size={40} className="text-blue-500" />
                    )}
                    <h1 className='font-semibold truncate w-32'>{e.categoryName}</h1>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <button onClick={() => handleEdit(e)} className="hover:bg-gray-700 hover:text-white p-2 rounded-full transition-colors duration-300">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => {  deleteCategory(e.id) }} className="hover:bg-gray-700 hover:text-white p-2 rounded-full transition-colors duration-300">
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className='col-span-4 text-center py-10'>
              <p className='text-gray-500'>Маълумот ёфт нашуд!</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default Categories;