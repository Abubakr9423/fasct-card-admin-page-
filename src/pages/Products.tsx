import { MorphingText } from '@/components/ui/morphing-text';
import { NumberTicker } from '@/components/ui/number-ticker';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { TextAnimate } from '@/components/ui/text-animate';
import { useDeleteProducts, useProductStore } from '@/store/store';
import { GetToken } from '@/util/axios';
import { Pencil, Trash } from 'lucide-react';
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Products = () => {

  const { data, fetchProducts } = useProductStore((state) => state);
  const naviget = useNavigate()
  const {deleteProduct} = useDeleteProducts((state) => state)


  useEffect(() => {
    const token = GetToken();
    if (!token) {
      naviget('/');
      return;
    }
    fetchProducts();
  }, [fetchProducts]);


  return (
    <div className='p-6'>
      <div className='flex justify-between p-10 items-center'>
        <TextAnimate animation="slideLeft" by="character" className='text-4xl font-[700]'>
          Product Page
        </TextAnimate>
        <NavLink to="/addproducts">
          <ShimmerButton className='bg-[#2563EB]'>Add New Product</ShimmerButton>
        </NavLink>
      </div>
      <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Product</th>
            <th className="px-4 py-2 text-left font-semibold">Quantity</th>
            <th className="px-4 py-2 text-left font-semibold">Category</th>
            <th className="px-4 py-2 text-left font-semibold">Price</th>
            <th className="px-4 py-2 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.products) ? (
            data.products.map((e) => (
              <tr
                key={e.id}
                className="border-b transition-colors hover:bg-blue-50 cursor-pointer"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                    className="w-16 h-16 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                  />
                  <span className="font-medium">{e.productName}</span>
                </td>
                <td>
                  <div className='flex gap-5'>
                    <h1>
                      {e.quantity}
                    </h1>
                    <h1>
                      {e.quantity > 0 ? "in stock" : "out of stock"}
                    </h1>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {e.categoryName}
                </td>
                <td>
                  {e.hasDiscount ? (
                    <div className='flex gap-3 items-end'>
                      <div className="flex justify-center  items-baseline">
                        <span className="text-red-600 font-bold">$</span>
                        <NumberTicker
                          value={
                            e?.price > 4000
                              ? (Number(e?.price.toString().slice(0, 4)) || 0)
                              : (Number(e?.price) || 0)
                          }
                          className="text-red-600 font-bold"
                        />
                      </div>
                      <div>
                        <span className='text-gray-400'>$</span>
                        <NumberTicker
                          value={
                            e?.price > 4000
                              ? (Number(e?.discountPrice.toString().slice(0, 4)) || 0)
                              : (Number(e?.discountPrice) || 0)
                          }
                          className="line-through text-gray-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-blue-600 font-bold">${e.price}</p>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className='flex gap-2'>
                    <button className='text-[#1E5EFF]'><Pencil /></button>
                    <button onClick={() => deleteProduct(e.id)} className='text-[red]'><Trash /></button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                <MorphingText
                  className="font-serif-[Inter]"
                  texts={["No product is Available", "Sorry"]}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Products