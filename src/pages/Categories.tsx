import { Input } from '@/components/ui/input'
import { useCategory } from '@/store/store';
import {  FileCheckCorner, Pencil, Search, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'


const Categories = () => {
  const { isCategoria, getCategory } = useCategory();
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCategory()
  }, [])
  return (
    <main>
      <section className='md:px-5 bg-gray-50 w-full min-h-screen'>
        <div className='flex items-center justify-between'>
          <div className='flex  gap-5'>
            <h1 className='bg-[#DBEAFE] text-[#1D4ED8] rounded-sm px-4 py-2 transition-colors duration-300'>Categories</h1>
            <h1 className='hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-sm px-4 py-2 transition-colors duration-300'>Brands</h1>
            <h1 className='hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-sm px-4 py-2 transition-colors duration-300'>Banners</h1>
          </div>
          <button className='bg-[#2563EB] text-white px-5 py-2 rounded-sm  transition-colors duration-200 hover:bg-[#144fcf]'>Add new</button>
        </div>
        <div className='flex items-center   gap-2  my-3'>
          <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='w-80' placeholder='Search' />
          <Search className='relative right-10' />
        </div>
        <section className='grid grid-cols-4 gap-5'>
          {
            isCategoria.filter((e) => e.subCategoryName.toLowerCase().includes(search.toLowerCase()))
              .map((e) => (
                <div className='border hover:bg-[#DBEAFE] transition-colors duration-500  rounded-sm py-5 px-3 w-60 h-50 gap-5 flex items-start justify-between'>
                  <div className='flex flex-col gap-3'>
                    <FileCheckCorner size={50} />
                    <h1 className='font-semibold'>{e.subCategoryName}</h1>
                  </div>
                  <div className='flex flex-col'>
                    <button className="hover:bg-gray-700 hover:text-white p-2 rounded-full transition-colors duration-300">
                      <Pencil className='hover:shadow-sm' />
                    </button>
                    <button className="hover:bg-gray-700 hover:text-white p-2 rounded-full transition-colors duration-300">
                      <Trash className='hover:shadow-sm' />
                    </button>
                  </div>
                </div>
              ))
          }
        </section>
      </section>
    </main>
  )
}

export default Categories