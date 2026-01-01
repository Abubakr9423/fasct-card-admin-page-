import { MorphingText } from '@/components/ui/morphing-text';
import { NumberTicker } from '@/components/ui/number-ticker';
import { useProductStore } from '@/store/store';
import { GetToken } from '@/util/axios';
import { Eye, Heart } from 'lucide-react';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";


const Products = () => {

  const { data, fetchProducts, setFilters } = useProductStore((state) => state);
  const naviget = useNavigate()


  useEffect(() => {
    const token = GetToken();
    if (!token) {
      naviget('/');
      return;
    }
    fetchProducts();
  }, [fetchProducts]);


  return (
    <div>
      <div className="flex flex-wrap md:w-[1000px]">
        {Array.isArray(data?.products) ? (
          data.products.map((e) => (
            <div key={e.id} className="product-card border rounded  w-64">
              <div className="image-container relative">
                <img
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt={e.productName}
                  className="w-full object-cover h-32 mx-auto"
                />
                <div>
                  <button className="add-to-cart">Add to Cart</button>
                  <ToastContainer />
                </div>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    className="bg-white rounded-full p-2 shadow"
                  >
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                  <Link to={`/productsdetail/${e.id}`} className="bg-white rounded-full p-2 shadow">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </Link>
                </div>
              </div>

              <div className="info mt-3 text-start">
                <h1 className="text-lg font-semibold">{e.productName}</h1>
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
                <p className="text-xs text-gray-400">{e.categoryName}</p>
              </div>
            </div>

          ))
        ) : (
          <MorphingText className='font-serif-[Inter]' texts={["No product is Availabel", "Please Cahnge your filter"]} />

        )}
      </div>
    </div>
  )
}

export default Products